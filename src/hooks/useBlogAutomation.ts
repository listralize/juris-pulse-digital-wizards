
import { useBlogData } from './useBlogData';
import { BlogPost } from '../types/blogTypes';

export const useBlogAutomation = () => {
  const { saveBlogPosts, blogPosts } = useBlogData();

  const createPostFromWebhook = (webhookData: any): BlogPost => {
    const now = new Date().toISOString();
    const slug = webhookData.title
      ?.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-') || `post-${Date.now()}`;

    return {
      id: Date.now().toString(),
      title: webhookData.title || 'Post sem título',
      content: webhookData.content || '<p>Conteúdo não fornecido</p>',
      excerpt: webhookData.excerpt || '',
      banner: webhookData.banner || '',
      author: webhookData.author || 'Autor não informado',
      authorImage: webhookData.authorImage || '',
      publishedAt: webhookData.publishedAt || now.split('T')[0],
      createdAt: now,
      slug: slug,
      tags: Array.isArray(webhookData.tags) ? webhookData.tags : [],
      featured: Boolean(webhookData.featured)
    };
  };

  const processWebhookData = (data: any) => {
    try {
      console.log('Processando dados do webhook:', data);
      
      const newPost = createPostFromWebhook(data);
      const updatedPosts = [newPost, ...blogPosts];
      saveBlogPosts(updatedPosts);
      
      console.log('Post criado com sucesso:', newPost);
      
      return { success: true, post: newPost };
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      return { success: false, error: 'Erro ao criar post' };
    }
  };

  // Simula um endpoint real interceptando requisições
  const initializeWebhookEndpoint = () => {
    // Intercepta requisições para o endpoint
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Se for uma requisição para o endpoint do webhook
      if (url.includes('/api/blog/webhook')) {
        console.log('Interceptando requisição webhook');
        
        try {
          const body = init?.body ? JSON.parse(init.body.toString()) : {};
          const result = processWebhookData(body);
          
          // Retorna uma resposta simulada
          return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 400,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Erro ao processar webhook:', error);
          return new Response(JSON.stringify({ success: false, error: 'Erro interno' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      // Para outras requisições, usar fetch original
      return originalFetch(input, init);
    };
  };

  return {
    processWebhookData,
    createPostFromWebhook,
    initializeWebhookEndpoint
  };
};
