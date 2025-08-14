import React, { useEffect } from 'react';
import { useContactForm } from "./form/useContactForm";
import { useFormConfig } from "../../hooks/useFormConfig";
import { supabase } from '@/integrations/supabase/client';

import { DynamicFormRenderer } from './form/DynamicFormRenderer';
import ContactFormContainer from './form/ContactFormContainer';

interface UnifiedContactFormProps {
  preselectedService?: string;
  darkBackground?: boolean;
  pageId?: string;
  formId?: string;
}

const UnifiedContactForm: React.FC<UnifiedContactFormProps> = ({ 
  preselectedService,
  darkBackground = false,
  pageId,
  formId
}) => {
  // Determinar o pageId baseado na URL atual se não fornecido
  const currentPageId = pageId || (() => {
    const pathname = window.location.pathname;
    console.log('🌐 [UnifiedContactForm] Pathname atual:', pathname);
    
    if (pathname === '/' || pathname === '/home') return 'home';
    if (pathname === '/contato') return 'contato';
    
    // Verificar páginas de áreas de direito primeiro
    if (pathname.startsWith('/areas/')) {
      let cleanPath = pathname.replace('/areas/', '');
      cleanPath = cleanPath.replace(/\/+/g, '/').replace(/\/$/, '');
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }
      console.log('🏛️ [UnifiedContactForm] Área de direito detectada:', cleanPath);
      return cleanPath;
    }
    
    if (pathname.startsWith('/services/')) {
      let cleanPath = pathname.replace('/services/', '');
      if (cleanPath.startsWith('services/')) {
        cleanPath = cleanPath.replace('services/', '');
      }
      cleanPath = cleanPath.replace(/\/+/g, '/').replace(/\/$/, '');
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }
      return cleanPath;
    }
    
    if (pathname.startsWith('/servicos/')) {
      let cleanPath = pathname.replace('/servicos/', '');
      if (cleanPath.startsWith('servicos/')) {
        cleanPath = cleanPath.replace('servicos/', '');
      }
      cleanPath = cleanPath.replace(/\/+/g, '/').replace(/\/$/, '');
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }
      return cleanPath;
    }
    return 'home';
  })();

  console.log('📍 [UnifiedContactForm] PageId determinado:', currentPageId);

  // Usar o hook de configuração de formulário
  const { formConfig, isLoading: configLoading } = useFormConfig(formId, currentPageId);
  
  const {
    formData,
    isSubmitting,
    isSubmitted,
    updateField,
    handleSubmit,
    resetForm
  } = useContactForm(formConfig);

  // Implementar Facebook Pixel diretamente
  useEffect(() => {
    const loadAndImplementPixel = async () => {
      try {
        console.log('🔍 [UnifiedContactForm] Carregando configurações de marketing para formId:', formConfig.id);
        
        const { data: marketingSettings, error } = await supabase
          .from('marketing_settings')
          .select('form_tracking_config')
          .limit(1)
          .single();

        if (error) {
          console.error('❌ [UnifiedContactForm] Erro ao carregar marketing settings:', error);
          return;
        }

        console.log('📊 [UnifiedContactForm] Marketing settings carregadas:', marketingSettings);

        const formTrackingConfig = marketingSettings?.form_tracking_config as any;
        const systemForms = formTrackingConfig?.systemForms || [];
        
        console.log('🔍 [UnifiedContactForm] System forms encontrados:', systemForms);

        // Buscar configuração para o formulário atual
        const currentFormConfig = systemForms.find((form: any) => form.formId === formConfig.id);

        if (!currentFormConfig || !currentFormConfig.enabled) {
          console.log(`⚠️ [UnifiedContactForm] Formulário ${formConfig.id} não encontrado ou desabilitado`);
          return;
        }

        console.log(`✅ [UnifiedContactForm] Configuração encontrada:`, currentFormConfig);

        // Implementar Facebook Pixel se habilitado
        if (currentFormConfig.facebookPixel?.enabled && currentFormConfig.facebookPixel?.pixelId) {
          await implementFacebookPixel(currentFormConfig.facebookPixel, currentFormConfig);
        }

      } catch (error) {
        console.error('❌ [UnifiedContactForm] Erro geral:', error);
      }
    };

    if (formConfig.id && formConfig.id !== 'loading') {
      loadAndImplementPixel();
    }
  }, [formConfig.id]);

  const implementFacebookPixel = async (pixelConfig: any, formConfigData: any) => {
    const pixelId = pixelConfig.pixelId;
    
    console.log(`📦 [UnifiedContactForm] Implementando Facebook Pixel: ${pixelId}`);

    try {
      // Carregar script do Facebook Pixel
      if (!document.querySelector('script[src*="fbevents.js"]')) {
        console.log('📦 [UnifiedContactForm] Carregando script do Facebook Pixel...');
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        script.async = true;
        document.head.appendChild(script);
        
        // Aguardar carregamento
        await new Promise((resolve) => {
          script.onload = resolve;
          setTimeout(resolve, 2000); // Fallback timeout
        });
      }

      // Inicializar fbq
      if (typeof (window as any).fbq === 'undefined') {
        console.log('🔧 [UnifiedContactForm] Inicializando fbq...');
        (window as any).fbq = function(...args: any[]) {
          ((window as any).fbq.callMethod) ? 
            (window as any).fbq.callMethod.apply((window as any).fbq, args) : 
            (window as any).fbq.queue.push(args);
        };
        (window as any).fbq.push = (window as any).fbq;
        (window as any).fbq.loaded = true;
        (window as any).fbq.version = '2.0';
        (window as any).fbq.queue = [];
      }

      // Inicializar pixel
      console.log(`🎯 [UnifiedContactForm] Inicializando pixel: ${pixelId}`);
      (window as any).fbq('init', pixelId);
      (window as any).fbq('track', 'PageView');
      
      console.log(`✅ [UnifiedContactForm] Facebook Pixel ${pixelId} inicializado`);

      // Adicionar listener para rastrear submissões
      const trackSubmission = () => {
        const eventType = pixelConfig.eventType;
        const customEventName = pixelConfig.customEventName;
        const eventName = eventType === 'Custom' && customEventName ? customEventName : eventType;
        
        console.log(`🎯 [UnifiedContactForm] Rastreando evento: ${eventName}`);
        (window as any).fbq('track', eventName, {
          content_name: formConfigData.formName,
          content_category: 'Lead Generation',
          value: 100,
          currency: 'BRL'
        });
      };

      // Armazenar função globalmente para uso no submit
      (window as any)._trackFormSubmission = trackSubmission;

    } catch (error) {
      console.error(`❌ [UnifiedContactForm] Erro ao implementar Facebook Pixel:`, error);
    }
  };

  // Interceptar envio do formulário para adicionar rastreamento
  const customHandleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 [UnifiedContactForm] Iniciando submissão...');
    
    // Executar submissão original
    await handleSubmit(e);
    
    // Rastrear via Facebook Pixel se disponível
    if (typeof (window as any)._trackFormSubmission === 'function') {
      console.log('📊 [UnifiedContactForm] Executando rastreamento...');
      (window as any)._trackFormSubmission();
    }
  };

  // Pre-selecionar serviço se fornecido
  React.useEffect(() => {
    if (preselectedService && !formData.service) {
      updateField('service', preselectedService);
    }
  }, [preselectedService, formData.service, updateField]);

  if (configLoading) {
    return (
      <ContactFormContainer darkBackground={darkBackground}>
        <div className="flex items-center justify-center py-8">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            darkBackground ? 'border-white' : 'border-black'
          }`}></div>
        </div>
      </ContactFormContainer>
    );
  }

  console.log('📋 [UnifiedContactForm] Usando formulário:', formConfig.name, 'para página:', currentPageId);

  return (
    <ContactFormContainer darkBackground={darkBackground}>
      <div className="mb-6">
        <h3 className={`text-xl md:text-2xl font-canela mb-2 ${
          darkBackground ? 'text-white' : 'text-black'
        }`}>
          {formConfig.formTexts.headerTitle}
        </h3>
        <p className={`text-sm ${
          darkBackground ? 'text-white/70' : 'text-gray-600'
        }`}>
          {formConfig.formTexts.headerSubtitle}
        </p>
      </div>
      
      <form id="contact-form-main" onSubmit={customHandleSubmit} className="space-y-4">
        <DynamicFormRenderer
          formFields={formConfig.allFields || []}
          serviceOptions={formConfig.serviceOptions}
          formData={formData}
          updateField={updateField}
          darkBackground={darkBackground}
        />

        <button
          id="submit-contact-main"
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-6 rounded-md font-medium transition-all ${
            darkBackground 
              ? 'bg-white text-black hover:bg-white/90' 
              : 'bg-black text-white hover:bg-black/90'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            formConfig.formTexts.submitButton
          )}
        </button>
        
        {isSubmitted && (
          <div className="p-4 rounded-md bg-green-100 text-green-800">
            Formulário enviado com sucesso!
          </div>
        )}
      </form>
    </ContactFormContainer>
  );
};

export default UnifiedContactForm;