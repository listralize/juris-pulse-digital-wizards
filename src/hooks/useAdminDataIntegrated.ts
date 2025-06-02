
import { useState, useEffect } from 'react';
import { TeamMember, PageTexts, ServicePage, CategoryInfo } from '../types/adminTypes';
import { useSupabaseDataNew } from './useSupabaseDataNew';
import { useAdminData } from './useAdminData';
import { toast } from 'sonner';

export const useAdminDataIntegrated = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasMigrated, setHasMigrated] = useState(false);
  
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

  // Função para executar migração manual
  const executeMigration = async () => {
    console.log('🚀 INICIANDO MIGRAÇÃO MANUAL');
    console.log('📊 Dados localStorage:', {
      servicePages: localServicePages.length,
      teamMembers: localTeamMembers.length,
      categories: localCategories.length,
      pageTexts: !!localPageTexts.heroTitle
    });
    console.log('📊 Dados Supabase:', {
      servicePages: supabaseServicePages.length,
      teamMembers: supabaseTeamMembers.length,
      categories: supabaseCategories.length,
      pageTexts: !!supabasePageTexts.heroTitle
    });
    
    setIsTransitioning(true);
    
    try {
      let migrationCount = 0;
      
      // 1. Migrar categorias PRIMEIRO (dependência para service pages)
      if (localCategories.length > 0) {
        console.log('📂 Migrando categorias...', localCategories.length);
        await saveSupabaseCategories(localCategories);
        migrationCount++;
        console.log('✅ Categorias migradas');
        
        // Aguardar para garantir que as categorias estão salvas
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // 2. Migrar configurações
      if (localPageTexts.heroTitle && !supabasePageTexts.heroTitle) {
        console.log('⚙️ Migrando configurações...');
        await saveSupabasePageTexts(localPageTexts);
        migrationCount++;
        console.log('✅ Configurações migradas');
      }
      
      // 3. Migrar equipe
      if (localTeamMembers.length > 0) {
        console.log('👥 Migrando equipe...', localTeamMembers.length);
        await saveSupabaseTeamMembers(localTeamMembers);
        migrationCount++;
        console.log('✅ Equipe migrada');
      }
      
      // 4. Migrar páginas de serviços (depois das categorias)
      if (localServicePages.length > 0) {
        console.log('📄 Migrando páginas de serviços...', localServicePages.length);
        await saveSupabaseServicePages(localServicePages);
        migrationCount++;
        console.log('✅ Páginas de serviços migradas');
      }
      
      if (migrationCount > 0) {
        console.log('⏳ Recarregando dados...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await refreshData();
        
        setHasMigrated(true);
        toast.success(`🎉 Migração concluída! ${migrationCount} tipos de dados migrados.`);
        console.log('🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO');
      } else {
        toast.info('ℹ️ Nenhum dado novo para migrar.');
        console.log('ℹ️ NENHUM DADO PARA MIGRAR');
      }
    } catch (error) {
      console.error('❌ ERRO NA MIGRAÇÃO:', error);
      toast.error('❌ Erro na migração. Verifique o console.');
    } finally {
      setIsTransitioning(false);
    }
  };

  // Auto-migração inteligente
  useEffect(() => {
    const autoMigrate = async () => {
      if (supabaseLoading || hasMigrated || isTransitioning) return;
      
      const hasLocalData = localTeamMembers.length > 0 || localServicePages.length > 0 || localCategories.length > 0 || localPageTexts.heroTitle;
      const hasSupabaseData = supabaseServicePages.length > 0 || supabaseTeamMembers.length > 0 || supabaseCategories.length > 0 || supabasePageTexts.heroTitle;
      
      console.log('🔍 VERIFICAÇÃO AUTO-MIGRAÇÃO:', {
        hasLocalData,
        hasSupabaseData,
        localPages: localServicePages.length,
        supabasePages: supabaseServicePages.length,
        localTeam: localTeamMembers.length,
        supabaseTeam: supabaseTeamMembers.length,
        localCategories: localCategories.length,
        supabaseCategories: supabaseCategories.length
      });
      
      // FORÇAR migração se há dados locais significativos e poucos ou nenhum dado no Supabase
      if (hasLocalData && (!hasSupabaseData || 
          supabaseServicePages.length < localServicePages.length * 0.8 ||
          supabaseCategories.length < localCategories.length * 0.8)) {
        console.log('🔄 Iniciando migração automática...');
        await executeMigration();
      } else if (hasSupabaseData) {
        setHasMigrated(true);
        console.log('✅ Dados já existem no Supabase');
      }
    };

    const timer = setTimeout(autoMigrate, 2000);
    return () => clearTimeout(timer);
  }, [
    supabaseLoading, 
    localTeamMembers.length, 
    localServicePages.length, 
    localCategories.length,
    localPageTexts.heroTitle,
    supabaseTeamMembers.length,
    supabaseServicePages.length,
    supabaseCategories.length,
    supabasePageTexts.heroTitle,
    hasMigrated,
    isTransitioning
  ]);

  // Determinar qual fonte de dados usar
  const hasSupabaseData = supabaseServicePages.length > 0 || supabaseTeamMembers.length > 0 || supabaseCategories.length > 0 || supabasePageTexts.heroTitle;
  const useSupabaseData = hasSupabaseData;

  // Dados finais (Supabase tem prioridade se disponível)
  const teamMembers = useSupabaseData ? supabaseTeamMembers : localTeamMembers;
  const pageTexts = useSupabaseData ? supabasePageTexts : localPageTexts;
  const servicePages = useSupabaseData ? supabaseServicePages : localServicePages;
  const categories = useSupabaseData ? supabaseCategories : localCategories;
  const isLoading = supabaseLoading || isTransitioning;

  // SISTEMA DE SINCRONIZAÇÃO AUTOMÁTICA - MAIS AVANÇADO
  const autoSyncWrapper = async (operation: () => Promise<void>) => {
    setIsTransitioning(true);
    try {
      await operation();
      // Auto-refresh após qualquer operação
      setTimeout(async () => {
        await refreshData();
      }, 1000);
    } finally {
      setIsTransitioning(false);
    }
  };

  // Funções de salvamento com sincronização automática
  const updatePageTexts = async (texts: PageTexts) => {
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await saveSupabasePageTexts(texts);
        toast.success('💾 Configurações salvas automaticamente');
      });
    } else {
      saveLocalPageTexts(texts);
    }
  };

  const saveAllTeamMembers = async (members: TeamMember[]) => {
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await saveSupabaseTeamMembers(members);
        toast.success('👥 Equipe salva automaticamente');
      });
    } else {
      saveLocalTeamMembers(members);
    }
  };

  const updateTeamMember = async (id: string, field: keyof TeamMember, value: string) => {
    const updatedMembers = teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    );
    await saveAllTeamMembers(updatedMembers);
  };

  const addTeamMember = async () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      oab: '',
      email: '',
      image: '',
      description: ''
    };
    
    const updatedMembers = [...teamMembers, newMember];
    await saveAllTeamMembers(updatedMembers);
  };

  const removeTeamMember = async (id: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    await saveAllTeamMembers(updatedMembers);
  };

  const saveServicePagesData = async (pages: ServicePage[]) => {
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await saveSupabaseServicePages(pages);
        toast.success('📄 Páginas salvas automaticamente');
      });
    } else {
      saveLocalServicePages(pages);
    }
  };

  const saveCategoriesData = async (cats: CategoryInfo[]) => {
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await saveSupabaseCategories(cats);
        toast.success('📂 Categorias salvas automaticamente');
      });
    } else {
      saveLocalCategories(cats);
    }
  };

  const saveAll = async () => {
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await Promise.all([
          saveSupabasePageTexts(pageTexts),
          saveSupabaseTeamMembers(teamMembers),
          saveSupabaseCategories(categories),
          saveSupabaseServicePages(servicePages)
        ]);
        toast.success('💾 Todos os dados salvos automaticamente');
      });
    }
  };

  const refreshDataManual = async () => {
    console.log('🔄 RECARREGANDO DADOS MANUALMENTE');
    await refreshData();
  };

  console.log('🎯 useAdminDataIntegrated - Estado atual:', {
    useSupabaseData,
    hasSupabaseData,
    supabasePages: supabaseServicePages.length,
    localPages: localServicePages.length,
    supabaseCategories: supabaseCategories.length,
    localCategories: localCategories.length,
    finalPages: servicePages.length,
    finalCategories: categories.length,
    isTransitioning,
    isLoading
  });

  return {
    // Dados
    teamMembers,
    pageTexts,
    servicePages,
    categories,
    isLoading,
    
    // Estado
    useSupabaseData,
    isTransitioning,
    
    // Funções de atualização com auto-sync
    updatePageTexts,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    saveServicePages: saveServicePagesData,
    saveCategories: saveCategoriesData,
    saveAll,
    refreshData: refreshDataManual,
    
    // Função para migração manual
    executeMigration
  };
};
