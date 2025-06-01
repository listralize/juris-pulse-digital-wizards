
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LogOut, Save, Plus, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  oab: string;
  email: string;
  image: string;
  description: string;
}

interface PageTexts {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  contactTitle: string;
  contactSubtitle: string;
  teamTitle: string;
  areasTitle: string;
  clientAreaTitle: string;
  clientAreaDescription: string;
  familiaTitle: string;
  familiaDescription: string;
  tributarioTitle: string;
  tributarioDescription: string;
  empresarialTitle: string;
  empresarialDescription: string;
  trabalhoTitle: string;
  trabalhoDescription: string;
  constitucionalTitle: string;
  constitucionalDescription: string;
  administrativoTitle: string;
  administrativoDescription: string;
  previdenciarioTitle: string;
  previdenciarioDescription: string;
  consumidorTitle: string;
  consumidorDescription: string;
  civilTitle: string;
  civilDescription: string;
}

const Admin = () => {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
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
    // Carregar dados salvos do localStorage
    const savedTeam = localStorage.getItem('adminTeamMembers');
    const savedTexts = localStorage.getItem('adminPageTexts');
    
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    } else {
      // Dados iniciais da equipe - TODOS os 4 advogados
      setTeamMembers([
        {
          id: 'trombela',
          name: 'Dr. Enzo Trombela',
          title: 'Advogado Sócio',
          oab: 'OAB/GO: 67.754 | OAB/SP: 521.263',
          email: 'trombela@stadv.com',
          image: '/lovable-uploads/dbdc43db-9dcc-4838-8f80-8298be65169a.png',
          description: 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Pós-graduado em Direito Civil e Processo Civil pelo Instituto Goiano de Direito.'
        },
        {
          id: 'serafim',
          name: 'Dr. Vinicius Serafim',
          title: 'Advogado Sócio',
          oab: 'OAB/GO: 67.790',
          email: 'serafim@stadv.com',
          image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png',
          description: 'Especializado em Direito Empresarial e Tributário, com vasta experiência em consultorias e contencioso estratégico.'
        },
        {
          id: 'lanzana',
          name: 'Dr. João Victor Lanzana',
          title: 'Advogado Associado',
          oab: 'OAB/GO: 71.163',
          email: 'lanzana@stadv.com',
          image: '/lovable-uploads/d11e57cf-ddb3-4377-9caf-91e75503165b.png',
          description: 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Pós-graduado em Direito Penal e Processo Penal pelo Gran Centro Universitário.'
        },
        {
          id: 'rafaella',
          name: 'Dra. Rafaella Alves Da Silva',
          title: 'Advogada Associada',
          oab: 'OAB/GO: 72.342',
          email: 'rafaella@stadv.com',
          image: '/lovable-uploads/7dbb1fd3-c3ce-4f91-a88d-95a969448804.png',
          description: 'Graduada pelo Centro Universitário de Goiás (UniGoiás). Advogada Associada do escritório Serafim & Trombela Advogados.'
        }
      ]);
    }
    
    if (savedTexts) {
      setPageTexts(JSON.parse(savedTexts));
    } else {
      // Textos iniciais
      setPageTexts({
        heroTitle: 'Excelência jurídica que transforma desafios em vitórias',
        heroSubtitle: 'Soluções jurídicas estratégicas com foco em resultados excepcionais',
        aboutTitle: 'Sobre Nós',
        aboutDescription: 'A história do Serafim & Trombela Advocacia é moldada pelo compromisso com a excelência jurídica e o sucesso de nossos clientes. Nossa equipe é formada por advogados experientes e apaixonados, que compreendem a fundo os desafios enfrentados por cada cliente. Buscamos soluções inovadoras, eficazes e com foco em resultados reais.',
        contactTitle: 'Precisa de ajuda jurídica?',
        contactSubtitle: 'Entre em contato para uma consulta personalizada',
        teamTitle: 'Nossa Equipe',
        areasTitle: 'Áreas de Atuação',
        clientAreaTitle: 'Área Exclusiva do Cliente',
        clientAreaDescription: 'Acompanhe seus processos com total segurança e transparência. Acesse documentos, atualizações e comunicações com seu advogado em um só lugar.',
        familiaTitle: 'Direito de Família',
        familiaDescription: 'Soluções em divórcios, união estável, guarda de filhos e pensão alimentícia.',
        tributarioTitle: 'Direito Tributário',
        tributarioDescription: 'Planejamento tributário, contencioso fiscal e recuperação de créditos.',
        empresarialTitle: 'Direito Empresarial',
        empresarialDescription: 'Constituição de empresas, contratos e reestruturação societária.',
        trabalhoTitle: 'Direito do Trabalho',
        trabalhoDescription: 'Defesa dos direitos trabalhistas e assessoria empresarial.',
        constitucionalTitle: 'Direito Constitucional',
        constitucionalDescription: 'Defesa de direitos fundamentais e ações constitucionais.',
        administrativoTitle: 'Direito Administrativo',
        administrativoDescription: 'Licitações, contratos públicos e processos administrativos.',
        previdenciarioTitle: 'Direito Previdenciário',
        previdenciarioDescription: 'Aposentadorias, benefícios e planejamento previdenciário.',
        consumidorTitle: 'Direito do Consumidor',
        consumidorDescription: 'Defesa dos direitos dos consumidores e práticas abusivas.',
        civilTitle: 'Direito Civil',
        civilDescription: 'Contratos, responsabilidade civil e direitos patrimoniais.'
      });
    }
  }, []);

  const saveTeamMembers = () => {
    localStorage.setItem('adminTeamMembers', JSON.stringify(teamMembers));
    alert('Equipe salva com sucesso!');
  };

  const savePageTexts = () => {
    localStorage.setItem('adminPageTexts', JSON.stringify(pageTexts));
    alert('Textos salvos com sucesso!');
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

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            Painel Administrativo
          </h1>
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
          <TabsList className={`${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="texts">Textos Principais</TabsTrigger>
            <TabsTrigger value="areas">Textos das Áreas</TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                    Gerenciar Equipe
                  </CardTitle>
                  <div className="space-x-2">
                    <Button onClick={addTeamMember} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                    <Button onClick={saveTeamMembers} size="sm" variant="outline">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className={`p-4 border rounded-lg ${isDark ? 'border-white/20' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Nome</Label>
                        <Input
                          value={member.name}
                          onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div>
                        <Label>Cargo</Label>
                        <Input
                          value={member.title}
                          onChange={(e) => updateTeamMember(member.id, 'title', e.target.value)}
                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div>
                        <Label>OAB</Label>
                        <Input
                          value={member.oab}
                          onChange={(e) => updateTeamMember(member.id, 'oab', e.target.value)}
                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={member.email}
                          onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>URL da Imagem</Label>
                        <Input
                          value={member.image}
                          onChange={(e) => updateTeamMember(member.id, 'image', e.target.value)}
                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Descrição</Label>
                        <Textarea
                          value={member.description}
                          onChange={(e) => updateTeamMember(member.id, 'description', e.target.value)}
                          className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
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
                  <Button onClick={savePageTexts} size="sm" variant="outline">
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
                  <Button onClick={savePageTexts} size="sm" variant="outline">
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
