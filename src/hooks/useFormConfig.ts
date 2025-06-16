
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { FormConfig, FormField } from '../types/contactFormTypes';

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

export const useFormConfig = () => {
  const [formConfig, setFormConfig] = useState<FormConfig>(defaultFormConfig);
  const [isLoading, setIsLoading] = useState(true);

  const loadFormConfig = async () => {
    try {
      console.log('🔄 [useFormConfig] Carregando configurações do formulário...');
      
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
        console.log('🔧 [useFormConfig] Configurações aplicadas:', mergedConfig);
      } else {
        console.log('⚠️ [useFormConfig] Nenhuma configuração encontrada, usando padrões');
        setFormConfig(defaultFormConfig);
      }
    } catch (error) {
      console.error('💥 [useFormConfig] Erro crítico:', error);
      setFormConfig(defaultFormConfig);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFormConfig();
  }, []);

  return { formConfig, isLoading, refreshConfig: loadFormConfig };
};
