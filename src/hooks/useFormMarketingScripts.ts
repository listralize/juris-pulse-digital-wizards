import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FormMarketingConfig {
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
    eventType: 'Lead' | 'Purchase' | 'Contact' | 'SubmitApplication' | 'CompleteRegistration';
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
    if (!formId) {
      console.log('❌ [useFormMarketingScripts] FormId não fornecido');
      return;
    }

    console.log(`🚀 [useFormMarketingScripts] Iniciando para formId: ${formId}`);
    console.log(`🌐 [useFormMarketingScripts] URL atual: ${window.location.href}`);
    console.log(`📍 [useFormMarketingScripts] Hostname: ${window.location.hostname}`);

    const loadFormConfig = async () => {
      try {
        console.log(`📋 [useFormMarketingScripts] Carregando configuração para: ${formId}`);
        
        const { data: settings, error } = await supabase
          .from('marketing_settings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        console.log(`📊 [useFormMarketingScripts] Resposta do Supabase:`, { settings, error });

        if (error) {
          console.error('❌ [useFormMarketingScripts] Erro ao carregar configuração:', error);
          return;
        }

        if (settings && settings.form_tracking_config) {
          let trackingConfig;
          if (typeof settings.form_tracking_config === 'string') {
            trackingConfig = JSON.parse(settings.form_tracking_config);
          } else {
            trackingConfig = settings.form_tracking_config;
          }
          
          console.log(`🔍 [useFormMarketingScripts] TrackingConfig encontrado:`, trackingConfig);
          console.log(`📝 [useFormMarketingScripts] SystemForms disponíveis:`, trackingConfig.systemForms);
          console.log(`🎯 [useFormMarketingScripts] Procurando por formId: "${formId}"`);
          
          // Debug cada formulário disponível
          trackingConfig.systemForms?.forEach((form: any, index: number) => {
            console.log(`📋 [useFormMarketingScripts] Form ${index}:`, {
              formId: form.formId,
              enabled: form.enabled,
              matches: form.formId === formId,
              type: typeof form.formId,
              length: form.formId?.length
            });
          });
          
          const formConfig = trackingConfig.systemForms?.find(
            (form: any) => form.formId === formId && form.enabled === true
          );

          if (formConfig) {
            console.log(`✅ [useFormMarketingScripts] Configuração encontrada para ${formId}:`, formConfig);
            implementFormScripts(formConfig);
          } else {
            console.log(`ℹ️ [useFormMarketingScripts] Nenhuma configuração ativa para: ${formId}`);
            console.log(`🔍 [useFormMarketingScripts] Formulários disponíveis:`, trackingConfig.systemForms?.map((f: any) => ({ id: f.formId, enabled: f.enabled })));
            removeFormScripts(formId);
          }
        } else {
          // Se não há form_tracking_config, usar configuração básica do pixel
          const basicPixelConfig = {
            formId: formId,
            enabled: true,
            facebookPixel: {
              enabled: settings?.facebook_pixel_enabled || false,
              pixelId: settings?.facebook_pixel_id || '',
              eventType: 'CompleteRegistration'
            }
          };
          
          console.log(`🔧 [useFormMarketingScripts] Usando config básica:`, basicPixelConfig);
          
          if (basicPixelConfig.facebookPixel.enabled && basicPixelConfig.facebookPixel.pixelId) {
            console.log(`✅ [useFormMarketingScripts] Pixel básico habilitado para ${formId}`);
            implementFormScripts(basicPixelConfig);
          } else {
            console.log(`❌ [useFormMarketingScripts] Pixel básico não configurado para: ${formId}`);
            removeFormScripts(formId);
          }
        }
      } catch (error) {
        console.error('❌ [useFormMarketingScripts] Erro crítico:', error);
      }
    };

    // Garantir que o script seja executado após o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadFormConfig);
    } else {
      loadFormConfig();
    }

    return () => {
      removeFormScripts(formId);
      document.removeEventListener('DOMContentLoaded', loadFormConfig);
    };
  }, [formId]);

  const implementFormScripts = (formConfig: any) => {
    console.log(`🚀 [implementFormScripts] Implementando scripts para ${formConfig.formId}:`, formConfig);
    console.log(`🌐 [implementFormScripts] Ambiente: ${window.location.hostname}`);

    // Remover scripts antigos específicos deste formulário
    removeFormScripts(formConfig.formId);

    // Facebook Pixel - APENAS se estiver habilitado
    if (formConfig.facebookPixel?.enabled === true && formConfig.facebookPixel?.pixelId) {
      console.log(`✅ [implementFormScripts] Facebook Pixel HABILITADO para ${formConfig.formId}`);
      implementFormFacebookPixel(formConfig);
    } else {
      console.log(`❌ [implementFormScripts] Facebook Pixel DESABILITADO para ${formConfig.formId}`);
      console.log(`🔍 [implementFormScripts] Debug pixel:`, { 
        enabled: formConfig.facebookPixel?.enabled, 
        pixelId: formConfig.facebookPixel?.pixelId 
      });
    }
  };

  const removeFormScripts = (formId: string) => {
    // Remover scripts do DOM
    const existingScripts = document.querySelectorAll(`[data-form-marketing="${formId}"]`);
    existingScripts.forEach(script => script.remove());

    // Remover listeners registrados para este formulário
    const handlersMap = (window as any).__formMarketingHandlers || {};
    const handlers = handlersMap[formId];
    if (handlers?.fb) document.removeEventListener('formSubmitSuccess', handlers.fb);
    delete handlersMap[formId];
    (window as any).__formMarketingHandlers = handlersMap;
  };

  const implementFormFacebookPixel = (formConfig: any) => {
    const { formId, facebookPixel } = formConfig;
    
    console.log(`🎯 [implementFormFacebookPixel] Iniciando para ${formId}:`, facebookPixel);
    console.log(`🌐 [implementFormFacebookPixel] URL: ${window.location.href}`);
    
    // Validar se o pixelId é válido (apenas números)
    const pixelId = facebookPixel.pixelId?.replace(/[^0-9]/g, '');
    if (!pixelId || pixelId.length < 10) {
      console.warn(`⚠️ [implementFormFacebookPixel] Pixel ID inválido para ${formId}:`, facebookPixel.pixelId);
      return;
    }
    
    console.log(`📘 [implementFormFacebookPixel] Pixel ID válido para ${formId}:`, pixelId);

    // Verificar se fbq já existe globalmente, senão criar
    if (!(window as any).fbq) {
      console.log(`📱 [implementFormFacebookPixel] Criando script base fbq para ${formId}`);
      // Criar o script base do Facebook Pixel
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
      `;
      document.head.appendChild(fbPixelScript);
      console.log(`📘 [implementFormFacebookPixel] Script base criado para ${formId}`);
    } else {
      console.log(`📘 [implementFormFacebookPixel] fbq já existe globalmente para ${formId}`);
    }

    // Verificar se este pixel específico já foi inicializado
    const pixelKey = `fbq_pixel_${pixelId}`;
    if (!(window as any)[pixelKey]) {
      // Aguardar fbq estar disponível e inicializar o pixel
      const initPixel = () => {
        console.log(`🔄 [implementFormFacebookPixel] Tentando inicializar pixel ${pixelId} para ${formId}`);
        console.log(`🔍 [implementFormFacebookPixel] fbq disponível:`, !!(window as any).fbq);
        
        if ((window as any).fbq) {
          console.log(`✅ [implementFormFacebookPixel] fbq encontrado, inicializando pixel ${pixelId}`);
          (window as any).fbq('init', pixelId);
          (window as any).fbq('set', 'autoConfig', 'false', pixelId);
          (window as any)[pixelKey] = true;
          console.log(`📘 [implementFormFacebookPixel] Meta Pixel ${pixelId} inicializado para ${formId} (autoConfig desativado)`);
          
          // Enviar PageView automaticamente
          try { 
            (window as any).fbq('track','PageView'); 
            console.log(`👀 [implementFormFacebookPixel] PageView enviado para Pixel ${pixelId} (init)`); 
          } catch(e) {
            console.error('❌ [implementFormFacebookPixel] Erro ao enviar PageView:', e);
          }
        } else {
          console.log(`⏳ [implementFormFacebookPixel] fbq ainda não disponível, aguardando...`);
          setTimeout(initPixel, 100);
        }
      };
      initPixel();
    } else {
      console.log(`📘 [implementFormFacebookPixel] Meta Pixel ${pixelId} já inicializado para ${formId}`);
      try { 
        (window as any).fbq && (window as any).fbq('track','PageView'); 
        console.log(`👀 [implementFormFacebookPixel] PageView enviado para Pixel ${pixelId} (reuse)`); 
      } catch(e) {
        console.error('❌ [implementFormFacebookPixel] Erro ao enviar PageView (reuse):', e);
      }
    }

    // Adicionar listener específico para submissão bem-sucedida
    const handleFormSuccess = (event: CustomEvent) => {
      if (event.detail?.formId === formId) {
        console.log(`✅ Formulário ${formId} enviado com SUCESSO - rastreando com Facebook Pixel`);
        
        if ((window as any).fbq) {
          const eventType = facebookPixel.eventType || 'CompleteRegistration';
          
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

    // Registrar listener gerenciado
    const handlersMap = (window as any).__formMarketingHandlers || {};
    if (handlersMap[formId]?.fb) {
      document.removeEventListener('formSubmitSuccess', handlersMap[formId].fb);
    }
    document.addEventListener('formSubmitSuccess', handleFormSuccess as EventListener);
    handlersMap[formId] = { ...(handlersMap[formId] || {}), fb: handleFormSuccess as EventListener };
    (window as any).__formMarketingHandlers = handlersMap;
  };
};