import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MarketingScripts {
  facebookPixel: {
    enabled: boolean;
    pixelId: string;
    customCode: string;
    conversionApiToken: string;
  };
  googleAnalytics: {
    enabled: boolean;
    measurementId: string;
    customCode: string;
  };
  googleTagManager: {
    enabled: boolean;
    containerId: string;
  };
  customScripts: {
    head: string;
    body: string;
  };
}

export const useGlobalMarketingScripts = () => {
  useEffect(() => {
    console.log('🌐 Implementando scripts globais de marketing...');
    
    // Aguardar um pouco para garantir que o DOM está pronto
    setTimeout(() => {
      implementGlobalTracking();
    }, 100);
    
  }, []);

  const implementGlobalTracking = () => {
    console.log('🚀 Implementando tracking global com IDs padrão');
    
    // Limpar qualquer implementação anterior
    if ((window as any).fbq) {
      delete (window as any).fbq;
      delete (window as any)._fbq;
    }
    if ((window as any).gtag) {
      delete (window as any).gtag;
    }
    
    // Remover scripts existentes
    document.querySelectorAll('[data-marketing]').forEach(el => el.remove());
    
    // Implementar Facebook Pixel com inicialização imediata
    implementFacebookPixelDirect();
    
    // Implementar Google Tag Manager
    implementGoogleTagManagerDirect();
    
    // Implementar Google Analytics
    implementGoogleAnalyticsDirect();
  };

  const implementFacebookPixelDirect = () => {
    const pixelId = '1024100955860841';
    console.log('📘 Implementando Facebook Pixel:', pixelId);
    
    // Limpar qualquer instância anterior
    if ((window as any).fbq) {
      delete (window as any).fbq;
    }
    if ((window as any)._fbq) {
      delete (window as any)._fbq;
    }
    
    // Implementar pixel diretamente no window
    (window as any).fbq = function() {
      if ((window as any).fbq.callMethod) {
        (window as any).fbq.callMethod.apply((window as any).fbq, arguments);
      } else {
        (window as any).fbq.queue.push(arguments);
      }
    };
    
    if (!(window as any)._fbq) (window as any)._fbq = (window as any).fbq;
    (window as any).fbq.push = (window as any).fbq;
    (window as any).fbq.loaded = true;
    (window as any).fbq.version = '2.0';
    (window as any).fbq.queue = [];
    
    // Carregar script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.setAttribute('data-marketing', 'facebook-pixel');
    document.head.appendChild(script);
    
    // Inicializar pixel
    (window as any).fbq('init', pixelId);
    (window as any).fbq('track', 'PageView');
    
    console.log('✅ Facebook Pixel inicializado:', pixelId);
    console.log('✅ fbq function:', typeof (window as any).fbq);
    
    // Configurar rastreamento
    setupFormTracking();
  };

  const implementGoogleTagManagerDirect = () => {
    const containerId = 'GTM-N7TDJGMR';
    console.log('🏷️ Implementando Google Tag Manager:', containerId);
    
    // Inicializar dataLayer corretamente
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    
    // Carregar GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    script.setAttribute('data-marketing', 'gtm');
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
    
    console.log('✅ GTM script carregado:', containerId);
    console.log('✅ dataLayer:', (window as any).dataLayer);

    // Adicionar noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-noscript');
    document.body.appendChild(noscript);
  };

  const implementGoogleAnalyticsDirect = () => {
    const measurementId = 'G-FQVHCDRQLX';
    console.log('📊 Implementando Google Analytics:', measurementId);

    // Carregar script do gtag
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'ga');
    document.head.appendChild(gtagScript);

    // Configurar gtag
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
      
      console.log('✅ Google Analytics carregado:', '${measurementId}');
    `;
    configScript.setAttribute('data-marketing', 'ga-config');
    document.head.appendChild(configScript);
  };

  const setupFormTracking = () => {
    console.log('📝 Configurando rastreamento de formulários');
    
    // Função para disparar eventos de conversão
    const triggerConversionEvents = (eventType: string, eventData: any = {}) => {
      console.log('🎯 Disparando eventos de conversão:', eventType, eventData);
      
      // Facebook Pixel - Contact event para conversões
      if ((window as any).fbq) {
        try {
          (window as any).fbq('track', 'Contact', {
            content_name: eventData.contentName || 'Form Submission',
            form_slug: eventData.formSlug || window.location.pathname,
            page_url: window.location.href,
            event_source_url: window.location.href,
            ...eventData
          });
          console.log('✅ Facebook Pixel Contact event enviado');
          
          // Também enviar Lead event para garantir
          (window as any).fbq('track', 'Lead', {
            content_name: eventData.contentName || 'Lead Generation',
            form_slug: eventData.formSlug || window.location.pathname,
            page_url: window.location.href,
            ...eventData
          });
          console.log('✅ Facebook Pixel Lead event enviado');
        } catch (error) {
          console.error('❌ Erro no Facebook Pixel:', error);
        }
      } else {
        console.warn('❌ Facebook Pixel não disponível');
      }
      
      // Google Tag Manager
      if ((window as any).dataLayer) {
        try {
          (window as any).dataLayer.push({
            event: 'form_conversion',
            event_category: 'Lead Generation',
            event_action: eventType,
            form_slug: eventData.formSlug || window.location.pathname,
            page_url: window.location.href,
            ...eventData
          });
          console.log('✅ GTM conversion event enviado');
        } catch (error) {
          console.error('❌ Erro no GTM:', error);
        }
      } else {
        console.warn('❌ GTM dataLayer não disponível');
      }
      
      // Google Analytics
      if ((window as any).gtag) {
        try {
          (window as any).gtag('event', 'conversion', {
            event_category: 'Lead Generation',
            event_label: eventType,
            form_slug: eventData.formSlug || window.location.pathname,
            ...eventData
          });
          console.log('✅ GA conversion event enviado');
        } catch (error) {
          console.error('❌ Erro no GA:', error);
        }
      } else {
        console.warn('❌ Google Analytics não disponível');
      }
    };
    
    // Listener para StepForm
    const handleStepFormEvent = (event: CustomEvent) => {
      console.log('🎯 StepForm evento capturado:', event.detail);
      
      triggerConversionEvents('StepForm Submit', {
        contentName: 'StepForm Conversion',
        formSlug: event.detail?.formSlug || 'stepform',
        formName: event.detail?.formName || 'StepForm',
        ...event.detail
      });
    };
    
    // Listener para formulários normais
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form?.tagName === 'FORM') {
        console.log('📝 Form submission detectado');
        
        triggerConversionEvents('Contact Form Submit', {
          contentName: 'Contact Form Conversion',
          formSlug: 'contact-form',
          formId: form.id || 'unknown'
        });
      }
    };
    
    // Remover listeners existentes e adicionar novos
    window.removeEventListener('stepFormSubmitSuccess', handleStepFormEvent as EventListener);
    window.addEventListener('stepFormSubmitSuccess', handleStepFormEvent as EventListener);
    
    document.removeEventListener('submit', handleFormSubmit, true);
    document.addEventListener('submit', handleFormSubmit, true);
    
    // Exposer função global para teste
    (window as any).testPixelEvent = () => {
      triggerConversionEvents('Test Event', {
        contentName: 'Manual Test',
        test: true
      });
    };
    
    console.log('✅ Sistema de rastreamento configurado');
    console.log('💡 Para testar: window.testPixelEvent()');
  };

  const removeExistingScripts = () => {
    console.log('🧹 Removendo scripts de marketing existentes');
    
    // Remover scripts com data-marketing
    const existingScripts = document.querySelectorAll('[data-marketing]');
    existingScripts.forEach(script => {
      script.remove();
      console.log('🗑️ Script removido:', script.getAttribute('data-marketing'));
    });
    
    // Limpar objetos globais
    if ((window as any).fbq) {
      delete (window as any).fbq;
      delete (window as any)._fbq;
    }
    
    if ((window as any).gtag) {
      delete (window as any).gtag;
    }
  };

  const implementMarketingScripts = (scripts: MarketingScripts) => {
    console.log('🚀 Implementando scripts globalmente:', scripts);

    // Remover scripts antigos
    removeExistingScripts();

    // Facebook Pixel
    if (scripts.facebookPixel.enabled && scripts.facebookPixel.pixelId) {
      implementFacebookPixel(scripts.facebookPixel);
    }

    // Google Analytics
    if (scripts.googleAnalytics.enabled && scripts.googleAnalytics.measurementId) {
      implementGoogleAnalytics(scripts.googleAnalytics);
    }

    // Google Tag Manager
    if (scripts.googleTagManager.enabled && scripts.googleTagManager.containerId) {
      implementGoogleTagManager(scripts.googleTagManager);
    }

    // Scripts customizados
    if (scripts.customScripts.head || scripts.customScripts.body) {
      implementCustomScripts(scripts.customScripts);
    }

    console.log('✅ Scripts globais implementados com sucesso!');
  };

  const implementFacebookPixel = (config: any) => {
    console.log('📘 Implementando Facebook Pixel globalmente:', config.pixelId);
    
    // Limpar instâncias anteriores do fbq
    if ((window as any).fbq) {
      delete (window as any).fbq;
      delete (window as any)._fbq;
    }
    
    const fbPixelScript = document.createElement('script');
    fbPixelScript.setAttribute('data-marketing', 'facebook-pixel');
    fbPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${config.pixelId}');
      fbq('set', 'autoConfig', 'false', '${config.pixelId}');
    `;
    document.head.appendChild(fbPixelScript);

    // Não enviar PageView automaticamente globalmente; eventos serão disparados conforme configuração específica
  };

  const implementGoogleAnalytics = (config: any) => {
    console.log('📊 Implementando Google Analytics globalmente:', config.measurementId);

    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'google-analytics');
    document.head.appendChild(gtagScript);

    const configScript = document.createElement('script');
    configScript.setAttribute('data-marketing', 'google-analytics');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.measurementId}');
      ${config.customCode || ''}
    `;
    document.head.appendChild(configScript);
  };

  const implementGoogleTagManager = (config: any) => {
    console.log('🏷️ Implementando Google Tag Manager globalmente:', config.containerId);

    const gtmScript = document.createElement('script');
    gtmScript.setAttribute('data-marketing', 'google-tag-manager');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${config.containerId}');
    `;
    document.head.appendChild(gtmScript);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
  };

  const implementCustomScripts = (config: any) => {
    console.log('🔧 Implementando scripts customizados globalmente');
    if (config.head) {
      const headScript = document.createElement('div');
      headScript.setAttribute('data-marketing', 'custom');
      headScript.innerHTML = config.head;
      document.head.appendChild(headScript);
    }
    if (config.body) {
      const bodyScript = document.createElement('div');
      bodyScript.setAttribute('data-marketing', 'custom');
      bodyScript.innerHTML = config.body;
      document.body.appendChild(bodyScript);
    }
  };

  const trackFormSubmissions = (pixelId: string) => {
    // Adicionar listener global para submissões de formulário
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.tagName === 'FORM') {
        console.log('📝 Formulário enviado - rastreando com Facebook Pixel');
        
        // Buscar configuração personalizada do botão/form
        const formId = form.id || 'unknown';
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const buttonId = submitButton?.id || '';
        
        if ((window as any).fbq) {
          // Evento personalizado baseado no ID do botão/form
          if (buttonId.includes('lead') || formId.includes('lead')) {
            (window as any).fbq('track', 'Lead', {
              content_name: 'Lead Generation',
              form_id: formId,
              button_id: buttonId,
              page_url: window.location.href
            });
            console.log('📊 Evento "Lead" rastreado para:', { formId, buttonId });
          } else if (buttonId.includes('conversion') || formId.includes('conversion')) {
            (window as any).fbq('track', 'Purchase', {
              content_name: 'Conversion',
              form_id: formId,
              button_id: buttonId,
              page_url: window.location.href
            });
            console.log('📊 Evento "Purchase" rastreado para:', { formId, buttonId });
          } else {
            // Evento padrão apenas se não houver configuração específica
            (window as any).fbq('track', 'SubmitApplication', {
              content_name: 'Form Submission',
              form_id: formId,
              button_id: buttonId,
              page_url: window.location.href
            });
            console.log('📊 Evento "SubmitApplication" rastreado para:', { formId, buttonId });
          }
        }
      }
    };

    // Remover listener anterior se existir
    document.removeEventListener('submit', handleFormSubmit);
    
    // Adicionar novo listener
    document.addEventListener('submit', handleFormSubmit, true);
  };
};