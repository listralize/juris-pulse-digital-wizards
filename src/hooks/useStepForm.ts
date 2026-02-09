import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useStepFormMarketingScripts } from '@/hooks/useStepFormMarketingScripts';
import { logger } from '@/utils/logger';
import type { StepFormData, StepFormStep } from '@/types/stepFormTypes';

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

  useEffect(() => {
    if (slug) loadForm();
  }, [slug]);

  useEffect(() => {
    if (form && form.steps.length > 0 && !currentStepId) {
      const firstStepId = getFirstStepFromFlow() || form.steps[0].id;
      setCurrentStepId(firstStepId);
      setHistory([]);
      setVisitedSteps([firstStepId]);
    }
  }, [form, currentStepId]);

  useEffect(() => {
    if (form && currentStepId) {
      const currentIndex = form.steps.findIndex(step => step.id === currentStepId);
      if (currentIndex !== -1) {
        setProgress(((currentIndex + 1) / form.steps.length) * 100);
      }
    }
  }, [currentStepId, form]);

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
      const allData = {
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
        phone: formData.phone || formData.telefone || formData.whatsapp ||
          formData['Telefone/WhatsApp'] || mappedResponses.telefone ||
          mappedResponses.phone || mappedResponses.whatsapp ||
          mappedResponses['Telefone/WhatsApp'] || '',
      };

      // Save lead
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

      const { data: savedLead, error: leadError } = await supabase
        .from('form_leads')
        .insert([leadData])
        .select()
        .single();

      if (leadError) {
        logger.error('Erro ao salvar lead:', leadError);
        toast({ title: 'Aviso', description: 'Não foi possível salvar em form_leads. Continuando o envio...', variant: 'default' });
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
            lead_data: { ...extractedData, service: serviceName, respostas_mapeadas: mappedResponses, ...mappedResponses },
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

      // Send webhook
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

          const webhookResponse = await fetch(form.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'StepForm-Webhook/1.0' },
            body: JSON.stringify(webhookPayload)
          });

          if (!webhookResponse.ok) {
            const responseText = await webhookResponse.text();
            throw new Error(`Webhook failed: ${webhookResponse.status} - ${responseText}`);
          }
        } catch (webhookError) {
          logger.error('Erro ao enviar webhook:', webhookError);
          toast({ title: 'Aviso', description: 'Dados salvos, mas houve erro no envio do webhook', variant: 'default' });
        }
      }

      toast({ title: 'Sucesso!', description: 'Formulário enviado com sucesso!', variant: 'default' });

      setTimeout(() => {
        const redirectUrl = form.redirect_url || '/obrigado';
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
  };
};
