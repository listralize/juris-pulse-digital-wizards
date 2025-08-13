import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

export const useDirectMarketingScripts = () => {
  useEffect(() => {
    console.log('🚀 Carregando scripts de marketing diretamente...');
    
    // Aguardar DOM estar pronto
    const timer = setTimeout(() => {
      loadAllScripts();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const loadAllScripts = () => {
    // Limpar scripts anteriores
    document.querySelectorAll('[data-marketing]').forEach(el => el.remove());
    
    // Carregar Facebook Pixel
    loadFacebookPixel();
    
    // Carregar Google Tag Manager
    loadGoogleTagManager();
    
    // Carregar Google Analytics
    loadGoogleAnalytics();
    
    // Configurar eventos
    setupEvents();
  };

  const loadFacebookPixel = () => {
    const pixelId = '1024100955860841';
    console.log('📘 Carregando Facebook Pixel:', pixelId);
    
    // Limpar instâncias anteriores
    delete window.fbq;
    delete window._fbq;
    
    // Implementar código do Facebook Pixel diretamente
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
      
      console.log('✅ Facebook Pixel inicializado:', '${pixelId}');
    `;
    script.setAttribute('data-marketing', 'fb-pixel');
    document.head.appendChild(script);
    
    console.log('✅ Facebook Pixel carregado via script inline');
  };

  const loadGoogleTagManager = () => {
    const gtmId = 'GTM-N7TDJGMR';
    console.log('🏷️ Carregando Google Tag Manager:', gtmId);
    
    // Inicializar dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    
    // Carregar script GTM
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    script.setAttribute('data-marketing', 'gtm-script');
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
    
    // Noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-noscript');
    document.body.appendChild(noscript);
    
    console.log('✅ Google Tag Manager carregado');
  };

  const loadGoogleAnalytics = () => {
    const gaId = 'G-FQVHCDRQLX';
    console.log('📊 Carregando Google Analytics:', gaId);
    
    // Script do gtag
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gtagScript.setAttribute('data-marketing', 'ga-script');
    document.head.appendChild(gtagScript);
    
    // Configuração
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', gaId);
    
    console.log('✅ Google Analytics carregado');
  };

  const setupEvents = () => {
    console.log('📝 Configurando eventos de conversão');
    
    // Aguardar scripts carregarem
    setTimeout(() => {
      // StepForm eventos
      const handleStepForm = (event: CustomEvent) => {
        console.log('🎯 StepForm conversão:', event.detail);
        
        // Facebook Pixel
        if (window.fbq) {
          window.fbq('track', 'Contact', {
            content_name: 'StepForm Lead',
            form_slug: event.detail?.formSlug || 'stepform',
            page_url: window.location.href
          });
          console.log('✅ FB Pixel: Contact enviado');
        }
        
        // GTM
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'stepform_conversion',
            form_slug: event.detail?.formSlug || 'stepform',
            event_category: 'Lead Generation',
            event_action: 'StepForm Submit'
          });
          console.log('✅ GTM: stepform_conversion enviado');
        }
        
        // GA
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            event_category: 'Lead Generation',
            event_label: 'StepForm Submit',
            form_slug: event.detail?.formSlug || 'stepform'
          });
          console.log('✅ GA: conversion enviado');
        }
      };
      
      // Contact form eventos
      const handleContactForm = (event: Event) => {
        const form = event.target as HTMLFormElement;
        if (form?.tagName === 'FORM') {
          console.log('📝 Contact form conversão');
          
          // Facebook Pixel
          if (window.fbq) {
            window.fbq('track', 'Contact', {
              content_name: 'Contact Form Lead',
              page_url: window.location.href
            });
            console.log('✅ FB Pixel: Contact enviado (form)');
          }
          
          // GTM
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'contact_conversion',
              event_category: 'Lead Generation',
              event_action: 'Contact Form Submit'
            });
            console.log('✅ GTM: contact_conversion enviado (form)');
          }
          
          // GA
          if (window.gtag) {
            window.gtag('event', 'conversion', {
              event_category: 'Lead Generation',
              event_label: 'Contact Form Submit'
            });
            console.log('✅ GA: conversion enviado (form)');
          }
        }
      };
      
      // Adicionar listeners
      window.addEventListener('stepFormSubmitSuccess', handleStepForm as EventListener);
      document.addEventListener('submit', handleContactForm, true);
      
      // Função de teste global
      (window as any).testMarketingEvents = () => {
        console.log('🧪 Testando eventos de marketing...');
        
        if (window.fbq) {
          window.fbq('track', 'Contact', {
            content_name: 'Test Event',
            test: true
          });
          console.log('✅ Test Contact event enviado para FB Pixel');
        }
        
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'test_conversion',
            test: true
          });
          console.log('✅ Test event enviado para GTM');
        }
        
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            event_category: 'Test',
            event_label: 'Manual Test'
          });
          console.log('✅ Test event enviado para GA');
        }
      };
      
      console.log('✅ Sistema de eventos configurado');
      console.log('💡 Para testar: window.testMarketingEvents()');
    }, 1500);
  };
};