import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

/**
 * useStepFormMarketingScripts
 *
 * Carrega e implementa os scripts de marketing para um StepForm específico.
 * Responsabilidades:
 *  1. Injetar custom_head_html e custom_body_html no DOM (GTM snippet, etc.)
 *  2. Registrar listeners para o evento stepFormSubmitSuccess e disparar:
 *     - Facebook Pixel fbq('track', ...)
 *     - Google Tag Manager dataLayer.push(...)
 *     - Google Analytics gtag('event', ...)
 *     - Google Ads conversion direta gtag('event', 'conversion', { send_to: ... })
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
      // Este é o mecanismo principal para carregar o snippet do GTM por formulário.
      // O campo existe no banco mas nunca era injetado — esse era o bug principal.
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
      const gtmCfg = config.google_tag_manager || {};
      if (gtmCfg.enabled === true && (gtmCfg.event_name || '').trim()) {
        implementGoogleTagManager((gtmCfg.event_name || '').trim());
      }

      // ─── 5. Google Analytics — gtag('event', ...) ─────────────────────────
      const gaCfg = config.google_analytics || {};
      if (gaCfg.enabled === true && (gaCfg.event_name || '').trim()) {
        implementGoogleAnalytics((gaCfg.event_name || '').trim());
      }

      // ─── 6. Google Ads — conversão direta (bypass GTM) ────────────────────
      // Dispara gtag('event', 'conversion', { send_to: 'AW-xxx/label' }) direto
      // no momento do submit, sem depender do GTM capturar o dataLayer.
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
   * Executa scripts inline corretamente (innerHTML não executa scripts).
   */
  const injectCustomHtml = (html: string, target: 'head' | 'body', slug: string) => {
    const attr = `data-stepform-custom-${target}`;
    // Evitar injeção duplicada
    if (document.querySelector(`[${attr}="${slug}"]`)) return;

    const container = document.createElement('div');
    container.setAttribute(attr, slug);
    container.style.display = 'none';

    // Para executar scripts inline, precisamos recriar os elementos <script>
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
        script.async = (node as HTMLScriptElement).async;
        script.text = (node as HTMLScriptElement).text;
        // Copiar atributos
        Array.from((node as Element).attributes).forEach(attr => {
          if (attr.name !== 'src' && attr.name !== 'type' && attr.name !== 'async') {
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

  const dedup = (key: string, ttlMs = 3000): boolean => {
    const sentMap = (window as any).__stepFormEventSent || {};
    if (sentMap[formSlug]?.[key]) return true; // já enviado
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
      }, 500);
    };

    const existing = (window as any)[`stepFormPixelHandler_${formSlug}`];
    if (existing) window.removeEventListener('stepFormSubmitSuccess', existing);
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormPixelHandler_${formSlug}`] = handleSuccess;
  };

  const implementGoogleTagManager = (eventName: string) => {
    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug !== formSlug) return;
      if (dedup('gtm')) return;

      setTimeout(() => {
        const userData = event.detail?.userData || {};
        const formData = event.detail?.formData || {};
        const answers = event.detail?.answers || {};

        const email = userData.email || formData.email || answers.email ||
          userData.Email || formData.Email || answers.Email || '';
        const nome = userData.nome || formData.nome || answers.nome ||
          userData.name || formData.name || answers.name ||
          userData.Nome || formData.Nome || answers.Nome || '';
        const telefone = userData.telefone || formData.telefone || answers.telefone ||
          userData.phone || formData.phone || answers.phone ||
          userData.Telefone || formData.Telefone || answers.Telefone || '';

        const eventData = {
          event: eventName,
          page_location: window.location.href,
          page_path: window.location.pathname,
          page_title: document.title,
          session_id: event.detail?.sessionId || sessionStorage.getItem('sessionId') || '',
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          customer_email: email,
          customer_phone: telefone,
          customer_full_name: nome,
          form_slug: formSlug,
          form_name: event.detail?.formName || `StepForm ${formSlug}`,
          form_id: formSlug,
          domain: window.location.hostname,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
          utm_term: new URLSearchParams(window.location.search).get('utm_term') || undefined,
          utm_content: new URLSearchParams(window.location.search).get('utm_content') || undefined,
        };

        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(eventData);
        logger.log(`[${formSlug}] GTM dataLayer.push: ${eventName}`);
      }, 500);
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
   * Dispara gtag('event', 'conversion') diretamente para o Google Ads,
   * sem passar pelo GTM. É o método mais confiável pois não depende de
   * nenhuma tag configurada no GTM.
   */
  const implementGoogleAdsConversion = (conversionId: string, conversionLabel: string) => {
    const sendTo = `${conversionId}/${conversionLabel}`;

    const handleSuccess = (event: CustomEvent) => {
      if (event.detail?.formSlug !== formSlug) return;
      if (dedup('gads')) return;

      // Aguarda 800ms para garantir que o gtag.js já carregou
      setTimeout(() => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            send_to: sendTo,
            value: 1.0,
            currency: 'BRL',
          });
          logger.log(`[${formSlug}] Google Ads conversion disparada: ${sendTo}`);
        } else {
          // gtag não carregou ainda — tenta injetar o script e disparar
          logger.warn(`[${formSlug}] gtag não disponível para conversão direta. Tentando carregar...`);
          const gtagScript = document.createElement('script');
          gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${conversionId}`;
          gtagScript.async = true;
          gtagScript.onload = () => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).gtag = function () {
              (window as any).dataLayer.push(arguments);
            };
            (window as any).gtag('js', new Date());
            (window as any).gtag('config', conversionId);
            (window as any).gtag('event', 'conversion', {
              send_to: sendTo,
              value: 1.0,
              currency: 'BRL',
            });
            logger.log(`[${formSlug}] Google Ads conversion disparada (após carregar gtag): ${sendTo}`);
          };
          document.head.appendChild(gtagScript);
        }
      }, 800);
    };

    const existing = (window as any)[`stepFormGAdsHandler_${formSlug}`];
    if (existing) window.removeEventListener('stepFormSubmitSuccess', existing);
    window.addEventListener('stepFormSubmitSuccess', handleSuccess as EventListener);
    (window as any)[`stepFormGAdsHandler_${formSlug}`] = handleSuccess;
  };

  const removeStepFormScripts = (slug: string) => {
    // Remover elementos injetados no DOM
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

    // Remover event listeners
    const handlers = ['Pixel', 'GTM', 'GA', 'GAds'];
    handlers.forEach(name => {
      const key = `stepForm${name}Handler_${slug}`;
      const handler = (window as any)[key];
      if (handler) {
        window.removeEventListener('stepFormSubmitSuccess', handler);
        delete (window as any)[key];
      }
    });
  };
};
