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
    };
  }, [formId]);

  const implementFormScripts = (formConfig: any) => {
    console.log(`🚀 Implementando scripts para formulário ${formConfig.formId}:`, formConfig);

    // Remover scripts antigos específicos deste formulário
    removeFormScripts(formConfig.formId);

    // Facebook Pixel
    if (formConfig.facebookPixel?.enabled && formConfig.facebookPixel?.pixelId) {
      implementFormFacebookPixel(formConfig);
    }

    // Google Analytics
    if (formConfig.googleAnalytics?.enabled && formConfig.googleAnalytics?.measurementId) {
      implementFormGoogleAnalytics(formConfig);
    }

    // Google Tag Manager
    if (formConfig.googleTagManager?.enabled && formConfig.googleTagManager?.containerId) {
      implementFormGoogleTagManager(formConfig);
    }
  };

  const removeFormScripts = (formId: string) => {
    const existingScripts = document.querySelectorAll(`[data-form-marketing="${formId}"]`);
    existingScripts.forEach(script => script.remove());
  };

  const implementFormFacebookPixel = (formConfig: any) => {
    const { formId, facebookPixel } = formConfig;
    console.log(`📘 Implementando Facebook Pixel para formulário ${formId}:`, facebookPixel.pixelId);

    // Verificar se o pixel base já existe para este pixel específico
    const pixelKey = `fbq_${facebookPixel.pixelId}`;
    if (!(window as any)[pixelKey]) {
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
        
        // Inicializar apenas este pixel específico
        if (!window.fbq.pixelsInitialized) {
          window.fbq.pixelsInitialized = new Set();
        }
        
        if (!window.fbq.pixelsInitialized.has('${facebookPixel.pixelId}')) {
          fbq('init', '${facebookPixel.pixelId}');
          fbq('track', 'PageView');
          window.fbq.pixelsInitialized.add('${facebookPixel.pixelId}');
          console.log('📘 Pixel ${facebookPixel.pixelId} inicializado para formulário ${formId}');
        }
      `;
      document.head.appendChild(fbPixelScript);

      // Marcar este pixel como carregado
      (window as any)[pixelKey] = true;

      // Adicionar noscript específico
      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-form-marketing', formId);
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${facebookPixel.pixelId}&ev=PageView&noscript=1" />`;
      document.head.appendChild(noscript);
    } else if ((window as any).fbq && (window as any).fbq.pixelsInitialized && !(window as any).fbq.pixelsInitialized.has(facebookPixel.pixelId)) {
      // Se fbq existe mas este pixel específico não foi inicializado
      (window as any).fbq('init', facebookPixel.pixelId);
      (window as any).fbq('track', 'PageView');
      (window as any).fbq.pixelsInitialized.add(facebookPixel.pixelId);
      console.log(`📘 Pixel adicional ${facebookPixel.pixelId} inicializado para formulário ${formId}`);
    }

    // Adicionar listener específico para este formulário
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.id === formId || form.id === formConfig.submitButtonId?.replace('-', '_')) {
        console.log(`📝 Formulário ${formId} enviado - rastreando com Facebook Pixel`);
        
        if ((window as any).fbq) {
          (window as any).fbq('track', facebookPixel.eventType || 'Lead', {
            content_name: formConfig.campaignName || 'Form Submission',
            form_id: formId,
            page_url: window.location.href
          });
          console.log(`📊 Evento "${facebookPixel.eventType}" rastreado para formulário: ${formId}`);
        }
      }
    };

    // Remover listener anterior
    document.removeEventListener('submit', handleFormSubmit);
    
    // Adicionar novo listener
    document.addEventListener('submit', handleFormSubmit, true);
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

    // Adicionar listener específico para este formulário
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.id === formId || form.id === formConfig.submitButtonId?.replace('-', '_')) {
        console.log(`📝 Formulário ${formId} enviado - rastreando com Google Analytics`);
        
        if ((window as any).gtag) {
          (window as any).gtag('event', googleAnalytics.eventName || 'form_submit', {
            event_category: 'engagement',
            event_label: formId,
            form_id: formId
          });
          console.log(`📊 Evento "${googleAnalytics.eventName}" rastreado para formulário: ${formId}`);
        }
      }
    };

    // Remover listener anterior
    document.removeEventListener('submit', handleFormSubmit);
    
    // Adicionar novo listener
    document.addEventListener('submit', handleFormSubmit, true);
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

    // Adicionar listener específico para este formulário
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.id === formId || form.id === formConfig.submitButtonId?.replace('-', '_')) {
        console.log(`📝 Formulário ${formId} enviado - rastreando com GTM`);
        
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: googleTagManager.eventName || 'form_submit',
            form_id: formId,
            form_name: formConfig.campaignName || 'Form Submission'
          });
          console.log(`📊 Evento "${googleTagManager.eventName}" enviado para GTM: ${formId}`);
        }
      }
    };

    // Remover listener anterior
    document.removeEventListener('submit', handleFormSubmit);
    
    // Adicionar novo listener
    document.addEventListener('submit', handleFormSubmit, true);
  };
};