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

  // MIGRAÇÃO COMPLETA E SEQUENCIAL - CORRIGIDA
  const executeMigration = async () => {
    if (isTransitioning) return;

    console.log('🚀 INICIANDO MIGRAÇÃO COMPLETA SEQUENCIAL - VERSÃO CORRIGIDA');
    setIsTransitioning(true);
    
    try {
      let migrationCount = 0;
      
      // ETAPA 1: SEMPRE migrar categorias primeiro (obrigatório para funcionar)
      console.log('📂 ETAPA 1: Migrando categorias...');
      
      if (localCategories.length > 0) {
        console.log('📋 Categorias locais encontradas:', localCategories.length);
        
        const categoriesForMigration = localCategories.map((cat, index) => {
          const categoryName = cat.name || cat.label || `Categoria ${index + 1}`;
          const categoryKey = cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-') || `categoria-${index + 1}`;
          
          return {
            id: cat.id || crypto.randomUUID(),
            value: categoryKey,
            label: categoryName,
            name: categoryName,
            description: cat.description || `Descrição da ${categoryName}`,
            icon: cat.icon || 'FileText',
            color: cat.color || 'bg-blue-500'
          };
        });

        console.log('📋 Categorias preparadas:', categoriesForMigration);
        await saveSupabaseCategories(categoriesForMigration);
        migrationCount++;
        
        // Aguardar processamento das categorias
        console.log('⏳ Aguardando categorias serem processadas...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Recarregar dados para garantir que as categorias estão no Supabase
        await refreshData();
        console.log('✅ Categorias migradas e dados recarregados');
      }
      
      // ETAPA 2: MIGRAÇÃO FORÇADA DAS PÁGINAS - NOVA LÓGICA
      if (localServicePages.length > 0) {
        console.log('📄 ETAPA 2: Migrando páginas de serviços...');
        console.log(`📄 Total de páginas a migrar: ${localServicePages.length}`);
        
        // Buscar categorias atualizadas do Supabase para fazer a vinculação
        const { categories: currentSupabaseCategories } = await new Promise(resolve => {
          setTimeout(async () => {
            await refreshData();
            resolve({ categories: supabaseCategories });
          }, 1000);
        });
        
        console.log('📂 Categorias disponíveis para vinculação:', currentSupabaseCategories?.length || 0);
        
        // Migrar páginas com vinculação correta
        const pagesWithCorrectCategories = localServicePages.map(page => {
          // Buscar categoria correspondente
          const matchingCategory = currentSupabaseCategories?.find(cat => 
            cat.value === page.category || 
            cat.name === page.category ||
            cat.label === page.category
          );
          
          if (matchingCategory) {
            console.log(`📄 Página "${page.title}" vinculada à categoria "${matchingCategory.name}"`);
            return {
              ...page,
              category: matchingCategory.value,
              id: page.id || crypto.randomUUID()
            };
          } else {
            console.warn(`⚠️ Categoria "${page.category}" não encontrada para página "${page.title}"`);
            return null;
          }
        }).filter(Boolean);
        
        console.log(`📄 Páginas válidas para migração: ${pagesWithCorrectCategories.length}`);
        
        if (pagesWithCorrectCategories.length > 0) {
          await saveSupabaseServicePages(pagesWithCorrectCategories);
          migrationCount++;
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          await refreshData();
        }
      }
      
      // ETAPA 3: Migrar outros dados
      if (localPageTexts.heroTitle && !supabasePageTexts.heroTitle) {
        console.log('⚙️ ETAPA 3: Migrando configurações...');
        await saveSupabasePageTexts(localPageTexts);
        migrationCount++;
      }
      
      if (localTeamMembers.length > 0 && supabaseTeamMembers.length === 0) {
        console.log('👥 ETAPA 4: Migrando equipe...');
        await saveSupabaseTeamMembers(localTeamMembers);
        migrationCount++;
      }
      
      // Recarregamento final para garantir que tudo está sincronizado
      console.log('🔄 Recarregamento final...');
      await refreshData();
      
      if (migrationCount > 0) {
        setHasMigrated(true);
        toast.success(`🎉 Migração concluída! ${migrationCount} tipos de dados migrados.`);
      } else {
        toast.info('ℹ️ Nenhum dado novo para migrar');
      }
      
    } catch (error) {
      console.error('❌ ERRO NA MIGRAÇÃO:', error);
      toast.error(`❌ Erro na migração: ${error.message}`);
    } finally {
      setIsTransitioning(false);
    }
  };

  // MIGRAÇÃO FORÇADA ESPECÍFICA PARA CATEGORIAS
  const forceCategoryMigration = async () => {
    console.log('🔥 INICIANDO MIGRAÇÃO FORÇADA DE CATEGORIAS');
    setIsTransitioning(true);
    
    try {
      // Usar categorias locais ou padrão
      let categoriesToMigrate = localCategories;
      
      if (categoriesToMigrate.length === 0) {
        console.log('📋 Usando categorias padrão...');
        categoriesToMigrate = [
          {
            id: 'familia-' + Date.now(),
            value: 'familia',
            label: 'Direito de Família',
            name: 'Direito de Família',
            description: 'Proteção e orientação em questões familiares',
            icon: 'Heart',
            color: 'bg-rose-500'
          },
          {
            id: 'tributario-' + Date.now(),
            value: 'tributario',
            label: 'Direito Tributário',
            name: 'Direito Tributário',
            description: 'Consultoria e planejamento tributário',
            icon: 'Calculator',
            color: 'bg-blue-500'
          },
          {
            id: 'empresarial-' + Date.now(),
            value: 'empresarial',
            label: 'Direito Empresarial',
            name: 'Direito Empresarial',
            description: 'Suporte jurídico para empresas',
            icon: 'Building2',
            color: 'bg-green-500'
          },
          {
            id: 'trabalho-' + Date.now(),
            value: 'trabalho',
            label: 'Direito do Trabalho',
            name: 'Direito do Trabalho',
            description: 'Defesa dos direitos trabalhistas',
            icon: 'Users',
            color: 'bg-orange-500'
          }
        ];
      }

      const categoriesForMigration = categoriesToMigrate.map((cat, index) => {
        const categoryName = cat.name || cat.label || `Categoria ${index + 1}`;
        const categoryKey = cat.value || cat.name?.toLowerCase().replace(/\s+/g, '-') || `categoria-${index + 1}`;
        
        return {
          id: cat.id || crypto.randomUUID(),
          value: categoryKey,
          label: categoryName,
          name: categoryName,
          description: cat.description || `Descrição da ${categoryName}`,
          icon: cat.icon || 'FileText',
          color: cat.color || 'bg-blue-500'
        };
      });

      console.log('📋 Categorias preparadas para migração:', categoriesForMigration);
      
      await saveSupabaseCategories(categoriesForMigration);
      
      // Aguardar e recarregar múltiplas vezes para garantir sincronia
      await new Promise(resolve => setTimeout(resolve, 3000));
      await refreshData();
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  // Lógica de determinação da fonte de dados - CORRIGIDA
  console.log('🔍 ESTADO ATUAL DOS DADOS:', {
    supabaseCategories: supabaseCategories?.length || 0,
    supabaseServicePages: supabaseServicePages?.length || 0,
    supabaseTeamMembers: supabaseTeamMembers?.length || 0,
    localCategories: localCategories?.length || 0,
    localServicePages: localServicePages?.length || 0,
    localTeamMembers: localTeamMembers?.length || 0,
    supabasePageTexts: !!supabasePageTexts?.heroTitle
  });

  // Usar Supabase se houver qualquer dado lá, senão usar localStorage
  const hasSupabaseData = (supabaseCategories?.length > 0) || 
                         (supabaseServicePages?.length > 0) || 
                         (supabaseTeamMembers?.length > 0) || 
                         !!supabasePageTexts?.heroTitle;

  const useSupabaseData = hasSupabaseData;

  console.log('🎯 FONTE DE DADOS ESCOLHIDA:', {
    hasSupabaseData,
    useSupabaseData,
    reason: hasSupabaseData ? 'Dados encontrados no Supabase' : 'Usando localStorage como fallback'
  });

  // Dados finais retornados
  const teamMembers = useSupabaseData ? (supabaseTeamMembers || []) : (localTeamMembers || []);
  const pageTexts = useSupabaseData ? (supabasePageTexts || localPageTexts) : localPageTexts;
  const servicePages = useSupabaseData ? (supabaseServicePages || []) : (localServicePages || []);
  const categories = useSupabaseData ? (supabaseCategories || []) : (localCategories || []);
  const isLoading = supabaseLoading || isTransitioning;

  console.log('📊 DADOS FINAIS RETORNADOS:', {
    categories: categories?.length || 0,
    servicePages: servicePages?.length || 0,
    teamMembers: teamMembers?.length || 0,
    useSupabaseData,
    isLoading
  });

  // WRAPPER PARA SINCRONIZAÇÃO AUTOMÁTICA
  const autoSyncWrapper = async (operation: () => Promise<void>, successMessage: string) => {
    if (!autoSyncEnabled) return;
    
    try {
      await operation();
      console.log('✅', successMessage);
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
