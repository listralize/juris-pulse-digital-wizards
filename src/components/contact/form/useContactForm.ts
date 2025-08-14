import { useRef, useState } from 'react';
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

export const useContactForm = (externalFormConfig?: any) => {
  const { formConfig: defaultFormConfig } = useFormConfig();
  const formConfig = externalFormConfig || defaultFormConfig;
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
  const loadTsRef = useRef<number>(Date.now());

  const updateField = (field: keyof ContactFormData | string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Evitar que GTM/ouvintes globais capturem o submit nativo (que costuma disparar "Lead")
    // Sem alterar o fluxo do app
    try {
      // @ts-ignore
      e.stopPropagation?.();
      // @ts-ignore
      e.nativeEvent?.stopImmediatePropagation?.();
    } catch {}
    
    
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

    // Validações adicionais
    const emailVal = formData['email'];
    if (emailVal) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(emailVal));
      if (!emailOk) {
        toast.error('Por favor, informe um e-mail válido.');
        return;
      }
    }

    const phoneVal = formData['phone'];
    if (phoneVal && String(phoneVal).replace(/\D/g, '').length < 8) {
      toast.error('Por favor, informe um telefone válido.');
      return;
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

      const submitData = {
        ...formData,
        customFields: customFieldsData,
        formConfig: {
          id: formConfig.id,
          name: formConfig.name,
          redirectUrl: formConfig.redirectUrl,
          webhookUrl: formConfig.webhookUrl
        },
        antiBot: {
          hp: (document.getElementById('hp_field') as HTMLInputElement)?.value || '',
          elapsedMs: Date.now() - loadTsRef.current
        }
      };

      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: submitData
      });

      if (error) {
        console.error('❌ Erro na edge function:', error);
        throw error;
      }

      console.log('✅ Resposta da edge function:', data);
      
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

      // Garantir que dataLayer existe e enviar evento GTM
      if (!(window as any).dataLayer) {
        (window as any).dataLayer = [];
      }
      
      const eventData = {
        event: 'form_submit',
        form_id: formConfig.id || 'default',
        form_name: formConfig.name || 'Formulário Principal',
        page_url: window.location.href,
        user_email: submitData.email,
        user_name: submitData.name,
        service: submitData.service,
        timestamp: new Date().toISOString()
      };
      
      // Enviar evento múltiplas vezes para garantir
      (window as any).dataLayer.push(eventData);
      setTimeout(() => (window as any).dataLayer.push(eventData), 100);
      setTimeout(() => (window as any).dataLayer.push(eventData), 500);

      // Disparar evento customizado para scripts de marketing (backup)
      const successEvent = new CustomEvent('formSubmitSuccess', {
        detail: {
          formId: formConfig.id || 'default',
          userData: {
            email: submitData.email,
            name: submitData.name,
            service: submitData.service
          }
        }
      });
      document.dispatchEvent(successEvent);

      
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

    } catch (error) {
      console.error('❌ Erro ao enviar formulário:', error);
      toast.error(formConfig.formTexts.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
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
