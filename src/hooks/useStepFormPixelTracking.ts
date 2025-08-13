import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useStepFormPixelTracking = (formSlug: string) => {
  useEffect(() => {
    if (!formSlug) return;

    const loadPixelConfig = async () => {
      try {
        console.log(`🔍 Carregando configuração de pixel para StepForm: ${formSlug}`);
        
        const { data: stepForm, error } = await supabase
          .from('step_forms')
          .select('tracking_config, name, id')
          .eq('slug', formSlug)
          .eq('is_active', true)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('❌ Erro ao carregar step form:', error);
          return;
        }

        if (stepForm && stepForm.tracking_config) {
          const trackingConfig = stepForm.tracking_config as any;
          console.log(`🔧 Tracking config:`, trackingConfig);
          
          const pixelId = trackingConfig?.pixel_id || trackingConfig?.facebook_pixel?.pixel_id || '';
          const fbEnabled = pixelId && String(pixelId).length > 0;
          
          const stepFormConfig = {
            slug: formSlug,
            name: stepForm.name,
            id: stepForm.id,
            enabled: true,
            facebookPixel: {
              enabled: fbEnabled,
              pixel_id: pixelId,
              eventType: trackingConfig?.facebook_pixel?.event_type || trackingConfig?.event_type || 'Contact'
            },
            googleTagManager: {
              enabled: trackingConfig?.google_tag_manager?.enabled || false,
              container_id: trackingConfig?.google_tag_manager?.container_id || trackingConfig?.gtm_id || '',
              eventName: trackingConfig?.google_tag_manager?.event_name || trackingConfig?.gtm_event_name || 'form_submit'
            }
          };
          
          console.log(`🎯 Config processada para StepForm ${formSlug}:`, stepFormConfig);
          implementPixel(stepFormConfig);
        } else {
          console.log(`⚠️ StepForm ${formSlug} não encontrado ou sem tracking_config`);
          removePixel(formSlug);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar configuração do StepForm:', error);
      }
    };

    loadPixelConfig();

    return () => {
      removePixel(formSlug);
    };
  }, [formSlug]);

  const implementPixel = (stepFormConfig: any) => {
    console.log(`🚀 Implementando pixel para StepForm ${stepFormConfig.slug}:`, stepFormConfig);

    removePixel(stepFormConfig.slug);

    // Facebook Pixel
    if (stepFormConfig.facebookPixel?.enabled && stepFormConfig.facebookPixel?.pixel_id) {
      implementFacebookPixel(stepFormConfig);
    }

    // Google Tag Manager
    if (stepFormConfig.googleTagManager?.enabled && stepFormConfig.googleTagManager?.container_id) {
      implementGoogleTagManager(stepFormConfig);
    }
  };

  const removePixel = (formSlug: string) => {
    const existingScripts = document.querySelectorAll(`[data-stepform-pixel="${formSlug}"]`);
    existingScripts.forEach(script => script.remove());

    const handlersMap = (window as any).__stepFormPixelHandlers || {};
    const handlers = handlersMap[formSlug];
    if (handlers?.fb) window.removeEventListener('stepFormSubmitSuccess', handlers.fb as EventListener);
    if (handlers?.gtm) document.removeEventListener('stepFormSubmitSuccess', handlers.gtm);
    delete handlersMap[formSlug];
    (window as any).__stepFormPixelHandlers = handlersMap;
  };

  const implementFacebookPixel = (stepFormConfig: any) => {
    const { slug, facebookPixel } = stepFormConfig;
    
    const pixelId = facebookPixel.pixel_id?.replace(/[^0-9]/g, '');
    if (!pixelId || pixelId.length < 10) {
      console.warn(`⚠️ Pixel ID inválido para StepForm ${slug}:`, facebookPixel.pixel_id);
      return;
    }
    
    console.log(`📘 Implementando Facebook Pixel para StepForm ${slug}:`, pixelId);

    const pixelKey = `fbq_pixel_${pixelId}`;
    if (!(window as any)[pixelKey]) {
      const fbPixelScript = document.createElement('script');
      fbPixelScript.setAttribute('data-stepform-pixel', slug);
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
        console.log('📘 Meta Pixel ${pixelId} inicializado para StepForm ${slug}');
      `;
      document.head.appendChild(fbPixelScript);
      (window as any)[pixelKey] = true;
      
      // PageView inicial para StepForm
      try { 
        (window as any).fbq && (window as any).fbq('track','PageView'); 
        console.log(`👀 PageView enviado para Pixel ${pixelId}`); 
      } catch(e) {}
    }

    const handleStepFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === slug) {
        console.log(`✅ StepForm ${slug} enviado - rastreando com Facebook Pixel`);
        
        if ((window as any).fbq) {
          const eventType = facebookPixel.eventType || 'Contact';
          
          (window as any).fbq('track', eventType, {
            content_name: stepFormConfig.name || 'StepForm Submission',
            form_id: slug,
            page_url: window.location.href
          });
          console.log(`📊 Evento "${eventType}" rastreado para StepForm: ${slug}`);
        }
      }
    };

    const handlersMap = (window as any).__stepFormPixelHandlers || {};
    if (handlersMap[slug]?.fb) {
      window.removeEventListener('stepFormSubmitSuccess', handlersMap[slug].fb as EventListener);
    }
    window.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    handlersMap[slug] = { ...(handlersMap[slug] || {}), fb: handleStepFormSuccess as EventListener };
    (window as any).__stepFormPixelHandlers = handlersMap;
  };

  const implementGoogleTagManager = (stepFormConfig: any) => {
    const { slug, googleTagManager } = stepFormConfig;
    console.log(`🏷️ Implementando Google Tag Manager para StepForm ${slug}:`, googleTagManager.container_id);

    if (!(window as any).dataLayer) {
      const gtmScript = document.createElement('script');
      gtmScript.setAttribute('data-stepform-pixel', slug);
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManager.container_id}');
      `;
      document.head.appendChild(gtmScript);

      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-stepform-pixel', slug);
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManager.container_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }

    const handleStepFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === slug) {
        console.log(`✅ StepForm ${slug} enviado - rastreando com GTM`);
        
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'submit',
            gtm: {
              formId: slug,
              formName: stepFormConfig.name || 'StepForm Submission',
              formType: 'step_form'
            }
          });
          
          if (googleTagManager.eventName && googleTagManager.eventName !== 'submit') {
            (window as any).dataLayer.push({
              event: googleTagManager.eventName,
              form_id: slug,
              form_name: stepFormConfig.name || 'StepForm Submission'
            });
          }
          
          console.log(`📊 Evento GTM rastreado para StepForm: ${slug}`);
        }
      }
    };

    const handlersMap = (window as any).__stepFormPixelHandlers || {};
    if (handlersMap[slug]?.gtm) {
      document.removeEventListener('stepFormSubmitSuccess', handlersMap[slug].gtm);
    }
    document.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    handlersMap[slug] = { ...(handlersMap[slug] || {}), gtm: handleStepFormSuccess as EventListener };
    (window as any).__stepFormPixelHandlers = handlersMap;
  };
};