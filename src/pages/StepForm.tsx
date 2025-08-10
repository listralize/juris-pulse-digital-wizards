import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { OfferElement, TimerElement, SocialProofElement, renderStepElement } from '../components/StepFormElements';
import { useStepFormMarketingScripts } from '@/hooks/useStepFormMarketingScripts';

interface StepFormData {
  id: string;
  name: string;
  slug: string;
  title: string;
  subtitle?: string;
  logo_url?: string;
  webhook_url: string;
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
}

interface StepFormStep {
  id: string;
  title: string;
  description?: string;
  type: 'question' | 'form' | 'content' | 'offer' | 'timer';
  options?: Array<{
    text: string;
    value: string;
    nextStep?: string;
    actionType?: 'next_step' | 'external_url';
  }>;
  formFields?: Array<{
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
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
  const [form, setForm] = useState<StepFormData | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{[key: string]: number}>({});

  // Load marketing scripts for this step form
  useStepFormMarketingScripts(slug || '');

  useEffect(() => {
    if (slug) {
      loadForm();
    }
  }, [slug]);

  useEffect(() => {
    if (form && form.steps.length > 0) {
      setCurrentStepId(form.steps[0].id);
      updateProgress();
    }
  }, [form]);

  useEffect(() => {
    updateProgress();
  }, [currentStepId, form]);

  const loadForm = async () => {
    try {
      const { data, error } = await supabase
        .from('step_forms')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      
      // Converter os dados do Supabase para o formato esperado
      const formData: StepFormData = {
        ...data,
        steps: (data.steps as unknown) as StepFormStep[],
        styles: (data.styles as unknown) as any,
        seo: (data.seo as unknown) as any,
        footer_config: (data.footer_config as unknown) as any,
        seo_config: (data.seo_config as unknown) as any
      };
      
      setForm(formData);
    } catch (error) {
      console.error('Erro ao carregar formulário:', error);
      toast.error('Formulário não encontrado');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = () => {
    if (!form || !currentStepId) return;
    
    const currentIndex = form.steps.findIndex(step => step.id === currentStepId);
    if (currentIndex !== -1) {
      const progressPercent = ((currentIndex + 1) / form.steps.length) * 100;
      setProgress(progressPercent);
    }
  };

  const saveAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const goToStep = (stepId: string) => {
    setCurrentStepId(stepId);
  };

  const goToNextStep = (nextStepId?: string, actionType?: 'next_step' | 'external_url') => {
    if (nextStepId) {
      // Se actionType é external_url ou nextStepId começa com http, redireciona
      if (actionType === 'external_url' || nextStepId.startsWith('http')) {
        window.open(nextStepId, '_blank');
        return;
      }
      
      // Se é um ID de step, vai para essa etapa
      const targetStep = form?.steps.find(step => step.id === nextStepId);
      if (targetStep) {
        setCurrentStepId(nextStepId);
      } else {
        toast.error(`Etapa "${nextStepId}" não encontrada`);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const allData = { 
        ...answers, 
        ...formData,
        form_name: form?.name,
        form_id: form?.slug
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

      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Extrair campos específicos dos dados do formulário
      const formResponses = { ...answers, ...formData };
      
      // Salvar no banco de dados
      const leadData = {
        lead_data: allData,
        form_id: `stepform_${form?.id}`,
        form_name: form?.name || 'Step Form',
        name: formResponses.name || formResponses.nome || '',
        email: formResponses.email || '',
        phone: formResponses.phone || formResponses.telefone || '',
        message: formResponses.message || formResponses.mensagem || JSON.stringify(formResponses),
        form_step_data: formResponses,
        completion_percentage: completionPercentage,
        referrer: document.referrer || '',
        utm_source: utmData.utm_source,
        utm_medium: utmData.utm_medium,
        utm_campaign: utmData.utm_campaign,
        utm_term: utmData.utm_term,
        utm_content: utmData.utm_content,
        session_id: sessionId,
        lead_status: 'new'
      };

      const { error: leadError } = await supabase
        .from('form_leads')
        .insert([leadData]);

      if (leadError) {
        console.error('Erro ao salvar lead:', leadError);
        toast.error('Erro ao salvar lead no sistema');
      } else {
        console.log('Lead salvo com sucesso no sistema');
      }

       // Dispatch success event for marketing tracking
       window.dispatchEvent(new CustomEvent('stepFormSubmitSuccess', { 
         detail: { 
           formSlug: slug,
           userData: formResponses 
         } 
       }));

      // Enviar para webhook se configurado
      if (form?.webhook_url) {
        try {
          await fetch(form.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              formId: form.id,
              formName: form.name,
              responses: formResponses,
              submissionDate: new Date().toISOString(),
              sessionId: sessionId,
              leadData,
              ...utmData
            })
          });
        } catch (webhookError) {
          console.error('Erro ao enviar webhook:', webhookError);
        }
      }

      toast.success('Formulário enviado com sucesso!');
      navigate('/obrigado');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao enviar formulário');
    }
  };

  const getCurrentStep = () => {
    return form?.steps.find(step => step.id === currentStepId);
  };

  const getBackStep = (currentStep: StepFormStep) => {
    const currentIndex = form?.steps.findIndex(step => step.id === currentStep.id) || 0;
    if (currentIndex > 0) {
      return form?.steps[currentIndex - 1].id;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Formulário não encontrado</h2>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const currentStep = getCurrentStep();

  return (
    <div 
      className="min-h-screen py-8 px-4"
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
                  onClick={() => goToStep(getBackStep(currentStep)!)}
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

              {currentStep.type === 'question' && currentStep.options && (
                <div className="space-y-3">
                  {currentStep.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start p-4 h-auto text-left"
                      style={{
                        borderRadius: form.styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
                      }}
                       onClick={() => {
                         saveAnswer(currentStep.id, option.value);
                         goToNextStep(option.nextStep, option.actionType);
                       }}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              )}

              {currentStep.type === 'content' && (
                <div className="text-center space-y-6">
                  {/* Media Content */}
                  {currentStep.mediaUrl && (
                    <div className="mb-6">
                      {renderStepElement({
                        type: currentStep.mediaType,
                        content: currentStep.mediaUrl,
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
                    className="px-8 py-3"
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
                <form onSubmit={handleFormSubmit} className="space-y-4">
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
                        />
                      )}
                    </div>
                  ))}
                  
                  <Button 
                    type="submit"
                    className="w-full"
                    style={{
                      backgroundColor: form.styles.primary_color || '#4CAF50',
                      borderRadius: form.styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
                    }}
                  >
                    Enviar Formulário
                  </Button>
                </form>
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

              {currentStep.type === 'timer' && currentStep.timerConfig && (
                <div className="space-y-6">
                  <TimerElement
                    config={currentStep.timerConfig}
                    onExpire={(action, url) => {
                      if (action === 'redirect' && url) {
                        goToNextStep(url, 'external_url');
                      } else if (currentStep.buttonAction) {
                        goToNextStep(currentStep.buttonAction, currentStep.buttonActionType);
                      }
                    }}
                    primaryColor={form.styles.primary_color || '#4CAF50'}
                  />
                  
                  <Button
                    className="w-full"
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
            </CardContent>
          </Card>
        )}

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