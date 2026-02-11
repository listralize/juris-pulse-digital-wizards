
import { useMemo } from 'react';
import { useSupabaseServicePages } from './supabase/useSupabaseServicePages';
import { useSupabaseCategories } from './supabase/useSupabaseCategories';
import { useSupabaseTeamMembers } from './supabase/useSupabaseTeamMembers';
import { useSupabasePageTexts } from './supabase/useSupabasePageTexts';
import { TeamMember, ServicePage, CategoryInfo, PageTexts } from '../types/adminTypes';
import { defaultPageTexts } from '../data/defaultPageTexts';

export const useSupabaseDataNew = () => {
  const { 
    servicePages: rawServicePages, 
    categories: rawCategories, 
    isLoading: servicePagesLoading,
    saveServicePages,
    setServicePages,
    loadServicePages,
    refetch: refetchServicePages
  } = useSupabaseServicePages();

  const { 
    categories: additionalCategories, 
    isLoading: categoriesLoading,
    saveCategories: saveCategoriesOnly,
    setCategories,
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
    setPageTexts: setPageTextsInHook,
    refetch: refetchPageTexts
  } = useSupabasePageTexts();

  // Derive data directly from hooks with fallbacks - no redundant state copies
  const servicePages = useMemo<ServicePage[]>(
    () => (rawServicePages && Array.isArray(rawServicePages) ? rawServicePages : []),
    [rawServicePages]
  );

  const categories = useMemo<CategoryInfo[]>(
    () => (rawCategories && Array.isArray(rawCategories) ? rawCategories : []),
    [rawCategories]
  );

  const teamMembers = useMemo<TeamMember[]>(
    () => (rawTeamMembers && Array.isArray(rawTeamMembers) ? rawTeamMembers : []),
    [rawTeamMembers]
  );

  const pageTexts = useMemo<PageTexts>(
    () => (rawPageTexts && typeof rawPageTexts === 'object' && Object.keys(rawPageTexts).length > 0 
      ? rawPageTexts 
      : defaultPageTexts),
    [rawPageTexts]
  );

  const isLoading = useMemo(
    () => servicePagesLoading || categoriesLoading || teamLoading || pageTextsLoading,
    [servicePagesLoading, categoriesLoading, teamLoading, pageTextsLoading]
  );

  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      await saveCategoriesOnly(cats);
    } catch (error) {
      console.error('Erro ao salvar categorias:', error);
      throw error;
    }
  };

  const savePageTextsWrapper = async (texts: PageTexts) => {
    try {
      await savePageTexts(texts);
      setPageTextsInHook(texts);
    } catch (error) {
      console.error('Erro ao salvar textos das páginas:', error);
      throw error;
    }
  };

  const setPageTexts = (texts: PageTexts) => {
    setPageTextsInHook(texts);
  };

  const refreshData = async () => {
    try {
      await Promise.all([
        refetchServicePages(),
        refetchCategories(),
        refetchTeam(),
        refetchPageTexts()
      ]);
    } catch (error) {
      console.error('Erro ao recarregar dados:', error);
    }
  };

  return {
    servicePages,
    categories,
    teamMembers,
    pageTexts,
    isLoading,
    saveServicePages,
    saveCategories,
    saveTeamMembers,
    savePageTexts: savePageTextsWrapper,
    setServicePages,
    setTeamMembers,
    setPageTexts,
    refreshData,
    refetchServicePages,
    refetchCategories,
    refetchTeam,
    refetchPageTexts
  };
};