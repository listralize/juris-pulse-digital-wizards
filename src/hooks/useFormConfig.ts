
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { FormConfig } from '../types/contactFormTypes';

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
    nameLabel: "Nome *",
    emailLabel: "E-mail *",
    phoneLabel: "Telefone",
    serviceLabel: "Qual problema você precisa resolver?",
    messageLabel: "Detalhes do seu caso *",
    urgentLabel: "Preciso de atendimento urgente",
    submitButton: "Enviar mensagem",
    successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    errorMessage: "Erro ao enviar mensagem. Tente novamente."
  },
  customFields: []
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
          customFields: savedConfig.customFields || []
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
