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
    console.log('🌐 Carregando scripts globais de marketing...');
    
    // Aguardar o DOM estar pronto
    const timer = setTimeout(() => {
      loadMarketingScriptsFromDatabase();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const loadMarketingScriptsFromDatabase = async () => {
    try {
      console.log('🔍 Buscando configuração de marketing no banco...');
      
      const { data: settings, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('❌ Erro ao carregar configuração de marketing:', error);
        loadFallbackScripts();
        return;
      }

      if (settings) {
        console.log('✅ Configuração de marketing encontrada:', settings);
        loadMarketingScriptsWithConfig(settings);
      } else {
        console.log('⚠️ Nenhuma configuração encontrada - usando fallback');
        loadFallbackScripts();
      }
    } catch (error) {
      console.error('❌ Erro ao buscar configuração:', error);
      loadFallbackScripts();
    }
  };

  const loadMarketingScriptsWithConfig = (settings: any) => {
    console.log('🚀 Carregando scripts com configuração do banco');
    
    // Limpar scripts existentes
    clearExistingScripts();
    
    // Carregar Facebook Pixel se habilitado
    if (settings.facebook_pixel_enabled && settings.facebook_pixel_id) {
      loadFacebookPixelFromConfig(settings.facebook_pixel_id, settings.facebook_custom_code);
    }
    
    // Carregar Google Tag Manager se habilitado
    if (settings.google_tag_manager_enabled && settings.google_tag_manager_id) {
      loadGoogleTagManagerFromConfig(settings.google_tag_manager_id);
    }
    
    // Carregar Google Analytics se habilitado
    if (settings.google_analytics_enabled && settings.google_analytics_id) {
      loadGoogleAnalyticsFromConfig(settings.google_analytics_id, settings.google_analytics_custom_code);
    }
    
    // Scripts customizados
    if (settings.custom_head_scripts || settings.custom_body_scripts) {
      loadCustomScripts(settings.custom_head_scripts, settings.custom_body_scripts);
    }
    
    // Configurar rastreamento
    setupTracking();
  };

  const loadFallbackScripts = () => {
    console.log('🔄 Carregando scripts de fallback...');
    // Não carregar nada no fallback para evitar pixels não configurados
    console.log('ℹ️ Fallback: sem scripts automáticos para evitar pixels não configurados');
  };

  const loadFacebookPixelFromConfig = (pixelId: string, customCode?: string) => {
    console.log('📘 Carregando Facebook Pixel da configuração:', pixelId);
    
    // Verificar se já existe
    if ((window as any).fbq) {
      console.log('ℹ️ Facebook Pixel já carregado, reconfigurando...');
      // Reconfigura com novo pixelId se necessário
      try {
        (window as any).fbq('init', pixelId, {}, { autoConfig: false });
        (window as any).fbq('set', 'autoConfig', false, pixelId);
        (window as any).fbq('set', 'agent', 'pllovable', pixelId);
        (window as any).fbq('track', 'PageView');
        console.log('✅ Facebook Pixel reconfigurado');
      } catch (error) {
        console.error('❌ Erro ao reconfigurar pixel:', error);
      }
      return;
    }
    
    // Configuração inline
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
      
      // Configurar Pixel com autoConfig desabilitado
      fbq('init', '${pixelId}', {}, { autoConfig: false });
      fbq('set', 'autoConfig', false, '${pixelId}');
      fbq('set', 'agent', 'pllovable', '${pixelId}');
      
      // Apenas PageView inicial
      fbq('track', 'PageView');
      
      ${customCode || ''}
      
      // Flag para debug em produção
      const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('lovableproject.com');
      if (isProduction || window.location.hostname.includes('lovableproject.com')) {
        console.log('✅ [PROD] Facebook Pixel ativo:', typeof window.fbq);
        console.log('✅ [PROD] Pixel ID configurado:', '${pixelId}');
      }
    `;
    script.setAttribute('data-marketing', 'fb-pixel-config');
    document.head.appendChild(script);
  };

  const loadGoogleTagManagerFromConfig = (containerId: string) => {
    console.log('🏷️ Carregando Google Tag Manager da configuração:', containerId);
    
    // Validar formato do container ID
    if (!containerId || !containerId.startsWith('GTM-')) {
      console.error('❌ GTM Container ID inválido:', containerId);
      return;
    }
    
    // Remover GTM existente
    document.querySelectorAll('[data-marketing*="gtm"]').forEach(el => el.remove());
    
    // Inicializar dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    console.log('🔧 Inicializando dataLayer para GTM:', containerId);
    
    // Código inline que funciona
    const script = document.createElement('script');
    script.innerHTML = `
      console.log('🚀 Iniciando carregamento do GTM: ${containerId}');
      
      (function(w,d,s,l,i){
        console.log('📡 Configurando GTM para container:', i);
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        
        j.onload = function() {
          console.log('✅ GTM script carregado com sucesso para:', i);
          console.log('🔍 DataLayer status:', typeof window.dataLayer, window.dataLayer.length, 'items');
        };
        
        j.onerror = function() {
          console.error('❌ Erro ao carregar GTM script para:', i);
        };
        
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
      
      // Verificação adicional após 3 segundos
      setTimeout(function() {
        console.log('🔍 Verificação GTM após 3s:');
        console.log('- DataLayer:', typeof window.dataLayer, window.dataLayer ? window.dataLayer.length + ' items' : 'undefined');
        console.log('- GTM Container ${containerId}:', window.google_tag_manager ? 'Encontrado' : 'Não encontrado');
      }, 3000);
    `;
    script.setAttribute('data-marketing', 'gtm-config');
    document.head.appendChild(script);

    // Noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-ns-config');
    document.body.appendChild(noscript);
    
    console.log('📋 GTM configurado:', containerId);
  };

  const loadGoogleAnalyticsFromConfig = (measurementId: string, customCode?: string) => {
    console.log('📊 Carregando Google Analytics da configuração:', measurementId);

    // Script do gtag
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'ga-config');
    document.head.appendChild(gtagScript);

    // Configuração
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
      
      ${customCode || ''}
      
      console.log('✅ GA ativo:', typeof window.gtag);
    `;
    configScript.setAttribute('data-marketing', 'ga-config-script');
    document.head.appendChild(configScript);
  };

  const loadCustomScripts = (headScripts?: string, bodyScripts?: string) => {
    console.log('🔧 Carregando scripts customizados');
    
    if (headScripts) {
      const headDiv = document.createElement('div');
      headDiv.setAttribute('data-marketing', 'custom-head');
      headDiv.innerHTML = headScripts;
      document.head.appendChild(headDiv);
    }
    
    if (bodyScripts) {
      const bodyDiv = document.createElement('div');
      bodyDiv.setAttribute('data-marketing', 'custom-body');
      bodyDiv.innerHTML = bodyScripts;
      document.body.appendChild(bodyDiv);
    }
  };

  const clearExistingScripts = () => {
    // Remover scripts existentes
    document.querySelectorAll('[data-marketing]').forEach(el => el.remove());
    
    // Limpar objetos globais
    delete (window as any).fbq;
    delete (window as any)._fbq;
    delete (window as any).gtag;
  };

  const loadFacebookPixel = () => {
    const pixelId = '1024100955860841';
    console.log('📘 Carregando Facebook Pixel:', pixelId);
    
    // Verificar se já existe
    if ((window as any).fbq) {
      console.log('ℹ️ Facebook Pixel já carregado');
      return;
    }
    
    // Carregar script externo do Facebook Pixel
    const fbScript = document.createElement('script');
    fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
    fbScript.async = true;
    fbScript.setAttribute('data-marketing', 'fb-pixel-lib');
    document.head.appendChild(fbScript);
    
    // Configuração inline
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[]}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      // Configurar Pixel com autoConfig desabilitado
      fbq('init', '${pixelId}', {}, { autoConfig: false });
      fbq('set', 'autoConfig', false, '${pixelId}');
      fbq('set', 'agent', 'pllovable', '${pixelId}');
      
      // Apenas PageView inicial
      fbq('track', 'PageView');
      
      // Flag para debug em produção
      if (window.location.hostname !== 'localhost' && window.location.hostname.includes('lovableproject.com')) {
        console.log('✅ [PROD] Facebook Pixel ativo:', typeof window.fbq);
      }
    `;
    script.setAttribute('data-marketing', 'fb-pixel');
    document.head.appendChild(script);
  };

  const loadGoogleTagManager = () => {
    const gtmId = 'GTM-N7TDJGMR';
    console.log('🏷️ Carregando Google Tag Manager:', gtmId);
    
    // Inicializar dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Código inline que funciona
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
      
      console.log('✅ GTM ativo:', typeof window.dataLayer);
    `;
    script.setAttribute('data-marketing', 'gtm');
    document.head.appendChild(script);

    // Noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-ns');
    document.body.appendChild(noscript);
  };

  const loadGoogleAnalytics = () => {
    const gaId = 'G-FQVHCDRQLX';
    console.log('📊 Carregando Google Analytics:', gaId);

    // Script do gtag
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'ga');
    document.head.appendChild(gtagScript);

    // Configuração
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
      
      console.log('✅ GA ativo:', typeof window.gtag);
    `;
    configScript.setAttribute('data-marketing', 'ga-config');
    document.head.appendChild(configScript);
  };

  const setupTracking = () => {
    console.log('📝 Configurando rastreamento de eventos');
    
    // Aguardar scripts carregarem
    setTimeout(() => {
      // TODOS OS EVENTOS AUTOMÁTICOS DESABILITADOS - configurações específicas gerenciam os eventos
      /*
      // StepForm events - DESABILITADO
      const handleStepForm = (event: CustomEvent) => {
        console.log('🎯 StepForm submit:', event.detail);
        
        setTimeout(() => {
          // Facebook Pixel
          if ((window as any).fbq) {
            (window as any).fbq('track', 'Contact', {
              content_name: 'StepForm Lead',
              form_slug: event.detail?.formSlug || 'stepform'
            });
            console.log('✅ FB Pixel: Contact enviado');
          }
          
          // GTM
          if ((window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'stepform_conversion',
              form_slug: event.detail?.formSlug || 'stepform'
            });
            console.log('✅ GTM: conversion enviado');
          }
          
          // GA
          if ((window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
              event_category: 'Lead Generation',
              event_label: 'StepForm'
            });
            console.log('✅ GA: conversion enviado');
          }
        }, 200);
      };
      
      // Contact form events - DESABILITADOS para evitar conflitos com configurações específicas
      const handleContactForm = (event: Event) => {
        const form = event.target as HTMLFormElement;
        if (form?.tagName === 'FORM') {
          console.log('📝 Contact form submit');
          
          setTimeout(() => {
            // Facebook Pixel
            if ((window as any).fbq) {
              (window as any).fbq('track', 'Contact', {
                content_name: 'Contact Form Lead'
              });
              console.log('✅ FB Pixel: Contact enviado (form)');
            }
            
            // GTM
            if ((window as any).dataLayer) {
              (window as any).dataLayer.push({
                event: 'contact_conversion'
              });
              console.log('✅ GTM: conversion enviado (form)');
            }
            
            // GA
            if ((window as any).gtag) {
              (window as any).gtag('event', 'conversion', {
                event_category: 'Lead Generation',
                event_label: 'Contact Form'
              });
              console.log('✅ GA: conversion enviado (form)');
            }
          }, 200);
        }
      };
      
      // Adicionar listeners apenas para StepForm - eventos de Contact Form são gerenciados individualmente
      window.addEventListener('stepFormSubmitSuccess', handleStepForm as EventListener);
      */
      
      console.log('ℹ️ Tracking automático COMPLETAMENTE DESABILITADO - apenas configurações específicas de formulários individuais ativas');
      
      console.log('✅ Rastreamento configurado');
    }, 1000);
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
      fbq('init', '${config.pixelId}', {}, { autoConfig: false });
      try { 
        fbq('set', 'autoConfig', false, '${config.pixelId}');
        fbq('set', 'agent', 'pllovable', '${config.pixelId}');
      } catch {}
      fbq('track', 'PageView');
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

    // Remover GTM existente primeiro
    const existingGtmScript = document.querySelector('script[data-marketing="google-tag-manager"]');
    const existingNoscript = document.querySelector('noscript[data-marketing="gtm-noscript"]');
    if (existingGtmScript) existingGtmScript.remove();
    if (existingNoscript) existingNoscript.remove();

    // Inicializar dataLayer primeiro
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Implementar GTM usando o método tradicional e mais confiável
    const gtmScript = document.createElement('script');
    gtmScript.setAttribute('data-marketing', 'google-tag-manager');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${config.containerId}');
    `;
    document.head.appendChild(gtmScript);

    // Adicionar noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-noscript');
    document.body.appendChild(noscript);

    // Função mais agressiva para remover Tag Assistant Badge
    const removeBadgeAggressively = () => {
      const selectors = [
        '.__TAG_ASSISTANT_BADGE',
        '[id*="tag-assistant"]',
        '[class*="tag-assistant"]',
        '[class*="TAG_ASSISTANT"]',
        'div[style*="position: fixed"][style*="z-index"]',
        'iframe[src*="tagassistant"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          console.log('🗑️ Removendo elemento:', el);
          el.remove();
        });
      });
      
      // Procurar por elementos que contenham texto relacionado ao Tag Assistant
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach(div => {
        const text = div.textContent || '';
        if (text.includes('Tag Assistant') || text.includes('drag_indicator')) {
          console.log('🗑️ Removendo div com texto Tag Assistant:', div);
          div.remove();
        }
      });
    };

    // Executar remoção do badge em intervalos
    setTimeout(removeBadgeAggressively, 1000);
    setTimeout(removeBadgeAggressively, 3000);
    setTimeout(removeBadgeAggressively, 5000);
    
    // Observer para remover badge quando aparecer
    const observer = new MutationObserver(() => {
      removeBadgeAggressively();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('📋 GTM configurado com método tradicional:', config.containerId);
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
    // Tracking automático de formulários desabilitado para evitar conflitos
    // com configurações específicas de formulários individuais
    console.log('ℹ️ Tracking automático de formulários desabilitado globalmente');
    
    // ORIGINAL CODE COMMENTED OUT TO PREVENT AUTOMATIC 'Lead' EVENTS:
    /*
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
    */
  };
};