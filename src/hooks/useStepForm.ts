import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useStepFormMarketingScripts } from '@/hooks/useStepFormMarketingScripts';
import { logger } from '@/utils/logger';
import type { StepFormData, StepFormStep } from '@/types/stepFormTypes';

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
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [visitedSteps, setVisitedSteps] = useState<string[]>([]);

  const marketingSlug = useMemo(() => slug || '', [slug]);
  useStepFormMarketingScripts(marketingSlug);

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
    }
  }, [form, currentStepId]);

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
    setLoading(true);

    if (!form) {
      toast({ title: 'Erro', description: 'Formulário não carregado. Recarregue a página.', variant: 'destructive' });
      setLoading(false);
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
        setLoading(false);
        return;
      }
    }

    // Validate email
    const emailValue = formData.email || answers.email || formData.Email || answers.Email;
    if (!emailValue || !emailValue.trim()) {
      toast({ title: 'Campo obrigatório', description: 'Email é obrigatório para enviar o formulário', variant: 'destructive' });
      setLoading(false);
      return;
    }

    // Validate required form fields
    const currentStep = getCurrentStep();
    if (currentStep?.type === 'form') {
      const requiredFields = currentStep.formFields?.filter(field => field.required) || [];
      for (const field of requiredFields) {
        const fieldValue = formData[field.name];
        if (!fieldValue || fieldValue.toString().trim() === '') {
          toast({ title: 'Campo obrigatório', description: `Campo "${field.label || field.placeholder || field.name}" é obrigatório`, variant: 'destructive' });
          setLoading(false);
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

      const extractedData = {
        name: formData.name || formData.Nome || mappedResponses.Nome || mappedResponses.name || '',
        email: formData.email || formData.Email || mappedResponses.Email || mappedResponses.email || '',
        phone: formData.Telefone || formData.phone || formData.telefone || formData.whatsapp ||
          formData['Telefone/WhatsApp'] || mappedResponses.Telefone || mappedResponses.telefone ||
          mappedResponses.phone || mappedResponses.whatsapp ||
          mappedResponses['Telefone/WhatsApp'] || '',
      };

      // Deduplication: check if same email submitted in last 5 minutes
      const emailForDedup = extractedData.email?.toLowerCase().trim();
      if (emailForDedup) {
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const { data: recentDup } = await supabase
          .from('conversion_events')
          .select('id')
          .eq('event_type', 'form_submission')
          .eq('form_id', form.id || 'stepform')
          .gte('created_at', fiveMinAgo)
          .limit(1);

        // Check lead_data->email via RPC would be complex, so check conversion_events lead_data
        if (recentDup && recentDup.length > 0) {
          // Check if any recent event has same email
          const { data: dupCheck } = await supabase
            .from('conversion_events')
            .select('id, lead_data')
            .eq('event_type', 'form_submission')
            .eq('form_id', form.id || 'stepform')
            .gte('created_at', fiveMinAgo)
            .limit(10);

          const isDuplicate = dupCheck?.some(evt => {
            const ld = evt.lead_data as any;
            return ld?.email?.toLowerCase().trim() === emailForDedup;
          });

          if (isDuplicate) {
            logger.warn('Lead duplicado detectado (mesmo email nos últimos 5 min), ignorando');
            toast({ title: 'Sucesso!', description: 'Formulário enviado com sucesso!', variant: 'default' });
            if (slug) localStorage.removeItem(`stepform_progress_${slug}`);
            setTimeout(() => {
              const redirectUrl = form.redirect_url || '/obrigado';
              if (redirectUrl.startsWith('http')) window.location.href = redirectUrl;
              else navigate(redirectUrl);
            }, 1500);
            return;
          }
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
        session_id: sessionId,
        visitor_id: `stepform_${Date.now()}`,
        source_page: window.location.href,
        user_agent: navigator.userAgent,
        status: 'new'
      };

      let savedLead: any = null;
      const insertLead = async () => {
        const { data, error } = await supabase
          .from('form_leads')
          .insert([leadData])
          .select()
          .single();
        if (error) throw error;
        return data;
      };

      try {
        savedLead = await insertLead();
      } catch (firstError) {
        logger.error('Primeiro erro ao salvar lead em form_leads:', firstError);
        // Retry once
        try {
          savedLead = await insertLead();
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
            visitor_id: `stepform_${Date.now()}`,
            event_type: 'form_submission',
            event_category: 'step_form',
            event_action: 'submit',
            event_label: form.slug || 'stepform',
            form_id: form.id || 'stepform',
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

      // Fire marketing event
      const formResponses = { ...answers, ...formData };
      window.dispatchEvent(new CustomEvent('stepFormSubmitSuccess', {
        detail: { formSlug: slug, formId: form.id, formName: form.name, userData: formResponses }
      }));

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
          const webhookPayload = {
            formId: form.id,
            formSlug: form.slug,
            formName: form.name,
            responses: mappedResponses,
            extractedData,
            allData,
            submissionDate: new Date().toISOString(),
            sessionId,
            leadId: savedLead?.id,
            completionPercentage,
            ...utmData,
            metadata: { page_url: window.location.href, referrer: document.referrer, user_agent: navigator.userAgent }
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
            // Schedule edge function call after delay
            setTimeout(async () => {
              try {
                await supabase.functions.invoke('process-webhook-queue', { body: {} });
              } catch (e) {
                logger.warn('Erro ao disparar processamento da fila:', e);
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
      setLoading(false);
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
