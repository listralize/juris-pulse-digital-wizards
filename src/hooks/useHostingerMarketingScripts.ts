import { useEffect } from 'react';

export const useHostingerMarketingScripts = () => {
  useEffect(() => {
    console.log('🚀 [HOSTINGER] Inicializando scripts de marketing otimizados...');
    
    // Aguardar o DOM estar completamente carregado
    const timer = setTimeout(() => {
      initializeMarketingScripts();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const initializeMarketingScripts = () => {
    console.log('🔧 [HOSTINGER] Configurando scripts de marketing...');
    
    // Detectar se é Hostinger ou stadv.com.br
    const hostname = window.location.hostname;
    const isHostinger = hostname.includes('.hostinger') || 
                       hostname.includes('.000.pe') ||
                       hostname.includes('.hostingersite.com') ||
                       hostname.includes('.hstgr.io') ||
                       hostname.includes('stadv.com.br') ||
                       (!hostname.includes('localhost') && 
                        !hostname.includes('lovable.app') && 
                        !hostname.includes('127.0.0.1'));
    
    console.log('🌍 [HOSTINGER] Detectado ambiente:', {
      hostname: hostname,
      isHostinger,
      isProduction: window.location.protocol === 'https:',
      userAgent: navigator.userAgent.substring(0, 100)
    });

    // Configurar scripts sempre para stadv.com.br e ambientes de produção
    if (isHostinger || window.location.protocol === 'https:' || hostname.includes('stadv.com.br')) {
      console.log('🚀 [HOSTINGER] Inicializando scripts de marketing para:', hostname);
      
      // Limpar scripts conflitantes primeiro
      clearConflictingScripts();
      
      // Aguardar um pouco para garantir limpeza
      setTimeout(() => {
        setupHostingerFacebookPixel();
        setupHostingerGTM();
        setupHostingerGA();
        
        // Aguardar scripts carregarem antes do debug
        setTimeout(() => {
          setupDebugLogging();
        }, 3000);
      }, 500);
    } else {
      console.log('🔧 [HOSTINGER] Ambiente de desenvolvimento detectado - scripts não carregados');
    }
  };

  const setupHostingerFacebookPixel = () => {
    const pixelId = '1024100955860841';
    console.log('📘 [HOSTINGER] Configurando Facebook Pixel:', pixelId);
    
    // Limpar pixel existente
    if ((window as any).fbq) {
      console.log('🔄 [HOSTINGER] Pixel já existe, reconfigurando...');
    }
    
    // Script inline otimizado para Hostinger
    const script = document.createElement('script');
    script.innerHTML = `
      console.log('🚀 [HOSTINGER] Carregando Facebook Pixel...');
      
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){
          n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
        };
        if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
        t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      // Configuração com retry
      try {
        fbq('init', '${pixelId}', {}, { autoConfig: false });
        fbq('set', 'autoConfig', false, '${pixelId}');
        fbq('set', 'agent', 'hostinger', '${pixelId}');
        fbq('track', 'PageView');
        console.log('✅ [HOSTINGER] Facebook Pixel inicializado');
      } catch (e) {
        console.error('❌ [HOSTINGER] Erro ao inicializar pixel:', e);
        setTimeout(function() {
          try {
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
            console.log('✅ [HOSTINGER] Facebook Pixel retry bem-sucedido');
          } catch (e2) {
            console.error('❌ [HOSTINGER] Retry falhou:', e2);
          }
        }, 2000);
      }
    `;
    script.setAttribute('data-hostinger-marketing', 'fb-pixel');
    document.head.appendChild(script);
  };

  const setupHostingerGTM = () => {
    const gtmId = 'GTM-PL22PJ6V';
    console.log('🏷️ [HOSTINGER] Configurando Google Tag Manager:', gtmId);
    
    // Inicializar dataLayer primeiro
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    const script = document.createElement('script');
    script.innerHTML = `
      console.log('🚀 [HOSTINGER] Carregando GTM...');
      
      (function(w,d,s,l,i){
        console.log('📡 [HOSTINGER] Iniciando GTM para:', i);
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        
        j.onload = function() {
          console.log('✅ [HOSTINGER] GTM carregado para:', i);
          console.log('📊 [HOSTINGER] DataLayer:', typeof window.dataLayer, window.dataLayer.length);
        };
        
        j.onerror = function() {
          console.error('❌ [HOSTINGER] Falha ao carregar GTM:', i);
        };
        
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
      
      // Verificação após 5 segundos
      setTimeout(function() {
        console.log('🔍 [HOSTINGER] Status GTM após 5s:', {
          dataLayerLength: window.dataLayer ? window.dataLayer.length : 0,
          gtmLoaded: window.google_tag_manager ? 'Sim' : 'Não'
        });
      }, 5000);
    `;
    script.setAttribute('data-hostinger-marketing', 'gtm');
    document.head.appendChild(script);

    // Noscript para GTM
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-hostinger-marketing', 'gtm-ns');
    document.body.appendChild(noscript);
  };

  const setupHostingerGA = () => {
    const gaId = 'G-FQVHCDRQLX';
    console.log('📊 [HOSTINGER] Configurando Google Analytics:', gaId);

    // Script do GA
    const gaScript = document.createElement('script');
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gaScript.async = true;
    gaScript.setAttribute('data-hostinger-marketing', 'ga-lib');
    document.head.appendChild(gaScript);

    // Configuração
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      console.log('🚀 [HOSTINGER] Configurando GA...');
      
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
      
      console.log('✅ [HOSTINGER] GA configurado:', typeof window.gtag);
    `;
    configScript.setAttribute('data-hostinger-marketing', 'ga-config');
    document.head.appendChild(configScript);
  };

  const setupDebugLogging = () => {
    // Verificação periódica do status dos scripts
    const checkInterval = setInterval(() => {
      console.log('🔍 [HOSTINGER] Status dos scripts:', {
        timestamp: new Date().toISOString(),
        domain: window.location.hostname,
        fbq: typeof (window as any).fbq,
        gtag: typeof (window as any).gtag,
        dataLayer: (window as any).dataLayer ? (window as any).dataLayer.length : 'undefined'
      });
    }, 10000); // A cada 10 segundos

    // Limpar após 2 minutos
    setTimeout(() => {
      clearInterval(checkInterval);
      console.log('🏁 [HOSTINGER] Debug finalizado');
    }, 120000);
  };

  const clearConflictingScripts = () => {
    console.log('🧹 [HOSTINGER] Limpando scripts conflitantes...');
    
    // Remover scripts de marketing existentes
    document.querySelectorAll('[data-marketing]').forEach(el => {
      console.log('🗑️ Removendo script conflitante:', el.getAttribute('data-marketing'));
      el.remove();
    });
    
    // Limpar objetos globais que possam estar interferindo
    if ((window as any).fbq) {
      console.log('🔄 Limpando fbq global...');
    }
    
    if ((window as any).dataLayer) {
      console.log('🔄 Resetando dataLayer...');
      (window as any).dataLayer = [];
    }
  };
};