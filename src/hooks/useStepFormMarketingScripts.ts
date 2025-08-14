import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StepFormMarketingConfig {
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
    eventType: 'Lead' | 'Purchase' | 'Contact' | 'SubmitApplication' | 'CompleteRegistration' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Custom';
    customEventName?: string;
  };
  googleAnalytics?: {
    enabled: boolean;
    measurementId: string;
    eventName: string;
  };
  googleTagManager?: {
    enabled: boolean;
    containerId: string;
    eventName: string;
  };
}

export const useStepFormMarketingScripts = (formSlug: string) => {
  useEffect(() => {
    if (!formSlug) return;

    console.log(`🚀 Inicializando scripts de marketing para StepForm: ${formSlug}`);
    
    // Carregar e implementar scripts imediatamente
    loadAndImplementScripts();

    return () => {
      console.log(`🧹 Limpando scripts do StepForm: ${formSlug}`);
      removeStepFormScripts(formSlug);
    };
  }, [formSlug]);

  const loadAndImplementScripts = async () => {
    try {
      console.log(`🔍 Buscando configuração para StepForm: ${formSlug}`);
      
      // Buscar configuração diretamente da tabela step_forms
      const { data: stepForm, error } = await supabase
        .from('step_forms')
        .select('tracking_config, name, id')
        .eq('slug', formSlug)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('❌ Erro ao buscar StepForm:', error);
        implementFallbackScripts();
        return;
      }

      if (!stepForm?.tracking_config) {
        console.log('⚠️ Sem configuração de tracking - usando fallback');
        implementFallbackScripts();
        return;
      }

      const config = stepForm.tracking_config as any;
      console.log('📊 Configuração encontrada:', config);

      // Facebook Pixel: usar evento exatamente como configurado; sem fallback
      const pixelCfg = (config.facebook_pixel || {});
      let eventName: string | null = null;
      if (pixelCfg.enabled === true) {
        if (pixelCfg.event_type === 'Custom') {
          eventName = (pixelCfg.custom_event_name || '').trim().replace(/\s+/g, '') || null;
        } else {
          eventName = normalizeEventName(pixelCfg.event_type);
        }
      }
      if (eventName) {
        implementFacebookPixel(eventName);
      } else {
        console.log('ℹ️ Pixel desativado ou sem evento configurado; nada será enviado.');
      }

      // GTM: apenas empurrar evento se nome estiver configurado (sem injeção de script)
      const gtmCfg = (config.google_tag_manager || {});
      const gtmEventName = gtmCfg.enabled === true ? (gtmCfg.event_name || '').trim() : '';
      if (gtmEventName) {
        implementGoogleTagManager(gtmEventName);
      } else {
        console.log('ℹ️ Nenhum evento do GTM configurado para este StepForm; nada será enviado.');
      }

      // GA: apenas enviar evento se nome estiver configurado (sem injeção de script)
      const gaCfg = (config.google_analytics || {});
      const gaEventName = gaCfg.enabled === true ? (gaCfg.event_name || '').trim() : '';
      if (gaEventName) {
        implementGoogleAnalytics(gaEventName);
      } else {
        console.log('ℹ️ Nenhum evento do GA configurado para este StepForm; nada será enviado.');
      }

    } catch (error) {
      console.error('❌ Erro ao carregar configuração:', error);
      implementFallbackScripts();
    }
  };

  const normalizeEventName = (eventType?: string) => {
    if (!eventType) return null;
    const map: Record<string, string> = {
      CompleteRegistration: 'CompleteRegistration',
      'Complete Registration': 'CompleteRegistration',
      SubmitApplication: 'SubmitApplication',
      'Submit Application': 'SubmitApplication',
      Lead: 'Lead',
      Purchase: 'Purchase',
      Contact: 'Contact',
      ViewContent: 'ViewContent',
      'View Content': 'ViewContent',
      AddToCart: 'AddToCart',
      'Add To Cart': 'AddToCart',
      InitiateCheckout: 'InitiateCheckout',
      'Initiate Checkout': 'InitiateCheckout',
    };
    return map[eventType] || eventType.replace(/\s+/g, '');
  };

  const implementFallbackScripts = () => {
    console.log('ℹ️ Fallback desativado: sem injeção de GTM/GA/Pixel no StepForm.');
  };

  const implementFacebookPixel = (eventName: string) => {
    console.log(`📘 Garantindo Facebook Pixel (listener apenas) para evento: ${eventName}`);

    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        // De-dup simples por formSlug
        const sentMap = (window as any).__stepFormEventSent || {};
        if (sentMap[formSlug]?.fb) {
          console.log(`⏭️ FB Pixel ignorado (duplicado) para ${formSlug}`);
          return;
        }
        sentMap[formSlug] = { ...(sentMap[formSlug] || {}), fb: true };
        (window as any).__stepFormEventSent = sentMap;
        setTimeout(() => {
          const m = (window as any).__stepFormEventSent || {};
          if (m[formSlug]) m[formSlug].fb = false;
          (window as any).__stepFormEventSent = m;
        }, 3000);

        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', eventName, {
              content_name: `StepForm ${formSlug}`,
              form_slug: formSlug,
              page_url: window.location.href,
            });
            console.log(`✅ Evento ${eventName} enviado para Facebook Pixel`);
          } else {
            console.warn('❌ Facebook Pixel não disponível no momento do envio');
          }
        }, 250); // Aguardar para o pixel estar pronto em produção
      }
    };

    // Remover listener anterior se existir e registrar novo
    const existingHandler = (window as any)[`stepFormPixelHandler_${formSlug}`];
    if (existingHandler) {
      window.removeEventListener('stepFormSubmitSuccess', existingHandler);
    }
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormPixelHandler_${formSlug}`] = handleSuccess;
  };

  const implementGoogleTagManager = (eventName: string) => {
    console.log(`🏷️ StepForm GTM listener configurado para evento: "${eventName}" no formulário: "${formSlug}"`);
    console.log(`🔍 DataLayer atual:`, (window as any).dataLayer);

    const handleSuccess = (event: CustomEvent) => {
      console.log(`🎯 Evento stepFormSubmitSuccess recebido:`, event.detail);
      console.log(`🔍 Verificando se é do formulário correto: ${event.detail?.formSlug} === ${formSlug}`);
      if (event.detail?.formSlug === formSlug) {
        const sentMap = (window as any).__stepFormEventSent || {};
        if (sentMap[formSlug]?.gtm) {
          console.log(`⏭️ GTM ignorado (duplicado) para ${formSlug}`);
          return;
        }
        sentMap[formSlug] = { ...(sentMap[formSlug] || {}), gtm: true };
        (window as any).__stepFormEventSent = sentMap;
        setTimeout(() => {
          const m = (window as any).__stepFormEventSent || {};
          if (m[formSlug]) m[formSlug].gtm = false;
          (window as any).__stepFormEventSent = m;
        }, 3000);

        setTimeout(() => {
          console.log(`🚀 Tentando enviar evento "${eventName}" para GTM...`);
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
            const eventData = {
              event: eventName,
              form_slug: formSlug,
              form_name: event.detail?.formName || `StepForm ${formSlug}`,
              page_url: window.location.href,
            };
            console.log(`📤 Enviando dados para GTM:`, eventData);
            (window as any).dataLayer.push(eventData);
            console.log(`✅ Evento "${eventName}" enviado para GTM com sucesso!`);
          } else {
            console.warn('❌ dataLayer não disponível no momento do envio - GTM pode não estar carregado');
            console.log('🔧 Inicializando dataLayer...');
            // Inicializar dataLayer se não existir
            (window as any).dataLayer = (window as any).dataLayer || [];
            const eventData = {
              event: eventName,
              form_slug: formSlug,
              form_name: event.detail?.formName || `StepForm ${formSlug}`,
              page_url: window.location.href,
            };
            console.log(`📤 Enviando dados para GTM (com dataLayer inicializado):`, eventData);
            (window as any).dataLayer.push(eventData);
            console.log(`✅ Evento "${eventName}" enviado para GTM (dataLayer inicializado)`);
          }
        }, 250); // Aguardar para o GTM estar pronto em produção
      }
    };

    const existingHandler = (window as any)[`stepFormGTMHandler_${formSlug}`];
    if (existingHandler) {
      window.removeEventListener('stepFormSubmitSuccess', existingHandler);
    }
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormGTMHandler_${formSlug}`] = handleSuccess;
  };

  const implementGoogleAnalytics = (eventName: string) => {
    console.log(`📊 StepForm GA listener para evento: ${eventName}`);

    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        const sentMap = (window as any).__stepFormEventSent || {};
        if (sentMap[formSlug]?.ga) {
          console.log(`⏭️ GA ignorado (duplicado) para ${formSlug}`);
          return;
        }
        sentMap[formSlug] = { ...(sentMap[formSlug] || {}), ga: true };
        (window as any).__stepFormEventSent = sentMap;
        setTimeout(() => {
          const m = (window as any).__stepFormEventSent || {};
          if (m[formSlug]) m[formSlug].ga = false;
          (window as any).__stepFormEventSent = m;
        }, 3000);

        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', eventName, {
              event_category: 'engagement',
              event_label: event.detail?.formName || `StepForm ${formSlug}`,
              form_slug: formSlug,
              page_url: window.location.href,
            });
            console.log(`✅ Evento ${eventName} enviado para GA`);
          } else {
            console.warn('❌ gtag não disponível no momento do envio');
          }
        }, 250); // Aguardar para o GA estar pronto em produção
      }
    };

    const existingHandler = (window as any)[`stepFormGAHandler_${formSlug}`];
    if (existingHandler) {
      window.removeEventListener('stepFormSubmitSuccess', existingHandler);
    }
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormGAHandler_${formSlug}`] = handleSuccess;
  };

  const removeStepFormScripts = (formSlug: string) => {
    console.log(`🧹 Removendo scripts do StepForm: ${formSlug}`);
    
    // Remover scripts
    const selectors = [
      `[data-stepform-fb="${formSlug}"]`,
      `[data-stepform-gtm="${formSlug}"]`,
      `[data-stepform-ga="${formSlug}"]`,
      `[data-stepform-gtm-noscript="${formSlug}"]`
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Remover event listeners
    const pixelHandler = (window as any)[`stepFormPixelHandler_${formSlug}`];
    const gtmHandler = (window as any)[`stepFormGTMHandler_${formSlug}`];
    const gaHandler = (window as any)[`stepFormGAHandler_${formSlug}`];

    if (pixelHandler) {
      window.removeEventListener('stepFormSubmitSuccess', pixelHandler);
      delete (window as any)[`stepFormPixelHandler_${formSlug}`];
    }
    if (gtmHandler) {
      window.removeEventListener('stepFormSubmitSuccess', gtmHandler);
      delete (window as any)[`stepFormGTMHandler_${formSlug}`];
    }
    if (gaHandler) {
      window.removeEventListener('stepFormSubmitSuccess', gaHandler);
      delete (window as any)[`stepFormGAHandler_${formSlug}`];
    }

    // Limpar funções globais
    delete (window as any).trackStepFormPixel;
    delete (window as any).trackStepFormGTM;
    delete (window as any).trackStepFormGA;
  };
};