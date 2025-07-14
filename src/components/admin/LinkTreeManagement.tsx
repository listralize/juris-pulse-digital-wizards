import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { useLinkTree } from '@/hooks/useLinkTree';
import { LinkTree, LinkTreeItem, FormField } from '@/types/linkTreeTypes';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  GripVertical, 
  Palette,
  Sparkles,
  Monitor,
  Smartphone,
  Copy,
  BarChart3,
  Move,
  Settings,
  Zap,
  Layers,
  CreditCard,
  FileText,
  Link as LinkIcon
} from 'lucide-react';
import { toast } from 'sonner';

const themePresets = {
  minimal: {
    background_color: '#ffffff',
    text_color: '#000000',
    button_style: 'rounded' as const,
    animation_style: 'fade' as const
  },
  modern: {
    background_color: '#0f0f23',
    text_color: '#ffffff',
    button_style: 'glassmorphism' as const,
    animation_style: 'slide' as const
  },
  neon: {
    background_color: '#000000',
    text_color: '#00ff88',
    button_style: 'neon' as const,
    animation_style: 'glow' as const
  },
  glassmorphism: {
    background_color: 'rgba(255,255,255,0.1)',
    text_color: '#ffffff',
    button_style: 'glassmorphism' as const,
    animation_style: 'fade' as const
  },
  gradient: {
    background_color: '#667eea',
    text_color: '#ffffff',
    button_style: 'gradient' as const,
    animation_style: 'bounce' as const
  },
  retro: {
    background_color: '#ff6b6b',
    text_color: '#fff3e0',
    button_style: 'pill' as const,
    animation_style: 'pulse' as const
  }
};

export const LinkTreeManagement = () => {
  const { theme } = useTheme();
  
  const {
    linkTree,
    linkTreeItems,
    isLoading,
    saveLinkTree,
    saveLinkTreeItem,
    updateLinkTreeItem,
    deleteLinkTreeItem
  } = useLinkTree();

  const [formData, setFormData] = useState<Omit<LinkTree, 'id' | 'created_at' | 'updated_at'>>({
    title: 'Meu Link Tree',
    description: '',
    background_color: '#000000',
    text_color: '#ffffff',
    button_style: 'rounded',
    avatar_url: '',
    theme: 'modern',
    background_type: 'solid',
    background_gradient: '',
    background_image: '',
    background_video: '',
    custom_css: '',
    animation_style: 'fade',
    show_analytics: false,
    is_active: true
  });

  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    icon: '',
    background_color: '#ffffff',
    text_color: '#000000',
    button_style: 'inherit' as const,
    hover_effect: 'scale' as const,
    is_featured: false,
    item_type: 'link' as const,
    card_content: '',
    form_fields: [] as FormField[]
  });

  const [activeTab, setActiveTab] = useState('design');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('mobile');

  useEffect(() => {
    if (linkTree) {
      setFormData({
        title: linkTree.title,
        description: linkTree.description || '',
        background_color: linkTree.background_color,
        text_color: linkTree.text_color,
        button_style: linkTree.button_style,
        avatar_url: linkTree.avatar_url || '',
        theme: linkTree.theme || 'modern',
        background_type: linkTree.background_type || 'solid',
        background_gradient: linkTree.background_gradient || '',
        background_image: linkTree.background_image || '',
        background_video: linkTree.background_video || '',
        custom_css: linkTree.custom_css || '',
        animation_style: linkTree.animation_style || 'fade',
        show_analytics: linkTree.show_analytics || false,
        is_active: linkTree.is_active
      });
    }
  }, [linkTree]);

  const applyThemePreset = (themeName: keyof typeof themePresets) => {
    const preset = themePresets[themeName];
    setFormData(prev => ({
      ...prev,
      theme: themeName,
      ...preset
    }));
  };

  const handleSave = async () => {
    try {
      await saveLinkTree(formData);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title) {
      toast.error('Título é obrigatório');
      return;
    }

    if (newItem.item_type === 'link' && !newItem.url) {
      toast.error('URL é obrigatória para links');
      return;
    }

    if (!linkTree) {
      toast.error('Salve as configurações do Link Tree primeiro');
      return;
    }

    try {
      await saveLinkTreeItem({
        link_tree_id: linkTree.id,
        title: newItem.title,
        url: newItem.url || '',
        icon: newItem.icon,
        background_color: newItem.background_color,
        text_color: newItem.text_color,
        button_style: newItem.button_style,
        hover_effect: newItem.hover_effect,
        display_order: linkTreeItems.length,
        click_count: 0,
        is_featured: newItem.is_featured,
        is_active: true,
        item_type: newItem.item_type,
        card_content: newItem.card_content,
        form_fields: newItem.form_fields
      });

      setNewItem({
        title: '',
        url: '',
        icon: '',
        background_color: '#ffffff',
        text_color: '#000000',
        button_style: 'inherit',
        hover_effect: 'scale',
        is_featured: false,
        item_type: 'link',
        card_content: '',
        form_fields: []
      });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const addFormField = () => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type: 'text',
      label: 'Novo Campo',
      placeholder: '',
      required: false,
      options: []
    };
    setNewItem(prev => ({
      ...prev,
      form_fields: [...prev.form_fields, newField]
    }));
  };

  const updateFormField = (fieldId: string, updates: Partial<FormField>) => {
    setNewItem(prev => ({
      ...prev,
      form_fields: prev.form_fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  const removeFormField = (fieldId: string) => {
    setNewItem(prev => ({
      ...prev,
      form_fields: prev.form_fields.filter(field => field.id !== fieldId)
    }));
  };

  const copyLinkTreeUrl = () => {
    const url = `${window.location.origin}/tree`;
    navigator.clipboard.writeText(url);
    toast.success('URL copiada para a área de transferência!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-black text-white min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            ⚡ Link Tree Pro
          </h2>
          <p className="text-gray-400 mt-2">
            Crie uma página de links profissional com cards e formulários
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={copyLinkTreeUrl}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-gray-700 bg-gray-900 text-white hover:bg-gray-800"
          >
            <Copy className="w-4 h-4" />
            Copiar URL
          </Button>
          <Button
            onClick={() => window.open('/tree', '_blank')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-gray-700 bg-gray-900 text-white hover:bg-gray-800"
          >
            <Eye className="w-4 h-4" />
            Visualizar
          </Button>
          <Button 
            onClick={handleSave} 
            size="sm" 
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Save className="w-4 h-4" />
            Salvar Tudo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Configurações */}
        <div className="xl:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-700">
              <TabsTrigger value="design" className="flex items-center gap-2 text-white data-[state=active]:bg-purple-600">
                <Palette className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2 text-white data-[state=active]:bg-purple-600">
                <Layers className="w-4 h-4" />
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center gap-2 text-white data-[state=active]:bg-purple-600">
                <Zap className="w-4 h-4" />
                Items
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2 text-white data-[state=active]:bg-purple-600">
                <Settings className="w-4 h-4" />
                Avançado
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-6 mt-6">
              {/* Temas Predefinidos */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    Temas Predefinidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(themePresets).map(([name, preset]) => (
                      <button
                        key={name}
                        onClick={() => applyThemePreset(name as keyof typeof themePresets)}
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          formData.theme === name 
                            ? 'border-purple-500 ring-2 ring-purple-500/20' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: preset.background_color }}
                      >
                        <div className="text-xs font-medium mb-1" style={{ color: preset.text_color }}>
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </div>
                        <div 
                          className="w-full h-6 rounded text-xs flex items-center justify-center"
                          style={{ backgroundColor: preset.text_color, color: preset.background_color }}
                        >
                          Botão
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Personalização de Cores */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Cores Personalizadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Cor de Fundo</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="w-12 h-10 p-1 bg-gray-800 border-gray-600"
                        />
                        <Input
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="flex-1 bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300">Cor do Texto</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={formData.text_color}
                          onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                          className="w-12 h-10 p-1 bg-gray-800 border-gray-600"
                        />
                        <Input
                          value={formData.text_color}
                          onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                          className="flex-1 bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6 mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Título</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Seu nome ou marca"
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Descrição</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Uma breve descrição sobre você"
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">URL do Avatar</Label>
                    <Input
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="https://exemplo.com/avatar.jpg"
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items" className="space-y-6 mt-6">
              {/* Adicionar Novo Item */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Plus className="w-5 h-5" />
                    Adicionar Novo Item
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Tipo de Item</Label>
                    <Select
                      value={newItem.item_type}
                      onValueChange={(value: any) => setNewItem({ ...newItem, item_type: value })}
                    >
                      <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="link" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4" />
                            Link
                          </div>
                        </SelectItem>
                        <SelectItem value="card" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Card de Conteúdo
                          </div>
                        </SelectItem>
                        <SelectItem value="form" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Formulário
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Título</Label>
                      <Input
                        value={newItem.title}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        placeholder="Ex: Meu Instagram"
                        className="mt-1 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    {newItem.item_type === 'link' && (
                      <div>
                        <Label className="text-gray-300">URL</Label>
                        <Input
                          value={newItem.url}
                          onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                          placeholder="https://..."
                          className="mt-1 bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    )}
                  </div>

                  {newItem.item_type === 'card' && (
                    <div>
                      <Label className="text-gray-300">Conteúdo do Card</Label>
                      <Textarea
                        value={newItem.card_content}
                        onChange={(e) => setNewItem({ ...newItem, card_content: e.target.value })}
                        placeholder="Conteúdo que será exibido no card..."
                        className="mt-1 bg-gray-800 border-gray-600 text-white"
                        rows={4}
                      />
                    </div>
                  )}

                  {newItem.item_type === 'form' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-gray-300">Campos do Formulário</Label>
                        <Button
                          onClick={addFormField}
                          size="sm"
                          variant="outline"
                          className="border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Adicionar Campo
                        </Button>
                      </div>
                      
                      {newItem.form_fields.map((field) => (
                        <div key={field.id} className="p-3 border border-gray-600 rounded-lg bg-gray-800">
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <Input
                              value={field.label}
                              onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                              placeholder="Label do campo"
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                            <Select
                              value={field.type}
                              onValueChange={(value: any) => updateFormField(field.id, { type: value })}
                            >
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="text" className="text-white">Texto</SelectItem>
                                <SelectItem value="email" className="text-white">Email</SelectItem>
                                <SelectItem value="textarea" className="text-white">Textarea</SelectItem>
                                <SelectItem value="select" className="text-white">Select</SelectItem>
                                <SelectItem value="checkbox" className="text-white">Checkbox</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              onClick={() => removeFormField(field.id)}
                              size="sm"
                              variant="destructive"
                              className="h-10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={field.placeholder || ''}
                              onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                              placeholder="Placeholder (opcional)"
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={field.required}
                                onCheckedChange={(checked) => updateFormField(field.id, { required: checked })}
                              />
                              <Label className="text-xs text-gray-400">Obrigatório</Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button 
                    onClick={handleAddItem}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Item
                  </Button>
                </CardContent>
              </Card>

              {/* Lista de Items Existentes */}
              {linkTreeItems.length > 0 && (
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Items Atuais ({linkTreeItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {linkTreeItems.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-600">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <div>
                              <span className="text-white font-medium">{item.title}</span>
                              <div className="text-xs text-gray-400 flex items-center gap-2">
                                {item.item_type === 'link' && <LinkIcon className="w-3 h-3" />}
                                {item.item_type === 'card' && <CreditCard className="w-3 h-3" />}
                                {item.item_type === 'form' && <FileText className="w-3 h-3" />}
                                {item.item_type.toUpperCase()}
                                {item.item_type === 'link' && item.url && ` • ${item.url}`}
                                {item.click_count > 0 && ` • ${item.click_count} cliques`}
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => deleteLinkTreeItem(item.id)}
                            size="sm"
                            variant="destructive"
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

            <TabsContent value="advanced" className="space-y-6 mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Configurações Avançadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Exibir Analytics</Label>
                      <p className="text-xs text-gray-400">Mostra contadores de cliques</p>
                    </div>
                    <Switch
                      checked={formData.show_analytics}
                      onCheckedChange={(checked) => setFormData({ ...formData, show_analytics: checked })}
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">CSS Customizado</Label>
                    <Textarea
                      value={formData.custom_css}
                      onChange={(e) => setFormData({ ...formData, custom_css: e.target.value })}
                      placeholder="/* Adicione seu CSS customizado aqui */"
                      className="mt-1 bg-gray-800 border-gray-600 text-white font-mono"
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setPreviewMode('mobile')}
                    size="sm"
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    className={previewMode === 'mobile' ? '' : 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700'}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setPreviewMode('desktop')}
                    size="sm"
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    className={previewMode === 'desktop' ? '' : 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700'}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`mx-auto border-2 border-gray-600 rounded-lg overflow-hidden ${
                previewMode === 'mobile' ? 'w-80 h-96' : 'w-full h-96'
              }`}>
                <iframe
                  src="/tree"
                  className="w-full h-full"
                  title="Link Tree Preview"
                />
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          {formData.show_analytics && linkTreeItems.length > 0 && (
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5" />
                  Analytics Rápida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {linkTreeItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 truncate">{item.title}</span>
                      <span className="text-white font-medium">{item.click_count} cliques</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white">
                      {linkTreeItems.reduce((total, item) => total + item.click_count, 0)} cliques
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};