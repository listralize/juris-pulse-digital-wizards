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

  useEffect(() => {
    if (linkTree) {
      setLinkTreeData({
        title: linkTree.title || 'Meu Link Tree',
        description: linkTree.description || '',
        background_color: linkTree.background_color || '#000000',
        text_color: linkTree.text_color || '#ffffff',
        button_style: linkTree.button_style || 'list',
        avatar_url: linkTree.avatar_url || '',
        theme: linkTree.theme || 'modern',
        background_type: linkTree.background_type || 'neural',
        background_gradient: linkTree.background_gradient || '',
        background_image: linkTree.background_image || '',
        background_video: linkTree.background_video || '',
        background_opacity: linkTree.background_opacity || 0.5,
        custom_css: linkTree.custom_css || '',
        animation_style: linkTree.animation_style || 'glow',
        show_analytics: linkTree.show_analytics || false,
        is_active: linkTree.is_active !== false,
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

  const handleSaveLinkTree = async () => {
    try {
      const dataToSave = {
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
        footer_enabled: linkTreeData.footer_enabled ?? true,
        footer_text: linkTreeData.footer_text || '',
        footer_social_links: linkTreeData.footer_social_links || [],
        footer_background_color: linkTreeData.footer_background_color || '#1a1a1a',
        footer_text_color: linkTreeData.footer_text_color || '#ffffff',
        footer_style: linkTreeData.footer_style || 'minimal'
      };

      await saveLinkTree(dataToSave);
      await loadLinkTree(); // Recarregar dados após salvar
      
      toast({
        title: "Configurações salvas!",
        description: "Todas as configurações do Link Tree foram salvas com sucesso.",
        variant: "default"
      });
    } catch (error) {
      console.error('Erro ao salvar Link Tree:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const moveItem = async (itemId: string, direction: 'up' | 'down') => {
    const currentIndex = linkTreeItems.findIndex(item => item.id === itemId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= linkTreeItems.length) return;

    try {
      // Atualizar display_order dos itens afetados
      const item1 = linkTreeItems[currentIndex];
      const item2 = linkTreeItems[newIndex];

      await updateLinkTreeItem(item1.id, { display_order: item2.display_order });
      await updateLinkTreeItem(item2.id, { display_order: item1.display_order });

      toast({
        title: "Sucesso",
        description: "Ordem dos itens atualizada!"
      });
    } catch (error) {
      console.error('Erro ao reordenar itens:', error);
    }
  };

  const handleAddItem = async () => {
    if (!linkTree || !newItem.title) return;

    try {
      // Mapear 'text' para 'info' para compatibilidade com constraint
      const itemType = newItem.item_type === 'text' ? 'info' : newItem.item_type;
      
      const itemData = {
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
        form_fields: newItem.item_type === 'form' && formConfig 
          ? JSON.stringify(formConfig) 
          : null,
        is_active: true,
        click_count: 0
      };

      await saveLinkTreeItem(itemData);

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
      // Mapear 'text' para 'info' para compatibilidade
      const itemType = newItem.item_type === 'text' ? 'info' : newItem.item_type;
      
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
        item_type: itemType,
        card_content: newItem.card_content,
        card_image: newItem.card_image,
        card_price: newItem.card_price,
        card_button_text: newItem.card_button_text,
        card_size: newItem.card_size,
        card_format: newItem.card_format,
        form_id: newItem.item_type === 'form' ? newItem.form_id : null,
        form_fields: newItem.item_type === 'form' && formConfig 
          ? JSON.stringify(formConfig) 
          : null
      };

      await updateLinkTreeItem(editingItem.id, updateData);
      
      toast({
        title: "Item atualizado!",
        description: "O item foi atualizado com sucesso.",
        variant: "default"
      });

      cancelEdit();
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const cancelEdit = () => {
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
  };

  const deleteItem = async (itemId: string) => {
    try {
      await deleteLinkTreeItem(itemId);
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🔗 Link Tree 2050
        </h1>
        <p className="text-muted-foreground">
          Interface futurística para criação de páginas de links personalizadas
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Items
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Configurações Avançadas 2050
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Personalize completamente a aparência do seu Link Tree
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Tema Principal</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {themeOptions.map(theme => (
                        <button
                          key={theme.value}
                          onClick={() => setLinkTreeData(prev => ({ ...prev, theme: theme.value as LinkTree['theme'] }))}
                          className={`p-4 rounded-lg border transition-all relative overflow-hidden ${
                            linkTreeData.theme === theme.value 
                              ? 'border-primary ring-2 ring-primary/20' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{ background: theme.color }}
                        >
                          <div className="relative z-10 text-white font-semibold text-sm">
                            {theme.label}
                          </div>
                          <div className="absolute inset-0 bg-black/20"></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Tipo de Fundo</Label>
                    <Select value={linkTreeData.background_type} onValueChange={(value) => setLinkTreeData(prev => ({ ...prev, background_type: value as LinkTree['background_type'] }))}>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Cor de Fundo</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="color"
                          value={linkTreeData.background_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_color: e.target.value }))}
                          className="w-16 h-10 p-1 border-2"
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
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="color"
                          value={linkTreeData.text_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, text_color: e.target.value }))}
                          className="w-16 h-10 p-1 border-2"
                        />
                        <Input
                          value={linkTreeData.text_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, text_color: e.target.value }))}
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>

                  {linkTreeData.background_type === 'gradient' && (
                    <div>
                      <Label>Gradiente CSS</Label>
                      <Input
                        value={linkTreeData.background_gradient}
                        onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_gradient: e.target.value }))}
                        placeholder="linear-gradient(45deg, #ff0000, #00ff00)"
                      />
                    </div>
                  )}

                  {linkTreeData.background_type === 'image' && (
                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Imagem de Fundo
                        </Label>
                        <Input
                          value={linkTreeData.background_image}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_image: e.target.value }))}
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                      <div>
                        <Label>Opacidade da Sobreposição</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={linkTreeData.background_opacity}
                            onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_opacity: parseFloat(e.target.value) }))}
                            className="flex-1"
                          />
                          <span className="text-sm font-mono w-12">{Math.round((linkTreeData.background_opacity || 0) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {linkTreeData.background_type === 'video' && (
                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Vídeo de Fundo
                        </Label>
                        <Input
                          value={linkTreeData.background_video}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_video: e.target.value }))}
                          placeholder="https://exemplo.com/video.mp4"
                        />
                      </div>
                      <div>
                        <Label>Opacidade da Sobreposição</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={linkTreeData.background_opacity}
                            onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_opacity: parseFloat(e.target.value) }))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Layout</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {layoutOptions.map(layout => (
                        <button
                          key={layout.value}
                          onClick={() => setLinkTreeData(prev => ({ ...prev, button_style: layout.value as LinkTree['button_style'] }))}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            linkTreeData.button_style === layout.value 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="font-semibold text-sm">{layout.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{layout.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Estilo de Animação</Label>
                    <Select value={linkTreeData.animation_style} onValueChange={(value: LinkTree['animation_style']) => setLinkTreeData(prev => ({ ...prev, animation_style: value }))}>
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

                  <div>
                    <Label>CSS Personalizado</Label>
                    <Textarea
                      value={linkTreeData.custom_css}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, custom_css: e.target.value }))}
                      placeholder=".custom-button { border-radius: 20px; }"
                      rows={4}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button onClick={handleSaveLinkTree} className="w-full">
                      Salvar Configurações de Design
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={linkTreeData.title}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Título do seu Link Tree"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={linkTreeData.description}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descrição opcional"
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
                </CardContent>
              </Card>

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

                      <div>
                        <Label className="text-sm font-medium mb-3 block">Redes Sociais</Label>
                        <div className="space-y-3">
                          {(linkTreeData.footer_social_links || []).map((social, index) => (
                            <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg border">
                              <Select 
                                value={social.platform} 
                                onValueChange={(value) => {
                                  const newSocials = [...(linkTreeData.footer_social_links || [])];
                                  newSocials[index] = { ...social, platform: value };
                                  setLinkTreeData(prev => ({ ...prev, footer_social_links: newSocials }));
                                }}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="instagram">📷 Instagram</SelectItem>
                                  <SelectItem value="facebook">📘 Facebook</SelectItem>
                                  <SelectItem value="twitter">🐦 Twitter</SelectItem>
                                  <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                                  <SelectItem value="youtube">📺 YouTube</SelectItem>
                                  <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                                  <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                value={social.url}
                                onChange={(e) => {
                                  const newSocials = [...(linkTreeData.footer_social_links || [])];
                                  newSocials[index] = { ...social, url: e.target.value };
                                  setLinkTreeData(prev => ({ ...prev, footer_social_links: newSocials }));
                                }}
                                placeholder="https://..."
                                className="flex-1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newSocials = [...(linkTreeData.footer_social_links || [])];
                                  newSocials.splice(index, 1);
                                  setLinkTreeData(prev => ({ ...prev, footer_social_links: newSocials }));
                                }}
                                className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            onClick={() => {
                              const newSocials = [...(linkTreeData.footer_social_links || []), { platform: 'instagram', url: '' }];
                              setLinkTreeData(prev => ({ ...prev, footer_social_links: newSocials }));
                            }}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Rede Social
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button onClick={handleSaveLinkTree} className="w-full">
                      Salvar Configurações do Rodapé
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    {editingItem ? 'Editar Item' : 'Adicionar Novo Item'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Informações Básicas</Label>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Título</Label>
                            <Input
                              value={newItem.title}
                              onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Título do item"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">URL</Label>
                            <Input
                              value={newItem.url}
                              onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                              placeholder="https://exemplo.com"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Tipo de Item</Label>
                            <Select value={newItem.item_type} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, item_type: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {itemTypeOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    <div>
                                      <div className="font-medium">{option.label}</div>
                                      <div className="text-xs text-muted-foreground">{option.description}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Configurações de Aparência</Label>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Cor de Fundo</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={newItem.background_color}
                                onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                                className="w-12 h-8 p-0 border-0 rounded-md"
                              />
                              <Input
                                value={newItem.background_color}
                                onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                                placeholder="#ffffff"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Cor do Texto</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={newItem.text_color}
                                onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                                className="w-12 h-8 p-0 border-0 rounded-md"
                              />
                              <Input
                                value={newItem.text_color}
                                onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Efeito Hover</Label>
                            <Select value={newItem.hover_effect} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, hover_effect: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {hoverEffectOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {editingItem ? (
                      <>
                        <Button onClick={handleUpdateItem} className="flex-1">
                          Atualizar Item
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" className="flex-1">
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddItem} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Item
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {linkTreeItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Items Cadastrados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {linkTreeItems.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-1">
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
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.item_type} • {item.click_count} cliques
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.is_featured && (
                              <Badge variant="secondary">
                                Destaque
                              </Badge>
                            )}
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
                              onClick={() => deleteItem(item.id)}
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

          </Tabs>

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
              <div className="border rounded-lg overflow-hidden max-h-[600px]">
                <LinkTreePreview 
                  linkTree={{
                    id: linkTree?.id || '',
                    title: linkTreeData.title,
                    description: linkTreeData.description,
                    background_color: linkTreeData.background_color,
                    text_color: linkTreeData.text_color,
                    button_style: linkTreeData.button_style,
                    avatar_url: linkTreeData.avatar_url,
                    theme: linkTreeData.theme,
                    background_type: linkTreeData.background_type,
                    background_gradient: linkTreeData.background_gradient,
                    background_image: linkTreeData.background_image,
                    background_video: linkTreeData.background_video,
                    background_opacity: linkTreeData.background_opacity || 0.5,
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