
import { useState, useEffect, useCallback } from 'react';
import { useSupabaseCategories } from './supabase/useSupabaseCategories';
import { useSupabaseTeamMembers } from './supabase/useSupabaseTeamMembers';
import { useSupabaseServicePages } from './supabase/useSupabaseServicePages';
import { useSupabasePageTexts } from './supabase/useSupabasePageTexts';

export const useSupabaseDataNew = () => {
  const [isLoading, setIsLoading] = useState(true);

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

  // Load all data - SIMPLIFICADO para evitar problemas
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('🔄 CARREGANDO DADOS DO SUPABASE...');
      
      // Carregar dados em paralelo
      await Promise.all([
        loadCategories(),
        loadTeamMembers(),
        loadPageTexts(),
        loadServicePages()
      ]);
      
      console.log('✅ TODOS OS DADOS CARREGADOS');
    } catch (error) {
      console.error('❌ ERRO AO CARREGAR DADOS:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadCategories, loadTeamMembers, loadPageTexts, loadServicePages]);

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

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
    refreshData
  };
};
