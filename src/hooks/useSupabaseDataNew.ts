
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
      console.log('🔄 CARREGANDO DADOS DO SUPABASE EM SEQUÊNCIA CORRIGIDA...');
      
      // 1. Carregar categorias primeiro (OBRIGATÓRIO)
      console.log('📂 1. Carregando categorias...');
      await loadCategories();
      
      // 2. Aguardar um tempo para garantir que as categorias estão disponíveis
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 3. Carregar páginas de serviços (que dependem das categorias)
      console.log('📄 2. Carregando páginas de serviços com vinculação...');
      await loadServicePages();
      
      // 4. Aguardar mais um pouco
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 5. Carregar outros dados em paralelo
      console.log('👥⚙️ 3. Carregando outros dados...');
      await Promise.all([
        loadTeamMembers(),
        loadPageTexts()
      ]);
      
      console.log('✅ TODOS OS DADOS CARREGADOS COM VINCULAÇÃO CORRETA');
    } catch (error) {
      console.error('❌ ERRO AO CARREGAR DADOS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount e escutar eventos de atualização
  useEffect(() => {
    refreshData();

    // Escutar eventos customizados para recarregar dados
    const handleRefresh = () => {
      console.log('🔄 Evento de refresh detectado');
      refreshData();
    };

    const handleServicePagesUpdate = () => {
      console.log('📄 Páginas de serviços atualizadas');
      loadServicePages();
    };

    window.addEventListener('refreshSupabaseData', handleRefresh);
    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate);

    return () => {
      window.removeEventListener('refreshSupabaseData', handleRefresh);
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate);
    };
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
