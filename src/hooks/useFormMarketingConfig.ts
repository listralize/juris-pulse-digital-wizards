import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FormMarketingConfig {
  formId: string;
  formName: string;
  enabled: boolean;
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
    eventType: string;
    customEventName?: string;
  };
  googleAnalytics?: {
    enabled: boolean;
    trackingId: string;
    eventName: string;
  };
  googleTagManager?: {
    enabled: boolean;
    containerId: string;
    eventName: string;
  };
}

// Armazenamento global para evitar conflitos
const loadedPixels = new Set<string>();
const registeredForms = new Map<string, FormMarketingConfig>();

export const useFormMarketingConfig = (formId: string, pageId?: string) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!formId || isInitialized.current) return;

    const loadFormMarketingConfig = async () => {
      try {
        console.log(`📊 [useFormMarketingConfig] Carregando config para formId: ${formId}, pageId: ${pageId}`);
        
        // Buscar configurações de marketing
        const { data: marketingSettings, error } = await supabase
          .from('marketing_settings')
          .select('form_tracking_config')
          .limit(1)
          .single();

        if (error) {
          console.error('❌ [useFormMarketingConfig] Erro ao carregar marketing_settings:', error);
          return;
        }

        console.log(`🔍 [useFormMarketingConfig] Marketing settings encontradas:`, marketingSettings);

        const formTrackingConfig = marketingSettings?.form_tracking_config as any;
        if (!formTrackingConfig?.systemForms) {
          console.log('⚠️ [useFormMarketingConfig] Nenhuma configuração de systemForms encontrada');
          return;
        }

        // Buscar configuração específica para este formulário
        const formConfig = formTrackingConfig.systemForms.find((form: any) => 
          form.formId === formId
        );

        if (!formConfig || !formConfig.enabled) {
          console.log(`⚠️ [useFormMarketingConfig] Formulário ${formId} não encontrado ou desabilitado`);
          removeFormScripts(formId);
          return;
        }

        console.log(`✅ [useFormMarketingConfig] Configuração encontrada para ${formId}:`, formConfig);

        // Implementar scripts baseados na configuração
        if (formConfig.facebookPixel?.enabled && formConfig.facebookPixel?.pixelId) {
          await implementFacebookPixel(formConfig);
        }

        // Registrar formulário
        registeredForms.set(formId, formConfig);
        
      } catch (error) {
        console.error('❌ [useFormMarketingConfig] Erro ao carregar configuração:', error);
      }
    };

    loadFormMarketingConfig();
    isInitialized.current = true;

    return () => {
      removeFormScripts(formId);
      registeredForms.delete(formId);
      isInitialized.current = false;
    };
  }, [formId, pageId]);

  return {
    trackFormSubmission: (additionalData?: any) => trackFormSubmission(formId, additionalData)
  };
};

const implementFacebookPixel = async (formConfig: FormMarketingConfig) => {
  const pixelId = formConfig.facebookPixel?.pixelId;
  
  if (!pixelId || loadedPixels.has(pixelId)) {
    if (loadedPixels.has(pixelId)) {
      console.log(`📦 [implementFacebookPixel] Pixel ${pixelId} já carregado`);
    }
    return;
  }

  try {
    console.log(`📦 [implementFacebookPixel] Carregando Facebook Pixel: ${pixelId}`);

    // Carregar script do Facebook Pixel se não existir
    if (!document.querySelector('script[src*="fbevents.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.async = true;
      
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Falha ao carregar Facebook Pixel'));
        document.head.appendChild(script);
      });
    }

    // Inicializar fbq se não existir
    if (typeof (window as any).fbq === 'undefined') {
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

    // Inicializar pixel específico
    (window as any).fbq('init', pixelId, {
      autoConfig: false
    });
    
    // Track PageView apenas uma vez por pixel
    (window as any).fbq('track', 'PageView');
    
    loadedPixels.add(pixelId);
    console.log(`✅ [implementFacebookPixel] Facebook Pixel ${pixelId} inicializado com sucesso`);

  } catch (error) {
    console.error(`❌ [implementFacebookPixel] Erro ao carregar Facebook Pixel:`, error);
  }
};

const trackFormSubmission = (formId: string, additionalData?: any) => {
  const formConfig = registeredForms.get(formId);
  
  if (!formConfig) {
    console.log(`⚠️ [trackFormSubmission] Configuração não encontrada para formId: ${formId}`);
    return;
  }

  console.log(`🎯 [trackFormSubmission] Rastreando submissão para ${formId}:`, formConfig);

  // Facebook Pixel
  if (formConfig.facebookPixel?.enabled && formConfig.facebookPixel.pixelId) {
    const pixelId = formConfig.facebookPixel.pixelId;
    const eventType = formConfig.facebookPixel.eventType;
    const customEventName = formConfig.facebookPixel.customEventName;

    if (typeof (window as any).fbq !== 'undefined') {
      const eventName = eventType === 'Custom' && customEventName ? customEventName : eventType;
      
      console.log(`📘 [trackFormSubmission] Enviando evento Facebook Pixel: ${eventName} para pixel ${pixelId}`);
      
      (window as any).fbq('track', eventName, {
        ...additionalData,
        form_id: formId,
        form_name: formConfig.formName
      });
      
      console.log(`✅ [trackFormSubmission] Evento Facebook Pixel enviado com sucesso`);
    } else {
      console.error(`❌ [trackFormSubmission] Facebook Pixel não está carregado`);
    }
  }

  // Google Analytics
  if (formConfig.googleAnalytics?.enabled && formConfig.googleAnalytics.trackingId) {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', formConfig.googleAnalytics.eventName, {
        ...additionalData,
        form_id: formId,
        form_name: formConfig.formName
      });
      console.log(`📊 [trackFormSubmission] Evento Google Analytics enviado`);
    }
  }

  // Google Tag Manager
  if (formConfig.googleTagManager?.enabled && formConfig.googleTagManager.containerId) {
    if (typeof (window as any).dataLayer !== 'undefined') {
      (window as any).dataLayer.push({
        event: formConfig.googleTagManager.eventName,
        ...additionalData,
        form_id: formId,
        form_name: formConfig.formName
      });
      console.log(`🏷️ [trackFormSubmission] Evento Google Tag Manager enviado`);
    }
  }
};

const removeFormScripts = (formId: string) => {
  console.log(`🧹 [removeFormScripts] Removendo scripts para formId: ${formId}`);
  registeredForms.delete(formId);
};