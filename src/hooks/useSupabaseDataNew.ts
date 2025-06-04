
import { useState, useEffect } from 'react';
import { useSupabaseCategories } from './supabase/useSupabaseCategories';
import { useSupabaseTeamMembers } from './supabase/useSupabaseTeamMembers';
import { useSupabaseServicePages } from './supabase/useSupabaseServicePages';
import { useSupabasePageTexts } from './supabase/useSupabasePageTexts';

export const useSupabaseDataNew = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

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

  // Load all data com force refresh
  const refreshData = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      console.log('🔄 CARREGANDO DADOS DO SUPABASE...');
      
      if (forceRefresh) {
        console.log('🔄 REFRESH FORÇADO - Recarregando tudo...');
      }
      
      // Carregar dados em paralelo para melhor performance
      await Promise.all([
        loadCategories(),
        loadTeamMembers(),
        loadServicePages(),
        loadPageTexts()
      ]);
      
      setLastRefresh(Date.now());
      console.log('✅ TODOS OS DADOS CARREGADOS');
    } catch (error) {
      console.error('❌ ERRO AO CARREGAR DADOS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Auto-refresh a cada 30 segundos para manter dados sincronizados
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto-refresh dos dados...');
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    // Data
    categories,
    teamMembers,
    servicePages,
    pageTexts,
    isLoading,
    lastRefresh,
    
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
    refreshData: () => refreshData(true)
  };
};
