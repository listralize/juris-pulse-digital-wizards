
import { useState, useEffect } from 'react';
import { TeamMember, SpecializedService, PageTexts, ServicePage } from '../types/adminTypes';
import { defaultTeamMembers } from '../data/defaultTeamMembers';
import { defaultSpecializedServices } from '../data/defaultSpecializedServices';
import { defaultPageTexts } from '../data/defaultPageTexts';
import { defaultServicePages } from '../data/defaultServicePages';

export const useAdminData = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [specializedServices, setSpecializedServices] = useState<SpecializedService[]>([]);
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [pageTexts, setPageTexts] = useState<PageTexts>(defaultPageTexts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Carregar dados da equipe
      const savedTeam = localStorage.getItem('adminTeamMembers');
      if (savedTeam) {
        const parsedTeam = JSON.parse(savedTeam);
        if (Array.isArray(parsedTeam) && parsedTeam.length > 0) {
          setTeamMembers(parsedTeam);
        } else {
          setTeamMembers(defaultTeamMembers);
          localStorage.setItem('adminTeamMembers', JSON.stringify(defaultTeamMembers));
        }
      } else {
        setTeamMembers(defaultTeamMembers);
        localStorage.setItem('adminTeamMembers', JSON.stringify(defaultTeamMembers));
      }

      // Carregar serviços especializados
      const savedServices = localStorage.getItem('adminSpecializedServices');
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices);
        if (Array.isArray(parsedServices) && parsedServices.length > 0) {
          setSpecializedServices(parsedServices);
        } else {
          setSpecializedServices(defaultSpecializedServices);
          localStorage.setItem('adminSpecializedServices', JSON.stringify(defaultSpecializedServices));
        }
      } else {
        setSpecializedServices(defaultSpecializedServices);
        localStorage.setItem('adminSpecializedServices', JSON.stringify(defaultSpecializedServices));
      }

      // Carregar páginas de serviços - SEMPRE usar as páginas padrão como base
      console.log('Carregando páginas de serviço...');
      console.log('Páginas padrão disponíveis:', defaultServicePages.length);
      
      const savedServicePages = localStorage.getItem('adminServicePages');
      let finalPages = [...defaultServicePages]; // Sempre começar com as páginas padrão
      
      if (savedServicePages) {
        try {
          const parsedServicePages = JSON.parse(savedServicePages);
          console.log('Páginas salvas encontradas:', parsedServicePages.length);
          
          if (Array.isArray(parsedServicePages) && parsedServicePages.length > 0) {
            // Mesclar as páginas salvas com as padrão (páginas salvas têm prioridade)
            const savedIds = new Set(parsedServicePages.map((page: ServicePage) => page.id));
            
            // Manter páginas editadas salvas
            const editedPages = parsedServicePages.filter((page: ServicePage) => 
              defaultServicePages.some(defaultPage => defaultPage.id === page.id)
            );
            
            // Manter páginas novas criadas
            const newPages = parsedServicePages.filter((page: ServicePage) => 
              !defaultServicePages.some(defaultPage => defaultPage.id === page.id)
            );
            
            // Combinar: páginas padrão (atualizadas com as editadas) + páginas novas
            finalPages = defaultServicePages.map(defaultPage => {
              const editedVersion = editedPages.find(edited => edited.id === defaultPage.id);
              return editedVersion || defaultPage;
            }).concat(newPages);
          }
        } catch (error) {
          console.error('Erro ao parsear páginas salvas:', error);
          finalPages = [...defaultServicePages];
        }
      }
      
      console.log('Total de páginas finais:', finalPages.length);
      setServicePages(finalPages);
      
      // Salvar o estado final para garantir consistência
      localStorage.setItem('adminServicePages', JSON.stringify(finalPages));

      // Carregar textos das páginas
      const savedTexts = localStorage.getItem('adminPageTexts');
      if (savedTexts) {
        const parsedTexts = JSON.parse(savedTexts);
        setPageTexts({ ...defaultPageTexts, ...parsedTexts });
      } else {
        setPageTexts(defaultPageTexts);
        localStorage.setItem('adminPageTexts', JSON.stringify(defaultPageTexts));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do admin:', error);
      setTeamMembers(defaultTeamMembers);
      setSpecializedServices(defaultSpecializedServices);
      setServicePages(defaultServicePages);
      setPageTexts(defaultPageTexts);
    }
    
    setIsLoading(false);
  }, []);

  const saveTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members);
    localStorage.setItem('adminTeamMembers', JSON.stringify(members));
  };

  const saveSpecializedServices = (services: SpecializedService[]) => {
    setSpecializedServices(services);
    localStorage.setItem('adminSpecializedServices', JSON.stringify(services));
  };

  const saveServicePages = (pages: ServicePage[]) => {
    console.log('Salvando páginas:', pages.length);
    setServicePages(pages);
    localStorage.setItem('adminServicePages', JSON.stringify(pages));
  };

  const savePageTexts = (texts: PageTexts) => {
    setPageTexts(texts);
    localStorage.setItem('adminPageTexts', JSON.stringify(texts));
  };

  return { 
    teamMembers, 
    specializedServices, 
    servicePages,
    pageTexts, 
    isLoading, 
    saveTeamMembers, 
    saveSpecializedServices, 
    saveServicePages,
    savePageTexts 
  };
};

// Re-export types for backward compatibility
export type { TeamMember, SpecializedService, ServicePage, PageTexts } from '../types/adminTypes';
