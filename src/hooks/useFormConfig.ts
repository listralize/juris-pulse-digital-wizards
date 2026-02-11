
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { FormConfig, FormField, MultipleFormsConfig } from '../types/contactFormTypes';
import { logger } from '../utils/logger';

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

  const getCurrentForm = (): FormConfig => {
    if (formId) {
      const foundForm = multipleFormsConfig.forms.find(f => f.id === formId);
      return foundForm || defaultFormConfig;
    }
    
    if (pageId) {
      const pageForm = multipleFormsConfig.forms.find(f => 
        f.linkedPages?.includes(pageId)
      );
      if (pageForm) return pageForm;
    }
    
    const defaultForm = multipleFormsConfig.forms.find(f => 
      f.id === multipleFormsConfig.defaultFormId
    );
    return defaultForm || defaultFormConfig;
  };

  const loadFormConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('form_config')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('[useFormConfig] Erro ao carregar configurações:', error);
        return;
      }

      if (data && data.form_config) {
        const savedConfig = data.form_config as any;
        
        if (savedConfig.forms) {
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
        setMultipleFormsConfig({
          forms: [defaultFormConfig],
          defaultFormId: 'default'
        });
      }
    } catch (error) {
      console.error('[useFormConfig] Erro crítico:', error);
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
