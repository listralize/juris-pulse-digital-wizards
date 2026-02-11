
import { useState, useEffect } from 'react';
import { ServicePage } from '../types/adminTypes';
import { defaultServicePages } from '../data/defaultServicePages';
import { logger } from '../utils/logger';

const STORAGE_KEY = 'listralize_service_pages';

export const useServicePageData = (serviceId?: string) => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = () => {
    try {
      const savedServicePages = localStorage.getItem(STORAGE_KEY);
      let finalPages = [...defaultServicePages];
      
      if (savedServicePages) {
        try {
          const parsedServicePages = JSON.parse(savedServicePages);
          
          if (Array.isArray(parsedServicePages) && parsedServicePages.length > 0) {
            finalPages = [...parsedServicePages];
            
            const savedIds = new Set(parsedServicePages.map((page: ServicePage) => page.id));
            const missingDefaultPages = defaultServicePages.filter(defaultPage => !savedIds.has(defaultPage.id));
            
            if (missingDefaultPages.length > 0) {
              finalPages = [...parsedServicePages, ...missingDefaultPages];
            }
          }
        } catch (error) {
          console.error('useServicePageData: Erro ao parsear páginas salvas:', error);
          finalPages = [...defaultServicePages];
        }
      }
      
      setServicePages(finalPages);
    } catch (error) {
      console.error('useServicePageData: Erro ao carregar dados das páginas de serviço:', error);
      setServicePages([...defaultServicePages]);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadServicePages();

    const handleServicePagesUpdate = (event: CustomEvent) => {
      const updatedPages = event.detail?.pages;
      if (updatedPages && Array.isArray(updatedPages)) {
        setServicePages([...updatedPages]);
      } else {
        loadServicePages();
      }
    };

    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    };
  }, [serviceId]);

  if (serviceId) {
    const specificPage = servicePages.find(page => {
      if (page.id === serviceId) return true;
      if (page.href === serviceId) return true;
      if (page.href === `/servicos/${serviceId}`) return true;
      if (page.id === serviceId.replace('/servicos/', '')) return true;
      
      const normalizedTitle = page.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
      const normalizedServiceId = serviceId.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
      if (normalizedTitle === normalizedServiceId) return true;
      
      return false;
    });
    
    return { servicePage: specificPage, isLoading };
  }

  return { servicePages, isLoading };
};
