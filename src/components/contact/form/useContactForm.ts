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

      // Disparar evento customizado para scripts de marketing
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
      console.log('🎯 Evento formSubmitSuccess disparado para marketing scripts');
      
      // Disparar eventos diretos para garantir captura
      setTimeout(() => {
        console.log('📊 Disparando eventos diretos de marketing para formulário de contato');
        
        // Facebook Pixel - Contact event
        if ((window as any).fbq) {
          try {
            (window as any).fbq('track', 'Contact', {
              content_name: 'Contact Form Lead',
              form_type: 'contact',
              form_id: formConfig.id || 'default',
              page_url: window.location.href
            });
            console.log('✅ Evento Contact enviado para Facebook Pixel (contato)');
            
            // Também enviar Lead event
            (window as any).fbq('track', 'Lead', {
              content_name: 'Contact Lead Generation',
              form_type: 'contact',
              form_id: formConfig.id || 'default',
              page_url: window.location.href
            });
            console.log('✅ Evento Lead enviado para Facebook Pixel (contato)');
          } catch (error) {
            console.error('❌ Erro no Facebook Pixel:', error);
          }
        } else {
          console.warn('❌ Facebook Pixel não disponível');
        }
        
        // Google Tag Manager
        if ((window as any).dataLayer) {
          try {
            (window as any).dataLayer.push({
              event: 'contact_form_conversion',
              event_category: 'Lead Generation',
              event_action: 'Contact Form Submit',
              form_id: formConfig.id || 'default',
              page_url: window.location.href
            });
            console.log('✅ Evento enviado para GTM (contato)');
          } catch (error) {
            console.error('❌ Erro no GTM:', error);
          }
        } else {
          console.warn('❌ GTM dataLayer não disponível');
        }
        
        // Google Analytics
        if ((window as any).gtag) {
          try {
            (window as any).gtag('event', 'conversion', {
              event_category: 'Lead Generation',
              event_label: 'Contact Form',
              form_id: formConfig.id || 'default'
            });
            console.log('✅ Evento enviado para GA (contato)');
          } catch (error) {
            console.error('❌ Erro no GA:', error);
          }
        } else {
          console.warn('❌ Google Analytics não disponível');
        }
      }, 300);
      
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
