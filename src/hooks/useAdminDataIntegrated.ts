
import { useState, useEffect } from 'react';
import { TeamMember, PageTexts, ServicePage, CategoryInfo } from '../types/adminTypes';
import { useSupabaseDataNew } from './useSupabaseDataNew';
import { useAdminData } from './useAdminData';
import { toast } from 'sonner';

export const useAdminDataIntegrated = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasMigrated, setHasMigrated] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  
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

  // Função para executar migração manual (SEM LOOPS)
  const executeMigration = async () => {
    if (isTransitioning) {
      console.log('⏸️ Migração já em andamento, ignorando nova tentativa');
      return;
    }

    console.log('🚀 INICIANDO MIGRAÇÃO MANUAL');
    setIsTransitioning(true);
    
    try {
      let migrationCount = 0;
      
      // 1. Migrar categorias PRIMEIRO (dependência para service pages)
      if (localCategories.length > 0 && supabaseCategories.length === 0) {
        console.log('📂 Migrando categorias...', localCategories.length);
        await saveSupabaseCategories(localCategories);
        migrationCount++;
        console.log('✅ Categorias migradas');
        
        // Aguardar para garantir que as categorias estão salvas
        await new Promise(resolve => setTimeout(resolve, 2000));
        await refreshData();
      }
      
      // 2. Migrar configurações
      if (localPageTexts.heroTitle && !supabasePageTexts.heroTitle) {
        console.log('⚙️ Migrando configurações...');
        await saveSupabasePageTexts(localPageTexts);
        migrationCount++;
        console.log('✅ Configurações migradas');
      }
      
      // 3. Migrar equipe
      if (localTeamMembers.length > 0 && supabaseTeamMembers.length === 0) {
        console.log('👥 Migrando equipe...', localTeamMembers.length);
        await saveSupabaseTeamMembers(localTeamMembers);
        migrationCount++;
        console.log('✅ Equipe migrada');
      }
      
      // 4. Migrar páginas de serviços (depois das categorias)
      if (localServicePages.length > 0 && supabaseServicePages.length === 0) {
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
        console.log('ℹ️ NENHUM DADO PARA MIGRAR');
      }
    } catch (error) {
      console.error('❌ ERRO NA MIGRAÇÃO:', error);
      toast.error('❌ Erro na migração. Dados serão usados do localStorage.');
    } finally {
      setIsTransitioning(false);
    }
  };

  // Auto-migração inteligente (SEM LOOPS INFINITOS)
  useEffect(() => {
    if (supabaseLoading || hasMigrated || isTransitioning) return;
    
    const hasLocalData = localTeamMembers.length > 0 || localServicePages.length > 0 || localCategories.length > 0 || localPageTexts.heroTitle;
    const hasSupabaseData = supabaseServicePages.length > 0 || supabaseTeamMembers.length > 0 || supabaseCategories.length > 0 || supabasePageTexts.heroTitle;
    
    console.log('🔍 VERIFICAÇÃO AUTO-MIGRAÇÃO:', {
      hasLocalData,
      hasSupabaseData,
      categoriesNeedMigration: localCategories.length > 0 && supabaseCategories.length === 0
    });
    
    // MIGRAR apenas se há dados locais e NADA no Supabase (primeira vez)
    if (hasLocalData && !hasSupabaseData) {
      console.log('🔄 Iniciando migração automática...');
      executeMigration();
    } else if (hasSupabaseData) {
      setHasMigrated(true);
      console.log('✅ Dados já existem no Supabase');
    }
  }, [
    supabaseLoading, 
    localTeamMembers.length, 
    localServicePages.length, 
    localCategories.length,
    supabaseTeamMembers.length,
    supabaseServicePages.length,
    supabaseCategories.length,
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

  // SISTEMA DE SINCRONIZAÇÃO AUTOMÁTICA INSTANTÂNEA
  const instantSyncWrapper = async (operation: () => Promise<void>, successMessage: string) => {
    if (!autoSyncEnabled) return;
    
    setIsTransitioning(true);
    try {
      await operation();
      console.log('✅', successMessage);
      // Auto-refresh em background (sem bloquear UI)
      setTimeout(async () => {
        await refreshData();
      }, 500);
    } catch (error) {
      console.error('❌ Erro na sincronização:', error);
      toast.error('❌ Erro ao sincronizar. Tente novamente.');
    } finally {
      setTimeout(() => setIsTransitioning(false), 100);
    }
  };

  // Funções de salvamento com sincronização INSTANTÂNEA
  const updatePageTexts = async (texts: PageTexts) => {
    if (useSupabaseData) {
      await instantSyncWrapper(async () => {
        await saveSupabasePageTexts(texts);
      }, 'Configurações salvas automaticamente');
    } else {
      saveLocalPageTexts(texts);
    }
  };

  const saveAllTeamMembers = async (members: TeamMember[]) => {
    if (useSupabaseData) {
      await instantSyncWrapper(async () => {
        await saveSupabaseTeamMembers(members);
      }, 'Equipe salva automaticamente');
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
      await instantSyncWrapper(async () => {
        await saveSupabaseServicePages(pages);
      }, 'Páginas salvas automaticamente');
    } else {
      saveLocalServicePages(pages);
    }
  };

  const saveCategoriesData = async (cats: CategoryInfo[]) => {
    if (useSupabaseData) {
      await instantSyncWrapper(async () => {
        await saveSupabaseCategories(cats);
      }, 'Categorias salvas automaticamente');
    } else {
      saveLocalCategories(cats);
    }
  };

  const saveAll = async () => {
    if (useSupabaseData) {
      await instantSyncWrapper(async () => {
        await Promise.all([
          saveSupabasePageTexts(pageTexts),
          saveSupabaseTeamMembers(teamMembers),
          saveSupabaseCategories(categories),
          saveSupabaseServicePages(servicePages)
        ]);
      }, 'Todos os dados salvos automaticamente');
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
    isLoading,
    autoSyncEnabled
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
    
    // Funções de atualização com auto-sync INSTANTÂNEO
    updatePageTexts,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    saveServicePages: saveServicePagesData,
    saveCategories: saveCategoriesData,
    saveAll,
    refreshData: refreshDataManual,
    
    // Função para migração manual
    executeMigration,
    
    // Controle de sync automático
    autoSyncEnabled,
    setAutoSyncEnabled
  };
};
