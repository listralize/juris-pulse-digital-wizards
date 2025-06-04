
import { useState, useEffect } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { BlogPost } from '../../types/blogTypes';

export const useSupabaseBlog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateValidUUID = () => {
    return crypto.randomUUID();
  };

  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  const ensureValidUUID = (id: string) => {
    if (!id || !isValidUUID(id)) {
      return generateValidUUID();
    }
    return id;
  };

  const loadBlogPosts = async () => {
    try {
      console.log('📝 CARREGANDO POSTS DO BLOG...');
      setIsLoading(true);
      
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (blogError) {
        console.error('❌ Erro ao carregar blog posts:', blogError);
        setBlogPosts([]);
        return;
      }

      if (blogData && blogData.length > 0) {
        const formattedPosts: BlogPost[] = blogData.map(post => ({
          id: post.id,
          title: post.title || '',
          content: post.content || '',
          excerpt: post.excerpt || '',
          banner: post.banner || '',
          author: post.author || 'Autor',
          authorImage: post.author_image || '',
          publishedAt: post.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          createdAt: post.created_at || new Date().toISOString(),
          slug: post.slug || '',
          tags: post.tags || [],
          featured: post.featured || false
        }));
        
        setBlogPosts(formattedPosts);
        console.log('✅ POSTS DO BLOG CARREGADOS:', formattedPosts.length);
      } else {
        console.log('⚠️ NENHUM POST ENCONTRADO');
        setBlogPosts([]);
      }
    } catch (error) {
      console.error('💥 ERRO AO CARREGAR BLOG POSTS:', error);
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBlogPosts = async (posts: BlogPost[]) => {
    try {
      console.log('💾 SALVANDO POSTS DO BLOG:', posts.length);
      
      if (!posts || posts.length === 0) {
        console.log('⚠️ Nenhum post para salvar');
        setBlogPosts([]);
        return;
      }

      // Limpar posts existentes
      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        console.error('❌ Erro ao limpar posts:', deleteError);
      }

      // Inserir novos posts
      const postsToInsert = posts.map((post, index) => ({
        id: ensureValidUUID(post.id),
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        banner: post.banner,
        author: post.author,
        author_image: post.authorImage,
        published_at: post.publishedAt,
        slug: post.slug,
        tags: post.tags,
        featured: post.featured,
        display_order: index,
        is_active: true
      }));

      const { data: insertedPosts, error: insertError } = await supabase
        .from('blog_posts')
        .insert(postsToInsert)
        .select();

      if (insertError) {
        console.error('❌ Erro ao inserir posts:', insertError);
        throw insertError;
      }

      console.log('✅ POSTS SALVOS NO SUPABASE:', insertedPosts?.length || 0);
      setBlogPosts(posts);
      
      return posts;
    } catch (error) {
      console.error('💥 ERRO CRÍTICO AO SALVAR POSTS:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadBlogPosts();
  }, []);

  return {
    blogPosts,
    isLoading,
    loadBlogPosts,
    saveBlogPosts,
    setBlogPosts
  };
};
