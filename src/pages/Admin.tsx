import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Users, FileText, Briefcase, Globe } from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';
import { TeamMember, SpecializedService, ServicePage, PageTexts } from '../types/adminTypes';
import { ServicePagesManager } from '../components/admin/ServicePagesManager';
import { AdminHeader } from '../components/admin/AdminHeader';
import { TeamManagement } from '../components/admin/TeamManagement';
import { ServicesManagement } from '../components/admin/ServicesManagement';
import { MainTextsManagement } from '../components/admin/MainTextsManagement';
import { AreasTextsManagement } from '../components/admin/AreasTextsManagement';
import { CategoryTextsManagement } from '../components/admin/CategoryTextsManagement';
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
    civilDescription: ''
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

  const handleSaveSpecializedServices = () => {
    saveSpecializedServices(specializedServices);
    toast.success('Serviços especializados salvos com sucesso!');
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

  const addSpecializedService = () => {
    const newService: SpecializedService = {
      id: Date.now().toString(),
      title: '',
      description: '',
      category: 'familia',
      href: ''
    };
    setSpecializedServices([...specializedServices, newService]);
  };

  const removeSpecializedService = (id: string) => {
    setSpecializedServices(specializedServices.filter(service => service.id !== id));
  };

  const updateSpecializedService = (id: string, field: keyof SpecializedService, value: string) => {
    setSpecializedServices(specializedServices.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  if (isLoading) {
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

        <Tabs defaultValue="service-pages" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-6 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
            <TabsTrigger value="service-pages" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Páginas de Serviços
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Equipe
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="texts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Textos Principais
            </TabsTrigger>
            <TabsTrigger value="areas" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Textos das Áreas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="service-pages">
            <ServicePagesManager 
              servicePages={servicePages}
              onSave={handleSaveServicePages}
            />
          </TabsContent>

          <TabsContent value="team">
            <TeamManagement
              teamMembers={teamMembers}
              onAddTeamMember={addTeamMember}
              onRemoveTeamMember={removeTeamMember}
              onUpdateTeamMember={updateTeamMember}
              onSave={handleSaveTeamMembers}
            />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryTextsManagement
              pageTexts={pageTexts}
              onUpdatePageTexts={setPageTexts}
              onSave={handleSavePageTexts}
            />
          </TabsContent>

          <TabsContent value="texts">
            <MainTextsManagement
              pageTexts={pageTexts}
              onUpdatePageTexts={setPageTexts}
              onSave={handleSavePageTexts}
            />
          </TabsContent>

          <TabsContent value="areas">
            <AreasTextsManagement
              pageTexts={pageTexts}
              onUpdatePageTexts={setPageTexts}
              onSave={handleSavePageTexts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
