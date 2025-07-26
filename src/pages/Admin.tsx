import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Briefcase, Globe, Edit, Database, Link, Users, Mail } from 'lucide-react';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import { useSupabaseBlog } from '../hooks/supabase/useSupabaseBlog';
import { useSupabasePageTexts } from '../hooks/useSupabasePageTexts';
import { TeamMember, ServicePage, PageTexts, CategoryInfo } from '../types/adminTypes';
import { BlogPost } from '../types/blogTypes';
import { ServicePagesManager } from '../components/admin/service-pages/ServicePagesManager';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ContentManagement } from '../components/admin/ContentManagement';
import { BlogManagement } from '../components/admin/BlogManagement';
import { SupabaseDataManager } from '../components/admin/SupabaseDataManager';
import { AdminProtectedRoute } from '../components/admin/AdminProtectedRoute';
import { LinkTreeManagement } from '../components/admin/LinkTreeManagement';
import { MarketingManagement } from '../components/admin/MarketingManagement';
import { LeadsManagement } from '../components/admin/LeadsManagement';
import { EmailTemplateManager } from '../components/admin/EmailTemplateManager';
import { defaultPageTexts } from '../data/defaultPageTexts';
import { toast } from 'sonner';
const Admin = () => {
  const {
    logout
  } = useAuth();
  const {
    theme
  } = useTheme();
  const isDark = theme === 'dark';

  // Usar o hook específico para page texts
  const {
    pageTexts,
    isLoading: pageTextsLoading,
    savePageTexts,
    setPageTexts
  } = useSupabasePageTexts();
  const {
    teamMembers,
    servicePages,
    categories,
    isLoading: dataLoading,
    saveServicePages,
    saveCategories,
    saveTeamMembers,
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
  const isLoading = dataLoading || blogLoading || pageTextsLoading;
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
  const handleUpdatePageTexts = (texts: PageTexts) => {
    console.log('🔄 Admin: Atualizando pageTexts:', texts);
    setPageTexts(texts);
  };
  const handleSavePageTexts = async () => {
    try {
      console.log('💾 Admin: Salvando pageTexts:', pageTexts);
      await savePageTexts(pageTexts);
      toast.success('Textos das páginas salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar textos:', error);
      toast.error('Erro ao salvar textos das páginas');
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
    const updatedMembers = teamMembers.map(member => member.id === id ? {
      ...member,
      [field]: value
    } : member);
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
  const validPageTexts: PageTexts = pageTexts && Object.keys(pageTexts).length > 0 ? pageTexts : defaultPageTexts;
  const validTeamMembers: TeamMember[] = teamMembers || [];
  const validBlogPosts: BlogPost[] = blogPosts || [];
  return <AdminProtectedRoute>
      {isLoading ? <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div> : <div className={`min-h-screen p-6 admin-layout ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`} style={{
      overflow: 'auto',
      height: 'auto'
    }}>
          <div className="max-w-7xl mx-auto">
            <AdminHeader onLogout={logout} />

            

            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg overflow-x-auto"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}>
                <TabsTrigger value="content" className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap">
                  <Edit className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Conteúdo Geral</span>
                  <span className="sm:hidden">Conteúdo</span>
                </TabsTrigger>
                <TabsTrigger value="service-pages" className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap">
                  <Globe className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Páginas de Serviços ({servicePages?.length || 0})</span>
                  <span className="sm:hidden">Serviços ({servicePages?.length || 0})</span>
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap">
                  <FileText className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Blog ({validBlogPosts.length})</span>
                  <span className="sm:hidden">Blog ({validBlogPosts.length})</span>
                </TabsTrigger>
                <TabsTrigger value="linktree" className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap">
                  <Link className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Link Tree</span>
                  <span className="sm:hidden">Links</span>
                </TabsTrigger>
                <TabsTrigger value="leads" className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap">
                  <Users className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Leads</span>
                  <span className="sm:hidden">Leads</span>
                </TabsTrigger>
                <TabsTrigger value="email-templates" className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap">
                  <Mail className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Templates Email</span>
                  <span className="sm:hidden">Email</span>
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap">
                  <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Marketing & Analytics</span>
                  <span className="sm:hidden">Marketing</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <ContentManagement teamMembers={validTeamMembers} pageTexts={validPageTexts} onAddTeamMember={handleAddTeamMember} onRemoveTeamMember={handleRemoveTeamMember} onUpdateTeamMember={handleUpdateTeamMember} onSaveTeamMembers={handleSaveTeamMembers} onUpdatePageTexts={handleUpdatePageTexts} onSavePageTexts={handleSavePageTexts} />
              </TabsContent>

              <TabsContent value="service-pages">
                <ServicePagesManager servicePages={servicePages || []} categories={categories || []} pageTexts={validPageTexts} onSave={handleSaveServicePages} onSaveCategories={handleSaveCategories} onSavePageTexts={handleSavePageTexts} onUpdatePageTexts={handleUpdatePageTexts} />
              </TabsContent>

              <TabsContent value="blog">
                <BlogManagement blogPosts={validBlogPosts} onSave={handleSaveBlogPosts} />
              </TabsContent>

              <TabsContent value="linktree">
                <LinkTreeManagement />
              </TabsContent>

              <TabsContent value="leads">
                <LeadsManagement />
              </TabsContent>

              <TabsContent value="email-templates">
                <EmailTemplateManager />
              </TabsContent>

              <TabsContent value="marketing">
                <MarketingManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>}
    </AdminProtectedRoute>;
};
export default Admin;