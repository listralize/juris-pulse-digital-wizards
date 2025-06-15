
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Briefcase, Globe, Edit, Database } from 'lucide-react';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import { TeamMember, SpecializedService, ServicePage, PageTexts, CategoryInfo } from '../types/adminTypes';
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
    isLoading,
    saveServicePages,
    saveCategories,
    setServicePages,
    setPageTexts,
    refreshData
  } = useSupabaseDataNew();

  console.log('🔍 Admin - Dados carregados:', {
    servicePagesCount: servicePages?.length || 0,
    categoriesCount: categories?.length || 0,
    isLoading,
    servicePages: servicePages?.slice(0, 3)?.map(p => ({ id: p.id, title: p.title, category: p.category }))
  });

  const handleSaveServicePages = async (pages: ServicePage[]) => {
    try {
      console.log('💾 Admin salvando páginas:', pages.length);
      await saveServicePages(pages);
      toast.success('Páginas de serviços salvas com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao salvar páginas:', error);
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

  const handleUpdatePageTexts = (texts: PageTexts) => {
    setPageTexts(texts);
  };

  const handleSavePageTexts = async () => {
    toast.success('Textos das páginas salvos com sucesso!');
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

            {/* Status info */}
            <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
              <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                🔒 Sistema Seguro Ativo: Row Level Security (RLS) implementado em todas as tabelas
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                📊 Status: {servicePages?.length || 0} páginas | 📂 Categorias: {categories?.length || 0} | 👥 Equipe: {teamMembers?.length || 0}
              </p>
            </div>

            <Tabs defaultValue="service-pages" className="space-y-6">
              <TabsList className={`grid w-full grid-cols-4 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
                <TabsTrigger value="service-pages" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Páginas de Serviços ({servicePages?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="supabase" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Supabase
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Conteúdo Geral
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Blog
                </TabsTrigger>
              </TabsList>

              <TabsContent value="service-pages">
                <ServicePagesManager 
                  servicePages={servicePages || []}
                  categories={categories || []}
                  pageTexts={pageTexts || {}}
                  onSave={handleSaveServicePages}
                  onSaveCategories={handleSaveCategories}
                  onSavePageTexts={handleSavePageTexts}
                  onUpdatePageTexts={handleUpdatePageTexts}
                />
              </TabsContent>

              <TabsContent value="supabase">
                <SupabaseDataManager />
              </TabsContent>

              <TabsContent value="content">
                <div className="text-center py-8">
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Área de conteúdo em desenvolvimento
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="blog">
                <div className="text-center py-8">
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Área de blog em desenvolvimento
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </AdminProtectedRoute>
  );
};

export default Admin;
