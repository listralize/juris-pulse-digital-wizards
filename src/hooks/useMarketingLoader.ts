import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Unified marketing scripts loader.
 * Loads Facebook Pixel, Google Tag Manager, and Google Analytics
 * based on configuration stored in the `marketing_settings` Supabase table.
 *
 * FIX 1: dataLayer is initialized synchronously BEFORE any async call to prevent
 *         race conditions where form submissions push events before GTM is ready.
 * FIX 2: isProduction check removed — scripts must also load in staging/preview
 *         environments to allow QA validation of conversion tracking.
 * FIX 3: Duplicate GTM load guard added to prevent double-firing on hot reloads.
 *
 * Should be called once at the App level.
 */
export const useMarketingLoader = () => {
  useEffect(() => {
    // FIX 1: Initialize dataLayer synchronously so any early dataLayer.push()
    // calls (e.g. from form submissions before GTM loads) are queued correctly.
    (window as any).dataLayer = (window as any).dataLayer || [];

    loadFromDatabase();
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
      fbq('set','agent','pllistralize','${pixelId}');
      fbq('track','PageView');
      ${customCode || ''}
    `;
    script.setAttribute('data-marketing', 'fb-pixel');
    document.head.appendChild(script);
  };

  const loadGoogleTagManager = (containerId: string) => {
    if (!containerId.startsWith('GTM-')) return;

    // FIX 3: Guard against double-loading GTM
    if (document.querySelector(`script[data-marketing="gtm"][data-container="${containerId}"]`)) return;

    const script = document.createElement('script');
    script.setAttribute('data-marketing', 'gtm');
    script.setAttribute('data-container', containerId);
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
    `;
    document.head.appendChild(script);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    noscript.setAttribute('data-marketing', 'gtm-ns');
    document.body.appendChild(noscript);
  };

  const loadGoogleAnalytics = (measurementId: string, customCode?: string | null) => {
    if (document.querySelector(`script[data-marketing="ga"][data-id="${measurementId}"]`)) return;

    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'ga');
    gtagScript.setAttribute('data-id', measurementId);
    document.head.appendChild(gtagScript);

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer=window.dataLayer||[];
      function gtag(){dataLayer.push(arguments);}
      gtag('js',new Date());
      gtag('config','${measurementId}',{send_page_view:true});
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
