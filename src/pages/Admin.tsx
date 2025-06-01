import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LogOut, Save, Plus, Trash2, Users, FileText, Briefcase, Settings } from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';
import { TeamMember, SpecializedService, PageTexts } from '../types/adminTypes';
import { toast } from 'sonner';

const Admin = () => {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { 
    teamMembers: initialTeamMembers, 
    specializedServices: initialSpecializedServices, 
    pageTexts: initialPageTexts, 
    isLoading,
    saveTeamMembers,
    saveSpecializedServices,
    savePageTexts
  } = useAdminData();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [specializedServices, setSpecializedServices] = useState<SpecializedService[]>([]);
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
      setPageTexts(initialPageTexts);
    }
  }, [isLoading, initialTeamMembers, initialSpecializedServices, initialPageTexts]);

  const handleSaveTeamMembers = () => {
    saveTeamMembers(teamMembers);
    toast.success('Equipe salva com sucesso!');
  };

  const handleSaveSpecializedServices = () => {
    saveSpecializedServices(specializedServices);
    toast.success('Serviços especializados salvos com sucesso!');
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

  const categories = [
    { value: 'familia', label: 'Direito de Família' },
    { value: 'tributario', label: 'Direito Tributário' },
    { value: 'empresarial', label: 'Direito Empresarial' },
    { value: 'trabalho', label: 'Direito do Trabalho' },
    { value: 'constitucional', label: 'Direito Constitucional' },
    { value: 'administrativo', label: 'Direito Administrativo' },
    { value: 'previdenciario', label: 'Direito Previdenciário' },
    { value: 'consumidor', label: 'Direito do Consumidor' },
    { value: 'civil', label: 'Direito Civil' }
  ];

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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8" />
            <h1 className={`text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              Painel Administrativo
            </h1>
          </div>
          <Button 
            onClick={logout}
            variant="outline"
            className={`${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-200 text-black hover:bg-gray-100'}`}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-4 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Equipe
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Serviços
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

          <TabsContent value="team">
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    <Users className="w-5 h-5" />
                    Gerenciar Equipe ({teamMembers.length} membros)
                  </CardTitle>
                  <div className="space-x-2">
                    <Button onClick={addTeamMember} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                    <Button onClick={handleSaveTeamMembers} size="sm" variant="outline">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className={`p-6 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                        {member.name || 'Novo Membro'}
                      </h3>
                      <Button 
                        onClick={() => removeTeamMember(member.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Nome Completo</Label>
                        <Input
                          value={member.name}
                          onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                          placeholder="Ex: Dr. João Silva"
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Cargo</Label>
                        <Input
                          value={member.title}
                          onChange={(e) => updateTeamMember(member.id, 'title', e.target.value)}
                          placeholder="Ex: Advogado Sócio"
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Registro OAB</Label>
                        <Input
                          value={member.oab}
                          onChange={(e) => updateTeamMember(member.id, 'oab', e.target.value)}
                          placeholder="Ex: OAB/GO: 12345"
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <Input
                          value={member.email}
                          onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                          placeholder="Ex: joao@stadv.com"
                          type="email"
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium">URL da Foto</Label>
                        <Input
                          value={member.image}
                          onChange={(e) => updateTeamMember(member.id, 'image', e.target.value)}
                          placeholder="Ex: /lovable-uploads/foto.png"
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium">Biografia</Label>
                        <Textarea
                          value={member.description}
                          onChange={(e) => updateTeamMember(member.id, 'description', e.target.value)}
                          placeholder="Descreva a experiência e qualificações do advogado..."
                          rows={4}
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    <Briefcase className="w-5 h-5" />
                    Serviços Especializados ({specializedServices.length} serviços)
                  </CardTitle>
                  <div className="space-x-2">
                    <Button onClick={addSpecializedService} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                    <Button onClick={handleSaveSpecializedServices} size="sm" variant="outline">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {specializedServices.map((service) => (
                  <div key={service.id} className={`p-6 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                        {service.title || 'Novo Serviço'}
                      </h3>
                      <Button 
                        onClick={() => removeSpecializedService(service.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Título do Serviço</Label>
                        <Input
                          value={service.title}
                          onChange={(e) => updateSpecializedService(service.id, 'title', e.target.value)}
                          placeholder="Ex: Divórcio Consensual"
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Categoria</Label>
                        <Select 
                          value={service.category} 
                          onValueChange={(value) => updateSpecializedService(service.id, 'category', value)}
                        >
                          <SelectTrigger className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Link do Serviço</Label>
                        <Input
                          value={service.href}
                          onChange={(e) => updateSpecializedService(service.id, 'href', e.target.value)}
                          placeholder="Ex: /services/divorcio"
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium">Descrição</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateSpecializedService(service.id, 'description', e.target.value)}
                          placeholder="Descreva o serviço oferecido..."
                          rows={3}
                          className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="texts">
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                    Textos Principais das Páginas
                  </CardTitle>
                  <Button onClick={handleSavePageTexts} size="sm" variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label>Título Principal (Hero)</Label>
                    <Input
                      value={pageTexts.heroTitle}
                      onChange={(e) => setPageTexts({...pageTexts, heroTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Subtítulo (Hero)</Label>
                    <Input
                      value={pageTexts.heroSubtitle}
                      onChange={(e) => setPageTexts({...pageTexts, heroSubtitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Título Sobre Nós</Label>
                    <Input
                      value={pageTexts.aboutTitle}
                      onChange={(e) => setPageTexts({...pageTexts, aboutTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Descrição Sobre Nós</Label>
                    <Textarea
                      value={pageTexts.aboutDescription}
                      onChange={(e) => setPageTexts({...pageTexts, aboutDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Título Nossa Equipe</Label>
                    <Input
                      value={pageTexts.teamTitle}
                      onChange={(e) => setPageTexts({...pageTexts, teamTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Título Áreas de Atuação</Label>
                    <Input
                      value={pageTexts.areasTitle}
                      onChange={(e) => setPageTexts({...pageTexts, areasTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Título Área do Cliente</Label>
                    <Input
                      value={pageTexts.clientAreaTitle}
                      onChange={(e) => setPageTexts({...pageTexts, clientAreaTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Descrição Área do Cliente</Label>
                    <Textarea
                      value={pageTexts.clientAreaDescription}
                      onChange={(e) => setPageTexts({...pageTexts, clientAreaDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Título Contato</Label>
                    <Input
                      value={pageTexts.contactTitle}
                      onChange={(e) => setPageTexts({...pageTexts, contactTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Subtítulo Contato</Label>
                    <Input
                      value={pageTexts.contactSubtitle}
                      onChange={(e) => setPageTexts({...pageTexts, contactSubtitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="areas">
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                    Textos das Áreas de Atuação
                  </CardTitle>
                  <Button onClick={handleSavePageTexts} size="sm" variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Direito de Família */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito de Família</Label>
                      <Input
                        value={pageTexts.familiaTitle}
                        onChange={(e) => setPageTexts({...pageTexts, familiaTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito de Família</Label>
                      <Input
                        value={pageTexts.familiaDescription}
                        onChange={(e) => setPageTexts({...pageTexts, familiaDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito Tributário */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito Tributário</Label>
                      <Input
                        value={pageTexts.tributarioTitle}
                        onChange={(e) => setPageTexts({...pageTexts, tributarioTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito Tributário</Label>
                      <Input
                        value={pageTexts.tributarioDescription}
                        onChange={(e) => setPageTexts({...pageTexts, tributarioDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito Empresarial */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito Empresarial</Label>
                      <Input
                        value={pageTexts.empresarialTitle}
                        onChange={(e) => setPageTexts({...pageTexts, empresarialTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito Empresarial</Label>
                      <Input
                        value={pageTexts.empresarialDescription}
                        onChange={(e) => setPageTexts({...pageTexts, empresarialDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito do Trabalho */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito do Trabalho</Label>
                      <Input
                        value={pageTexts.trabalhoTitle}
                        onChange={(e) => setPageTexts({...pageTexts, trabalhoTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito do Trabalho</Label>
                      <Input
                        value={pageTexts.trabalhoDescription}
                        onChange={(e) => setPageTexts({...pageTexts, trabalhoDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito Constitucional */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito Constitucional</Label>
                      <Input
                        value={pageTexts.constitucionalTitle}
                        onChange={(e) => setPageTexts({...pageTexts, constitucionalTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito Constitucional</Label>
                      <Input
                        value={pageTexts.constitucionalDescription}
                        onChange={(e) => setPageTexts({...pageTexts, constitucionalDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito Administrativo */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito Administrativo</Label>
                      <Input
                        value={pageTexts.administrativoTitle}
                        onChange={(e) => setPageTexts({...pageTexts, administrativoTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito Administrativo</Label>
                      <Input
                        value={pageTexts.administrativoDescription}
                        onChange={(e) => setPageTexts({...pageTexts, administrativoDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito Previdenciário */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito Previdenciário</Label>
                      <Input
                        value={pageTexts.previdenciarioTitle}
                        onChange={(e) => setPageTexts({...pageTexts, previdenciarioTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito Previdenciário</Label>
                      <Input
                        value={pageTexts.previdenciarioDescription}
                        onChange={(e) => setPageTexts({...pageTexts, previdenciarioDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito do Consumidor */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito do Consumidor</Label>
                      <Input
                        value={pageTexts.consumidorTitle}
                        onChange={(e) => setPageTexts({...pageTexts, consumidorTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito do Consumidor</Label>
                      <Input
                        value={pageTexts.consumidorDescription}
                        onChange={(e) => setPageTexts({...pageTexts, consumidorDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>

                  {/* Direito Civil */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título - Direito Civil</Label>
                      <Input
                        value={pageTexts.civilTitle}
                        onChange={(e) => setPageTexts({...pageTexts, civilTitle: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Descrição - Direito Civil</Label>
                      <Input
                        value={pageTexts.civilDescription}
                        onChange={(e) => setPageTexts({...pageTexts, civilDescription: e.target.value})}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
