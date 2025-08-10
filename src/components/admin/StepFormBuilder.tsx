import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Plus, Trash2, ArrowLeft, ArrowRight, Save, Eye, Image as ImageIcon, Video as VideoIcon, Timer, Gift, CreditCard, Zap, Target, Gauge } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { ImageGallery } from './ImageGallery';
import { OfferConfigEditor, TimerConfigEditor, SocialProofConfigEditor } from './StepFormConfigEditors';

// Tipos baseados na estrutura da tabela step_forms
type StepFormData = {
  id?: string;
  name: string;
  slug: string;
  title: string;
  subtitle?: string;
  logo_url?: string;
  webhook_url: string;
  steps: any; // JSONB
  styles: any; // JSONB
  seo: any; // JSONB
  footer_config?: any; // JSONB
  seo_config?: any; // JSONB
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

interface StepFormStep {
  id: string;
  title: string;
  description?: string;
  type: 'question' | 'form' | 'content' | 'offer' | 'timer' | 'countdown' | 'quiz_result';
  options?: Array<{
    text: string;
    value: string;
    nextStep?: string;
    actionType?: 'next_step' | 'external_url';
  }>;
  formFields?: Array<{
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  mediaCaption?: string;
  buttonText?: string;
  buttonAction?: string;
  buttonActionType?: 'next_step' | 'external_url';
  backStep?: string;
  // Campos para carrossel
  carouselImages?: string[];
  carouselAutoplay?: boolean;
  carouselShowDots?: boolean;
  carouselInterval?: number;
  // Campos para dimensões de imagem/vídeo
  imageWidth?: string;
  imageHeight?: string;
  videoWidth?: string;
  videoHeight?: string;
  // Configurações adicionais de vídeo
  videoAutoplay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  // Novos campos para ofertas e elementos interativos
  offerConfig?: {
    title?: string;
    originalPrice?: string;
    salePrice?: string;
    discount?: string;
    features?: string[];
    ctaText?: string;
    ctaUrl?: string;
    urgencyText?: string;
  };
  timerConfig?: {
    duration?: number; // em minutos
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
    onExpireAction?: string;
    onExpireUrl?: string;
  };
  socialProofConfig?: {
    testimonials?: Array<{
      name: string;
      text: string;
      rating?: number;
      image?: string;
    }>;
    stats?: Array<{
      number: string;
      label: string;
    }>;
  };
}

export const StepFormBuilder: React.FC = () => {
  const [forms, setForms] = useState<StepFormData[]>([]);
  const [selectedForm, setSelectedForm] = useState<StepFormData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const { data, error } = await supabase
        .from('step_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setForms(data || []);
    } catch (error) {
      console.error('Erro ao carregar formulários:', error);
      toast.error('Erro ao carregar formulários');
    } finally {
      setLoading(false);
    }
  };

  const createNewForm = () => {
    const newForm: StepFormData = {
      name: 'Novo Formulário',
      slug: 'novo-formulario',
      title: 'Formulário Interativo',
      subtitle: 'Complete as etapas para prosseguir',
      webhook_url: '',
      steps: [{
        id: 'inicio',
        title: 'Bem-vindo',
        type: 'question',
        options: [
          { text: 'Começar', value: 'comecar', nextStep: 'step2', actionType: 'next_step' }
        ]
      }],
      styles: {
        primary_color: '#4CAF50',
        background_color: '#ffffff',
        text_color: '#000000',
        button_style: 'rounded'
      },
      seo: {
        meta_title: 'Formulário Interativo',
        meta_description: 'Complete nosso formulário interativo'
      },
      footer_config: {
        enabled: false,
        text: 'Atendemos todo o Brasil ✅',
        background_color: '#1a1a1a',
        text_color: '#ffffff',
        font_size: 'text-sm'
      },
      seo_config: {
        meta_title: 'Formulário Interativo',
        meta_description: 'Complete nosso formulário interativo',
        meta_keywords: ''
      },
      is_active: true
    };
    
    setSelectedForm(newForm);
    setIsCreating(true);
  };

  const saveForm = async () => {
    if (!selectedForm) return;

    try {
      const formData = {
        name: selectedForm.name,
        slug: selectedForm.slug,
        title: selectedForm.title,
        subtitle: selectedForm.subtitle,
        logo_url: selectedForm.logo_url,
        webhook_url: selectedForm.webhook_url,
        steps: selectedForm.steps,
        styles: selectedForm.styles,
        seo: selectedForm.seo,
        footer_config: selectedForm.footer_config,
        seo_config: selectedForm.seo_config,
        is_active: selectedForm.is_active
      };

      let error;
      if (selectedForm.id) {
        const { error: updateError } = await supabase
          .from('step_forms')
          .update(formData)
          .eq('id', selectedForm.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('step_forms')
          .insert([formData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success('Formulário salvo com sucesso!');
      setSelectedForm(null);
      setIsCreating(false);
      loadForms();
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
      toast.error('Erro ao salvar formulário');
    }
  };

  const addStep = (type: 'question' | 'form' | 'content' | 'offer' | 'timer' = 'question') => {
    if (!selectedForm) return;

    const baseStep = {
      id: `step_${Date.now()}`,
      title: 'Nova Etapa'
    };

    let newStep: StepFormStep;

    switch (type) {
      case 'question':
        newStep = {
          ...baseStep,
          type: 'question',
          options: [
            { text: 'Opção 1', value: 'opcao1', actionType: 'next_step' }
          ]
        };
        break;
      case 'form':
        newStep = {
          ...baseStep,
          type: 'form',
          formFields: [
            { name: 'name', type: 'text', placeholder: 'Digite seu nome', required: true }
          ]
        };
        break;
      case 'content':
        newStep = {
          ...baseStep,
          type: 'content',
          description: 'Adicione conteúdo de imagem ou vídeo',
          buttonText: 'Continuar',
          buttonAction: 'next',
          buttonActionType: 'next_step'
        };
        break;
      case 'offer':
        newStep = {
          ...baseStep,
          type: 'offer',
          title: 'Oferta Especial',
          description: 'Aproveite nossa oferta limitada',
          offerConfig: {
            title: 'Plano Premium',
            originalPrice: 'R$ 197,00',
            salePrice: 'R$ 97,00',
            discount: '50% OFF',
            features: ['Acesso completo', 'Suporte prioritário', 'Garantia 30 dias'],
            ctaText: 'Garantir Oferta',
            ctaUrl: '',
            urgencyText: 'Restam apenas 24 horas!'
          },
          buttonText: 'Garantir Agora',
          buttonActionType: 'external_url'
        };
        break;
      case 'timer':
        newStep = {
          ...baseStep,
          type: 'timer',
          title: 'Oferta por Tempo Limitado',
          description: 'Aproveite antes que o tempo acabe!',
          timerConfig: {
            duration: 30, // 30 minutos
            showHours: true,
            showMinutes: true,
            showSeconds: true,
            onExpireAction: 'redirect',
            onExpireUrl: ''
          },
          buttonText: 'Continuar',
          buttonActionType: 'next_step'
        };
        break;
      default:
        newStep = { ...baseStep, type: 'question', options: [] };
    }

    setSelectedForm({
      ...selectedForm,
      steps: [...selectedForm.steps, newStep]
    });
  };

  const updateStep = (stepIndex: number, field: keyof StepFormStep, value: any) => {
    if (!selectedForm) return;

    const updatedSteps = [...selectedForm.steps];
    updatedSteps[stepIndex] = {
      ...updatedSteps[stepIndex],
      [field]: value
    };

    setSelectedForm({
      ...selectedForm,
      steps: updatedSteps
    });
  };

  const deleteStep = (stepIndex: number) => {
    if (!selectedForm) return;

    const updatedSteps = selectedForm.steps.filter((_, index) => index !== stepIndex);
    setSelectedForm({
      ...selectedForm,
      steps: updatedSteps
    });
  };

  const deleteForm = async (formId: string) => {
    try {
      const { error } = await supabase
        .from('step_forms')
        .delete()
        .eq('id', formId);

      if (error) throw error;

      toast.success('Formulário excluído com sucesso!');
      loadForms();
    } catch (error) {
      console.error('Erro ao excluir formulário:', error);
      toast.error('Erro ao excluir formulário');
    }
  };

  // Funções auxiliares para styling
  const getStepBorderColor = (type: string) => {
    switch (type) {
      case 'question': return 'border-l-blue-500';
      case 'content': return 'border-l-purple-500';
      case 'form': return 'border-l-green-500';
      case 'offer': return 'border-l-orange-500';
      case 'timer': return 'border-l-red-500';
      
      default: return 'border-l-gray-500';
    }
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'text-blue-600 border-blue-200';
      case 'content': return 'text-purple-600 border-purple-200';
      case 'form': return 'text-green-600 border-green-200';
      case 'offer': return 'text-orange-600 border-orange-200';
      case 'timer': return 'text-red-600 border-red-200';
      
      default: return 'text-gray-600 border-gray-200';
    }
  };

  const getStepTypeLabel = (type: string) => {
    switch (type) {
      case 'question': return 'Pergunta';
      case 'content': return 'Conteúdo';
      case 'form': return 'Formulário';
      case 'offer': return 'Oferta';
      case 'timer': return 'Timer';
      
      default: return 'Desconhecido';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (selectedForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedForm(null);
              setIsCreating(false);
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? 'Editar' : 'Visualizar'}
            </Button>
            <Button onClick={saveForm}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Formulário
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Configurações Gerais
              {selectedForm.id && (
                <Badge variant="outline" className="text-xs">
                  URL: /form/{selectedForm.slug}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome do Formulário</Label>
                <Input
                  id="name"
                  value={selectedForm.name}
                  onChange={(e) => setSelectedForm({ ...selectedForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={selectedForm.slug}
                  onChange={(e) => setSelectedForm({ ...selectedForm, slug: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={selectedForm.title}
                  onChange={(e) => setSelectedForm({ ...selectedForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={selectedForm.subtitle || ''}
                  onChange={(e) => setSelectedForm({ ...selectedForm, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo do Formulário</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo_url"
                    value={selectedForm.logo_url || ''}
                    onChange={(e) => setSelectedForm({ ...selectedForm, logo_url: e.target.value })}
                    placeholder="URL da imagem ou selecione da galeria"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowImageGallery(true)}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Galeria
                  </Button>
                </div>
                {selectedForm.logo_url && (
                  <div className="mt-2">
                    <img 
                      src={selectedForm.logo_url} 
                      alt="Preview do logo" 
                      className="max-w-xs h-16 object-contain border rounded"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="webhook_url">Webhook URL</Label>
                <Input
                  id="webhook_url"
                  value={selectedForm.webhook_url}
                  onChange={(e) => setSelectedForm({ ...selectedForm, webhook_url: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Estilo e Footer */}
        <Card>
          <CardHeader>
            <CardTitle>Personalização e Footer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary_color">Cor Primária</Label>
                <Input
                  id="primary_color"
                  type="color"
                  value={selectedForm.styles?.primary_color || '#4CAF50'}
                  onChange={(e) => setSelectedForm({ 
                    ...selectedForm, 
                    styles: { ...selectedForm.styles, primary_color: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="background_color">Cor de Fundo</Label>
                <Input
                  id="background_color"
                  type="color"
                  value={selectedForm.styles?.background_color || '#ffffff'}
                  onChange={(e) => setSelectedForm({ 
                    ...selectedForm, 
                    styles: { ...selectedForm.styles, background_color: e.target.value }
                  })}
                />
              </div>
            </div>
            
            {/* Configuração do Footer */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="footer_enabled" className="text-base font-semibold">
                  Rodapé Personalizado
                </Label>
                <Switch
                  id="footer_enabled"
                  checked={selectedForm.footer_config?.enabled || false}
                  onCheckedChange={(checked) => setSelectedForm({ 
                    ...selectedForm, 
                    footer_config: { 
                      ...selectedForm.footer_config, 
                      enabled: checked 
                    }
                  })}
                />
              </div>
              
              {selectedForm.footer_config?.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-primary/20">
                  <div className="md:col-span-2">
                    <Label htmlFor="footer_text">Texto do Rodapé</Label>
                    <Textarea
                      id="footer_text"
                      value={selectedForm.footer_config?.text || ''}
                      onChange={(e) => setSelectedForm({ 
                        ...selectedForm, 
                        footer_config: { 
                          ...selectedForm.footer_config, 
                          text: e.target.value 
                        }
                      })}
                      placeholder="Ex: Atendemos todo o Brasil ✅"
                    />
                  </div>
                  <div>
                    <Label htmlFor="footer_bg_color">Cor de Fundo do Rodapé</Label>
                    <Input
                      id="footer_bg_color"
                      type="color"
                      value={selectedForm.footer_config?.background_color || '#1a1a1a'}
                      onChange={(e) => setSelectedForm({ 
                        ...selectedForm, 
                        footer_config: { 
                          ...selectedForm.footer_config, 
                          background_color: e.target.value 
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="footer_text_color">Cor do Texto do Rodapé</Label>
                    <Input
                      id="footer_text_color"
                      type="color"
                      value={selectedForm.footer_config?.text_color || '#ffffff'}
                      onChange={(e) => setSelectedForm({ 
                        ...selectedForm, 
                        footer_config: { 
                          ...selectedForm.footer_config, 
                          text_color: e.target.value 
                        }
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Etapas do Formulário</CardTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <Button onClick={() => addStep('question')} size="sm" variant="outline" className="flex flex-col h-auto py-3">
                  <Target className="w-4 h-4 mb-1" />
                  <span className="text-xs">Pergunta</span>
                </Button>
                <Button onClick={() => addStep('content')} size="sm" variant="outline" className="flex flex-col h-auto py-3">
                  <ImageIcon className="w-4 h-4 mb-1" />
                  <span className="text-xs">Conteúdo</span>
                </Button>
                <Button onClick={() => addStep('form')} size="sm" variant="outline" className="flex flex-col h-auto py-3">
                  <Plus className="w-4 h-4 mb-1" />
                  <span className="text-xs">Formulário</span>
                </Button>
                <Button onClick={() => addStep('offer')} size="sm" variant="outline" className="flex flex-col h-auto py-3">
                  <Gift className="w-4 h-4 mb-1" />
                  <span className="text-xs">Oferta</span>
                </Button>
                <Button onClick={() => addStep('timer')} size="sm" variant="outline" className="flex flex-col h-auto py-3">
                  <Timer className="w-4 h-4 mb-1" />
                  <span className="text-xs">Timer</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedForm.steps.map((step, index) => (
                <Card key={step.id} className={`border-l-4 ${getStepBorderColor(step.type)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="px-3 py-1">
                          Etapa {index + 1}
                        </Badge>
                        <Badge variant="outline" className={getStepTypeColor(step.type)}>
                          {getStepTypeLabel(step.type)}
                        </Badge>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteStep(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label className="text-sm font-medium">ID da Etapa</Label>
                        <Input
                          value={step.id}
                          onChange={(e) => updateStep(index, 'id', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Tipo</Label>
                        <Select
                          value={step.type}
                          onValueChange={(value) => updateStep(index, 'type', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="question">🎯 Pergunta/Escolha</SelectItem>
                            <SelectItem value="content">🎬 Conteúdo (Imagem/Vídeo)</SelectItem>
                            <SelectItem value="form">📝 Formulário</SelectItem>
                            <SelectItem value="offer">🎁 Oferta/Produto</SelectItem>
                            <SelectItem value="timer">⏰ Timer/Urgência</SelectItem>
                            
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="lg:col-span-2">
                        <Label className="text-sm font-medium">Título</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => updateStep(index, 'title', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <Label className="text-sm font-medium">Descrição (opcional)</Label>
                        <Textarea
                          value={step.description || ''}
                          onChange={(e) => updateStep(index, 'description', e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>

                     {step.type === 'question' && (
                       <div className="mt-6">
                         <div className="flex items-center justify-between mb-4">
                           <Label className="text-base font-semibold">Opções de Resposta</Label>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => {
                               const newOptions = [...(step.options || []), { text: '', value: '', nextStep: '' }];
                               updateStep(index, 'options', newOptions);
                             }}
                           >
                             <Plus className="w-4 h-4 mr-2" />
                             Adicionar Opção
                           </Button>
                         </div>
                         <div className="space-y-3">
                           {step.options?.map((option, optionIndex) => (
                             <Card key={optionIndex} className="p-4">
                               <div className="grid grid-cols-1 gap-3">
                                 <div>
                                   <Label className="text-sm font-medium">Texto do Botão</Label>
                                   <Input
                                     placeholder="Ex: Quero me divorciar"
                                     value={option.text}
                                     onChange={(e) => {
                                       const newOptions = [...(step.options || [])];
                                       newOptions[optionIndex] = { ...option, text: e.target.value };
                                       updateStep(index, 'options', newOptions);
                                     }}
                                   />
                                 </div>
                                 <div className="grid grid-cols-2 gap-3">
                                   <div>
                                     <Label className="text-sm font-medium">Valor (salvo nos dados)</Label>
                                     <Input
                                       placeholder="divorcio"
                                       value={option.value}
                                       onChange={(e) => {
                                         const newOptions = [...(step.options || [])];
                                         newOptions[optionIndex] = { ...option, value: e.target.value };
                                         updateStep(index, 'options', newOptions);
                                       }}
                                     />
                                   </div>
                                   <div>
                                     <Label className="text-sm font-medium">Próxima Etapa</Label>
                                     <div className="flex gap-1">
                                       <Input
                                         placeholder="ID da etapa ou URL"
                                         value={option.nextStep || ''}
                                         onChange={(e) => {
                                           const newOptions = [...(step.options || [])];
                                           newOptions[optionIndex] = { ...option, nextStep: e.target.value };
                                           updateStep(index, 'options', newOptions);
                                         }}
                                       />
                                       <Button
                                         variant="destructive"
                                         size="sm"
                                         onClick={() => {
                                           const newOptions = step.options?.filter((_, i) => i !== optionIndex) || [];
                                           updateStep(index, 'options', newOptions);
                                         }}
                                       >
                                         <Trash2 className="w-4 h-4" />
                                       </Button>
                                     </div>
                                   </div>
                                 </div>
                                 <div className="text-xs text-muted-foreground">
                                   💡 Dica: Use IDs de outras etapas (ex: "step2") ou URLs externos (ex: "https://site.com")
                                 </div>
                               </div>
                             </Card>
                           ))}
                         </div>
                       </div>
                     )}

                     {step.type === 'form' && (
                       <div className="mt-6">
                         <div className="flex items-center justify-between mb-4">
                           <Label className="text-base font-semibold">Campos do Formulário</Label>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => {
                               const newFields = [...(step.formFields || []), { 
                                 name: '', 
                                 type: 'text', 
                                 placeholder: '', 
                                 required: true 
                               }];
                               updateStep(index, 'formFields', newFields);
                             }}
                           >
                             <Plus className="w-4 h-4 mr-2" />
                             Adicionar Campo
                           </Button>
                         </div>
                         <div className="space-y-3">
                           {step.formFields?.map((field, fieldIndex) => (
                             <Card key={fieldIndex} className="p-4">
                               <div className="grid grid-cols-1 gap-3">
                                 <div className="grid grid-cols-2 gap-3">
                                   <div>
                                     <Label className="text-sm font-medium">Nome do Campo</Label>
                                     <Input
                                       placeholder="nome"
                                       value={field.name}
                                       onChange={(e) => {
                                         const newFields = [...(step.formFields || [])];
                                         newFields[fieldIndex] = { ...field, name: e.target.value };
                                         updateStep(index, 'formFields', newFields);
                                       }}
                                     />
                                   </div>
                                   <div>
                                     <Label className="text-sm font-medium">Tipo</Label>
                                     <Select
                                       value={field.type}
                                       onValueChange={(value) => {
                                         const newFields = [...(step.formFields || [])];
                                         newFields[fieldIndex] = { ...field, type: value };
                                         updateStep(index, 'formFields', newFields);
                                       }}
                                     >
                                       <SelectTrigger>
                                         <SelectValue />
                                       </SelectTrigger>
                                       <SelectContent>
                                         <SelectItem value="text">Texto</SelectItem>
                                         <SelectItem value="email">Email</SelectItem>
                                         <SelectItem value="tel">Telefone</SelectItem>
                                         <SelectItem value="textarea">Área de Texto</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </div>
                                 </div>
                                 <div>
                                   <Label className="text-sm font-medium">Placeholder</Label>
                                   <div className="flex gap-1">
                                     <Input
                                       placeholder="Digite seu nome"
                                       value={field.placeholder}
                                       onChange={(e) => {
                                         const newFields = [...(step.formFields || [])];
                                         newFields[fieldIndex] = { ...field, placeholder: e.target.value };
                                         updateStep(index, 'formFields', newFields);
                                       }}
                                     />
                                     <Button
                                       variant="destructive"
                                       size="sm"
                                       onClick={() => {
                                         const newFields = step.formFields?.filter((_, i) => i !== fieldIndex) || [];
                                         updateStep(index, 'formFields', newFields);
                                       }}
                                     >
                                       <Trash2 className="w-4 h-4" />
                                     </Button>
                                   </div>
                                 </div>
                               </div>
                             </Card>
                           ))}
                         </div>
                        </div>
                      )}

                        {(step.type === 'offer' || step.type === 'timer') && (
                          <div className="mt-6 space-y-4">
                            {step.type === 'offer' && <OfferConfigEditor step={step} updateStep={(field, value) => {
                              const updatedSteps = [...selectedForm.steps];
                              updatedSteps[index] = { ...updatedSteps[index], [field]: value };
                              setSelectedForm({ ...selectedForm, steps: updatedSteps });
                            }} />}
                            {step.type === 'timer' && <TimerConfigEditor step={step} updateStep={(field, value) => {
                              const updatedSteps = [...selectedForm.steps];
                              updatedSteps[index] = { ...updatedSteps[index], [field]: value };
                              setSelectedForm({ ...selectedForm, steps: updatedSteps });
                            }} />}
                          </div>
                        )}

                       {step.type === 'content' && (
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Tipo de Mídia</Label>
                              <Select
                                value={step.mediaType || 'image'}
                                onValueChange={(value) => updateStep(index, 'mediaType', value)}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="image">🖼️ Imagem</SelectItem>
                              <SelectItem value="video">🎥 Vídeo</SelectItem>
                              <SelectItem value="carousel">🎠 Carrossel de Imagens</SelectItem>
                            </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">URL da Mídia</Label>
                              <div className="flex gap-2 mt-1">
                                <Input
                                  value={step.mediaUrl || ''}
                                  onChange={(e) => updateStep(index, 'mediaUrl', e.target.value)}
                                  placeholder="https://example.com/media.jpg ou selecione da galeria"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setShowImageGallery(true)}
                                >
                                  <ImageIcon className="w-4 h-4 mr-2" />
                                  Galeria
                                </Button>
                              </div>
                            </div>
                            <div className="lg:col-span-2">
                              <Label className="text-sm font-medium">Legenda (opcional)</Label>
                              <Input
                                value={step.mediaCaption || ''}
                                onChange={(e) => updateStep(index, 'mediaCaption', e.target.value)}
                                placeholder="Legenda para a mídia"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Texto do Botão</Label>
                              <Input
                                value={step.buttonText || 'Continuar'}
                                onChange={(e) => updateStep(index, 'buttonText', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Ação do Botão</Label>
                              <Input
                                value={step.buttonAction || ''}
                                onChange={(e) => updateStep(index, 'buttonAction', e.target.value)}
                                placeholder="ID da próxima etapa ou URL"
                                className="mt-1"
                              />
                            </div>
                           </div>

                           {/* Configurações específicas para vídeo */}
                           {step.mediaType === 'video' && (
                             <div className="grid grid-cols-2 gap-4 mt-4">
                               <div className="space-y-4">
                                 <h4 className="font-medium">Configurações do Vídeo</h4>
                                 <div className="flex items-center space-x-2">
                                   <Switch
                                     id={`autoplay-${index}`}
                                     checked={step.videoAutoplay || false}
                                     onCheckedChange={(checked) => updateStep(index, 'videoAutoplay', checked)}
                                   />
                                   <Label htmlFor={`autoplay-${index}`}>Autoplay</Label>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                   <Switch
                                     id={`muted-${index}`}
                                     checked={step.videoMuted || false}
                                     onCheckedChange={(checked) => updateStep(index, 'videoMuted', checked)}
                                   />
                                   <Label htmlFor={`muted-${index}`}>Mudo</Label>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                   <Switch
                                     id={`loop-${index}`}
                                     checked={step.videoLoop || false}
                                     onCheckedChange={(checked) => updateStep(index, 'videoLoop', checked)}
                                   />
                                   <Label htmlFor={`loop-${index}`}>Loop</Label>
                                 </div>
                               </div>
                               <div className="space-y-4">
                                 <h4 className="font-medium">Dimensões</h4>
                                 <div>
                                   <Label className="text-sm">Largura</Label>
                                   <Input
                                     value={step.videoWidth || '560'}
                                     onChange={(e) => updateStep(index, 'videoWidth', e.target.value)}
                                     placeholder="560"
                                   />
                                 </div>
                                 <div>
                                   <Label className="text-sm">Altura</Label>
                                   <Input
                                     value={step.videoHeight || '315'}
                                     onChange={(e) => updateStep(index, 'videoHeight', e.target.value)}
                                     placeholder="315"
                                   />
                                 </div>
                               </div>
                             </div>
                           )}

                           {/* Configurações específicas para imagem */}
                           {step.mediaType === 'image' && (
                             <div className="grid grid-cols-2 gap-4 mt-4">
                               <div>
                                 <Label className="text-sm">Largura da Imagem</Label>
                                 <Input
                                   value={step.imageWidth || 'auto'}
                                   onChange={(e) => updateStep(index, 'imageWidth', e.target.value)}
                                   placeholder="auto ou 400px"
                                 />
                               </div>
                               <div>
                                 <Label className="text-sm">Altura da Imagem</Label>
                                 <Input
                                   value={step.imageHeight || '400px'}
                                   onChange={(e) => updateStep(index, 'imageHeight', e.target.value)}
                                   placeholder="400px"
                                 />
                               </div>
                             </div>
                           )}

                           {/* Configurações para carrossel */}
                           {step.mediaType === 'carousel' && (
                             <div className="space-y-4 mt-4">
                               <h4 className="font-medium">Configurações do Carrossel</h4>
                               <div className="grid grid-cols-2 gap-4">
                                 <div className="flex items-center space-x-2">
                                   <Switch
                                     id={`autoplay-carousel-${index}`}
                                     checked={step.carouselAutoplay || false}
                                     onCheckedChange={(checked) => updateStep(index, 'carouselAutoplay', checked)}
                                   />
                                   <Label htmlFor={`autoplay-carousel-${index}`}>Autoplay</Label>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                   <Switch
                                     id={`dots-${index}`}
                                     checked={step.carouselShowDots || true}
                                     onCheckedChange={(checked) => updateStep(index, 'carouselShowDots', checked)}
                                   />
                                   <Label htmlFor={`dots-${index}`}>Mostrar Pontos</Label>
                                 </div>
                               </div>
                               <div>
                                 <Label className="text-sm">Intervalo (ms)</Label>
                                 <Input
                                   type="number"
                                   value={step.carouselInterval || 5000}
                                   onChange={(e) => updateStep(index, 'carouselInterval', parseInt(e.target.value))}
                                   placeholder="5000"
                                 />
                               </div>
                               <div>
                                 <Label className="text-sm">URLs das Imagens (uma por linha)</Label>
                                 <Textarea
                                   rows={4}
                                   value={(step.carouselImages || []).join('\n')}
                                   onChange={(e) => updateStep(index, 'carouselImages', e.target.value.split('\n').filter(url => url.trim()))}
                                   placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                                 />
                               </div>
                             </div>
                           )}
                           
                           <div className="text-xs text-muted-foreground">
                             💡 Use para mostrar imagens ou vídeos explicativos. A ação do botão pode ser um ID de etapa ou URL externo.
                           </div>
                         </div>
                       )}
                   </CardContent>
                 </Card>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Construtor de Formulários Step</h2>
          <p className="text-muted-foreground">
            Crie formulários interativos com múltiplas etapas
          </p>
        </div>
        <Button onClick={createNewForm}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Formulário
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <Card key={form.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{form.name}</CardTitle>
                <Badge variant={form.is_active ? 'default' : 'secondary'}>
                  {form.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{form.title}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium mb-1">URL do Formulário:</p>
                  <p className="text-sm font-mono text-primary">
                    {window.location.origin}/form/{form.slug}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Etapas:</span> {form.steps.length}
                  </div>
                  <div>
                    <span className="font-medium">Webhook:</span>{' '}
                    {form.webhook_url ? '✅ Configurado' : '❌ Não configurado'}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/form/${form.slug}`, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedForm(form)}
                  >
                    Editar
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Excluir
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                      </DialogHeader>
                      <p>Tem certeza que deseja excluir o formulário "{form.name}"?</p>
                      <div className="flex gap-2 justify-end mt-4">
                        <Button variant="outline">Cancelar</Button>
                        <Button
                          variant="destructive"
                          onClick={() => form.id && deleteForm(form.id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {forms.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Nenhum formulário criado ainda
            </p>
            <Button onClick={createNewForm}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Formulário
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};