
import { useState, useEffect } from 'react';
import { useAdminData } from './useAdminData';
import { useSupabaseDataNew } from './useSupabaseDataNew';
import { useBlogData } from './useBlogData';
import { useSupabaseBlog } from './supabase/useSupabaseBlog';
import { TeamMember, ServicePage, CategoryInfo, PageTexts } from '../types/adminTypes';
import { BlogPost } from '../types/blogTypes';

export const useAdminDataIntegrated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [useSupabaseData, setUseSupabaseData] = useState(true);
  
  // Hooks locais (localStorage)
  const localData = useAdminData();
  
  // Hooks Supabase
  const supabaseData = useSupabaseDataNew();
  const localBlogData = useBlogData();
  const supabaseBlogData = useSupabaseBlog();

  // Auto-migração na inicialização
  useEffect(() => {
    const performAutoMigration = async () => {
      setIsLoading(true);
      
      try {
        console.log('🚀 INICIANDO AUTO-MIGRAÇÃO COMPLETA...');
        
        // 1. Verificar se há dados locais para migrar
        const hasLocalPages = localData.servicePages.length > 0;
        const hasLocalBlogPosts = localBlogData.blogPosts.length > 0;
        const hasLocalCategories = localData.categories.length > 0;
        
        console.log('📊 Dados locais encontrados:', {
          pages: localData.servicePages.length,
          blog: localBlogData.blogPosts.length,
          categories: localData.categories.length
        });

        // 2. Aguardar carregamento inicial do Supabase
        await supabaseData.refreshData();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 3. Migrar categorias se necessário
        if (hasLocalCategories && supabaseData.categories.length === 0) {
          console.log('📂 Migrando categorias...');
          await supabaseData.saveCategories(localData.categories);
          await new Promise(resolve => setTimeout(resolve, 1000));
          await supabaseData.refreshData();
        }

        // 4. Migrar páginas de serviços se necessário
        if (hasLocalPages && supabaseData.servicePages.length === 0) {
          console.log('📄 Migrando páginas de serviços...');
          await supabaseData.saveServicePages(localData.servicePages);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // 5. Migrar blog posts se necessário
        if (hasLocalBlogPosts && supabaseBlogData.blogPosts.length === 0) {
          console.log('📝 Migrando posts do blog...');
          await supabaseBlogData.saveBlogPosts(localBlogData.blogPosts);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // 6. Recarregar todos os dados
        await Promise.all([
          supabaseData.refreshData(),
          supabaseBlogData.loadBlogPosts()
        ]);

        console.log('✅ AUTO-MIGRAÇÃO COMPLETA FINALIZADA!');
        
      } catch (error) {
        console.error('❌ Erro na auto-migração:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performAutoMigration();
  }, []);

  // Dados unificados (sempre usar Supabase quando disponível)
  const teamMembers = supabaseData.teamMembers.length > 0 ? supabaseData.teamMembers : localData.teamMembers;
  const servicePages = supabaseData.servicePages.length > 0 ? supabaseData.servicePages : localData.servicePages;
  const categories = supabaseData.categories.length > 0 ? supabaseData.categories : localData.categories;
  const pageTexts = supabaseData.pageTexts.heroTitle ? supabaseData.pageTexts : localData.pageTexts;
  const blogPosts = supabaseBlogData.blogPosts.length > 0 ? supabaseBlogData.blogPosts : localBlogData.blogPosts;

  // Funções de atualização (sempre salvar no Supabase)
  const updatePageTexts = (texts: PageTexts) => {
    supabaseData.setPageTexts(texts);
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    const updatedMembers = teamMembers.map(member =>
      member.id === id ? { ...member, [field]: value } : member
    );
    supabaseData.setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'Novo Membro',
      title: 'Cargo',
      oab: 'OAB/XX 000000',
      email: 'email@exemplo.com',
      image: '',
      description: 'Descrição do membro da equipe'
    };
    supabaseData.setTeamMembers([...teamMembers, newMember]);
  };

  const removeTeamMember = (id: string) => {
    const filtered = teamMembers.filter(member => member.id !== id);
    supabaseData.setTeamMembers(filtered);
  };

  const saveServicePages = (pages: ServicePage[]) => {
    return supabaseData.saveServicePages(pages);
  };

  const saveCategories = (cats: CategoryInfo[]) => {
    return supabaseData.saveCategories(cats);
  };

  const saveBlogPosts = (posts: BlogPost[]) => {
    return supabaseBlogData.saveBlogPosts(posts);
  };

  const saveAll = async () => {
    await Promise.all([
      supabaseData.saveTeamMembers(teamMembers),
      supabaseData.savePageTexts(pageTexts)
    ]);
  };

  const refreshData = async () => {
    await Promise.all([
      supabaseData.refreshData(),
      supabaseBlogData.loadBlogPosts()
    ]);
  };

  const executeMigration = async () => {
    setIsLoading(true);
    try {
      // Migração forçada de todos os dados
      await supabaseData.saveCategories(localData.categories);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await supabaseData.saveServicePages(localData.servicePages);
      await supabaseBlogData.saveBlogPosts(localBlogData.blogPosts);
      await refreshData();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Estado
    isLoading: isLoading || supabaseData.isLoading || supabaseBlogData.isLoading,
    useSupabaseData,
    
    // Dados unificados
    teamMembers,
    servicePages,
    categories,
    pageTexts,
    blogPosts,
    
    // Funções de atualização
    updatePageTexts,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    saveServicePages,
    saveCategories,
    saveBlogPosts,
    saveAll,
    refreshData,
    executeMigration
  };
};
