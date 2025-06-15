
import { useState, useEffect } from 'react';
import { useSupabaseServicePages } from './supabase/useSupabaseServicePages';
import { useSupabaseCategories } from './supabase/useSupabaseCategories';
import { useSupabaseTeamMembers } from './supabase/useSupabaseTeamMembers';
import { useSupabasePageTexts } from './supabase/useSupabasePageTexts';
import { TeamMember, ServicePage, CategoryInfo, PageTexts } from '../types/adminTypes';

export const useSupabaseDataNew = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Hooks individuais
  const { 
    servicePages: rawServicePages, 
    categories: rawCategories, 
    isLoading: servicePagesLoading,
    saveServicePages,
    saveCategories: saveServiceCategories,
    setServicePages,
    loadServicePages,
    refetch: refetchServicePages
  } = useSupabaseServicePages();

  const { 
    categories: additionalCategories, 
    isLoading: categoriesLoading,
    saveCategories: saveCategoriesOnly,
    refetch: refetchCategories
  } = useSupabaseCategories();

  const { 
    teamMembers: rawTeamMembers, 
    isLoading: teamLoading,
    saveTeamMembers,
    setTeamMembers,
    refetch: refetchTeam
  } = useSupabaseTeamMembers();

  const { 
    pageTexts: rawPageTexts, 
    isLoading: pageTextsLoading,
    savePageTexts,
    setPageTexts,
    refetch: refetchPageTexts
  } = useSupabasePageTexts();

  // Estados processados com verificação de segurança
  const [servicePages, setServicePagesState] = useState<ServicePage[]>([]);
  const [categories, setCategoriesState] = useState<CategoryInfo[]>([]);
  const [teamMembers, setTeamMembersState] = useState<TeamMember[]>([]);
  const [pageTexts, setPageTextsState] = useState<PageTexts>({});

  // Atualizar estados quando dados mudam
  useEffect(() => {
    if (rawServicePages && Array.isArray(rawServicePages)) {
      console.log('🔄 useSupabaseDataNew: Atualizando servicePages:', rawServicePages.length);
      setServicePagesState([...rawServicePages]);
    } else {
      console.log('⚠️ useSupabaseDataNew: rawServicePages não é array válido:', rawServicePages);
      setServicePagesState([]);
    }
  }, [rawServicePages]);

  useEffect(() => {
    if (rawCategories && Array.isArray(rawCategories)) {
      console.log('🔄 useSupabaseDataNew: Atualizando categories:', rawCategories.length);
      setCategoriesState([...rawCategories]);
    } else {
      console.log('⚠️ useSupabaseDataNew: rawCategories não é array válido:', rawCategories);
      setCategoriesState([]);
    }
  }, [rawCategories]);

  useEffect(() => {
    if (rawTeamMembers && Array.isArray(rawTeamMembers)) {
      console.log('🔄 useSupabaseDataNew: Atualizando teamMembers:', rawTeamMembers.length);
      setTeamMembersState([...rawTeamMembers]);
    } else {
      console.log('⚠️ useSupabaseDataNew: rawTeamMembers não é array válido:', rawTeamMembers);
      setTeamMembersState([]);
    }
  }, [rawTeamMembers]);

  useEffect(() => {
    if (rawPageTexts && typeof rawPageTexts === 'object') {
      console.log('🔄 useSupabaseDataNew: Atualizando pageTexts');
      setPageTextsState({ ...rawPageTexts });
    } else {
      console.log('⚠️ useSupabaseDataNew: rawPageTexts não é objeto válido:', rawPageTexts);
      setPageTextsState({});
    }
  }, [rawPageTexts]);

  // Controle de loading geral
  useEffect(() => {
    const allLoaded = !servicePagesLoading && !categoriesLoading && !teamLoading && !pageTextsLoading;
    setIsLoading(!allLoaded);
    
    console.log('📊 useSupabaseDataNew Loading Status:', {
      servicePagesLoading,
      categoriesLoading,
      teamLoading,
      pageTextsLoading,
      isLoading: !allLoaded
    });
  }, [servicePagesLoading, categoriesLoading, teamLoading, pageTextsLoading]);

  // Função para salvar categorias (consolidada)
  const saveCategories = async (cats: CategoryInfo[]) => {
    console.log('💾 useSupabaseDataNew: Salvando categorias');
    try {
      await saveServiceCategories(cats);
      await saveCategoriesOnly(cats);
      setCategoriesState([...cats]);
    } catch (error) {
      console.error('❌ Erro ao salvar categorias:', error);
      throw error;
    }
  };

  // Função para recarregar todos os dados
  const refreshData = async () => {
    console.log('🔄 useSupabaseDataNew: Recarregando todos os dados');
    try {
      setIsLoading(true);
      await Promise.all([
        refetchServicePages(),
        refetchCategories(),
        refetchTeam(),
        refetchPageTexts()
      ]);
    } catch (error) {
      console.error('❌ Erro ao recarregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('📊 useSupabaseDataNew Status Final:', {
    servicePages: servicePages.length,
    categories: categories.length,
    teamMembers: teamMembers.length,
    isLoading
  });

  return {
    // Dados processados e seguros
    servicePages,
    categories,
    teamMembers,
    pageTexts,
    
    // Estados de loading
    isLoading,
    
    // Funções de manipulação
    saveServicePages,
    saveCategories,
    saveTeamMembers,
    savePageTexts,
    setServicePages,
    setTeamMembers,
    setPageTexts,
    refreshData,
    
    // Funções de recarga individual
    refetchServicePages,
    refetchCategories,
    refetchTeam,
    refetchPageTexts
  };
};
