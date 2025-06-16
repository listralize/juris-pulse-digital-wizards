
import { useState, useEffect } from 'react';
import { useSupabaseServicePages } from './supabase/useSupabaseServicePages';
import { useSupabaseCategories } from './supabase/useSupabaseCategories';
import { useSupabaseTeamMembers } from './supabase/useSupabaseTeamMembers';
import { useSupabasePageTexts } from './supabase/useSupabasePageTexts';
import { TeamMember, ServicePage, CategoryInfo, PageTexts } from '../types/adminTypes';
import { defaultPageTexts } from '../data/defaultPageTexts';

export const useSupabaseDataNew = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { 
    servicePages: rawServicePages, 
    categories: rawCategories, 
    isLoading: servicePagesLoading,
    saveServicePages: saveServicePagesSupabase,
    setServicePages: setServicePagesLocal,
    loadServicePages,
    refetch: refetchServicePages
  } = useSupabaseServicePages();

  const { 
    categories: additionalCategories, 
    isLoading: categoriesLoading,
    saveCategories: saveCategoriesSupabase,
    setCategories: setCategoriesLocal,
    refetch: refetchCategories
  } = useSupabaseCategories();

  const { 
    teamMembers: rawTeamMembers, 
    isLoading: teamLoading,
    saveTeamMembers: saveTeamMembersSupabase,
    setTeamMembers: setTeamMembersLocal,
    refetch: refetchTeam
  } = useSupabaseTeamMembers();

  const { 
    pageTexts: rawPageTexts, 
    isLoading: pageTextsLoading,
    savePageTexts: savePageTextsSupabase,
    setPageTexts: setPageTextsLocal,
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

  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      await saveServicePagesSupabase(pages);
      setServicePagesState([...pages]);
    } catch (error) {
      console.error('Erro ao salvar páginas de serviços:', error);
      throw error;
    }
  };

  const saveCategories = async (cats: CategoryInfo[]) => {
    try {
      await saveCategoriesSupabase(cats);
      setCategoriesState([...cats]);
    } catch (error) {
      console.error('Erro ao salvar categorias:', error);
      throw error;
    }
  };

  const saveTeamMembers = async (members: TeamMember[]) => {
    try {
      await saveTeamMembersSupabase(members);
      setTeamMembersState([...members]);
    } catch (error) {
      console.error('Erro ao salvar membros da equipe:', error);
      throw error;
    }
  };

  const savePageTexts = async (texts: PageTexts) => {
    try {
      await savePageTextsSupabase(texts);
      setPageTextsState({ ...texts });
    } catch (error) {
      console.error('Erro ao salvar textos das páginas:', error);
      throw error;
    }
  };

  const setServicePages = (pages: ServicePage[]) => {
    setServicePagesState([...pages]);
    setServicePagesLocal(pages);
  };

  const setTeamMembers = (members: TeamMember[]) => {
    setTeamMembersState([...members]);
    setTeamMembersLocal(members);
  };

  const setPageTexts = (texts: PageTexts) => {
    setPageTextsState({ ...texts });
    setPageTextsLocal(texts);
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
    savePageTexts,
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
