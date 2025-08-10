import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Trash2, ArrowLeft, Save, Eye, Image as ImageIcon, Code2, Edit3, Target, FormInput, Gift, Timer, BarChart3, Palette } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { ImageGallery } from './ImageGallery';
import { StepFormPageCustomizer } from './StepFormPageCustomizer';
import { VisualFlowEditor } from './VisualFlowEditor';

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
  tracking_config?: any; // JSONB
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export const StepFormBuilder: React.FC = () => {
  const [forms, setForms] = useState<StepFormData[]>([]);
  const [selectedForm, setSelectedForm] = useState<StepFormData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [editMode, setEditMode] = useState<'visual' | 'code'>('visual');
  const [trackingConfig, setTrackingConfig] = useState({
    facebook_pixel: false,
    google_analytics: false,
    google_tag_manager: false,
    pixel_id: '',
    ga_id: '',
    gtm_id: ''
  });

  useEffect(() => {
    loadForms();
  }, []);

  useEffect(() => {
    if (selectedForm?.id) {
      loadTrackingConfig(selectedForm.id);
    }
  }, [selectedForm?.id]);

  const loadTrackingConfig = async (formId: string) => {
    try {
      const { data, error } = await supabase
        .from('step_forms')
        .select('tracking_config')
        .eq('id', formId)
        .single();

      if (error) throw error;
      
      if (data?.tracking_config) {
        setTrackingConfig(data.tracking_config as any);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações de tracking:', error);
    }
  };

  const saveTrackingConfig = async () => {
    if (!selectedForm?.id) return;

    try {
      const { error } = await supabase
        .from('step_forms')
        .update({ tracking_config: trackingConfig })
        .eq('id', selectedForm.id);

      if (error) throw error;
      
      toast.success('Configurações de rastreamento salvas!');
    } catch (error) {
      console.error('Erro ao salvar tracking:', error);
      toast.error('Erro ao salvar configurações de rastreamento');
    }
  };

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
      tracking_config: {
        facebook_pixel: false,
        google_analytics: false,
        google_tag_manager: false,
        pixel_id: '',
        ga_id: '',
        gtm_id: ''
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
        tracking_config: trackingConfig,
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

        <Tabs value={editMode} onValueChange={(value) => setEditMode(value as 'visual' | 'code')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Editor Visual
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Editor de Código
            </TabsTrigger>
            <TabsTrigger value="page" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Personalização
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Depoimentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Editor Visual de Fluxo
                  {selectedForm.id && (
                    <Badge variant="outline" className="text-xs">
                      URL: /form/{selectedForm.slug}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VisualFlowEditor
                  onSave={(flow) => {
                    const convertedSteps = flow.nodes.map(node => ({
                      id: node.id,
                      title: node.data.title,
                      description: node.data.description,
                      type: node.type,
                      options: node.data.options,
                      formFields: node.data.formFields,
                      offerConfig: node.data.offerConfig,
                      timerConfig: node.data.timerConfig,
                      socialProofConfig: node.data.socialProofConfig,
                    }));
                    setSelectedForm({
                      ...selectedForm,
                      steps: convertedSteps
                    });
                    toast.success('Fluxo atualizado com sucesso!');
                  }}
                  initialFlow={{
                    nodes: selectedForm.steps?.map((step: any, index: number) => ({
                      id: step.id || `step_${index}`,
                      type: step.type || 'question',
                      position: { x: (index % 3) * 300, y: Math.floor(index / 3) * 200 },
                      data: {
                        title: step.title,
                        description: step.description,
                        options: step.options,
                        formFields: step.formFields,
                        offerConfig: step.offerConfig,
                        timerConfig: step.timerConfig,
                        socialProofConfig: step.socialProofConfig,
                      }
                    })) || [],
                    edges: []
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
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
                    <Label htmlFor="webhook_url">URL do Webhook</Label>
                    <Input
                      id="webhook_url"
                      value={selectedForm.webhook_url}
                      onChange={(e) => setSelectedForm({ ...selectedForm, webhook_url: e.target.value })}
                      placeholder="https://exemplo.com/webhook"
                    />
                  </div>
                </div>

                {/* Seção de Configurações de Rastreamento */}
                <Card>
                  <CardHeader>
                    <CardTitle>Códigos de Rastreamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="facebook_pixel"
                            checked={trackingConfig.facebook_pixel}
                            onCheckedChange={(checked) => 
                              setTrackingConfig(prev => ({ ...prev, facebook_pixel: checked }))
                            }
                          />
                          <Label htmlFor="facebook_pixel">Facebook Pixel</Label>
                        </div>
                        {trackingConfig.facebook_pixel && (
                          <Input
                            placeholder="ID do Pixel"
                            value={trackingConfig.pixel_id}
                            onChange={(e) => 
                              setTrackingConfig(prev => ({ ...prev, pixel_id: e.target.value }))
                            }
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="google_analytics"
                            checked={trackingConfig.google_analytics}
                            onCheckedChange={(checked) => 
                              setTrackingConfig(prev => ({ ...prev, google_analytics: checked }))
                            }
                          />
                          <Label htmlFor="google_analytics">Google Analytics</Label>
                        </div>
                        {trackingConfig.google_analytics && (
                          <Input
                            placeholder="ID do GA"
                            value={trackingConfig.ga_id}
                            onChange={(e) => 
                              setTrackingConfig(prev => ({ ...prev, ga_id: e.target.value }))
                            }
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="google_tag_manager"
                            checked={trackingConfig.google_tag_manager}
                            onCheckedChange={(checked) => 
                              setTrackingConfig(prev => ({ ...prev, google_tag_manager: checked }))
                            }
                          />
                          <Label htmlFor="google_tag_manager">Google Tag Manager</Label>
                        </div>
                        {trackingConfig.google_tag_manager && (
                          <Input
                            placeholder="ID do GTM"
                            value={trackingConfig.gtm_id}
                            onChange={(e) => 
                              setTrackingConfig(prev => ({ ...prev, gtm_id: e.target.value }))
                            }
                          />
                        )}
                      </div>
                    </div>
                    
                    <Button onClick={saveTrackingConfig} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Configurações de Rastreamento
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="page" className="space-y-6">
            <StepFormPageCustomizer
              formData={selectedForm}
              onUpdate={(field, value) => {
                setSelectedForm({ ...selectedForm, [field]: value });
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Galeria de Imagens */}
        <ImageGallery
          isOpen={showImageGallery}
          onClose={() => setShowImageGallery(false)}
          onSelectImage={(url) => {
            setSelectedForm({ ...selectedForm, logo_url: url });
            setShowImageGallery(false);
          }}
          selectedImage={selectedForm.logo_url}
        />
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