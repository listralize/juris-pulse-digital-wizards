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
    console.log('=== INICIANDO MIGRAÇÃO MANUAL ===');
    console.log('Dados localStorage:', {
      servicePages: localServicePages.length,
      teamMembers: localTeamMembers.length,
      categories: localCategories.length,
      pageTexts: !!localPageTexts.heroTitle
    });
    console.log('Dados Supabase:', {
      servicePages: supabaseServicePages.length,
      teamMembers: supabaseTeamMembers.length,
      categories: supabaseCategories.length,
      pageTexts: !!supabasePageTexts.heroTitle
    });
    
    setIsTransitioning(true);
    
    try {
      let migrationCount = 0;
      
      // Migrar configurações primeiro
      if (localPageTexts.heroTitle && !supabasePageTexts.heroTitle) {
        console.log('Migrando configurações...', localPageTexts);
        await saveSupabasePageTexts(localPageTexts);
        migrationCount++;
        console.log('✅ Configurações migradas');
      } else {
        console.log('❌ Configurações não precisam ser migradas');
      }
      
      // Migrar categorias
      if (localCategories.length > 0) {
        console.log('Migrando categorias...', localCategories.length);
        await saveSupabaseCategories(localCategories);
        migrationCount++;
        console.log('✅ Categorias migradas');
      } else {
        console.log('❌ Sem categorias para migrar');
      }
      
      // Migrar equipe
      if (localTeamMembers.length > 0) {
        console.log('Migrando equipe...', localTeamMembers.length);
        await saveSupabaseTeamMembers(localTeamMembers);
        migrationCount++;
        console.log('✅ Equipe migrada');
      } else {
        console.log('❌ Sem equipe para migrar');
      }
      
      // Migrar páginas de serviços (mais importante)
      if (localServicePages.length > 0) {
        console.log('Migrando páginas de serviços...', localServicePages.length);
        console.log('Páginas a migrar:', localServicePages.map(p => p.title));
        await saveSupabaseServicePages(localServicePages);
        migrationCount++;
        console.log('✅ Páginas de serviços migradas');
      } else {
        console.log('❌ Sem páginas de serviços para migrar');
      }
      
      if (migrationCount > 0) {
        console.log(`Aguardando 3 segundos antes de recarregar...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Recarregando dados...');
        await refreshData();
        
        setHasMigrated(true);
        toast.success(`Migração concluída! ${migrationCount} tipos de dados foram migrados.`);
        console.log('=== MIGRAÇÃO CONCLUÍDA COM SUCESSO ===');
      } else {
        toast.info('Nenhum dado novo para migrar.');
        console.log('=== NENHUM DADO PARA MIGRAR ===');
      }
    } catch (error) {
      console.error('❌ ERRO NA MIGRAÇÃO:', error);
      toast.error('Erro na migração. Verifique o console para mais detalhes.');
    } finally {
      setIsTransitioning(false);
    }
  };

  // Auto-migração quando há dados locais mas Supabase está vazio
  useEffect(() => {
    const autoMigrate = async () => {
      if (supabaseLoading || hasMigrated || isTransitioning) return;
      
      const hasLocalData = localTeamMembers.length > 0 || localServicePages.length > 0 || localCategories.length > 0 || localPageTexts.heroTitle;
      const hasSupabaseData = supabaseServicePages.length > 0 || supabaseTeamMembers.length > 0 || supabaseCategories.length > 0 || supabasePageTexts.heroTitle;
      
      console.log('=== VERIFICAÇÃO AUTO-MIGRAÇÃO ===', {
        hasLocalData,
        hasSupabaseData,
        localPages: localServicePages.length,
        supabasePages: supabaseServicePages.length,
        localTeam: localTeamMembers.length,
        supabaseTeam: supabaseTeamMembers.length
      });
      
      if (hasLocalData && !hasSupabaseData) {
        console.log('Iniciando migração automática...');
        await executeMigration();
      } else if (hasSupabaseData) {
        setHasMigrated(true);
        console.log('Dados já existem no Supabase');
      }
    };

    // Delay para garantir que os dados estejam carregados
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

  // Funções de salvamento (direcionam para Supabase se ativo)
  const updatePageTexts = async (texts: PageTexts) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabasePageTexts(texts);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalPageTexts(texts);
    }
  };

  const saveAllTeamMembers = async (members: TeamMember[]) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabaseTeamMembers(members);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalTeamMembers(members);
    }
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    if (useSupabaseData) {
      const updatedMembers = teamMembers.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      );
      saveAllTeamMembers(updatedMembers);
    } else {
      const updatedMembers = teamMembers.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      );
      saveLocalTeamMembers(updatedMembers);
    }
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      oab: '',
      email: '',
      image: '',
      description: ''
    };
    
    if (useSupabaseData) {
      const updatedMembers = [...teamMembers, newMember];
      saveAllTeamMembers(updatedMembers);
    } else {
      const updatedMembers = [...teamMembers, newMember];
      saveLocalTeamMembers(updatedMembers);
    }
  };

  const removeTeamMember = (id: string) => {
    if (useSupabaseData) {
      const updatedMembers = teamMembers.filter(member => member.id !== id);
      saveAllTeamMembers(updatedMembers);
    } else {
      const updatedMembers = teamMembers.filter(member => member.id !== id);
      saveLocalTeamMembers(updatedMembers);
    }
  };

  const saveServicePagesData = async (pages: ServicePage[]) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabaseServicePages(pages);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalServicePages(pages);
    }
  };

  const saveCategoriesData = async (cats: CategoryInfo[]) => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await saveSupabaseCategories(cats);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      saveLocalCategories(cats);
    }
  };

  const saveAll = async () => {
    if (useSupabaseData) {
      setIsTransitioning(true);
      try {
        await Promise.all([
          saveSupabasePageTexts(pageTexts),
          saveSupabaseTeamMembers(teamMembers),
          saveSupabaseServicePages(servicePages),
          saveSupabaseCategories(categories)
        ]);
        await refreshData();
      } finally {
        setIsTransitioning(false);
      }
    }
  };

  // Função para recarregar dados sem migração automática
  const refreshDataManual = async () => {
    console.log('=== RECARREGANDO DADOS MANUALMENTE ===');
    await refreshData();
  };

  console.log('useAdminDataIntegrated - Estado atual:', {
    useSupabaseData,
    hasSupabaseData,
    supabasePages: supabaseServicePages.length,
    localPages: localServicePages.length,
    finalPages: servicePages.length,
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
    
    // Funções de atualização
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
