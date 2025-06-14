
import { useState, useEffect, useCallback } from 'react';
import { useSupabaseCategories } from './supabase/useSupabaseCategories';
import { useSupabaseTeamMembers } from './supabase/useSupabaseTeamMembers';
import { useSupabaseServicePages } from './supabase/useSupabaseServicePages';
import { useSupabasePageTexts } from './supabase/useSupabasePageTexts';

export const useSupabaseDataNew = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Individual hooks
  const {
    categories,
    loadCategories,
    saveCategories,
    setCategories
  } = useSupabaseCategories();

  const {
    teamMembers,
    loadTeamMembers,
    saveTeamMembers,
    setTeamMembers
  } = useSupabaseTeamMembers();

  const {
    servicePages,
    isLoading: servicePagesLoading,
    loadServicePages,
    saveServicePages,
    setServicePages
  } = useSupabaseServicePages();

  const {
    pageTexts,
    loadPageTexts,
    savePageTexts,
    setPageTexts
  } = useSupabasePageTexts();

  // Load all data - SEQUENCIAL para garantir ordem correta
  const refreshData = useCallback(async () => {
    if (hasInitialized) return;
    
    setIsLoading(true);
    try {
      console.log('🔄 CARREGANDO DADOS DO SUPABASE...');
      
      // Carregar dados em paralelo para melhor performance
      await Promise.all([
        loadCategories(),
        loadTeamMembers(),
        loadPageTexts(),
        loadServicePages()
      ]);
      
      console.log('✅ TODOS OS DADOS CARREGADOS');
      setHasInitialized(true);
    } catch (error) {
      console.error('❌ ERRO AO CARREGAR DADOS:', error);
    } finally {
      setIsLoading(false);
    }
  }, [hasInitialized, loadCategories, loadTeamMembers, loadPageTexts, loadServicePages]);

  // Load data on mount apenas uma vez
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Combinar o loading dos service pages com o loading geral
  const combinedLoading = isLoading || servicePagesLoading;

  return {
    // Data
    categories,
    teamMembers,
    servicePages,
    pageTexts,
    isLoading: combinedLoading,
    
    // Individual save functions
    saveCategories,
    saveTeamMembers,
    saveServicePages,
    savePageTexts,
    
    // Individual set functions
    setCategories,
    setTeamMembers,
    setServicePages,
    setPageTexts,
    
    // Refresh function
    refreshData: () => {
      setHasInitialized(false);
      refreshData();
    }
  };
};
