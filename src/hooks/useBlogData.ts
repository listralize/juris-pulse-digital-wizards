
import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blogTypes';
import { defaultBlogPosts } from '../data/defaultBlogPosts';
import { logger } from '../utils/logger';

export const useBlogData = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = () => {
      try {
        const savedPosts = localStorage.getItem('adminBlogPosts');
        
        if (savedPosts) {
          const parsedPosts = JSON.parse(savedPosts);
          
          if (Array.isArray(parsedPosts) && parsedPosts.length > 0) {
            setBlogPosts(parsedPosts);
          } else {
            setBlogPosts(defaultBlogPosts);
            localStorage.setItem('adminBlogPosts', JSON.stringify(defaultBlogPosts));
          }
        } else {
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

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminBlogPosts') {
        loadBlogPosts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveBlogPosts = (posts: BlogPost[]) => {
    setBlogPosts(posts);
    localStorage.setItem('adminBlogPosts', JSON.stringify(posts));
    
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
