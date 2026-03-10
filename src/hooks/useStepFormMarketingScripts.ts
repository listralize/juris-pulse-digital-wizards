import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

/**
 * useStepFormMarketingScripts
 *
 * Carrega e implementa os scripts de marketing para um StepForm específico.
 *
 * Responsabilidades:
 *  1. Injetar custom_head_html no <head> — principal mecanismo para carregar
 *     o snippet do GTM configurado por formulário (era o bug: campo existia
 *     no banco mas nunca era injetado no DOM)
 *  2. Injetar custom_body_html no <body> (noscript do GTM, etc.)
 *  3. Registrar listeners para 'stepFormSubmitSuccess' e disparar:
 *     - Facebook Pixel: fbq('track', eventName)
 *     - Google Tag Manager: dataLayer.push({ event: eventName, ...userData })
 *       → inclui transaction_id e gclid para Enhanced Conversions
 *     - Google Analytics: gtag('event', eventName)
 *     - Google Ads Direto: gtag('event', 'conversion', { send_to, transaction_id })
 *
 * ESTRATÉGIA DE ENHANCED CONVERSIONS:
 *  O GTM recebe o event_name configurado (ex: 'submit') + transaction_id + gclid.
 *  O Google Ads usa o transaction_id para deduplicar conversões online/offline.
 *  O gclid é salvo no Supabase para upload de conversões offline qualificadas.
 */
export const useStepFormMarketingScripts = (formSlug: string) => {
  useEffect(() => {
    if (!formSlug) return;

    logger.log(`[${formSlug}] Inicializando scripts de marketing para StepForm`);
    loadAndImplementScripts();

    return () => {
      logger.log(`[${formSlug}] Limpando scripts do StepForm`);
      removeStepFormScripts(formSlug);
    };
  }, [formSlug]);

  const loadAndImplementScripts = async () => {
    try {
      const { data: stepForm, error } = await supabase
        .from('step_forms')
        .select('tracking_config, name, id, slug')
        .eq('slug', formSlug)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error(`[${formSlug}] Erro ao buscar StepForm:`, error);
        return;
      }

      if (!stepForm?.tracking_config) {
        logger.log(`[${formSlug}] Sem configuração de tracking`);
        return;
      }

      const config = stepForm.tracking_config as any;
      logger.log(`[${formSlug}] Configuração de tracking carregada:`, config);

      // ─── 1. Injetar custom_head_html no <head> ─────────────────────────────
      // BUG CORRIGIDO: o campo existia no banco mas nunca era injetado no DOM.
      // Coloque o snippet completo do GTM neste campo no StepFormBuilder.
      if (config.custom_head_html) {
        injectCustomHtml(config.custom_head_html, 'head', formSlug);
      }

      // ─── 2. Injetar custom_body_html no <body> ─────────────────────────────
      if (config.custom_body_html) {
        injectCustomHtml(config.custom_body_html, 'body', formSlug);
      }

      // ─── 3. Facebook Pixel ─────────────────────────────────────────────────
      const pixelCfg = config.facebook_pixel || {};
      if (pixelCfg.enabled === true) {
        let eventName: string | null = null;
        if (pixelCfg.event_type === 'Custom') {
          eventName = (pixelCfg.custom_event_name || '').trim().replace(/\s+/g, '') || null;
        } else {
          eventName = normalizeEventName(pixelCfg.event_type);
        }
        if (eventName) implementFacebookPixel(eventName);
      }

      // ─── 4. Google Tag Manager — dataLayer.push ────────────────────────────
      // Usa o event_name configurado no StepFormBuilder (ex: 'submit', 'lead', etc.)
      // O GTM captura esse evento e dispara as tags configuradas (Google Ads, etc.)
      // Enhanced Conversions: transaction_id e gclid são incluídos no dataLayer.
      const gtmCfg = config.google_tag_manager || {};
      const gtmEventName = gtmCfg.enabled === true ? (gtmCfg.event_name || '').trim() : '';
      if (gtmEventName) {
        implementGoogleTagManager(gtmEventName);
      }

      // ─── 5. Google Analytics — gtag('event', ...) ─────────────────────────
      const gaCfg = config.google_analytics || {};
      const gaEventName = gaCfg.enabled === true ? (gaCfg.event_name || '').trim() : '';
      if (gaEventName) {
        implementGoogleAnalytics(gaEventName);
      }

      // ─── 6. Google Ads — conversão direta com transaction_id ──────────────
      // Dispara gtag('event', 'conversion', { send_to, transaction_id }) no submit.
      // É o método mais confiável: não depende do GTM e inclui o transaction_id
      // para deduplicação de conversões online/offline (Enhanced Conversions).
      // Configurado no StepFormBuilder → aba Tracking → Google Ads — Conversão Direta.
      const gadsId = (config.google_ads_conversion_id || '').trim();
      const gadsLabel = (config.google_ads_conversion_label || '').trim();
      if (gadsId && gadsLabel) {
        implementGoogleAdsConversion(gadsId, gadsLabel);
      }

    } catch (error) {
      console.error(`[${formSlug}] Erro ao carregar configuração de tracking:`, error);
    }
  };

  /**
   * Injeta HTML arbitrário no <head> ou <body>.
   * Recria elementos <script> para que sejam executados (innerHTML não executa scripts).
   */
  const injectCustomHtml = (html: string, target: 'head' | 'body', slug: string) => {
    const attrName = `data-stepform-custom-${target}`;
    // Evitar injeção duplicada
    if (document.querySelector(`[${attrName}="${slug}"]`)) return;

    const container = document.createElement('div');
    container.setAttribute(attrName, slug);
    container.style.display = 'none';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const fragment = document.createDocumentFragment();

    Array.from(tempDiv.childNodes).forEach(node => {
      if ((node as Element).tagName === 'SCRIPT') {
        const script = document.createElement('script');
        const src = (node as HTMLScriptElement).src;
        const type = (node as HTMLScriptElement).type;
        if (src) script.src = src;
        if (type) script.type = type;
        script.async = (node as HTMLScriptElement).async !== false;
        script.text = (node as HTMLScriptElement).text;
        Array.from((node as Element).attributes).forEach(attr => {
          if (!['src', 'type', 'async'].includes(attr.name)) {
            script.setAttribute(attr.name, attr.value);
          }
        });
        fragment.appendChild(script);
      } else {
        fragment.appendChild(node.cloneNode(true));
      }
    });

    container.appendChild(fragment);
    (target === 'head' ? document.head : document.body).appendChild(container);
    logger.log(`[${slug}] custom_${target}_html injetado no DOM`);
  };

  const normalizeEventName = (eventType?: string): string | null => {
    if (!eventType) return null;
    const map: Record<string, string> = {
      CompleteRegistration: 'CompleteRegistration',
      'Complete Registration': 'CompleteRegistration',
      SubmitApplication: 'SubmitApplication',
      'Submit Application': 'SubmitApplication',
      Lead: 'Lead',
      Purchase: 'Purchase',
      Contact: 'Contact',
      ViewContent: 'ViewContent',
      'View Content': 'ViewContent',
      AddToCart: 'AddToCart',
      'Add To Cart': 'AddToCart',
      InitiateCheckout: 'InitiateCheckout',
      'Initiate Checkout': 'InitiateCheckout',
    };
    return map[eventType] || eventType.replace(/\s+/g, '');
  };

  /** Deduplicação de eventos: retorna true se já foi enviado recentemente */
  const dedup = (key: string, ttlMs = 3000): boolean => {
    const sentMap = (window as any).__stepFormEventSent || {};
    if (sentMap[formSlug]?.[key]) return true;
    sentMap[formSlug] = { ...(sentMap[formSlug] || {}), [key]: true };
    (window as any).__stepFormEventSent = sentMap;
    setTimeout(() => {
      const m = (window as any).__stepFormEventSent || {};
      if (m[formSlug]) m[formSlug][key] = false;
      (window as any).__stepFormEventSent = m;
    }, ttlMs);
    return false;
  };

  const implementFacebookPixel = (eventName: string) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug !== formSlug) return;
      if (dedup('fb')) return;
      setTimeout(() => {
        if ((window as any).fbq) {
          (window as any).fbq('track', eventName, {
            content_name: `StepForm ${formSlug}`,
            form_slug: formSlug,
            page_url: window.location.href,
          });
          logger.log(`[${formSlug}] FB Pixel: ${eventName}`);
        } else {
          logger.warn(`[${formSlug}] fbq não disponível`);
        }
      }, 1000);
    };
    const existing = (window as any)[`stepFormPixelHandler_${formSlug}`];
    if (existing) window.removeEventListener('stepFormSubmitSuccess', existing);
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormPixelHandler_${formSlug}`] = handleSuccess;
  };

  /**
   * Google Tag Manager — dataLayer.push com Enhanced Conversions
   *
   * Inclui transaction_id e gclid no dataLayer para que o GTM possa:
   *  - Usar o transaction_id como "ID de transação" na tag de conversão do Google Ads
   *  - Usar o gclid para Enhanced Conversions for Leads (upload offline)
   */
  const implementGoogleTagManager = (eventName: string) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug !== formSlug) return;
      if (dedup('gtm')) return;
      setTimeout(() => {
        const userData = event.detail?.userData || {};
        const formData = event.detail?.formData || {};
        const answers = event.detail?.answers || {};
        // extractedData já tem email/nome/telefone processados corretamente pelo useStepForm
        const extracted = event.detail?.extractedData || {};

        const email = extracted.email ||
          userData.email || formData.email || answers.email ||
          userData.Email || formData.Email || answers.Email || '';
        const nome = extracted.name ||
          userData.nome || formData.nome || answers.nome ||
          userData.name || formData.name || answers.name ||
          userData.Nome || formData.Nome || answers.Nome || '';
        const telefone = extracted.phone ||
          userData.telefone || formData.telefone || answers.telefone ||
          userData.phone || formData.phone || answers.phone ||
          userData.Telefone || formData.Telefone || answers.Telefone || '';

        // Enhanced Conversions: transaction_id e gclid do evento
        const transactionId = event.detail?.transactionId || '';
        const gclid = event.detail?.gclid || sessionStorage.getItem('_gclid') || '';

        const eventData = {
          event: eventName,
          // Enhanced Conversions — campos críticos para deduplicação
          transaction_id: transactionId,
          gclid: gclid,
          // GTM Data Layer Variables (conforme configurado no GTM: DL - user_name, etc.)
          user_name: nome,
          user_email: email,
          user_phone: telefone,
          // Aliases para compatibilidade com configurações anteriores
          customer_email: email,
          customer_phone: telefone,
          customer_full_name: nome,
          // Metadados do formulário
          form_slug: formSlug,
          form_name: event.detail?.formName || `StepForm ${formSlug}`,
          form_id: formSlug,
          lead_id: event.detail?.leadId || '',
          // Contexto da página
          page_location: window.location.href,
          page_path: window.location.pathname,
          page_title: document.title,
          session_id: event.detail?.sessionId || '',
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          domain: window.location.hostname,
          // UTMs
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
          utm_term: new URLSearchParams(window.location.search).get('utm_term') || undefined,
          utm_content: new URLSearchParams(window.location.search).get('utm_content') || undefined,
        };

        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(eventData);
        logger.log(`[${formSlug}] GTM dataLayer.push: "${eventName}" | transaction_id: ${transactionId} | gclid: ${gclid || '(sem gclid)'}`, eventData);
      }, 1000);
    };
    const existing = (window as any)[`stepFormGTMHandler_${formSlug}`];
    if (existing) window.removeEventListener('stepFormSubmitSuccess', existing);
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormGTMHandler_${formSlug}`] = handleSuccess;
  };

  const implementGoogleAnalytics = (eventName: string) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug !== formSlug) return;
      if (dedup('ga')) return;
      setTimeout(() => {
        if ((window as any).gtag) {
          (window as any).gtag('event', eventName, {
            event_category: 'engagement',
            event_label: event.detail?.formName || `StepForm ${formSlug}`,
            form_slug: formSlug,
            page_url: window.location.href,
          });
          logger.log(`[${formSlug}] GA: ${eventName}`);
        } else {
          logger.warn(`[${formSlug}] gtag não disponível`);
        }
      }, 250);
    };
    const existing = (window as any)[`stepFormGAHandler_${formSlug}`];
    if (existing) window.removeEventListener('stepFormSubmitSuccess', existing);
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormGAHandler_${formSlug}`] = handleSuccess;
  };

  /**
   * Google Ads — conversão direta com transaction_id (Enhanced Conversions)
   *
   * Dispara gtag('event', 'conversion') diretamente para o Google Ads,
   * sem passar pelo GTM. Inclui:
   *  - transaction_id: para deduplicação de conversões online/offline
   *  - gclid: para Enhanced Conversions for Leads
   *
   * É o método mais confiável pois não depende de nenhuma tag no GTM.
   * Configurado no StepFormBuilder → aba Tracking → Google Ads — Conversão Direta.
   */
  const implementGoogleAdsConversion = (conversionId: string, conversionLabel: string) => {
    const sendTo = `${conversionId}/${conversionLabel}`;
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug !== formSlug) return;
      if (dedup('gads')) return;

      const transactionId = event.detail?.transactionId || '';
      const gclid = event.detail?.gclid || sessionStorage.getItem('_gclid') || '';

      // Aguarda 1s para garantir que o gtag.js já carregou (via custom_head_html)
      setTimeout(() => {
        const fireConversion = (gtagFn: Function) => {
          const conversionData: Record<string, any> = {
            send_to: sendTo,
            value: 1.0,
            currency: 'BRL',
          };
          // transaction_id é crítico para deduplicação no Google Ads
          if (transactionId) conversionData.transaction_id = transactionId;
          gtagFn('event', 'conversion', conversionData);
          logger.log(
            `[${formSlug}] Google Ads conversion disparada: ${sendTo}`,
            `| transaction_id: ${transactionId || '(sem id)'}`,
            `| gclid: ${gclid || '(sem gclid)'}`
          );
        };

        if ((window as any).gtag) {
          fireConversion((window as any).gtag);
        } else {
          // gtag não carregou ainda — carrega o script e dispara
          logger.warn(`[${formSlug}] gtag não disponível. Carregando script...`);
          const gtagScript = document.createElement('script');
          gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${conversionId}`;
          gtagScript.async = true;
          gtagScript.onload = () => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
            (window as any).gtag = gtag;
            gtag('js', new Date());
            gtag('config', conversionId);
            fireConversion(gtag);
          };
          document.head.appendChild(gtagScript);
        }
      }, 1000);
    };
    const existing = (window as any)[`stepFormGAdsHandler_${formSlug}`];
    if (existing) window.removeEventListener('stepFormSubmitSuccess', existing);
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormGAdsHandler_${formSlug}`] = handleSuccess;
  };

  const removeStepFormScripts = (slug: string) => {
    [
      `[data-stepform-custom-head="${slug}"]`,
      `[data-stepform-custom-body="${slug}"]`,
      `[data-stepform-fb="${slug}"]`,
      `[data-stepform-gtm="${slug}"]`,
      `[data-stepform-ga="${slug}"]`,
      `[data-stepform-gtm-noscript="${slug}"]`,
    ].forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    ['Pixel', 'GTM', 'GA', 'GAds'].forEach(name => {
      const key = `stepForm${name}Handler_${slug}`;
      const handler = (window as any)[key];
      if (handler) {
        window.removeEventListener('stepFormSubmitSuccess', handler);
        delete (window as any)[key];
      }
    });
  };
};
