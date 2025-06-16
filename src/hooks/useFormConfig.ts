
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { FormConfig, FormField, MultipleFormsConfig } from '../types/contactFormTypes';

const defaultFormConfig: FormConfig = {
  id: 'default',
  name: 'Formulário Principal',
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
      isDefault: true,
      options: []
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
    if (formId) {
      return multipleFormsConfig.forms.find(f => f.id === formId) || defaultFormConfig;
    }
    
    if (pageId) {
      // Busca um formulário vinculado à página específica
      const pageForm = multipleFormsConfig.forms.find(f => 
        f.linkedPages?.includes(pageId)
      );
      if (pageForm) return pageForm;
    }
    
    // Retorna o formulário padrão
    const defaultForm = multipleFormsConfig.forms.find(f => 
      f.id === multipleFormsConfig.defaultFormId
    );
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
                allFields: form.allFields?.map((field: any) => {
                  const processedField = {
                    ...field,
                    isDefault: field.isDefault ?? false
                  };
                  
                  // Para o campo de serviço, garantir que use as opções corretas
                  if (field.name === 'service' && field.isDefault) {
                    processedField.options = form.serviceOptions || [];
                  }
                  
                  return processedField;
                }) || defaultFormConfig.allFields
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
            serviceOptions: savedConfig.serviceOptions || defaultFormConfig.serviceOptions,
            allFields: (savedConfig.allFields || defaultFormConfig.allFields).map((field: any) => {
              const processedField = {
                ...field,
                isDefault: field.isDefault ?? false
              };
              
              // Para o campo de serviço, garantir que use as opções corretas
              if (field.name === 'service' && field.isDefault) {
                processedField.options = savedConfig.serviceOptions || [];
              }
              
              return processedField;
            })
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
