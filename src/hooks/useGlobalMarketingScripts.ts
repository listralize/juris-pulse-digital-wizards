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
    
    // Criar e inserir o código do pixel diretamente
    const script = document.createElement('script');
    script.innerHTML = `
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
      
      console.log('✅ Facebook Pixel carregado:', '${pixelId}');
      console.log('✅ fbq disponível:', typeof window.fbq);
    `;
    script.setAttribute('data-marketing', 'facebook-pixel');
    document.head.appendChild(script);
    
    // Configurar rastreamento de formulários
    setupFormTracking();
  };

  const implementGoogleTagManagerDirect = () => {
    const containerId = 'GTM-N7TDJGMR';
    console.log('🏷️ Implementando Google Tag Manager:', containerId);
    
    // Inicializar dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
      
      console.log('✅ GTM carregado:', '${containerId}');
    `;
    script.setAttribute('data-marketing', 'gtm');
    document.head.appendChild(script);

    // Adicionar noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
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
    
    // Listener para eventos personalizados de StepForm
    const handleStepFormEvent = (event: CustomEvent) => {
      console.log('🎯 StepForm evento capturado:', event.detail);
      
      setTimeout(() => {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Contact', {
            content_name: 'StepForm Submission',
            form_slug: event.detail?.formSlug || window.location.pathname,
            page_url: window.location.href
          });
          console.log('✅ Facebook Pixel Contact event enviado');
        }
        
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'stepform_submission',
            form_slug: event.detail?.formSlug || window.location.pathname
          });
          console.log('✅ GTM event enviado');
        }
        
        if ((window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'Lead Generation',
            event_label: 'StepForm'
          });
          console.log('✅ GA event enviado');
        }
      }, 100);
    };
    
    // Remover listeners existentes
    window.removeEventListener('stepFormSubmitSuccess', handleStepFormEvent as EventListener);
    window.addEventListener('stepFormSubmitSuccess', handleStepFormEvent as EventListener);
    
    // Listener para formulários normais
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form?.tagName === 'FORM') {
        console.log('📝 Form submission detectado');
        
        setTimeout(() => {
          if ((window as any).fbq) {
            (window as any).fbq('track', 'Contact', {
              content_name: 'Contact Form'
            });
            console.log('✅ Facebook Pixel Contact event enviado (form)');
          }
          
          if ((window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'form_submission'
            });
            console.log('✅ GTM event enviado (form)');
          }
          
          if ((window as any).gtag) {
            (window as any).gtag('event', 'form_submit', {
              event_category: 'Lead Generation'
            });
            console.log('✅ GA event enviado (form)');
          }
        }, 100);
      }
    };
    
    document.removeEventListener('submit', handleFormSubmit, true);
    document.addEventListener('submit', handleFormSubmit, true);
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