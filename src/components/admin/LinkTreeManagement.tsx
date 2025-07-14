import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { useLinkTree } from '@/hooks/useLinkTree';
import { LinkTree, LinkTreeItem, FormField } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
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
  Link as LinkIcon,
  Image,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

const themePresets = {
  netflix: {
    background_color: '#141414',
    text_color: '#ffffff',
    button_style: 'rounded' as const,
    animation_style: 'fade' as const,
    accent: '#e50914'
  },
  amazon: {
    background_color: '#232f3e',
    text_color: '#ffffff',
    button_style: 'rounded' as const,
    animation_style: 'slide' as const,
    accent: '#ff9900'
  },
  landing_page: {
    background_color: '#000000',
    text_color: '#ffffff',
    button_style: 'gradient' as const,
    animation_style: 'fade' as const,
    accent: '#8b5cf6'
  },
  futurista: {
    background_color: '#0a0a0a',
    text_color: '#00ff88',
    button_style: 'neon' as const,
    animation_style: 'glow' as const,
    accent: '#00ffff'
  },
  spotify: {
    background_color: '#121212',
    text_color: '#ffffff',
    button_style: 'pill' as const,
    animation_style: 'bounce' as const,
    accent: '#1db954'
  },
  discord: {
    background_color: '#2c2f33',
    text_color: '#ffffff',
    button_style: 'rounded' as const,
    animation_style: 'pulse' as const,
    accent: '#7289da'
  }
};

const availableForms = [
  { id: 'contact', name: 'Formulário de Contato Principal', description: 'Formulário padrão do site' },
  { id: 'consultation', name: 'Solicitação de Consulta', description: 'Para agendamento de consultas' },
  { id: 'quote', name: 'Solicitar Orçamento', description: 'Para solicitar cotações' }
];

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
    background_color: '#141414',
    text_color: '#ffffff',
    button_style: 'rounded',
    avatar_url: '',
    theme: 'netflix',
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
    item_type: 'link' as ('link' | 'card' | 'form'),
    card_content: '',
    card_image: '',
    card_price: '',
    card_button_text: 'Saiba Mais',
    form_id: '',
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
        theme: linkTree.theme || 'netflix',
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
      background_color: preset.background_color,
      text_color: preset.text_color,
      button_style: preset.button_style,
      animation_style: preset.animation_style
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

    if (newItem.item_type === 'form' && !newItem.form_id) {
      toast.error('Selecione um formulário para vincular');
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
        card_image: newItem.card_image,
        card_price: newItem.card_price,
        card_button_text: newItem.card_button_text,
        form_id: newItem.form_id,
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
        card_image: '',
        card_price: '',
        card_button_text: 'Saiba Mais',
        form_id: '',
        form_fields: []
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-black text-white min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
            🔥 Link Tree Pro
          </h2>
          <p className="text-gray-400 mt-2">
            Crie cards profissionais estilo Netflix, Amazon e muito mais
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
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
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
              <TabsTrigger value="design" className="flex items-center gap-2 text-white data-[state=active]:bg-red-600">
                <Palette className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2 text-white data-[state=active]:bg-red-600">
                <Layers className="w-4 h-4" />
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center gap-2 text-white data-[state=active]:bg-red-600">
                <Zap className="w-4 h-4" />
                Items
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2 text-white data-[state=active]:bg-red-600">
                <Settings className="w-4 h-4" />
                Avançado
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-6 mt-6">
              {/* Temas Revolucionários */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    🔥 Themes Revolucionários - Design Autêntico
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    Cada theme tem layout único e estética completamente diferente
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.entries(themePresets).map(([name, preset]) => (
                      <div
                        key={name}
                        onClick={() => applyThemePreset(name as keyof typeof themePresets)}
                        className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                          formData.theme === name 
                            ? `border-${preset.accent.replace('#', '')} bg-gradient-to-br from-${preset.accent.replace('#', '')}/10 to-black shadow-2xl shadow-${preset.accent.replace('#', '')}/25` 
                            : 'border-gray-700 bg-gradient-to-br from-gray-900 to-black hover:border-gray-500'
                        }`}
                      >
                        <div className="space-y-3">
                          <div 
                            className="w-full h-20 rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
                            style={{ backgroundColor: preset.background_color }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
                            <span className="text-white font-bold text-lg relative z-10">
                              {name === 'netflix' && 'NETFLIX'}
                              {name === 'amazon' && 'AMAZON'}
                              {name === 'landing_page' && 'STARTUP'}
                              {name === 'futurista' && 'CYBER'}
                              {name === 'spotify' && 'SPOTIFY'}
                              {name === 'discord' && 'DISCORD'}
                            </span>
                            <span className="text-white/80 text-xs relative z-10">
                              {name === 'netflix' && 'Cinema Style'}
                              {name === 'amazon' && 'E-commerce Style'}
                              {name === 'landing_page' && 'Startup Style'}
                              {name === 'futurista' && 'Cyberpunk Style'}
                              {name === 'spotify' && 'Music Style'}
                              {name === 'discord' && 'Gaming Style'}
                            </span>
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-sm" style={{ color: preset.accent }}>
                              {name === 'netflix' && '🎬 Cinematográfico'}
                              {name === 'amazon' && '📦 E-commerce Pro'}
                              {name === 'landing_page' && '🚀 Startup Pro'}
                              {name === 'futurista' && '🤖 Cyberpunk'}
                              {name === 'spotify' && '🎵 Musical'}
                              {name === 'discord' && '💬 Gaming'}
                            </h3>
                            <p className="text-gray-400 text-xs mt-1">
                              {name === 'netflix' && 'Layout estilo streaming premium'}
                              {name === 'amazon' && 'Cards estilo marketplace'}
                              {name === 'landing_page' && 'Design moderno e conversivo'}
                              {name === 'futurista' && 'Interface do futuro'}
                              {name === 'spotify' && 'Interface de streaming'}
                              {name === 'discord' && 'Interface gamer'}
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <span 
                              className={`text-xs px-3 py-1 rounded-full transition-all duration-300 ${
                                formData.theme === name 
                                  ? 'text-white' 
                                  : 'bg-gray-700 text-gray-300 group-hover:text-white'
                              }`}
                              style={{
                                backgroundColor: formData.theme === name ? preset.accent : undefined,
                                ...(formData.theme !== name && {
                                  '--hover-bg': preset.accent
                                })
                              }}
                            >
                              {formData.theme === name ? '✓ Ativo' : 'Ativar'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Preview em Tempo Real */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Eye className="w-5 h-5 text-blue-500" />
                    Preview em Tempo Real
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    Visualize as mudanças instantaneamente
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-2xl p-4 max-h-96 overflow-y-auto">
                    <LinkTreePreview 
                      linkTree={{
                        ...formData,
                        id: linkTree?.id || '',
                        created_at: linkTree?.created_at,
                        updated_at: linkTree?.updated_at
                      } as LinkTree}
                      linkTreeItems={linkTreeItems}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Personalização de Cores */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Personalização</CardTitle>
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
                    <Label className="text-gray-300">URL da Imagem/Avatar (formato retangular)</Label>
                    <Input
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Será exibida em formato retangular sem corte circular
                    </p>
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
                      onValueChange={(value: 'link' | 'card' | 'form') => setNewItem({ ...newItem, item_type: value })}
                    >
                      <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="link" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4" />
                            Link Simples
                          </div>
                        </SelectItem>
                        <SelectItem value="card" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Card Netflix/Hotmart
                          </div>
                        </SelectItem>
                        <SelectItem value="form" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Formulário Existente
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
                        placeholder="Ex: Meu Curso Premium"
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
                    <div className="space-y-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
                      <h4 className="text-white font-medium flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Configuração do Card (Estilo Netflix/Hotmart)
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">URL da Imagem</Label>
                          <Input
                            value={newItem.card_image}
                            onChange={(e) => setNewItem({ ...newItem, card_image: e.target.value })}
                            placeholder="https://exemplo.com/curso.jpg"
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Preço (opcional)</Label>
                          <Input
                            value={newItem.card_price}
                            onChange={(e) => setNewItem({ ...newItem, card_price: e.target.value })}
                            placeholder="R$ 297,00"
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-300">Descrição do Card</Label>
                        <Textarea
                          value={newItem.card_content}
                          onChange={(e) => setNewItem({ ...newItem, card_content: e.target.value })}
                          placeholder="Aprenda a dominar as técnicas mais avançadas..."
                          className="mt-1 bg-gray-700 border-gray-600 text-white"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Texto do Botão</Label>
                          <Input
                            value={newItem.card_button_text}
                            onChange={(e) => setNewItem({ ...newItem, card_button_text: e.target.value })}
                            placeholder="Comprar Agora"
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">URL do Card</Label>
                          <Input
                            value={newItem.url}
                            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                            placeholder="https://hotmart.com/produto"
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {newItem.item_type === 'form' && (
                    <div className="space-y-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
                      <h4 className="text-white font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Vincular Formulário Existente
                      </h4>
                      
                      <div>
                        <Label className="text-gray-300">Selecionar Formulário</Label>
                        <Select
                          value={newItem.form_id}
                          onValueChange={(value) => setNewItem({ ...newItem, form_id: value })}
                        >
                          <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Escolha um formulário do site" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            {availableForms.map((form) => (
                              <SelectItem key={form.id} value={form.id} className="text-white hover:bg-gray-600">
                                <div>
                                  <div className="font-medium">{form.name}</div>
                                  <div className="text-xs text-gray-400">{form.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleAddItem}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
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
                    <div className="space-y-3">
                      {linkTreeItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <div>
                              <span className="text-white font-medium">{item.title}</span>
                              <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                                {item.item_type === 'link' && <LinkIcon className="w-3 h-3" />}
                                {item.item_type === 'card' && <CreditCard className="w-3 h-3" />}
                                {item.item_type === 'form' && <FileText className="w-3 h-3" />}
                                {item.item_type.toUpperCase()}
                                {item.item_type === 'link' && item.url && ` • ${item.url}`}
                                {item.item_type === 'card' && item.card_price && ` • ${item.card_price}`}
                                {item.item_type === 'form' && item.form_id && ` • Formulário: ${item.form_id}`}
                                {item.click_count > 0 && ` • ${item.click_count} interações`}
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
                      <p className="text-xs text-gray-400">Mostra contadores de interações</p>
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
                    className={previewMode === 'mobile' ? 'bg-red-600' : 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700'}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setPreviewMode('desktop')}
                    size="sm"
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    className={previewMode === 'desktop' ? 'bg-red-600' : 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700'}
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
                      <span className="text-white font-medium">{item.click_count} interações</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white">
                      {linkTreeItems.reduce((total, item) => total + item.click_count, 0)} interações
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