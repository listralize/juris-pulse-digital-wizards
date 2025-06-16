import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Save, TestTube, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';
import { FormFieldsManager } from './contact-form/FormFieldsManager';
import { FormConfig, FormField } from '../../types/contactFormTypes';
import { useFormConfig } from '../../hooks/useFormConfig';

const defaultFormConfig: FormConfig = {
  webhookUrl: '',
  serviceOptions: [
    { value: "familia", label: "Divórcio e questões familiares" },
    { value: "tributario", label: "Consultoria tributária" },
    { value: "empresarial", label: "Direito empresarial" },
    { value: "trabalho", label: "Direito trabalhista" },
    { value: "constitucional", label: "Direitos fundamentais" },
    { value: "administrativo", label: "Direito administrativo" },
    { value: "previdenciario", label: "Direito previdenciário" },
    { value: "consumidor", label: "Direito do consumidor" }
  ],
  formTexts: {
    headerTitle: "Como podemos ajudar você?",
    headerSubtitle: "Entre em contato conosco",
    submitButton: "Enviar mensagem",
    successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    errorMessage: "Erro ao enviar mensagem. Tente novamente."
  },
  customFields: [],
  allFields: [
    {
      id: 'name',
      name: 'name',
      label: 'Nome *',
      type: 'text',
      required: true,
      placeholder: 'Seu nome completo',
      order: 0,
      isDefault: true
    },
    {
      id: 'email',
      name: 'email',
      label: 'E-mail *',
      type: 'email',
      required: true,
      placeholder: 'Seu e-mail',
      order: 1,
      isDefault: true
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      required: false,
      placeholder: 'Seu telefone',
      order: 2,
      isDefault: true
    },
    {
      id: 'service',
      name: 'service',
      label: 'Qual problema você precisa resolver?',
      type: 'select',
      required: false,
      placeholder: 'Selecione seu problema jurídico',
      order: 3,
      isDefault: true
    },
    {
      id: 'message',
      name: 'message',
      label: 'Detalhes do seu caso *',
      type: 'textarea',
      required: true,
      placeholder: 'Conte-nos brevemente sobre o seu caso',
      order: 4,
      isDefault: true
    },
    {
      id: 'isUrgent',
      name: 'isUrgent',
      label: 'Preciso de atendimento urgente',
      type: 'checkbox',
      required: false,
      order: 5,
      isDefault: true
    }
  ]
};

export const ContactFormManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { multipleFormsConfig, setMultipleFormsConfig } = useFormConfig();
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const currentForm = multipleFormsConfig.forms[currentFormIndex] || defaultFormConfig;

  const updateCurrentForm = (updates: Partial<FormConfig>) => {
    const updatedForms = [...multipleFormsConfig.forms];
    updatedForms[currentFormIndex] = { ...currentForm, ...updates };
    setMultipleFormsConfig({
      ...multipleFormsConfig,
      forms: updatedForms
    });
  };

  const addNewForm = () => {
    const newForm: FormConfig = {
      ...defaultFormConfig,
      id: `form_${Date.now()}`,
      name: `Novo Formulário ${multipleFormsConfig.forms.length + 1}`,
      linkedPages: []
    };
    
    setMultipleFormsConfig({
      ...multipleFormsConfig,
      forms: [...multipleFormsConfig.forms, newForm]
    });
    setCurrentFormIndex(multipleFormsConfig.forms.length);
  };

  const removeForm = (index: number) => {
    if (multipleFormsConfig.forms.length <= 1) {
      toast.error('Deve existir pelo menos um formulário');
      return;
    }
    
    const updatedForms = multipleFormsConfig.forms.filter((_, i) => i !== index);
    setMultipleFormsConfig({
      ...multipleFormsConfig,
      forms: updatedForms
    });
    
    if (currentFormIndex >= updatedForms.length) {
      setCurrentFormIndex(0);
    }
  };

  const saveFormConfig = async () => {
    setIsSaving(true);
    try {
      console.log('💾 Iniciando salvamento das configurações:', multipleFormsConfig);
      
      const { data: existingData, error: selectError } = await supabase
        .from('admin_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('❌ Erro ao verificar registro existente:', selectError);
        throw selectError;
      }

      if (existingData) {
        console.log('🔄 Atualizando primeiro registro com ID:', existingData.id);
        
        const { error: updateError } = await supabase
          .from('admin_settings')
          .update({
            form_config: multipleFormsConfig as any,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData.id);

        if (updateError) {
          console.error('❌ Erro ao atualizar registro:', updateError);
          throw updateError;
        }
        
        console.log('✅ Registro atualizado com sucesso');
      } else {
        console.log('➕ Criando novo registro');
        
        const { error: insertError } = await supabase
          .from('admin_settings')
          .insert({
            form_config: multipleFormsConfig as any,
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('❌ Erro ao criar registro:', insertError);
          throw insertError;
        }
        
        console.log('✅ Novo registro criado com sucesso');
      }

      toast.success('Configurações dos formulários salvas com sucesso!');
      console.log('🎉 Salvamento concluído com sucesso');
      
    } catch (error) {
      console.error('💥 Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações dos formulários');
    } finally {
      setIsSaving(false);
    }
  };

  const testWebhook = async () => {
    if (!currentForm.webhookUrl) {
      toast.error('Por favor, configure o webhook primeiro');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const testData = {
        name: 'Teste do Sistema',
        email: 'teste@exemplo.com',
        phone: '(11) 99999-9999',
        message: 'Esta é uma mensagem de teste do sistema administrativo.',
        service: 'Teste',
        isUrgent: false,
        timestamp: new Date().toISOString(),
        source: 'Admin - Teste de Webhook'
      };

      const response = await fetch(currentForm.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      if (response.ok) {
        setTestResult('success');
        toast.success('Webhook testado com sucesso!');
      } else {
        setTestResult('error');
        toast.error(`Erro no webhook: ${response.status}`);
      }
    } catch (error) {
      setTestResult('error');
      console.error('Erro ao testar webhook:', error);
      toast.error('Erro ao testar webhook');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Selector */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              📋 Gerenciar Formulários ({multipleFormsConfig.forms.length})
            </CardTitle>
            <Button onClick={addNewForm} size="sm">
              + Novo Formulário
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {multipleFormsConfig.forms.map((form, index) => (
              <div key={form.id} className="flex items-center gap-2">
                <Button
                  onClick={() => setCurrentFormIndex(index)}
                  variant={index === currentFormIndex ? "default" : "outline"}
                  size="sm"
                >
                  {form.name}
                </Button>
                {multipleFormsConfig.forms.length > 1 && (
                  <Button
                    onClick={() => removeForm(index)}
                    variant="destructive"
                    size="sm"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Settings */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            ⚙️ Configurações do Formulário: {currentForm.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome do Formulário</Label>
              <Input
                value={currentForm.name || ''}
                onChange={(e) => updateCurrentForm({ name: e.target.value })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Webhook URL</Label>
              <Input
                value={currentForm.webhookUrl}
                onChange={(e) => updateCurrentForm({ webhookUrl: e.target.value })}
                placeholder="https://seu-webhook-url.com/endpoint"
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>
          <div>
            <Label>Páginas Vinculadas (separadas por vírgula)</Label>
            <Input
              value={currentForm.linkedPages?.join(', ') || ''}
              onChange={(e) => updateCurrentForm({ 
                linkedPages: e.target.value.split(',').map(p => p.trim()).filter(Boolean)
              })}
              placeholder="home, contato, sobre"
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Header Texts */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            📝 Textos do Cabeçalho
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Título do Cabeçalho</Label>
              <Input
                value={currentForm.formTexts.headerTitle}
                onChange={(e) => updateCurrentForm({
                  formTexts: { ...currentForm.formTexts, headerTitle: e.target.value }
                })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Subtítulo do Cabeçalho</Label>
              <Input
                value={currentForm.formTexts.headerSubtitle}
                onChange={(e) => updateCurrentForm({
                  formTexts: { ...currentForm.formTexts, headerSubtitle: e.target.value }
                })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Texto do Botão</Label>
              <Input
                value={currentForm.formTexts.submitButton}
                onChange={(e) => updateCurrentForm({
                  formTexts: { ...currentForm.formTexts, submitButton: e.target.value }
                })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Mensagem de Sucesso</Label>
              <Textarea
                value={currentForm.formTexts.successMessage}
                onChange={(e) => updateCurrentForm({
                  formTexts: { ...currentForm.formTexts, successMessage: e.target.value }
                })}
                rows={2}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Mensagem de Erro</Label>
              <Textarea
                value={currentForm.formTexts.errorMessage}
                onChange={(e) => updateCurrentForm({
                  formTexts: { ...currentForm.formTexts, errorMessage: e.target.value }
                })}
                rows={2}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Options for this form */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              ⚖️ Opções de Serviços deste Formulário
            </CardTitle>
            <Button 
              onClick={() => {
                const newOptions = [
                  ...currentForm.serviceOptions,
                  { value: 'nova-opcao', label: 'Nova Opção' }
                ];
                updateCurrentForm({ serviceOptions: newOptions });
              }} 
              size="sm"
            >
              + Adicionar Opção
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentForm.serviceOptions.map((option, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Valor (ex: familia)"
                value={option.value}
                onChange={(e) => {
                  const newOptions = [...currentForm.serviceOptions];
                  newOptions[index] = { ...newOptions[index], value: e.target.value };
                  updateCurrentForm({ serviceOptions: newOptions });
                }}
                className={`flex-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
              <Input
                placeholder="Texto exibido"
                value={option.label}
                onChange={(e) => {
                  const newOptions = [...currentForm.serviceOptions];
                  newOptions[index] = { ...newOptions[index], label: e.target.value };
                  updateCurrentForm({ serviceOptions: newOptions });
                }}
                className={`flex-2 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
              <Button
                onClick={() => {
                  const newOptions = currentForm.serviceOptions.filter((_, i) => i !== index);
                  updateCurrentForm({ serviceOptions: newOptions });
                }}
                size="sm"
                variant="destructive"
              >
                Remover
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Unified Fields Manager */}
      <FormFieldsManager
        formFields={currentForm.allFields || []}
        onUpdateFormFields={(fields) => updateCurrentForm({ 
          allFields: fields,
          customFields: fields.filter(f => !f.isDefault)
        })}
      />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveFormConfig} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Salvando...' : 'Salvar Todas as Configurações'}
        </Button>
      </div>
    </div>
  );
};
