import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export const useFormMarketingScripts = (formId: string) => {
  useEffect(() => {
    if (!formId) return;

    logger.log(`Inicializando scripts de marketing para formulário: ${formId}`);
    loadAndImplementScripts();

    return () => {
      removeFormScripts(formId);
    };
  }, [formId]);

  const loadAndImplementScripts = async () => {
    try {
      const { data: settings, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Erro ao buscar configuração de marketing:', error);
        return;
      }

      if (!settings?.form_tracking_config) return;

      let trackingConfig;
      if (typeof settings.form_tracking_config === 'string') {
        trackingConfig = JSON.parse(settings.form_tracking_config);
      } else {
        trackingConfig = settings.form_tracking_config;
      }

      const formConfig = trackingConfig.systemForms?.find(
        (form: any) => form.formId === formId && form.enabled
      );

      if (!formConfig) return;

      // Facebook Pixel
      const pixelCfg = formConfig.facebookPixel || {};
      let eventName: string | null = null;
      if (pixelCfg.enabled === true) {
        if (pixelCfg.eventType === 'Custom') {
          eventName = (pixelCfg.customEventName || '').trim().replace(/\s+/g, '') || null;
        } else {
          eventName = normalizeEventName(pixelCfg.eventType);
        }
      }
      if (eventName) {
        implementFacebookPixel(eventName, formConfig);
      }

      // GTM
      const gtmCfg = formConfig.googleTagManager || {};
      const gtmEventName = gtmCfg.enabled === true ? (gtmCfg.eventName || '').trim() : '';
      if (gtmEventName) {
        implementGoogleTagManager(gtmEventName, formConfig);
      }

      // GA
      const gaCfg = formConfig.googleAnalytics || {};
      const gaEventName = gaCfg.enabled === true ? (gaCfg.eventName || '').trim() : '';
      if (gaEventName) {
        implementGoogleAnalytics(gaEventName, formConfig);
      }

    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
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

  const implementFacebookPixel = (eventName: string, formConfig: any) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        const sentMap = (window as any).__formEventSent || {};
        if (sentMap[formId]?.fb) return;
        sentMap[formId] = { ...(sentMap[formId] || {}), fb: true };
        (window as any).__formEventSent = sentMap;
        setTimeout(() => {
          const m = (window as any).__formEventSent || {};
          if (m[formId]) m[formId].fb = false;
          (window as any).__formEventSent = m;
        }, 3000);

        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', eventName, {
              content_name: formConfig.campaignName || `Form ${formId}`,
              form_id: formId,
              page_url: window.location.href,
            });
            logger.log(`[${formId}] Evento ${eventName} enviado para Facebook Pixel`);
          } else {
            logger.warn(`[${formId}] Facebook Pixel não disponível no momento do envio`);
          }
        }, 1000);
      }
    };

    const existingHandler = (window as any)[`formPixelHandler_${formId}`];
    if (existingHandler) {
      window.removeEventListener('formSubmitSuccess', existingHandler);
    }
    window.addEventListener('formSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`formPixelHandler_${formId}`] = handleSuccess;
  };

  const implementGoogleTagManager = (eventName: string, formConfig: any) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        const sentMap = (window as any).__formEventSent || {};
        if (sentMap[formId]?.gtm) return;
        sentMap[formId] = { ...(sentMap[formId] || {}), gtm: true };
        (window as any).__formEventSent = sentMap;
        setTimeout(() => {
          const m = (window as any).__formEventSent || {};
          if (m[formId]) m[formId].gtm = false;
          (window as any).__formEventSent = m;
        }, 3000);

        setTimeout(() => {
          (window as any).dataLayer = (window as any).dataLayer || [];
          
          const eventData = {
            event: eventName,
            form_id: formId,
            form_name: formConfig.campaignName || `Form ${formId}`,
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
            domain: window.location.hostname,
            user_data: event.detail?.userData || {}
          };
          
          (window as any).dataLayer.push(eventData);
          logger.log(`[${formId}] Evento ${eventName} enviado para GTM`);
          
          if (eventName !== 'Lead') {
            (window as any).dataLayer.push({
              event: 'Lead',
              form_id: formId,
              form_name: formConfig.campaignName || `Form ${formId}`,
              page_url: window.location.href,
              timestamp: new Date().toISOString(),
              domain: window.location.hostname,
              source_event: eventName
            });
          }
        }, 1000);
      }
    };

    const existingHandler = (window as any)[`formGTMHandler_${formId}`];
    if (existingHandler) {
      window.removeEventListener('formSubmitSuccess', existingHandler);
    }
    window.addEventListener('formSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`formGTMHandler_${formId}`] = handleSuccess;
  };

  const implementGoogleAnalytics = (eventName: string, formConfig: any) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', eventName, {
              event_category: 'engagement',
              event_label: formConfig.campaignName || `Form ${formId}`,
              form_id: formId,
              page_url: window.location.href,
            });
            logger.log(`Evento ${eventName} enviado para GA`);
          } else {
            logger.warn('gtag não disponível no momento do envio');
          }
        }, 250);
      }
    };

    const existingHandler = (window as any)[`formGAHandler_${formId}`];
    if (existingHandler) {
      window.removeEventListener('formSubmitSuccess', existingHandler);
    }
    window.addEventListener('formSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`formGAHandler_${formId}`] = handleSuccess;
  };

  const removeFormScripts = (formId: string) => {
    const pixelHandler = (window as any)[`formPixelHandler_${formId}`];
    const gtmHandler = (window as any)[`formGTMHandler_${formId}`];
    const gaHandler = (window as any)[`formGAHandler_${formId}`];

    if (pixelHandler) {
      window.removeEventListener('formSubmitSuccess', pixelHandler);
      delete (window as any)[`formPixelHandler_${formId}`];
    }
    if (gtmHandler) {
      window.removeEventListener('formSubmitSuccess', gtmHandler);
      delete (window as any)[`formGTMHandler_${formId}`];
    }
    if (gaHandler) {
      window.removeEventListener('formSubmitSuccess', gaHandler);
      delete (window as any)[`formGAHandler_${formId}`];
    }
  };
};
