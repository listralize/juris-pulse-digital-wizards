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
import { supabase } from '@/integrations/supabase/client';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { useToast } from '@/hooks/use-toast';
import { useFormConfig } from '@/hooks/useFormConfig';
import { IconSelector } from './IconSelector';
import { GalleryButton } from './GalleryButton';
export function LinkTreeManagement() {
  const [linkTree, setLinkTree] = useState<LinkTree | null>(null);
  const [items, setItems] = useState<LinkTreeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  const {
    formConfig,
    multipleFormsConfig
  } = useFormConfig();

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
    avatar_size: '128',
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
    footer_social_links: [] as Array<{
      platform: string;
      url: string;
      icon?: string;
    }>,
    footer_background_color: '#1a1a1a',
    footer_text_color: '#ffffff',
    footer_style: 'minimal' as 'minimal' | 'modern' | 'complete'
  });

  // Estado para edição de item
  const [editingItem, setEditingItem] = useState<LinkTreeItem | null>(null);
  const itemTypeOptions = [{
    value: 'link',
    label: '🔗 Link',
    description: 'Link básico para qualquer URL'
  }, {
    value: 'card',
    label: '📄 Card Premium',
    description: 'Card com imagem, texto e botão de ação'
  }, {
    value: 'form',
    label: '📝 Formulário',
    description: 'Formulário de contato integrado'
  }, {
    value: 'video',
    label: '🎥 Vídeo/Mídia',
    description: 'Vídeo institucional ou apresentação'
  }, {
    value: 'text',
    label: '📝 Informativo',
    description: 'Bloco de texto ou aviso importante'
  }, {
    value: 'service',
    label: '⚖️ Serviços Jurídicos',
    description: 'Destaque para áreas de atuação'
  }];
  const layoutOptions = [{
    value: 'list',
    label: '☰ Lista Elegante',
    description: 'Lista vertical tradicional'
  }, {
    value: 'grid',
    label: '⊞ Grid Premium',
    description: 'Layout em grade organizada'
  }, {
    value: 'bento',
    label: '⊡ Bento Grid',
    description: 'Grid estilo Bento moderno'
  }, {
    value: 'carousel',
    label: '⟵⟶ Carrossel',
    description: 'Navegação por slides'
  }];
  const themeOptions = [{
    value: 'modern',
    label: '✨ Moderno',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }, {
    value: 'minimal',
    label: '⚪ Minimalista',
    color: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  }, {
    value: 'dark',
    label: '🖤 Dark Elite',
    color: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
  }, {
    value: 'corporate',
    label: '💼 Corporativo',
    color: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)'
  }, {
    value: 'premium',
    label: '👑 Premium',
    color: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)'
  }, {
    value: 'gold',
    label: '🥇 Gold',
    color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)'
  }, {
    value: 'platinum',
    label: '💎 Platinum',
    color: 'linear-gradient(135deg, #c0c0c0 0%, #e6e6e6 100%)'
  }, {
    value: 'custom',
    label: '🎨 Personalizado',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }];
  const backgroundTypeOptions = [{
    value: 'solid',
    label: '⬜ Cor Sólida'
  }, {
    value: 'gradient',
    label: '🌈 Gradiente'
  }, {
    value: 'neural',
    label: '🧠 Neural'
  }, {
    value: 'image',
    label: '🖼️ Imagem'
  }, {
    value: 'video',
    label: '🎥 Vídeo'
  }];
  const buttonStyleOptions = [{
    value: 'rounded',
    label: '⬜ Arredondado'
  }, {
    value: 'square',
    label: '⬛ Quadrado'
  }, {
    value: 'pill',
    label: '💊 Pílula'
  }, {
    value: 'glassmorphism',
    label: '💎 Glassmorphism'
  }, {
    value: 'neon',
    label: '⚡ Neon'
  }, {
    value: 'gradient',
    label: '🌈 Gradiente'
  }, {
    value: 'custom',
    label: '🎨 Personalizado'
  }];
  const animationOptions = [{
    value: 'none',
    label: '🚫 Sem Animação'
  }, {
    value: 'fade',
    label: '🌅 Fade'
  }, {
    value: 'slide',
    label: '➡️ Slide'
  }, {
    value: 'bounce',
    label: '🏀 Bounce'
  }, {
    value: 'pulse',
    label: '💓 Pulse'
  }, {
    value: 'glow',
    label: '✨ Glow'
  }];
  const hoverEffectOptions = [{
    value: 'none',
    label: 'Nenhum'
  }, {
    value: 'scale',
    label: 'Escala'
  }, {
    value: 'glow',
    label: 'Brilho'
  }, {
    value: 'lift',
    label: 'Elevação'
  }, {
    value: 'bounce',
    label: 'Salto'
  }, {
    value: 'rotate',
    label: 'Rotação'
  }];
  useEffect(() => {
    loadLinkTree();
  }, []);
  const loadLinkTree = async () => {
    try {
      setLoading(true);

      // Buscar link tree
      const {
        data: linkTreeData,
        error: linkTreeError
      } = await supabase.from('link_tree').select('*').eq('is_active', true).single();
      if (linkTreeError && linkTreeError.code !== 'PGRST116') {
        throw linkTreeError;
      }
      if (linkTreeData) {
        setLinkTree(linkTreeData as any);
        setLinkTreeData({
          title: linkTreeData.title || 'Meu Link Tree',
          description: linkTreeData.description || '',
          background_color: linkTreeData.background_color || '#000000',
          text_color: linkTreeData.text_color || '#ffffff',
          title_color: (linkTreeData as any).title_color || linkTreeData.text_color || '#ffffff',
          description_color: (linkTreeData as any).description_color || linkTreeData.text_color || '#ffffff',
          title_size: (linkTreeData as any).title_size || 'text-3xl',
          title_font: (linkTreeData as any).title_font || 'font-bold',
          description_size: (linkTreeData as any).description_size || 'text-base',
          button_style: linkTreeData.button_style as LinkTree['button_style'] || 'list',
          avatar_url: linkTreeData.avatar_url || '',
          avatar_size: (linkTreeData as any).avatar_size || '128',
          theme: linkTreeData.theme as LinkTree['theme'] || 'modern',
          background_type: linkTreeData.background_type as LinkTree['background_type'] || 'neural',
          background_gradient: linkTreeData.background_gradient || 'linear-gradient(135deg, #667eea, #764ba2)',
          background_image: linkTreeData.background_image || '',
          background_video: linkTreeData.background_video || '',
          background_opacity: linkTreeData.background_opacity || 0.8,
          custom_css: linkTreeData.custom_css || '',
          animation_style: linkTreeData.animation_style as LinkTree['animation_style'] || 'glow',
          show_analytics: false,
          // Remove analytics
          is_active: linkTreeData.is_active || true,
          footer_enabled: (linkTreeData as any).footer_enabled ?? true,
          footer_text: (linkTreeData as any).footer_text || '',
          footer_social_links: (linkTreeData as any).footer_social_links || [],
          footer_background_color: (linkTreeData as any).footer_background_color || '#1a1a1a',
          footer_text_color: (linkTreeData as any).footer_text_color || '#ffffff',
          footer_style: (linkTreeData as any).footer_style || 'minimal'
        });

        // Buscar itens
        const {
          data: itemsData,
          error: itemsError
        } = await supabase.from('link_tree_items').select('*').eq('link_tree_id', linkTreeData.id).eq('is_active', true).order('display_order');
        if (itemsError) throw itemsError;
        setItems((itemsData || []) as LinkTreeItem[]);
      } else {
        // Criar link tree padrão
        await createDefaultLinkTree();
      }
    } catch (error) {
      console.error('Erro ao carregar Link Tree:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar Link Tree",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const createDefaultLinkTree = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('link_tree').insert([{
        title: 'Meu Link Tree',
        description: '',
        background_color: '#000000',
        text_color: '#ffffff',
        button_style: 'list',
        theme: 'modern',
        background_type: 'neural',
        animation_style: 'glow',
        show_analytics: false,
        is_active: true
      }]).select().single();
      if (error) throw error;
      setLinkTree(data as any);
    } catch (error) {
      console.error('Erro ao criar Link Tree:', error);
      toast({
        title: "Erro",
        description: "Falha ao criar Link Tree",
        variant: "destructive"
      });
    }
  };
  const [isSaving, setIsSaving] = useState(false);

  const saveLinkTree = async () => {
    try {
      setIsSaving(true);
      
      // Preparar dados completos para salvar
      const dataToSave = {
        title: linkTreeData.title || 'Meu Link Tree',
        description: linkTreeData.description || '',
        background_color: linkTreeData.background_color || '#000000',
        text_color: linkTreeData.text_color || '#ffffff',
        title_color: linkTreeData.title_color || linkTreeData.text_color || '#ffffff',
        description_color: linkTreeData.description_color || linkTreeData.text_color || '#ffffff',
        title_size: linkTreeData.title_size || 'text-3xl',
        title_font: linkTreeData.title_font || 'font-bold',
        description_size: linkTreeData.description_size || 'text-base',
        button_style: linkTreeData.button_style || 'list',
        avatar_url: linkTreeData.avatar_url || '',
        avatar_size: linkTreeData.avatar_size || '128',
        theme: linkTreeData.theme || 'modern',
        background_type: linkTreeData.background_type || 'neural',
        background_gradient: linkTreeData.background_gradient || 'linear-gradient(135deg, #667eea, #764ba2)',
        background_image: linkTreeData.background_image || '',
        background_video: linkTreeData.background_video || '',
        background_opacity: linkTreeData.background_opacity || 0.8,
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
      };
      
      if (linkTree?.id) {
        // Atualizar existente
        const {
          data,
          error
        } = await supabase.from('link_tree').update(dataToSave).eq('id', linkTree.id).select().single();
        if (error) {
          throw error;
        }

        console.log('✅ Link Tree atualizado:', data);
        // Atualizar estado local
        setLinkTree(data as any);
      } else {
        // Criar novo
        const {
          data,
          error
        } = await supabase.from('link_tree').insert([dataToSave]).select().single();
        if (error) {
          throw error;
        }
        setLinkTree(data as any);
      }
      
      
      toast({
        title: "🎉 Salvo com sucesso!",
        description: "Suas configurações foram salvas. A página será atualizada automaticamente.",
        variant: "default",
        duration: 4000
      });
      
      // Sinalizar para outras abas recarregarem
      localStorage.setItem('linkTreeUpdated', Date.now().toString());
    } catch (error) {
      console.error('Erro ao salvar Link Tree:', error);
      toast({
        title: "❌ Erro ao salvar",
        description: "Falha ao salvar configurações. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Helper functions para gradiente
  const parseGradientColors = (gradient: string) => {
    const defaultColor1 = '#667eea';
    const defaultColor2 = '#764ba2';
    
    if (!gradient || !gradient.includes('linear-gradient')) {
      return { color1: defaultColor1, color2: defaultColor2 };
    }
    
    // Extrair cores do formato: linear-gradient(135deg, #cor1, #cor2)
    const match = gradient.match(/linear-gradient\([^,]*,\s*([^,]+),\s*([^)]+)\)/);
    if (match) {
      return {
        color1: match[1].trim(),
        color2: match[2].trim()
      };
    }
    
    return { color1: defaultColor1, color2: defaultColor2 };
  };

  const createGradient = (color1: string, color2: string) => {
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };
  const saveLinkTreeItem = async (itemData: any) => {
    try {
      const {
        data,
        error
      } = await supabase.from('link_tree_items').insert([itemData]).select().single();
      if (error) throw error;
      setItems(prev => [...prev, data as LinkTreeItem]);
      toast({
        title: "Sucesso",
        description: "Item adicionado com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      toast({
        title: "Erro",
        description: "Falha ao salvar item",
        variant: "destructive"
      });
    }
  };
  const moveItem = async (itemId: string, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(item => item.id === itemId);
    if (currentIndex === -1) return;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newItems = [...items];
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];

    // Atualizar display_order no banco
    try {
      const updates = newItems.map((item, index) => ({
        id: item.id,
        display_order: index
      }));
      for (const update of updates) {
        await supabase.from('link_tree_items').update({
          display_order: update.display_order
        }).eq('id', update.id);
      }
      setItems(newItems);
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
      const {
        error
      } = await supabase.from('link_tree_items').insert({
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
        display_order: items.length,
        is_featured: newItem.is_featured,
        item_type: itemType,
        card_content: newItem.card_content,
        card_image: newItem.card_image,
        card_price: newItem.card_price,
        card_button_text: newItem.card_button_text,
        card_size: newItem.card_size,
        card_format: newItem.card_format,
        form_id: newItem.item_type === 'form' ? newItem.form_id : null,
        form_fields: newItem.item_type === 'form' && formConfig ? JSON.stringify(formConfig) : null
      });
      if (error) throw error;
      toast({
        title: "Item adicionado!",
        description: "O item foi adicionado com sucesso ao Link Tree.",
        variant: "default"
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
      await loadLinkTree();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      toast({
        title: "Erro ao adicionar item",
        description: "Ocorreu um erro ao adicionar o item.",
        variant: "destructive"
      });
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
      button_style: item.button_style as any || 'inherit',
      hover_effect: item.hover_effect as any || 'scale',
      is_featured: item.is_featured || false,
      item_type: item.item_type as any || 'link',
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
    console.log('🔄 Atualizando item:', editingItem.id, newItem);
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
        form_fields: newItem.item_type === 'form' && formConfig ? JSON.stringify(formConfig) : null,
        updated_at: new Date().toISOString()
      };
      console.log('📝 Dados a serem atualizados:', updateData);
      const {
        error
      } = await supabase.from('link_tree_items').update(updateData).eq('id', editingItem.id);
      if (error) {
        console.error('❌ Erro do Supabase:', error);
        throw error;
      }
      console.log('✅ Item atualizado no banco');

      // Atualizar lista local imediatamente
      setItems(prev => prev.map(item => item.id === editingItem.id ? {
        ...item,
        ...updateData
      } : item));
      toast({
        title: "Item atualizado!",
        description: "O item foi atualizado com sucesso.",
        variant: "default"
      });

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

      // Recarregar dados para garantir sincronização
      setTimeout(() => {
        loadLinkTree();
      }, 500);
    } catch (error) {
      console.error('❌ Erro ao atualizar item:', error);
      toast({
        title: "Erro ao atualizar item",
        description: "Ocorreu um erro ao atualizar o item.",
        variant: "destructive"
      });
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
      const {
        error
      } = await supabase.from('link_tree_items').delete().eq('id', itemId);
      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Sucesso",
        description: "Item removido com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      toast({
        title: "Erro",
        description: "Falha ao remover item",
        variant: "destructive"
      });
    }
  };
  if (loading) {
    return <div className="flex items-center justify-center p-8">Carregando...</div>;
  }
  return <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Link Tree Management</h1>
          <p className="text-muted-foreground">Sistema completo de gerenciamento de Link Tree</p>
        </div>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <Palette className="w-5 h-5" />
                    Personalização Total
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Crie seu design único com controle total sobre cores, layouts e estilos
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     
                  </div>

                  <div className="space-y-4">
                    <Label>Tipo de Fundo</Label>
                    <div className="space-y-3">
                      {backgroundTypeOptions.map((option) => (
                        <div 
                          key={option.value}
                          onClick={() => setLinkTreeData(prev => ({
                            ...prev,
                            background_type: option.value as any
                          }))} 
                          className={`relative p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            linkTreeData.background_type === option.value 
                              ? 'border-white/40 bg-white/10 shadow-lg ring-2 ring-white/20' 
                              : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                                linkTreeData.background_type === option.value 
                                  ? 'bg-white/20 shadow-lg' 
                                  : 'bg-white/5'
                              }`}>
                                {option.value === 'solid' && <div className="w-4 h-4 bg-white rounded"></div>}
                                {option.value === 'gradient' && <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>}
                                {option.value === 'neural' && <Zap className="w-5 h-5 text-white" />}
                                {option.value === 'image' && <ImageIcon className="w-5 h-5 text-white" />}
                                {option.value === 'video' && <Video className="w-5 h-5 text-white" />}
                              </div>
                              <div>
                                <span className="text-white font-medium">{option.label}</span>
                                <div className="text-xs text-white/60 mt-1">
                                  {option.value === 'solid' && 'Cor única de fundo'}
                                  {option.value === 'gradient' && 'Gradiente personalizado'}
                                  {option.value === 'neural' && 'Animação neural moderna'}
                                  {option.value === 'image' && 'Sua própria imagem'}
                                  {option.value === 'video' && 'Vídeo de fundo'}
                                </div>
                              </div>
                            </div>
                            {linkTreeData.background_type === option.value && (
                              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Configurações específicas por tipo */}
                    {linkTreeData.background_type === 'neural' && <div className="space-y-4 mt-6 p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold text-foreground">Configurações do Fundo Neural</h4>
                        
                        <div>
                          <Label>Cor do Fundo Neural</Label>
                          <div className="flex gap-2">
                            <Input type="color" value={linkTreeData.background_color || '#1a1a2e'} onChange={e => {
                          const newColor = e.target.value;
                          setLinkTreeData(prev => ({
                            ...prev,
                            background_color: newColor
                          }));
                          if (linkTree) {
                            setLinkTree(prev => ({
                              ...prev!,
                              background_color: newColor
                            }));
                          }
                        }} className="w-16 h-10" />
                            <Input value={linkTreeData.background_color || '#1a1a2e'} onChange={e => {
                          const newColor = e.target.value;
                          setLinkTreeData(prev => ({
                            ...prev,
                            background_color: newColor
                          }));
                          if (linkTree) {
                            setLinkTree(prev => ({
                              ...prev!,
                              background_color: newColor
                            }));
                          }
                        }} placeholder="#1a1a2e" />
                          </div>
                        </div>

                      </div>}

                    {linkTreeData.background_type === 'solid' && <div className="space-y-4 mt-6 p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold text-foreground">Configurações da Cor</h4>
                        
                        <div>
                          <Label>Cor de Fundo</Label>
                          <div className="flex gap-2">
                            <Input type="color" value={linkTreeData.background_color || '#3b82f6'} onChange={e => {
                          const newColor = e.target.value;
                          setLinkTreeData(prev => ({
                            ...prev,
                            background_color: newColor
                          }));
                          if (linkTree) {
                            setLinkTree(prev => ({
                              ...prev!,
                              background_color: newColor
                            }));
                          }
                        }} className="w-16 h-10" />
                            <Input value={linkTreeData.background_color || '#3b82f6'} onChange={e => {
                          const newColor = e.target.value;
                          setLinkTreeData(prev => ({
                            ...prev,
                            background_color: newColor
                          }));
                          if (linkTree) {
                            setLinkTree(prev => ({
                              ...prev!,
                              background_color: newColor
                            }));
                          }
                        }} placeholder="#3b82f6" />
                          </div>
                        </div>
                      </div>}

                    {linkTreeData.background_type === 'gradient' && (
                      <div className="space-y-4 mt-6 p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold text-foreground">Configurações do Gradiente</h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Cor Inicial</Label>
                            <div className="flex gap-2">
                              <Input 
                                type="color" 
                                value={parseGradientColors(linkTreeData.background_gradient || '').color1}
                                onChange={(e) => {
                                  const { color2 } = parseGradientColors(linkTreeData.background_gradient || '');
                                  const newGradient = createGradient(e.target.value, color2);
                                  setLinkTreeData(prev => ({
                                    ...prev,
                                    background_gradient: newGradient
                                  }));
                                  if (linkTree) {
                                    setLinkTree(prev => ({
                                      ...prev!,
                                      background_gradient: newGradient
                                    }));
                                  }
                                }} 
                                className="w-16 h-10"
                              />
                              <Input 
                                value={parseGradientColors(linkTreeData.background_gradient || '').color1}
                                onChange={(e) => {
                                  const { color2 } = parseGradientColors(linkTreeData.background_gradient || '');
                                  const newGradient = createGradient(e.target.value, color2);
                                  setLinkTreeData(prev => ({
                                    ...prev,
                                    background_gradient: newGradient
                                  }));
                                  if (linkTree) {
                                    setLinkTree(prev => ({
                                      ...prev!,
                                      background_gradient: newGradient
                                    }));
                                  }
                                }} 
                                placeholder="#667eea" 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Cor Final</Label>
                            <div className="flex gap-2">
                              <Input 
                                type="color" 
                                value={parseGradientColors(linkTreeData.background_gradient || '').color2}
                                onChange={(e) => {
                                  const { color1 } = parseGradientColors(linkTreeData.background_gradient || '');
                                  const newGradient = createGradient(color1, e.target.value);
                                  setLinkTreeData(prev => ({
                                    ...prev,
                                    background_gradient: newGradient
                                  }));
                                  if (linkTree) {
                                    setLinkTree(prev => ({
                                      ...prev!,
                                      background_gradient: newGradient
                                    }));
                                  }
                                }} 
                                className="w-16 h-10" 
                              />
                              <Input 
                                value={parseGradientColors(linkTreeData.background_gradient || '').color2}
                                onChange={(e) => {
                                  const { color1 } = parseGradientColors(linkTreeData.background_gradient || '');
                                  const newGradient = createGradient(color1, e.target.value);
                                  setLinkTreeData(prev => ({
                                    ...prev,
                                    background_gradient: newGradient
                                  }));
                                  if (linkTree) {
                                    setLinkTree(prev => ({
                                      ...prev!,
                                      background_gradient: newGradient
                                    }));
                                  }
                                }} 
                                placeholder="#764ba2" 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 rounded-lg border" style={{
                          background: linkTreeData.background_gradient || 'linear-gradient(135deg, #667eea, #764ba2)'
                        }}>
                          <p className="text-white text-sm text-center">Preview do Gradiente</p>
                        </div>
                      </div>
                    )}

                    {(linkTreeData.background_type === 'image' || linkTreeData.background_type === 'video') && <div className="space-y-4 mt-6 p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold text-foreground">Configurações de Mídia</h4>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button type="button" variant={linkTreeData.background_type === 'image' ? 'default' : 'outline'} onClick={() => setLinkTreeData(prev => ({
                        ...prev,
                        background_type: 'image'
                      }))} className="w-full">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Imagem
                          </Button>
                          <Button type="button" variant={linkTreeData.background_type === 'video' ? 'default' : 'outline'} onClick={() => setLinkTreeData(prev => ({
                        ...prev,
                        background_type: 'video'
                      }))} className="w-full">
                            <Video className="w-4 h-4 mr-2" />
                            Vídeo
                          </Button>
                        </div>

                        {linkTreeData.background_type === 'image' && <div>
                            <Label>URL da Imagem de Fundo</Label>
                            <Input type="url" placeholder="https://exemplo.com/imagem.jpg" value={linkTreeData.background_image || ''} onChange={e => {
                        const newImage = e.target.value;
                        setLinkTreeData(prev => ({
                          ...prev,
                          background_image: newImage
                        }));
                        if (linkTree) {
                          setLinkTree(prev => ({
                            ...prev!,
                            background_image: newImage
                          }));
                        }
                      }} />
                          </div>}

                        {linkTreeData.background_type === 'video' && <div>
                            <Label>URL do Vídeo de Fundo</Label>
                            <Input type="url" placeholder="https://exemplo.com/video.mp4" value={linkTreeData.background_video || ''} onChange={e => {
                        const newVideo = e.target.value;
                        setLinkTreeData(prev => ({
                          ...prev,
                          background_video: newVideo
                        }));
                        if (linkTree) {
                          setLinkTree(prev => ({
                            ...prev!,
                            background_video: newVideo
                          }));
                        }
                      }} />
                            <p className="text-xs text-muted-foreground mt-1">
                              Vídeo será reproduzido sem áudio e em loop
                            </p>
                          </div>}

                        <div>
                          <Label>Cor de Fundo (sob a mídia)</Label>
                          <div className="flex gap-2">
                            <Input 
                              type="color" 
                               value={linkTreeData.background_color || '#000000'} 
                               onChange={(e) => {
                                 const newColor = e.target.value;
                                 setLinkTreeData(prev => ({
                                   ...prev,
                                   background_color: newColor
                                 }));
                                 if (linkTree) {
                                   setLinkTree(prev => ({
                                     ...prev!,
                                     background_color: newColor
                                   }));
                                 }
                               }}
                                className="w-16 h-10" 
                              />
                              <Input 
                                value={linkTreeData.background_color || '#000000'} 
                                onChange={e => {
                                  const newColor = e.target.value;
                                  setLinkTreeData(prev => ({
                                    ...prev,
                                    background_color: newColor
                                  }));
                                  if (linkTree) {
                                    setLinkTree(prev => ({
                                      ...prev!,
                                      background_color: newColor
                                  }));
                                }
                              }} 
                              placeholder="#000000" 
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Cor que aparece atrás da imagem/vídeo
                          </p>
                        </div>

                        <div>
                          <Label>Opacidade da Mídia ({Math.round(((linkTreeData as any).background_opacity || 0.8) * 100)}%)</Label>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05" 
                            value={(linkTreeData as any).background_opacity || 0.8} 
                            onChange={e => {
                              const opacity = parseFloat(e.target.value);
                              setLinkTreeData(prev => ({
                                ...prev,
                                background_opacity: opacity
                              }));
                              if (linkTree) {
                                setLinkTree(prev => ({
                                  ...prev!,
                                  background_opacity: opacity
                                }) as any);
                              }
                            }} 
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer" 
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Controla a transparência da imagem/vídeo sobre o fundo
                          </p>
                        </div>
                      </div>}
                  </div>

                  <div>
                    <Label>Layout</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {layoutOptions.map(layout => <button key={layout.value} onClick={() => setLinkTreeData(prev => ({
                      ...prev,
                      button_style: layout.value as LinkTree['button_style']
                    }))} className={`p-4 border rounded-lg text-left transition-all ${linkTreeData.button_style === layout.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
                          <div className="font-semibold text-sm">{layout.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{layout.description}</div>
                        </button>)}
                    </div>
                  </div>

                  <div>
                    <Label>Estilo de Animação</Label>
                    <Select value={linkTreeData.animation_style} onValueChange={(value: LinkTree['animation_style']) => setLinkTreeData(prev => ({
                    ...prev,
                    animation_style: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {animationOptions.map(option => <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>CSS Personalizado</Label>
                    <Textarea value={linkTreeData.custom_css} onChange={e => setLinkTreeData(prev => ({
                    ...prev,
                    custom_css: e.target.value
                  }))} placeholder=".custom-button { border-radius: 20px; }" rows={4} />
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
                    <Input id="title" value={linkTreeData.title} onChange={e => setLinkTreeData(prev => ({
                    ...prev,
                    title: e.target.value
                  }))} placeholder="Título do seu Link Tree" />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" value={linkTreeData.description} onChange={e => setLinkTreeData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))} placeholder="Descrição opcional" rows={3} />
                  </div>

                  <div>
                    <Label htmlFor="avatar">URL do Avatar</Label>
                    <Input id="avatar" value={linkTreeData.avatar_url} onChange={e => setLinkTreeData(prev => ({
                    ...prev,
                    avatar_url: e.target.value
                  }))} placeholder="https://exemplo.com/avatar.jpg" />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="avatar-size">Tamanho do Avatar ({linkTreeData.avatar_size}px)</Label>
                    <div className="mt-2">
                      <input type="range" min="64" max="300" step="4" value={linkTreeData.avatar_size || '128'} onChange={e => setLinkTreeData(prev => ({
                        ...prev,
                        avatar_size: e.target.value
                      }))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-primary" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>64px</span>
                        <span>300px</span>
                      </div>
                    </div>
                  </div>
                  </div>
                </CardContent>
              </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings2 className="w-5 h-5" />
                      Personalização Avançada 2050
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Interface futurista com controle total sobre a aparência
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-gray-900/10 to-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                          <Label className="text-sm font-medium mb-3 block">Configurações do Título</Label>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs text-muted-foreground">Tamanho</Label>
                              <Select value={linkTreeData.title_size || 'text-3xl'} onValueChange={value => setLinkTreeData(prev => ({
                            ...prev,
                            title_size: value
                          }))}>
                                <SelectTrigger className="h-8 bg-background/80 backdrop-blur-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text-xl">Compacto</SelectItem>
                                  <SelectItem value="text-2xl">Médio</SelectItem>
                                  <SelectItem value="text-3xl">Grande</SelectItem>
                                  <SelectItem value="text-4xl">Extra Grande</SelectItem>
                                  <SelectItem value="text-5xl">Gigante</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Peso da Fonte</Label>
                              <Select value={linkTreeData.title_font || 'font-bold'} onValueChange={value => setLinkTreeData(prev => ({
                            ...prev,
                            title_font: value
                          }))}>
                                <SelectTrigger className="h-8 bg-background/80 backdrop-blur-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="font-light">Leve</SelectItem>
                                  <SelectItem value="font-normal">Normal</SelectItem>
                                  <SelectItem value="font-medium">Médio</SelectItem>
                                  <SelectItem value="font-semibold">Semi Bold</SelectItem>
                                  <SelectItem value="font-bold">Bold</SelectItem>
                                  <SelectItem value="font-black">Black</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Cor do Título</Label>
                              <div className="flex gap-2">
                                <Input type="color" value={linkTreeData.title_color || linkTreeData.text_color} onChange={e => setLinkTreeData(prev => ({
                              ...prev,
                              title_color: e.target.value
                            }))} className="w-12 h-8 p-0 border-0 rounded-md" />
                                <Input value={linkTreeData.title_color || linkTreeData.text_color} onChange={e => setLinkTreeData(prev => ({
                              ...prev,
                              title_color: e.target.value
                            }))} className="h-8 bg-background/80 backdrop-blur-sm" placeholder="#ffffff" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-gray-900/10 to-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                          <Label className="text-sm font-medium mb-3 block">Configurações da Descrição</Label>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs text-muted-foreground">Tamanho</Label>
                              <Select value={linkTreeData.description_size || 'text-base'} onValueChange={value => setLinkTreeData(prev => ({
                            ...prev,
                            description_size: value
                          }))}>
                                <SelectTrigger className="h-8 bg-background/80 backdrop-blur-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text-sm">Pequeno</SelectItem>
                                  <SelectItem value="text-base">Médio</SelectItem>
                                  <SelectItem value="text-lg">Grande</SelectItem>
                                  <SelectItem value="text-xl">Extra Grande</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Cor da Descrição</Label>
                              <div className="flex gap-2">
                                <Input type="color" value={linkTreeData.description_color || linkTreeData.text_color} onChange={e => setLinkTreeData(prev => ({
                              ...prev,
                              description_color: e.target.value
                            }))} className="w-12 h-8 p-0 border-0 rounded-md" />
                                <Input value={linkTreeData.description_color || linkTreeData.text_color} onChange={e => setLinkTreeData(prev => ({
                              ...prev,
                              description_color: e.target.value
                            }))} className="h-8 bg-background/80 backdrop-blur-sm" placeholder="#ffffff" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      <Switch checked={linkTreeData.footer_enabled ?? true} onCheckedChange={checked => setLinkTreeData(prev => ({
                    ...prev,
                    footer_enabled: checked
                  }))} />
                    </div>

                    {linkTreeData.footer_enabled && <div className="space-y-6">
                        <div>
                          <Label>Texto do Rodapé</Label>
                          <Textarea value={linkTreeData.footer_text || ''} onChange={e => setLinkTreeData(prev => ({
                      ...prev,
                      footer_text: e.target.value
                    }))} placeholder="© 2024 Meu Nome - Todos os direitos reservados" rows={3} className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400" />
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-3 block">Estilo do Rodapé</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {[{
                        value: 'minimal',
                        label: 'Minimalista',
                        description: 'Texto simples centralizado'
                      }, {
                        value: 'modern',
                        label: 'Moderno',
                        description: 'Com divisores e espaçamento'
                      }, {
                        value: 'complete',
                        label: 'Completo',
                        description: 'Texto + redes sociais'
                      }].map(style => <button key={style.value} onClick={() => setLinkTreeData(prev => ({
                        ...prev,
                        footer_style: style.value as 'minimal' | 'modern' | 'complete'
                      }))} className={`p-3 rounded-lg border text-left transition-all ${linkTreeData.footer_style === style.value ? 'border-primary bg-primary/10 text-white' : 'border-white/20 bg-white/5 text-white/70 hover:border-primary/50 hover:bg-white/10'}`}>
                                <div className="font-medium text-sm">{style.label}</div>
                                <div className="text-xs opacity-70 mt-1">{style.description}</div>
                              </button>)}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground">Cor do Texto</Label>
                          <div className="flex gap-2">
                            <Input type="color" value={linkTreeData.footer_text_color || '#ffffff'} onChange={e => setLinkTreeData(prev => ({
                        ...prev,
                        footer_text_color: e.target.value
                      }))} className="w-12 h-8 p-0 border-0 rounded-md" />
                            <Input value={linkTreeData.footer_text_color || '#ffffff'} onChange={e => setLinkTreeData(prev => ({
                        ...prev,
                        footer_text_color: e.target.value
                      }))} className="h-8 bg-white/10 backdrop-blur-sm border-white/20 text-white" placeholder="#ffffff" />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-3 block">Redes Sociais</Label>
                          <div className="space-y-3">
                            {(linkTreeData.footer_social_links || []).map((social, index) => <div key={index} className="flex gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                <Select value={social.platform} onValueChange={value => {
                          const newSocials = [...(linkTreeData.footer_social_links || [])];
                          newSocials[index] = {
                            ...social,
                            platform: value
                          };
                          setLinkTreeData(prev => ({
                            ...prev,
                            footer_social_links: newSocials
                          }));
                        }}>
                                  <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-900/95 backdrop-blur-md border-white/20">
                                    <SelectItem value="instagram" className="text-white hover:bg-white/10">📷 Instagram</SelectItem>
                                    <SelectItem value="facebook" className="text-white hover:bg-white/10">📘 Facebook</SelectItem>
                                    <SelectItem value="twitter" className="text-white hover:bg-white/10">🐦 Twitter</SelectItem>
                                    <SelectItem value="linkedin" className="text-white hover:bg-white/10">💼 LinkedIn</SelectItem>
                                    <SelectItem value="youtube" className="text-white hover:bg-white/10">📺 YouTube</SelectItem>
                                    <SelectItem value="tiktok" className="text-white hover:bg-white/10">🎵 TikTok</SelectItem>
                                    <SelectItem value="whatsapp" className="text-white hover:bg-white/10">💬 WhatsApp</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input value={social.url} onChange={e => {
                          const newSocials = [...(linkTreeData.footer_social_links || [])];
                          newSocials[index] = {
                            ...social,
                            url: e.target.value
                          };
                          setLinkTreeData(prev => ({
                            ...prev,
                            footer_social_links: newSocials
                          }));
                        }} placeholder="https://..." className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                                <Button variant="outline" size="sm" onClick={() => {
                          const newSocials = [...(linkTreeData.footer_social_links || [])];
                          newSocials.splice(index, 1);
                          setLinkTreeData(prev => ({
                            ...prev,
                            footer_social_links: newSocials
                          }));
                        }} className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>)}
                            
                            <Button variant="outline" onClick={() => {
                        const newSocials = [...(linkTreeData.footer_social_links || []), {
                          platform: 'instagram',
                          url: ''
                        }];
                        setLinkTreeData(prev => ({
                          ...prev,
                          footer_social_links: newSocials
                        }));
                      }} className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Adicionar Rede Social
                            </Button>
                          </div>
                        </div>
                      </div>}
                  </CardContent>
                </Card>

                <Button 
                  onClick={saveLinkTree} 
                  className={`w-full transition-all duration-300 ${isSaving ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`} 
                  size="lg" 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Salvando...
                    </div>
                  ) : (
                    "💾 Salvar Configurações"
                  )}
                </Button>
            </TabsContent>

            <TabsContent value="items" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Plus className="w-5 h-5" />
                    {editingItem ? 'Editar Item' : 'Adicionar Novo Item'}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configure todos os aspectos do seu item de forma organizada
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Informações Básicas */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Informações Básicas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs font-medium">Título</Label>
                        <Input 
                          value={newItem.title} 
                          onChange={e => setNewItem(prev => ({ ...prev, title: e.target.value }))} 
                          placeholder="Título do item" 
                          className="h-8 text-sm" 
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium">URL</Label>
                        <Input 
                          value={newItem.url} 
                          onChange={e => setNewItem(prev => ({ ...prev, url: e.target.value }))} 
                          placeholder="https://exemplo.com" 
                          className="h-8 text-sm" 
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Tipo</Label>
                        <Select value={newItem.item_type} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, item_type: value }))}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {itemTypeOptions.map(option => 
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Cores */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Cores</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-medium">Cor de Fundo</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="color" 
                            value={newItem.background_color} 
                            onChange={e => setNewItem(prev => ({ ...prev, background_color: e.target.value }))} 
                            className="w-10 h-8 p-1 border rounded" 
                          />
                          <Input 
                            value={newItem.background_color} 
                            onChange={e => setNewItem(prev => ({ ...prev, background_color: e.target.value }))} 
                            placeholder="#ffffff" 
                            className="h-8 text-sm flex-1" 
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Cor do Texto</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="color" 
                            value={newItem.text_color} 
                            onChange={e => setNewItem(prev => ({ ...prev, text_color: e.target.value }))} 
                            className="w-10 h-8 p-1 border rounded" 
                          />
                          <Input 
                            value={newItem.text_color} 
                            onChange={e => setNewItem(prev => ({ ...prev, text_color: e.target.value }))} 
                            placeholder="#000000" 
                            className="h-8 text-sm flex-1" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ícone */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Ícone</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <IconSelector 
                          value={newItem.icon} 
                          onChange={iconName => setNewItem(prev => ({ ...prev, icon: iconName }))} 
                          label="Ícone" 
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Tamanho</Label>
                        <Select value={newItem.icon_size} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, icon_size: value }))}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="w-4 h-4">Pequeno</SelectItem>
                            <SelectItem value="w-5 h-5">Médio</SelectItem>
                            <SelectItem value="w-6 h-6">Grande</SelectItem>
                            <SelectItem value="w-8 h-8">Extra Grande</SelectItem>
                            <SelectItem value="w-10 h-10">Gigante</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Cor do Ícone</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="color" 
                            value={newItem.icon_color} 
                            onChange={e => setNewItem(prev => ({ ...prev, icon_color: e.target.value }))} 
                            className="w-10 h-8 p-1 border rounded" 
                          />
                          <Input 
                            value={newItem.icon_color} 
                            onChange={e => setNewItem(prev => ({ ...prev, icon_color: e.target.value }))} 
                            placeholder="#000000" 
                            className="h-8 text-sm flex-1" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estilo */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Estilo</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-xs font-medium">Estilo do Botão</Label>
                        <Select value={newItem.button_style} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, button_style: value }))}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inherit">Herdar do Tema</SelectItem>
                            {buttonStyleOptions.map(option => 
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Efeito Hover</Label>
                        <Select value={newItem.hover_effect} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, hover_effect: value }))}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {hoverEffectOptions.map(option => 
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Tamanho do Card</Label>
                        <Select value={newItem.card_size || 'medium'} onValueChange={value => setNewItem(prev => ({ ...prev, card_size: value }))}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Pequeno</SelectItem>
                            <SelectItem value="medium">Médio</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                            <SelectItem value="full">Largura Total</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Formato</Label>
                        <Select value={newItem.card_format || 'rounded'} onValueChange={value => setNewItem(prev => ({ ...prev, card_format: value }))}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rounded">Arredondado</SelectItem>
                            <SelectItem value="square">Quadrado</SelectItem>
                            <SelectItem value="circle">Circular</SelectItem>
                            <SelectItem value="pill">Pílula</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="featured" 
                        checked={newItem.is_featured} 
                        onCheckedChange={checked => setNewItem(prev => ({ ...prev, is_featured: checked }))} 
                      />
                      <Label htmlFor="featured" className="text-sm">Item em destaque</Label>
                    </div>
                  </div>

                  {/* Configurações Específicas por Tipo */}
                  {newItem.item_type as string === 'form' && formConfig && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Formulário</h4>
                      <div>
                        <Label className="text-xs font-medium">Formulário</Label>
                        <Select value={newItem.form_id} onValueChange={value => setNewItem(prev => ({ ...prev, form_id: value }))}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Selecione um formulário" />
                          </SelectTrigger>
                          <SelectContent>
                            {multipleFormsConfig.forms.map(form => 
                              <SelectItem key={form.id} value={form.id}>
                                {form.name}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {newItem.item_type as string === 'card' && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Configurações do Card</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-medium">Conteúdo</Label>
                          <Textarea 
                            value={newItem.card_content} 
                            onChange={e => setNewItem(prev => ({ ...prev, card_content: e.target.value }))} 
                            placeholder="Descrição ou conteúdo do card" 
                            rows={3} 
                            className="text-sm" 
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs font-medium">Preço</Label>
                              <Input 
                                value={newItem.card_price} 
                                onChange={e => setNewItem(prev => ({ ...prev, card_price: e.target.value }))} 
                                placeholder="R$ 99,99" 
                                className="h-8 text-sm" 
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-medium">Texto do Botão</Label>
                              <Input 
                                value={newItem.card_button_text} 
                                onChange={e => setNewItem(prev => ({ ...prev, card_button_text: e.target.value }))} 
                                placeholder="Saiba Mais" 
                                className="h-8 text-sm" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {newItem.item_type as string === 'video' && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Configurações do Vídeo</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-medium">URL do Vídeo</Label>
                          <Input 
                            value={newItem.url} 
                            onChange={e => setNewItem(prev => ({ ...prev, url: e.target.value }))} 
                            placeholder="https://youtube.com/watch?v=..." 
                            className="h-8 text-sm" 
                          />
                        </div>
                          <div>
                           <Label className="text-xs font-medium">Thumbnail (opcional)</Label>
                           <div className="flex gap-2">
                             <Input 
                               value={newItem.card_image} 
                               onChange={e => setNewItem(prev => ({ ...prev, card_image: e.target.value }))} 
                               placeholder="https://exemplo.com/thumbnail.jpg" 
                               className="h-8 text-sm flex-1" 
                             />
                             <GalleryButton
                               onSelect={(url) => setNewItem(prev => ({ ...prev, card_image: url }))}
                               size="sm"
                               className="px-2"
                             />
                           </div>
                         </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Descrição</Label>
                        <Textarea 
                          value={newItem.card_content} 
                          onChange={e => setNewItem(prev => ({ ...prev, card_content: e.target.value }))} 
                          placeholder="Descrição do vídeo" 
                          rows={2} 
                          className="text-sm" 
                        />
                      </div>
                    </div>
                  )}

                  {newItem.item_type as string === 'text' && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Configurações do Texto</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-medium">Conteúdo Informativo</Label>
                          <Textarea 
                            value={newItem.card_content} 
                            onChange={e => setNewItem(prev => ({ ...prev, card_content: e.target.value }))} 
                            placeholder="Texto informativo, horários de funcionamento, etc." 
                            rows={4} 
                            className="text-sm" 
                          />
                        </div>
                         <div>
                           <Label className="text-xs font-medium">Imagem de Fundo (opcional)</Label>
                           <div className="flex gap-2">
                             <Input 
                               value={newItem.card_image} 
                               onChange={e => setNewItem(prev => ({ ...prev, card_image: e.target.value }))} 
                               placeholder="https://exemplo.com/imagem.jpg" 
                               className="h-8 text-sm flex-1" 
                             />
                             <GalleryButton
                               onSelect={(url) => setNewItem(prev => ({ ...prev, card_image: url }))}
                               size="sm"
                               className="px-2"
                             />
                           </div>
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex gap-2 pt-2">
                    {editingItem ? (
                      <>
                        <Button onClick={handleUpdateItem} className="flex-1" size="sm">
                          Atualizar Item
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" className="flex-1" size="sm">
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddItem} className="w-full" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Item
                      </Button>
                    )}

                  </div>
                </CardContent>
              </Card>
              {items.length > 0 && <Card>
                  <CardHeader>
                    <CardTitle>Items Cadastrados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item, index) => <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-1">
                              <Button variant="ghost" size="sm" onClick={() => moveItem(item.id, 'up')} disabled={index === 0}>
                                ↑
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => moveItem(item.id, 'down')} disabled={index === items.length - 1}>
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
                            {item.is_featured && <Badge variant="secondary">
                                Destaque
                              </Badge>}
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                              ✏️
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>}
            </TabsContent>

          </Tabs>

          <div className="flex gap-4">
            <Button 
              onClick={saveLinkTree} 
              className={`flex-1 transition-all duration-300 ${isSaving ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`} 
              size="lg" 
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Salvando...
                </div>
              ) : (
                "💾 Salvar Configurações"
              )}
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
              <div className="border rounded-lg overflow-auto max-h-[700px] bg-gray-50">
                <LinkTreePreview linkTree={{
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
                background_opacity: (linkTreeData as any).background_opacity || 0.8,
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
              } as LinkTree} linkTreeItems={items} />
                {/* Debug info */}
                <div className="p-2 bg-gray-100 text-xs text-gray-600">
                  <div>Background Color: {linkTreeData.background_color}</div>
                  <div>Background Type: {linkTreeData.background_type}</div>
                  <div>LinkTree ID: {linkTree?.id}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}