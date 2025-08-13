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
    console.log('📘 Carregando Facebook Pixel (programático):', pixelId);

    try {
      // Definir fbq programaticamente
      const w: any = window;
      if (!w.fbq) {
        const fbq: any = function (...args: any[]) {
          fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
        };
        fbq.queue = [];
        fbq.loaded = true;
        fbq.version = '2.0';
        w.fbq = fbq;
        w._fbq = fbq;
      }

      // Carregar fbevents.js se ainda não estiver presente
      if (!document.querySelector('script[data-marketing="fb-pixel-src"]')) {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://connect.facebook.net/en_US/fbevents.js';
        s.setAttribute('data-marketing', 'fb-pixel-src');
        document.head.appendChild(s);
      }

      // Inicializar e enviar PageView
      w.fbq('init', pixelId);
      w.fbq('track', 'PageView');
      console.log('✅ Facebook Pixel inicializado');
    } catch (e) {
      console.error('❌ Erro ao carregar Facebook Pixel:', e);
    }
  };

  const loadGoogleTagManager = () => {
    const gtmId = 'GTM-PL22PJ6V';
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
    
    // StepForm
    const handleStepForm = (event: CustomEvent) => {
      const d = event.detail || {};
      console.log('🎯 StepForm submit detectado:', d);
      setTimeout(() => {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Contact', {
            content_name: 'StepForm Contact',
            form_slug: d.formSlug || 'stepform',
            page_url: window.location.href,
          });
          console.log('✅ FB Pixel Contact enviado (StepForm)');
        }
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({ event: 'stepform_conversion', form_slug: d.formSlug || 'stepform' });
          console.log('✅ GTM stepform_conversion enviado');
        }
        if ((window as any).gtag) {
          (window as any).gtag('event', 'conversion', { event_category: 'Lead Generation', event_label: 'StepForm' });
          console.log('✅ GA conversion enviado (StepForm)');
        }
      }, 150);
    };

    // Forms HTML
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (form?.tagName !== 'FORM') return;
      console.log('📝 HTML form submit detectado');
      setTimeout(() => {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'SubmitApplication', { content_name: 'Contact Form Submit', page_url: window.location.href });
          console.log('✅ FB Pixel SubmitApplication enviado (Contact)');
        }
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({ event: 'contact_conversion' });
          console.log('✅ GTM contact_conversion enviado');
        }
        if ((window as any).gtag) {
          (window as any).gtag('event', 'conversion', { event_category: 'Lead Generation', event_label: 'Contact Form' });
          console.log('✅ GA conversion enviado (Contact)');
        }
      }, 150);
    };

    // Clean up then add
    window.removeEventListener('stepFormSubmitSuccess', handleStepForm as EventListener);
    document.removeEventListener('submit', handleFormSubmit, true);

    window.addEventListener('stepFormSubmitSuccess', handleStepForm as EventListener);
    document.addEventListener('submit', handleFormSubmit, true);

    // Função de teste
    (window as any).testMarketingEvents = () => {
      console.log('🧪 Disparando eventos de teste...');
      if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'Test Event' });
      if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'test_conversion' });
      if ((window as any).gtag) (window as any).gtag('event', 'conversion', { event_category: 'Test', event_label: 'Manual' });
    };
    
    console.log('✅ Sistema de eventos configurado');
    console.log('💡 Para testar: window.testMarketingEvents()');
  };
};