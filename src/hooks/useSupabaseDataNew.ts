
import { useState, useEffect } from 'react';
import { useSupabaseServicePages } from './supabase/useSupabaseServicePages';
import { useSupabaseCategories } from './supabase/useSupabaseCategories';
import { useSupabaseTeamMembers } from './supabase/useSupabaseTeamMembers';
import { useSupabasePageTexts } from './useSupabasePageTexts';
import { TeamMember, ServicePage, CategoryInfo, PageTexts } from '../types/adminTypes';
import { defaultPageTexts } from '../data/defaultPageTexts';

export const useSupabaseDataNew = () => {
  const [isLoading, setIsLoading] = useState(true);

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

  const [servicePages, setServicePagesState] = useState<ServicePage[]>([]);
  const [categories, setCategoriesState] = useState<CategoryInfo[]>([]);
  const [teamMembers, setTeamMembersState] = useState<TeamMember[]>([]);
  const [pageTexts, setPageTextsState] = useState<PageTexts>(defaultPageTexts);

  useEffect(() => {
    if (rawServicePages && Array.isArray(rawServicePages)) {
      setServicePagesState([...rawServicePages]);
    } else {
      setServicePagesState([]);
    }
  }, [rawServicePages]);

  useEffect(() => {
    if (rawCategories && Array.isArray(rawCategories)) {
      setCategoriesState([...rawCategories]);
    } else {
      setCategoriesState([]);
    }
  }, [rawCategories]);

  useEffect(() => {
    if (rawTeamMembers && Array.isArray(rawTeamMembers)) {
      setTeamMembersState([...rawTeamMembers]);
    } else {
      setTeamMembersState([]);
    }
  }, [rawTeamMembers]);

  useEffect(() => {
    if (rawPageTexts && typeof rawPageTexts === 'object' && Object.keys(rawPageTexts).length > 0) {
      setPageTextsState({ ...rawPageTexts });
    } else {
      setPageTextsState(defaultPageTexts);
    }
  }, [rawPageTexts]);

  useEffect(() => {
    const allLoaded = !servicePagesLoading && !categoriesLoading && !teamLoading && !pageTextsLoading;
    setIsLoading(!allLoaded);
  }, [servicePagesLoading, categoriesLoading, teamLoading, pageTextsLoading]);

  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      await saveCategoriesOnly(cats);
      setCategoriesState([...cats]);
    } catch (error) {
      console.error('Erro ao salvar categorias:', error);
      throw error;
    }
  };

  const savePageTextsWrapper = async (texts: PageTexts) => {
    try {
      await savePageTexts(texts);
      setPageTextsState({ ...texts });
      setPageTextsInHook(texts);
    } catch (error) {
      console.error('Erro ao salvar textos das páginas:', error);
      throw error;
    }
  };

  const setPageTexts = (texts: PageTexts) => {
    setPageTextsState({ ...texts });
  };

  const refreshData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        refetchServicePages(),
        refetchCategories(),
        refetchTeam(),
        refetchPageTexts()
      ]);
    } catch (error) {
      console.error('Erro ao recarregar dados:', error);
    } finally {
      setIsLoading(false);
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
    setTeamMembers: setTeamMembersState,
    setPageTexts,
    refreshData,
    refetchServicePages,
    refetchCategories,
    refetchTeam,
    refetchPageTexts
  };
};
