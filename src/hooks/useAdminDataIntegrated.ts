
import { useState, useEffect } from 'react';
import { TeamMember, PageTexts, ServicePage, CategoryInfo } from '../types/adminTypes';
import { useSupabaseDataNew } from './useSupabaseDataNew';
import { useAdminData } from './useAdminData';

export const useAdminDataIntegrated = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Dados do Supabase (prioritários)
  const {
    teamMembers: supabaseTeamMembers,
    pageTexts: supabasePageTexts,
    servicePages: supabaseServicePages,
    categories: supabaseCategories,
    isLoading: supabaseLoading,
    saveTeamMembers: saveSupabaseTeamMembers,
    savePageTexts: saveSupabasePageTexts,
    saveServicePages: saveSupabaseServicePages,
    saveCategories: saveSupabaseCategories,
    refreshData
  } = useSupabaseDataNew();

  // Dados do localStorage (fallback)
  const {
    teamMembers: localTeamMembers,
    pageTexts: localPageTexts,
    servicePages: localServicePages,
    categories: localCategories,
    savePageTexts: saveLocalPageTexts,
    saveTeamMembers: saveLocalTeamMembers,
    saveServicePages: saveLocalServicePages,
    saveCategories: saveLocalCategories
  } = useAdminData();

  // Determinar qual fonte de dados usar
  const hasSupabaseData = supabaseServicePages.length > 0 || supabaseTeamMembers.length > 0 || supabaseCategories.length > 0;
  const useSupabaseData = hasSupabaseData;

  // Dados finais (Supabase tem prioridade se disponível)
  const teamMembers = useSupabaseData ? supabaseTeamMembers : localTeamMembers;
  const pageTexts = useSupabaseData ? supabasePageTexts : localPageTexts;
  const servicePages = useSupabaseData ? supabaseServicePages : localServicePages;
  const categories = useSupabaseData ? supabaseCategories : localCategories;
  const isLoading = supabaseLoading;

  // Funções de salvamento (direcionam para Supabase se ativo)
  const updatePageTexts = async (texts: PageTexts) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabasePageTexts(texts);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalPageTexts(texts);
    }
  };

  const saveAllTeamMembers = async (members: TeamMember[]) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabaseTeamMembers(members);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalTeamMembers(members);
    }
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    if (useSupabaseData) {
      // Para Supabase, precisamos atualizar todo o array
      const updatedMembers = teamMembers.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      );
      saveAllTeamMembers(updatedMembers);
    } else {
      // Para localStorage, vamos atualizar diretamente e salvar
      const updatedMembers = teamMembers.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      );
      saveLocalTeamMembers(updatedMembers);
    }
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      oab: '',
      email: '',
      image: '',
      description: ''
    };
    
    if (useSupabaseData) {
      const updatedMembers = [...teamMembers, newMember];
      saveAllTeamMembers(updatedMembers);
    } else {
      const updatedMembers = [...teamMembers, newMember];
      saveLocalTeamMembers(updatedMembers);
    }
  };

  const removeTeamMember = (id: string) => {
    if (useSupabaseData) {
      const updatedMembers = teamMembers.filter(member => member.id !== id);
      saveAllTeamMembers(updatedMembers);
    } else {
      const updatedMembers = teamMembers.filter(member => member.id !== id);
      saveLocalTeamMembers(updatedMembers);
    }
  };

  const saveServicePagesData = async (pages: ServicePage[]) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabaseServicePages(pages);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalServicePages(pages);
    }
  };

  const saveCategoriesData = async (cats: CategoryInfo[]) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabaseCategories(cats);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalCategories(cats);
    }
  };

  const saveAll = async () => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await Promise.all([
          saveSupabasePageTexts(pageTexts),
          saveSupabaseTeamMembers(teamMembers),
          saveSupabaseServicePages(servicePages),
          saveSupabaseCategories(categories)
        ]);
        await refreshData();
      } finally {
        setIsTransitioning(false);
      }
    }
  };

  useEffect(() => {
    console.log('useAdminDataIntegrated - Estado atual:', {
      useSupabaseData,
      hasSupabaseData,
      supabasePages: supabaseServicePages.length,
      localPages: localServicePages.length,
      finalPages: servicePages.length
    });
  }, [useSupabaseData, hasSupabaseData, supabaseServicePages.length, localServicePages.length, servicePages.length]);

  return {
    // Dados
    teamMembers,
    pageTexts,
    servicePages,
    categories,
    isLoading: isLoading || isTransitioning,
    
    // Estado
    useSupabaseData,
    isTransitioning,
    
    // Funções de atualização
    updatePageTexts,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    saveServicePages: saveServicePagesData,
    saveCategories: saveCategoriesData,
    saveAll,
    refreshData
  };
};
