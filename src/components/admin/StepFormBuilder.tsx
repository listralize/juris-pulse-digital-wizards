import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Trash2, ArrowLeft, ArrowRight, Save, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface StepFormStep {
  id: string;
  title: string;
  description?: string;
  type: 'question' | 'form';
  options?: Array<{
    text: string;
    value: string;
    nextStep?: string;
  }>;
  formFields?: Array<{
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;
  backStep?: string;
}

interface StepForm {
  id?: string;
  name: string;
  slug: string;
  title: string;
  subtitle?: string;
  logo_url?: string;
  webhook_url: string;
  steps: StepFormStep[];
  styles: {
    primary_color: string;
    background_color: string;
    text_color: string;
    button_style: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
  };
  is_active: boolean;
}

export const StepFormBuilder: React.FC = () => {
  const [forms, setForms] = useState<StepForm[]>([]);
  const [selectedForm, setSelectedForm] = useState<StepForm | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

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
    const newForm: StepForm = {
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
          { text: 'Começar', value: 'comecar', nextStep: 'step2' }
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

  const addStep = () => {
    if (!selectedForm) return;

    const newStep: StepFormStep = {
      id: `step_${Date.now()}`,
      title: 'Nova Etapa',
      type: 'question',
      options: [
        { text: 'Opção 1', value: 'opcao1' }
      ]
    };

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
            <CardTitle>Configurações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <div>
                <Label htmlFor="logo_url">URL do Logo</Label>
                <Input
                  id="logo_url"
                  value={selectedForm.logo_url || ''}
                  onChange={(e) => setSelectedForm({ ...selectedForm, logo_url: e.target.value })}
                />
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Etapas do Formulário</CardTitle>
              <Button onClick={addStep} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Etapa
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedForm.steps.map((step, index) => (
                <Card key={step.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">Etapa {index + 1}</Badge>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteStep(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>ID da Etapa</Label>
                        <Input
                          value={step.id}
                          onChange={(e) => updateStep(index, 'id', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Tipo</Label>
                        <Select
                          value={step.type}
                          onValueChange={(value) => updateStep(index, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="question">Pergunta</SelectItem>
                            <SelectItem value="form">Formulário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Título</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => updateStep(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Descrição (opcional)</Label>
                        <Textarea
                          value={step.description || ''}
                          onChange={(e) => updateStep(index, 'description', e.target.value)}
                        />
                      </div>
                    </div>

                    {step.type === 'question' && (
                      <div className="mt-4">
                        <Label>Opções de Resposta</Label>
                        <div className="space-y-2 mt-2">
                          {step.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2">
                              <Input
                                placeholder="Texto da opção"
                                value={option.text}
                                onChange={(e) => {
                                  const newOptions = [...(step.options || [])];
                                  newOptions[optionIndex] = { ...option, text: e.target.value };
                                  updateStep(index, 'options', newOptions);
                                }}
                              />
                              <Input
                                placeholder="Valor"
                                value={option.value}
                                onChange={(e) => {
                                  const newOptions = [...(step.options || [])];
                                  newOptions[optionIndex] = { ...option, value: e.target.value };
                                  updateStep(index, 'options', newOptions);
                                }}
                              />
                              <Input
                                placeholder="Próxima etapa (ID)"
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
                          ))}
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
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>URL:</strong> /{form.slug}
                </p>
                <p className="text-sm">
                  <strong>Etapas:</strong> {form.steps.length}
                </p>
                <div className="flex gap-2 mt-4">
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