
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, Plus, Trash2, Image, Link, FileText, Users, Phone, MapPin } from 'lucide-react';
import { PageTexts, TeamMember } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';

interface HomePageEditorProps {
  pageTexts: PageTexts;
  teamMembers: TeamMember[];
  onUpdatePageTexts: (texts: PageTexts) => void;
  onAddTeamMember: () => void;
  onRemoveTeamMember: (id: string) => void;
  onUpdateTeamMember: (id: string, field: keyof TeamMember, value: string) => void;
  onSaveAll: () => void;
}

export const HomePageEditor: React.FC<HomePageEditorProps> = ({
  pageTexts,
  teamMembers,
  onUpdatePageTexts,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  onSaveAll
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Editor Completo da Página Inicial
          </CardTitle>
          <Button onClick={onSaveAll} size="sm" variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Salvar Tudo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className={`grid w-full grid-cols-6 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
            <TabsTrigger value="hero" className="flex items-center gap-1">
              <Image className="w-3 h-3" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Sobre
            </TabsTrigger>
            <TabsTrigger value="areas" className="flex items-center gap-1">
              <Link className="w-3 h-3" />
              Áreas
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Equipe
            </TabsTrigger>
            <TabsTrigger value="client" className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              Cliente
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Contato
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Seção Hero</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Título Principal</Label>
                <Input
                  value={pageTexts.heroTitle}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, heroTitle: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: Excelência em Advocacia"
                />
              </div>
              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={pageTexts.heroSubtitle}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, heroSubtitle: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: Defendemos seus direitos com dedicação"
                />
              </div>
              <div>
                <Label>Imagem de Fundo do Hero</Label>
                <Input
                  value={pageTexts.heroBackgroundImage || ''}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, heroBackgroundImage: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="URL da imagem de fundo"
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Cole a URL da imagem ou faça upload para /lovable-uploads/
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Seção Sobre Nós</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Título da Seção</Label>
                <Input
                  value={pageTexts.aboutTitle}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, aboutTitle: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={pageTexts.aboutDescription}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, aboutDescription: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Descrição completa sobre o escritório..."
                />
              </div>
              <div>
                <Label>Imagem da Seção Sobre</Label>
                <Input
                  value={pageTexts.aboutImage || ''}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, aboutImage: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="URL da imagem"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Áreas de Atuação</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Título da Seção</Label>
                <Input
                  value={pageTexts.areasTitle}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, areasTitle: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              
              <div className="space-y-4">
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Configurar Textos por Área:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Direito de Família - Título</Label>
                    <Input
                      value={pageTexts.familiaTitle}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, familiaTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito de Família - Descrição</Label>
                    <Textarea
                      value={pageTexts.familiaDescription}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, familiaDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  
                  <div>
                    <Label>Direito Tributário - Título</Label>
                    <Input
                      value={pageTexts.tributarioTitle}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, tributarioTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito Tributário - Descrição</Label>
                    <Textarea
                      value={pageTexts.tributarioDescription}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, tributarioDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  
                  <div>
                    <Label>Direito Empresarial - Título</Label>
                    <Input
                      value={pageTexts.empresarialTitle}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, empresarialTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito Empresarial - Descrição</Label>
                    <Textarea
                      value={pageTexts.empresarialDescription}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, empresarialDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>

                  <div>
                    <Label>Direito do Trabalho - Título</Label>
                    <Input
                      value={pageTexts.trabalhoTitle}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, trabalhoTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito do Trabalho - Descrição</Label>
                    <Textarea
                      value={pageTexts.trabalhoDescription}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, trabalhoDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>

                  <div>
                    <Label>Direito Civil - Título</Label>
                    <Input
                      value={pageTexts.civilTitle || 'Direito Civil'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, civilTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito Civil - Descrição</Label>
                    <Textarea
                      value={pageTexts.civilDescription || 'Proteção de direitos e interesses individuais'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, civilDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>

                  <div>
                    <Label>Direito Previdenciário - Título</Label>
                    <Input
                      value={pageTexts.previdenciarioTitle || 'Direito Previdenciário'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, previdenciarioTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito Previdenciário - Descrição</Label>
                    <Textarea
                      value={pageTexts.previdenciarioDescription || 'Benefícios e aposentadorias'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, previdenciarioDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>

                  <div>
                    <Label>Direito do Consumidor - Título</Label>
                    <Input
                      value={pageTexts.consumidorTitle || 'Direito do Consumidor'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, consumidorTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito do Consumidor - Descrição</Label>
                    <Textarea
                      value={pageTexts.consumidorDescription || 'Proteção e defesa do consumidor'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, consumidorDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>

                  <div>
                    <Label>Direito Constitucional - Título</Label>
                    <Input
                      value={pageTexts.constitucionalTitle || 'Direito Constitucional'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, constitucionalTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito Constitucional - Descrição</Label>
                    <Textarea
                      value={pageTexts.constitucionalDescription || 'Direitos fundamentais e constitucionalidade'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, constitucionalDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>

                  <div>
                    <Label>Direito Administrativo - Título</Label>
                    <Input
                      value={pageTexts.administrativoTitle || 'Direito Administrativo'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, administrativoTitle: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                  <div>
                    <Label>Direito Administrativo - Descrição</Label>
                    <Textarea
                      value={pageTexts.administrativoDescription || 'Relações com a administração pública'}
                      onChange={(e) => onUpdatePageTexts({...pageTexts, administrativoDescription: e.target.value})}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Textos das Áreas Específicas (Categoria):</h4>
                
                <div className="grid grid-cols-1 gap-4">
                  {pageTexts.categoryTexts.map((category, index) => (
                    <div key={category.id} className={`p-4 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Título - {category.id}</Label>
                          <Input
                            value={category.title}
                            onChange={(e) => {
                              const updatedCategories = [...pageTexts.categoryTexts];
                              updatedCategories[index] = { ...category, title: e.target.value };
                              onUpdatePageTexts({...pageTexts, categoryTexts: updatedCategories});
                            }}
                            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Descrição - {category.id}</Label>
                          <Textarea
                            value={category.description}
                            onChange={(e) => {
                              const updatedCategories = [...pageTexts.categoryTexts];
                              updatedCategories[index] = { ...category, description: e.target.value };
                              onUpdatePageTexts({...pageTexts, categoryTexts: updatedCategories});
                            }}
                            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Nossa Equipe ({teamMembers.length} membros)
              </h3>
              <Button onClick={onAddTeamMember} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Membro
              </Button>
            </div>
            
            <div>
              <Label>Título da Seção</Label>
              <Input
                value={pageTexts.teamTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, teamTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className={`p-4 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                      {member.name || 'Novo Membro'}
                    </h4>
                    <Button 
                      onClick={() => onRemoveTeamMember(member.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Nome</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => onUpdateTeamMember(member.id, 'name', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Cargo</Label>
                      <Input
                        value={member.title}
                        onChange={(e) => onUpdateTeamMember(member.id, 'title', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">OAB</Label>
                      <Input
                        value={member.oab}
                        onChange={(e) => onUpdateTeamMember(member.id, 'oab', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Email</Label>
                      <Input
                        value={member.email}
                        onChange={(e) => onUpdateTeamMember(member.id, 'email', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm">URL da Foto</Label>
                      <Input
                        value={member.image}
                        onChange={(e) => onUpdateTeamMember(member.id, 'image', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        placeholder="/lovable-uploads/foto.png"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm">Descrição</Label>
                      <Textarea
                        value={member.description || ''}
                        onChange={(e) => onUpdateTeamMember(member.id, 'description', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                        rows={3}
                        placeholder="Descrição profissional do membro da equipe..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="client" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Área do Cliente</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Título da Seção</Label>
                <Input
                  value={pageTexts.clientAreaTitle}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaTitle: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={pageTexts.clientAreaDescription}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaDescription: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Link do Portal do Cliente</Label>
                <Input
                  value={pageTexts.clientPortalLink || ''}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, clientPortalLink: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="https://portal.escritorio.com"
                />
              </div>
              <div>
                <Label>Link do WhatsApp para Primeiro Acesso</Label>
                <Input
                  value={pageTexts.contactTexts.whatsapp}
                  onChange={(e) => onUpdatePageTexts({
                    ...pageTexts, 
                    contactTexts: {...pageTexts.contactTexts, whatsapp: e.target.value}
                  })}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="5562994594496"
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Apenas números, sem espaços ou símbolos
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Contato & Rodapé</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título Contato</Label>
                <Input
                  value={pageTexts.contactTitle}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, contactTitle: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Subtítulo Contato</Label>
                <Input
                  value={pageTexts.contactSubtitle}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, contactSubtitle: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              
              <div>
                <Label>Telefone</Label>
                <Input
                  value={pageTexts.contactTexts.phone}
                  onChange={(e) => onUpdatePageTexts({
                    ...pageTexts, 
                    contactTexts: {...pageTexts.contactTexts, phone: e.target.value}
                  })}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="(11) 9999-9999"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={pageTexts.contactTexts.email}
                  onChange={(e) => onUpdatePageTexts({
                    ...pageTexts, 
                    contactTexts: {...pageTexts.contactTexts, email: e.target.value}
                  })}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="contato@exemplo.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Endereço</Label>
                <Input
                  value={pageTexts.contactTexts.address}
                  onChange={(e) => onUpdatePageTexts({
                    ...pageTexts, 
                    contactTexts: {...pageTexts.contactTexts, address: e.target.value}
                  })}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Rua Exemplo, 123 - São Paulo, SP"
                />
              </div>
              <div>
                <Label>WhatsApp (números apenas)</Label>
                <Input
                  value={pageTexts.contactTexts.whatsapp}
                  onChange={(e) => onUpdatePageTexts({
                    ...pageTexts, 
                    contactTexts: {...pageTexts.contactTexts, whatsapp: e.target.value}
                  })}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="5511999999999"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>Nome da Empresa (Rodapé)</Label>
                <Input
                  value={pageTexts.footerTexts.companyName}
                  onChange={(e) => onUpdatePageTexts({
                    ...pageTexts, 
                    footerTexts: {...pageTexts.footerTexts, companyName: e.target.value}
                  })}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Serafim & Trombela Advocacia"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>Descrição da Empresa (Rodapé)</Label>
                <Textarea
                  value={pageTexts.footerTexts.description}
                  onChange={(e) => onUpdatePageTexts({
                    ...pageTexts, 
                    footerTexts: {...pageTexts.footerTexts, description: e.target.value}
                  })}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  rows={2}
                  placeholder="Soluções jurídicas inovadoras com foco em resultados..."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
