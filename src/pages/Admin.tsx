
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Briefcase, Globe, Edit, Database } from 'lucide-react';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import { useSupabaseBlog } from '../hooks/supabase/useSupabaseBlog';
import { TeamMember, ServicePage, CategoryInfo, PageTexts } from '../types/adminTypes';
import { BlogPost } from '../types/blogTypes';
import { ServicePagesManager } from '../components/admin/service-pages/ServicePagesManager';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ContentManagement } from '../components/admin/ContentManagement';
import { BlogManagement } from '../components/admin/BlogManagement';
import { SupabaseDataManager } from '../components/admin/SupabaseDataManager';
import { AdminProtectedRoute } from '../components/admin/AdminProtectedRoute';
import { toast } from 'sonner';

const Admin = () => {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const {
    teamMembers,
    servicePages,
    categories,
    pageTexts,
    isLoading: dataLoading,
    saveServicePages,
    saveCategories,
    saveTeamMembers,
    savePageTexts,
    setServicePages,
    setTeamMembers,
    refreshData
  } = useSupabaseDataNew();

  const {
    blogPosts,
    isLoading: blogLoading,
    saveBlogPosts,
    loadBlogPosts
  } = useSupabaseBlog();

  const isLoading = dataLoading || blogLoading;

  const handleSaveServicePages = async (pages: ServicePage[]) => {
    try {
      await saveServicePages(pages);
      toast.success('Páginas de serviços salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar páginas:', error);
      toast.error('Erro ao salvar páginas de serviços');
    }
  };

  const handleSaveCategories = async (cats: CategoryInfo[]) => {
    try {
      await saveCategories(cats);
      toast.success('Categorias salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar categorias:', error);
      toast.error('Erro ao salvar categorias');
    }
  };

  const handleSaveTeamMembers = async () => {
    try {
      console.log('💾 Admin: Salvando teamMembers:', teamMembers);
      await saveTeamMembers(teamMembers);
      toast.success('Equipe salva com sucesso!');
      
      // Disparar evento para atualizar a seção Partners
      window.dispatchEvent(new CustomEvent('teamMembersUpdated', { 
        detail: teamMembers 
      }));
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      toast.error('Erro ao salvar equipe');
    }
  };

  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: 'Novo Membro',
      title: 'Advogado(a)',
      oab: 'OAB/XX XXXXX',
      email: 'email@exemplo.com',
      image: '/lovable-uploads/placeholder-member.jpg',
      description: 'Descrição do membro da equipe'
    };
    const updatedMembers = [...teamMembers, newMember];
    setTeamMembers(updatedMembers);
    console.log('➕ Admin: Adicionando novo membro:', newMember);
  };

  const handleRemoveTeamMember = (id: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedMembers);
    console.log('🗑️ Admin: Removendo membro:', id);
  };

  const handleUpdateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    const updatedMembers = teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    );
    setTeamMembers(updatedMembers);
    console.log('✏️ Admin: Atualizando membro:', id, field, value);
  };

  const handleSaveBlogPosts = async (posts: BlogPost[]) => {
    try {
      await saveBlogPosts(posts);
      toast.success('Posts do blog salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar posts do blog:', error);
      toast.error('Erro ao salvar posts do blog');
    }
  };

  const validTeamMembers: TeamMember[] = teamMembers || [];
  const validBlogPosts: BlogPost[] = blogPosts || [];
  const validPageTexts: PageTexts = pageTexts || {
    heroTitle: '',
    heroSubtitle: '',
    aboutTitle: '',
    aboutDescription: '',
    areasTitle: '',
    teamTitle: '',
    clientAreaTitle: '',
    clientAreaDescription: '',
    contactTitle: '',
    contactSubtitle: '',
    familiaTitle: '',
    familiaDescription: '',
    tributarioTitle: '',
    tributarioDescription: '',
    empresarialTitle: '',
    empresarialDescription: '',
    trabalhoTitle: '',
    trabalhoDescription: '',
    civilTitle: '',
    civilDescription: '',
    previdenciarioTitle: '',
    previdenciarioDescription: '',
    consumidorTitle: '',
    consumidorDescription: '',
    constitucionalTitle: '',
    constitucionalDescription: '',
    administrativoTitle: '',
    administrativoDescription: '',
    contactTexts: {
      phone: '',
      email: '',
      address: '',
      whatsapp: '',
      mapEmbedUrl: ''
    },
    footerTexts: {
      companyName: '',
      description: ''
    },
    categoryTexts: []
  };

  return (
    <AdminProtectedRoute>
      {isLoading ? (
        <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div>
      ) : (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
          <div className="max-w-7xl mx-auto">
            <AdminHeader onLogout={logout} />

            <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
              <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                🔒 Sistema Seguro Ativo: Row Level Security (RLS) implementado em todas as tabelas
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                📊 Status: {servicePages?.length || 0} páginas | 📂 Categorias: {categories?.length || 0} | 👥 Equipe: {validTeamMembers.length} | 📝 Blog: {validBlogPosts.length} posts
              </p>
            </div>

            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className={`grid w-full grid-cols-4 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Conteúdo Geral
                </TabsTrigger>
                <TabsTrigger value="service-pages" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Páginas de Serviços ({servicePages?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Blog ({validBlogPosts.length})
                </TabsTrigger>
                <TabsTrigger value="supabase" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Supabase
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <ContentManagement 
                  teamMembers={validTeamMembers}
                  pageTexts={validPageTexts}
                  onAddTeamMember={handleAddTeamMember}
                  onRemoveTeamMember={handleRemoveTeamMember}
                  onUpdateTeamMember={handleUpdateTeamMember}
                  onSaveTeamMembers={handleSaveTeamMembers}
                />
              </TabsContent>

              <TabsContent value="service-pages">
                <ServicePagesManager 
                  servicePages={servicePages || []}
                  categories={categories || []}
                  pageTexts={pageTexts || validPageTexts}
                  onSave={handleSaveServicePages}
                  onSaveCategories={handleSaveCategories}
                  onSavePageTexts={savePageTexts}
                  onUpdatePageTexts={() => {}}
                />
              </TabsContent>

              <TabsContent value="blog">
                <BlogManagement 
                  blogPosts={validBlogPosts}
                  onSave={handleSaveBlogPosts}
                />
              </TabsContent>

              <TabsContent value="supabase">
                <SupabaseDataManager />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </AdminProtectedRoute>
  );
};

export default Admin;
