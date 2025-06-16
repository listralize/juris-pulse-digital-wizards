
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
  [key: string]: any; // Para campos personalizados
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
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Verificar campos personalizados obrigatórios
    const missingRequiredFields = formConfig.customFields?.filter(field => 
      field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')
    );

    if (missingRequiredFields && missingRequiredFields.length > 0) {
      toast.error(`Por favor, preencha o campo obrigatório: ${missingRequiredFields[0].label}`);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('📤 Enviando formulário via edge function segura...');

      // Incluir campos personalizados nos dados enviados
      const submitData = {
        ...formData,
        customFields: formConfig.customFields?.reduce((acc, field) => {
          acc[field.name] = formData[field.name] || '';
          return acc;
        }, {} as { [key: string]: any }) || {}
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
      formConfig.customFields?.forEach(field => {
        resetData[field.name] = field.type === 'checkbox' ? false : '';
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
    formConfig.customFields?.forEach(field => {
      resetData[field.name] = field.type === 'checkbox' ? false : '';
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
