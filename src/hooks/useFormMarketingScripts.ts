import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useFormMarketingScripts = (formId: string) => {
  useEffect(() => {
    if (!formId) return;

    const loadFormConfig = async () => {
      try {
        console.log(`📋 Carregando configuração de marketing para formulário: ${formId}`);
        
        // Buscar configuração na tabela marketing_settings
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

        console.log(`📊 Marketing settings encontrado:`, settings);

        // Buscar pixel ID padrão da configuração
        const pixelId = settings?.facebook_pixel_id;
        const pixelEnabled = settings?.facebook_pixel_enabled;
        
        if (pixelEnabled && pixelId) {
          const formConfig = {
            formId: formId,
            enabled: true,
            facebookPixel: {
              enabled: true,
              pixelId: pixelId,
              eventType: 'CompleteRegistration' // Evento padrão para formulários do site
            }
          };
          
          console.log(`✅ Implementando pixel para formulário ${formId} com ID: ${pixelId}`);
          implementFormScripts(formConfig);
        } else {
          console.log(`ℹ️ Pixel não configurado ou desabilitado para formulário: ${formId}`);
          removeFormScripts(formId);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar configuração do formulário:', error);
      }
    };

    loadFormConfig();

    return () => {
      removeFormScripts(formId);
    };
  }, [formId]);

  const implementFormScripts = (formConfig: any) => {
    console.log(`🚀 Implementando scripts para formulário ${formConfig.formId}:`, formConfig);

    // Remover scripts antigos específicos deste formulário
    removeFormScripts(formConfig.formId);

    // Facebook Pixel - seguindo exatamente o modelo do StepForm
    if (formConfig.facebookPixel?.enabled === true && formConfig.facebookPixel?.pixelId) {
      console.log(`✅ Facebook Pixel HABILITADO para formulário ${formConfig.formId}`);
      implementFormFacebookPixel(formConfig);
    } else {
      console.log(`❌ Facebook Pixel DESABILITADO para formulário ${formConfig.formId}`);
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
      // Criar o script base do Facebook Pixel seguindo exatamente o modelo do StepForm
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

      // Marcar este pixel como inicializado
      (window as any)[pixelKey] = true;
      try { (window as any).fbq && (window as any).fbq('track','PageView'); console.log(`👀 PageView enviado para Pixel ${pixelId} (init)`); } catch(e) {}
    } else {
      console.log(`📘 Meta Pixel ${pixelId} já estava inicializado para formulário ${formId}`);
      try { (window as any).fbq && (window as any).fbq('track','PageView'); console.log(`👀 PageView enviado para Pixel ${pixelId} (reuse)`); } catch(e) {}
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
            content_name: 'Form Submission',
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