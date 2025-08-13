import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FormMarketingConfig {
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
    eventType: 'Lead' | 'Purchase' | 'Contact' | 'SubmitApplication' | 'CompleteRegistration' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Custom';
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
  const dlog = (...args: any[]) => { 
    if (typeof window !== 'undefined' && (window as any).__marketingDebug) {
      console.log(...args); 
    }
  };
  
  useEffect(() => {
    if (!formId) return;

    const loadFormConfig = async () => {
      try {
        dlog(`📋 Carregando configuração de marketing para formulário: ${formId}`);
        
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
          
          console.log(`🔍 [DEBUG] Configuração completa:`, trackingConfig);
          console.log(`🔍 [DEBUG] Procurando formId: "${formId}"`);
          console.log(`🔍 [DEBUG] SystemForms disponíveis:`, trackingConfig.systemForms);
          
          const formConfig = trackingConfig.systemForms?.find(
            (form: any) => form.formId === formId && form.enabled
          );

          if (formConfig) {
            console.log(`✅ [DEBUG] Configuração encontrada para formulário ${formId}:`, formConfig);
            console.log(`🎯 [DEBUG] Facebook Pixel config:`, formConfig.facebookPixel);
            console.log(`🎯 [DEBUG] Evento configurado:`, formConfig.facebookPixel?.eventType);
            implementFormScripts(formConfig);
          } else {
            console.log(`ℹ️ [DEBUG] Nenhuma configuração ativa encontrada para formulário: ${formId}`);
            console.log(`🔍 [DEBUG] Formulários disponíveis:`, trackingConfig.systemForms?.map((f: any) => ({ id: f.formId, enabled: f.enabled })));
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
      dlog(`🔄 Recarregando configuração para formulário: ${formId}`);
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
    dlog(`🚀 Implementando scripts para formulário ${formConfig.formId}:`, formConfig);

    // Remover scripts antigos específicos deste formulário
    removeFormScripts(formConfig.formId);

    // Facebook Pixel - APENAS se estiver habilitado (não requer pixelId local)
    if (formConfig.facebookPixel?.enabled === true) {
      dlog(`✅ Facebook Pixel HABILITADO para formulário ${formConfig.formId}`);
      implementFormFacebookPixel(formConfig);
    } else {
      dlog(`❌ Facebook Pixel DESABILITADO para formulário ${formConfig.formId}`);
    }

    // Google Analytics - APENAS se estiver habilitado
    if (formConfig.googleAnalytics?.enabled === true && formConfig.googleAnalytics?.measurementId) {
      dlog(`✅ Google Analytics HABILITADO para formulário ${formConfig.formId}`);
      implementFormGoogleAnalytics(formConfig);
    } else {
      dlog(`❌ Google Analytics DESABILITADO para formulário ${formConfig.formId}`);
    }

    // Google Tag Manager - APENAS se estiver habilitado
    if (formConfig.googleTagManager?.enabled === true && formConfig.googleTagManager?.containerId) {
      dlog(`✅ Google Tag Manager HABILITADO para formulário ${formConfig.formId}`);
      implementFormGoogleTagManager(formConfig);
    } else {
      dlog(`❌ Google Tag Manager DESABILITADO para formulário ${formConfig.formId}`);
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

  const normalizePixelEventName = (eventType?: string, custom?: string) => {
    if (!eventType) return null;
    if (eventType === 'Custom') return (custom || '').trim() || null;
    const map: Record<string, string> = {
      Lead: 'Lead',
      Purchase: 'Purchase',
      Contact: 'Contact',
      SubmitApplication: 'SubmitApplication',
      'Submit Application': 'SubmitApplication',
      CompleteRegistration: 'CompleteRegistration',
      'Complete Registration': 'CompleteRegistration',
      ViewContent: 'ViewContent',
      'View Content': 'ViewContent',
      AddToCart: 'AddToCart',
      'Add To Cart': 'AddToCart',
      InitiateCheckout: 'InitiateCheckout',
      'Initiate Checkout': 'InitiateCheckout',
    };
    return map[eventType] || eventType.replace(/\s+/g, '');
  };

  const implementFormFacebookPixel = (formConfig: any) => {
    const { formId, facebookPixel } = formConfig;
    
    dlog(`📘 Pixel preparado para formulário ${formId} (sem reinicializar base)`);

    // Verificar se o pixel está carregado e forçar carregamento se necessário
    if (typeof window !== 'undefined' && !(window as any).fbq) {
      console.warn('⚠️ fbq não está disponível - aguardando carregamento global...');
      // Aguardar até 5 segundos pelo Facebook Pixel carregar
      let attempts = 0;
      const checkPixel = setInterval(() => {
        attempts++;
        if ((window as any).fbq || attempts >= 50) {
          clearInterval(checkPixel);
          if (!(window as any).fbq) {
            console.error('❌ Facebook Pixel não carregou após 5 segundos');
          } else {
            console.log('✅ Facebook Pixel carregado via espera');
          }
        }
      }, 100);
    }

    const handleFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        // Log para debug em produção  
        const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('lovableproject.com');
        if (isProduction) {
          console.log(`✅ [PROD] Formulário ${formId} enviado - rastreando com Facebook Pixel`);
        }
        
        // Aguardar um momento para garantir que fbq está disponível
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).fbq) {
            const resolvedEvent = normalizePixelEventName(facebookPixel.eventType as any, facebookPixel.customEventName);

            if (!resolvedEvent) {
              if (isProduction) {
                console.log(`ℹ️ [PROD] Nenhum evento configurado para ${formId}`);
              }
              dlog(`ℹ️ Nenhum evento configurado para ${formId}`);
              return;
            }

            // De-dup: evitar múltiplos eventos por submissão do mesmo formulário
            const sentMap = (window as any).__formEventSent || {};
            if (sentMap[formId] && (Date.now() - sentMap[formId]) < 5000) {
              if (isProduction) {
                console.log(`⏭️ [PROD] Evento ignorado (duplicado) para formulário: ${formId}`);
              }
              dlog(`⏭️ Evento ignorado (duplicado) para formulário: ${formId}`);
              return;
            }
            sentMap[formId] = Date.now();
            (window as any).__formEventSent = sentMap;
            
            // Limpar duplicados antigos
            setTimeout(() => {
              const m = (window as any).__formEventSent || {};
              Object.keys(m).forEach(key => {
                if (Date.now() - m[key] > 10000) {
                  delete m[key];
                }
              });
              (window as any).__formEventSent = m;
            }, 10000);
            
            try {
              (window as any).fbq('track', resolvedEvent, {
                content_name: formConfig.campaignName || 'Form Submission',
                form_id: formId,
                page_url: window.location.href,
                event_source_url: window.location.href,
                user_data: event.detail?.userData || {}
              });
              
              if (isProduction) {
                console.log(`📊 [PROD] Evento "${resolvedEvent}" enviado para formulário: ${formId}`);
              }
              dlog(`📊 Evento "${resolvedEvent}" enviado para formulário: ${formId}`);
            } catch (error) {
              console.error('❌ Erro ao enviar evento do Facebook Pixel:', error);
            }
          } else {
            console.error('❌ Facebook Pixel não disponível após timeout');
            // Log adicional para debug
            console.log('🔍 Debug: window.fbq existe?', typeof (window as any).fbq);
            console.log('🔍 Debug: window objeto:', typeof window);
          }
        }, 500); // Aumentar timeout para produção
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
    dlog(`📊 Implementando Google Analytics para formulário ${formId}: ${googleAnalytics.measurementId}`);

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
        dlog(`✅ Formulário ${formId} enviado com SUCESSO - rastreando com Google Analytics`);
        
        // Aguardar um momento para garantir que gtag está disponível
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', googleAnalytics.eventName || 'form_submit', {
            event_category: 'engagement',
            event_label: formId,
            form_id: formId,
            user_data: event.detail?.userData || {}
            });
            dlog(`📊 Evento "${googleAnalytics.eventName}" rastreado para formulário: ${formId}`);
          } else {
            console.error('❌ Google Analytics não disponível após timeout');
          }
        }, 500); // Aguardar 500ms para o GA estar pronto
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
  dlog(`🏷️ Implementando Google Tag Manager para formulário ${formId}: ${googleTagManager.containerId}`);

  // Respeitar flag global para evitar overlays/erros do Tag Assistant
  if ((window as any).__enableGTM !== true) {
    dlog('⏸️ GTM desativado globalmente (__enableGTM != true). Não injetando.');
    return;
  }

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
        dlog(`✅ Formulário ${formId} enviado com SUCESSO - rastreando com GTM`);
        
        // Aguardar um momento para garantir que dataLayer está disponível
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: googleTagManager.eventName || 'form_submit',
            form_id: formId,
            form_name: formConfig.campaignName || 'Form Submission',
            user_data: event.detail?.userData || {}
            });
            dlog(`📊 Evento "${googleTagManager.eventName}" enviado para GTM: ${formId}`);
          } else {
            console.error('❌ GTM dataLayer não disponível após timeout');
          }
        }, 500); // Aguardar 500ms para o GTM estar pronto
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