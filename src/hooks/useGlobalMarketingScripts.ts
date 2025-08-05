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
    const loadAndImplementScripts = async () => {
      try {
        console.log('🌐 Carregando scripts de marketing globalmente...');
        
        const { data: settings, error } = await supabase
          .from('marketing_settings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('❌ Erro ao carregar scripts:', error);
          return;
        }

        if (settings) {
          const scripts: MarketingScripts = {
            facebookPixel: {
              enabled: settings.facebook_pixel_enabled || false,
              pixelId: settings.facebook_pixel_id || '',
              customCode: settings.facebook_custom_code || '',
              conversionApiToken: settings.facebook_conversion_api_token || ''
            },
            googleAnalytics: {
              enabled: settings.google_analytics_enabled || false,
              measurementId: settings.google_analytics_id || '',
              customCode: settings.google_analytics_custom_code || ''
            },
            googleTagManager: {
              enabled: settings.google_tag_manager_enabled || false,
              containerId: settings.google_tag_manager_id || ''
            },
            customScripts: {
              head: settings.custom_head_scripts || '',
              body: settings.custom_body_scripts || ''
            }
          };

          implementMarketingScripts(scripts);
        }
      } catch (error) {
        console.error('❌ Erro ao implementar scripts globalmente:', error);
      }
    };

    loadAndImplementScripts();
  }, []);

  const removeExistingScripts = () => {
    const existingScripts = document.querySelectorAll('[data-marketing]');
    existingScripts.forEach(script => script.remove());
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
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbPixelScript);

    // Adicionar código customizado se existir
    if (config.customCode && config.customCode.trim()) {
      const jsCodeMatch = config.customCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (jsCodeMatch && jsCodeMatch[1]) {
        const customScript = document.createElement('script');
        customScript.setAttribute('data-marketing', 'facebook-pixel-custom');
        customScript.innerHTML = jsCodeMatch[1];
        document.head.appendChild(customScript);
      }
    }

    // Adicionar noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${config.pixelId}&ev=PageView&noscript=1" />`;
    document.head.appendChild(noscript);
    
    console.log('✅ Facebook Pixel global implementado com ID:', config.pixelId);

    // Rastrear eventos de formulário automaticamente
    trackFormSubmissions(config.pixelId);
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
        
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Form Submission',
            form_id: form.id || 'unknown',
            page_url: window.location.href
          });
          
          (window as any).fbq('track', 'Contact', {
            content_name: 'Contact Form',
            form_id: form.id || 'unknown'
          });
        }
      }
    };

    // Remover listener anterior se existir
    document.removeEventListener('submit', handleFormSubmit);
    
    // Adicionar novo listener
    document.addEventListener('submit', handleFormSubmit, true);
  };
};