
import { useState, useEffect } from 'react';
import { ServicePage } from '../types/adminTypes';
import { defaultServicePages } from '../data/defaultServicePages';

export const useServicePageData = (serviceId?: string) => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = () => {
    try {
      console.log('useServicePageData: Carregando dados para serviceId:', serviceId);
      
      // Carregar páginas salvas no admin
      const savedServicePages = localStorage.getItem('adminServicePages');
      let finalPages = [...defaultServicePages];
      
      if (savedServicePages) {
        try {
          const parsedServicePages = JSON.parse(savedServicePages);
          console.log('useServicePageData: Páginas encontradas no localStorage:', parsedServicePages.length);
          
          if (Array.isArray(parsedServicePages) && parsedServicePages.length > 0) {
            finalPages = [...parsedServicePages];
            
            // Verificar se faltam páginas padrão
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
      
      console.log('useServicePageData: Total de páginas carregadas:', finalPages.length);
      setServicePages(finalPages);
    } catch (error) {
      console.error('useServicePageData: Erro ao carregar dados das páginas de serviço:', error);
      setServicePages([...defaultServicePages]);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadServicePages();

    // Escutar mudanças salvas no admin
    const handleServicePagesUpdate = () => {
      console.log('useServicePageData: Detectada atualização nas páginas de serviços');
      loadServicePages();
    };

    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate);
    
    return () => {
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate);
    };
  }, [serviceId]);

  // Se um serviceId específico foi fornecido, retornar apenas essa página
  if (serviceId) {
    const specificPage = servicePages.find(page => {
      // Tentar várias formas de match
      if (page.id === serviceId) return true;
      if (page.href === serviceId) return true;
      if (page.href === `/servicos/${serviceId}`) return true;
      if (page.id === serviceId.replace('/servicos/', '')) return true;
      
      // Tentar match por título normalizado
      const normalizedTitle = page.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
      const normalizedServiceId = serviceId.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
      if (normalizedTitle === normalizedServiceId) return true;
      
      return false;
    });
    
    console.log('useServicePageData: Página específica encontrada:', specificPage ? 'sim' : 'não', 'para ID:', serviceId);
    console.log('useServicePageData: Dados da página encontrada:', specificPage);
    return { servicePage: specificPage, isLoading };
  }

  return { servicePages, isLoading };
};
