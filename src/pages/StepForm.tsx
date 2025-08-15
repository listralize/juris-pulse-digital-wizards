import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { OfferElement, TimerElement, SocialProofElement, renderStepElement } from '../components/StepFormElements';
import { StepFormTestimonials } from '../components/StepFormTestimonials';
import { useStepFormMarketingScripts } from '@/hooks/useStepFormMarketingScripts';
import { useHostingerMarketingScripts } from '@/hooks/useHostingerMarketingScripts';
import { StepFormLoader } from '@/components/StepFormLoader';

interface StepFormData {
  id: string;
  name: string;
  slug: string;
  title: string;
  subtitle?: string;
  logo_url?: string;
  webhook_url: string;
  redirect_url?: string;
  steps: StepFormStep[];
  styles: {
    primary_color?: string;
    background_color?: string;
    text_color?: string;
    button_style?: string;
  };
  seo: {
    meta_title?: string;
    meta_description?: string;
  };
  footer_config?: {
    enabled?: boolean;
    text?: string;
    background_color?: string;
    text_color?: string;
    font_size?: string;
  };
  seo_config?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
  };
  is_active: boolean;
  flow_config?: {
    edges?: Array<{
      id: string;
      source: string;
      target: string;
      sourceHandle?: string;
      targetHandle?: string;
    }>;
  };
}

interface StepFormStep {
  id: string;
  title: string;
  description?: string;
  type: 'question' | 'form' | 'content' | 'offer' | 'timer' | 'socialProof';
  options?: Array<{
    text: string;
    value: string;
    nextStep?: string;
    actionType?: 'next_step' | 'external_url';
  }>;
  formFields?: Array<{
    name: string;
    type: string;
    label?: string;
    placeholder: string;
    required: boolean;
  }>;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  // Compatibilidade com o editor visual (Image/Video)
  imageUrl?: string;
  videoUrl?: string;
  mediaCaption?: string;
  buttonText?: string;
  buttonAction?: string;
  buttonActionType?: 'next_step' | 'external_url';
  backStep?: string;
  // Campos para carrossel
  carouselImages?: string[];
  carouselAutoplay?: boolean;
  carouselShowDots?: boolean;
  carouselInterval?: number;
  // Campos para dimensões de imagem/vídeo
  imageWidth?: string;
  imageHeight?: string;
  videoWidth?: string;
  videoHeight?: string;
  // Configurações adicionais de vídeo
  videoAutoplay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  // Novos campos para ofertas e elementos interativos
  offerConfig?: {
    title?: string;
    originalPrice?: string;
    salePrice?: string;
    discount?: string;
    features?: string[];
    ctaText?: string;
    ctaUrl?: string;
    urgencyText?: string;
  };
  timerConfig?: {
    duration?: number;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
    onExpireAction?: string;
    onExpireUrl?: string;
  };
  socialProofConfig?: {
    testimonials?: Array<{
      name: string;
      text: string;
      rating?: number;
      image?: string;
    }>;
    stats?: Array<{
      number: string;
      label: string;
    }>;
  };
}

const StepForm: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<StepFormData | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{[key: string]: number}>({});
  // Histórico de navegação para o botão Voltar funcionar de forma previsível
  const [history, setHistory] = useState<string[]>([]);


  // Load marketing scripts for this step form - usando memo para evitar recarregamentos
  const marketingSlug = useMemo(() => slug || '', [slug]);
  useStepFormMarketingScripts(marketingSlug);
  
  // Load Hostinger-optimized marketing scripts
  useHostingerMarketingScripts();

  useEffect(() => {
    if (slug) {
      loadForm();
    }
  }, [slug]);

  useEffect(() => {
    if (form && form.steps.length > 0 && !currentStepId) {
      // Determinar o primeiro step baseado no flow_config - só uma vez
      const firstStepId = getFirstStepFromFlow() || form.steps[0].id;
      setCurrentStepId(firstStepId);
      setHistory([]); // Reinicia o histórico quando definimos o primeiro passo
    }
  }, [form, currentStepId]);

  // Atualizar progresso quando step muda - memorizado para evitar cálculos desnecessários
  useEffect(() => {
    if (form && currentStepId) {
      const currentIndex = form.steps.findIndex(step => step.id === currentStepId);
      if (currentIndex !== -1) {
        const progressPercent = ((currentIndex + 1) / form.steps.length) * 100;
        setProgress(progressPercent);
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
        console.warn('⚠️ Formulário não encontrado para slug:', slug);
        toast({ title: 'Aviso', description: 'Formulário não encontrado', variant: 'destructive' });
        navigate('/');
        setLoading(false);
        return;
      }
      
      // Converter os dados do Supabase para o formato esperado
      const formData: StepFormData = {
        ...data,
        steps: (data.steps as unknown) as StepFormStep[],
        styles: (data.styles as unknown) as any,
        seo: (data.seo as unknown) as any,
        footer_config: (data.footer_config as unknown) as any,
        seo_config: (data.seo_config as unknown) as any,
        flow_config: (data.flow_config as unknown) as any
      };
      
      setForm(formData);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar formulário:', error);
      toast({
        title: "Erro",
        description: "Formulário não encontrado",
        variant: "destructive"
      });
      navigate('/');
      setLoading(false);
    }
  };


  const saveAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // Função para encontrar o primeiro step baseado no flow_config
  const getFirstStepFromFlow = () => {
    if (!form?.flow_config?.edges || form.flow_config.edges.length === 0) {
      return null;
    }

    // Encontrar steps que não são alvos de nenhuma edge (steps iniciais)
    const allTargets = form.flow_config.edges.map(edge => edge.target);
    const firstStep = form.steps.find(step => !allTargets.includes(step.id));
    
    console.log('🔍 Procurando primeiro step:', {
      allTargets,
      firstStepFound: firstStep?.id,
      edges: form.flow_config.edges
    });
    
    return firstStep?.id || null;
  };

  // Função para encontrar o próximo step usando flow_config (edges)
  const getNextStepFromFlow = (currentStepId: string, selectedOption?: string) => {
    if (!form?.flow_config?.edges) {
      console.warn('❌ Sem flow_config.edges definido');
      return null;
    }

    // Tentar mapear pela opção selecionada usando sourceHandle = option-<index>
    const currentStep = form.steps.find(s => s.id === currentStepId);
    if (currentStep?.options && selectedOption) {
      const optIndex = currentStep.options.findIndex(o => o.text === selectedOption);
      if (optIndex >= 0) {
        const specific = form.flow_config.edges.find(e => e.source === currentStepId && e.sourceHandle === `option-${optIndex}`);
        console.log('🔗 Buscando conexão específica por opção', { selectedOption, optIndex, specific });
        if (specific) return specific.target;
      }
    }

    // Fallback: primeira conexão a partir do step atual
    const edge = form.flow_config.edges.find(e => e.source === currentStepId);

    console.log('🔗 Fallback conexão por step', {
      currentStepId,
      edges: form.flow_config.edges,
      foundEdge: edge,
      targetStep: edge?.target
    });

    return edge ? edge.target : null;
  };

  const goToNextStep = (nextStepId?: string, actionType?: 'next_step' | 'external_url', selectedOption?: string) => {
    console.log('➡️ Tentando ir para próximo step:', {
      nextStepId,
      actionType,
      selectedOption,
      currentStepId,
      hasFlowConfig: !!form?.flow_config?.edges
    });

    // Primeiro, tentar usar o nextStepId fornecido
    let targetStepId = nextStepId;
    
    // Se não há nextStepId, tentar usar as conexões do flow_config
    if (!targetStepId) {
      targetStepId = getNextStepFromFlow(currentStepId, selectedOption);
    }
    
    console.log('🎯 Step alvo determinado:', targetStepId);
    
    if (targetStepId) {
      // Se actionType é external_url ou nextStepId começa com http, redireciona
      if (actionType === 'external_url' || targetStepId.startsWith('http')) {
        console.log('🌐 Redirecionando para URL externa:', targetStepId);
        window.open(targetStepId, '_blank');
        return;
      }
      
      // Se é um ID de step, vai para essa etapa
      const targetStep = form?.steps.find(step => step.id === targetStepId);
      if (targetStep) {
        console.log('✅ Navegando para step:', targetStepId);
        // Empilha o step atual para permitir Voltar corretamente
        setHistory((prev) => [...prev, currentStepId]);
        setCurrentStepId(targetStepId);
      } else {
        toast({
          title: "Erro de navegação",
          description: `Etapa "${targetStepId}" não encontrada`,
          variant: "destructive"
        });
        console.error('❌ Steps disponíveis:', form?.steps.map(s => s.id));
        console.error('❌ Tentando ir para:', targetStepId);
      }
    } else {
      console.warn('⚠️ Nenhuma próxima etapa encontrada para:', currentStepId);
      console.log('📊 Flow config edges:', form?.flow_config?.edges);
      toast({
        title: "Aviso",
        description: "Nenhuma próxima etapa configurada. Verifique as conexões no editor visual.",
        variant: "default"
      });
    }
  };

  const handleFormSubmit = async (e?: any) => {
    e?.preventDefault?.();
    console.log('🚀 Iniciando envio do formulário...');
    
    setLoading(true);
    
    // Verificar se o form está carregado
    if (!form) {
      console.error('❌ Formulário não carregado');
      toast({
        title: "Erro",
        description: "Formulário não carregado. Recarregue a página.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    console.log('📋 Form atual:', form);
    console.log('📊 Dados do formulário:', formData);
    console.log('💬 Respostas:', answers);
    
    // Validar campos obrigatórios primeiro
    const currentStep = getCurrentStep();
    console.log('⚡ Step atual:', currentStep);
    
    if (currentStep?.type === 'form') {
      const requiredFields = currentStep.formFields?.filter(field => field.required) || [];
      console.log('📝 Campos obrigatórios:', requiredFields);
      
      for (const field of requiredFields) {
        const fieldValue = formData[field.name];
        console.log(`🔍 Verificando campo ${field.name}:`, fieldValue);
        
        if (!fieldValue || fieldValue.toString().trim() === '') {
          const errorMsg = `Campo "${field.label || field.placeholder || field.name}" é obrigatório`;
          console.error('❌ Campo obrigatório não preenchido:', field.name);
          toast({
            title: "Campo obrigatório",
            description: errorMsg,
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
      }
    }
    
    console.log('✅ Validação de campos concluída');
    try {
      const serviceName = form?.name || form?.title || document.title || 'Consultoria Jurídica';
      const allData = { 
        ...answers, 
        ...formData,
        service: serviceName,
        form_name: form?.name,
        form_id: form?.slug,
        timestamp: new Date().toISOString()
      };
      
      // Calcular porcentagem de conclusão
      const totalSteps = form?.steps.length || 1;
      const currentIndex = form?.steps.findIndex(step => step.id === currentStepId) || 0;
      const completionPercentage = ((currentIndex + 1) / totalSteps) * 100;
      
      // Obter parâmetros UTM
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content')
      };

      const sessionId = `stepform_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Extrair campos específicos dos dados do formulário
      const formResponses = { ...answers, ...formData };
      
      // Mapear respostas com títulos dos blocos em vez de IDs
      const mappedResponses: Record<string, any> = {};
      
      // Mapear answers (respostas de perguntas)
      Object.entries(answers).forEach(([stepId, value]) => {
        const step = form?.steps.find(s => s.id === stepId);
        const questionTitle = step?.title || stepId;
        mappedResponses[questionTitle] = value;
      });
      
      // Mapear formData (campos de formulário)
      Object.entries(formData).forEach(([fieldName, value]) => {
        mappedResponses[fieldName] = value;
      });
      
      // Extrair nome, email e telefone para os campos principais
      const extractedData = {
        name: formData.name || formData.Nome || mappedResponses.Nome || mappedResponses.name || '',
        email: formData.email || formData.Email || mappedResponses.Email || mappedResponses.email || '',
                phone: formData.phone || formData.telefone || formData.whatsapp || 
                formData['Telefone/WhatsApp'] || mappedResponses.telefone || 
                mappedResponses.phone || mappedResponses.whatsapp || 
                mappedResponses['Telefone/WhatsApp'] || '',
      };
      
      // Salvar no banco de dados
      const leadData = {
        lead_data: {
          ...allData,
          ...extractedData,
          respostas_mapeadas: mappedResponses
        },
        form_id: form?.slug || form?.id || 'stepform',
        form_name: form?.name || 'Step Form',
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
        console.error('❌ Erro detalhado ao salvar lead (form_leads):', {
          error: leadError,
          leadData: leadData,
          message: leadError.message,
          details: leadError.details,
          hint: leadError.hint
        });
        toast({
          title: "Aviso",
          description: `Não foi possível salvar em form_leads. Continuando o envio...`,
          variant: "default"
        });
        // Não interromper o fluxo — seguimos salvando conversion_events, disparando marketing e webhook
      } else {
        console.log('✅ Lead salvo com sucesso:', savedLead);
      }

      // Salvar evento de conversão com dados mapeados corretamente
      try {
        const conversionData = {
          session_id: sessionId,
          visitor_id: `stepform_${Date.now()}`,
          event_type: 'form_submission',
          event_category: 'step_form',
          event_action: 'submit',
          event_label: form?.slug || 'stepform',
          form_id: form?.id || 'stepform',
          form_name: form?.name || 'Step Form',
          lead_data: {
            ...extractedData,
            service: serviceName,
            respostas_mapeadas: mappedResponses,
            ...mappedResponses
          },
          conversion_value: 1,
          page_url: window.location.href,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent
        };

        const { error: conversionError } = await supabase
          .from('conversion_events')
          .insert([conversionData]);

        if (conversionError) {
          console.warn('⚠️ Erro ao salvar evento de conversão:', conversionError);
        } else {
          console.log('✅ Evento de conversão salvo');
        }
      } catch (conversionError) {
        console.warn('⚠️ Erro ao processar evento de conversão:', conversionError);
      }

      console.log('🎯 Preparando para disparar eventos de marketing...', { formSlug: slug, formId: form?.id });

      // Disparar evento customizado para scripts de marketing
      const eventDetail = { 
        formSlug: slug,
        formId: form?.id,
        formName: form?.name,
        userData: formResponses 
      };
      
      console.log('📤 Disparando evento stepFormSubmitSuccess com detalhes:', eventDetail);
      
      // Disparar evento imediatamente
      const customEvent = new CustomEvent('stepFormSubmitSuccess', { detail: eventDetail });
      window.dispatchEvent(customEvent);
      
      console.log('✅ Evento stepFormSubmitSuccess disparado');
      console.log('🔍 Verificando se há listeners registrados...');
      
      // Verificar se há handlers registrados
      const gtmHandler = (window as any)[`stepFormGTMHandler_${slug}`];
      const pixelHandler = (window as any)[`stepFormPixelHandler_${slug}`];
      const gaHandler = (window as any)[`stepFormGAHandler_${slug}`];
      
      console.log('👂 Handlers registrados:', {
        gtm: !!gtmHandler,
        pixel: !!pixelHandler,
        ga: !!gaHandler,
        slug: slug
      });
      

      // Eventos diretos de Facebook Pixel removidos para evitar duplicidade.
      // O hook useStepFormMarketingScripts ouvirá 'stepFormSubmitSuccess' e enviará o evento configurado.

      // Eventos diretos do Google Analytics removidos; o hook cuidará via stepFormSubmitSuccess.

      console.log('🔗 Enviando para webhook...', { webhookUrl: form?.webhook_url });

      // Buscar template padrão e enviar email de confirmação para stepform leads
      try {
        console.log('📧 Enviando email de confirmação para stepform lead...');
        
        if (extractedData.email) {
          // Buscar template padrão
          const { data: templates, error: templateError } = await supabase
            .from('email_templates')
            .select('*')
            .eq('is_active', true)
            .order('is_default', { ascending: false })
            .limit(1);

          if (templateError) {
            console.error('❌ Erro ao buscar template:', templateError);
          }

          const defaultTemplate = templates?.[0];
          
          const emailResponse = await supabase.functions.invoke('send-smtp-email', {
            body: {
              to: extractedData.email,
              subject: defaultTemplate?.subject?.replace('{name}', extractedData.name || 'Cliente') || `Obrigado pelo contato, ${extractedData.name || 'Cliente'}! 📧`,
              name: extractedData.name || 'Cliente',
              service: form?.name || 'Consultoria Jurídica',
              customTitle: defaultTemplate?.title,
              customContent: defaultTemplate?.content,
              logoUrl: defaultTemplate?.logo_url || 'https://stadv.com.br/logo-email.png',
              backgroundColor: defaultTemplate?.background_color,
              textColor: defaultTemplate?.text_color,
              buttonColor: defaultTemplate?.button_color,
              customHtml: defaultTemplate?.custom_html,
              buttonText: defaultTemplate?.button_text,
              buttonUrl: defaultTemplate?.button_url,
              secondaryButtonText: defaultTemplate?.secondary_button_text,
              secondaryButtonUrl: defaultTemplate?.secondary_button_url,
              showSecondaryButton: defaultTemplate?.show_secondary_button,
              source: 'stepform'
            }
          });
          
          if (emailResponse.error) {
            console.error('❌ Erro ao enviar email stepform:', emailResponse.error);
          } else {
            console.log('✅ Email de confirmação enviado para stepform');
          }
        }
      } catch (emailError) {
        console.error('❌ Erro geral no envio de email stepform:', emailError);
      }

      // Enviar para webhook se configurado
      if (form?.webhook_url && form.webhook_url.trim()) {
        try {
          const webhookPayload = {
            formId: form.id,
            formSlug: form.slug,
            formName: form.name,
            responses: mappedResponses,
            extractedData: extractedData,
            allData: allData,
            submissionDate: new Date().toISOString(),
            sessionId: sessionId,
            leadId: savedLead?.id,
            completionPercentage,
            ...utmData,
            metadata: {
              page_url: window.location.href,
              referrer: document.referrer,
              user_agent: navigator.userAgent
            }
          };

          console.log('📦 Payload do webhook:', webhookPayload);

          const webhookResponse = await fetch(form.webhook_url, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'User-Agent': 'StepForm-Webhook/1.0'
            },
            body: JSON.stringify(webhookPayload)
          });

          const responseText = await webhookResponse.text();
          console.log('📥 Resposta do webhook:', {
            status: webhookResponse.status,
            statusText: webhookResponse.statusText,
            response: responseText
          });

          if (!webhookResponse.ok) {
            throw new Error(`Webhook failed: ${webhookResponse.status} - ${responseText}`);
          }

          console.log('✅ Webhook enviado com sucesso');
        } catch (webhookError) {
          console.error('❌ Erro ao enviar webhook:', webhookError);
          // Não falhar o formulário por causa do webhook
          toast({
            title: "Aviso",
            description: "Dados salvos, mas houve erro no envio do webhook",
            variant: "default"
          });
        }
      } else {
        console.log('ℹ️ Nenhum webhook configurado para este formulário');
      }

      toast({
        title: "Sucesso!",
        description: "Formulário enviado com sucesso!",
        variant: "default"
      });
      console.log('🎉 Formulário enviado com sucesso! Redirecionando...');
      
      // Aguardar um pouco para garantir que os eventos de marketing foram processados
      setTimeout(() => {
        const redirectUrl = form?.redirect_url || '/obrigado';
        console.log('🔗 Redirecionando para:', redirectUrl);
        
        if (redirectUrl.startsWith('http')) {
          console.log('🌐 Redirecionamento externo:', redirectUrl);
          window.location.href = redirectUrl;
        } else {
          console.log('🏠 Redirecionamento interno:', redirectUrl);
          navigate(redirectUrl);
        }
      }, 1500);
      
    } catch (error) {
      console.error('❌ Erro geral ao enviar formulário:', {
        error: error,
        message: (error as Error)?.message,
        stack: (error as Error)?.stack
      });
      toast({
        title: "Erro no formulário",
        description: `Erro: ${(error as Error)?.message || 'Erro desconhecido'}`,
         variant: "destructive"
       });
     } finally {
       setLoading(false);
     }
  };

  const getCurrentStep = () => {
    const step = form?.steps?.find(step => step.id === currentStepId);
    return step;
  };

  const getBackStep = (_currentStep: StepFormStep) => {
    if (history.length > 0) {
      return history[history.length - 1];
    }
    return null;
  };

  if (loading) {
    return (
      <StepFormLoader 
        title="Carregando seu formulário..."
        message="Estamos preparando tudo para você. Aguarde alguns instantes..."
      />
    );
  }

  if (!form) {
    return (
      <StepFormLoader 
        title="Formulário não encontrado"
        message="Não foi possível carregar este formulário. Verifique o link ou tente novamente."
      />
    );
  }

  const currentStep = getCurrentStep();

  return (
    <div 
      className="min-h-screen py-8 px-4 overflow-x-hidden pb-24"
      style={{ 
        backgroundColor: form.styles.background_color || '#ffffff',
        color: form.styles.text_color || '#000000'
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${progress}%`,
              backgroundColor: form.styles.primary_color || '#4CAF50'
            }}
          />
        </div>

        {/* Logo */}
        {form.logo_url && (
          <div className="text-center mb-8">
            <img 
              src={form.logo_url} 
              alt="Logo" 
              className="max-w-xs mx-auto h-auto"
            />
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
          {form.subtitle && (
            <p className="text-lg opacity-80">{form.subtitle}</p>
          )}
        </div>

        {/* Current Step */}
        {currentStep && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {/* Back Button */}
              {getBackStep(currentStep) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    const prevId = getBackStep(currentStep);
                    if (prevId) {
                      setHistory((prev) => prev.slice(0, -1));
                      setCurrentStepId(prevId);
                    }
                  }}
                  className="mb-4 p-0 h-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}

              <h2 className="text-2xl font-bold mb-4">{currentStep.title}</h2>
              
              {currentStep.description && (
                <p className="text-muted-foreground mb-6">{currentStep.description}</p>
              )}

              {currentStep.type === 'question' && (
                <div className="space-y-6">
                  {/* Media Content for Question */}
                  {(currentStep.mediaUrl || currentStep.imageUrl || currentStep.videoUrl) && (
                    <div className="mb-6">
                      {renderStepElement({
                        type: currentStep.mediaType,
                        content: currentStep.mediaUrl || currentStep.imageUrl || currentStep.videoUrl,
                        imageWidth: currentStep.imageWidth,
                        imageHeight: currentStep.imageHeight,
                        videoWidth: currentStep.videoWidth,
                        videoHeight: currentStep.videoHeight,
                        videoAutoplay: currentStep.videoAutoplay,
                        videoMuted: currentStep.videoMuted,
                        videoLoop: currentStep.videoLoop
                      })}
                      {currentStep.mediaCaption && (
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                          {currentStep.mediaCaption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Carousel Content for Question */}
                  {currentStep.mediaType === 'carousel' && currentStep.carouselImages && (
                    <div className="mb-6">
                      {renderStepElement({
                        type: 'carousel',
                        images: currentStep.carouselImages,
                        autoplay: currentStep.carouselAutoplay,
                        showDots: currentStep.carouselShowDots,
                        interval: currentStep.carouselInterval
                      })}
                    </div>
                  )}

                  {/* Question Options */}
                  {currentStep.options && (
                    <div className="space-y-3">
                      {currentStep.options.map((option, index) => (
                        <Button
                           key={index}
                           variant="outline"
                           className="w-full justify-start p-4 h-auto min-h-[44px] text-left"
                           style={{
                             borderColor: form.styles.primary_color || '#4CAF50',
                             color: form.styles.primary_color || '#4CAF50',
                             borderRadius: form.styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
                           }}
                           onClick={() => {
                             saveAnswer(currentStep.id, option.text);
                             goToNextStep(option.nextStep, option.actionType, option.text);
                           }}
                         >
                           {option.text}
                         </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentStep.type === 'content' && (
                <div className="text-center space-y-6">
                  {/* Media Content */}
                  {(currentStep.mediaUrl || currentStep.imageUrl || currentStep.videoUrl) && (
                    <div className="mb-6">
                      {renderStepElement({
                        type: currentStep.mediaType,
                        content: currentStep.mediaUrl || currentStep.imageUrl || currentStep.videoUrl,
                        imageWidth: currentStep.imageWidth,
                        imageHeight: currentStep.imageHeight,
                        videoWidth: currentStep.videoWidth,
                        videoHeight: currentStep.videoHeight
                      })}
                      {currentStep.mediaCaption && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {currentStep.mediaCaption}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Carousel Content */}
                  {currentStep.mediaType === 'carousel' && currentStep.carouselImages && (
                    <div className="mb-6">
                      {renderStepElement({
                        type: 'carousel',
                        images: currentStep.carouselImages,
                        autoplay: currentStep.carouselAutoplay,
                        showDots: currentStep.carouselShowDots,
                        interval: currentStep.carouselInterval
                      })}
                    </div>
                  )}
                  
                  <Button
                    className="px-8 h-12"
                    style={{
                      backgroundColor: form.styles.primary_color || '#4CAF50',
                      borderRadius: form.styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
                    }}
                     onClick={() => {
                       if (currentStep.buttonAction) {
                         goToNextStep(currentStep.buttonAction, currentStep.buttonActionType);
                       }
                     }}
                  >
                    {currentStep.buttonText || 'Continuar'}
                  </Button>
                </div>
              )}

              {currentStep.type === 'form' && (
                <form noValidate onSubmit={handleFormSubmit} onSubmitCapture={handleFormSubmit} className="space-y-4">
                  {currentStep.formFields?.map((field, index) => (
                    <div key={index}>
                      {field.type === 'textarea' ? (
                        <Textarea
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            [field.name]: e.target.value 
                          }))}
                          className="min-h-[120px]"
                        />
                      ) : (
                        <Input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            [field.name]: e.target.value 
                          }))}
                          className="h-12"
                        />
                      )}
                    </div>
                  ))}
                  
                   <Button 
                     type="button"
                     onClick={() => handleFormSubmit()}
                     className="w-full h-12"
                     disabled={loading}
                     style={{
                       backgroundColor: form.styles.primary_color || '#4CAF50',
                       borderRadius: form.styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
                     }}
                   >
                     {loading ? 'Enviando...' : 'Enviar Formulário'}
                   </Button>
                </form>
              )}
              {/* Prova Social (Depoimentos/Estatísticas) */}
              {currentStep.socialProofConfig && ((currentStep.socialProofConfig as any).enabled ?? true) &&
                (currentStep.socialProofConfig.testimonials?.length > 0 || currentStep.socialProofConfig.stats?.length > 0) && (
                <div className="mt-6">
                  <SocialProofElement
                    config={currentStep.socialProofConfig}
                    primaryColor={form.styles.primary_color || '#4CAF50'}
                  />
                </div>
              )}

              {currentStep.type === 'offer' && currentStep.offerConfig && (
                <OfferElement
                  config={currentStep.offerConfig}
                  onAction={(url) => {
                    if (url) {
                      goToNextStep(url, 'external_url');
                    } else if (currentStep.buttonAction) {
                      goToNextStep(currentStep.buttonAction, currentStep.buttonActionType);
                    }
                  }}
                  primaryColor={form.styles.primary_color || '#4CAF50'}
                  buttonStyle={form.styles.button_style || 'rounded'}
                />
              )}

              {/* Timer removido conforme solicitação */}
            </CardContent>
          </Card>
        )}

        {/* Depoimentos fixos acima do rodapé */}
        <StepFormTestimonials 
          formId={form.slug} 
          config={(form.seo_config as any)?.social_proof?.enabled ? (form.seo_config as any)?.social_proof : undefined}
        />

        {/* Custom Footer */}
        {form.footer_config?.enabled && (
          <div 
            className="text-center mt-8 p-4 rounded-lg"
            style={{
              backgroundColor: form.footer_config.background_color || '#1a1a1a',
              color: form.footer_config.text_color || '#ffffff'
            }}
          >
            <p className={form.footer_config.font_size || 'text-sm'}>
              {form.footer_config.text || 'Atendemos todo o Brasil ✅'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default StepForm;