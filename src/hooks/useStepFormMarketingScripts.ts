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
        implementFallbackTracking(formSlug);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar configuração do StepForm:', error);
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

    // Facebook Pixel - APENAS se estiver habilitado
    if (stepFormConfig.facebookPixel?.enabled === true && stepFormConfig.facebookPixel?.pixel_id) {
      console.log(`✅ Facebook Pixel HABILITADO para StepForm ${stepFormConfig.slug}`);
      implementStepFormFacebookPixel(stepFormConfig);
    } else {
      console.log(`❌ Facebook Pixel DESABILITADO para StepForm ${stepFormConfig.slug}`);
    }

    // Google Analytics - APENAS se estiver habilitado
    if (stepFormConfig.googleAnalytics?.enabled === true && stepFormConfig.googleAnalytics?.tracking_id) {
      console.log(`✅ Google Analytics HABILITADO para StepForm ${stepFormConfig.slug}`);
      implementStepFormGoogleAnalytics(stepFormConfig);
    } else {
      console.log(`❌ Google Analytics DESABILITADO para StepForm ${stepFormConfig.slug}`);
    }

    // Google Tag Manager - APENAS se estiver habilitado
    if (stepFormConfig.googleTagManager?.enabled === true && stepFormConfig.googleTagManager?.container_id) {
      console.log(`✅ Google Tag Manager HABILITADO para StepForm ${stepFormConfig.slug}`);
      implementStepFormGoogleTagManager(stepFormConfig);
    } else {
      console.log(`❌ Google Tag Manager DESABILITADO para StepForm ${stepFormConfig.slug}`);
    }

    // Códigos personalizados (Head e Body)
    if (stepFormConfig.customHeadHtml) {
      implementStepFormCustomHead(stepFormConfig);
    }
    if (stepFormConfig.customBodyHtml) {
      implementStepFormCustomBody(stepFormConfig);
    }
  };

  const implementFallbackTracking = (formSlug: string) => {
    console.log(`🔧 Implementando fallback para ${formSlug}`);
    
    // Remover listeners antigos
    removeStepFormScripts(formSlug);
    
    // Adicionar listener básico para debug
    const handleFallbackSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === formSlug) {
        console.log(`✅ StepForm ${formSlug} - Evento capturado (fallback)`, event.detail);
        
        // Tentar disparar eventos básicos se os scripts estiverem disponíveis
        if ((window as any).fbq) {
          try {
            (window as any).fbq('track', 'Lead', { form_id: formSlug });
            console.log(`📘 Fallback: Facebook Pixel Lead enviado para ${formSlug}`);
          } catch(e) { console.log('📘 Fallback: Erro no Facebook Pixel:', e); }
        }
        
        if ((window as any).gtag) {
          try {
            (window as any).gtag('event', 'form_submit', { form_id: formSlug });
            console.log(`📊 Fallback: Google Analytics enviado para ${formSlug}`);
          } catch(e) { console.log('📊 Fallback: Erro no Google Analytics:', e); }
        }
        
        if ((window as any).dataLayer) {
          try {
            (window as any).dataLayer.push({ event: 'submit', form_id: formSlug });
            console.log(`🏷️ Fallback: GTM enviado para ${formSlug}`);
          } catch(e) { console.log('🏷️ Fallback: Erro no GTM:', e); }
        }
      }
    };
    
    // Registrar listener
    const handlersMap = (window as any).__stepFormMarketingHandlers || {};
    handlersMap[formSlug] = { fallback: handleFallbackSuccess };
    (window as any).__stepFormMarketingHandlers = handlersMap;
    
    window.addEventListener('stepFormSubmitSuccess', handleFallbackSuccess as EventListener);
  };

  const removeStepFormScripts = (formSlug: string) => {
    // Remover scripts do DOM
    const existingScripts = document.querySelectorAll(`[data-stepform-marketing="${formSlug}"]`);
    existingScripts.forEach(script => script.remove());

    // Remover listeners registrados para este StepForm
    const handlersMap = (window as any).__stepFormMarketingHandlers || {};
    const handlers = handlersMap[formSlug];
    if (handlers?.fb) window.removeEventListener('stepFormSubmitSuccess', handlers.fb as EventListener);
    if (handlers?.ga) document.removeEventListener('stepFormSubmitSuccess', handlers.ga);
    if (handlers?.gtm) document.removeEventListener('stepFormSubmitSuccess', handlers.gtm);
    delete handlersMap[formSlug];
    (window as any).__stepFormMarketingHandlers = handlersMap;
  };

  const implementStepFormFacebookPixel = (stepFormConfig: any) => {
    const { slug, facebookPixel } = stepFormConfig;
    
    // Validar se o pixelId é válido (apenas números)
    const pixelId = facebookPixel.pixel_id?.replace(/[^0-9]/g, '');
    if (!pixelId || pixelId.length < 10) {
      console.warn(`⚠️ Pixel ID inválido para StepForm ${slug}:`, facebookPixel.pixel_id);
      return;
    }
    
    console.log(`📘 Implementando Facebook Pixel para StepForm ${slug}:`, pixelId);

    // Verificar se este pixel específico já foi inicializado
    const pixelKey = `fbq_pixel_${pixelId}`;
    if (!(window as any)[pixelKey]) {
      // Criar o script base do Facebook Pixel
      const fbPixelScript = document.createElement('script');
      fbPixelScript.setAttribute('data-stepform-marketing', slug);
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
        console.log('📘 Meta Pixel ${pixelId} inicializado para StepForm ${slug} (autoConfig desativado)');
      `;
      document.head.appendChild(fbPixelScript);

      // Marcar este pixel como inicializado
      (window as any)[pixelKey] = true;
      try { (window as any).fbq && (window as any).fbq('track','PageView'); console.log(`👀 PageView enviado para Pixel ${pixelId} (init)`); } catch(e) {}
    } else {
      console.log(`📘 Meta Pixel ${pixelId} já estava inicializado para StepForm ${slug}`);
      try { (window as any).fbq && (window as any).fbq('track','PageView'); console.log(`👀 PageView enviado para Pixel ${pixelId} (reuse)`); } catch(e) {}
    }

    // Adicionar listener específico para submissão bem-sucedida do StepForm
    const handleStepFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === slug) {
        console.log(`✅ StepForm ${slug} enviado com SUCESSO - rastreando com Facebook Pixel`);
        
        if ((window as any).fbq) {
          const eventType = facebookPixel.eventType === 'Custom' 
            ? (facebookPixel.customEventName || 'CustomEvent')
            : (facebookPixel.eventType || 'Lead');
          
          // De-dup: evitar múltiplos eventos por submissão do mesmo StepForm
          const sentMap = (window as any).__stepFormEventSent || {};
          if (sentMap[slug]) {
            console.log(`⏭️ Evento ignorado (duplicado) para StepForm: ${slug}`);
            return;
          }
          sentMap[slug] = true;
          (window as any).__stepFormEventSent = sentMap;
          setTimeout(() => {
            const m = (window as any).__stepFormEventSent || {};
            delete m[slug];
            (window as any).__stepFormEventSent = m;
          }, 3000);
          
          (window as any).fbq('track', eventType, {
            content_name: stepFormConfig.name || 'StepForm Submission',
            form_id: slug,
            page_url: window.location.href,
            pixel_id: pixelId,
            event_source_url: window.location.href,
            user_data: event.detail?.userData || {}
          });
          console.log(`📊 Evento "${eventType}" rastreado para StepForm: ${slug} com pixel: ${pixelId}`);
        }
      }
    };

    // Registrar listener gerenciado
    const handlersMap = (window as any).__stepFormMarketingHandlers || {};
    if (handlersMap[slug]?.fb) {
      window.removeEventListener('stepFormSubmitSuccess', handlersMap[slug].fb as EventListener);
    }
    window.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    handlersMap[slug] = { ...(handlersMap[slug] || {}), fb: handleStepFormSuccess as EventListener };
    (window as any).__stepFormMarketingHandlers = handlersMap;
  };

  const implementStepFormGoogleAnalytics = (stepFormConfig: any) => {
    const { slug, googleAnalytics } = stepFormConfig;
    console.log(`📊 Implementando Google Analytics para StepForm ${slug}:`, googleAnalytics.tracking_id);

    // Verificar se o GA base já existe
    if (!(window as any).gtag) {
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.tracking_id}`;
      gtagScript.async = true;
      gtagScript.setAttribute('data-stepform-marketing', slug);
      document.head.appendChild(gtagScript);

      const configScript = document.createElement('script');
      configScript.setAttribute('data-stepform-marketing', slug);
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalytics.tracking_id}');
      `;
      document.head.appendChild(configScript);
    }

    // Adicionar listener específico para submissão bem-sucedida do StepForm
    const handleStepFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === slug) {
        console.log(`✅ StepForm ${slug} enviado com SUCESSO - rastreando com Google Analytics`);
        
        if ((window as any).gtag) {
          (window as any).gtag('event', googleAnalytics.eventName || 'form_submit', {
            event_category: 'engagement',
            event_label: slug,
            form_id: slug,
            user_data: event.detail?.userData || {}
          });
          console.log(`📊 Evento "${googleAnalytics.eventName}" rastreado para StepForm: ${slug}`);
        }
      }
    };

    // Registrar listener gerenciado
    const handlersMap = (window as any).__stepFormMarketingHandlers || {};
    if (handlersMap[slug]?.ga) {
      document.removeEventListener('stepFormSubmitSuccess', handlersMap[slug].ga);
    }
    document.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    handlersMap[slug] = { ...(handlersMap[slug] || {}), ga: handleStepFormSuccess as EventListener };
    (window as any).__stepFormMarketingHandlers = handlersMap;
  };

  const implementStepFormGoogleTagManager = (stepFormConfig: any) => {
    const { slug, googleTagManager } = stepFormConfig;
    console.log(`🏷️ Implementando Google Tag Manager para StepForm ${slug}:`, googleTagManager.container_id);

    // Verificar se o GTM base já existe
    if (!(window as any).dataLayer) {
      const gtmScript = document.createElement('script');
      gtmScript.setAttribute('data-stepform-marketing', slug);
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManager.container_id}');
      `;
      document.head.appendChild(gtmScript);

      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-stepform-marketing', slug);
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManager.container_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }

    // Adicionar listener específico para submissão bem-sucedida do StepForm
    const handleStepFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug === slug) {
        console.log(`✅ StepForm ${slug} enviado com SUCESSO - rastreando com GTM`);
        
        if ((window as any).dataLayer) {
          // Disparar evento padrão 'submit' do GTM
          (window as any).dataLayer.push({
            event: 'submit',
            gtm: {
              formId: slug,
              formName: stepFormConfig.name || 'StepForm Submission',
              formType: 'step_form'
            }
          });
          
          // Também disparar evento personalizado se configurado
          if (googleTagManager.eventName && googleTagManager.eventName !== 'submit') {
            (window as any).dataLayer.push({
              event: googleTagManager.eventName,
              form_id: slug,
              form_name: stepFormConfig.name || 'StepForm Submission',
              form_slug: slug,
              user_data: event.detail?.userData || {},
              event_category: 'step_form',
              event_action: 'form_submission',
              event_label: stepFormConfig.name || slug,
              timestamp: new Date().toISOString()
            });
          }
          
          console.log(`📊 Evento 'submit' padrão enviado para GTM`);
          console.log(`🏷️ DataLayer após submissão:`, (window as any).dataLayer);
        } else {
          console.error(`❌ dataLayer não encontrado para GTM no StepForm ${slug}`);
        }
      }
    };

    // Registrar listener gerenciado
    const handlersMap = (window as any).__stepFormMarketingHandlers || {};
    if (handlersMap[slug]?.gtm) {
      document.removeEventListener('stepFormSubmitSuccess', handlersMap[slug].gtm);
    }
    document.addEventListener('stepFormSubmitSuccess', handleStepFormSuccess as EventListener);
    handlersMap[slug] = { ...(handlersMap[slug] || {}), gtm: handleStepFormSuccess as EventListener };
    (window as any).__stepFormMarketingHandlers = handlersMap;
  };

  // ===== Helpers para códigos customizados (Head e Body) =====
  const extractScriptsFromHtml = (html: string) => {
    const scripts: Array<{ content: string; async: boolean; src?: string }> = [];
    const regex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(html))) {
      const attrs = match[1] || '';
      const content = match[2] || '';
      const asyncAttr = /\basync\b/i.test(attrs);
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      scripts.push({ content, async: asyncAttr, src: srcMatch?.[1] });
    }
    return scripts;
  };

  const implementStepFormCustomHead = (stepFormConfig: any) => {
    const { slug, customHeadHtml } = stepFormConfig;
    console.log(`🔧 Implementando HEAD custom para StepForm ${slug}:`, customHeadHtml);
    
    if (!customHeadHtml || customHeadHtml.trim() === '') {
      console.log(`⚠️ Nenhum código HEAD encontrado para StepForm ${slug}`);
      return;
    }
    
    try {
      // Verificar se já existe
      const existing = document.querySelector(`[data-stepform-head="${slug}"]`);
      if (existing) {
        existing.remove();
        console.log(`🗑️ Removido HEAD anterior para StepForm ${slug}`);
      }
      
      // Criar um container div para o conteúdo
      const container = document.createElement('div');
      container.setAttribute('data-stepform-head', slug);
      container.style.display = 'none'; // Invisível, apenas para scripts
      container.innerHTML = customHeadHtml;
      
      // Executar scripts manualmente
      const scripts = container.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.setAttribute('data-stepform-marketing', slug);
        
        if (script.src) {
          newScript.src = script.src;
          newScript.async = script.async;
        } else {
          newScript.textContent = script.textContent;
        }
        
        document.head.appendChild(newScript);
        console.log(`📝 Script HEAD injetado para StepForm ${slug}`);
      });
      
      console.log(`✅ HEAD custom do StepForm ${slug} implementado com sucesso`);
    } catch (e) {
      console.error(`❌ Erro ao implementar HEAD custom do StepForm ${slug}:`, e);
    }
  };

  const implementStepFormCustomBody = (stepFormConfig: any) => {
    const { slug, customBodyHtml } = stepFormConfig;
    console.log(`🔧 Implementando BODY custom para StepForm ${slug}:`, customBodyHtml);
    
    if (!customBodyHtml || customBodyHtml.trim() === '') {
      console.log(`⚠️ Nenhum código BODY encontrado para StepForm ${slug}`);
      return;
    }
    
    try {
      // Verificar se já existe
      const existing = document.querySelector(`[data-stepform-body="${slug}"]`);
      if (existing) {
        existing.remove();
        console.log(`🗑️ Removido BODY anterior para StepForm ${slug}`);
      }
      
      // Criar elemento noscript diretamente
      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-stepform-body', slug);
      noscript.setAttribute('data-stepform-marketing', slug);
      
      // Extrair conteúdo do noscript se existir, senão usar o HTML inteiro
      const nsMatch = customBodyHtml.match(/<noscript[^>]*>([\s\S]*?)<\/noscript>/i);
      if (nsMatch) {
        noscript.innerHTML = nsMatch[1];
        console.log(`📝 Conteúdo noscript extraído para StepForm ${slug}`);
      } else {
        noscript.innerHTML = customBodyHtml;
        console.log(`📝 HTML completo usado como noscript para StepForm ${slug}`);
      }
      
      document.body.appendChild(noscript);
      console.log(`✅ BODY custom do StepForm ${slug} implementado com sucesso`);
    } catch (e) {
      console.error(`❌ Erro ao implementar BODY custom do StepForm ${slug}:`, e);
    }
  };
};