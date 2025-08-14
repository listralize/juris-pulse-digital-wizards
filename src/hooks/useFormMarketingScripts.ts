import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useFormMarketingScripts = (formId: string) => {
  useEffect(() => {
    if (!formId) return;

    console.log(`🚀 Inicializando scripts de marketing para formulário: ${formId}`);
    
    // Carregar e implementar scripts imediatamente
    loadAndImplementScripts();

    return () => {
      console.log(`🧹 Limpando scripts do formulário: ${formId}`);
      removeFormScripts(formId);
    };
  }, [formId]);

  const loadAndImplementScripts = async () => {
    try {
      console.log(`🔍 Buscando configuração para formulário: ${formId}`);
      
      const { data: settings, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('❌ Erro ao buscar configuração:', error);
        return;
      }

      if (!settings?.form_tracking_config) {
        console.log('⚠️ Sem configuração de tracking');
        return;
      }

      let trackingConfig;
      if (typeof settings.form_tracking_config === 'string') {
        trackingConfig = JSON.parse(settings.form_tracking_config);
      } else {
        trackingConfig = settings.form_tracking_config;
      }

      console.log('📊 Configuração encontrada:', trackingConfig);

      const formConfig = trackingConfig.systemForms?.find(
        (form: any) => form.formId === formId && form.enabled
      );

      if (!formConfig) {
        console.log('ℹ️ Formulário não configurado ou desabilitado');
        return;
      }

      // Facebook Pixel: usar evento exatamente como configurado
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
      } else {
        console.log('ℹ️ Pixel desativado ou sem evento configurado');
      }

      // GTM: apenas empurrar evento se configurado
      const gtmCfg = formConfig.googleTagManager || {};
      const gtmEventName = gtmCfg.enabled === true ? (gtmCfg.eventName || '').trim() : '';
      if (gtmEventName) {
        implementGoogleTagManager(gtmEventName, formConfig);
      }

      // GA: apenas enviar evento se configurado
      const gaCfg = formConfig.googleAnalytics || {};
      const gaEventName = gaCfg.enabled === true ? (gaCfg.eventName || '').trim() : '';
      if (gaEventName) {
        implementGoogleAnalytics(gaEventName, formConfig);
      }

    } catch (error) {
      console.error('❌ Erro ao carregar configuração:', error);
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
    console.log(`📘 Configurando Facebook Pixel (listener apenas) para evento: ${eventName}`);

    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        // De-dup simples por formId
        const sentMap = (window as any).__formEventSent || {};
        if (sentMap[formId]?.fb) {
          console.log(`⏭️ FB Pixel ignorado (duplicado) para ${formId}`);
          return;
        }
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
            console.log(`✅ Evento ${eventName} enviado para Facebook Pixel`);
          } else {
            console.warn('❌ Facebook Pixel não disponível no momento do envio');
          }
        }, 250); // Aguardar para o pixel estar pronto em produção
      }
    };

    // Remover listener anterior se existir e registrar novo
    const existingHandler = (window as any)[`formPixelHandler_${formId}`];
    if (existingHandler) {
      window.removeEventListener('formSubmitSuccess', existingHandler);
    }
    window.addEventListener('formSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`formPixelHandler_${formId}`] = handleSuccess;
  };

  const implementGoogleTagManager = (eventName: string, formConfig: any) => {
    console.log(`🏷️ Formulário GTM listener para evento: ${eventName}`);

    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: eventName,
              form_id: formId,
              form_name: formConfig.campaignName || `Form ${formId}`,
              page_url: window.location.href,
            });
            console.log(`✅ Evento ${eventName} enviado para GTM`);
          } else {
            console.warn('❌ dataLayer não disponível no momento do envio');
          }
        }, 250);
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
    console.log(`📊 Formulário GA listener para evento: ${eventName}`);

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
            console.log(`✅ Evento ${eventName} enviado para GA`);
          } else {
            console.warn('❌ gtag não disponível no momento do envio');
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
    console.log(`🧹 Removendo scripts do formulário: ${formId}`);

    // Remover event listeners
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