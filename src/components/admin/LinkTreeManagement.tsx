import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Eye, Settings2, Palette, Zap, Image as ImageIcon, Video, Instagram, Youtube, Facebook, Twitter, Linkedin, Globe } from 'lucide-react';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { useToast } from '@/hooks/use-toast';
import { useFormConfig } from '@/hooks/useFormConfig';
import { IconSelector } from './IconSelector';
import { useLinkTree } from '@/hooks/useLinkTree';

export function LinkTreeManagement() {
  const { linkTree, linkTreeItems, isLoading, saveLinkTree, saveLinkTreeItem, updateLinkTreeItem, deleteLinkTreeItem, loadLinkTree } = useLinkTree();
  const { toast } = useToast();
  const { formConfig, multipleFormsConfig } = useFormConfig();

  // Estados para o novo item
  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    icon: 'link',
    icon_size: 'w-5 h-5',
    icon_color: '#000000',
    background_color: '#ffffff',
    text_color: '#000000',
    button_style: 'inherit' as any,
    hover_effect: 'scale' as any,
    is_featured: false,
    item_type: 'link' as any,
    card_content: '',
    card_image: '',
    card_price: '',
    card_button_text: 'Saiba Mais',
    form_id: '',
    card_size: 'medium',
    card_format: 'rounded'
  });

  // Estados do Link Tree
  const [linkTreeData, setLinkTreeData] = useState({
    title: 'Meu Link Tree',
    description: '',
    background_color: '#000000',
    text_color: '#ffffff',
    button_style: 'list' as LinkTree['button_style'],
    avatar_url: '',
    avatar_size: 'w-20 h-20',
    avatar_format: 'rounded-full',
    theme: 'modern' as LinkTree['theme'],
    background_type: 'neural' as LinkTree['background_type'],
    background_gradient: '',
    background_image: '',
    background_video: '',
    background_opacity: 0.5,
    custom_css: '',
    animation_style: 'glow' as LinkTree['animation_style'],
    show_analytics: false,
    is_active: true,
    title_size: 'text-3xl',
    title_font: 'font-bold',
    title_color: '#ffffff',
    description_size: 'text-base',
    description_color: '#ffffff',
    footer_enabled: true,
    footer_text: '',
    footer_social_links: [] as Array<{platform: string; url: string; icon?: string}>,
    footer_background_color: '#1a1a1a',
    footer_text_color: '#ffffff',
    footer_style: 'minimal' as 'minimal' | 'modern' | 'complete'
  });

  // Estado para edição de item
  const [editingItem, setEditingItem] = useState<LinkTreeItem | null>(null);

  const itemTypeOptions = [
    { value: 'link', label: '🔗 Link', description: 'Link básico para qualquer URL' },
    { value: 'card', label: '📄 Card Premium', description: 'Card com imagem, texto e botão de ação' },
    { value: 'form', label: '📝 Formulário', description: 'Formulário de contato integrado' },
    { value: 'video', label: '🎥 Vídeo/Mídia', description: 'Vídeo institucional ou apresentação' },
    { value: 'text', label: '📝 Informativo', description: 'Bloco de texto ou aviso importante' },
    { value: 'service', label: '⚖️ Serviços Jurídicos', description: 'Destaque para áreas de atuação' }
  ];

  const layoutOptions = [
    { value: 'list', label: '☰ Lista Elegante', description: 'Lista vertical tradicional' },
    { value: 'grid', label: '⊞ Grid Premium', description: 'Layout em grade organizada' },
    { value: 'bento', label: '⊡ Bento Grid', description: 'Grid estilo Bento moderno' },
    { value: 'carousel', label: '⟵⟶ Carrossel', description: 'Navegação por slides' }
  ];

  const themeOptions = [
    { value: 'modern', label: '✨ Moderno', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { value: 'minimal', label: '⚪ Minimalista', color: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
    { value: 'dark', label: '🖤 Dark Elite', color: 'linear-gradient(135deg, #434343 0%, #000000 100%)' },
    { value: 'corporate', label: '💼 Corporativo', color: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' },
    { value: 'premium', label: '👑 Premium', color: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)' },
    { value: 'gold', label: '🥇 Gold', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
    { value: 'platinum', label: '💎 Platinum', color: 'linear-gradient(135deg, #c0c0c0 0%, #e6e6e6 100%)' },
    { value: 'custom', label: '🎨 Personalizado', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
  ];

  const backgroundTypeOptions = [
    { value: 'solid', label: '⬜ Cor Sólida' },
    { value: 'gradient', label: '🌈 Gradiente' },
    { value: 'neural', label: '🧠 Neural' },
    { value: 'image', label: '🖼️ Imagem' },
    { value: 'video', label: '🎥 Vídeo' }
  ];

  const buttonStyleOptions = [
    { value: 'rounded', label: '⬜ Arredondado' },
    { value: 'square', label: '⬛ Quadrado' },
    { value: 'pill', label: '💊 Pílula' },
    { value: 'glassmorphism', label: '💎 Glassmorphism' },
    { value: 'neon', label: '⚡ Neon' },
    { value: 'gradient', label: '🌈 Gradiente' },
    { value: 'custom', label: '🎨 Personalizado' }
  ];

  const animationOptions = [
    { value: 'none', label: '🚫 Sem Animação' },
    { value: 'fade', label: '🌅 Fade' },
    { value: 'slide', label: '➡️ Slide' },
    { value: 'bounce', label: '🏀 Bounce' },
    { value: 'pulse', label: '💓 Pulse' },
    { value: 'glow', label: '✨ Glow' }
  ];

  const hoverEffectOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'scale', label: 'Escala' },
    { value: 'glow', label: 'Brilho' },
    { value: 'lift', label: 'Elevação' },
    { value: 'bounce', label: 'Salto' },
    { value: 'rotate', label: 'Rotação' }
  ];

  const avatarSizeOptions = [
    { value: 'w-16 h-16', label: 'Pequeno (64px)' },
    { value: 'w-20 h-20', label: 'Médio (80px)' },
    { value: 'w-24 h-24', label: 'Grande (96px)' },
    { value: 'w-32 h-32', label: 'Extra Grande (128px)' }
  ];

  const avatarFormatOptions = [
    { value: 'rounded-full', label: 'Circular' },
    { value: 'rounded-lg', label: 'Arredondado' },
    { value: 'rounded-none', label: 'Quadrado' }
  ];

  const socialPlatforms = [
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'facebook', label: 'Facebook', icon: Facebook },
    { value: 'twitter', label: 'Twitter', icon: Twitter },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'website', label: 'Website', icon: Globe }
  ];

  useEffect(() => {
    if (linkTree) {
      setLinkTreeData({
        title: linkTree.title || 'Meu Link Tree',
        description: linkTree.description || '',
        background_color: linkTree.background_color || '#000000',
        text_color: linkTree.text_color || '#ffffff',
        button_style: linkTree.button_style || 'list',
        avatar_url: linkTree.avatar_url || '',
        avatar_size: 'w-20 h-20',
        avatar_format: 'rounded-full',
        theme: linkTree.theme || 'modern',
        background_type: linkTree.background_type || 'neural',
        background_gradient: linkTree.background_gradient || '',
        background_image: linkTree.background_image || '',
        background_video: linkTree.background_video || '',
        background_opacity: linkTree.background_opacity || 0.5,
        custom_css: linkTree.custom_css || '',
        animation_style: linkTree.animation_style || 'glow',
        show_analytics: linkTree.show_analytics || false,
        is_active: linkTree.is_active || true,
        title_size: 'text-3xl',
        title_font: 'font-bold',
        title_color: linkTree.text_color || '#ffffff',
        description_size: 'text-base',
        description_color: linkTree.text_color || '#ffffff',
        footer_enabled: linkTree.footer_enabled ?? true,
        footer_text: linkTree.footer_text || '',
        footer_social_links: linkTree.footer_social_links || [],
        footer_background_color: linkTree.footer_background_color || '#1a1a1a',
        footer_text_color: linkTree.footer_text_color || '#ffffff',
        footer_style: linkTree.footer_style || 'minimal'
      });
    }
  }, [linkTree]);

  const handleSave = async () => {
    try {
      await saveLinkTree({
        title: linkTreeData.title || 'Meu Link Tree',
        description: linkTreeData.description || '',
        background_color: linkTreeData.background_color || '#000000',
        text_color: linkTreeData.text_color || '#ffffff',
        button_style: linkTreeData.button_style || 'list',
        avatar_url: linkTreeData.avatar_url || '',
        theme: linkTreeData.theme || 'modern',
        background_type: linkTreeData.background_type || 'neural',
        background_gradient: linkTreeData.background_gradient || '',
        background_image: linkTreeData.background_image || '',
        background_video: linkTreeData.background_video || '',
        background_opacity: linkTreeData.background_opacity || 0.5,
        custom_css: linkTreeData.custom_css || '',
        animation_style: linkTreeData.animation_style || 'glow',
        show_analytics: linkTreeData.show_analytics || false,
        is_active: linkTreeData.is_active !== false,
        footer_enabled: linkTreeData.footer_enabled,
        footer_text: linkTreeData.footer_text,
        footer_social_links: linkTreeData.footer_social_links,
        footer_background_color: linkTreeData.footer_background_color,
        footer_text_color: linkTreeData.footer_text_color,
        footer_style: linkTreeData.footer_style
      });
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const moveItem = async (itemId: string, direction: 'up' | 'down') => {
    const currentIndex = linkTreeItems.findIndex(item => item.id === itemId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= linkTreeItems.length) return;

    const newItems = [...linkTreeItems];
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];

    // Atualizar display_order no banco usando o hook
    try {
      const updates = newItems.map((item, index) => ({
        id: item.id,
        display_order: index
      }));

      for (const update of updates) {
        await updateLinkTreeItem(update.id, { display_order: update.display_order });
      }

      toast({
        title: "Sucesso",
        description: "Ordem dos itens atualizada!"
      });
    } catch (error) {
      console.error('Erro ao reordenar itens:', error);
      toast({
        title: "Erro",
        description: "Falha ao reordenar itens",
        variant: "destructive"
      });
    }
  };

  const handleAddItem = async () => {
    if (!linkTree || !newItem.title) return;

    try {
      // Mapear 'text' para 'info' para compatibilidade com constraint
      const itemType = newItem.item_type === 'text' ? 'info' : newItem.item_type;
      
      await saveLinkTreeItem({
        link_tree_id: linkTree.id,
        title: newItem.title,
        url: newItem.url,
        icon: newItem.icon,
        icon_size: newItem.icon_size,
        icon_color: newItem.icon_color,
        background_color: newItem.background_color,
        text_color: newItem.text_color,
        button_style: newItem.button_style,
        hover_effect: newItem.hover_effect,
        display_order: linkTreeItems.length,
        is_featured: newItem.is_featured,
        item_type: itemType,
        card_content: newItem.card_content,
        card_image: newItem.card_image,
        card_price: newItem.card_price,
        card_button_text: newItem.card_button_text,
        card_size: newItem.card_size,
        card_format: newItem.card_format,
        form_id: newItem.item_type === 'form' ? newItem.form_id : null,
        form_fields: newItem.item_type === 'form' && formConfig ? formConfig : null,
        click_count: 0,
        is_active: true
      });

      // Reset form
      setNewItem({
        title: '',
        url: '',
        icon: 'link',
        icon_size: 'w-5 h-5',
        icon_color: '#000000',
        background_color: '#ffffff',
        text_color: '#000000',
        button_style: 'inherit',
        hover_effect: 'scale',
        is_featured: false,
        item_type: 'link',
        card_content: '',
        card_image: '',
        card_price: '',
        card_button_text: 'Saiba Mais',
        form_id: '',
        card_size: 'medium',
        card_format: 'rounded'
      });

    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const handleEditItem = (item: LinkTreeItem) => {
    setEditingItem(item);
    setNewItem({
      title: item.title,
      url: item.url || '',
      icon: item.icon || 'link',
      icon_size: item.icon_size || 'w-5 h-5',
      icon_color: item.icon_color || '#000000',
      background_color: item.background_color || '#ffffff',
      text_color: item.text_color || '#000000',
      button_style: (item.button_style as any) || 'inherit',
      hover_effect: (item.hover_effect as any) || 'scale',
      is_featured: item.is_featured || false,
      item_type: (item.item_type as any) || 'link',
      card_content: item.card_content || '',
      card_image: item.card_image || '',
      card_price: item.card_price || '',
      card_button_text: item.card_button_text || 'Saiba Mais',
      form_id: item.form_id || '',
      card_size: item.card_size || 'medium',
      card_format: item.card_format || 'rounded'
    });
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;

    try {
      const itemType = newItem.item_type === 'text' ? 'info' : newItem.item_type;
      
      await updateLinkTreeItem(editingItem.id, {
        title: newItem.title,
        url: newItem.url,
        icon: newItem.icon,
        icon_size: newItem.icon_size,
        icon_color: newItem.icon_color,
        background_color: newItem.background_color,
        text_color: newItem.text_color,
        button_style: newItem.button_style,
        hover_effect: newItem.hover_effect,
        is_featured: newItem.is_featured,
        item_type: itemType,
        card_content: newItem.card_content,
        card_image: newItem.card_image,
        card_price: newItem.card_price,
        card_button_text: newItem.card_button_text,
        card_size: newItem.card_size,
        card_format: newItem.card_format,
        form_id: newItem.item_type === 'form' ? newItem.form_id : null,
        form_fields: newItem.item_type === 'form' && formConfig ? formConfig : null
      });

      setEditingItem(null);
      setNewItem({
        title: '',
        url: '',
        icon: 'link',
        icon_size: 'w-5 h-5',
        icon_color: '#000000',
        background_color: '#ffffff',
        text_color: '#000000',
        button_style: 'inherit',
        hover_effect: 'scale',
        is_featured: false,
        item_type: 'link',
        card_content: '',
        card_image: '',
        card_price: '',
        card_button_text: 'Saiba Mais',
        form_id: '',
        card_size: 'medium',
        card_format: 'rounded'
      });
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteLinkTreeItem(id);
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  const addSocialLink = () => {
    setLinkTreeData(prev => ({
      ...prev,
      footer_social_links: [
        ...prev.footer_social_links,
        { platform: 'instagram', url: '', icon: 'instagram' }
      ]
    }));
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    setLinkTreeData(prev => ({
      ...prev,
      footer_social_links: prev.footer_social_links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const removeSocialLink = (index: number) => {
    setLinkTreeData(prev => ({
      ...prev,
      footer_social_links: prev.footer_social_links.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando Link Tree...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Link Tree</h2>
          <p className="text-muted-foreground">Configure seu Link Tree personalizado</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Settings2 className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="footer">Rodapé</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Informações Básicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={linkTreeData.title}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Meu Link Tree"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={linkTreeData.description}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descrição do seu Link Tree"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="avatar">URL do Avatar</Label>
                    <Input
                      id="avatar"
                      value={linkTreeData.avatar_url}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, avatar_url: e.target.value }))}
                      placeholder="https://exemplo.com/avatar.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tamanho do Avatar</Label>
                      <Select value={linkTreeData.avatar_size} onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, avatar_size: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {avatarSizeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Formato do Avatar</Label>
                      <Select value={linkTreeData.avatar_format} onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, avatar_format: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {avatarFormatOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Design e Tema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Tema</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {themeOptions.map(theme => (
                        <button
                          key={theme.value}
                          onClick={() => setLinkTreeData(prev => ({ ...prev, theme: theme.value as any }))}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            linkTreeData.theme === theme.value 
                              ? 'border-primary ring-2 ring-primary/20' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{ background: theme.color }}
                        >
                          <div className="font-medium text-white text-sm">{theme.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Layout dos Botões</Label>
                    <Select value={linkTreeData.button_style} onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, button_style: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {layoutOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tipo de Fundo</Label>
                    <Select value={linkTreeData.background_type} onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, background_type: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {backgroundTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {linkTreeData.background_type === 'solid' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Cor de Fundo</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={linkTreeData.background_color}
                            onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_color: e.target.value }))}
                            className="w-12 h-10 p-0 border-0"
                          />
                          <Input
                            value={linkTreeData.background_color}
                            onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_color: e.target.value }))}
                            placeholder="#000000"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Cor do Texto</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={linkTreeData.text_color}
                            onChange={(e) => setLinkTreeData(prev => ({ ...prev, text_color: e.target.value }))}
                            className="w-12 h-10 p-0 border-0"
                          />
                          <Input
                            value={linkTreeData.text_color}
                            onChange={(e) => setLinkTreeData(prev => ({ ...prev, text_color: e.target.value }))}
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {linkTreeData.background_type === 'image' && (
                    <div>
                      <Label>URL da Imagem de Fundo</Label>
                      <Input
                        value={linkTreeData.background_image}
                        onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_image: e.target.value }))}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  )}

                  <div>
                    <Label>Animação</Label>
                    <Select value={linkTreeData.animation_style} onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, animation_style: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {animationOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    {editingItem ? 'Editar Item' : 'Adicionar Item'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={newItem.title}
                        onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Título do item"
                      />
                    </div>

                    <div>
                      <Label>Tipo</Label>
                      <Select value={newItem.item_type} onValueChange={(value) => setNewItem(prev => ({ ...prev, item_type: value as any }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {itemTypeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>URL</Label>
                    <Input
                      value={newItem.url}
                      onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://exemplo.com"
                    />
                  </div>

                  <div>
                    <Label>Ícone</Label>
                    <Select value={newItem.icon} onValueChange={(value) => setNewItem(prev => ({ ...prev, icon: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="link">🔗 Link</SelectItem>
                        <SelectItem value="phone">📞 Telefone</SelectItem>
                        <SelectItem value="mail">📧 Email</SelectItem>
                        <SelectItem value="instagram">📷 Instagram</SelectItem>
                        <SelectItem value="globe">🌐 Website</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Cor de Fundo</Label>
                      <Input
                        type="color"
                        value={newItem.background_color}
                        onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label>Cor do Texto</Label>
                      <Input
                        type="color"
                        value={newItem.text_color}
                        onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newItem.is_featured}
                      onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, is_featured: checked }))}
                    />
                    <Label>Item em destaque</Label>
                  </div>

                  <div className="flex gap-2">
                    {editingItem ? (
                      <>
                        <Button onClick={handleUpdateItem} className="flex-1">
                          Atualizar Item
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setEditingItem(null);
                            setNewItem({
                              title: '',
                              url: '',
                              icon: 'link',
                              icon_size: 'w-5 h-5',
                              icon_color: '#000000',
                              background_color: '#ffffff',
                              text_color: '#000000',
                              button_style: 'inherit',
                              hover_effect: 'scale',
                              is_featured: false,
                              item_type: 'link',
                              card_content: '',
                              card_image: '',
                              card_price: '',
                              card_button_text: 'Saiba Mais',
                              form_id: '',
                              card_size: 'medium',
                              card_format: 'rounded'
                            });
                          }}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddItem} className="w-full">
                        Adicionar Item
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Lista de itens */}
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Link Tree</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {linkTreeItems.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{index + 1}</Badge>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">{item.item_type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditItem(item)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="footer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Configurações do Rodapé
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configure o rodapé personalizado do seu Link Tree
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Habilitar Rodapé</Label>
                      <p className="text-xs text-muted-foreground">Mostrar rodapé no Link Tree</p>
                    </div>
                    <Switch
                      checked={linkTreeData.footer_enabled ?? true}
                      onCheckedChange={(checked) => setLinkTreeData(prev => ({ ...prev, footer_enabled: checked }))}
                    />
                  </div>

                  {linkTreeData.footer_enabled && (
                    <div className="space-y-6">
                      <div>
                        <Label>Texto do Rodapé</Label>
                        <Textarea
                          value={linkTreeData.footer_text || ''}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_text: e.target.value }))}
                          placeholder="© 2024 Meu Nome - Todos os direitos reservados"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">Estilo do Rodapé</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'minimal', label: 'Minimalista', description: 'Texto simples centralizado' },
                            { value: 'modern', label: 'Moderno', description: 'Com divisores e espaçamento' },
                            { value: 'complete', label: 'Completo', description: 'Texto + redes sociais' }
                          ].map(style => (
                            <button
                              key={style.value}
                              onClick={() => setLinkTreeData(prev => ({ ...prev, footer_style: style.value as 'minimal' | 'modern' | 'complete' }))}
                              className={`p-3 rounded-lg border text-left transition-all ${
                                linkTreeData.footer_style === style.value 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className="font-medium text-sm">{style.label}</div>
                              <div className="text-xs text-muted-foreground mt-1">{style.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-xs text-muted-foreground">Cor de Fundo</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={linkTreeData.footer_background_color || '#1a1a1a'}
                              onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_background_color: e.target.value }))}
                              className="w-12 h-8 p-0 border-0 rounded-md"
                            />
                            <Input
                              value={linkTreeData.footer_background_color || '#1a1a1a'}
                              onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_background_color: e.target.value }))}
                              className="h-8"
                              placeholder="#1a1a1a"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground">Cor do Texto</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={linkTreeData.footer_text_color || '#ffffff'}
                              onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_text_color: e.target.value }))}
                              className="w-12 h-8 p-0 border-0 rounded-md"
                            />
                            <Input
                              value={linkTreeData.footer_text_color || '#ffffff'}
                              onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_text_color: e.target.value }))}
                              className="h-8"
                              placeholder="#ffffff"
                            />
                          </div>
                        </div>
                      </div>

                      {linkTreeData.footer_style === 'complete' && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <Label className="text-sm font-medium">Links das Redes Sociais</Label>
                            <Button onClick={addSocialLink} size="sm" variant="outline">
                              <Plus className="w-4 h-4 mr-2" />
                              Adicionar
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            {linkTreeData.footer_social_links.map((link, index) => (
                              <div key={index} className="flex gap-2 items-center">
                                <Select 
                                  value={link.platform} 
                                  onValueChange={(value) => updateSocialLink(index, 'platform', value)}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {socialPlatforms.map(platform => (
                                      <SelectItem key={platform.value} value={platform.value}>
                                        {platform.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                
                                <Input
                                  value={link.url}
                                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                  placeholder="https://..."
                                  className="flex-1"
                                />
                                
                                <Button
                                  onClick={() => removeSocialLink(index)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] overflow-hidden rounded-lg border bg-black">
                <LinkTreePreview 
                  linkTree={linkTree || linkTreeData as any} 
                  linkTreeItems={linkTreeItems}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}