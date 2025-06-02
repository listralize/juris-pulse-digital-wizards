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

  // MIGRAÇÃO SEQUENCIAL - Categorias primeiro, depois páginas
  const executeMigration = async () => {
    if (isTransitioning) return;

    console.log('🚀 EXECUTANDO MIGRAÇÃO SEQUENCIAL');
    setIsTransitioning(true);
    
    try {
      let migrationCount = 0;
      
      // 1. MIGRAR CATEGORIAS PRIMEIRO (obrigatório)
      if (localCategories.length > 0) {
        console.log('🔥 Migrando categorias primeiro...');
        
        const categoriesForMigration = localCategories.map((cat, index) => {
          const categoryName = cat.name || cat.label || `Categoria ${index + 1}`;
          const categoryValue = cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-') || `categoria-${index + 1}`;
          
          return {
            id: cat.id || crypto.randomUUID(),
            value: categoryValue,
            label: categoryName,
            name: categoryName,
            description: cat.description || `Descrição da ${categoryName}`,
            icon: cat.icon || 'FileText',
            color: cat.color || 'bg-blue-500'
          };
        });

        await saveSupabaseCategories(categoriesForMigration);
        migrationCount++;
        
        // Aguardar para garantir que as categorias foram salvas
        console.log('⏳ Aguardando categorias serem processadas...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Recarregar dados para pegar as categorias com IDs corretos
        await refreshData();
        console.log('✅ Categorias migradas e dados recarregados');
      }
      
      // 2. MIGRAR PÁGINAS DE SERVIÇOS (após categorias estarem no Supabase)
      if (localServicePages.length > 0) {
        console.log('📄 Migrando páginas de serviços...');
        await saveSupabaseServicePages(localServicePages);
        migrationCount++;
      }
      
      // 3. Migrar outros dados
      if (localPageTexts.heroTitle && !supabasePageTexts.heroTitle) {
        console.log('⚙️ Migrando configurações...');
        await saveSupabasePageTexts(localPageTexts);
        migrationCount++;
      }
      
      if (localTeamMembers.length > 0 && supabaseTeamMembers.length === 0) {
        console.log('👥 Migrando equipe...');
        await saveSupabaseTeamMembers(localTeamMembers);
        migrationCount++;
      }
      
      if (migrationCount > 0) {
        setHasMigrated(true);
        toast.success(`🎉 Migração concluída! ${migrationCount} tipos de dados migrados.`);
        
        // Recarregar dados finais
        await refreshData();
      }
    } catch (error) {
      console.error('❌ ERRO NA MIGRAÇÃO:', error);
      toast.error('❌ Erro na migração completa');
    } finally {
      setIsTransitioning(false);
    }
  };

  // MIGRAÇÃO FORÇADA ESPECÍFICA PARA CATEGORIAS
  const forceCategoryMigration = async () => {
    if (localCategories.length === 0) {
      console.log('⚠️ Nenhuma categoria local para migrar');
      toast.error('Nenhuma categoria local encontrada');
      return;
    }

    console.log('🔥 INICIANDO MIGRAÇÃO FORÇADA DE CATEGORIAS:', localCategories);
    setIsTransitioning(true);
    
    try {
      const categoriesForMigration = localCategories.map((cat, index) => {
        const categoryName = cat.name || cat.label || `Categoria ${index + 1}`;
        const categoryValue = cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-') || `categoria-${index + 1}`;
        
        return {
          id: cat.id || crypto.randomUUID(),
          value: categoryValue,
          label: categoryName,
          name: categoryName,
          description: cat.description || `Descrição da ${categoryName}`,
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-blue-500'
        };
      });

      console.log('📋 Categorias preparadas para migração:', categoriesForMigration);
      
      await saveSupabaseCategories(categoriesForMigration);
      
      // Aguardar e recarregar
      await new Promise(resolve => setTimeout(resolve, 3000));
      await refreshData();
      
      toast.success(`🎉 ${categoriesForMigration.length} categorias migradas com sucesso!`);
      setHasMigrated(true);
    } catch (error) {
      console.error('❌ Erro na migração de categorias:', error);
      toast.error(`❌ Erro na migração: ${error.message}`);
    } finally {
      setIsTransitioning(false);
    }
  };

  // Determinar qual fonte de dados usar - CORRIGIDO
  const hasSupabaseData = supabaseCategories.length > 0 || supabaseServicePages.length > 0 || supabaseTeamMembers.length > 0 || supabasePageTexts.heroTitle;
  const useSupabaseData = hasSupabaseData;

  console.log('🔍 DECISÃO DE FONTE DE DADOS:', {
    supabaseCategories: supabaseCategories.length,
    supabaseServicePages: supabaseServicePages.length,
    localCategories: localCategories.length,
    localServicePages: localServicePages.length,
    hasSupabaseData,
    useSupabaseData
  });

  // Dados finais
  const teamMembers = useSupabaseData ? supabaseTeamMembers : localTeamMembers;
  const pageTexts = useSupabaseData ? supabasePageTexts : localPageTexts;
  const servicePages = useSupabaseData ? supabaseServicePages : localServicePages;
  const categories = useSupabaseData ? supabaseCategories : localCategories;
  const isLoading = supabaseLoading || isTransitioning;

  console.log('📊 DADOS FINAIS SENDO RETORNADOS:', {
    categories: categories.length,
    servicePages: servicePages.length,
    teamMembers: teamMembers.length,
    useSupabaseData,
    categoriesData: categories,
    servicePagesData: servicePages
  });

  // WRAPPER PARA SINCRONIZAÇÃO AUTOMÁTICA
  const autoSyncWrapper = async (operation: () => Promise<void>, successMessage: string) => {
    if (!autoSyncEnabled) return;
    
    try {
      await operation();
      console.log('✅', successMessage);
      // Refresh automático em background
      setTimeout(async () => {
        await refreshData();
      }, 500);
      toast.success(successMessage);
    } catch (error) {
      console.error('❌ Erro na sincronização:', error);
      toast.error('❌ Erro ao sincronizar dados');
    }
  };

  // FUNÇÕES DE SALVAMENTO COM AUTO-SYNC
  const updatePageTexts = async (texts: PageTexts) => {
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await saveSupabasePageTexts(texts);
      }, 'Configurações salvas');
    } else {
      saveLocalPageTexts(texts);
    }
  };

  const saveAllTeamMembers = async (members: TeamMember[]) => {
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await saveSupabaseTeamMembers(members);
      }, 'Equipe salva');
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
      }, 'Páginas salvas');
    } else {
      saveLocalServicePages(pages);
    }
  };

  const saveCategoriesData = async (cats: CategoryInfo[]) => {
    console.log('💾 SALVANDO CATEGORIAS:', cats.length);
    if (useSupabaseData) {
      await autoSyncWrapper(async () => {
        await saveSupabaseCategories(cats);
      }, `${cats.length} categorias salvas`);
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
      }, 'Todos os dados salvos');
    }
  };

  const refreshDataManual = async () => {
    console.log('🔄 REFRESH MANUAL INICIADO');
    setIsTransitioning(true);
    try {
      await refreshData();
      console.log('✅ Dados recarregados');
      toast.success('Dados recarregados');
    } catch (error) {
      console.error('❌ Erro ao recarregar:', error);
      toast.error('Erro ao recarregar dados');
    } finally {
      setIsTransitioning(false);
    }
  };

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
    
    // Funções de atualização
    updatePageTexts,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    saveServicePages: saveServicePagesData,
    saveCategories: saveCategoriesData,
    saveAll,
    refreshData: refreshDataManual,
    
    // Migração
    executeMigration,
    forceCategoryMigration,
    
    // Controles
    autoSyncEnabled,
    setAutoSyncEnabled
  };
};
