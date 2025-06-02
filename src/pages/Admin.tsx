
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Briefcase, Globe, Edit, Database } from 'lucide-react';
import { useAdminDataIntegrated } from '../hooks/useAdminDataIntegrated';
import { useBlogData } from '../hooks/useBlogData';
import { TeamMember, SpecializedService, ServicePage, PageTexts, CategoryInfo } from '../types/adminTypes';
import { ServicePagesManager } from '../components/admin/service-pages/ServicePagesManager';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ContentManagement } from '../components/admin/ContentManagement';
import { BlogManagement } from '../components/admin/BlogManagement';
import { SupabaseDataManager } from '../components/admin/SupabaseDataManager';
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
    isLoading,
    updatePageTexts,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    saveServicePages,
    saveCategories,
    saveAll,
    useSupabaseData
  } = useAdminDataIntegrated();

  const {
    blogPosts: initialBlogPosts,
    isLoading: blogLoading,
    saveBlogPosts
  } = useBlogData();

  const handleSaveTeamMembers = async () => {
    await saveAll();
    toast.success('Equipe salva com sucesso!');
  };

  const handleSaveServicePages = (pages: ServicePage[]) => {
    saveServicePages(pages);
    toast.success('Páginas de serviços salvas com sucesso!');
  };

  const handleSaveCategories = (cats: CategoryInfo[]) => {
    saveCategories(cats);
    toast.success('Categorias salvas com sucesso!');
  };

  const handleSavePageTexts = async () => {
    await saveAll();
    toast.success('Textos das páginas salvos com sucesso!');
  };

  const handleSaveBlogPosts = (posts: typeof initialBlogPosts) => {
    saveBlogPosts(posts);
    toast.success('Posts do blog salvos com sucesso!');
  };

  if (isLoading || blogLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <AdminHeader onLogout={logout} />

        <Tabs defaultValue="supabase" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-4 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
            <TabsTrigger value="supabase" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Supabase
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Conteúdo Geral
            </TabsTrigger>
            <TabsTrigger value="service-pages" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Páginas de Serviços
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="supabase">
            <SupabaseDataManager />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagement
              teamMembers={teamMembers}
              pageTexts={pageTexts}
              onAddTeamMember={addTeamMember}
              onRemoveTeamMember={removeTeamMember}
              onUpdateTeamMember={updateTeamMember}
              onSaveTeamMembers={handleSaveTeamMembers}
              onUpdatePageTexts={updatePageTexts}
              onSavePageTexts={handleSavePageTexts}
            />
          </TabsContent>

          <TabsContent value="service-pages">
            <ServicePagesManager 
              servicePages={servicePages}
              categories={categories}
              pageTexts={pageTexts}
              onSave={handleSaveServicePages}
              onSaveCategories={handleSaveCategories}
              onSavePageTexts={handleSavePageTexts}
              onUpdatePageTexts={updatePageTexts}
            />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement
              blogPosts={initialBlogPosts}
              onSave={handleSaveBlogPosts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
