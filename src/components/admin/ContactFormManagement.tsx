
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
  const [formConfig, setFormConfig] = useState<FormConfig>(defaultFormConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    loadFormConfig();
  }, []);

  const loadFormConfig = async () => {
    try {
      console.log('🔄 Carregando configurações do formulário...');
      
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Erro ao carregar configurações:', error);
        toast.error('Erro ao carregar configurações do formulário');
        return;
      }

      if (data && data.form_config) {
        const savedConfig = data.form_config as any;
        console.log('✅ Configurações encontradas:', savedConfig);
        
        const mergedConfig = {
          ...defaultFormConfig,
          ...savedConfig,
          formTexts: {
            ...defaultFormConfig.formTexts,
            ...(savedConfig.formTexts || {})
          },
          serviceOptions: savedConfig.serviceOptions || defaultFormConfig.serviceOptions,
          customFields: savedConfig.customFields || [],
          allFields: savedConfig.allFields || defaultFormConfig.allFields
        };
        
        setFormConfig(mergedConfig);
        console.log('🔧 Configurações aplicadas:', mergedConfig);
      } else {
        console.log('⚠️ Nenhuma configuração encontrada, usando padrões');
        setFormConfig(defaultFormConfig);
      }
    } catch (error) {
      console.error('💥 Erro crítico ao carregar configurações:', error);
      toast.error('Erro crítico ao carregar configurações');
    }
  };

  const saveFormConfig = async () => {
    setIsSaving(true);
    try {
      console.log('💾 Iniciando salvamento das configurações:', formConfig);
      
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
            form_config: formConfig as any,
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
            form_config: formConfig as any,
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('❌ Erro ao criar registro:', insertError);
          throw insertError;
        }
        
        console.log('✅ Novo registro criado com sucesso');
      }

      toast.success('Configurações do formulário salvas com sucesso!');
      console.log('🎉 Salvamento concluído com sucesso');
      
    } catch (error) {
      console.error('💥 Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações do formulário');
    } finally {
      setIsSaving(false);
    }
  };

  const testWebhook = async () => {
    if (!formConfig.webhookUrl) {
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

      const response = await fetch(formConfig.webhookUrl, {
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

  const updateServiceOption = (index: number, field: 'value' | 'label', value: string) => {
    const newOptions = [...formConfig.serviceOptions];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormConfig({ ...formConfig, serviceOptions: newOptions });
  };

  const addServiceOption = () => {
    setFormConfig({
      ...formConfig,
      serviceOptions: [
        ...formConfig.serviceOptions,
        { value: 'nova-opcao', label: 'Nova Opção' }
      ]
    });
  };

  const removeServiceOption = (index: number) => {
    setFormConfig({
      ...formConfig,
      serviceOptions: formConfig.serviceOptions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Webhook Configuration */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            🔗 Configuração do Webhook
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>URL do Webhook</Label>
            <div className="flex gap-2">
              <Input
                value={formConfig.webhookUrl}
                onChange={(e) => setFormConfig({ ...formConfig, webhookUrl: e.target.value })}
                placeholder="https://seu-webhook-url.com/endpoint"
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
              <Button onClick={testWebhook} disabled={isTesting} variant="outline">
                <TestTube className="w-4 h-4 mr-2" />
                {isTesting ? 'Testando...' : 'Testar'}
              </Button>
            </div>
            {testResult && (
              <div className={`mt-2 flex items-center gap-2 text-sm ${
                testResult === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {testResult === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {testResult === 'success' 
                  ? 'Webhook funcionando corretamente' 
                  : 'Erro no webhook - verifique a URL'
                }
              </div>
            )}
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
                value={formConfig.formTexts.headerTitle}
                onChange={(e) => setFormConfig({
                  ...formConfig,
                  formTexts: { ...formConfig.formTexts, headerTitle: e.target.value }
                })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Subtítulo do Cabeçalho</Label>
              <Input
                value={formConfig.formTexts.headerSubtitle}
                onChange={(e) => setFormConfig({
                  ...formConfig,
                  formTexts: { ...formConfig.formTexts, headerSubtitle: e.target.value }
                })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Texto do Botão</Label>
              <Input
                value={formConfig.formTexts.submitButton}
                onChange={(e) => setFormConfig({
                  ...formConfig,
                  formTexts: { ...formConfig.formTexts, submitButton: e.target.value }
                })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Mensagem de Sucesso</Label>
              <Textarea
                value={formConfig.formTexts.successMessage}
                onChange={(e) => setFormConfig({
                  ...formConfig,
                  formTexts: { ...formConfig.formTexts, successMessage: e.target.value }
                })}
                rows={2}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Mensagem de Erro</Label>
              <Textarea
                value={formConfig.formTexts.errorMessage}
                onChange={(e) => setFormConfig({
                  ...formConfig,
                  formTexts: { ...formConfig.formTexts, errorMessage: e.target.value }
                })}
                rows={2}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Options */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              ⚖️ Opções de Serviços
            </CardTitle>
            <Button onClick={addServiceOption} size="sm">
              + Adicionar Opção
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formConfig.serviceOptions.map((option, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Valor (ex: familia)"
                value={option.value}
                onChange={(e) => updateServiceOption(index, 'value', e.target.value)}
                className={`flex-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
              <Input
                placeholder="Texto exibido"
                value={option.label}
                onChange={(e) => updateServiceOption(index, 'label', e.target.value)}
                className={`flex-2 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
              <Button
                onClick={() => removeServiceOption(index)}
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
        formFields={formConfig.allFields || []}
        onUpdateFormFields={(fields) => setFormConfig({ 
          ...formConfig, 
          allFields: fields,
          customFields: fields.filter(f => !f.isDefault)
        })}
      />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveFormConfig} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </div>
    </div>
  );
};
