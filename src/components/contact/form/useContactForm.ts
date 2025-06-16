
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';
import { useFormConfig } from '../../../hooks/useFormConfig';

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
          redirectUrl: formConfig.redirectUrl
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
