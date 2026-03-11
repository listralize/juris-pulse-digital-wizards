import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import type { StepFormData, LandingSection } from '@/types/stepFormTypes';
import { renderLandingSection } from './renderLandingSection';
import { StepFormFooter } from '@/components/stepform/StepFormFooter';

interface LandingPageRendererProps {
  form: StepFormData;
}

export const LandingPageRenderer: React.FC<LandingPageRendererProps> = ({ form }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const primaryColor = form.styles.primary_color || '#4CAF50';

  // Persistir gclid no sessionStorage na primeira visita
  useEffect(() => {
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) sessionStorage.setItem('_gclid', gclid);
  }, []);

  // SEO meta injection
  useEffect(() => {
    const seo: any = form.seo_config || form.seo;
    if (seo?.meta_title) document.title = seo.meta_title;

    const setMeta = (name: string, content: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (seo?.meta_description) {
      setMeta('description', seo.meta_description);
      setMeta('og:description', seo.meta_description);
    }
    if (seo?.meta_title) {
      setMeta('og:title', seo.meta_title);
    }
    if (seo?.meta_keywords) setMeta('keywords', seo.meta_keywords);
    setMeta('og:type', 'website');
    setMeta('og:url', window.location.href);

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname);

    // JSON-LD
    const jsonLdId = 'landing-page-jsonld';
    let jsonLdEl = document.getElementById(jsonLdId);
    if (!jsonLdEl) {
      jsonLdEl = document.createElement('script');
      jsonLdEl.id = jsonLdId;
      jsonLdEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdEl);
    }
    jsonLdEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo?.meta_title || form.name,
      description: seo?.meta_description || '',
      url: window.location.href,
    });

    return () => {
      document.title = 'Carregando...';
      const el = document.getElementById(jsonLdId);
      if (el) el.remove();
    };
  }, [form.seo_config, form.seo, form.name]);

  const sections = ((form.sections || []) as LandingSection[])
    .filter(s => !s.hidden)
    .sort((a, b) => a.display_order - b.display_order);

  const handleFormSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true);
    try {
      const sessionId = `lp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const leadId = crypto.randomUUID();
      const urlParams = new URLSearchParams(window.location.search);
      const gclid = urlParams.get('gclid') || null;
      const transactionId = `${form.slug}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      const visitorId = localStorage.getItem('visitor_id') || `v_${Date.now()}`;
      const leadData = {
        ...data,
        form_name: form.name,
        form_slug: form.slug,
        page_type: 'landing_page',
      };

      await supabase.from('form_leads').insert({
        id: leadId,
        session_id: sessionId,
        lead_data: leadData,
        form_id: form.slug,
        form_name: form.name,
        source_page: window.location.href,
        referrer: document.referrer || null,
        gclid,
        transaction_id: transactionId,
        visitor_id: visitorId,
        user_agent: navigator.userAgent,
        utm_source: urlParams.get('utm_source') || null,
        utm_medium: urlParams.get('utm_medium') || null,
        utm_campaign: urlParams.get('utm_campaign') || null,
        utm_term: urlParams.get('utm_term') || null,
        utm_content: urlParams.get('utm_content') || null,
      });

      await supabase.from('conversion_events').insert({
        session_id: sessionId,
        event_type: 'form_submission',
        event_action: 'landing_page_submit',
        page_url: window.location.href,
        form_id: form.slug,
        form_name: form.name,
        lead_data: leadData,
        gclid,
        transaction_id: transactionId,
        visitor_id: visitorId,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });

      // GTM dataLayer push for conversion tracking
      const userName = data.nome || data.name || '';
      const userPhone = data.telefone || data.phone || '';
      const userEmail = data.email || '';
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'submit',
          transaction_id: transactionId,
          gclid: gclid || '',
          lead_id: leadId,
          form_name: form.name,
          form_slug: form.slug,
          user_name: userName,
          user_email: userEmail,
          user_phone: userPhone,
          customer_full_name: userName,
          customer_email: userEmail,
          customer_phone: userPhone,
          page_type: 'landing_page',
        });
        logger.info('dataLayer.push fired for landing page submit', { transactionId });
      } catch (dlErr) {
        logger.error('dataLayer.push error:', dlErr);
      }

      // ─── Google Ads — disparo direto como backup (não depende do GTM) ───
      try {
        const { data: stepFormRow } = await supabase
          .from('step_forms')
          .select('tracking_config')
          .eq('slug', form.slug)
          .single();

        const tc = stepFormRow?.tracking_config as any;
        const rawGadsId = (tc?.google_ads_conversion_id || '').trim();
        const gadsId = rawGadsId && !rawGadsId.startsWith('AW-') ? `AW-${rawGadsId}` : rawGadsId;
        const gadsLabel = (tc?.google_ads_conversion_label || '').trim();

        if (gadsId && gadsLabel) {
          const sendTo = `${gadsId}/${gadsLabel}`;
          const fireConversion = (gtagFn: Function) => {
            gtagFn('event', 'conversion', {
              send_to: sendTo,
              transaction_id: transactionId,
              value: 1.0,
              currency: 'BRL',
            });
            logger.info(`[LP] Google Ads conversion fired: ${sendTo} | txn: ${transactionId}`);
          };

          if ((window as any).gtag) {
            fireConversion((window as any).gtag);
          } else {
            const gtagScript = document.createElement('script');
            gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gadsId}`;
            gtagScript.async = true;
            gtagScript.onload = () => {
              (window as any).dataLayer = (window as any).dataLayer || [];
              function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
              (window as any).gtag = gtag;
              gtag('js', new Date());
              gtag('config', gadsId);
              fireConversion(gtag);
            };
            document.head.appendChild(gtagScript);
          }
        }
      } catch (gadsErr) {
        logger.error('[LP] Google Ads direct conversion error:', gadsErr);
      }

      // Disparar evento customizado para handlers de marketing (backup)
      try {
        const successEvent = new CustomEvent('stepFormSubmitSuccess', {
          detail: {
            formSlug: form.slug,
            formName: form.name,
            transactionId,
            gclid: gclid || '',
            leadId,
            sessionId,
            userData: { email: userEmail, nome: userName, telefone: userPhone },
            extractedData: { email: userEmail, name: userName, phone: userPhone },
          },
        });
        window.dispatchEvent(successEvent);
      } catch (evtErr) {
        logger.error('[LP] stepFormSubmitSuccess dispatch error:', evtErr);
      }

      if (form.webhook_url) {
        try {
          await fetch(form.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...leadData, timestamp: new Date().toISOString() }),
          });
        } catch (e) {
          logger.error('Webhook error:', e);
        }
      }

      toast({ title: 'Enviado com sucesso!', description: 'Entraremos em contato em breve.' });

      const redirectUrl = form.redirect_url || '/obrigado';
      if (redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl;
      } else {
        navigate(redirectUrl);
      }
    } catch (error) {
      logger.error('Landing page submit error:', error);
      toast({ title: 'Erro', description: 'Erro ao enviar. Tente novamente.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: form.styles.background_color || '#ffffff', color: form.styles.text_color || '#000000' }}
    >
      {sections.map(section =>
        renderLandingSection(section, {
          primaryColor,
          onFormSubmit: handleFormSubmit,
          isSubmitting,
          form,
        })
      )}
      <StepFormFooter footerConfig={form.footer_config} />
    </div>
  );
};
