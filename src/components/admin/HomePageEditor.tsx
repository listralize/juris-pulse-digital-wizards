import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Save, Plus, Trash2, Image, Link, FileText, Users, Phone, MapPin } from 'lucide-react';
import { PageTexts, TeamMember } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';
import { toast } from 'sonner';

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
  teamMembers = [],
  onUpdatePageTexts,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  onSaveAll
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const safeTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];

  const handleInputChange = (field: keyof PageTexts, value: string) => {
    console.log('📝 HomePageEditor: Alterando campo:', field, 'para:', value);
    const updatedTexts = {
      ...pageTexts,
      [field]: value
    };
    onUpdatePageTexts(updatedTexts);
  };

  const handleNestedChange = (parent: keyof PageTexts, field: string, value: string) => {
    console.log('📝 HomePageEditor: Alterando campo aninhado:', parent, field, 'para:', value);
    const parentObject = pageTexts[parent] || {};
    const updatedTexts = {
      ...pageTexts,
      [parent]: {
        ...parentObject,
        [field]: value
      }
    };
    onUpdatePageTexts(updatedTexts);
  };

  const handleSaveAndNotify = async () => {
    try {
      console.log('💾 HomePageEditor: Salvando alterações...', pageTexts);
      
      // Salvar dados específicos nas tabelas correspondentes PRIMEIRO
      await saveToSupabaseTables();
      
      // Depois salvar via prop function
      if (onSaveAll) {
        await onSaveAll();
        
        // Disparar evento personalizado para notificar todas as seções
        console.log('📡 HomePageEditor: Disparando evento pageTextsUpdated');
        const event = new CustomEvent('pageTextsUpdated', { 
          detail: {
            ...pageTexts,
            // Garantir que contactTexts e footerTexts tenham a estrutura correta
            contactTexts: pageTexts.contactTexts || {},
            footerTexts: pageTexts.footerTexts || {}
          }
        });
        window.dispatchEvent(event);
        
        toast.success('Alterações salvas com sucesso!');
      } else {
        toast.error('Função de salvar não disponível');
      }
    } catch (error) {
      console.error('❌ HomePageEditor: Erro ao salvar:', error);
      toast.error('Erro ao salvar alterações');
    }
  };

  const saveToSupabaseTables = async () => {
    try {
      const { supabase } = await import('../../integrations/supabase/client');
      
      // Salvar dados de contato na tabela contact_info
      if (pageTexts.contactTexts) {
        const contactData = {
          phone: pageTexts.contactTexts.phone || '',
          email: pageTexts.contactTexts.email || '',
          address: pageTexts.contactTexts.address || '',
          whatsapp: pageTexts.contactTexts.whatsapp || '',
          map_embed_url: pageTexts.contactTexts.mapEmbedUrl || null,
          updated_at: new Date().toISOString()
        };
        
        // Tentar atualizar primeiro, se não existir, inserir
        const { data: existingContact } = await supabase
          .from('contact_info')
          .select('id')
          .limit(1)
          .maybeSingle();
          
        if (existingContact) {
          await supabase
            .from('contact_info')
            .update(contactData)
            .eq('id', existingContact.id);
        } else {
          await supabase
            .from('contact_info')
            .insert(contactData);
        }
        
        console.log('📞 Dados de contato salvos na contact_info:', contactData);
      }
      
      // Salvar dados do footer na tabela footer_info
      if (pageTexts.footerTexts) {
        const footerData = {
          company_name: pageTexts.footerTexts.companyName || '',
          description: pageTexts.footerTexts.description || '',
          updated_at: new Date().toISOString()
        };
        
        // Tentar atualizar primeiro, se não existir, inserir
        const { data: existingFooter } = await supabase
          .from('footer_info')
          .select('id')
          .limit(1)
          .maybeSingle();
          
        if (existingFooter) {
          await supabase
            .from('footer_info')
            .update(footerData)
            .eq('id', existingFooter.id);
        } else {
          await supabase
            .from('footer_info')
            .insert(footerData);
        }
        
        console.log('🦶 Dados do footer salvos na footer_info:', footerData);
      }
      
      // Salvar configurações gerais na tabela site_settings
      const siteData = {
        contact_title: pageTexts.contactTitle || '',
        contact_subtitle: pageTexts.contactSubtitle || '',
        hero_title: pageTexts.heroTitle || '',
        hero_subtitle: pageTexts.heroSubtitle || '',
        hero_primary_button_text: pageTexts.heroPrimaryButtonText || '',
        hero_primary_button_link: pageTexts.heroPrimaryButtonLink || '',
        hero_secondary_button_text: pageTexts.heroSecondaryButtonText || '',
        hero_secondary_button_link: pageTexts.heroSecondaryButtonLink || '',
        hero_background_image: pageTexts.heroBackgroundImage || null,
        about_title: pageTexts.aboutTitle || '',
        about_description: pageTexts.aboutDescription || '',
        about_image: pageTexts.aboutImage || null,
        about_media_type: pageTexts.aboutMediaType || 'image',
        areas_title: pageTexts.areasTitle || '',
        team_title: pageTexts.teamTitle || '',
        client_area_title: pageTexts.clientAreaTitle || '',
        client_area_description: pageTexts.clientAreaDescription || '',
        client_portal_link: pageTexts.clientPortalLink || null,
        updated_at: new Date().toISOString()
      };
      
      // Tentar atualizar primeiro, se não existir, inserir
      const { data: existingSite } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();
        
      if (existingSite) {
        await supabase
          .from('site_settings')
          .update(siteData)
          .eq('id', existingSite.id);
      } else {
        await supabase
          .from('site_settings')
          .insert(siteData);
      }
      
      console.log('⚙️ Configurações do site salvas na site_settings:', siteData);
      
    } catch (error) {
      console.error('❌ Erro ao salvar nas tabelas do Supabase:', error);
      throw error;
    }
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Editor Completo da Página Inicial
          </CardTitle>
          <Button onClick={handleSaveAndNotify} size="sm" variant="outline">
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
              Contato & Footer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Seção Hero</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Título Principal</Label>
                <Input
                  value={pageTexts.heroTitle || ''}
                  onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: Soluções Jurídicas Inovadoras"
                />
              </div>
              <div>
                <Label>Subtítulo</Label>
                <Textarea
                  value={pageTexts.heroSubtitle || ''}
                  onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: Suas questões nas mãos de quem entende..."
                  rows={3}
                />
              </div>
              <div>
                <Label>Texto do Primeiro Botão</Label>
                <Input
                  value={pageTexts.heroPrimaryButtonText || ''}
                  onChange={(e) => handleInputChange('heroPrimaryButtonText', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: Fale Conosco no WhatsApp"
                />
              </div>
              <div>
                <Label>Link do Primeiro Botão</Label>
                <Input
                  value={pageTexts.heroPrimaryButtonLink || ''}
                  onChange={(e) => handleInputChange('heroPrimaryButtonLink', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: https://api.whatsapp.com/send?phone=5562994594496"
                />
              </div>
              <div>
                <Label>Texto do Segundo Botão</Label>
                <Input
                  value={pageTexts.heroSecondaryButtonText || ''}
                  onChange={(e) => handleInputChange('heroSecondaryButtonText', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: Conheça Nossas Áreas de Atuação"
                />
              </div>
              <div>
                <Label>Link do Segundo Botão</Label>
                <Input
                  value={pageTexts.heroSecondaryButtonLink || ''}
                  onChange={(e) => handleInputChange('heroSecondaryButtonLink', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: #areas"
                />
              </div>
              <div>
                <Label>Imagem de Fundo</Label>
                <Input
                  value={pageTexts.heroBackgroundImage || ''}
                  onChange={(e) => handleInputChange('heroBackgroundImage', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="URL da imagem de fundo"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Seção Sobre Nós</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Título da Seção</Label>
                <Input
                  value={pageTexts.aboutTitle || ''}
                  onChange={(e) => handleInputChange('aboutTitle', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Ex: Sobre Nós"
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={pageTexts.aboutDescription || ''}
                  onChange={(e) => handleInputChange('aboutDescription', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Descrição completa sobre o escritório..."
                  rows={4}
                />
              </div>
              <div>
                <Label>Tipo de Mídia</Label>
                <Select
                  value={pageTexts.aboutMediaType || 'image'}
                  onValueChange={(value) => handleInputChange('aboutMediaType', value)}
                >
                  <SelectTrigger className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Imagem</SelectItem>
                    <SelectItem value="video">Vídeo (YouTube)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>
                  {pageTexts.aboutMediaType === 'video' ? 'URL do Vídeo do YouTube' : 'URL da Imagem'}
                </Label>
                <Input
                  value={pageTexts.aboutImage || ''}
                  onChange={(e) => handleInputChange('aboutImage', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder={pageTexts.aboutMediaType === 'video' ? 'https://www.youtube.com/watch?v=...' : 'URL da imagem'}
                />
                {pageTexts.aboutMediaType === 'video' && (
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Cole a URL completa do YouTube (ex: https://www.youtube.com/watch?v=...)
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Áreas de Atuação</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Título da Seção</Label>
                <Input
                  value={pageTexts.areasTitle || ''}
                  onChange={(e) => handleInputChange('areasTitle', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Nossa Equipe ({safeTeamMembers.length} membros)
              </h3>
              <Button onClick={onAddTeamMember} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Membro
              </Button>
            </div>
            
            <div>
              <Label>Título da Seção</Label>
              <Input
                value={pageTexts.teamTitle || ''}
                onChange={(e) => handleInputChange('teamTitle', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>

            <div className="space-y-4">
              {safeTeamMembers.map((member) => (
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
                        value={member.name || ''}
                        onChange={(e) => onUpdateTeamMember(member.id, 'name', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Cargo</Label>
                      <Input
                        value={member.title || ''}
                        onChange={(e) => onUpdateTeamMember(member.id, 'title', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">OAB</Label>
                      <Input
                        value={member.oab || ''}
                        onChange={(e) => onUpdateTeamMember(member.id, 'oab', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Email</Label>
                      <Input
                        value={member.email || ''}
                        onChange={(e) => onUpdateTeamMember(member.id, 'email', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm">URL da Foto</Label>
                      <Input
                        value={member.image || ''}
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
                  value={pageTexts.clientAreaTitle || ''}
                  onChange={(e) => handleInputChange('clientAreaTitle', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={pageTexts.clientAreaDescription || ''}
                  onChange={(e) => handleInputChange('clientAreaDescription', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Link do Portal do Cliente</Label>
                <Input
                  value={pageTexts.clientPortalLink || ''}
                  onChange={(e) => handleInputChange('clientPortalLink', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="https://portal.escritorio.com"
                />
              </div>
              <div>
                <Label>Link do WhatsApp para Primeiro Acesso</Label>
                <Input
                  value={pageTexts.contactTexts?.whatsapp || ''}
                  onChange={(e) => handleNestedChange('contactTexts', 'whatsapp', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="5562994594496"
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Apenas números, sem espaços ou símbolos
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Contato & Localização</h3>
            
            {/* Seção Contact */}
            <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
              <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Página de Contato</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Título da Página</Label>
                  <Input
                    value={pageTexts.contactTitle || ''}
                    onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="Entre em Contato"
                  />
                </div>
                <div>
                  <Label>Subtítulo da Página</Label>
                  <Input
                    value={pageTexts.contactSubtitle || ''}
                    onChange={(e) => handleInputChange('contactSubtitle', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="Estamos prontos para ajudá-lo"
                  />
                </div>
                
                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={pageTexts.contactTexts?.phone || ''}
                    onChange={(e) => handleNestedChange('contactTexts', 'phone', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="(62) 99459-4496"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={pageTexts.contactTexts?.email || ''}
                    onChange={(e) => handleNestedChange('contactTexts', 'email', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="contato@stadv.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Endereço Completo</Label>
                  <Textarea
                    value={pageTexts.contactTexts?.address || ''}
                    onChange={(e) => handleNestedChange('contactTexts', 'address', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>WhatsApp (números apenas)</Label>
                  <Input
                    value={pageTexts.contactTexts?.whatsapp || ''}
                    onChange={(e) => handleNestedChange('contactTexts', 'whatsapp', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="5562994594496"
                  />
                </div>
                <div>
                  <Label>URL Embed do Google Maps</Label>
                  <Input
                    value={pageTexts.contactTexts?.mapEmbedUrl || ''}
                    onChange={(e) => handleNestedChange('contactTexts', 'mapEmbedUrl', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="URL do iframe do Google Maps"
                  />
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Cole a URL do iframe do Google Maps para personalizar a localização
                  </p>
                </div>
              </div>
            </div>

            {/* Seção Footer */}
            <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
              <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Rodapé</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  <Input
                    value={pageTexts.footerTexts?.companyName || ''}
                    onChange={(e) => handleNestedChange('footerTexts', 'companyName', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    placeholder="Serafim & Trombela Advocacia"
                  />
                </div>
                
                <div>
                  <Label>Texto Descritivo (abaixo da logo)</Label>
                  <Textarea
                    value={pageTexts.footerTexts?.description || ''}
                    onChange={(e) => handleNestedChange('footerTexts', 'description', e.target.value)}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                    rows={3}
                    placeholder="A história do Serafim & Trombela Advocacia é moldada pelo compromisso com a excelência jurídica e o sucesso de nossos clientes."
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
