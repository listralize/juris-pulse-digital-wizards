
import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blogTypes';
import { defaultBlogPosts } from '../data/defaultBlogPosts';

export const useBlogData = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = () => {
      try {
        const savedPosts = localStorage.getItem('adminBlogPosts');
        console.log('Loading blog posts from localStorage:', savedPosts ? 'found' : 'not found');
        
        if (savedPosts) {
          const parsedPosts = JSON.parse(savedPosts);
          console.log('Parsed posts:', parsedPosts.length, 'posts found');
          
          if (Array.isArray(parsedPosts) && parsedPosts.length > 0) {
            setBlogPosts(parsedPosts);
          } else {
            console.log('No valid posts found, using defaults');
            setBlogPosts(defaultBlogPosts);
            localStorage.setItem('adminBlogPosts', JSON.stringify(defaultBlogPosts));
          }
        } else {
          console.log('No saved posts, using defaults');
          setBlogPosts(defaultBlogPosts);
          localStorage.setItem('adminBlogPosts', JSON.stringify(defaultBlogPosts));
        }
      } catch (error) {
        console.error('Erro ao carregar posts do blog:', error);
        setBlogPosts(defaultBlogPosts);
        localStorage.setItem('adminBlogPosts', JSON.stringify(defaultBlogPosts));
      }
      
      setIsLoading(false);
    };

    loadBlogPosts();

    // Adiciona listener para mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminBlogPosts') {
        console.log('Blog posts updated in localStorage, reloading...');
        loadBlogPosts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveBlogPosts = (posts: BlogPost[]) => {
    console.log('Saving blog posts:', posts.length, 'posts');
    setBlogPosts(posts);
    localStorage.setItem('adminBlogPosts', JSON.stringify(posts));
    
    // Força atualização em outras abas/componentes
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'adminBlogPosts',
      newValue: JSON.stringify(posts)
    }));
  };

  return { 
    blogPosts, 
    isLoading, 
    saveBlogPosts 
  };
};
