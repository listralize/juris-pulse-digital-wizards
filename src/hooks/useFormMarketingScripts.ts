import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FormMarketingConfig {
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
    eventType: 'Lead' | 'Purchase' | 'Contact' | 'SubmitApplication';
    customCode?: string;
  };
  googleAnalytics?: {
    enabled: boolean;
    measurementId: string;
    eventName: string;
    customCode?: string;
  };
  googleTagManager?: {
    enabled: boolean;
    containerId: string;
    eventName: string;
  };
}

export const useFormMarketingScripts = (formId: string) => {
  useEffect(() => {
    if (!formId) return;

    const loadFormConfig = async () => {
      try {
        console.log(`📋 Carregando configuração de marketing para formulário: ${formId}`);
        
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
            implementFormScripts(formConfig);
          } else {
            console.log(`ℹ️ Nenhuma configuração ativa encontrada para formulário: ${formId}`);
            // Garantir remoção de scripts e listeners se desativado
            removeFormScripts(formId);
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar configuração do formulário:', error);
      }
    };

    loadFormConfig();

    // Escutar atualizações de configuração
    const handleSettingsUpdate = () => {
      console.log(`🔄 Recarregando configuração para formulário: ${formId}`);
      loadFormConfig();
    };

    window.addEventListener('marketingSettingsUpdated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('marketingSettingsUpdated', handleSettingsUpdate);
      // Remover listeners e scripts ao desmontar ou trocar de formulário
      removeFormScripts(formId);
    };
  }, [formId]);

  const implementFormScripts = (formConfig: any) => {
    console.log(`🚀 Implementando scripts para formulário ${formConfig.formId}:`, formConfig);

    // Remover scripts antigos específicos deste formulário
    removeFormScripts(formConfig.formId);

    // Facebook Pixel - APENAS se estiver habilitado
    if (formConfig.facebookPixel?.enabled === true && formConfig.facebookPixel?.pixelId) {
      console.log(`✅ Facebook Pixel HABILITADO para formulário ${formConfig.formId}`);
      implementFormFacebookPixel(formConfig);
    } else {
      console.log(`❌ Facebook Pixel DESABILITADO para formulário ${formConfig.formId}`);
    }

    // Google Analytics - APENAS se estiver habilitado
    if (formConfig.googleAnalytics?.enabled === true && formConfig.googleAnalytics?.measurementId) {
      console.log(`✅ Google Analytics HABILITADO para formulário ${formConfig.formId}`);
      implementFormGoogleAnalytics(formConfig);
    } else {
      console.log(`❌ Google Analytics DESABILITADO para formulário ${formConfig.formId}`);
    }

    // Google Tag Manager - APENAS se estiver habilitado
    if (formConfig.googleTagManager?.enabled === true && formConfig.googleTagManager?.containerId) {
      console.log(`✅ Google Tag Manager HABILITADO para formulário ${formConfig.formId}`);
      implementFormGoogleTagManager(formConfig);
    } else {
      console.log(`❌ Google Tag Manager DESABILITADO para formulário ${formConfig.formId}`);
    }
  };

  const removeFormScripts = (formId: string) => {
    // Remover scripts do DOM
    const existingScripts = document.querySelectorAll(`[data-form-marketing="${formId}"]`);
    existingScripts.forEach(script => script.remove());

    // Remover listeners registrados para este formulário (fb, ga, gtm)
    const handlersMap = (window as any).__formMarketingHandlers || {};
    const handlers = handlersMap[formId];
    if (handlers?.fb) document.removeEventListener('formSubmitSuccess', handlers.fb);
    if (handlers?.ga) document.removeEventListener('formSubmitSuccess', handlers.ga);
    if (handlers?.gtm) document.removeEventListener('formSubmitSuccess', handlers.gtm);
    delete handlersMap[formId];
    (window as any).__formMarketingHandlers = handlersMap;
  };

  const implementFormFacebookPixel = (formConfig: any) => {
    const { formId, facebookPixel } = formConfig;
    
    // Validar se o pixelId é válido (apenas números)
    const pixelId = facebookPixel.pixelId?.replace(/[^0-9]/g, '');
    if (!pixelId || pixelId.length < 10) {
      console.warn(`⚠️ Pixel ID inválido para formulário ${formId}:`, facebookPixel.pixelId);
      return;
    }
    
    console.log(`📘 Implementando Facebook Pixel para formulário ${formId}:`, pixelId);

    // Verificar se este pixel específico já foi inicializado
    const pixelKey = `fbq_pixel_${pixelId}`;
    if (!(window as any)[pixelKey]) {
      // Criar o script base do Facebook Pixel seguindo o modelo exato
      const fbPixelScript = document.createElement('script');
      fbPixelScript.setAttribute('data-form-marketing', formId);
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
        console.log('📘 Meta Pixel ${pixelId} inicializado para formulário ${formId} (autoConfig desativado)');
      `;
      document.head.appendChild(fbPixelScript);

      // Não rastreamos PageView automaticamente em formulários; eventos são disparados apenas no sucesso do envio

      // Marcar este pixel como inicializado
      (window as any)[pixelKey] = true;
    } else {
      console.log(`📘 Meta Pixel ${pixelId} já estava inicializado para formulário ${formId}`);
    }

    // Adicionar listener específico para submissão bem-sucedida
    const handleFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        console.log(`✅ Formulário ${formId} enviado com SUCESSO - rastreando com Facebook Pixel`);
        
        if ((window as any).fbq) {
          const eventType = facebookPixel.eventType === 'Custom' 
            ? (facebookPixel.customEventName || 'CustomEvent')
            : (facebookPixel.eventType || 'Lead');
          
          // De-dup: evitar múltiplos eventos por submissão do mesmo formulário
          const sentMap = (window as any).__formEventSent || {};
          if (sentMap[formId]) {
            console.log(`⏭️ Evento ignorado (duplicado) para formulário: ${formId}`);
            return;
          }
          sentMap[formId] = true;
          (window as any).__formEventSent = sentMap;
          setTimeout(() => {
            const m = (window as any).__formEventSent || {};
            delete m[formId];
            (window as any).__formEventSent = m;
          }, 3000);
          
          (window as any).fbq('track', eventType, {
            content_name: formConfig.campaignName || 'Form Submission',
            form_id: formId,
            page_url: window.location.href,
            pixel_id: pixelId,
            event_source_url: window.location.href,
            user_data: event.detail?.userData || {}
          });
          console.log(`📊 Evento "${eventType}" rastreado para formulário: ${formId} com pixel: ${pixelId}`);
        }
      }
    };

    // Registrar listener gerenciado (com remoção adequada)
    const handlersMap = (window as any).__formMarketingHandlers || {};
    // Remover anterior se existir
    if (handlersMap[formId]?.fb) {
      document.removeEventListener('formSubmitSuccess', handlersMap[formId].fb);
    }
    document.addEventListener('formSubmitSuccess', handleFormSuccess as EventListener);
    handlersMap[formId] = { ...(handlersMap[formId] || {}), fb: handleFormSuccess as EventListener };
    (window as any).__formMarketingHandlers = handlersMap;
  };

  const implementFormGoogleAnalytics = (formConfig: any) => {
    const { formId, googleAnalytics } = formConfig;
    console.log(`📊 Implementando Google Analytics para formulário ${formId}:`, googleAnalytics.measurementId);

    // Verificar se o GA base já existe
    if (!(window as any).gtag) {
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.measurementId}`;
      gtagScript.async = true;
      gtagScript.setAttribute('data-form-marketing', formId);
      document.head.appendChild(gtagScript);

      const configScript = document.createElement('script');
      configScript.setAttribute('data-form-marketing', formId);
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalytics.measurementId}');
      `;
      document.head.appendChild(configScript);
    }

    // Adicionar listener específico para submissão bem-sucedida
    const handleFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        console.log(`✅ Formulário ${formId} enviado com SUCESSO - rastreando com Google Analytics`);
        
        if ((window as any).gtag) {
          (window as any).gtag('event', googleAnalytics.eventName || 'form_submit', {
            event_category: 'engagement',
            event_label: formId,
            form_id: formId,
            user_data: event.detail?.userData || {}
          });
          console.log(`📊 Evento "${googleAnalytics.eventName}" rastreado para formulário: ${formId}`);
        }
      }
    };

    // Registrar listener gerenciado (com remoção adequada)
    const handlersMap = (window as any).__formMarketingHandlers || {};
    if (handlersMap[formId]?.ga) {
      document.removeEventListener('formSubmitSuccess', handlersMap[formId].ga);
    }
    document.addEventListener('formSubmitSuccess', handleFormSuccess as EventListener);
    handlersMap[formId] = { ...(handlersMap[formId] || {}), ga: handleFormSuccess as EventListener };
    (window as any).__formMarketingHandlers = handlersMap;
  };

  const implementFormGoogleTagManager = (formConfig: any) => {
    const { formId, googleTagManager } = formConfig;
    console.log(`🏷️ Implementando Google Tag Manager para formulário ${formId}:`, googleTagManager.containerId);

    // Verificar se o GTM base já existe
    if (!(window as any).dataLayer) {
      const gtmScript = document.createElement('script');
      gtmScript.setAttribute('data-form-marketing', formId);
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManager.containerId}');
      `;
      document.head.appendChild(gtmScript);

      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-form-marketing', formId);
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManager.containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }

    // Adicionar listener específico para submissão bem-sucedida
    const handleFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        console.log(`✅ Formulário ${formId} enviado com SUCESSO - rastreando com GTM`);
        
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: googleTagManager.eventName || 'form_submit',
            form_id: formId,
            form_name: formConfig.campaignName || 'Form Submission',
            user_data: event.detail?.userData || {}
          });
          console.log(`📊 Evento "${googleTagManager.eventName}" enviado para GTM: ${formId}`);
        }
      }
    };

    // Registrar listener gerenciado (com remoção adequada)
    const handlersMap = (window as any).__formMarketingHandlers || {};
    if (handlersMap[formId]?.gtm) {
      document.removeEventListener('formSubmitSuccess', handlersMap[formId].gtm);
    }
    document.addEventListener('formSubmitSuccess', handleFormSuccess as EventListener);
    handlersMap[formId] = { ...(handlersMap[formId] || {}), gtm: handleFormSuccess as EventListener };
    (window as any).__formMarketingHandlers = handlersMap;
  };
};