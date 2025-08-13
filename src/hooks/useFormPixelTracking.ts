import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useFormPixelTracking = (formId: string) => {
  useEffect(() => {
    if (!formId) return;

    const loadPixelConfig = async () => {
      try {
        console.log(`🔍 Carregando configuração de pixel para formulário: ${formId}`);
        
        const { data: settings, error } = await supabase
          .from('marketing_settings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('❌ Erro ao carregar configuração:', error);
          return;
        }

        if (settings && settings.form_tracking_config) {
          let trackingConfig;
          if (typeof settings.form_tracking_config === 'string') {
            trackingConfig = JSON.parse(settings.form_tracking_config);
          } else {
            trackingConfig = settings.form_tracking_config;
          }
          
          const formConfig = trackingConfig.systemForms?.find(
            (form: any) => form.formId === formId && form.enabled
          );

          if (formConfig) {
            console.log(`✅ Configuração encontrada para formulário ${formId}:`, formConfig);
            implementPixel(formConfig);
          } else {
            console.log(`ℹ️ Nenhuma configuração encontrada para formulário: ${formId}`);
            removePixel(formId);
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar configuração do formulário:', error);
      }
    };

    loadPixelConfig();

    return () => {
      removePixel(formId);
    };
  }, [formId]);

  const implementPixel = (formConfig: any) => {
    console.log(`🚀 Implementando pixel para formulário ${formConfig.formId}:`, formConfig);

    removePixel(formConfig.formId);

    // Facebook Pixel
    if (formConfig.facebookPixel?.enabled && formConfig.facebookPixel?.pixelId) {
      implementFacebookPixel(formConfig);
    }

    // Google Tag Manager
    if (formConfig.googleTagManager?.enabled && formConfig.googleTagManager?.containerId) {
      implementGoogleTagManager(formConfig);
    }
  };

  const removePixel = (formId: string) => {
    const existingScripts = document.querySelectorAll(`[data-form-pixel="${formId}"]`);
    existingScripts.forEach(script => script.remove());

    const handlersMap = (window as any).__formPixelHandlers || {};
    const handlers = handlersMap[formId];
    if (handlers?.fb) document.removeEventListener('formSubmitSuccess', handlers.fb);
    if (handlers?.gtm) document.removeEventListener('formSubmitSuccess', handlers.gtm);
    delete handlersMap[formId];
    (window as any).__formPixelHandlers = handlersMap;
  };

  const implementFacebookPixel = (formConfig: any) => {
    const { formId, facebookPixel } = formConfig;
    
    const pixelId = facebookPixel.pixelId?.replace(/[^0-9]/g, '');
    if (!pixelId || pixelId.length < 10) {
      console.warn(`⚠️ Pixel ID inválido para formulário ${formId}:`, facebookPixel.pixelId);
      return;
    }
    
    console.log(`📘 Implementando Facebook Pixel para formulário ${formId}:`, pixelId);

    const pixelKey = `fbq_pixel_${pixelId}`;
    if (!(window as any)[pixelKey]) {
      const fbPixelScript = document.createElement('script');
      fbPixelScript.setAttribute('data-form-pixel', formId);
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
        fbq('set', 'autoConfig', 'false', '${pixelId}');
        console.log('📘 Meta Pixel ${pixelId} inicializado para formulário ${formId}');
      `;
      document.head.appendChild(fbPixelScript);
      (window as any)[pixelKey] = true;
    }

    const handleFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        console.log(`✅ Formulário ${formId} enviado - rastreando com Facebook Pixel`);
        
        if ((window as any).fbq) {
          const eventType = facebookPixel.eventType || 'CompleteRegistration';
          
          (window as any).fbq('track', eventType, {
            content_name: formConfig.campaignName || 'Form Submission',
            form_id: formId,
            page_url: window.location.href
          });
          console.log(`📊 Evento "${eventType}" rastreado para formulário: ${formId}`);
        }
      }
    };

    const handlersMap = (window as any).__formPixelHandlers || {};
    if (handlersMap[formId]?.fb) {
      document.removeEventListener('formSubmitSuccess', handlersMap[formId].fb);
    }
    document.addEventListener('formSubmitSuccess', handleFormSuccess as EventListener);
    handlersMap[formId] = { ...(handlersMap[formId] || {}), fb: handleFormSuccess as EventListener };
    (window as any).__formPixelHandlers = handlersMap;
  };

  const implementGoogleTagManager = (formConfig: any) => {
    const { formId, googleTagManager } = formConfig;
    console.log(`🏷️ Implementando Google Tag Manager para formulário ${formId}:`, googleTagManager.containerId);

    if (!(window as any).dataLayer) {
      const gtmScript = document.createElement('script');
      gtmScript.setAttribute('data-form-pixel', formId);
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManager.containerId}');
      `;
      document.head.appendChild(gtmScript);

      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-form-pixel', formId);
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManager.containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }

    const handleFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        console.log(`✅ Formulário ${formId} enviado - rastreando com GTM`);
        
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: googleTagManager.eventName || 'form_submit',
            form_id: formId,
            form_name: formConfig.campaignName || 'Form Submission'
          });
          console.log(`📊 Evento rastreado para GTM: ${formId}`);
        }
      }
    };

    const handlersMap = (window as any).__formPixelHandlers || {};
    if (handlersMap[formId]?.gtm) {
      document.removeEventListener('formSubmitSuccess', handlersMap[formId].gtm);
    }
    document.addEventListener('formSubmitSuccess', handleFormSuccess as EventListener);
    handlersMap[formId] = { ...(handlersMap[formId] || {}), gtm: handleFormSuccess as EventListener };
    (window as any).__formPixelHandlers = handlersMap;
  };
};