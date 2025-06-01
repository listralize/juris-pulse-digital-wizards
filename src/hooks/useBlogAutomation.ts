
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
      const newPost = createPostFromWebhook(data);
      const updatedPosts = [newPost, ...blogPosts];
      saveBlogPosts(updatedPosts);
      return { success: true, post: newPost };
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      return { success: false, error: 'Erro ao criar post' };
    }
  };

  return {
    processWebhookData,
    createPostFromWebhook
  };
};
