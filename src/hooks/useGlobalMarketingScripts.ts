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
  // Hook implementa scripts globais SEMPRE para garantir funcionamento
  useEffect(() => {
    console.log('🌐 Implementando scripts globais de marketing...');
    
    // Implementar scripts básicos imediatamente
    implementGlobalTracking();
    
  }, []);

  const implementGlobalTracking = () => {
    console.log('🚀 Implementando tracking global com IDs padrão');
    
    // Remover scripts existentes antes de implementar novos
    removeExistingScripts();
    
    // Implementar Facebook Pixel global
    implementGlobalFacebookPixel();
    
    // Implementar Google Tag Manager global  
    implementGlobalGoogleTagManager();
    
    // Implementar Google Analytics global
    implementGlobalGoogleAnalytics();
  };

  const implementGlobalFacebookPixel = () => {
    console.log('📘 Implementando Facebook Pixel GLOBAL');
    
    const pixelId = '1588678535149985';
    
    const fbPixelScript = document.createElement('script');
    fbPixelScript.setAttribute('data-marketing', 'facebook-pixel-global');
    fbPixelScript.innerHTML = `
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
      
      console.log('📘 Facebook Pixel Global inicializado:', '${pixelId}');
    `;
    document.head.appendChild(fbPixelScript);
    
    // Implementar rastreamento de eventos de formulário
    trackGlobalFormSubmissions();
  };

  const implementGlobalGoogleTagManager = () => {
    console.log('🏷️ Implementando Google Tag Manager GLOBAL');
    
    const containerId = 'GTM-N7TDJGMR';
    
    // Inicializar dataLayer
    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }
    
    const gtmScript = document.createElement('script');
    gtmScript.setAttribute('data-marketing', 'gtm-global');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
      
      console.log('🏷️ Google Tag Manager Global carregado:', '${containerId}');
    `;
    document.head.appendChild(gtmScript);

    // Adicionar noscript no body
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-noscript');
    document.body.appendChild(noscript);
  };

  const implementGlobalGoogleAnalytics = () => {
    console.log('📊 Implementando Google Analytics GLOBAL');
    
    const measurementId = 'G-FQVHCDRQLX';

    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'ga-global');
    document.head.appendChild(gtagScript);

    const configScript = document.createElement('script');
    configScript.setAttribute('data-marketing', 'ga-config');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
      
      console.log('📊 Google Analytics Global carregado:', '${measurementId}');
    `;
    document.head.appendChild(configScript);
  };

  const trackGlobalFormSubmissions = () => {
    console.log('📝 Configurando rastreamento global de formulários');
    
    // Listener para eventos personalizados de StepForm
    const handleStepFormSuccess = (event: CustomEvent) => {
      console.log('🎯 Evento StepForm capturado globalmente:', event.detail);
      
      // Facebook Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'StepForm Lead Generation',
          form_slug: event.detail?.formSlug || 'unknown',
          value: event.detail?.value || 1,
          currency: 'BRL',
          page_url: window.location.href,
          ...event.detail
        });
        console.log('📊 Evento Lead enviado para Facebook Pixel');
      }
      
      // Google Tag Manager
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'stepform_lead_generation',
          form_slug: event.detail?.formSlug || 'unknown',
          value: event.detail?.value || 1,
          currency: 'BRL',
          event_category: 'Lead Generation',
          event_action: 'StepForm Submit',
          page_url: window.location.href,
          ...event.detail
        });
        console.log('📊 Evento enviado para GTM dataLayer');
      }
      
      // Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Lead Generation',
          event_label: 'StepForm Submit',
          form_slug: event.detail?.formSlug || 'unknown',
          value: event.detail?.value || 1,
          ...event.detail
        });
        console.log('📊 Evento enviado para Google Analytics');
      }
    };
    
    // Adicionar listener para eventos de StepForm
    window.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    
    // Listener para formulários HTML normais
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.tagName === 'FORM') {
        console.log('📝 Formulário HTML enviado - rastreando globalmente');
        
        const formId = form.id || 'contact_form';
        
        // Facebook Pixel
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Contact Form',
            form_id: formId,
            page_url: window.location.href
          });
          console.log('📊 Evento Lead enviado para Facebook Pixel (formulário HTML)');
        }
        
        // Google Tag Manager
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'form_submission',
            form_id: formId,
            event_category: 'Lead Generation',
            event_action: 'Form Submit',
            page_url: window.location.href
          });
          console.log('📊 Evento enviado para GTM dataLayer (formulário HTML)');
        }
        
        // Google Analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'Lead Generation',
            event_label: 'Contact Form',
            form_id: formId
          });
          console.log('📊 Evento enviado para Google Analytics (formulário HTML)');
        }
      }
    };
    
    // Adicionar listener para todos os formulários
    document.addEventListener('submit', handleFormSubmit, true);
  };

  const removeExistingScripts = () => {
    console.log('🧹 Removendo scripts de marketing existentes');
    const existingScripts = document.querySelectorAll('[data-marketing]');
    existingScripts.forEach(script => {
      script.remove();
      console.log('🗑️ Script removido:', script.getAttribute('data-marketing'));
    });
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