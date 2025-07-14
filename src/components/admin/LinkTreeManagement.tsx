import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { useLinkTree } from '@/hooks/useLinkTree';
import { useFormConfig } from '@/hooks/useFormConfig';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
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
  Grid,
  Crown,
  Diamond,
  Award,
  Scale,
  Shield,
  Briefcase,
  Star,
  Heart,
  MapPin,
  Calendar,
  Globe,
  Camera,
  Music,
  MessageCircle,
  ChevronDown,
  Upload,
  Wand2,
  Target,
  TrendingUp,
  Layout,
  Paintbrush,
  Code2,
  Sliders,
  Download,
  Mail,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

// Tipos de items premium para escritório de advocacia
const premiumItemTypes = [
  { value: 'legal-consultation', label: '⚖️ Consultoria Jurídica Premium', icon: Scale, description: 'Agendamento de consultoria especializada', color: '#1e40af' },
  { value: 'business-premium', label: '💼 Serviços Empresariais VIP', icon: Briefcase, description: 'Assessoria empresarial completa', color: '#7c3aed' },
  { value: 'testimonial', label: '⭐ Depoimentos de Clientes', icon: Star, description: 'Showcase de casos de sucesso', color: '#059669' },
  { value: 'award-showcase', label: '🏆 Prêmios e Reconhecimentos', icon: Award, description: 'Vitórias e reconhecimentos', color: '#dc2626' },
  { value: 'case-study', label: '📋 Estudos de Caso', icon: FileText, description: 'Casos de sucesso detalhados', color: '#ea580c' },
  { value: 'newsletter', label: '📧 Newsletter Jurídica', icon: MessageCircle, description: 'Inscrição em newsletter especializada', color: '#0891b2' },
  { value: 'download-premium', label: '📥 Downloads Exclusivos', icon: Download, description: 'Materiais jurídicos premium', color: '#7c2d12' },
  { value: 'webinar', label: '🎯 Webinars Jurídicos', icon: Target, description: 'Palestras e treinamentos online', color: '#365314' },
  { value: 'podcast', label: '🎙️ Podcast Jurídico', icon: Music, description: 'Conteúdo em áudio especializado', color: '#831843' },
  { value: 'live-chat', label: '💬 Chat Ao Vivo', icon: MessageCircle, description: 'Atendimento instantâneo', color: '#166534' },
  
  // Tipos básicos melhorados
  { value: 'link', label: '🔗 Link Direto', icon: LinkIcon, description: 'Link simples e direto', color: '#6366f1' },
  { value: 'card', label: '🎴 Card Visual Premium', icon: CreditCard, description: 'Card rico em conteúdo visual', color: '#8b5cf6' },
  { value: 'form', label: '📝 Formulário Inteligente', icon: FileText, description: 'Formulários do sistema', color: '#06b6d4' },
  { value: 'social', label: '📱 Redes Sociais', icon: Users, description: 'Links para redes sociais', color: '#ec4899' },
  { value: 'contact', label: '📞 Contato Direto', icon: Phone, description: 'WhatsApp, telefone, email', color: '#10b981' },
  { value: 'video', label: '🎥 Vídeo Showcase', icon: Video, description: 'Vídeos institucionais', color: '#f59e0b' },
  { value: 'gallery', label: '🖼️ Galeria Premium', icon: Grid, description: 'Galeria de imagens', color: '#ef4444' },
  { value: 'text', label: '📄 Texto Rico', icon: Type, description: 'Conteúdo textual formatado', color: '#84cc16' }
];

// Layouts premium
const premiumLayouts = [
  { value: 'grid', label: '🔲 Grade Clássica', description: 'Layout em grade tradicional' },
  { value: 'list', label: '📋 Lista Elegante', description: 'Lista vertical clean' },
  { value: 'masonry', label: '🧱 Masonry Dinâmico', description: 'Layout tipo Pinterest' },
  { value: 'carousel', label: '🎠 Carrossel Interativo', description: 'Slider horizontal' },
  { value: 'magazine', label: '📰 Estilo Revista', description: 'Layout editorial premium' },
  { value: 'portfolio', label: '🎨 Portfolio Profissional', description: 'Showcase visual avançado' }
];

// Temas premium para advocacia
const legalThemes = [
  { value: 'corporate', label: '🏢 Corporativo', colors: ['#1e40af', '#f8fafc', '#e11d48'] },
  { value: 'premium', label: '💎 Premium', colors: ['#7c3aed', '#f1f5f9', '#f59e0b'] },
  { value: 'gold', label: '🥇 Gold Elite', colors: ['#b45309', '#fefce8', '#059669'] },
  { value: 'platinum', label: '🥈 Platinum', colors: ['#475569', '#f8fafc', '#dc2626'] },
  { value: 'modern', label: '🔮 Moderno', colors: ['#6366f1', '#f8fafc', '#ec4899'] },
  { value: 'dark', label: '🌙 Dark Premium', colors: ['#0f172a', '#1e293b', '#8b5cf6'] },
  { value: 'minimal', label: '✨ Minimalista', colors: ['#374151', '#f9fafb', '#06b6d4'] },
  { value: 'colorful', label: '🌈 Vibrante', colors: ['#dc2626', '#fef2f2', '#16a34a'] }
];

// Ícones especializados para advocacia
const legalIcons = [
  { value: 'legal-consultation', label: '⚖️ Balança da Justiça', icon: Scale },
  { value: 'contract-review', label: '📄 Contratos', icon: FileText },
  { value: 'litigation', label: '🛡️ Litígio', icon: Shield },
  { value: 'compliance', label: '✅ Compliance', icon: CheckCircle },
  { value: 'business-law', label: '💼 Empresarial', icon: Briefcase },
  { value: 'family-law', label: '❤️ Família', icon: Heart },
  { value: 'criminal-defense', label: '🏆 Criminal', icon: Award },
  { value: 'real-estate', label: '📍 Imobiliário', icon: MapPin },
  { value: 'whatsapp-vip', label: '📱 WhatsApp VIP', icon: Phone },
  { value: 'email-premium', label: '✉️ Email Premium', icon: Mail },
  { value: 'video-call', label: '📹 Videochamada', icon: Video },
  { value: 'appointment', label: '📅 Agendamento', icon: Calendar },
  { value: 'portfolio', label: '👑 Portfolio', icon: Crown },
  { value: 'testimonials', label: '⭐ Depoimentos', icon: Star },
  { value: 'awards', label: '💎 Prêmios', icon: Diamond },
  { value: 'blog', label: '🌐 Blog', icon: Globe },
  { value: 'gallery', label: '📷 Galeria', icon: Camera },
  { value: 'music', label: '🎵 Podcast', icon: Music },
  { value: 'message', label: '💬 Mensagem', icon: MessageCircle }
];

export const LinkTreeManagement = () => {
  const { theme } = useTheme();
  const { multipleFormsConfig } = useFormConfig();
  
  const {
    linkTree,
    linkTreeItems,
    isLoading,
    saveLinkTree,
    saveLinkTreeItem,
    updateLinkTreeItem,
    deleteLinkTreeItem
  } = useLinkTree();

  // Formulários disponíveis para seleção
  const availableForms = multipleFormsConfig.forms.map(form => ({
    id: form.id,
    name: form.name,
    isDefault: multipleFormsConfig.defaultFormId === form.id
  }));

  const [formData, setFormData] = useState<Omit<LinkTree, 'id' | 'created_at' | 'updated_at'>>({
    title: 'Escritório Premium',
    description: 'Excelência jurídica com tradição e inovação',
    background_color: '#0f172a',
    text_color: '#ffffff',
    button_style: 'grid',
    avatar_url: '',
    theme: 'corporate',
    background_type: 'solid',
    background_gradient: 'linear-gradient(135deg, #1e40af, #7c3aed)',
    background_image: '',
    background_video: '',
    custom_css: '',
    animation_style: 'fade',
    show_analytics: true,
    is_active: true
  });

  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    icon: 'legal-consultation',
    background_color: '#1e40af',
    text_color: '#ffffff',
    button_style: 'inherit' as const,
    hover_effect: 'scale' as const,
    is_featured: false,
    item_type: 'legal-consultation' as ('link' | 'card' | 'form' | 'social' | 'product' | 'service' | 'contact' | 'video' | 'gallery' | 'text'),
    card_content: '',
    card_image: '',
    card_price: '',
    card_button_text: 'Consultar Agora',
    form_id: ''
  });

  const [activeTab, setActiveTab] = useState('design');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [selectedColors, setSelectedColors] = useState({
    primary: '#1e40af',
    secondary: '#f8fafc', 
    accent: '#e11d48'
  });

  useEffect(() => {
    if (linkTree) {
      setFormData({
        title: linkTree.title,
        description: linkTree.description || '',
        background_color: linkTree.background_color,
        text_color: linkTree.text_color,
        button_style: linkTree.button_style,
        avatar_url: linkTree.avatar_url || '',
        theme: linkTree.theme || 'corporate',
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

    try {
      const itemData = {
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
        display_order: linkTreeItems.length,
        is_active: true,
        click_count: 0
      };

      await saveLinkTreeItem(itemData);
      
      // Reset form
      setNewItem({
        title: '',
        url: '',
        icon: 'legal-consultation',
        background_color: selectedColors.primary,
        text_color: '#ffffff',
        button_style: 'inherit',
        hover_effect: 'scale',
        is_featured: false,
        item_type: 'legal-consultation',
        card_content: '',
        card_image: '',
        card_price: '',
        card_button_text: 'Consultar Agora',
        form_id: ''
      });

      toast.success('Item adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      toast.error('Erro ao adicionar item');
    }
  };

  const updateItem = async (id: string, updates: Partial<LinkTreeItem>) => {
    try {
      await updateLinkTreeItem(id, updates);
      toast.success('Item atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      toast.error('Erro ao atualizar item');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteLinkTreeItem(id);
      toast.success('Item removido!');
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast.error('Erro ao remover item');
    }
  };

  const applyTheme = (themeKey: string) => {
    const theme = legalThemes.find(t => t.value === themeKey);
    if (theme) {
      setSelectedColors({
        primary: theme.colors[0],
        secondary: theme.colors[1],
        accent: theme.colors[2]
      });
      setFormData(prev => ({
        ...prev,
        theme: themeKey as any,
        background_color: theme.colors[0],
        text_color: themeKey === 'dark' ? '#ffffff' : '#000000'
      }));
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
      {/* Header Premium */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Link Tree Professional
        </h1>
        <p className="text-muted-foreground">
          Sistema avançado de links para escritórios de alto padrão
        </p>
        <Badge className="mt-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">
          <Crown className="w-4 h-4 mr-1" />
          PREMIUM EDITION
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Painel de Controle */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="design" className="text-xs">
                <Paintbrush className="w-4 h-4 mr-1" />
                Design
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">
                <Layout className="w-4 h-4 mr-1" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="items" className="text-xs">
                <Layers className="w-4 h-4 mr-1" />
                Items
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs">
                <Settings className="w-4 h-4 mr-1" />
                Avançado
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Tab Design */}
            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Identidade Visual Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Informações Básicas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título do Escritório</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Nome do Escritório"
                      />
                    </div>
                    <div>
                      <Label>Avatar/Logo</Label>
                      <Input
                        value={formData.avatar_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
                        placeholder="URL da imagem"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Descrição Premium</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva a excelência do seu escritório..."
                      rows={3}
                    />
                  </div>

                  {/* Temas Pré-definidos */}
                  <div>
                    <Label className="text-lg font-semibold">Temas Profissionais</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {legalThemes.map((theme) => (
                        <Card 
                          key={theme.value}
                          className={`cursor-pointer transition-all hover:scale-105 ${
                            formData.theme === theme.value ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => applyTheme(theme.value)}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-2 mb-2">
                              {theme.colors.map((color, i) => (
                                <div 
                                  key={i}
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <p className="text-xs font-medium">{theme.label}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Cores Personalizadas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Cor Primária</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={selectedColors.primary}
                          onChange={(e) => {
                            setSelectedColors(prev => ({ ...prev, primary: e.target.value }));
                            setFormData(prev => ({ ...prev, background_color: e.target.value }));
                          }}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={selectedColors.primary}
                          onChange={(e) => {
                            setSelectedColors(prev => ({ ...prev, primary: e.target.value }));
                            setFormData(prev => ({ ...prev, background_color: e.target.value }));
                          }}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={selectedColors.secondary}
                          onChange={(e) => setSelectedColors(prev => ({ ...prev, secondary: e.target.value }))}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={selectedColors.secondary}
                          onChange={(e) => setSelectedColors(prev => ({ ...prev, secondary: e.target.value }))}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cor de Destaque</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={selectedColors.accent}
                          onChange={(e) => setSelectedColors(prev => ({ ...prev, accent: e.target.value }))}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={selectedColors.accent}
                          onChange={(e) => setSelectedColors(prev => ({ ...prev, accent: e.target.value }))}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tipo de Fundo */}
                  <div>
                    <Label>Fundo Premium com Neural</Label>
                    <Select 
                      value={formData.background_type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, background_type: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">🎨 Cor Sólida + Neural</SelectItem>
                        <SelectItem value="gradient">🌈 Gradiente + Neural</SelectItem>
                        <SelectItem value="image">🖼️ Imagem + Neural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.background_type === 'gradient' && (
                    <div>
                      <Label>CSS Gradiente</Label>
                      <Input
                        value={formData.background_gradient}
                        onChange={(e) => setFormData(prev => ({ ...prev, background_gradient: e.target.value }))}
                        placeholder="linear-gradient(135deg, #1e40af, #7c3aed)"
                      />
                    </div>
                  )}

                  {formData.background_type === 'image' && (
                    <div>
                      <Label>URL da Imagem de Fundo</Label>
                      <Input
                        value={formData.background_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, background_image: e.target.value }))}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Layout */}
            <TabsContent value="layout" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Layouts Profissionais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {premiumLayouts.map((layout) => (
                      <Card 
                        key={layout.value}
                        className={`cursor-pointer transition-all hover:scale-105 ${
                          formData.button_style === layout.value ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, button_style: layout.value as any }))}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{layout.label}</h3>
                          <p className="text-sm text-muted-foreground">{layout.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Items */}
            <TabsContent value="items" className="space-y-6">
              {/* Adicionar Novo Item */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Adicionar Item Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={newItem.title}
                        onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ex: Consultoria Jurídica Premium"
                      />
                    </div>
                    <div>
                      <Label>URL (opcional para formulários)</Label>
                      <Input
                        value={newItem.url}
                        onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo de Item</Label>
                      <Select 
                        value={newItem.item_type} 
                        onValueChange={(value) => setNewItem(prev => ({ ...prev, item_type: value as any }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {premiumItemTypes.map((type) => (
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
                    <div>
                      <Label>Ícone Especializado</Label>
                      <Select 
                        value={newItem.icon} 
                        onValueChange={(value) => setNewItem(prev => ({ ...prev, icon: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {legalIcons.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              <div className="flex items-center gap-2">
                                <icon.icon className="w-4 h-4" />
                                {icon.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Configurações específicas para Cards */}
                  {newItem.item_type === 'card' && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold">Configurações do Card Premium</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Imagem do Card</Label>
                          <Input
                            value={newItem.card_image}
                            onChange={(e) => setNewItem(prev => ({ ...prev, card_image: e.target.value }))}
                            placeholder="URL da imagem"
                          />
                        </div>
                        <div>
                          <Label>Preço/Valor</Label>
                          <Input
                            value={newItem.card_price}
                            onChange={(e) => setNewItem(prev => ({ ...prev, card_price: e.target.value }))}
                            placeholder="Ex: Consulta Grátis"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Descrição do Card</Label>
                        <Textarea
                          value={newItem.card_content}
                          onChange={(e) => setNewItem(prev => ({ ...prev, card_content: e.target.value }))}
                          placeholder="Descrição detalhada do serviço..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Texto do Botão</Label>
                        <Input
                          value={newItem.card_button_text}
                          onChange={(e) => setNewItem(prev => ({ ...prev, card_button_text: e.target.value }))}
                          placeholder="Ex: Consultar Agora"
                        />
                      </div>
                    </div>
                  )}

                  {/* Configurações específicas para Formulários */}
                  {newItem.item_type === 'form' && (
                    <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold">Configurações do Formulário</h4>
                      <div>
                        <Label>Selecionar Formulário Existente</Label>
                        <Select
                          value={newItem.form_id}
                          onValueChange={(value) => setNewItem(prev => ({ ...prev, form_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha um formulário" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableForms.map((form) => (
                              <SelectItem key={form.id} value={form.id || ''}>
                                {form.name} {form.isDefault && '(Principal)'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          Os formulários são gerenciados em Conteúdo Geral &gt; Formulários de Contato
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newItem.is_featured}
                      onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, is_featured: checked }))}
                    />
                    <Label>Item em Destaque</Label>
                  </div>

                  <Button onClick={handleAddItem} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Item Premium
                  </Button>
                </CardContent>
              </Card>

              {/* Lista de Items Existentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Items Existentes ({linkTreeItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {linkTreeItems.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.item_type} • {item.is_featured ? 'Destaque' : 'Normal'}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateItem(item.id, { is_featured: !item.is_featured })}
                            >
                              <Star className={`w-4 h-4 ${item.is_featured ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Avançado */}
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Configurações Avançadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Animações</Label>
                    <Select 
                      value={formData.animation_style} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, animation_style: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sem Animação</SelectItem>
                        <SelectItem value="fade">Fade Elegante</SelectItem>
                        <SelectItem value="slide">Slide Suave</SelectItem>
                        <SelectItem value="bounce">Bounce Dinâmico</SelectItem>
                        <SelectItem value="pulse">Pulse Sutil</SelectItem>
                        <SelectItem value="glow">Glow Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>CSS Personalizado</Label>
                    <Textarea
                      value={formData.custom_css}
                      onChange={(e) => setFormData(prev => ({ ...prev, custom_css: e.target.value }))}
                      placeholder="/* CSS personalizado para seu escritório */"
                      rows={6}
                      className="font-mono"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.show_analytics}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_analytics: checked }))}
                    />
                    <Label>Habilitar Analytics Premium</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analytics Profissional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Total de Cliques</p>
                          <p className="text-2xl font-bold">
                            {linkTreeItems.reduce((total, item) => total + (item.click_count || 0), 0)}
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 opacity-80" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Items Ativos</p>
                          <p className="text-2xl font-bold">{linkTreeItems.length}</p>
                        </div>
                        <Layers className="w-8 h-8 opacity-80" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Items Premium</p>
                          <p className="text-2xl font-bold">
                            {linkTreeItems.filter(item => item.is_featured).length}
                          </p>
                        </div>
                        <Crown className="w-8 h-8 opacity-80" />
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Performance dos Items</h4>
                    <div className="space-y-2">
                      {linkTreeItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <span className="font-medium">{item.title}</span>
                          <Badge variant="secondary">{item.click_count || 0} cliques</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
            <Button variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Visualizar Públic
            </Button>
          </div>
        </div>

        {/* Preview Premium */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Preview Premium</h3>
            <div className="flex gap-2">
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div 
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              previewMode === 'mobile' ? 'max-w-sm mx-auto h-[700px]' : 'w-full h-[800px]'
            }`}
          >
            <LinkTreePreview 
              linkTree={formData as LinkTree} 
              linkTreeItems={linkTreeItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};