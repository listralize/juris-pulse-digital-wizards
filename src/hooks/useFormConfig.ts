
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { FormConfig, FormField, MultipleFormsConfig } from '../types/contactFormTypes';

const defaultFormConfig: FormConfig = {
  id: 'default',
  name: 'Formulário Principal',
  webhookUrl: '',
  serviceOptions: [],
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
      id: 'message',
      name: 'message',
      label: 'Detalhes do seu caso *',
      type: 'textarea',
      required: true,
      placeholder: 'Conte-nos brevemente sobre o seu caso',
      order: 3,
      isDefault: true
    },
    {
      id: 'isUrgent',
      name: 'isUrgent',
      label: 'Preciso de atendimento urgente',
      type: 'checkbox',
      required: false,
      order: 4,
      isDefault: true
    }
  ],
  linkedPages: ['home']
};

export const useFormConfig = (formId?: string, pageId?: string) => {
  const [multipleFormsConfig, setMultipleFormsConfig] = useState<MultipleFormsConfig>({
    forms: [defaultFormConfig],
    defaultFormId: 'default'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Retorna o formulário específico ou o padrão
  const getCurrentForm = (): FormConfig => {
    console.log('🔍 [getCurrentForm] Buscando formulário para:', { formId, pageId });
    console.log('📝 [getCurrentForm] Formulários disponíveis:', multipleFormsConfig.forms.map(f => ({ id: f.id, name: f.name, linkedPages: f.linkedPages })));
    
    if (formId) {
      const foundForm = multipleFormsConfig.forms.find(f => f.id === formId);
      console.log('🎯 [getCurrentForm] Formulário por ID encontrado:', foundForm?.name);
      return foundForm || defaultFormConfig;
    }
    
    if (pageId) {
      // Busca um formulário vinculado à página específica
      const pageForm = multipleFormsConfig.forms.find(f => 
        f.linkedPages?.includes(pageId)
      );
      if (pageForm) {
        console.log('📄 [getCurrentForm] Formulário para página encontrado:', pageForm.name, 'para página:', pageId);
        return pageForm;
      }
      console.log('⚠️ [getCurrentForm] Nenhum formulário específico para página:', pageId);
    }
    
    // Retorna o formulário padrão
    const defaultForm = multipleFormsConfig.forms.find(f => 
      f.id === multipleFormsConfig.defaultFormId
    );
    console.log('🔄 [getCurrentForm] Usando formulário padrão:', defaultForm?.name);
    return defaultForm || defaultFormConfig;
  };

  const loadFormConfig = async () => {
    try {
      console.log('🔄 [useFormConfig] Carregando configurações dos formulários...');
      
      const { data, error } = await supabase
        .from('admin_settings')
        .select('form_config')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ [useFormConfig] Erro ao carregar configurações:', error);
        return;
      }

      if (data && data.form_config) {
        const savedConfig = data.form_config as any;
        console.log('✅ [useFormConfig] Configurações encontradas:', savedConfig);
        
        // Verificar se é o novo formato com múltiplos formulários
        if (savedConfig.forms) {
          // Novo formato
          setMultipleFormsConfig({
            forms: savedConfig.forms.map((form: any) => {
              const processedForm = {
                ...defaultFormConfig,
                ...form,
                allFields: form.allFields?.map((field: any) => ({
                  ...field,
                  isDefault: field.isDefault ?? false
                })) || defaultFormConfig.allFields
              };
              
              return processedForm;
            }),
            defaultFormId: savedConfig.defaultFormId || 'default'
          });
        } else {
          // Formato antigo - converter
          const migratedForm = {
            ...defaultFormConfig,
            ...savedConfig,
            id: 'default',
            name: 'Formulário Principal',
            formTexts: {
              ...defaultFormConfig.formTexts,
              ...(savedConfig.formTexts || {})
            },
            serviceOptions: [],
            allFields: (savedConfig.allFields || defaultFormConfig.allFields).map((field: any) => ({
              ...field,
              isDefault: field.isDefault ?? false
            }))
          };
          
          setMultipleFormsConfig({
            forms: [migratedForm],
            defaultFormId: 'default'
          });
        }
      } else {
        console.log('⚠️ [useFormConfig] Nenhuma configuração encontrada, usando padrões');
        setMultipleFormsConfig({
          forms: [defaultFormConfig],
          defaultFormId: 'default'
        });
      }
    } catch (error) {
      console.error('💥 [useFormConfig] Erro crítico:', error);
      setMultipleFormsConfig({
        forms: [defaultFormConfig],
        defaultFormId: 'default'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFormConfig();
  }, []);

  return { 
    formConfig: getCurrentForm(), 
    multipleFormsConfig,
    isLoading, 
    refreshConfig: loadFormConfig,
    setMultipleFormsConfig
  };
};
