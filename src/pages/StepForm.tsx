import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

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
  is_active: boolean;
}

interface StepFormStep {
  id: string;
  title: string;
  description?: string;
  type: 'question' | 'form';
  options?: Array<{
    text: string;
    value: string;
    nextStep?: string;
  }>;
  formFields?: Array<{
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;
  backStep?: string;
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
        seo: (data.seo as unknown) as any
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

  const goToNextStep = (nextStepId?: string) => {
    if (nextStepId) {
      // Se é um URL externo, redireciona
      if (nextStepId.startsWith('http')) {
        window.location.href = nextStepId;
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
    
    if (!form?.webhook_url) {
      toast.error('Webhook não configurado');
      return;
    }

    try {
      const allData = { ...answers, ...formData };
      
      const response = await fetch(form.webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allData),
      });

      if (response.ok) {
        toast.success('Formulário enviado com sucesso!');
        // Aqui você pode redirecionar para uma página de sucesso
        // navigate('/obrigado');
      } else {
        throw new Error('Erro ao enviar formulário');
      }
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
                        goToNextStep(option.nextStep);
                      }}
                    >
                      {option.text}
                    </Button>
                  ))}
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
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-8 opacity-60">
          <p>Atendemos todo o Brasil ✅</p>
        </div>
      </div>
    </div>
  );
};

export default StepForm;