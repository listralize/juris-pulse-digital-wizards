import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Briefcase, Globe, Edit, Megaphone } from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';
import { useBlogData } from '../hooks/useBlogData';
import { TeamMember, SpecializedService, ServicePage, PageTexts } from '../types/adminTypes';
import { ServicePagesManager } from '../components/admin/service-pages/ServicePagesManager';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ContentManagement } from '../components/admin/ContentManagement';
import { BlogManagement } from '../components/admin/BlogManagement';
import { LandingPagesManager } from '../components/admin/LandingPagesManager';
import { toast } from 'sonner';

const Admin = () => {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { 
    teamMembers: initialTeamMembers, 
    specializedServices: initialSpecializedServices,
    servicePages: initialServicePages,
    pageTexts: initialPageTexts, 
    isLoading,
    saveTeamMembers,
    saveSpecializedServices,
    saveServicePages,
    savePageTexts
  } = useAdminData();

  const {
    blogPosts: initialBlogPosts,
    isLoading: blogLoading,
    saveBlogPosts
  } = useBlogData();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [specializedServices, setSpecializedServices] = useState<SpecializedService[]>([]);
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [pageTexts, setPageTexts] = useState<PageTexts>({
    heroTitle: '',
    heroSubtitle: '',
    aboutTitle: '',
    aboutDescription: '',
    contactTitle: '',
    contactSubtitle: '',
    teamTitle: '',
    areasTitle: '',
    clientAreaTitle: '',
    clientAreaDescription: '',
    familiaTitle: '',
    familiaDescription: '',
    tributarioTitle: '',
    tributarioDescription: '',
    empresarialTitle: '',
    empresarialDescription: '',
    trabalhoTitle: '',
    trabalhoDescription: '',
    constitucionalTitle: '',
    constitucionalDescription: '',
    administrativoTitle: '',
    administrativoDescription: '',
    previdenciarioTitle: '',
    previdenciarioDescription: '',
    consumidorTitle: '',
    consumidorDescription: '',
    civilTitle: '',
    civilDescription: '',
    categoryTexts: []
  });

  useEffect(() => {
    if (!isLoading) {
      setTeamMembers(initialTeamMembers);
      setSpecializedServices(initialSpecializedServices);
      setServicePages(initialServicePages);
      setPageTexts(initialPageTexts);
    }
  }, [isLoading, initialTeamMembers, initialSpecializedServices, initialServicePages, initialPageTexts]);

  const handleSaveTeamMembers = () => {
    saveTeamMembers(teamMembers);
    toast.success('Equipe salva com sucesso!');
  };

  const handleSaveServicePages = (pages: ServicePage[]) => {
    setServicePages(pages);
    saveServicePages(pages);
    toast.success('Páginas de serviços salvas com sucesso!');
  };

  const handleSavePageTexts = () => {
    savePageTexts(pageTexts);
    toast.success('Textos das páginas salvos com sucesso!');
  };

  const handleSaveBlogPosts = (posts: typeof initialBlogPosts) => {
    saveBlogPosts(posts);
    toast.success('Posts do blog salvos com sucesso!');
  };

  const handleSaveLandingPages = (pages: any[]) => {
    localStorage.setItem('landingPages', JSON.stringify(pages));
    toast.success('Landing pages salvas com sucesso!');
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      title: '',
      oab: '',
      email: '',
      image: '',
      description: ''
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
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

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-4 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Conteúdo Geral
            </TabsTrigger>
            <TabsTrigger value="service-pages" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Páginas de Serviços
            </TabsTrigger>
            <TabsTrigger value="landing-pages" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              Landing Pages
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentManagement
              teamMembers={teamMembers}
              pageTexts={pageTexts}
              onAddTeamMember={addTeamMember}
              onRemoveTeamMember={removeTeamMember}
              onUpdateTeamMember={updateTeamMember}
              onSaveTeamMembers={handleSaveTeamMembers}
              onUpdatePageTexts={setPageTexts}
              onSavePageTexts={handleSavePageTexts}
            />
          </TabsContent>

          <TabsContent value="service-pages">
            <ServicePagesManager 
              servicePages={servicePages}
              pageTexts={pageTexts}
              onSave={handleSaveServicePages}
              onSavePageTexts={handleSavePageTexts}
              onUpdatePageTexts={setPageTexts}
            />
          </TabsContent>

          <TabsContent value="landing-pages">
            <LandingPagesManager onSave={handleSaveLandingPages} />
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
