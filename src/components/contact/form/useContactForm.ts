
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';
import { useFormConfig } from '../../../hooks/useFormConfig';
import { useAnalytics } from '../../../hooks/useAnalytics';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  isUrgent: boolean;
  [key: string]: any;
}

export const useContactForm = () => {
  const { formConfig } = useFormConfig();
  const { trackConversion } = useAnalytics();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    isUrgent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof ContactFormData | string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📤 Iniciando envio do formulário...');
    console.log('📋 Dados do formulário:', formData);
    console.log('⚙️ Configuração do formulário:', formConfig);
    
    // Validar apenas campos obrigatórios que não estão desabilitados
    const requiredFields = formConfig.allFields?.filter(field => 
      field.required && !field.disabled
    ) || [];
    
    for (const field of requiredFields) {
      const value = formData[field.name];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        toast.error(`Por favor, preencha o campo obrigatório: ${field.label.replace(' *', '')}`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      console.log('📤 Enviando formulário via edge function segura...');

      // Incluir todos os campos personalizados nos dados enviados
      const customFieldsData = {};
      formConfig.allFields?.forEach(field => {
        if (!field.isDefault && !field.disabled) {
          customFieldsData[field.name] = formData[field.name] || '';
        }
      });

      // Preparar dados para envio
      const submitData = {
        ...formData,
        customFields: customFieldsData,
        formConfig: {
          redirectUrl: formConfig.redirectUrl,
          formId: formConfig.id,
          formName: formConfig.name
        },
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        sessionId: Math.random().toString(36).substring(2, 15)
      };

      console.log('📦 Dados preparados para envio:', submitData);

      // Enviar via edge function
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: submitData
      });

      if (error) {
        console.error('❌ Erro na edge function:', error);
        throw error;
      }

      console.log('✅ Resposta da edge function:', data);

      // Salvar também diretamente na tabela form_leads como backup
      try {
        const leadData = {
          lead_data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            service: formData.service,
            isUrgent: formData.isUrgent,
            ...customFieldsData
          },
          form_id: formConfig.id || 'default',
          form_name: formConfig.name || 'Formulário Principal',
          source_page: window.location.pathname,
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          session_id: submitData.sessionId,
          user_agent: navigator.userAgent,
          status: 'new',
          conversion_value: null
        };

        console.log('💾 Salvando lead diretamente na tabela:', leadData);
        
        const { data: leadResult, error: leadError } = await supabase
          .from('form_leads')
          .insert([leadData])
          .select();

        if (leadError) {
          console.error('❌ Erro ao salvar lead:', leadError);
        } else {
          console.log('✅ Lead salvo com sucesso:', leadResult);
        }
      } catch (backupError) {
        console.error('❌ Erro no backup do lead:', backupError);
        // Não interromper o fluxo principal por erro no backup
      }
      
      // Rastrear conversão no analytics
      await trackConversion(
        formConfig.id || 'default',
        formConfig.name || 'Formulário Principal',
        submitData,
        {
          source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
          medium: new URLSearchParams(window.location.search).get('utm_medium') || 'none',
          campaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'organic'
        }
      );
      
      toast.success(formConfig.formTexts.successMessage);
      setIsSubmitted(true);
      
      // Redirecionamento se configurado
      if (formConfig.redirectUrl) {
        setTimeout(() => {
          window.location.href = formConfig.redirectUrl!;
        }, 2000);
      }
      
      // Reset form
      const resetData: ContactFormData = {
        name: '',
        email: '',
        phone: '',
        message: '',
        service: '',
        isUrgent: false
      };

      // Reset campos personalizados
      formConfig.allFields?.forEach(field => {
        if (!field.isDefault) {
          resetData[field.name] = field.type === 'checkbox' ? false : '';
        }
      });

      setFormData(resetData);

      console.log('🎉 Formulário enviado com sucesso!');

    } catch (error) {
      console.error('❌ Erro ao enviar formulário:', error);
      toast.error(formConfig.formTexts.errorMessage || 'Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    console.log('🔄 Resetando formulário...');
    setIsSubmitted(false);
    const resetData: ContactFormData = {
      name: '',
      email: '',
      phone: '',
      message: '',
      service: '',
      isUrgent: false
    };

    // Reset campos personalizados
    formConfig.allFields?.forEach(field => {
      if (!field.isDefault) {
        resetData[field.name] = field.type === 'checkbox' ? false : '';
      }
    });

    setFormData(resetData);
  };

  return {
    formData,
    isSubmitting,
    isSubmitted,
    updateField,
    handleSubmit,
    resetForm
  };
};
