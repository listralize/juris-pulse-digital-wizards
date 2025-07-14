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
import { Trash2, Plus, Eye, Settings2, Palette, Zap, Image as ImageIcon, Video, Instagram, Youtube, Facebook, Twitter, Linkedin } from 'lucide-react';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { useToast } from '@/hooks/use-toast';
import { useFormConfig } from '@/hooks/useFormConfig';
import { IconSelector } from './IconSelector';
import { useLinkTree } from '@/hooks/useLinkTree';

export function LinkTreeManagement() {
  const { linkTree, linkTreeItems, isLoading, saveLinkTree, saveLinkTreeItem, updateLinkTreeItem, deleteLinkTreeItem } = useLinkTree();
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

  // Estados do Link Tree (local state para editing)
  const [linkTreeData, setLinkTreeData] = useState<Partial<LinkTree>>({});
  
  // Configurações do avatar
  const [avatarConfig, setAvatarConfig] = useState({
    size: '120px',
    format: 'rounded-full' as 'rounded-full' | 'rounded-lg' | 'square'
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
    { value: 'colorful', label: '🌈 Colorido', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)' },
    { value: 'dark', label: '🌙 Escuro', color: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
    { value: 'corporate', label: '💼 Corporativo', color: 'linear-gradient(135deg, #3c3b3f 0%, #605c3c 100%)' },
    { value: 'premium', label: '⭐ Premium', color: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)' },
    { value: 'gold', label: '🥇 Dourado', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
    { value: 'platinum', label: '💎 Platina', color: 'linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)' }
  ];

  const socialPlatforms = [
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'facebook', label: 'Facebook', icon: Facebook },
    { value: 'twitter', label: 'Twitter', icon: Twitter },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin }
  ];

  // Sincronizar dados quando linkTree carrega
  useEffect(() => {
    if (linkTree) {
      // Garantir que os campos do rodapé tenham valores padrão
      const linkTreeWithDefaults = {
        ...linkTree,
        footer_enabled: linkTree.footer_enabled ?? true,
        footer_text: linkTree.footer_text ?? '',
        footer_social_links: linkTree.footer_social_links ?? [],
        footer_background_color: linkTree.footer_background_color ?? '#1a1a1a',
        footer_text_color: linkTree.footer_text_color ?? '#ffffff',
        footer_style: linkTree.footer_style ?? 'minimal'
      };
      setLinkTreeData(linkTreeWithDefaults);
    }
  }, [linkTree]);

  const handleSaveLinkTree = async () => {
    try {
      await saveLinkTree(linkTreeData as Omit<LinkTree, 'id' | 'created_at' | 'updated_at'>);
      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao salvar:', error);
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
        form_id: newItem.form_id,
        card_size: newItem.card_size,
        card_format: newItem.card_format
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

  const handleAddSocialLink = () => {
    setLinkTreeData({
      ...linkTreeData,
      footer_social_links: [
        ...(linkTreeData.footer_social_links || []),
        { platform: 'instagram', url: '', icon: 'instagram' }
      ]
    });
  };

  const handleUpdateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const updatedLinks = [...(linkTreeData.footer_social_links || [])];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    if (field === 'platform') {
      updatedLinks[index].icon = value;
    }
    setLinkTreeData({
      ...linkTreeData,
      footer_social_links: updatedLinks
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    const updatedLinks = [...(linkTreeData.footer_social_links || [])];
    updatedLinks.splice(index, 1);
    setLinkTreeData({
      ...linkTreeData,
      footer_social_links: updatedLinks
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Painel de Configuração */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl font-bold">Sistema completo de gerenciamento de Link Tree</h1>
          <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            Premium
          </Badge>
        </div>

        <Tabs defaultValue="design" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={linkTreeData.title || ''}
                    onChange={(e) => setLinkTreeData({ ...linkTreeData, title: e.target.value })}
                    placeholder="Meu Link Tree"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={linkTreeData.description || ''}
                    onChange={(e) => setLinkTreeData({ ...linkTreeData, description: e.target.value })}
                    placeholder="Descrição do seu perfil"
                  />
                </div>

                <div>
                  <Label htmlFor="avatar">URL do Avatar</Label>
                  <Input
                    id="avatar"
                    value={linkTreeData.avatar_url || ''}
                    onChange={(e) => setLinkTreeData({ ...linkTreeData, avatar_url: e.target.value })}
                    placeholder="https://exemplo.com/avatar.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="avatarSize">Tamanho do Avatar</Label>
                    <Select value={avatarConfig.size} onValueChange={(value) => setAvatarConfig({ ...avatarConfig, size: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="80px">Pequeno (80px)</SelectItem>
                        <SelectItem value="120px">Médio (120px)</SelectItem>
                        <SelectItem value="160px">Grande (160px)</SelectItem>
                        <SelectItem value="200px">Extra Grande (200px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="avatarFormat">Formato do Avatar</Label>
                    <Select value={avatarConfig.format} onValueChange={(value: any) => setAvatarConfig({ ...avatarConfig, format: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded-full">Circular</SelectItem>
                        <SelectItem value="rounded-lg">Arredondado</SelectItem>
                        <SelectItem value="square">Quadrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tema e Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tema</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {themeOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                          linkTreeData.theme === option.value ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                        }`}
                        onClick={() => setLinkTreeData({ ...linkTreeData, theme: option.value as any })}
                      >
                        <div
                          className="h-8 rounded mb-2"
                          style={{ background: option.color }}
                        />
                        <p className="text-sm font-medium">{option.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Layout dos Botões</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {layoutOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                          linkTreeData.button_style === option.value ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                        }`}
                        onClick={() => setLinkTreeData({ ...linkTreeData, button_style: option.value as any })}
                      >
                        <p className="text-sm font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bg-color">Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={linkTreeData.background_color || '#000000'}
                        onChange={(e) => setLinkTreeData({ ...linkTreeData, background_color: e.target.value })}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={linkTreeData.background_color || '#000000'}
                        onChange={(e) => setLinkTreeData({ ...linkTreeData, background_color: e.target.value })}
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="text-color">Cor do Texto</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={linkTreeData.text_color || '#ffffff'}
                        onChange={(e) => setLinkTreeData({ ...linkTreeData, text_color: e.target.value })}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={linkTreeData.text_color || '#ffffff'}
                        onChange={(e) => setLinkTreeData({ ...linkTreeData, text_color: e.target.value })}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5" />
                  Configurações do Rodapé
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure o rodapé personalizado do seu Link Tree
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="footer-enabled">Habilitar Rodapé</Label>
                    <p className="text-sm text-muted-foreground">Mostrar rodapé no Link Tree</p>
                  </div>
                  <Switch
                    id="footer-enabled"
                    checked={linkTreeData.footer_enabled}
                    onCheckedChange={(checked) => setLinkTreeData({ ...linkTreeData, footer_enabled: checked })}
                  />
                </div>

                {linkTreeData.footer_enabled && (
                  <>
                    <div>
                      <Label htmlFor="footer-text">Texto do Rodapé</Label>
                      <Textarea
                        id="footer-text"
                        value={linkTreeData.footer_text || ''}
                        onChange={(e) => setLinkTreeData({ ...linkTreeData, footer_text: e.target.value })}
                        placeholder="Digite o texto do rodapé..."
                        className="resize-none"
                      />
                    </div>

                    <div>
                      <Label>Estilo do Rodapé</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {[
                          { value: 'minimal', label: 'Minimalista', description: 'Texto simples centralizado' },
                          { value: 'modern', label: 'Moderno', description: 'Com divisores e espaçamento' },
                          { value: 'complete', label: 'Completo', description: 'Texto + redes sociais' }
                        ].map((option) => (
                          <div
                            key={option.value}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                              linkTreeData.footer_style === option.value ? 'border-primary bg-primary/5' : 'border-border'
                            }`}
                            onClick={() => setLinkTreeData({ ...linkTreeData, footer_style: option.value as any })}
                          >
                            <p className="text-sm font-medium">{option.label}</p>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="footer-bg">Cor de Fundo</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={linkTreeData.footer_background_color || '#1a1a1a'}
                            onChange={(e) => setLinkTreeData({ ...linkTreeData, footer_background_color: e.target.value })}
                            className="w-12 h-10 rounded border"
                          />
                          <Input
                            value={linkTreeData.footer_background_color || '#1a1a1a'}
                            onChange={(e) => setLinkTreeData({ ...linkTreeData, footer_background_color: e.target.value })}
                            placeholder="#1a1a1a"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="footer-text-color">Cor do Texto</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={linkTreeData.footer_text_color || '#ffffff'}
                            onChange={(e) => setLinkTreeData({ ...linkTreeData, footer_text_color: e.target.value })}
                            className="w-12 h-10 rounded border"
                          />
                          <Input
                            value={linkTreeData.footer_text_color || '#ffffff'}
                            onChange={(e) => setLinkTreeData({ ...linkTreeData, footer_text_color: e.target.value })}
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label>Redes Sociais</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddSocialLink}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Adicionar Rede Social
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {linkTreeData.footer_social_links?.map((link, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                            <Select
                              value={link.platform}
                              onValueChange={(value) => handleUpdateSocialLink(index, 'platform', value)}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {socialPlatforms.map((platform) => (
                                  <SelectItem key={platform.value} value={platform.value}>
                                    <div className="flex items-center gap-2">
                                      <platform.icon className="h-4 w-4" />
                                      {platform.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Input
                              value={link.url}
                              onChange={(e) => handleUpdateSocialLink(index, 'url', e.target.value)}
                              placeholder="https://..."
                              className="flex-1"
                            />

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveSocialLink(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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
                    <Label htmlFor="item-title">Título</Label>
                    <Input
                      id="item-title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Título do item"
                    />
                  </div>

                  <div>
                    <Label htmlFor="item-type">Tipo</Label>
                    <Select value={newItem.item_type} onValueChange={(value) => setNewItem({ ...newItem, item_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {itemTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div>
                              <p className="font-medium">{option.label}</p>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newItem.item_type === 'link' && (
                  <div>
                    <Label htmlFor="item-url">URL</Label>
                    <Input
                      id="item-url"
                      value={newItem.url}
                      onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                      placeholder="https://exemplo.com"
                    />
                  </div>
                )}

                {newItem.item_type === 'text' && (
                  <div>
                    <Label htmlFor="card-content">Conteúdo do Texto</Label>
                    <Textarea
                      id="card-content"
                      value={newItem.card_content}
                      onChange={(e) => setNewItem({ ...newItem, card_content: e.target.value })}
                      placeholder="Digite o conteúdo do texto informativo..."
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bg-color">Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={newItem.background_color}
                        onChange={(e) => setNewItem({ ...newItem, background_color: e.target.value })}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={newItem.background_color}
                        onChange={(e) => setNewItem({ ...newItem, background_color: e.target.value })}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="text-color">Cor do Texto</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={newItem.text_color}
                        onChange={(e) => setNewItem({ ...newItem, text_color: e.target.value })}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={newItem.text_color}
                        onChange={(e) => setNewItem({ ...newItem, text_color: e.target.value })}
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={newItem.is_featured}
                    onCheckedChange={(checked) => setNewItem({ ...newItem, is_featured: checked })}
                  />
                  <Label htmlFor="featured">Item em destaque</Label>
                </div>

                <Button onClick={handleAddItem} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items Atuais ({linkTreeItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {linkTreeItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.item_type === 'info' ? 'text' : item.item_type} • {item.url || 'Sem URL'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.is_featured && (
                          <Badge variant="secondary">Destaque</Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteLinkTreeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={handleSaveLinkTree} className="flex-1">
            Salvar Configurações
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Preview em Tempo Real</h2>
        </div>
        
        <div className="sticky top-4">
          <LinkTreePreview 
            linkTree={{ ...linkTreeData, ...avatarConfig } as LinkTree} 
            linkTreeItems={linkTreeItems}
          />
        </div>
      </div>
    </div>
  );
}