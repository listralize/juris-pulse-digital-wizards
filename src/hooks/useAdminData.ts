
import { useState, useEffect } from 'react';
import { TeamMember, SpecializedService, PageTexts, ServicePage, CategoryInfo } from '../types/adminTypes';
import { defaultTeamMembers } from '../data/defaultTeamMembers';
import { defaultSpecializedServices } from '../data/defaultSpecializedServices';
import { defaultPageTexts } from '../data/defaultPageTexts';
import { defaultServicePages } from '../data/defaultServicePages';
import { categories as defaultCategories } from '../types/adminTypes';

export const useAdminData = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [specializedServices, setSpecializedServices] = useState<SpecializedService[]>([]);
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [pageTexts, setPageTexts] = useState<PageTexts>(defaultPageTexts);
  const [categories, setCategories] = useState<CategoryInfo[]>(defaultCategories);
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

      // Carregar categorias personalizadas
      const savedCategories = localStorage.getItem('adminCategories');
      if (savedCategories) {
        try {
          const parsedCategories = JSON.parse(savedCategories);
          if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
            setCategories(parsedCategories);
          } else {
            setCategories(defaultCategories);
            localStorage.setItem('adminCategories', JSON.stringify(defaultCategories));
          }
        } catch (error) {
          console.error('Erro ao parsear categorias salvas:', error);
          setCategories(defaultCategories);
        }
      } else {
        setCategories(defaultCategories);
        localStorage.setItem('adminCategories', JSON.stringify(defaultCategories));
      }

      // Carregar páginas de serviços
      const savedServicePages = localStorage.getItem('adminServicePages');
      let finalPages: ServicePage[] = [];
      
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
          } else {
            finalPages = [...defaultServicePages];
          }
        } catch (error) {
          console.error('Erro ao parsear páginas salvas:', error);
          finalPages = [...defaultServicePages];
        }
      } else {
        finalPages = [...defaultServicePages];
      }
      
      setServicePages(finalPages);

      // Carregar textos das páginas
      const savedTexts = localStorage.getItem('adminPageTexts');
      if (savedTexts) {
        try {
          const parsedTexts = JSON.parse(savedTexts);
          const textsWithDefaults = {
            ...defaultPageTexts,
            ...parsedTexts,
            categoryTexts: parsedTexts.categoryTexts || defaultPageTexts.categoryTexts,
            contactTexts: {
              ...defaultPageTexts.contactTexts,
              ...(parsedTexts.contactTexts || {})
            },
            footerTexts: {
              ...defaultPageTexts.footerTexts,
              ...(parsedTexts.footerTexts || {})
            }
          };
          setPageTexts(textsWithDefaults);
        } catch (error) {
          console.error('Erro ao parsear textos salvos:', error);
          setPageTexts(defaultPageTexts);
          localStorage.setItem('adminPageTexts', JSON.stringify(defaultPageTexts));
        }
      } else {
        setPageTexts(defaultPageTexts);
        localStorage.setItem('adminPageTexts', JSON.stringify(defaultPageTexts));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do admin:', error);
      setTeamMembers(defaultTeamMembers);
      setSpecializedServices(defaultSpecializedServices);
      setServicePages([...defaultServicePages]);
      setPageTexts(defaultPageTexts);
      setCategories(defaultCategories);
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
    
    window.dispatchEvent(new CustomEvent('servicePagesUpdated', { detail: pages }));
  };

  const savePageTexts = (texts: PageTexts) => {
    console.log('Salvando textos das páginas');
    setPageTexts(texts);
    localStorage.setItem('adminPageTexts', JSON.stringify(texts));
  };

  const saveCategories = (cats: CategoryInfo[]) => {
    console.log('Salvando categorias:', cats.length);
    setCategories(cats);
    localStorage.setItem('adminCategories', JSON.stringify(cats));
    
    window.dispatchEvent(new CustomEvent('categoriesUpdated', { detail: cats }));
  };

  return { 
    teamMembers, 
    specializedServices, 
    servicePages,
    pageTexts, 
    categories,
    isLoading, 
    saveTeamMembers, 
    saveSpecializedServices, 
    saveServicePages,
    savePageTexts,
    saveCategories
  };
};

export type { TeamMember, SpecializedService, ServicePage, PageTexts } from '../types/adminTypes';
