
import { useState, useEffect } from 'react';
import { LandingPage } from '../types/adminTypes';

export const useLandingPages = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLandingPages = () => {
      try {
        const savedPages = localStorage.getItem('landingPages');
        if (savedPages) {
          const parsed = JSON.parse(savedPages);
          setLandingPages(parsed.filter((page: LandingPage) => page.isActive));
        }
      } catch (error) {
        console.error('Erro ao carregar landing pages:', error);
      }
      setIsLoading(false);
    };

    loadLandingPages();

    // Escutar mudanças
    const handleLandingPagesUpdate = () => {
      loadLandingPages();
    };

    window.addEventListener('landingPagesUpdated', handleLandingPagesUpdate);
    
    return () => {
      window.removeEventListener('landingPagesUpdated', handleLandingPagesUpdate);
    };
  }, []);

  const getLandingPageBySlug = (slug: string): LandingPage | undefined => {
    return landingPages.find(page => page.slug === slug);
  };

  return {
    landingPages,
    isLoading,
    getLandingPageBySlug
  };
};
