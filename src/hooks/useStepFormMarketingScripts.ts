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

      // Implementar Facebook Pixel
      if (config.facebookPixel?.pixelId || config.pixel_id) {
        const pixelId = config.facebookPixel?.pixelId || config.pixel_id;
        const eventType = config.facebookPixel?.eventType || config.event_type || 'Contact';
        implementFacebookPixel(pixelId, eventType);
      } else {
        console.log('📘 Implementando Facebook Pixel fallback');
        implementFacebookPixel('1024100955860841', 'Contact'); // ID da imagem que o usuário mostrou
      }

      // Implementar Google Tag Manager
      if (config.googleTagManager?.containerId || config.gtm_id) {
        const containerId = config.googleTagManager?.containerId || config.gtm_id;
        implementGoogleTagManager(containerId);
      } else {
        implementGoogleTagManager('GTM-N7TDJGMR');
      }

      // Implementar Google Analytics
      if (config.googleAnalytics?.measurementId || config.ga_id) {
        const measurementId = config.googleAnalytics?.measurementId || config.ga_id;
        implementGoogleAnalytics(measurementId);
      } else {
        implementGoogleAnalytics('G-FQVHCDRQLX');
      }

    } catch (error) {
      console.error('❌ Erro ao carregar configuração:', error);
      implementFallbackScripts();
    }
  };

  const implementFallbackScripts = () => {
    console.log('🔄 Implementando scripts fallback para garantir funcionamento');
    implementFacebookPixel('1024100955860841', 'Contact'); // ID da configuração mostrada pelo usuário
    implementGoogleTagManager('GTM-N7TDJGMR');
    implementGoogleAnalytics('G-FQVHCDRQLX');
  };

  const implementFacebookPixel = (pixelId: string, eventType: string = 'Contact') => {
    console.log(`📘 Garantindo Facebook Pixel (somente listener): ${pixelId}`);

    // Apenas configurar listener; não injetar scripts aqui para evitar conflitos
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        console.log(`📊 StepForm ${formSlug} - disparando evento ${eventType}`);
        setTimeout(() => {
          if ((window as any).fbq) {
            (window as any).fbq('track', eventType, {
              content_name: `StepForm ${formSlug}`,
              form_slug: formSlug,
              page_url: window.location.href,
              value: 1,
              currency: 'BRL'
            });
            console.log(`✅ Evento ${eventType} enviado para Facebook Pixel`);
          } else {
            console.warn('❌ Facebook Pixel não disponível no momento do envio');
          }
        }, 100);
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

  const implementGoogleTagManager = (containerId: string) => {
    console.log(`🏷️ Implementando GTM: ${containerId}`);
    
    // Remover scripts antigos
    const oldScripts = document.querySelectorAll('[data-stepform-gtm]');
    oldScripts.forEach(script => script.remove());

    // Inicializar dataLayer
    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }

    // Criar script GTM
    const script = document.createElement('script');
    script.setAttribute('data-stepform-gtm', formSlug);
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
      
      console.log('🏷️ GTM ${containerId} carregado para StepForm ${formSlug}');
      
      // Função para rastrear submissão
      function trackGTMFormSubmission() {
        console.log('📊 Disparando evento GTM para ${formSlug}');
        dataLayer.push({
          event: 'stepform_submission',
          form_slug: '${formSlug}',
          form_name: 'StepForm ${formSlug}',
          page_url: window.location.href,
          event_category: 'Lead Generation',
          event_action: 'Form Submit'
        });
      }
      
      // Expor função globalmente
      window.trackStepFormGTM = trackGTMFormSubmission;
    `;
    document.head.appendChild(script);

    // Adicionar noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-stepform-gtm-noscript', formSlug);
    document.body.appendChild(noscript);

    // Event listener
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        console.log(`📊 StepForm ${formSlug} - disparando evento GTM`);
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'stepform_lead_generation',
            form_slug: formSlug,
            page_url: window.location.href,
            value: 1,
            currency: 'BRL'
          });
          console.log(`✅ Evento enviado para GTM ${containerId}`);
        }
      }
    };

    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormGTMHandler_${formSlug}`] = handleSuccess;
  };

  const implementGoogleAnalytics = (measurementId: string) => {
    console.log(`📊 Implementando GA: ${measurementId}`);
    
    // Remover scripts antigos
    const oldScripts = document.querySelectorAll('[data-stepform-ga]');
    oldScripts.forEach(script => script.remove());

    // Script principal do GA
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-stepform-ga', formSlug);
    document.head.appendChild(gtagScript);

    // Script de configuração
    const configScript = document.createElement('script');
    configScript.setAttribute('data-stepform-ga', formSlug);
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
      
      console.log('📊 GA ${measurementId} carregado para StepForm ${formSlug}');
      
      // Função para rastrear submissão
      function trackGAFormSubmission() {
        console.log('📊 Disparando evento GA para ${formSlug}');
        gtag('event', 'form_submit', {
          event_category: 'Lead Generation',
          event_label: 'StepForm ${formSlug}',
          form_slug: '${formSlug}',
          value: 1
        });
      }
      
      // Expor função globalmente
      window.trackStepFormGA = trackGAFormSubmission;
    `;
    document.head.appendChild(configScript);

    // Event listener
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        console.log(`📊 StepForm ${formSlug} - disparando evento GA`);
        if ((window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'Lead Generation',
            event_label: `StepForm ${formSlug}`,
            form_slug: formSlug,
            value: 1
          });
          console.log(`✅ Evento enviado para GA ${measurementId}`);
        }
      }
    };

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