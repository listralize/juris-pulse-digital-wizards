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
  const [pageTexts, setPageTexts] = useState<PageTexts>({
    ...defaultPageTexts,
    categoryTexts: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useAdminData: Iniciando carregamento...');
    
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

      // Carregar páginas de serviços - GARANTINDO QUE NENHUMA SEJA PERDIDA
      console.log('Carregando páginas de serviço...');
      console.log('Páginas padrão disponíveis:', defaultServicePages.length);
      
      const savedServicePages = localStorage.getItem('adminServicePages');
      let finalPages: ServicePage[] = [];
      
      if (savedServicePages) {
        try {
          const parsedServicePages = JSON.parse(savedServicePages);
          console.log('Páginas salvas encontradas:', parsedServicePages.length);
          
          if (Array.isArray(parsedServicePages) && parsedServicePages.length > 0) {
            // SEMPRE usar as páginas padrão como base e adicionar as customizadas
            finalPages = [...defaultServicePages];
            
            // Adicionar ou atualizar páginas customizadas
            parsedServicePages.forEach((savedPage: ServicePage) => {
              const existingIndex = finalPages.findIndex(page => page.id === savedPage.id);
              if (existingIndex >= 0) {
                // Atualizar página existente
                finalPages[existingIndex] = savedPage;
              } else {
                // Adicionar nova página customizada
                finalPages.push(savedPage);
              }
            });
          } else {
            // Se não há páginas válidas salvas, usar as padrão
            finalPages = [...defaultServicePages];
          }
        } catch (error) {
          console.error('Erro ao parsear páginas salvas:', error);
          finalPages = [...defaultServicePages];
        }
      } else {
        // Se não há páginas salvas, usar as padrão
        finalPages = [...defaultServicePages];
      }
      
      console.log('Total de páginas finais carregadas:', finalPages.length);
      setServicePages(finalPages);

      // Carregar textos das páginas
      const savedTexts = localStorage.getItem('adminPageTexts');
      if (savedTexts) {
        const parsedTexts = JSON.parse(savedTexts);
        // Garantir que categoryTexts existe
        const textsWithCategories = {
          ...defaultPageTexts,
          ...parsedTexts,
          categoryTexts: parsedTexts.categoryTexts || defaultPageTexts.categoryTexts
        };
        setPageTexts(textsWithCategories);
      } else {
        setPageTexts(defaultPageTexts);
        localStorage.setItem('adminPageTexts', JSON.stringify(defaultPageTexts));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do admin:', error);
      setTeamMembers(defaultTeamMembers);
      setSpecializedServices(defaultSpecializedServices);
      setServicePages([...defaultServicePages]); // SEMPRE garantir páginas padrão
      setPageTexts(defaultPageTexts);
    }
    
    setIsLoading(false);
  }, []);

  const saveTeamMembers = (members: TeamMember[]) => {
    console.log('Salvando membros da equipe:', members.length);
    setTeamMembers(members);
    localStorage.setItem('adminTeamMembers', JSON.stringify(members));
  };

  const saveSpecializedServices = (services: SpecializedService[]) => {
    console.log('Salvando serviços especializados:', services.length);
    setSpecializedServices(services);
    localStorage.setItem('adminSpecializedServices', JSON.stringify(services));
  };

  const saveServicePages = (pages: ServicePage[]) => {
    console.log('Salvando páginas de serviços:', pages.length);
    setServicePages(pages);
    localStorage.setItem('adminServicePages', JSON.stringify(pages));
    
    // Disparar evento customizado para que outras partes da aplicação saibam que os dados foram atualizados
    window.dispatchEvent(new CustomEvent('servicePagesUpdated', { detail: pages }));
  };

  const savePageTexts = (texts: PageTexts) => {
    console.log('Salvando textos das páginas');
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
