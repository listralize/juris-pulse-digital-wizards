import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

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

    logger.log(`[${formSlug}] Inicializando scripts de marketing para StepForm`);
    loadAndImplementScripts();

    return () => {
      logger.log(`[${formSlug}] Limpando scripts do StepForm`);
      removeStepFormScripts(formSlug);
    };
  }, [formSlug]);

  const loadAndImplementScripts = async () => {
    try {
      const { data: stepForm, error } = await supabase
        .from('step_forms')
        .select('tracking_config, name, id, slug')
        .eq('slug', formSlug)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error(`[${formSlug}] Erro ao buscar StepForm:`, error);
        implementFallbackScripts();
        return;
      }

      if (!stepForm?.tracking_config) {
        logger.log(`[${formSlug}] Sem configuração de tracking - usando fallback`);
        implementFallbackScripts();
        return;
      }

      const config = stepForm.tracking_config as any;
      logger.log('Configuração encontrada:', config);

      // Facebook Pixel
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
      }

      // GTM
      const gtmCfg = config.google_tag_manager || {};
      const gtmEnabled = gtmCfg.enabled === true;
      const gtmEventName = gtmEnabled ? (gtmCfg.event_name || '').trim() : '';
      
      if (gtmEnabled && gtmEventName) {
        implementGoogleTagManager(gtmEventName);
      }

      // GA
      const gaCfg = (config.google_analytics || {});
      const gaEventName = gaCfg.enabled === true ? (gaCfg.event_name || '').trim() : '';
      if (gaEventName) {
        implementGoogleAnalytics(gaEventName);
      }

    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
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
    // Fallback desativado: sem injeção de GTM/GA/Pixel no StepForm
  };

  const implementFacebookPixel = (eventName: string) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        const sentMap = (window as any).__stepFormEventSent || {};
        if (sentMap[formSlug]?.fb) return;
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
            logger.log(`[${formSlug}] Evento ${eventName} enviado para Facebook Pixel`);
          } else {
            logger.warn(`[${formSlug}] Facebook Pixel não disponível no momento do envio`);
          }
        }, 1000);
      }
    };

    const existingHandler = (window as any)[`stepFormPixelHandler_${formSlug}`];
    if (existingHandler) {
      window.removeEventListener('stepFormSubmitSuccess', existingHandler);
    }
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormPixelHandler_${formSlug}`] = handleSuccess;
  };

  const implementGoogleTagManager = (eventName: string) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        const sentMap = (window as any).__stepFormEventSent || {};
        if (sentMap[formSlug]?.gtm) return;
        sentMap[formSlug] = { ...(sentMap[formSlug] || {}), gtm: true };
        (window as any).__stepFormEventSent = sentMap;
        setTimeout(() => {
          const m = (window as any).__stepFormEventSent || {};
          if (m[formSlug]) m[formSlug].gtm = false;
          (window as any).__stepFormEventSent = m;
        }, 3000);

        setTimeout(() => {
          const userData = event.detail?.userData || {};
          const formData = event.detail?.formData || {};
          const answers = event.detail?.answers || {};
          
          const email = userData.email || formData.email || answers.email || userData.Email || formData.Email || answers.Email || '';
          const nome = userData.nome || formData.nome || answers.nome || userData.name || formData.name || answers.name || userData.Nome || formData.Nome || answers.Nome || '';
          const telefone = userData.telefone || formData.telefone || answers.telefone || userData.phone || formData.phone || answers.phone || userData.Telefone || formData.Telefone || answers.Telefone || '';
          const ip = userData.ip_address || formData.ip_address || answers.ip_address || '';

          const eventData = {
            event: eventName,
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_title: document.title,
            session_id: event.detail?.sessionId || sessionStorage.getItem('sessionId') || '',
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            customer_email: email,
            customer_phone: telefone,
            customer_full_name: nome,
            form_slug: formSlug,
            form_name: event.detail?.formName || `StepForm ${formSlug}`,
            form_id: formSlug,
            domain: window.location.hostname,
            ip_address: ip,
            utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
            utm_term: new URLSearchParams(window.location.search).get('utm_term') || undefined,
            utm_content: new URLSearchParams(window.location.search).get('utm_content') || undefined,
          };

          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push(eventData);
          logger.log(`[${formSlug}] Evento "${eventName}" enviado para GTM`);
        }, 1000);
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
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        const sentMap = (window as any).__stepFormEventSent || {};
        if (sentMap[formSlug]?.ga) return;
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
            logger.log(`Evento ${eventName} enviado para GA`);
          } else {
            logger.warn('gtag não disponível no momento do envio');
          }
        }, 250);
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

    delete (window as any).trackStepFormPixel;
    delete (window as any).trackStepFormGTM;
    delete (window as any).trackStepFormGA;
  };
};
