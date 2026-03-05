import React, { useState, Suspense, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Briefcase, Globe, Edit, Link, Users, Mail, FormInput, Bot } from 'lucide-react';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import { useSupabaseBlog } from '../hooks/supabase/useSupabaseBlog';
import { useSupabasePageTexts } from '../hooks/supabase/useSupabasePageTexts';
import { TeamMember, ServicePage, PageTexts, CategoryInfo } from '../types/adminTypes';
import { BlogPost } from '../types/blogTypes';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminProtectedRoute } from '../components/admin/AdminProtectedRoute';
import { defaultPageTexts } from '../data/defaultPageTexts';
import { toast } from 'sonner';

// Lazy-loaded admin tab components
const ContentManagement = React.lazy(() => import('../components/admin/ContentManagement').then(m => ({ default: m.ContentManagement })));
const ServicePagesManager = React.lazy(() => import('../components/admin/service-pages/ServicePagesManager').then(m => ({ default: m.ServicePagesManager })));
const BlogManagement = React.lazy(() => import('../components/admin/BlogManagement').then(m => ({ default: m.BlogManagement })));
const LinkTreeManagement = React.lazy(() => import('../components/admin/LinkTreeManagement').then(m => ({ default: m.LinkTreeManagement })));
const LeadsManagement = React.lazy(() => import('../components/admin/LeadsManagement').then(m => ({ default: m.LeadsManagement })));
const EnhancedEmailTemplateManager = React.lazy(() => import('../components/admin/EnhancedEmailTemplateManager').then(m => ({ default: m.EnhancedEmailTemplateManager })));
const StepFormBuilder = React.lazy(() => import('../components/admin/StepFormBuilder').then(m => ({ default: m.StepFormBuilder })));
const MarketingManagement = React.lazy(() => import('../components/admin/MarketingManagement').then(m => ({ default: m.MarketingManagement })));
const CentralizeManagement = React.lazy(() => import('../components/admin/CentralizeManagement').then(m => ({ default: m.CentralizeManagement })));

const TabFallback = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Admin = () => {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Track visited tabs for true lazy loading — heavy hooks only fire when their tab is first visited
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(['content']));
  const [activeTab, setActiveTab] = useState('content');

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setVisitedTabs(prev => {
      if (prev.has(tab)) return prev;
      const next = new Set(prev);
      next.add(tab);
      return next;
    });
  }, []);

  // Enable hooks only when relevant tabs have been visited
  const contentOrServiceEnabled = visitedTabs.has('content') || visitedTabs.has('service-pages');
  const blogEnabled = visitedTabs.has('blog');

  const { pageTexts, savePageTexts, setPageTexts } = useSupabasePageTexts(contentOrServiceEnabled);

  const {
    teamMembers,
    servicePages,
    categories,
    saveServicePages,
    saveCategories,
    saveTeamMembers,
    setTeamMembers,
  } = useSupabaseDataNew(contentOrServiceEnabled);

  const { blogPosts, saveBlogPosts } = useSupabaseBlog(blogEnabled);

  const handleSaveServicePages = async (pages: ServicePage[]) => {
    try { await saveServicePages(pages); toast.success('Páginas de serviços salvas!'); }
    catch { toast.error('Erro ao salvar páginas de serviços'); }
  };

  const handleSaveCategories = async (cats: CategoryInfo[]) => {
    try { await saveCategories(cats); toast.success('Categorias salvas!'); }
    catch { toast.error('Erro ao salvar categorias'); }
  };

  const handleUpdatePageTexts = (texts: PageTexts) => setPageTexts(texts);

  const handleSavePageTexts = async () => {
    try { await savePageTexts(pageTexts); toast.success('Textos das páginas salvos!'); }
    catch { toast.error('Erro ao salvar textos das páginas'); }
  };

  const handleSaveTeamMembers = async () => {
    try {
      await saveTeamMembers(teamMembers);
      toast.success('Equipe salva!');
      window.dispatchEvent(new CustomEvent('teamMembersUpdated', { detail: teamMembers }));
    } catch { toast.error('Erro ao salvar equipe'); }
  };

  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(), name: 'Novo Membro', title: 'Advogado(a)',
      oab: 'OAB/XX XXXXX', email: 'email@exemplo.com',
      image: '/lovable-uploads/placeholder-member.jpg',
      description: 'Descrição do membro da equipe'
    };
    setTeamMembers([...(teamMembers || []), newMember]);
  };

  const handleRemoveTeamMember = (id: string) =>
    setTeamMembers((teamMembers || []).filter(m => m.id !== id));

  const handleUpdateTeamMember = (id: string, field: keyof TeamMember, value: string) =>
    setTeamMembers((teamMembers || []).map(m => m.id === id ? { ...m, [field]: value } : m));

  const handleSaveBlogPosts = async (posts: BlogPost[]) => {
    try { await saveBlogPosts(posts); toast.success('Posts do blog salvos!'); }
    catch { toast.error('Erro ao salvar posts do blog'); }
  };

  const validPageTexts: PageTexts = pageTexts && Object.keys(pageTexts).length > 0 ? pageTexts : defaultPageTexts;
  const validTeamMembers: TeamMember[] = teamMembers || [];
  const validBlogPosts: BlogPost[] = blogPosts || [];

  const tabCls = "flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20 text-xs md:text-sm whitespace-nowrap";
  const mobCls = "text-white/80 text-xs py-2 data-[state=active]:bg-white/20";
  const tabListStyle = {
    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px'
  };

  return (
    <AdminProtectedRoute>
      <div className={`min-h-screen p-6 admin-layout ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`} style={{ overflow: 'auto', height: 'auto' }}>
        <div className="max-w-7xl mx-auto">
          <AdminHeader onLogout={logout} />
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">

            {/* Desktop tab bar */}
            <TabsList className="hidden md:grid w-full grid-cols-9 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg overflow-x-auto" style={tabListStyle}>
              <TabsTrigger value="content" className={tabCls}><Edit className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Conteúdo Geral</span><span className="sm:hidden">Conteúdo</span></TabsTrigger>
              <TabsTrigger value="service-pages" className={tabCls}><Globe className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Serviços ({servicePages?.length || 0})</span><span className="sm:hidden">Serviços</span></TabsTrigger>
              <TabsTrigger value="blog" className={tabCls}><FileText className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Blog ({validBlogPosts.length})</span><span className="sm:hidden">Blog</span></TabsTrigger>
              <TabsTrigger value="linktree" className={tabCls}><Link className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Link Tree</span><span className="sm:hidden">Links</span></TabsTrigger>
              <TabsTrigger value="leads" className={tabCls}><Users className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Leads</span><span className="sm:hidden">Leads</span></TabsTrigger>
              <TabsTrigger value="email-templates" className={tabCls}><Mail className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Templates Email</span><span className="sm:hidden">Email</span></TabsTrigger>
              <TabsTrigger value="step-forms" className={tabCls}><FormInput className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Formulários Step</span><span className="sm:hidden">Forms</span></TabsTrigger>
              <TabsTrigger value="marketing" className={tabCls}><Briefcase className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Dashboard</span><span className="sm:hidden">Dashboard</span></TabsTrigger>
              <TabsTrigger value="centralize" className={tabCls}><Bot className="w-3 h-3 md:w-4 md:h-4" /><span className="hidden sm:inline">Centralize</span><span className="sm:hidden">Bot</span></TabsTrigger>
            </TabsList>

            {/* Mobile tab bar */}
            <div className="md:hidden flex flex-col gap-2">
              <TabsList className="w-full grid grid-cols-5 gap-1 backdrop-blur-md bg-white/10 border border-white/20 h-auto p-1">
                <TabsTrigger value="content" className={mobCls}><Edit className="w-3 h-3" /></TabsTrigger>
                <TabsTrigger value="service-pages" className={mobCls}><Globe className="w-3 h-3" /></TabsTrigger>
                <TabsTrigger value="blog" className={mobCls}><FileText className="w-3 h-3" /></TabsTrigger>
                <TabsTrigger value="linktree" className={mobCls}><Link className="w-3 h-3" /></TabsTrigger>
                <TabsTrigger value="leads" className={mobCls}><Users className="w-3 h-3" /></TabsTrigger>
              </TabsList>
              <TabsList className="w-full grid grid-cols-4 gap-1 backdrop-blur-md bg-white/10 border border-white/20 h-auto p-1">
                <TabsTrigger value="email-templates" className={mobCls}><Mail className="w-3 h-3" /></TabsTrigger>
                <TabsTrigger value="step-forms" className={mobCls}><FormInput className="w-3 h-3" /></TabsTrigger>
                <TabsTrigger value="marketing" className={mobCls}><Briefcase className="w-3 h-3" /></TabsTrigger>
                <TabsTrigger value="centralize" className={mobCls}><Bot className="w-3 h-3" /></TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="content">
              <Suspense fallback={<TabFallback />}>
                <ContentManagement teamMembers={validTeamMembers} pageTexts={validPageTexts} onAddTeamMember={handleAddTeamMember} onRemoveTeamMember={handleRemoveTeamMember} onUpdateTeamMember={handleUpdateTeamMember} onSaveTeamMembers={handleSaveTeamMembers} onUpdatePageTexts={handleUpdatePageTexts} onSavePageTexts={handleSavePageTexts} />
              </Suspense>
            </TabsContent>
            <TabsContent value="service-pages">
              <Suspense fallback={<TabFallback />}>
                <ServicePagesManager servicePages={servicePages || []} categories={categories || []} pageTexts={validPageTexts} onSave={handleSaveServicePages} onSaveCategories={handleSaveCategories} onSavePageTexts={handleSavePageTexts} onUpdatePageTexts={handleUpdatePageTexts} />
              </Suspense>
            </TabsContent>
            <TabsContent value="blog">
              <Suspense fallback={<TabFallback />}>
                <BlogManagement blogPosts={validBlogPosts} onSave={handleSaveBlogPosts} />
              </Suspense>
            </TabsContent>
            <TabsContent value="linktree">
              <Suspense fallback={<TabFallback />}><LinkTreeManagement /></Suspense>
            </TabsContent>
            <TabsContent value="leads">
              <Suspense fallback={<TabFallback />}><LeadsManagement /></Suspense>
            </TabsContent>
            <TabsContent value="email-templates">
              <Suspense fallback={<TabFallback />}><EnhancedEmailTemplateManager /></Suspense>
            </TabsContent>
            <TabsContent value="step-forms">
              <Suspense fallback={<TabFallback />}><StepFormBuilder /></Suspense>
            </TabsContent>
            <TabsContent value="marketing">
              <Suspense fallback={<TabFallback />}><MarketingManagement /></Suspense>
            </TabsContent>
            <TabsContent value="centralize">
              <Suspense fallback={<TabFallback />}><CentralizeManagement /></Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminProtectedRoute>
  );
};

export default Admin;
