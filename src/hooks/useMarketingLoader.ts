import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Unified marketing scripts loader.
 * Loads Facebook Pixel, Google Tag Manager, and Google Analytics
 * based on configuration stored in the `marketing_settings` Supabase table.
 * 
 * Should be called once at the App level.
 */
export const useMarketingLoader = () => {
  useEffect(() => {
    const isProduction =
      window.location.protocol === 'https:' &&
      !window.location.hostname.includes('localhost') &&
      !window.location.hostname.includes('127.0.0.1');

    if (!isProduction && !window.location.hostname.includes('lovable.app')) {
      return;
    }

    const timer = setTimeout(() => {
      loadFromDatabase();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const loadFromDatabase = async () => {
    try {
      const { data: settings, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !settings) {
        return;
      }

      // Ensure dataLayer exists before any script loads
      (window as any).dataLayer = (window as any).dataLayer || [];

      if (settings.facebook_pixel_enabled && settings.facebook_pixel_id) {
        loadFacebookPixel(settings.facebook_pixel_id, settings.facebook_custom_code);
      }

      if (settings.google_tag_manager_enabled && settings.google_tag_manager_id) {
        loadGoogleTagManager(settings.google_tag_manager_id);
      }

      if (settings.google_analytics_enabled && settings.google_analytics_id) {
        loadGoogleAnalytics(settings.google_analytics_id, settings.google_analytics_custom_code);
      }

      if (settings.custom_head_scripts) {
        injectCustomScripts(settings.custom_head_scripts, 'head');
      }
      if (settings.custom_body_scripts) {
        injectCustomScripts(settings.custom_body_scripts, 'body');
      }
    } catch {
      // Silently fail – marketing scripts are non-critical
    }
  };

  const loadFacebookPixel = (pixelId: string, customCode?: string | null) => {
    if ((window as any).fbq) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
        n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init','${pixelId}',{},{autoConfig:false});
      fbq('set','autoConfig',false,'${pixelId}');
      fbq('set','agent','pllovable','${pixelId}');
      fbq('track','PageView');
      ${customCode || ''}
    `;
    script.setAttribute('data-marketing', 'fb-pixel');
    document.head.appendChild(script);
  };

  const loadGoogleTagManager = (containerId: string) => {
    if (!containerId.startsWith('GTM-')) return;

    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
    `;
    script.setAttribute('data-marketing', 'gtm');
    document.head.appendChild(script);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-ns');
    document.body.appendChild(noscript);
  };

  const loadGoogleAnalytics = (measurementId: string, customCode?: string | null) => {
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'ga');
    document.head.appendChild(gtagScript);

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer=window.dataLayer||[];
      function gtag(){dataLayer.push(arguments);}
      gtag('js',new Date());
      gtag('config','${measurementId}');
      ${customCode || ''}
    `;
    configScript.setAttribute('data-marketing', 'ga-config');
    document.head.appendChild(configScript);
  };

  const injectCustomScripts = (html: string, target: 'head' | 'body') => {
    const container = document.createElement('div');
    container.setAttribute('data-marketing', `custom-${target}`);
    container.innerHTML = html;
    (target === 'head' ? document.head : document.body).appendChild(container);
  };
};
