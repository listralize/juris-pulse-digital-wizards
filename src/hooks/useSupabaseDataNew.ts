
import { useState, useEffect } from 'react';
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
  const refreshData = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 CARREGANDO DADOS DO SUPABASE EM SEQUÊNCIA...');
      
      // 1. Carregar categorias primeiro
      console.log('📂 1. Carregando categorias...');
      await loadCategories();
      
      // 2. Aguardar um pouco para garantir que as categorias estão disponíveis
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 3. Carregar páginas de serviços (que dependem das categorias)
      console.log('📄 2. Carregando páginas de serviços...');
      await loadServicePages();
      
      // 4. Carregar outros dados em paralelo
      console.log('👥⚙️ 3. Carregando outros dados...');
      await Promise.all([
        loadTeamMembers(),
        loadPageTexts()
      ]);
      
      console.log('✅ TODOS OS DADOS CARREGADOS EM SEQUÊNCIA');
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

  return {
    // Data
    categories,
    teamMembers,
    servicePages,
    pageTexts,
    isLoading,
    
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
