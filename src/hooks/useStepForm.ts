import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useStepFormMarketingScripts } from '@/hooks/useStepFormMarketingScripts';
import { getOrCreateVisitorId } from '@/hooks/useAnalytics';
import { useStepFormTracking } from '@/hooks/useStepFormTracking';
import { logger } from '@/utils/logger';
import type { StepFormData, StepFormStep } from '@/types/stepFormTypes';

// --- NLG helpers for webhook case summary ---

const CONTACT_KEYS = new Set([
  'nome', 'name', 'email', 'e-mail', 'telefone', 'phone', 'celular', 'whatsapp',
  'telefone/whatsapp', 'tel', 'fone',
]);

/** Remove interrogative prefixes and "?" to produce a compact label */
const compactLabel = (label: string): string => {
  let s = label.trim();
  s = s.replace(/\?$/g, '').trim();
  // Remove common PT-BR interrogative prefixes (case-insensitive)
  s = s.replace(/^(qual\s+[eé]\s+(o|a)\s+|qual\s+(o|a)\s+|selecione\s+|escolha\s+|informe\s+(o|a|seu|sua)?\s*|descreva\s+|digite\s+(o|a|seu|sua)?\s*)/i, '');
  s = s.trim();
  // Capitalize first letter
  if (s.length > 0) s = s.charAt(0).toUpperCase() + s.slice(1);
  return s;
};

/** Convert binary (Sim/Não) answers into natural-language phrases */
const transformBinaryAnswer = (question: string, answer: string): string => {
  let stem = question.trim().replace(/\?$/g, '').trim();
  // Remove leading verbs: "Há ", "Existe ", "Possui ", "Tem ", "Você tem ", "Deseja ", "Há algum(a) "
  stem = stem.replace(/^(h[aá]\s+|existe[m]?\s+|possui\s+|tem\s+|voc[eê]\s+tem\s+|deseja\s+|h[aá]\s+algum[a]?\s+)/i, '');
  stem = stem.trim();
  // lowercase first char for joining
  if (stem.length > 0) stem = stem.charAt(0).toLowerCase() + stem.slice(1);

  const isYes = /^sim/i.test(answer.trim());
  if (isYes) return `Possui ${stem}`;
  return `Sem ${stem}`;
};

/** Build a human-readable case summary from mapped responses */
const buildCaseSummary = (
  mappedResponses: Record<string, any>,
  steps: StepFormStep[],
  formName: string
): string => {
  const parts: string[] = [formName || 'Consulta Jurídica'];

  for (const [question, rawAnswer] of Object.entries(mappedResponses)) {
    // Skip contact fields
    if (CONTACT_KEYS.has(question.toLowerCase().trim())) continue;

    const answer = String(rawAnswer ?? '').trim();
    if (!answer) continue;

    // Find matching step for metadata
    const step = steps.find(s => s.title === question);

    // Case 1: Binary answer
    if (/^(sim|n[aã]o)$/i.test(answer)) {
      parts.push(transformBinaryAnswer(question, answer));
      continue;
    }

    // Case 2: Multiple-choice (step has options) or any other
    const label = compactLabel(question);
    // Truncate long free-text answers
    const truncated = answer.length > 80 ? answer.substring(0, 77) + '...' : answer;
    parts.push(`${label}: ${truncated}`);
  }

  return parts.join(' | ');
};

// Count reachable steps by traversing flow_config edges from the first step
const countReachableSteps = (steps: StepFormStep[], flowConfig?: StepFormData['flow_config']): number => {
  if (!flowConfig?.edges || flowConfig.edges.length === 0) return steps.length;

  const allTargets = flowConfig.edges.map(e => e.target);
  const firstStep = steps.find(s => !allTargets.includes(s.id));
  if (!firstStep) return steps.length;

  const visited = new Set<string>();
  const queue = [firstStep.id];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    const outEdges = flowConfig.edges.filter(e => e.source === current);
    for (const edge of outEdges) {
      if (!visited.has(edge.target) && steps.some(s => s.id === edge.target)) {
        queue.push(edge.target);
      }
    }
  }
  return visited.size;
};

export const useStepForm = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<StepFormData | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [visitedSteps, setVisitedSteps] = useState<string[]>([]);
  const persistentVisitorId = useRef<string>(getOrCreateVisitorId());

  const marketingSlug = useMemo(() => slug || '', [slug]);
  useStepFormMarketingScripts(marketingSlug);
  const tracking = useStepFormTracking(slug || '');

  const totalReachableSteps = useMemo(() => {
    if (!form) return 1;
    return countReachableSteps(form.steps, form.flow_config);
  }, [form]);

  useEffect(() => {
    if (slug) loadForm();
  }, [slug]);

  // Restore progress from localStorage
  useEffect(() => {
    if (form && form.steps.length > 0 && !currentStepId) {
      const storageKey = `stepform_progress_${slug}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.currentStepId && form.steps.find(s => s.id === parsed.currentStepId)) {
            setCurrentStepId(parsed.currentStepId);
            setAnswers(parsed.answers || {});
            setFormData(parsed.formData || {});
            setHistory(parsed.history || []);
            setVisitedSteps(parsed.visitedSteps || [parsed.currentStepId]);
            return;
          }
        } catch {}
      }
      const firstStepId = getFirstStepFromFlow() || form.steps[0].id;
      setCurrentStepId(firstStepId);
      setHistory([]);
      setVisitedSteps([firstStepId]);
      tracking.trackStepView(firstStepId);
    }
  }, [form, currentStepId]);

  // Track abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentStepId && !isSubmitting) {
        const partialData = { ...answers, ...formData };
        tracking.trackAbandonment(currentStepId, partialData);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentStepId, answers, formData, isSubmitting, tracking]);

  // Persist progress to localStorage
  useEffect(() => {
    if (slug && currentStepId) {
      const storageKey = `stepform_progress_${slug}`;
      localStorage.setItem(storageKey, JSON.stringify({
        currentStepId, answers, formData, history, visitedSteps
      }));
    }
  }, [currentStepId, answers, formData, history, visitedSteps, slug]);

  // Progress based on visited steps / reachable steps
  useEffect(() => {
    if (form && currentStepId) {
      setProgress((visitedSteps.length / totalReachableSteps) * 100);
    }
  }, [currentStepId, form, visitedSteps, totalReachableSteps]);

  const loadForm = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('step_forms')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        logger.warn('Formulário não encontrado para slug:', slug);
        toast({ title: 'Aviso', description: 'Formulário não encontrado', variant: 'destructive' });
        navigate('/');
        setLoading(false);
        return;
      }

      const formData: StepFormData = {
        ...data,
        page_type: (data.page_type as StepFormData['page_type']) || 'quiz',
        sections: (data.sections as unknown) as StepFormData['sections'],
        steps: (data.steps as unknown) as StepFormStep[],
        styles: (data.styles as unknown) as StepFormData['styles'],
        seo: (data.seo as unknown) as StepFormData['seo'],
        footer_config: (data.footer_config as unknown) as StepFormData['footer_config'],
        seo_config: (data.seo_config as unknown) as StepFormData['seo_config'],
        flow_config: (data.flow_config as unknown) as StepFormData['flow_config']
      };

      setForm(formData);
      setLoading(false);
    } catch (error) {
      logger.error('Erro ao carregar formulário:', error);
      toast({ title: 'Erro', description: 'Formulário não encontrado', variant: 'destructive' });
      navigate('/');
      setLoading(false);
    }
  };

  const saveAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    // Track option click
    tracking.trackOptionClick(key, value);
  };

  const getFirstStepFromFlow = () => {
    if (!form?.flow_config?.edges || form.flow_config.edges.length === 0) return null;
    const allTargets = form.flow_config.edges.map(edge => edge.target);
    const firstStep = form.steps.find(step => !allTargets.includes(step.id));
    logger.log('Primeiro step do flow:', firstStep?.id);
    return firstStep?.id || null;
  };

  const getNextStepFromFlow = (stepId: string, selectedOption?: string) => {
    if (!form?.flow_config?.edges) return null;

    const currentStep = form.steps.find(s => s.id === stepId);
    if (currentStep?.options && selectedOption) {
      const optIndex = currentStep.options.findIndex(o => o.text === selectedOption);
      if (optIndex >= 0) {
        const specific = form.flow_config.edges.find(e => e.source === stepId && e.sourceHandle === `option-${optIndex}`);
        if (specific) return specific.target;
      }
    }

    const edge = form.flow_config.edges.find(e => e.source === stepId);
    return edge ? edge.target : null;
  };

  const goToNextStep = (nextStepId?: string, actionType?: 'next_step' | 'external_url', selectedOption?: string) => {
    let targetStepId = nextStepId;
    if (!targetStepId) {
      targetStepId = getNextStepFromFlow(currentStepId, selectedOption);
    }

    if (targetStepId) {
      if (actionType === 'external_url' || targetStepId.startsWith('http')) {
        window.open(targetStepId, '_blank');
        return;
      }

      const targetStep = form?.steps.find(step => step.id === targetStepId);
      if (targetStep) {
        setHistory(prev => [...prev, currentStepId]);
        setVisitedSteps(prev => [...new Set([...prev, targetStepId!])]);
        setCurrentStepId(targetStepId);
        tracking.trackStepView(targetStepId);
      } else {
        toast({ title: 'Erro de navegação', description: `Etapa "${targetStepId}" não encontrada`, variant: 'destructive' });
        logger.error('Steps disponíveis:', form?.steps.map(s => s.id), 'Tentando ir para:', targetStepId);
      }
    } else {
      logger.warn('Nenhuma próxima etapa encontrada para:', currentStepId);
      toast({ title: 'Aviso', description: 'Nenhuma próxima etapa configurada. Verifique as conexões no editor visual.', variant: 'default' });
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevId = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentStepId(prevId);
    }
  };

  const handleFormSubmit = async (e?: any) => {
    e?.preventDefault?.();
    setIsSubmitting(true);
    tracking.trackFormSubmit(currentStepId);

    if (!form) {
      toast({ title: 'Erro', description: 'Formulário não carregado. Recarregue a página.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    // Validate visited questions
    const visitedQuestions = form.steps.filter(step => step.type === 'question' && visitedSteps.includes(step.id));
    const answeredQuestions = Object.keys(answers);

    if (visitedQuestions.length > 0) {
      const unanswered = visitedQuestions.filter(q => !answeredQuestions.includes(q.id));
      if (unanswered.length > 0) {
        toast({
          title: 'Perguntas obrigatórias',
          description: `Por favor, responda todas as perguntas visitadas antes de enviar. Perguntas não respondidas: ${unanswered.map(q => q.title).join(', ')}`,
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Validate email only if the form has an email field
    const currentStepForEmail = getCurrentStep();
    const hasEmailField = currentStepForEmail?.formFields?.some(
      f => f.type === 'email' || f.name.toLowerCase().includes('email')
    );
    if (hasEmailField) {
      const emailValue = formData.email || answers.email || formData.Email || answers.Email;
      if (!emailValue || !emailValue.trim()) {
        toast({ title: 'Campo obrigatório', description: 'Email é obrigatório para enviar o formulário', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }
    }

    // Validate required form fields
    const currentStep = getCurrentStep();
    if (currentStep?.type === 'form') {
      const requiredFields = currentStep.formFields?.filter(field => field.required) || [];
      for (const field of requiredFields) {
        const fieldValue = formData[field.name];
        if (!fieldValue || fieldValue.toString().trim() === '') {
          toast({ title: 'Campo obrigatório', description: `Campo "${field.label || field.placeholder || field.name}" é obrigatório`, variant: 'destructive' });
          setIsSubmitting(false);
          return;
        }
      }
    }

    try {
      const serviceName = form.name || form.title || document.title || 'Consultoria Jurídica';
      const allData: Record<string, any> = {
        ...answers,
        ...formData,
        service: serviceName,
        form_name: form.name,
        form_id: form.slug,
        timestamp: new Date().toISOString()
      };

      const totalSteps = form.steps.length || 1;
      const currentIndex = form.steps.findIndex(step => step.id === currentStepId) || 0;
      const completionPercentage = ((currentIndex + 1) / totalSteps) * 100;

      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content')
      };

      // ── Enhanced Conversions: capturar GCLID ─────────────────────────────────
      // O Google anexa ?gclid= na URL de destino quando o usuário clica em um
      // anúncio. Persistimos no sessionStorage para sobreviver à navegação
      // multi-etapa do formulário.
      const gclidFromUrl = urlParams.get('gclid');
      if (gclidFromUrl) sessionStorage.setItem('_gclid', gclidFromUrl);
      const gclid = gclidFromUrl || sessionStorage.getItem('_gclid') || null;

      // transaction_id único para deduplicação no Google Ads
      // Formato: {slug}_{timestamp}_{random} — legível e único
      const transactionId = `${form.slug || 'form'}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      const sessionId = `stepform_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Map responses with step titles instead of IDs
      const mappedResponses: Record<string, any> = {};
      Object.entries(answers).forEach(([stepId, value]) => {
        const step = form.steps.find(s => s.id === stepId);
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
          mappedResponses.phone || mappedResponses.whatsapp ||
          mappedResponses['Telefone/WhatsApp'] || '',
      };

      // Telefone brasileiro = WhatsApp na maioria dos casos
      if (extractedData.phone && !extractedData.whatsapp) {
        extractedData.whatsapp = extractedData.phone;
      }

      // Deduplication: check form_leads for same email in last 2 minutes
      const emailForDedup = extractedData.email?.toLowerCase().trim();
      if (emailForDedup) {
        const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
        const { data: deepCheck } = await supabase
          .from('form_leads')
          .select('id, lead_data')
          .eq('form_id', form.slug || form.id || 'stepform')
          .gte('created_at', twoMinAgo)
          .limit(20);

        const hasDuplicate = deepCheck?.some(evt => {
          const ld = evt.lead_data as any;
          const ldEmail = (ld?.email || ld?.Email || ld?.['e-mail'] || '').toLowerCase().trim();
          return ldEmail === emailForDedup;
        });

        if (hasDuplicate) {
          logger.warn('Lead duplicado detectado (mesmo email nos últimos 2 min), ignorando');
          toast({ title: 'Já recebemos seus dados', description: 'Seu formulário já foi enviado. Nossa equipe entrará em contato em breve.', variant: 'default' });
          if (slug) localStorage.removeItem(`stepform_progress_${slug}`);
          setIsSubmitting(false);
          setTimeout(() => {
            const redirectUrl = form.redirect_url || '/obrigado';
            if (redirectUrl.startsWith('http')) window.location.href = redirectUrl;
            else navigate(redirectUrl);
          }, 1500);
          return;
        }
      }

      // Save lead with retry
      const leadData = {
        lead_data: { ...allData, ...extractedData, respostas_mapeadas: mappedResponses },
        form_id: form.slug || form.id || 'stepform',
        form_name: form.name || 'Step Form',
        form_step_data: mappedResponses,
        completion_percentage: completionPercentage,
        referrer: document.referrer || '',
        utm_source: utmData.utm_source,
        utm_medium: utmData.utm_medium,
        utm_campaign: utmData.utm_campaign,
        utm_term: utmData.utm_term,
        utm_content: utmData.utm_content,
        gclid: gclid,
        transaction_id: transactionId,
        session_id: sessionId,
        visitor_id: persistentVisitorId.current,
        source_page: window.location.href,
        user_agent: navigator.userAgent,
        status: 'new'
      };

      // Generate UUID client-side to avoid needing .select() after insert
      // (RLS blocks SELECT for anonymous users, causing rollback of the entire INSERT)
      const leadId = crypto.randomUUID();

      const insertLead = async () => {
        const { error } = await supabase
          .from('form_leads')
          .insert([{ id: leadId, ...leadData }]);
        if (error) throw error;
      };

      try {
        await insertLead();
      } catch (firstError) {
        logger.error('Primeiro erro ao salvar lead em form_leads:', firstError);
        // Retry once
        try {
          await insertLead();
        } catch (retryError) {
          logger.error('Retry falhou ao salvar lead em form_leads:', retryError);
          // Flag the conversion event so we know form_leads failed
          allData._form_leads_failed = true;
          allData._form_leads_error = (retryError as Error)?.message || 'unknown';
        }
      }

      // Save conversion event
      try {
        const { error: conversionError } = await supabase
          .from('conversion_events')
          .insert([{
            session_id: sessionId,
            visitor_id: persistentVisitorId.current,
            event_type: 'form_submission',
            event_category: 'step_form',
            event_action: 'submit',
            event_label: form.slug || 'stepform',
            form_id: form.slug || 'stepform',
            form_name: form.name || 'Step Form',
            lead_data: { ...extractedData, service: serviceName, respostas_mapeadas: mappedResponses },
            conversion_value: 1,
            page_url: window.location.href,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent
          }]);
        if (conversionError) logger.warn('Erro ao salvar evento de conversão:', conversionError);
      } catch (conversionError) {
        logger.warn('Erro ao processar evento de conversão:', conversionError);
      }

      // Fire marketing event with full data for GTM/GA/Pixel
      const formResponses = { ...answers, ...formData };
      window.dispatchEvent(new CustomEvent('stepFormSubmitSuccess', {
        detail: {
          formSlug: slug,
          formId: form.id,
          formName: form.name,
          userData: formResponses,
          formData: formData,
          answers: answers,
          extractedData: extractedData,
          sessionId: sessionId,
          // Enhanced Conversions — usados pelo useStepFormMarketingScripts
          gclid: gclid,
          transactionId: transactionId,
          leadId: savedLead?.id || null
        }
      }));

      // ── Reply Agent Sync ──────────────────────────────────────────────────────
      // Cria o contato no Reply Agent CRM e dispara o Smart Flow configurado.
      // Fire-and-forget: não bloqueia o fluxo do formulário.
      const urgencyValue = (() => {
        const urgencyStep = form.steps.find(s =>
          s.id?.includes('urgency') ||
          s.title?.toLowerCase().includes('urgência') ||
          s.title?.toLowerCase().includes('urgencia')
        );
        const ans = urgencyStep ? answers[urgencyStep.id] : '';
        if (ans?.toLowerCase().includes('urgente')) return 'urgente';
        if (ans?.toLowerCase().includes('semana')) return 'semanas';
        if (ans?.toLowerCase().includes('pesquisando')) return 'pesquisando';
        return 'default';
      })();

      // Fetch automation_id from marketing_settings based on urgency.
      // IMPORTANTE: a edge function é chamada SEMPRE para criar o contato.
      // O SmartFlow só é pulado se não houver flow_id configurado (skip_flow=true na edge fn).
      const fetchAutomationId = async (): Promise<string | undefined> => {
        try {
          // 1. Try per-form config from centralize_config
          const { data: formRow } = await supabase
            .from('step_forms')
            .select('centralize_config')
            .eq('slug', form.slug || slug)
            .maybeSingle();

          const fc = formRow?.centralize_config as any;
          if (fc?.enabled) {
            if (urgencyValue === 'urgente') return fc.flow_id_urgente || fc.flow_id_default || undefined;
            if (urgencyValue === 'semanas') return fc.flow_id_semanas || fc.flow_id_default || undefined;
            if (urgencyValue === 'pesquisando') return fc.flow_id_pesquisando || fc.flow_id_default || undefined;
            return fc.flow_id_default || undefined;
          }

          // 2. Fallback to global marketing_settings
          const { data: mktSettings } = await supabase
            .from('marketing_settings')
            .select('reply_agent_enabled, reply_agent_flow_id, reply_agent_flow_id_urgente, reply_agent_flow_id_semanas, reply_agent_flow_id_pesquisando')
            .limit(1)
            .maybeSingle();
          if (!mktSettings?.reply_agent_enabled) return undefined;
          if (urgencyValue === 'urgente') return mktSettings.reply_agent_flow_id_urgente || mktSettings.reply_agent_flow_id || undefined;
          if (urgencyValue === 'semanas') return mktSettings.reply_agent_flow_id_semanas || mktSettings.reply_agent_flow_id || undefined;
          if (urgencyValue === 'pesquisando') return mktSettings.reply_agent_flow_id_pesquisando || mktSettings.reply_agent_flow_id || undefined;
          return mktSettings.reply_agent_flow_id || undefined;
        } catch { return undefined; }
      };

      // Sempre chama a edge function para criar o contato,
      // independente do reply_agent_enabled (que controla apenas o SmartFlow)
      fetchAutomationId().then(automationId => {
        supabase.functions.invoke('reply-agent-sync', {
          body: {
            name: extractedData.name,
            email: extractedData.email,
            phone: extractedData.phone,
            whatsapp: extractedData.whatsapp || extractedData.phone,
            service: serviceName,
            urgency: urgencyValue,
            message: mappedResponses['Mensagem'] || mappedResponses['message'] || mappedResponses['Descrição'] || '',
            form_slug: form.slug || slug || '',
            form_name: form.name || '',
            lead_id: savedLead?.id || '',
            gclid: gclid || '',
            transaction_id: transactionId,
            automation_id: automationId,
            custom_fields: {
              ...(utmData.utm_source ? { utm_source: utmData.utm_source } : {}),
              ...(utmData.utm_medium ? { utm_medium: utmData.utm_medium } : {}),
              ...(utmData.utm_campaign ? { utm_campaign: utmData.utm_campaign } : {}),
              ...(utmData.utm_term ? { utm_term: utmData.utm_term } : {}),
              ...(utmData.utm_content ? { utm_content: utmData.utm_content } : {}),
              ...(gclid ? { gclid } : {}),
              pagina_origem: window.location.href,
              referrer: document.referrer || '',
              lead_id: savedLead?.id || '',
              formulario: form.name || form.slug || '',
            },
          }
        }).then(res => {
          if (res.error) logger.error('reply-agent-sync error:', res.error);
          else logger.log('reply-agent-sync ok:', res.data);
        }).catch(err => logger.warn('reply-agent-sync exception:', err));
      });

      // Send confirmation email
      try {
        if (extractedData.email) {
          const { data: templates } = await supabase
            .from('email_templates')
            .select('*')
            .eq('is_active', true)
            .order('is_default', { ascending: false })
            .limit(1);

          const tpl = templates?.[0];
          const emailResponse = await supabase.functions.invoke('send-smtp-email', {
            body: {
              to: extractedData.email,
              subject: tpl?.subject?.replace('{name}', extractedData.name || 'Cliente') || `Obrigado pelo contato, ${extractedData.name || 'Cliente'}! 📧`,
              name: extractedData.name || 'Cliente',
              service: form.name || 'Consultoria Jurídica',
              customTitle: tpl?.title,
              customContent: tpl?.content,
              logoUrl: tpl?.logo_url || 'https://stadv.com.br/logo-email.png',
              backgroundColor: tpl?.background_color,
              textColor: tpl?.text_color,
              buttonColor: tpl?.button_color,
              customHtml: tpl?.custom_html,
              buttonText: tpl?.button_text,
              buttonUrl: tpl?.button_url,
              secondaryButtonText: tpl?.secondary_button_text,
              secondaryButtonUrl: tpl?.secondary_button_url,
              showSecondaryButton: tpl?.show_secondary_button,
              source: 'stepform'
            }
          });
          if (emailResponse.error) logger.error('Erro ao enviar email stepform:', emailResponse.error);
        }
      } catch (emailError) {
        logger.error('Erro geral no envio de email stepform:', emailError);
      }

      // Queue webhook with anti-ban timing
      if (form.webhook_url?.trim()) {
        try {
          const resumoCaso = buildCaseSummary(mappedResponses, form.steps, serviceName);
          const webhookPayload = {
            nome: extractedData.name,
            email: extractedData.email,
            telefone: extractedData.phone,
            resumo_caso: resumoCaso,
            urgencia: 'default',
            formulario: form.name,
            data_envio: new Date().toISOString(),
            lead_id: savedLead?.id,
            form_slug: form.slug
          };

          // Determine urgency from answers
          const urgencyStep = form.steps.find(s => s.id?.includes('urgency') || s.title?.toLowerCase().includes('urgência') || s.title?.toLowerCase().includes('urgencia'));
          const urgencyAnswer = urgencyStep ? answers[urgencyStep.id] : undefined;
          let urgency = 'default';
          let delaySeconds = 60; // default 1 min
          if (urgencyAnswer?.toLowerCase().includes('urgente')) {
            urgency = 'urgente';
            delaySeconds = 30;
          } else if (urgencyAnswer?.toLowerCase().includes('semana')) {
            urgency = 'semanas';
            delaySeconds = 180;
          } else if (urgencyAnswer?.toLowerCase().includes('pesquisando')) {
            urgency = 'pesquisando';
            delaySeconds = 480;
          }
          webhookPayload.urgencia = urgency;

          const sendAt = new Date(Date.now() + delaySeconds * 1000).toISOString();

          // Insert into webhook queue
          const { error: queueError } = await supabase
            .from('webhook_queue')
            .insert([{
              lead_id: savedLead?.id || sessionId,
              webhook_url: form.webhook_url,
              payload: webhookPayload,
              urgency,
              send_at: sendAt,
              status: 'pending'
            }]);

          if (queueError) {
            logger.error('Erro ao inserir na fila de webhook:', queueError);
          } else {
            // Fire immediately so webhook processes even if user closes tab
            supabase.functions.invoke('process-webhook-queue', { body: {} }).catch(e =>
              logger.warn('Erro ao disparar processamento imediato da fila:', e)
            );

            // Also schedule after delay as backup
            setTimeout(async () => {
              try {
                await supabase.functions.invoke('process-webhook-queue', { body: {} });
              } catch (e) {
                logger.warn('Erro ao disparar processamento agendado da fila:', e);
              }
            }, Math.min(delaySeconds * 1000, 30000)); // cap at 30s for browser
          }
        } catch (webhookError) {
          logger.error('Erro ao enfileirar webhook:', webhookError);
        }
      }

      toast({ title: 'Sucesso!', description: 'Formulário enviado com sucesso!', variant: 'default' });

      // Clear saved progress after successful submission
      if (slug) localStorage.removeItem(`stepform_progress_${slug}`);

      // Determine urgency for redirect
      const urgencyStepForRedirect = form.steps.find(s => s.id?.includes('urgency') || s.title?.toLowerCase().includes('urgência') || s.title?.toLowerCase().includes('urgencia'));
      const urgencyForRedirect = urgencyStepForRedirect ? answers[urgencyStepForRedirect.id] : '';
      let urgencyParam = '';
      if (urgencyForRedirect?.toLowerCase().includes('urgente')) urgencyParam = 'urgente';
      else if (urgencyForRedirect?.toLowerCase().includes('semana')) urgencyParam = 'semanas';
      else if (urgencyForRedirect?.toLowerCase().includes('pesquisando')) urgencyParam = 'pesquisando';

      setTimeout(() => {
        let redirectUrl = form.redirect_url || '/obrigado';
        if (!redirectUrl.startsWith('http')) {
          const params = new URLSearchParams();
          if (urgencyParam) params.set('urgencia', urgencyParam);
          const userName = extractedData.name || formData.Nome || formData.name || '';
          if (userName) params.set('nome', userName);
          const serviceParam = formData.servico || formData.service || serviceName || '';
          if (serviceParam) params.set('servico', serviceParam);
          if (form.slug) params.set('form', form.slug);
          const qs = params.toString();
          if (qs) redirectUrl += `?${qs}`;
        }
        if (redirectUrl.startsWith('http')) {
          window.location.href = redirectUrl;
        } else {
          navigate(redirectUrl);
        }
      }, 1500);

    } catch (error) {
      logger.error('Erro geral ao enviar formulário:', error);
      toast({ title: 'Erro no formulário', description: `Erro: ${(error as Error)?.message || 'Erro desconhecido'}`, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentStep = (): StepFormStep | undefined => {
    return form?.steps?.find(step => step.id === currentStepId);
  };

  const canGoBack = history.length > 0;

  return {
    slug,
    form,
    currentStepId,
    answers,
    formData,
    setFormData,
    loading,
    isSubmitting,
    progress,
    history,
    currentStep: getCurrentStep(),
    canGoBack,
    saveAnswer,
    goToNextStep,
    goBack,
    handleFormSubmit,
    visitedStepsCount: visitedSteps.length,
    totalReachableSteps,
  };
};
