
import React, { useState } from 'react';
import { FormStep } from '../../types/adminTypes';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import FormStepControls from './FormStepControls';
import FormField from './FormField';

interface LandingFormProps {
  formSteps: FormStep[];
  webhookUrl?: string;
  redirectUrl?: string;
  pageSlug: string;
  pageTitle: string;
  isDark: boolean;
}

const LandingForm: React.FC<LandingFormProps> = ({
  formSteps,
  webhookUrl,
  redirectUrl,
  pageSlug,
  pageTitle,
  isDark
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormField = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Enviar para webhook se configurado
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            page_slug: pageSlug,
            page_title: pageTitle
          }),
        });
      }

      // Salvar dados localmente
      const submissions = JSON.parse(localStorage.getItem('landingPageSubmissions') || '[]');
      submissions.push({
        id: Date.now().toString(),
        pageSlug,
        pageTitle,
        data: formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('landingPageSubmissions', JSON.stringify(submissions));

      toast.success('Formulário enviado com sucesso!');

      // Redirecionar se configurado
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao enviar formulário. Tente novamente.');
    }
    
    setIsSubmitting(false);
  };

  const currentFormStep = formSteps[currentStep];

  return (
    <div id="landing-form" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`text-center ${isDark ? 'text-white' : 'text-black'}`}>
              {currentFormStep?.title}
            </CardTitle>
            <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentFormStep?.description}
            </p>
            <div className="flex justify-center">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Etapa {currentStep + 1} de {formSteps.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentFormStep?.fields.map((field) => (
              <FormField 
                key={field.id}
                field={field}
                stepId={currentFormStep.id}
                formData={formData}
                updateFormField={updateFormField}
                isDark={isDark}
              />
            ))}
            
            <FormStepControls
              currentStep={currentStep}
              totalSteps={formSteps.length}
              isSubmitting={isSubmitting}
              onPrevStep={prevStep}
              onNextStep={nextStep}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingForm;
