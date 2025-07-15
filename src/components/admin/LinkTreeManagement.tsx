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
import { Trash2, Plus, Eye, Settings2, Palette, Zap, Image as ImageIcon, Video } from 'lucide-react';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { useToast } from '@/hooks/use-toast';
import { useFormConfig } from '@/hooks/useFormConfig';
import { IconSelector } from './IconSelector';
import { useLinkTree } from '@/hooks/useLinkTree';

export function LinkTreeManagement() {
  const { 
    linkTree, 
    linkTreeItems, 
    isLoading: loading, 
    saveLinkTree, 
    saveLinkTreeItem, 
    updateLinkTreeItem, 
    deleteLinkTreeItem,
    loadLinkTree 
  } = useLinkTree();
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

  // Estados do Link Tree - inicializado com dados do hook
  const [linkTreeData, setLinkTreeData] = useState({
    title: linkTree?.title || 'Meu Link Tree',
    description: linkTree?.description || '',
    background_color: linkTree?.background_color || '#000000',
    text_color: linkTree?.text_color || '#ffffff',
    button_style: (linkTree?.button_style as LinkTree['button_style']) || 'list',
    avatar_url: linkTree?.avatar_url || '',
    avatar_size: linkTree?.avatar_size || 'w-20 h-20',
    avatar_format: linkTree?.avatar_format || 'rounded-full',
    theme: (linkTree?.theme as LinkTree['theme']) || 'modern',
    background_type: (linkTree?.background_type as LinkTree['background_type']) || 'neural',
    background_gradient: linkTree?.background_gradient || '',
    background_image: linkTree?.background_image || '',
    background_video: linkTree?.background_video || '',
    background_opacity: linkTree?.background_opacity || 0.5,
    custom_css: linkTree?.custom_css || '',
    animation_style: (linkTree?.animation_style as LinkTree['animation_style']) || 'glow',
    show_analytics: linkTree?.show_analytics || false,
    is_active: linkTree?.is_active !== false,
    title_size: linkTree?.title_size || 'text-3xl',
    title_font: linkTree?.title_font || 'font-bold',
    title_color: linkTree?.title_color || '#ffffff',
    description_size: linkTree?.description_size || 'text-base',
    description_color: linkTree?.description_color || '#ffffff',
    footer_enabled: linkTree?.footer_enabled !== false,
    footer_text: linkTree?.footer_text || '',
    footer_social_links: linkTree?.footer_social_links || [] as Array<{platform: string; url: string; icon?: string}>,
    footer_background_color: linkTree?.footer_background_color || '#1a1a1a',
    footer_text_color: linkTree?.footer_text_color || '#ffffff',
    footer_style: (linkTree?.footer_style as 'minimal' | 'modern' | 'complete') || 'minimal'
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

  // Sincronizar linkTreeData com os dados do hook quando mudar
  useEffect(() => {
    if (linkTree) {
      setLinkTreeData({
        title: linkTree.title || 'Meu Link Tree',
        description: linkTree.description || '',
        background_color: linkTree.background_color || '#000000',
        text_color: linkTree.text_color || '#ffffff',
        button_style: (linkTree.button_style as LinkTree['button_style']) || 'list',
        avatar_url: linkTree.avatar_url || '',
        avatar_size: linkTree.avatar_size || 'w-20 h-20',
        avatar_format: linkTree.avatar_format || 'rounded-full',
        theme: (linkTree.theme as LinkTree['theme']) || 'modern',
        background_type: (linkTree.background_type as LinkTree['background_type']) || 'neural',
        background_gradient: linkTree.background_gradient || '',
        background_image: linkTree.background_image || '',
        background_video: linkTree.background_video || '',
        background_opacity: linkTree.background_opacity || 0.5,
        custom_css: linkTree.custom_css || '',
        animation_style: (linkTree.animation_style as LinkTree['animation_style']) || 'glow',
        show_analytics: linkTree.show_analytics || false,
        is_active: linkTree.is_active !== false,
        title_size: linkTree.title_size || 'text-3xl',
        title_font: linkTree.title_font || 'font-bold',
        title_color: linkTree.title_color || '#ffffff',
        description_size: linkTree.description_size || 'text-base',
        description_color: linkTree.description_color || '#ffffff',
        footer_enabled: linkTree.footer_enabled !== false,
        footer_text: linkTree.footer_text || '',
        footer_social_links: linkTree.footer_social_links || [],
        footer_background_color: linkTree.footer_background_color || '#1a1a1a',
        footer_text_color: linkTree.footer_text_color || '#ffffff',
        footer_style: (linkTree.footer_style as 'minimal' | 'modern' | 'complete') || 'minimal'
      });
    }
  }, [linkTree]);

  const handleSaveLinkTree = async () => {
    try {
      await saveLinkTree({
        title: linkTreeData.title,
        description: linkTreeData.description,
        background_color: linkTreeData.background_color,
        text_color: linkTreeData.text_color,
        button_style: linkTreeData.button_style,
        avatar_url: linkTreeData.avatar_url,
        avatar_size: linkTreeData.avatar_size,
        avatar_format: linkTreeData.avatar_format,
        theme: linkTreeData.theme,
        background_type: linkTreeData.background_type,
        background_gradient: linkTreeData.background_gradient,
        background_image: linkTreeData.background_image,
        background_video: linkTreeData.background_video,
        background_opacity: linkTreeData.background_opacity,
        custom_css: linkTreeData.custom_css,
        animation_style: linkTreeData.animation_style,
        show_analytics: linkTreeData.show_analytics,
        is_active: linkTreeData.is_active,
        title_size: linkTreeData.title_size,
        title_font: linkTreeData.title_font,
        title_color: linkTreeData.title_color,
        description_size: linkTreeData.description_size,
        description_color: linkTreeData.description_color,
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

    try {
      await updateLinkTreeItem(itemId, { 
        display_order: direction === 'up' ? currentIndex - 1 : currentIndex + 1 
      });
      await loadLinkTree();
    } catch (error) {
      console.error('Erro ao reordenar itens:', error);
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
        click_count: 0,
        is_featured: newItem.is_featured,
        is_active: true,
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
    if (!editingItem || !newItem.title) return;

    try {
      const updateData = {
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
        item_type: newItem.item_type,
        card_content: newItem.card_content,
        card_image: newItem.card_image,
        card_price: newItem.card_price,
        card_button_text: newItem.card_button_text,
        card_size: newItem.card_size,
        card_format: newItem.card_format,
        form_id: newItem.item_type === 'form' ? newItem.form_id : null,
        form_fields: newItem.item_type === 'form' && formConfig ? formConfig : null
      };

      await updateLinkTreeItem(editingItem.id, updateData);

      // Reset form and editing state
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando Link Tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="w-5 h-5" />
                Configurações do Link Tree
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="style">Estilo</TabsTrigger>
                  <TabsTrigger value="footer">Rodapé</TabsTrigger>
                  <TabsTrigger value="items">Itens</TabsTrigger>
                  <TabsTrigger value="advanced">Avançado</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={linkTreeData.title}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Nome do seu Link Tree"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={linkTreeData.description}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descrição do seu Link Tree"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar-url">URL do Avatar</Label>
                    <Input
                      id="avatar-url"
                      value={linkTreeData.avatar_url}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, avatar_url: e.target.value }))}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar-size">Tamanho do Avatar</Label>
                    <Select
                      value={linkTreeData.avatar_size}
                      onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, avatar_size: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="w-16 h-16">Pequeno (64px)</SelectItem>
                        <SelectItem value="w-20 h-20">Médio (80px)</SelectItem>
                        <SelectItem value="w-24 h-24">Grande (96px)</SelectItem>
                        <SelectItem value="w-32 h-32">Muito Grande (128px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar-format">Formato do Avatar</Label>
                    <Select
                      value={linkTreeData.avatar_format}
                      onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, avatar_format: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded-full">Circular</SelectItem>
                        <SelectItem value="rounded-lg">Arredondado</SelectItem>
                        <SelectItem value="rounded-none">Quadrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {themeOptions.map((theme) => (
                        <Button
                          key={theme.value}
                          variant={linkTreeData.theme === theme.value ? "default" : "outline"}
                          className="h-auto p-3 text-left"
                          onClick={() => setLinkTreeData(prev => ({ ...prev, theme: theme.value as any }))}
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ background: theme.color }}
                            />
                            <span className="text-sm">{theme.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Layout</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {layoutOptions.map((layout) => (
                        <Button
                          key={layout.value}
                          variant={linkTreeData.button_style === layout.value ? "default" : "outline"}
                          className="h-auto p-3 text-left"
                          onClick={() => setLinkTreeData(prev => ({ ...prev, button_style: layout.value as any }))}
                        >
                          <div>
                            <div className="font-medium">{layout.label}</div>
                            <div className="text-xs text-muted-foreground">{layout.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Fundo</Label>
                    <Select 
                      value={linkTreeData.background_type} 
                      onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, background_type: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {backgroundTypeOptions.map((bg) => (
                          <SelectItem key={bg.value} value={bg.value}>
                            {bg.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {linkTreeData.background_type === 'solid' && (
                    <div className="space-y-2">
                      <Label htmlFor="background-color">Cor de Fundo</Label>
                      <Input
                        id="background-color"
                        type="color"
                        value={linkTreeData.background_color}
                        onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_color: e.target.value }))}
                      />
                    </div>
                  )}

                  {linkTreeData.background_type === 'gradient' && (
                    <div className="space-y-2">
                      <Label htmlFor="background-gradient">Gradiente CSS</Label>
                      <Input
                        id="background-gradient"
                        value={linkTreeData.background_gradient}
                        onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_gradient: e.target.value }))}
                        placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      />
                    </div>
                  )}

                  {linkTreeData.background_type === 'image' && (
                    <div className="space-y-2">
                      <Label htmlFor="background-image">URL da Imagem de Fundo</Label>
                      <Input
                        id="background-image"
                        value={linkTreeData.background_image}
                        onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_image: e.target.value }))}
                        placeholder="https://example.com/background.jpg"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="text-color">Cor do Texto</Label>
                    <Input
                      id="text-color"
                      type="color"
                      value={linkTreeData.text_color}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, text_color: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Animação</Label>
                    <Select 
                      value={linkTreeData.animation_style} 
                      onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, animation_style: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {animationOptions.map((anim) => (
                          <SelectItem key={anim.value} value={anim.value}>
                            {anim.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="footer" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="footer-enabled"
                      checked={linkTreeData.footer_enabled}
                      onCheckedChange={(checked) => setLinkTreeData(prev => ({ ...prev, footer_enabled: checked }))}
                    />
                    <Label htmlFor="footer-enabled">Habilitar Rodapé</Label>
                  </div>

                  {linkTreeData.footer_enabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="footer-text">Texto do Rodapé</Label>
                        <Textarea
                          id="footer-text"
                          value={linkTreeData.footer_text}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_text: e.target.value }))}
                          placeholder="© 2024 Minha Empresa. Todos os direitos reservados."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Estilo do Rodapé</Label>
                        <Select 
                          value={linkTreeData.footer_style} 
                          onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, footer_style: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimalista</SelectItem>
                            <SelectItem value="modern">Moderno</SelectItem>
                            <SelectItem value="complete">Completo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="footer-bg-color">Cor de Fundo do Rodapé</Label>
                        <Input
                          id="footer-bg-color"
                          type="color"
                          value={linkTreeData.footer_background_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_background_color: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="footer-text-color">Cor do Texto do Rodapé</Label>
                        <Input
                          id="footer-text-color"
                          type="color"
                          value={linkTreeData.footer_text_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, footer_text_color: e.target.value }))}
                        />
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {editingItem ? 'Editar Item' : 'Adicionar Novo Item'}
                        <Badge variant="secondary">{linkTreeItems.length} {linkTreeItems.length === 1 ? 'item' : 'itens'}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-title">Título do Item</Label>
                        <Input
                          id="item-title"
                          value={newItem.title}
                          onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Nome do item"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tipo de Item</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {itemTypeOptions.map((type) => (
                            <Button
                              key={type.value}
                              variant={newItem.item_type === type.value ? "default" : "outline"}
                              className="h-auto p-3 text-left"
                              onClick={() => setNewItem(prev => ({ ...prev, item_type: type.value }))}
                            >
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs text-muted-foreground">{type.description}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {(newItem.item_type === 'link' || newItem.item_type === 'card' || newItem.item_type === 'video') && (
                        <div className="space-y-2">
                          <Label htmlFor="item-url">URL</Label>
                          <Input
                            id="item-url"
                            value={newItem.url}
                            onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                            placeholder="https://example.com"
                          />
                        </div>
                      )}

                      {newItem.item_type === 'form' && (
                        <div className="space-y-2">
                          <Label>Formulário</Label>
                          <Select 
                            value={newItem.form_id} 
                            onValueChange={(value) => setNewItem(prev => ({ ...prev, form_id: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um formulário" />
                            </SelectTrigger>
                            <SelectContent>
                              {multipleFormsConfig.forms.map((form) => (
                                <SelectItem key={form.id} value={form.id}>
                                  {form.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Ícone</Label>
                        <IconSelector
                          value={newItem.icon}
                          onChange={(icon) => setNewItem(prev => ({ ...prev, icon }))}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="item-bg-color">Cor de Fundo</Label>
                          <Input
                            id="item-bg-color"
                            type="color"
                            value={newItem.background_color}
                            onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="item-text-color">Cor do Texto</Label>
                          <Input
                            id="item-text-color"
                            type="color"
                            value={newItem.text_color}
                            onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Efeito de Hover</Label>
                        <Select 
                          value={newItem.hover_effect} 
                          onValueChange={(value) => setNewItem(prev => ({ ...prev, hover_effect: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {hoverEffectOptions.map((effect) => (
                              <SelectItem key={effect.value} value={effect.value}>
                                {effect.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="item-featured"
                          checked={newItem.is_featured}
                          onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, is_featured: checked }))}
                        />
                        <Label htmlFor="item-featured">Item Destacado</Label>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={editingItem ? handleUpdateItem : handleAddItem}
                          disabled={!newItem.title}
                          className="flex-1"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {editingItem ? 'Atualizar Item' : 'Adicionar Item'}
                        </Button>
                        {editingItem && (
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
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {linkTreeItems.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Itens Criados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {linkTreeItems.map((item, index) => (
                            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="font-medium">{item.title}</span>
                                <Badge variant="outline">{item.item_type}</Badge>
                                {item.is_featured && <Badge variant="default">Destaque</Badge>}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => moveItem(item.id, 'up')}
                                  disabled={index === 0}
                                >
                                  ↑
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => moveItem(item.id, 'down')}
                                  disabled={index === linkTreeItems.length - 1}
                                >
                                  ↓
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditItem(item)}
                                >
                                  ✏️
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => deleteLinkTreeItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-css">CSS Personalizado</Label>
                    <Textarea
                      id="custom-css"
                      value={linkTreeData.custom_css}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, custom_css: e.target.value }))}
                      placeholder="/* Seu CSS personalizado aqui */"
                      rows={10}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Adicione CSS personalizado para customizar ainda mais seu Link Tree
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={handleSaveLinkTree} className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleSaveLinkTree} className="flex-1" size="lg">
              Salvar Configurações
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/tree" target="_blank" rel="noopener noreferrer">
                <Eye className="w-4 h-4 mr-2" />
                Ver Página
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <LinkTreePreview 
                  linkTree={{
                    id: linkTree?.id || 'preview',
                    title: linkTreeData.title,
                    description: linkTreeData.description,
                    background_color: linkTreeData.background_color,
                    text_color: linkTreeData.text_color,
                    button_style: linkTreeData.button_style,
                    avatar_url: linkTreeData.avatar_url,
                    avatar_size: linkTreeData.avatar_size,
                    avatar_format: linkTreeData.avatar_format,
                    theme: linkTreeData.theme,
                    background_type: linkTreeData.background_type,
                    background_gradient: linkTreeData.background_gradient,
                    background_image: linkTreeData.background_image,
                    background_video: linkTreeData.background_video,
                    background_opacity: linkTreeData.background_opacity,
                    custom_css: linkTreeData.custom_css,
                    animation_style: linkTreeData.animation_style,
                    show_analytics: linkTreeData.show_analytics,
                    is_active: linkTreeData.is_active,
                    title_size: linkTreeData.title_size,
                    title_font: linkTreeData.title_font,
                    title_color: linkTreeData.title_color,
                    description_size: linkTreeData.description_size,
                    description_color: linkTreeData.description_color,
                    footer_enabled: linkTreeData.footer_enabled,
                    footer_text: linkTreeData.footer_text,
                    footer_social_links: linkTreeData.footer_social_links,
                    footer_background_color: linkTreeData.footer_background_color,
                    footer_text_color: linkTreeData.footer_text_color,
                    footer_style: linkTreeData.footer_style,
                    created_at: linkTree?.created_at || new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  } as LinkTree}
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