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
import { Trash2, Plus, Eye, Settings2, Palette, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { useToast } from '@/hooks/use-toast';
import { useFormConfig } from '@/hooks/useFormConfig';

export function LinkTreeManagement() {
  const [linkTree, setLinkTree] = useState<LinkTree | null>(null);
  const [items, setItems] = useState<LinkTreeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { formConfig } = useFormConfig();

  // Estados para o novo item
  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    icon: 'link',
    background_color: '#ffffff',
    text_color: '#000000',
    button_style: 'inherit' as const,
    hover_effect: 'scale' as const,
    is_featured: false,
    item_type: 'link' as const,
    card_content: '',
    card_image: '',
    card_price: '',
    card_button_text: 'Saiba Mais',
    form_id: ''
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
    custom_css: '',
    animation_style: 'glow' as LinkTree['animation_style'],
    show_analytics: false,
    is_active: true
  });

  const itemTypeOptions = [
    { value: 'link', label: '🔗 Link', description: 'Link básico para qualquer URL' },
    { value: 'card', label: '📄 Card Premium', description: 'Card com imagem, texto e botão de ação' },
    { value: 'form', label: '📝 Formulário', description: 'Formulário de contato integrado' },
    { value: 'social', label: '📱 Social Media', description: 'Link otimizado para redes sociais' },
    { value: 'contact', label: '📞 Contato Direto', description: 'WhatsApp, telefone ou email' },
    { value: 'video', label: '🎥 Vídeo/Mídia', description: 'Vídeo institucional ou apresentação' },
    { value: 'product', label: '🛍️ Produto/Serviço', description: 'Showcase de serviços jurídicos' },
    { value: 'text', label: '📝 Informativo', description: 'Bloco de texto ou aviso importante' }
  ];

  const layoutOptions = [
    { value: 'list', label: '☰ Lista Elegante', description: 'Lista vertical tradicional' },
    { value: 'grid', label: '⊞ Grid Premium', description: 'Layout em grade organizada' },
    { value: 'masonry', label: '⌬ Masonry', description: 'Layout tipo Pinterest' },
    { value: 'bento', label: '⊡ Bento Grid', description: 'Grid estilo Bento moderno' },
    { value: 'carousel', label: '⟵⟶ Carrossel', description: 'Navegação por slides' },
    { value: 'magazine', label: '📰 Magazine', description: 'Layout editorial sofisticado' }
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
    { value: 'gradient', label: '🌈 Gradiente' }
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
    loadLinkTree();
  }, []);

  const loadLinkTree = async () => {
    try {
      setLoading(true);
      
      // Buscar link tree
      const { data: linkTreeData, error: linkTreeError } = await supabase
        .from('link_tree')
        .select('*')
        .eq('is_active', true)
        .single();

      if (linkTreeError && linkTreeError.code !== 'PGRST116') {
        throw linkTreeError;
      }

      if (linkTreeData) {
        setLinkTree(linkTreeData as LinkTree);
        setLinkTreeData({
          title: linkTreeData.title || 'Meu Link Tree',
          description: linkTreeData.description || '',
          background_color: linkTreeData.background_color || '#000000',
          text_color: linkTreeData.text_color || '#ffffff',
          button_style: (linkTreeData.button_style as LinkTree['button_style']) || 'list',
          avatar_url: linkTreeData.avatar_url || '',
          theme: (linkTreeData.theme as LinkTree['theme']) || 'modern',
          background_type: (linkTreeData.background_type as LinkTree['background_type']) || 'neural',
          background_gradient: linkTreeData.background_gradient || '',
          background_image: linkTreeData.background_image || '',
          background_video: linkTreeData.background_video || '',
          custom_css: linkTreeData.custom_css || '',
          animation_style: (linkTreeData.animation_style as LinkTree['animation_style']) || 'glow',
          show_analytics: linkTreeData.show_analytics || false,
          is_active: linkTreeData.is_active || true
        });

        // Buscar itens
        const { data: itemsData, error: itemsError } = await supabase
          .from('link_tree_items')
          .select('*')
          .eq('link_tree_id', linkTreeData.id)
          .eq('is_active', true)
          .order('display_order');

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
      const { data, error } = await supabase
        .from('link_tree')
        .insert([{
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
        }])
        .select()
        .single();

      if (error) throw error;
      setLinkTree(data as LinkTree);
    } catch (error) {
      console.error('Erro ao criar Link Tree:', error);
      toast({
        title: "Erro",
        description: "Falha ao criar Link Tree",
        variant: "destructive"
      });
    }
  };

  const saveLinkTree = async () => {
    if (!linkTree) return;

    try {
      const { error } = await supabase
        .from('link_tree')
        .update(linkTreeData)
        .eq('id', linkTree.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Link Tree atualizado com sucesso!"
      });

      // Atualizar estado local
      setLinkTree({ ...linkTree, ...linkTreeData } as LinkTree);
    } catch (error) {
      console.error('Erro ao salvar Link Tree:', error);
      toast({
        title: "Erro",
        description: "Falha ao salvar Link Tree",
        variant: "destructive"
      });
    }
  };

  const saveLinkTreeItem = async (itemData: any) => {
    try {
      const { data, error } = await supabase
        .from('link_tree_items')
        .insert([itemData])
        .select()
        .single();

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

  const handleAddItem = async () => {
    if (!newItem.title || !linkTree) return;

    const itemData = {
      link_tree_id: linkTree.id,
      title: newItem.title,
      url: newItem.url,
      icon: newItem.icon,
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
      form_id: newItem.form_id,
      display_order: 0,
      is_active: true,
      click_count: 0
    };

    await saveLinkTreeItem(itemData);
    
    // Reset form
    setNewItem({
      title: '',
      url: '',
      icon: 'link',
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
      form_id: ''
    });
  };

  const deleteItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('link_tree_items')
        .delete()
        .eq('id', itemId);

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Link Tree Management</h1>
          <p className="text-muted-foreground">Sistema completo de gerenciamento de Link Tree</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Premium
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
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
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Avançado
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
                    <div>
                      <Label htmlFor="bg-color">Cor de Fundo</Label>
                      <div className="flex gap-2">
                        <Input
                          id="bg-color"
                          type="color"
                          value={linkTreeData.background_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_color: e.target.value }))}
                          className="w-16 h-10"
                        />
                        <Input
                          value={linkTreeData.background_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_color: e.target.value }))}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="text-color">Cor do Texto</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text-color"
                          type="color"
                          value={linkTreeData.text_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, text_color: e.target.value }))}
                          className="w-16 h-10"
                        />
                        <Input
                          value={linkTreeData.text_color}
                          onChange={(e) => setLinkTreeData(prev => ({ ...prev, text_color: e.target.value }))}
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Tipo de Fundo</Label>
                    <Select value={linkTreeData.background_type} onValueChange={(value: LinkTree['background_type']) => setLinkTreeData(prev => ({ ...prev, background_type: value }))}>
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
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novo Item</CardTitle>
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
                      <Label>URL</Label>
                      <Input
                        value={newItem.url}
                        onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://exemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Tipo de Item</Label>
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

                  {(newItem.item_type as string) === 'form' && formConfig && (
                    <div>
                      <Label>Formulário</Label>
                      <Select value={newItem.form_id} onValueChange={(value) => setNewItem(prev => ({ ...prev, form_id: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um formulário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contact">Formulário de Contato</SelectItem>
                          <SelectItem value="consultation">Formulário de Consulta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Cor de Fundo</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={newItem.background_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                          className="w-16 h-10"
                        />
                        <Input
                          value={newItem.background_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cor do Texto</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={newItem.text_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                          className="w-16 h-10"
                        />
                        <Input
                          value={newItem.text_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Efeito de Hover</Label>
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

                  {(newItem.item_type as string) === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <Label>Conteúdo do Card</Label>
                        <Textarea
                          value={newItem.card_content}
                          onChange={(e) => setNewItem(prev => ({ ...prev, card_content: e.target.value }))}
                          placeholder="Descrição do card"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>URL da Imagem</Label>
                        <Input
                          value={newItem.card_image}
                          onChange={(e) => setNewItem(prev => ({ ...prev, card_image: e.target.value }))}
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                      <div>
                        <Label>Preço (opcional)</Label>
                        <Input
                          value={newItem.card_price}
                          onChange={(e) => setNewItem(prev => ({ ...prev, card_price: e.target.value }))}
                          placeholder="R$ 150"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={newItem.is_featured}
                      onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, is_featured: checked }))}
                    />
                    <Label htmlFor="featured">Item em destaque</Label>
                  </div>

                  <Button onClick={handleAddItem} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Item
                  </Button>
                </CardContent>
              </Card>

              {items.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Items Cadastrados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.item_type} • {item.click_count} cliques
                            </div>
                          </div>
                          {item.is_featured && (
                            <Badge variant="secondary" className="mr-2">
                              Destaque
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Configurações Avançadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Tema Premium</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {themeOptions.map(theme => (
                        <button
                          key={theme.value}
                          onClick={() => setLinkTreeData(prev => ({ ...prev, theme: theme.value as LinkTree['theme'] }))}
                          className={`p-3 border rounded-lg text-left transition-all ${
                            linkTreeData.theme === theme.value 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{ background: theme.color }}
                        >
                          <div className="text-white font-semibold text-sm">{theme.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {linkTreeData.background_type === 'gradient' && (
                    <div>
                      <Label>Gradiente Personalizado</Label>
                      <Input
                        value={linkTreeData.background_gradient}
                        onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_gradient: e.target.value }))}
                        placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      />
                    </div>
                  )}

                  {linkTreeData.background_type === 'image' && (
                    <div>
                      <Label>URL da Imagem de Fundo</Label>
                      <Input
                        value={linkTreeData.background_image}
                        onChange={(e) => setLinkTreeData(prev => ({ ...prev, background_image: e.target.value }))}
                        placeholder="https://exemplo.com/background.jpg"
                      />
                    </div>
                  )}

                  <div>
                    <Label>CSS Personalizado</Label>
                    <Textarea
                      value={linkTreeData.custom_css}
                      onChange={(e) => setLinkTreeData(prev => ({ ...prev, custom_css: e.target.value }))}
                      placeholder=".custom-button { border-radius: 20px; }"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="analytics"
                      checked={linkTreeData.show_analytics}
                      onCheckedChange={(checked) => setLinkTreeData(prev => ({ ...prev, show_analytics: checked }))}
                    />
                    <Label htmlFor="analytics">Mostrar Analytics</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button onClick={saveLinkTree} className="w-full" size="lg">
            Salvar Configurações
          </Button>
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
                  linkTree={{ ...linkTree, ...linkTreeData } as LinkTree}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}