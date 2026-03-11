import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { getOrCreateVisitorId } from '@/hooks/useAnalytics';
import { useStepFormTracking } from '@/hooks/useStepFormTracking';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StepFormFields } from '@/components/stepform/StepFormFields';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StepFormData, StepFormStep } from '@/types/stepFormTypes';

interface LandingEmbeddedStepFormProps {
  config: Record<string, any>;
  primaryColor: string;
  form: StepFormData;
}

export const LandingEmbeddedStepForm: React.FC<LandingEmbeddedStepFormProps> = ({
  config,
  primaryColor,
  form,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const steps = form.steps || [];
  const tracking = useStepFormTracking(form.slug || '');
  const persistentVisitorId = useRef<string>(getOrCreateVisitorId());

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const currentStep = steps[currentStepIndex];
  const progress = steps.length > 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0;
  const anchorId = config.anchor_id || 'formulario';

  const saveAnswer = (stepId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
    tracking.trackOptionClick(stepId, value);
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setHistory(prev => [...prev, currentStepIndex]);
      setCurrentStepIndex(currentStepIndex + 1);
      tracking.trackStepView(steps[currentStepIndex + 1]?.id);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setCurrentStepIndex(prev);
    }
  };

  const handleOptionSelect = (step: StepFormStep, optionValue: string) => {
    saveAnswer(step.id, optionValue);
    // Auto-advance after selecting
    setTimeout(() => goToNextStep(), 300);
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    tracking.trackFormSubmit(currentStep?.id || '');

    try {
      const serviceName = form.name || form.title || 'Consultoria Jurídica';

      // Map responses with step titles
      const mappedResponses: Record<string, any> = {};
      Object.entries(answers).forEach(([stepId, value]) => {
        const step = steps.find(s => s.id === stepId);
        mappedResponses[step?.title || stepId] = value;
      });
      Object.entries(formData).forEach(([fieldName, value]) => {
        mappedResponses[fieldName] = value;
      });

      const extractedData: Record<string, string> = {
        name: formData.name || formData.Nome || mappedResponses.Nome || mappedResponses.name || '',
        email: formData.email || formData.Email || mappedResponses.Email || mappedResponses.email || '',
        phone: formData.Telefone || formData.phone || formData.telefone || formData.whatsapp ||
          formData['Telefone/WhatsApp'] || mappedResponses.Telefone || mappedResponses.telefone ||
          mappedResponses.phone || mappedResponses.whatsapp || mappedResponses['Telefone/WhatsApp'] || '',
      };
      if (extractedData.phone && !(extractedData as any).whatsapp) {
        (extractedData as any).whatsapp = extractedData.phone;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const gclidFromUrl = urlParams.get('gclid');
      if (gclidFromUrl) sessionStorage.setItem('_gclid', gclidFromUrl);
      const gclid = gclidFromUrl || sessionStorage.getItem('_gclid') || null;
      const transactionId = `${form.slug || 'form'}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const sessionId = `lp_stepform_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const leadId = crypto.randomUUID();

      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content'),
      };

      const allData: Record<string, any> = {
        ...answers, ...formData, ...extractedData,
        respostas_mapeadas: mappedResponses,
        service: serviceName,
        form_name: form.name,
        form_id: form.slug,
        page_type: 'landing_page',
        timestamp: new Date().toISOString(),
      };

      // Dedup check
      const emailForDedup = extractedData.email?.toLowerCase().trim();
      if (emailForDedup) {
        const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
        const { data: deepCheck } = await supabase
          .from('form_leads')
          .select('id, lead_data')
          .eq('form_id', form.slug)
          .gte('created_at', twoMinAgo)
          .limit(20);
        const hasDuplicate = deepCheck?.some(evt => {
          const ld = evt.lead_data as any;
          return (ld?.email || ld?.Email || '').toLowerCase().trim() === emailForDedup;
        });
        if (hasDuplicate) {
          toast({ title: 'Já recebemos seus dados', description: 'Nossa equipe entrará em contato em breve.' });
          setIsSubmitting(false);
          return;
        }
      }

      // Insert lead
      await supabase.from('form_leads').insert([{
        id: leadId, session_id: sessionId, lead_data: allData,
        form_id: form.slug, form_name: form.name,
        source_page: window.location.href, referrer: document.referrer || null,
        gclid, transaction_id: transactionId, visitor_id: persistentVisitorId.current,
        user_agent: navigator.userAgent, status: 'new',
        ...utmData,
      }]);

      // Conversion event
      await supabase.from('conversion_events').insert([{
        session_id: sessionId, visitor_id: persistentVisitorId.current,
        event_type: 'form_submission', event_action: 'landing_stepform_submit',
        page_url: window.location.href, form_id: form.slug, form_name: form.name,
        lead_data: { ...extractedData, service: serviceName, respostas_mapeadas: mappedResponses },
        gclid, transaction_id: transactionId,
        referrer: document.referrer || null, user_agent: navigator.userAgent,
      }]);

      // dataLayer push
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'submit', transaction_id: transactionId, gclid: gclid || '',
          lead_id: leadId, form_name: form.name, form_slug: form.slug,
          user_name: extractedData.name, user_email: extractedData.email,
          user_phone: extractedData.phone, page_type: 'landing_page',
          customer_full_name: extractedData.name,
          customer_email: extractedData.email,
          customer_phone: extractedData.phone,
        });
      } catch (e) { logger.error('dataLayer error:', e); }

      // Google Ads direct
      try {
        const { data: stepFormRow } = await supabase
          .from('step_forms').select('tracking_config').eq('slug', form.slug).single();
        const tc = stepFormRow?.tracking_config as any;
        const rawGadsId = (tc?.google_ads_conversion_id || '').trim();
        const gadsId = rawGadsId && !rawGadsId.startsWith('AW-') ? `AW-${rawGadsId}` : rawGadsId;
        const gadsLabel = (tc?.google_ads_conversion_label || '').trim();
        if (gadsId && gadsLabel) {
          const sendTo = `${gadsId}/${gadsLabel}`;
          if ((window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
              send_to: sendTo, transaction_id: transactionId, value: 1.0, currency: 'BRL',
            });
          }
        }
      } catch (e) { logger.error('Google Ads error:', e); }

      // stepFormSubmitSuccess event for marketing handlers
      window.dispatchEvent(new CustomEvent('stepFormSubmitSuccess', {
        detail: {
          formSlug: form.slug, formName: form.name, transactionId,
          gclid: gclid || '', leadId, sessionId,
          userData: { ...answers, ...formData },
          extractedData,
        },
      }));

      // Reply Agent Sync
      const urgencyStep = steps.find(s =>
        s.id?.includes('urgency') || s.title?.toLowerCase().includes('urgência') || s.title?.toLowerCase().includes('urgencia')
      );
      const urgencyAnswer = urgencyStep ? answers[urgencyStep.id] : '';
      let urgencyValue = 'default';
      if (urgencyAnswer?.toLowerCase().includes('urgente')) urgencyValue = 'urgente';
      else if (urgencyAnswer?.toLowerCase().includes('semana')) urgencyValue = 'semanas';
      else if (urgencyAnswer?.toLowerCase().includes('pesquisando')) urgencyValue = 'pesquisando';

      supabase.functions.invoke('reply-agent-sync', {
        body: {
          name: extractedData.name, email: extractedData.email,
          phone: extractedData.phone, whatsapp: (extractedData as any).whatsapp || extractedData.phone,
          service: serviceName, urgency: urgencyValue,
          form_slug: form.slug, form_name: form.name,
          lead_id: leadId, gclid: gclid || '', transaction_id: transactionId,
          custom_fields: { ...utmData, pagina_origem: window.location.href },
        },
      }).catch(e => logger.warn('reply-agent-sync error:', e));

      // Email
      if (extractedData.email) {
        try {
          const { data: templates } = await supabase
            .from('email_templates').select('*').eq('is_active', true)
            .order('is_default', { ascending: false }).limit(1);
          const tpl = templates?.[0];
          await supabase.functions.invoke('send-smtp-email', {
            body: {
              to: extractedData.email,
              subject: tpl?.subject?.replace('{name}', extractedData.name || 'Cliente') || `Obrigado pelo contato!`,
              name: extractedData.name || 'Cliente', service: form.name,
              customTitle: tpl?.title, customContent: tpl?.content,
              logoUrl: tpl?.logo_url, backgroundColor: tpl?.background_color,
              textColor: tpl?.text_color, buttonColor: tpl?.button_color,
              customHtml: tpl?.custom_html, buttonText: tpl?.button_text,
              buttonUrl: tpl?.button_url, source: 'landing_stepform',
            },
          });
        } catch (e) { logger.error('Email error:', e); }
      }

      // Webhook queue
      if (form.webhook_url?.trim()) {
        try {
          let delaySeconds = 60;
          if (urgencyValue === 'urgente') delaySeconds = 30;
          else if (urgencyValue === 'semanas') delaySeconds = 180;
          else if (urgencyValue === 'pesquisando') delaySeconds = 480;

          await supabase.from('webhook_queue').insert([{
            lead_id: leadId, webhook_url: form.webhook_url,
            payload: {
              nome: extractedData.name, email: extractedData.email,
              telefone: extractedData.phone, urgencia: urgencyValue,
              formulario: form.name, data_envio: new Date().toISOString(),
              lead_id: leadId, form_slug: form.slug,
            },
            urgency: urgencyValue,
            send_at: new Date(Date.now() + delaySeconds * 1000).toISOString(),
            status: 'pending',
          }]);
          supabase.functions.invoke('process-webhook-queue', { body: {} }).catch(() => {});
        } catch (e) { logger.error('Webhook queue error:', e); }
      }

      toast({ title: 'Enviado com sucesso!', description: 'Entraremos em contato em breve.' });

      setTimeout(() => {
        const redirectUrl = form.redirect_url || '/obrigado';
        const params = new URLSearchParams();
        if (urgencyValue !== 'default') params.set('urgencia', urgencyValue);
        if (extractedData.name) params.set('nome', extractedData.name);
        if (form.slug) params.set('form', form.slug);
        const qs = params.toString();
        const finalUrl = qs ? `${redirectUrl}?${qs}` : redirectUrl;
        if (finalUrl.startsWith('http')) window.location.href = finalUrl;
        else navigate(finalUrl);
      }, 1500);
    } catch (error) {
      logger.error('Embedded stepform submit error:', error);
      toast({ title: 'Erro', description: 'Erro ao enviar. Tente novamente.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!steps.length) return null;

  return (
    <div id={anchorId} className="w-full max-w-lg mx-auto px-4">
      {/* Title */}
      {config.title && (
        <h2 className="text-2xl font-bold text-center mb-1" style={{ color: config.text_color || primaryColor }}>
          {config.title}
        </h2>
      )}
      {config.subtitle && (
        <p className="text-center text-sm opacity-70 mb-6">{config.subtitle}</p>
      )}

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs opacity-60 mb-1.5">
          <span>Etapa {currentStepIndex + 1} de {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep?.type === 'question' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-center mb-4">
                {currentStep.title}
              </h3>
              {currentStep.description && (
                <p className="text-sm text-center opacity-70 -mt-2 mb-4">{currentStep.description}</p>
              )}
              <div className="space-y-2.5">
                {currentStep.options?.map((option, i) => {
                  const isSelected = answers[currentStep.id] === option.text;
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(currentStep, option.text)}
                      className="w-full text-left px-5 py-3.5 rounded-lg border transition-all duration-200 text-sm font-medium"
                      style={{
                        borderColor: isSelected ? primaryColor : 'rgba(255,255,255,0.12)',
                        backgroundColor: isSelected ? `${primaryColor}18` : 'rgba(255,255,255,0.04)',
                        color: isSelected ? primaryColor : 'inherit',
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: isSelected ? primaryColor : 'rgba(255,255,255,0.25)' }}
                        >
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                          )}
                        </span>
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep?.type === 'form' && (
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">
                {currentStep.title}
              </h3>
              {currentStep.description && (
                <p className="text-sm text-center opacity-70 -mt-2 mb-4">{currentStep.description}</p>
              )}
              <StepFormFields
                step={currentStep}
                styles={form.styles}
                formData={formData}
                setFormData={setFormData}
                isSubmitting={isSubmitting}
                onSubmit={handleFormSubmit}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Back button */}
      {history.length > 0 && currentStep?.type !== 'form' && (
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs opacity-50 hover:opacity-80 transition-opacity mt-4 mx-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar
        </button>
      )}
    </div>
  );
};
