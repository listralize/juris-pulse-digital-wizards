import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { useLinkTree } from '@/hooks/useLinkTree';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
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
  Layers
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
  const isDark = theme === 'dark';
  
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
    is_featured: false
  });

  const [activeTab, setActiveTab] = useState('design');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    if (!newItem.title || !newItem.url) {
      toast.error('Título e URL são obrigatórios');
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
        url: newItem.url,
        icon: newItem.icon,
        background_color: newItem.background_color,
        text_color: newItem.text_color,
        button_style: newItem.button_style,
        hover_effect: newItem.hover_effect,
        display_order: linkTreeItems.length,
        click_count: 0,
        is_featured: newItem.is_featured,
        is_active: true
      });

      setNewItem({
        title: '',
        url: '',
        icon: '',
        background_color: '#ffffff',
        text_color: '#000000',
        button_style: 'inherit',
        hover_effect: 'scale',
        is_featured: false
      });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const copyLinkTreeUrl = () => {
    const url = `${window.location.origin}/tree`;
    navigator.clipboard.writeText(url);
    toast.success('URL copiada para a área de transferência!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            ✨ Link Tree Pro
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Crie uma página de links profissional e personalizável
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={copyLinkTreeUrl}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar URL
          </Button>
          <Button
            onClick={() => window.open('/tree', '_blank')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Visualizar
          </Button>
          <Button onClick={handleSave} size="sm" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Tudo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Configurações */}
        <div className="xl:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-4 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="links" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Links
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Avançado
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-6 mt-6">
              {/* Temas Predefinidos */}
              <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
                            ? 'border-blue-500 ring-2 ring-blue-500/20' 
                            : 'border-gray-300 hover:border-gray-400'
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
              <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle>Cores Personalizadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Cor de Fundo</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cor do Texto</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={formData.text_color}
                          onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={formData.text_color}
                          onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Estilo dos Botões</Label>
                    <Select
                      value={formData.button_style}
                      onValueChange={(value: any) => setFormData({ ...formData, button_style: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded">🔲 Arredondado</SelectItem>
                        <SelectItem value="square">⬜ Quadrado</SelectItem>
                        <SelectItem value="pill">💊 Pílula</SelectItem>
                        <SelectItem value="glassmorphism">🪟 Glassmorphism</SelectItem>
                        <SelectItem value="neon">⚡ Neon</SelectItem>
                        <SelectItem value="gradient">🌈 Gradiente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Animação</Label>
                    <Select
                      value={formData.animation_style}
                      onValueChange={(value: any) => setFormData({ ...formData, animation_style: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sem animação</SelectItem>
                        <SelectItem value="fade">✨ Fade</SelectItem>
                        <SelectItem value="slide">➡️ Slide</SelectItem>
                        <SelectItem value="bounce">⚡ Bounce</SelectItem>
                        <SelectItem value="pulse">💓 Pulse</SelectItem>
                        <SelectItem value="glow">🌟 Glow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6 mt-6">
              <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Título</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Seu nome ou marca"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Uma breve descrição sobre você"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>URL do Avatar</Label>
                    <Input
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="https://exemplo.com/avatar.jpg"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="links" className="space-y-6 mt-6">
              {/* Adicionar Novo Link */}
              <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Adicionar Novo Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={newItem.title}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        placeholder="Ex: Meu Instagram"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        value={newItem.url}
                        onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                        placeholder="https://..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Efeito de Hover</Label>
                      <Select
                        value={newItem.hover_effect}
                        onValueChange={(value: any) => setNewItem({ ...newItem, hover_effect: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scale">📏 Scale</SelectItem>
                          <SelectItem value="glow">✨ Glow</SelectItem>
                          <SelectItem value="lift">⬆️ Lift</SelectItem>
                          <SelectItem value="bounce">⚡ Bounce</SelectItem>
                          <SelectItem value="rotate">🔄 Rotate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Cor do Botão</Label>
                      <Input
                        type="color"
                        value={newItem.background_color}
                        onChange={(e) => setNewItem({ ...newItem, background_color: e.target.value })}
                        className="mt-1 h-10"
                      />
                    </div>
                    <div>
                      <Label>Cor do Texto</Label>
                      <Input
                        type="color"
                        value={newItem.text_color}
                        onChange={(e) => setNewItem({ ...newItem, text_color: e.target.value })}
                        className="mt-1 h-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newItem.is_featured}
                        onCheckedChange={(checked) => setNewItem({ ...newItem, is_featured: checked })}
                      />
                      <Label>Link em destaque</Label>
                    </div>
                    <Button onClick={handleAddItem} className="ml-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Links */}
              <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Links ({linkTreeItems.length})</span>
                    {formData.show_analytics && (
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {linkTreeItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                          isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                                  {item.title}
                                </p>
                                {item.is_featured && (
                                  <span className="px-2 py-1 text-xs bg-yellow-500 text-black rounded">
                                    ⭐ Destaque
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.url}
                              </p>
                              {formData.show_analytics && (
                                <p className="text-xs text-blue-500 mt-1">
                                  {item.click_count} cliques
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteLinkTreeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {linkTreeItems.length === 0 && (
                      <div className="text-center py-8">
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Nenhum link adicionado ainda.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6 mt-6">
              <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle>Configurações Avançadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.show_analytics}
                      onCheckedChange={(checked) => setFormData({ ...formData, show_analytics: checked })}
                    />
                    <Label>Mostrar analytics de cliques</Label>
                  </div>

                  <div>
                    <Label>CSS Personalizado (Avançado)</Label>
                    <Textarea
                      value={formData.custom_css}
                      onChange={(e) => setFormData({ ...formData, custom_css: e.target.value })}
                      placeholder="/* Adicione seu CSS personalizado aqui */"
                      className="mt-1 font-mono text-sm"
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="xl:col-span-1">
          <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className={`mx-auto rounded-lg border overflow-hidden ${
                  previewMode === 'mobile' ? 'w-64 h-96' : 'w-full h-80'
                }`}
                style={{ backgroundColor: formData.background_color }}
              >
                <div className="p-4 h-full overflow-y-auto">
                  <div className="text-center space-y-3">
                    {formData.avatar_url && (
                      <img
                        src={formData.avatar_url}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full mx-auto object-cover"
                      />
                    )}
                    <h1
                      className="text-lg font-bold"
                      style={{ color: formData.text_color }}
                    >
                      {formData.title}
                    </h1>
                    {formData.description && (
                      <p
                        className="text-xs opacity-80"
                        style={{ color: formData.text_color }}
                      >
                        {formData.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 mt-4">
                      {linkTreeItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className={`p-2 text-center text-xs rounded transition-transform ${
                            formData.animation_style === 'bounce' ? 'hover:animate-bounce' :
                            formData.animation_style === 'pulse' ? 'hover:animate-pulse' :
                            'hover:scale-105'
                          } ${
                            formData.button_style === 'rounded' ? 'rounded-lg' :
                            formData.button_style === 'pill' ? 'rounded-full' :
                            formData.button_style === 'glassmorphism' ? 'rounded-lg backdrop-blur-sm bg-white/10 border border-white/20' :
                            formData.button_style === 'neon' ? 'rounded-lg border-2 border-current shadow-lg' :
                            formData.button_style === 'gradient' ? 'rounded-lg bg-gradient-to-r from-blue-500 to-purple-600' :
                            'rounded-none'
                          }`}
                          style={{
                            backgroundColor: formData.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' :
                                           formData.button_style === 'gradient' ? '' : item.background_color,
                            color: item.text_color,
                            boxShadow: formData.button_style === 'neon' ? `0 0 10px ${item.background_color}` : undefined
                          }}
                        >
                          {item.is_featured && '⭐ '}{item.title}
                        </div>
                      ))}

                      {linkTreeItems.length > 4 && (
                        <p className="text-xs opacity-60" style={{ color: formData.text_color }}>
                          +{linkTreeItems.length - 4} mais links
                        </p>
                      )}

                      {linkTreeItems.length === 0 && (
                        <p className="text-xs opacity-60" style={{ color: formData.text_color }}>
                          Adicione alguns links para ver o preview
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};