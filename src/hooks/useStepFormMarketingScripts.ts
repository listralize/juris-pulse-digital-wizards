import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StepFormMarketingConfig {
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
    eventType: 'Lead' | 'Purchase' | 'Contact' | 'SubmitApplication' | 'CompleteRegistration' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Custom';
    customEventName?: string;
  };
  googleAnalytics?: {
    enabled: boolean;
    measurementId: string;
    eventName: string;
  };
  googleTagManager?: {
    enabled: boolean;
    containerId: string;
    eventName: string;
  };
}

export const useStepFormMarketingScripts = (formSlug: string) => {
  useEffect(() => {
    if (!formSlug) return;

  const loadStepFormConfig = async () => {
    try {
      console.log(`🔍 Carregando config para StepForm slug: ${formSlug}`);
      // Buscar diretamente na tabela step_forms - otimizado para buscar apenas o necessário
      const { data: stepForm, error } = await supabase
        .from('step_forms')
        .select('tracking_config, name, id')
        .eq('slug', formSlug)
        .eq('is_active', true)
        .maybeSingle(); // Usar maybeSingle para evitar erro se não encontrar

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Erro ao carregar step form:', error);
        return;
      }

      console.log(`📊 StepForm encontrado:`, stepForm);

      if (stepForm && stepForm.tracking_config) {
        
        // Criar config compatível com a estrutura esperada
        const trackingConfig = stepForm.tracking_config as any;
        console.log(`🔧 Tracking config bruto:`, trackingConfig);
        
        // Verificar se há pixel_id no nível principal ou dentro de facebook_pixel
         const pixelId = trackingConfig?.pixel_id || trackingConfig?.facebook_pixel?.pixel_id || '';
         const fbEnabled = (trackingConfig?.facebook_pixel === true) || (trackingConfig?.facebook_pixel?.enabled === true) || (pixelId && String(pixelId).length > 0);
        
        const stepFormConfig = {
          slug: formSlug,
          name: stepForm.name,
          id: stepForm.id,
          enabled: true,
          facebookPixel: {
            enabled: fbEnabled,
            pixel_id: pixelId,
            eventType: trackingConfig?.facebook_pixel?.event_type || trackingConfig?.event_type || 'Lead',
            customEventName: trackingConfig?.facebook_pixel?.custom_event_name || trackingConfig?.custom_event_name || ''
          },
          googleAnalytics: {
            enabled: trackingConfig?.google_analytics?.enabled || false,
            tracking_id: trackingConfig?.google_analytics?.tracking_id || trackingConfig?.ga_id || '',
            eventName: trackingConfig?.google_analytics?.event_name || trackingConfig?.ga_event_name || 'form_submit'
          },
          googleTagManager: {
            enabled: trackingConfig?.google_tag_manager?.enabled || false,
            container_id: trackingConfig?.google_tag_manager?.container_id || trackingConfig?.gtm_id || '',
            eventName: trackingConfig?.google_tag_manager?.event_name || trackingConfig?.gtm_event_name || 'form_submit'
          },
          // Códigos personalizados (Head e Body)
          customHeadHtml: trackingConfig?.custom_head_html || trackingConfig?.head_html || '',
          customBodyHtml: trackingConfig?.custom_body_html || trackingConfig?.body_html || ''
        };
        
        console.log(`🎯 Config processada para StepForm ${formSlug}:`, stepFormConfig);
        console.log(`🔍 Custom HEAD HTML:`, stepFormConfig.customHeadHtml);
        console.log(`🔍 Custom BODY HTML:`, stepFormConfig.customBodyHtml);
        implementStepFormScripts(stepFormConfig);
      } else {
        console.log(`⚠️ StepForm ${formSlug} não encontrado ou sem tracking_config`);
        // Implementar fallback para rastreamento básico quando configuração estiver desabilitada
        await implementFallbackTracking(formSlug);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar configuração do StepForm:', error);
      // Implementar fallback em caso de erro
      await implementFallbackTracking(formSlug);
    }
  };

  // Carregar configuração imediatamente sem debounce
  loadStepFormConfig();

  return () => {
    removeStepFormScripts(formSlug);
  };
  }, [formSlug]);

  const implementStepFormScripts = (stepFormConfig: any) => {
    console.log(`🚀 Implementando scripts para StepForm ${stepFormConfig.slug}:`, stepFormConfig);

    // Remover scripts antigos específicos deste StepForm
    removeStepFormScripts(stepFormConfig.slug);

    // Facebook Pixel - SEMPRE implementar para garantir funcionamento
    console.log(`✅ Implementando Facebook Pixel para StepForm ${stepFormConfig.slug}`);
    implementStepFormFacebookPixel(stepFormConfig);

    // Google Tag Manager - SEMPRE implementar para garantir funcionamento
    console.log(`✅ Implementando Google Tag Manager para StepForm ${stepFormConfig.slug}`);
    implementStepFormGoogleTagManager(stepFormConfig);

    // Google Analytics - SEMPRE implementar para garantir funcionamento
    console.log(`✅ Implementando Google Analytics para StepForm ${stepFormConfig.slug}`);
    implementStepFormGoogleAnalytics(stepFormConfig);

    // Códigos personalizados HTML
    if (stepFormConfig.customHeadHtml) {
      implementStepFormCustomHead(stepFormConfig.customHeadHtml);
    }
    if (stepFormConfig.customBodyHtml) {
      implementStepFormCustomBody(stepFormConfig.customBodyHtml);
    }

    console.log(`✅ Scripts implementados com sucesso para StepForm ${stepFormConfig.slug}`);
  };

  // Implementar Facebook Pixel para StepForm
  const implementStepFormFacebookPixel = (config: any) => {
    console.log('📘 Implementando Facebook Pixel para StepForm:', config?.facebookPixel?.pixel_id || '1588678535149985');
    
    // Remover scripts antigos
    const existingScript = document.querySelector('[data-stepform-pixel="facebook"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Usar pixel_id da configuração ou fallback
    const pixelId = config?.facebookPixel?.pixel_id || '1588678535149985';
    
    const fbPixelScript = document.createElement('script');
    fbPixelScript.setAttribute('data-stepform-pixel', 'facebook');
    fbPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      // Inicializar pixel
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
      console.log('📘 Facebook Pixel inicializado:', '${pixelId}');
    `;
    document.head.appendChild(fbPixelScript);

    // Configurar listener para eventos de sucesso do StepForm
    const handleStepFormSuccess = (event: CustomEvent) => {
      console.log('🎯 StepForm: Sucesso capturado pelo Facebook Pixel:', event.detail);
      
      // Aguardar um pouco para garantir que o fbq está disponível
      setTimeout(() => {
        if ((window as any).fbq) {
          // Disparar evento Lead
          (window as any).fbq('track', 'Lead', {
            content_name: 'StepForm Lead Generation',
            form_slug: event.detail?.formSlug || 'unknown',
            value: event.detail?.value || 1,
            currency: 'BRL',
            page_url: window.location.href,
            ...event.detail
          });
          console.log('📊 Evento "Lead" enviado para Facebook Pixel');
        } else {
          console.warn('⚠️ Facebook Pixel não está disponível para enviar evento');
        }
      }, 500);
    };

    // Remover listener anterior se existir
    window.removeEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    
    // Adicionar novo listener
    window.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    
    console.log('✅ Facebook Pixel configurado para StepForm');
  };

  // Implementar Google Tag Manager para StepForm
  const implementStepFormGoogleTagManager = (config: any) => {
    console.log('🏷️ Implementando Google Tag Manager para StepForm:', config?.googleTagManager?.container_id || 'GTM-N7TDJGMR');
    
    // Remover scripts antigos
    const existingScript = document.querySelector('[data-stepform-gtm]');
    if (existingScript) {
      existingScript.remove();
    }

    // Usar container_id da configuração ou fallback
    const containerId = config?.googleTagManager?.container_id || 'GTM-N7TDJGMR';

    // Inicializar dataLayer se não existir
    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }
    
    const gtmScript = document.createElement('script');
    gtmScript.setAttribute('data-stepform-gtm', 'true');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
      
      console.log('🏷️ Google Tag Manager carregado:', '${containerId}');
    `;
    document.head.appendChild(gtmScript);

    // Adicionar noscript no body se não existir
    if (!document.querySelector(`iframe[src*="${containerId}"]`)) {
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }

    // Configurar listener para eventos de sucesso do StepForm
    const handleStepFormSuccess = (event: CustomEvent) => {
      console.log('🎯 StepForm: Sucesso capturado pelo GTM:', event.detail);
      
      // Aguardar um pouco para garantir que o dataLayer está disponível
      setTimeout(() => {
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'stepform_lead_generation',
            form_slug: event.detail?.formSlug || 'unknown',
            value: event.detail?.value || 1,
            currency: 'BRL',
            event_category: 'Lead Generation',
            event_action: 'StepForm Submit',
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
            ...event.detail
          });
          console.log('📊 Evento enviado para GTM dataLayer');
        } else {
          console.warn('⚠️ GTM dataLayer não está disponível para enviar evento');
        }
      }, 300);
    };

    // Remover listener anterior se existir
    window.removeEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    
    // Adicionar novo listener
    window.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    
    console.log('✅ Google Tag Manager configurado para StepForm');
  };

  // Implementar Google Analytics para StepForm
  const implementStepFormGoogleAnalytics = (config: any) => {
    console.log('📊 Implementando Google Analytics para StepForm:', config?.googleAnalytics?.tracking_id || 'G-FQVHCDRQLX');
    
    // Remover scripts antigos
    const existingScripts = document.querySelectorAll('[data-stepform-ga]');
    existingScripts.forEach(script => script.remove());

    // Usar tracking_id da configuração ou fallback
    const measurementId = config?.googleAnalytics?.tracking_id || 'G-FQVHCDRQLX';

    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-stepform-ga', 'true');
    document.head.appendChild(gtagScript);

    const configScript = document.createElement('script');
    configScript.setAttribute('data-stepform-ga', 'true');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
      console.log('📊 Google Analytics carregado:', '${measurementId}');
    `;
    document.head.appendChild(configScript);

    // Configurar listener para eventos de sucesso do StepForm
    const handleStepFormSuccess = (event: CustomEvent) => {
      console.log('🎯 StepForm: Sucesso capturado pelo GA:', event.detail);
      
      // Aguardar um pouco para garantir que o gtag está disponível
      setTimeout(() => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'Lead Generation',
            event_label: 'StepForm Submit',
            form_slug: event.detail?.formSlug || 'unknown',
            value: event.detail?.value || 1,
            ...event.detail
          });
          console.log('📊 Evento enviado para Google Analytics');
        } else {
          console.warn('⚠️ Google Analytics não está disponível para enviar evento');
        }
      }, 400);
    };

    // Remover listener anterior se existir
    window.removeEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    
    // Adicionar novo listener
    window.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    
    console.log('✅ Google Analytics configurado para StepForm');
  };

  // Implementar fallback básico de rastreamento quando configurações específicas não estão disponíveis
  const implementFallbackTracking = async (formSlug: string) => {
    console.log('🔄 Implementando fallback de tracking para StepForm:', formSlug);
    
    try {
      console.log('⚠️ Usando configurações padrão para garantir funcionamento');
      
      // Implementar com IDs padrão para garantir que o tracking funcione sempre
      implementStepFormFacebookPixel({ facebookPixel: { pixel_id: '1588678535149985' } });
      implementStepFormGoogleTagManager({ googleTagManager: { container_id: 'GTM-N7TDJGMR' } });
      implementStepFormGoogleAnalytics({ googleAnalytics: { tracking_id: 'G-FQVHCDRQLX' } });
      
      console.log('✅ Fallback implementado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao implementar fallback:', error);
      // Em caso de erro total, implementar com IDs padrão
      implementStepFormFacebookPixel({ facebookPixel: { pixel_id: '1588678535149985' } });
      implementStepFormGoogleTagManager({ googleTagManager: { container_id: 'GTM-N7TDJGMR' } });
      implementStepFormGoogleAnalytics({ googleAnalytics: { tracking_id: 'G-FQVHCDRQLX' } });
    }
  };

  
  const removeStepFormScripts = (formSlug: string) => {
    console.log(`🧹 Removendo scripts do StepForm: ${formSlug}`);
    
    // Remover scripts de tracking específicos do StepForm
    const scriptsToRemove = [
      '[data-stepform-pixel="facebook"]',
      '[data-stepform-gtm]',
      '[data-stepform-ga]',
      '[data-stepform-custom]'
    ];
    
    scriptsToRemove.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.remove();
        console.log(`🗑️ Script removido: ${selector}`);
      });
    });

    // Remover noscript do GTM se existir
    const noscriptElements = document.querySelectorAll('noscript');
    noscriptElements.forEach(noscript => {
      if (noscript.innerHTML.includes('googletagmanager.com/ns.html')) {
        noscript.remove();
        console.log(`🗑️ Noscript GTM removido`);
      }
    });
  };

  const implementStepFormCustomHead = (customHeadHtml: string) => {
    console.log('🔧 Implementando HTML customizado no HEAD para StepForm');
    
    if (!customHeadHtml) return;
    
    // Remover scripts customizados antigos
    const existingCustomScripts = document.querySelectorAll('[data-stepform-custom="head"]');
    existingCustomScripts.forEach(script => script.remove());
    
    // Extrair e executar scripts do HTML personalizado
    const scripts = extractScriptsFromHtml(customHeadHtml);
    scripts.forEach(scriptContent => {
      const script = document.createElement('script');
      script.setAttribute('data-stepform-custom', 'head');
      script.innerHTML = scriptContent;
      document.head.appendChild(script);
    });
    
    // Adicionar outros elementos HTML que não sejam scripts
    const nonScriptHtml = customHeadHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    if (nonScriptHtml.trim()) {
      const tempDiv = document.createElement('div');
      tempDiv.setAttribute('data-stepform-custom', 'head');
      tempDiv.innerHTML = nonScriptHtml;
      document.head.appendChild(tempDiv);
    }
    
    console.log('✅ HTML customizado do HEAD implementado');
  };

  const implementStepFormCustomBody = (customBodyHtml: string) => {
    console.log('🔧 Implementando HTML customizado no BODY para StepForm');
    
    if (!customBodyHtml) return;
    
    // Remover scripts customizados antigos
    const existingCustomScripts = document.querySelectorAll('[data-stepform-custom="body"]');
    existingCustomScripts.forEach(script => script.remove());
    
    // Processar noscript tags separadamente
    const noscriptRegex = /<noscript[^>]*>([\s\S]*?)<\/noscript>/gi;
    let noscriptMatch;
    while ((noscriptMatch = noscriptRegex.exec(customBodyHtml)) !== null) {
      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-stepform-custom', 'body');
      noscript.innerHTML = noscriptMatch[1];
      document.body.appendChild(noscript);
    }
    
    // Extrair e executar scripts do HTML personalizado
    const scripts = extractScriptsFromHtml(customBodyHtml);
    scripts.forEach(scriptContent => {
      const script = document.createElement('script');
      script.setAttribute('data-stepform-custom', 'body');
      script.innerHTML = scriptContent;
      document.body.appendChild(script);
    });
    
    // Adicionar outros elementos HTML que não sejam scripts ou noscript
    let nonScriptHtml = customBodyHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    nonScriptHtml = nonScriptHtml.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
    if (nonScriptHtml.trim()) {
      const tempDiv = document.createElement('div');
      tempDiv.setAttribute('data-stepform-custom', 'body');
      tempDiv.innerHTML = nonScriptHtml;
      document.body.appendChild(tempDiv);
    }
    
    console.log('✅ HTML customizado do BODY implementado');
  };

  const extractScriptsFromHtml = (html: string): string[] => {
    const scripts: string[] = [];
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    
    while ((match = scriptRegex.exec(html)) !== null) {
      if (match[1] && match[1].trim()) {
        scripts.push(match[1]);
      }
    }
    
    return scripts;
  };
};
