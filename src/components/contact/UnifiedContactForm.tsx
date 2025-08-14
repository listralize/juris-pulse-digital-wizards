import React, { useEffect, useRef } from 'react';
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

// Global pixel tracking state
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    __trackFormSubmission?: () => void;
  }
}

const UnifiedContactForm: React.FC<UnifiedContactFormProps> = ({ 
  preselectedService,
  darkBackground = false,
  pageId,
  formId
}) => {
  const pixelLoadedRef = useRef(false);
  const configLoadedRef = useRef(false);

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

  // Carregar e implementar Facebook Pixel
  useEffect(() => {
    if (configLoadedRef.current || !formConfig.id || formConfig.id === 'loading') return;
    
    const initializePixel = async () => {
      try {
        console.log('🔍 [UnifiedContactForm] Carregando configurações de marketing...');
        
        const { data: marketingSettings, error } = await supabase
          .from('marketing_settings')
          .select('form_tracking_config')
          .limit(1)
          .single();

        if (error) {
          console.error('❌ Erro ao carregar marketing settings:', error);
          return;
        }

        const formTrackingConfig = marketingSettings?.form_tracking_config as any;
        const systemForms = formTrackingConfig?.systemForms || [];
        
        console.log('📊 System forms encontrados:', systemForms);

        // Buscar configuração para o formulário atual
        const currentFormConfig = systemForms.find((form: any) => form.formId === formConfig.id);

        if (!currentFormConfig?.enabled) {
          console.log(`⚠️ Formulário ${formConfig.id} não configurado ou desabilitado`);
          return;
        }

        console.log('✅ Configuração encontrada:', currentFormConfig);

        // Implementar Facebook Pixel se configurado
        if (currentFormConfig.facebookPixel?.enabled && currentFormConfig.facebookPixel?.pixelId) {
          await loadFacebookPixel(currentFormConfig.facebookPixel);
        }

        configLoadedRef.current = true;
      } catch (error) {
        console.error('❌ Erro ao inicializar pixel:', error);
      }
    };

    initializePixel();
  }, [formConfig.id]);

  const loadFacebookPixel = async (pixelConfig: any) => {
    if (pixelLoadedRef.current) return;
    
    const pixelId = pixelConfig.pixelId;
    console.log(`📦 Carregando Facebook Pixel: ${pixelId}`);

    try {
      // Método 1: Script inline (mais confiável)
      const pixelScript = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
        
        console.log('✅ Facebook Pixel ${pixelId} carregado via script inline');
      `;

      // Executar script
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = pixelScript;
      document.head.appendChild(scriptElement);

      // Aguardar e verificar se fbq foi carregado
      await new Promise((resolve) => {
        let attempts = 0;
        const checkFbq = () => {
          attempts++;
          if (typeof window.fbq !== 'undefined') {
            console.log('✅ fbq carregado com sucesso');
            resolve(true);
          } else if (attempts < 50) { // 5 segundos máximo
            setTimeout(checkFbq, 100);
          } else {
            console.error('❌ Timeout ao carregar fbq');
            resolve(false);
          }
        };
        checkFbq();
      });

      // Configurar tracking para submit
      if (typeof window.fbq !== 'undefined') {
        const eventType = pixelConfig.eventType;
        const customEventName = pixelConfig.customEventName;
        const eventName = eventType === 'Custom' && customEventName ? customEventName : eventType;
        
        console.log(`🎯 Configurando tracking para evento: ${eventName}`);
        
        window.__trackFormSubmission = () => {
          if (typeof window.fbq !== 'undefined') {
            console.log(`📊 Disparando evento: ${eventName}`);
            window.fbq('track', eventName, {
              content_name: 'Contact Form Submission',
              content_category: 'Lead Generation',
              value: 100,
              currency: 'BRL'
            });
          }
        };
      }

      // Método 2: Backup via createElement (caso o primeiro falhe)
      if (typeof window.fbq === 'undefined') {
        console.log('📦 Tentando método backup...');
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        script.async = true;
        script.onload = () => {
          if (typeof window.fbq === 'undefined') {
            window.fbq = function(...args: any[]) {
              (window.fbq.q = window.fbq.q || []).push(args);
            };
          }
          window.fbq('init', pixelId);
          window.fbq('track', 'PageView');
          console.log('✅ Backup method: Facebook Pixel carregado');
        };
        document.head.appendChild(script);
      }

      pixelLoadedRef.current = true;

    } catch (error) {
      console.error('❌ Erro ao carregar Facebook Pixel:', error);
    }
  };

  // Interceptar envio do formulário
  const customHandleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 Iniciando submissão do formulário...');
    
    try {
      // Executar submissão original
      await handleSubmit(e);
      
      // Tracking após sucesso
      console.log('📊 Formulário enviado com sucesso, executando tracking...');
      
      if (typeof window.__trackFormSubmission === 'function') {
        window.__trackFormSubmission();
      } else if (typeof window.fbq !== 'undefined') {
        // Fallback direto
        window.fbq('track', 'Lead', {
          content_name: 'Contact Form Submission',
          content_category: 'Lead Generation'
        });
        console.log('📊 Fallback tracking executado');
      }
      
    } catch (error) {
      console.error('❌ Erro na submissão:', error);
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

  console.log('📋 Usando formulário:', formConfig.name, 'para página:', currentPageId);

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