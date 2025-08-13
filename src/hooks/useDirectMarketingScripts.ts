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
    // Debug: inspecionar chamadas de fbq e detectar "Lead"
    installFbqDebug();
  };

  const loadFacebookPixel = () => {
    const pixelId = '1024100955860841';
    console.log('📘 Carregando Facebook Pixel (programático):', pixelId);

    try {
      const w: any = window;

      // Garantir fbq existente (stub) e fbevents carregado
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

      if (!document.querySelector('script[src*="connect.facebook.net"][src*="fbevents.js"]')) {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://connect.facebook.net/en_US/fbevents.js';
        s.setAttribute('data-marketing', 'fb-pixel-src');
        document.head.appendChild(s);
      }

      // Evitar reinit duplicado no mesmo ciclo de vida
      w.__fbqActivePixels = w.__fbqActivePixels || new Set<string>();
      if (!w.__fbqActivePixels.has(pixelId)) {
        w.fbq('init', pixelId);
        w.__fbqActivePixels.add(pixelId);
        console.log('✅ fbq init feito para', pixelId);
      } else {
        console.log('ℹ️ fbq já inicializado para', pixelId);
      }

      // PageView apenas para confirmação
      w.fbq('track', 'PageView');
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
    
    // StepForm: gestão de eventos movida para useStepFormMarketingScripts


    // Eventos de formulário serão tratados pelos hooks dedicados (useStepFormMarketingScripts e useFormMarketingScripts)


    // Função de teste
    (window as any).testMarketingEvents = () => {
      console.log('🧪 Disparando eventos de teste...');
      if ((window as any).fbq) (window as any).fbq('track', 'Contact', { content_name: 'Test Event' });
      if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'test_conversion' });
      if ((window as any).gtag) (window as any).gtag('event', 'conversion', { event_category: 'Test', event_label: 'Manual' });
    };
    
    console.log('✅ Sistema de eventos configurado');
    console.log('💡 Para testar: window.testMarketingEvents()');
  };

  // Debug helper para inspecionar e identificar qualquer envio inesperado de "Lead"
  const installFbqDebug = () => {
    try {
      const w: any = window;
      const attach = () => {
        if (!w.fbq) return;
        if ((w as any).__fbqPatched) return;
        const original = w.fbq;
        const wrapper = function (...args: any[]) {
          try {
            if (args && args[0] === 'track') {
              const evt = args[1];
              if (evt === 'Lead') {
                console.warn('🚨 fbq("track","Lead") detectado. Stack:', new Error().stack);
              }
              console.log('📌 fbq.track:', evt, args[2] || {});
            }
          } catch {}
          return original.apply(this, args as any);
        } as any;
        w.fbq = wrapper;
        (w as any).__fbqPatched = true;
        console.log('🛡️ fbq debug wrapper instalado');
      };
      attach();
      setTimeout(attach, 800);
    } catch (e) {
      console.warn('⚠️ Falha ao instalar fbq debug wrapper:', e);
    }
  };
};