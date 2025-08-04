import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UnifiedContactForm from '../components/contact/UnifiedContactForm';
import { useFormConfig } from '../hooks/useFormConfig';

const EmbedForm: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const { multipleFormsConfig } = useFormConfig();
  const [currentFormConfig, setCurrentFormConfig] = useState(null);

  useEffect(() => {
    // Encontrar o formulário correto baseado no ID
    const targetForm = multipleFormsConfig.forms.find(form => 
      form.id === formId || (formId === 'default' && form.id === multipleFormsConfig.defaultFormId)
    );
    
    if (targetForm) {
      setCurrentFormConfig(targetForm);
    } else if (multipleFormsConfig.forms.length > 0) {
      // Fallback para o primeiro formulário se não encontrar
      setCurrentFormConfig(multipleFormsConfig.forms[0]);
    }
  }, [formId, multipleFormsConfig]);

  useEffect(() => {
    // Comunicar mudanças de altura para o parent frame
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'resize',
          height: height + 50 // adicionar um pouco de padding
        }, '*');
      }
    };

    // Enviar altura inicial
    setTimeout(sendHeight, 100);

    // Observar mudanças no DOM
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    // Observar mudanças de resize da janela
    window.addEventListener('resize', sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, []);

  // Hook personalizado para capturar eventos de submit
  useEffect(() => {
    const handleFormSubmit = (event: CustomEvent) => {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'form_submitted',
          data: event.detail
        }, '*');
      }
    };

    // Escutar eventos personalizados de submit
    window.addEventListener('formSubmitted', handleFormSubmit as EventListener);

    return () => {
      window.removeEventListener('formSubmitted', handleFormSubmit as EventListener);
    };
  }, []);

  if (!currentFormConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-fit bg-transparent">
      <div className="w-full p-4">
        <UnifiedContactForm 
          darkBackground={false}
          formId={formId}
        />
      </div>
      
      {/* Script inline para tracking */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<script>
            function trackFormSubmission(data) {
              window.dispatchEvent(new CustomEvent('formSubmitted', { detail: data }));
            }
            window.trackFormSubmission = trackFormSubmission;
          </script>`
        }}
      />
    </div>
  );
};

export default EmbedForm;