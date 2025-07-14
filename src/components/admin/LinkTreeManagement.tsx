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
  DollarSign,
  Users,
  Phone,
  Video,
  Type,
  Grid
} from 'lucide-react';
import { toast } from 'sonner';

const newItemTypes = [
  { value: 'link', label: '🔗 Link Simples', icon: LinkIcon, description: 'Link direto para qualquer URL' },
  { value: 'card', label: '🎴 Card Premium', icon: CreditCard, description: 'Card visual estilo Netflix/Hotmart' },
  { value: 'form', label: '📝 Formulário', icon: FileText, description: 'Conectar com formulários do site' },
  { value: 'social', label: '📱 Rede Social', icon: Users, description: 'Links para redes sociais' },
  { value: 'product', label: '🛒 Produto', icon: DollarSign, description: 'Showcase de produtos' },
  { value: 'service', label: '⚡ Serviço', icon: Zap, description: 'Destaque de serviços' },
  { value: 'contact', label: '📞 Contato Direto', icon: Phone, description: 'WhatsApp, telefone, email' },
  { value: 'video', label: '🎥 Vídeo', icon: Video, description: 'Embed de vídeos' },
  { value: 'gallery', label: '🖼️ Galeria', icon: Grid, description: 'Galeria de imagens' },
  { value: 'text', label: '📄 Texto Rico', icon: Type, description: 'Bloco de texto formatado' }
];

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
    background_color: '#000000',
    text_color: '#ffffff',
    button_style: 'rounded',
    avatar_url: '',
    theme: 'custom',
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
    background_color: '#6366f1',
    text_color: '#ffffff',
    button_style: 'inherit' as const,
    hover_effect: 'scale' as const,
    is_featured: false,
    item_type: 'link' as ('link' | 'card' | 'form' | 'social' | 'product' | 'service' | 'contact' | 'video' | 'gallery' | 'text'),
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
        theme: linkTree.theme || 'custom',
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

  const handleSave = async () => {
    try {
      await saveLinkTree(formData);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar configurações');
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
        background_color: '#6366f1',
        text_color: '#ffffff',
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
      
      toast.success('Item adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      toast.error('Erro ao adicionar item');
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
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Link Tree Pro Max
          </h2>
          <p className="text-gray-400 mt-2">
            Sistema totalmente personalizável com fundo neural e funcionalidades avançadas
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-6">
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
              {/* Personalização Total */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Palette className="w-5 h-5 text-purple-500" />
                    🎨 Personalização Total
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    Crie seu design único com controle total sobre cores, layouts e estilos
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Cores */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="background_color" className="text-white">Cor de Fundo</Label>
                      <div className="flex gap-2">
                        <Input
                          id="background_color"
                          type="color"
                          value={formData.background_color}
                          onChange={(e) => setFormData(prev => ({ ...prev, background_color: e.target.value }))}
                          className="w-16 h-10 p-1 border-gray-600 bg-gray-800"
                        />
                        <Input
                          type="text"
                          value={formData.background_color}
                          onChange={(e) => setFormData(prev => ({ ...prev, background_color: e.target.value }))}
                          className="flex-1 bg-gray-800 border-gray-600 text-white"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="text_color" className="text-white">Cor do Texto</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text_color"
                          type="color"
                          value={formData.text_color}
                          onChange={(e) => setFormData(prev => ({ ...prev, text_color: e.target.value }))}
                          className="w-16 h-10 p-1 border-gray-600 bg-gray-800"
                        />
                        <Input
                          type="text"
                          value={formData.text_color}
                          onChange={(e) => setFormData(prev => ({ ...prev, text_color: e.target.value }))}
                          className="flex-1 bg-gray-800 border-gray-600 text-white"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tipo de Fundo */}
                  <div>
                    <Label className="text-white">Tipo de Fundo</Label>
                    <Select 
                      value={formData.background_type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, background_type: value as any }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">🎨 Cor Sólida + Neural</SelectItem>
                        <SelectItem value="gradient">🌈 Gradiente + Neural</SelectItem>
                        <SelectItem value="image">🖼️ Imagem + Neural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gradiente */}
                  {formData.background_type === 'gradient' && (
                    <div>
                      <Label htmlFor="background_gradient" className="text-white">CSS Gradiente</Label>
                      <Input
                        id="background_gradient"
                        value={formData.background_gradient}
                        onChange={(e) => setFormData(prev => ({ ...prev, background_gradient: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="linear-gradient(45deg, #ff0000, #0000ff)"
                      />
                    </div>
                  )}

                  {/* Imagem de Fundo */}
                  {formData.background_type === 'image' && (
                    <div>
                      <Label htmlFor="background_image" className="text-white">URL da Imagem</Label>
                      <Input
                        id="background_image"
                        value={formData.background_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, background_image: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  )}

                  {/* Estilos de Botão */}
                  <div>
                    <Label className="text-white">Estilo dos Botões</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { value: 'rounded', label: '📱 Arredondado', preview: '8px' },
                        { value: 'square', label: '⬜ Quadrado', preview: '0px' },
                        { value: 'pill', label: '💊 Pill', preview: '24px' }
                      ].map((style) => (
                        <div
                          key={style.value}
                          onClick={() => setFormData(prev => ({ ...prev, button_style: style.value as any }))}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.button_style === style.value
                              ? 'border-purple-500 bg-purple-900/20'
                              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          }`}
                        >
                          <div className="text-center">
                            <div 
                              className="w-full h-8 bg-purple-600 mb-2"
                              style={{ borderRadius: style.preview }}
                            />
                            <span className="text-xs text-white">{style.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animações */}
                  <div>
                    <Label className="text-white">Estilo de Animação</Label>
                    <Select 
                      value={formData.animation_style} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, animation_style: value as any }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sem animação</SelectItem>
                        <SelectItem value="fade">✨ Fade In</SelectItem>
                        <SelectItem value="slide">🎯 Slide</SelectItem>
                        <SelectItem value="bounce">🏀 Bounce</SelectItem>
                        <SelectItem value="pulse">💓 Pulse</SelectItem>
                        <SelectItem value="glow">⚡ Glow</SelectItem>
                      </SelectContent>
                    </Select>
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
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Seu nome ou marca"
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Descrição</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Uma breve descrição sobre você"
                      className="mt-1 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">URL da Imagem/Avatar (formato retangular)</Label>
                    <Input
                      value={formData.avatar_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
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
                    ➕ Adicionar Novo Item
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Tipo de Item</Label>
                    <Select 
                      value={newItem.item_type} 
                      onValueChange={(value) => setNewItem(prev => ({ ...prev, item_type: value as any }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {newItemTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Título</Label>
                      <Input
                        value={newItem.title}
                        onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ex: Meu Curso Premium"
                        className="mt-1 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    
                    {(newItem.item_type === 'link' || newItem.item_type === 'social' || newItem.item_type === 'contact') && (
                      <div>
                        <Label className="text-gray-300">URL</Label>
                        <Input
                          value={newItem.url}
                          onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://..."
                          className="mt-1 bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Cores dos Botões */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Cor do Botão</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={newItem.background_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                          className="w-16 h-10 p-1 border-gray-600 bg-gray-800"
                        />
                        <Input
                          type="text"
                          value={newItem.background_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, background_color: e.target.value }))}
                          className="flex-1 bg-gray-800 border-gray-600 text-white"
                          placeholder="#6366f1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Cor do Texto</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={newItem.text_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                          className="w-16 h-10 p-1 border-gray-600 bg-gray-800"
                        />
                        <Input
                          type="text"
                          value={newItem.text_color}
                          onChange={(e) => setNewItem(prev => ({ ...prev, text_color: e.target.value }))}
                          className="flex-1 bg-gray-800 border-gray-600 text-white"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Específico */}
                  {(newItem.item_type === 'card' || newItem.item_type === 'product' || newItem.item_type === 'service') && (
                    <div className="space-y-4 border-t border-gray-700 pt-4">
                      <h4 className="text-white font-semibold">🎴 Configurações do Card</h4>
                      
                      <div>
                        <Label className="text-gray-300">URL da Imagem (Capa)</Label>
                        <Input
                          value={newItem.card_image}
                          onChange={(e) => setNewItem(prev => ({ ...prev, card_image: e.target.value }))}
                          placeholder="https://exemplo.com/capa.jpg"
                          className="mt-1 bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-gray-300">Descrição do Card</Label>
                        <Textarea
                          value={newItem.card_content}
                          onChange={(e) => setNewItem(prev => ({ ...prev, card_content: e.target.value }))}
                          placeholder="Descrição detalhada do produto/serviço..."
                          className="mt-1 bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Preço (opcional)</Label>
                          <Input
                            value={newItem.card_price}
                            onChange={(e) => setNewItem(prev => ({ ...prev, card_price: e.target.value }))}
                            placeholder="R$ 299,90"
                            className="mt-1 bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Texto do Botão</Label>
                          <Input
                            value={newItem.card_button_text}
                            onChange={(e) => setNewItem(prev => ({ ...prev, card_button_text: e.target.value }))}
                            placeholder="Comprar Agora"
                            className="mt-1 bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-gray-300">URL do Card (para onde vai ao clicar)</Label>
                        <Input
                          value={newItem.url}
                          onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://meusite.com/produto"
                          className="mt-1 bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Formulário */}
                  {newItem.item_type === 'form' && (
                    <div className="space-y-4 border-t border-gray-700 pt-4">
                      <h4 className="text-white font-semibold">📝 Configurações do Formulário</h4>
                      
                      <div>
                        <Label className="text-gray-300">Formulário Vinculado</Label>
                        <Select 
                          value={newItem.form_id} 
                          onValueChange={(value) => setNewItem(prev => ({ ...prev, form_id: value }))}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Selecione um formulário" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableForms.map((form) => (
                              <SelectItem key={form.id} value={form.id}>
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

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={newItem.is_featured}
                      onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, is_featured: checked }))}
                    />
                    <Label htmlFor="featured" className="text-gray-300">
                      ⭐ Item em destaque
                    </Label>
                  </div>

                  <Button onClick={handleAddItem} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Item
                  </Button>
                </CardContent>
              </Card>

              {/* Lista de Items */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">📋 Items do Link Tree</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {linkTreeItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{item.title}</div>
                            <div className="text-xs text-gray-400">{item.item_type} • {item.click_count} cliques</div>
                          </div>
                        </div>
                        <Button
                          onClick={() => deleteLinkTreeItem(item.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {linkTreeItems.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        Nenhum item adicionado ainda
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6 mt-6">
              {/* CSS Customizado */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Settings className="w-5 h-5 text-orange-500" />
                    ⚙️ Configurações Avançadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">CSS Customizado</Label>
                    <Textarea
                      value={formData.custom_css}
                      onChange={(e) => setFormData(prev => ({ ...prev, custom_css: e.target.value }))}
                      placeholder="/* Adicione seu CSS customizado aqui */"
                      className="mt-1 bg-gray-800 border-gray-600 text-white font-mono text-sm h-32"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Use classes CSS personalizadas para estilos únicos
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="analytics"
                      checked={formData.show_analytics}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_analytics: checked }))}
                    />
                    <Label htmlFor="analytics" className="text-gray-300">
                      📊 Mostrar Analytics (cliques dos items)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="active" className="text-gray-300">
                      ✅ Link Tree Ativo (visível publicamente)
                    </Label>
                  </div>

                  {/* Meta Tags */}
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-white font-semibold mb-3">🔍 SEO & Compartilhamento</h4>
                    <div className="text-sm text-gray-400">
                      <p>• Título: {formData.title}</p>
                      <p>• Descrição: {formData.description || 'Não definida'}</p>
                      <p>• URL: {window.location.origin}/tree</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          {/* Preview Controls */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  Preview em Tempo Real
                </span>
                <div className="flex gap-2">
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                    className="flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    Mobile
                  </Button>
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                    className="flex items-center gap-2"
                  >
                    <Monitor className="w-4 h-4" />
                    Desktop
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Preview Container */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <div 
              className={`mx-auto transition-all duration-300 ${
                previewMode === 'mobile' ? 'max-w-sm' : 'max-w-lg'
              }`}
              style={{ 
                height: '600px',
                transform: previewMode === 'mobile' ? 'scale(0.8)' : 'scale(0.7)',
                transformOrigin: 'top center'
              }}
            >
              {linkTree && (
                <LinkTreePreview 
                  linkTree={{ ...linkTree, ...formData }} 
                  linkTreeItems={linkTreeItems}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};