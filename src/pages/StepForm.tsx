import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SocialProofElement } from '@/components/StepFormElements';
import { StepFormTestimonials } from '@/components/StepFormTestimonials';
import { StepFormLoader } from '@/components/StepFormLoader';
import { useStepForm } from '@/hooks/useStepForm';
import { StepFormHeader } from '@/components/stepform/StepFormHeader';
import { StepQuestion } from '@/components/stepform/StepQuestion';
import { StepContent } from '@/components/stepform/StepContent';
import { StepFormFields } from '@/components/stepform/StepFormFields';
import { StepOffer } from '@/components/stepform/StepOffer';
import { StepFormFooter } from '@/components/stepform/StepFormFooter';

const StepForm: React.FC = () => {
  const {
    form, currentStep, formData, setFormData, loading, progress,
    canGoBack, saveAnswer, goToNextStep, goBack, handleFormSubmit
  } = useStepForm();

  if (loading) {
    return <StepFormLoader title="Carregando seu formulário..." message="Estamos preparando tudo para você. Aguarde alguns instantes..." />;
  }

  if (!form) {
    return <StepFormLoader title="Formulário não encontrado" message="Não foi possível carregar este formulário. Verifique o link ou tente novamente." />;
  }

  return (
    <div
      className="min-h-screen py-8 px-4 overflow-hidden pb-24"
      style={{ backgroundColor: form.styles.background_color || '#ffffff', color: form.styles.text_color || '#000000' }}
    >
      <div className="max-w-2xl mx-auto w-full">
        <StepFormHeader form={form} progress={progress} />

        {currentStep && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {canGoBack && (
                <Button variant="ghost" onClick={goBack} className="mb-4 p-0 h-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                </Button>
              )}

              <h2 className="text-2xl font-bold mb-4">{currentStep.title}</h2>
              {currentStep.description && <p className="text-muted-foreground mb-6">{currentStep.description}</p>}

              {currentStep.type === 'question' && (
                <StepQuestion step={currentStep} styles={form.styles} onAnswer={saveAnswer} onNext={goToNextStep} />
              )}

              {currentStep.type === 'content' && (
                <StepContent step={currentStep} styles={form.styles} onNext={goToNextStep} />
              )}

              {currentStep.type === 'form' && (
                <StepFormFields
                  step={currentStep} styles={form.styles} formData={formData}
                  setFormData={setFormData} loading={loading} onSubmit={handleFormSubmit}
                />
              )}

              {currentStep.socialProofConfig && ((currentStep.socialProofConfig as any).enabled ?? true) &&
                (currentStep.socialProofConfig.testimonials?.length || currentStep.socialProofConfig.stats?.length) && (
                <div className="mt-6">
                  <SocialProofElement config={currentStep.socialProofConfig} primaryColor={form.styles.primary_color || '#4CAF50'} />
                </div>
              )}

              {currentStep.type === 'offer' && (
                <StepOffer step={currentStep} styles={form.styles} onNext={goToNextStep} />
              )}
            </CardContent>
          </Card>
        )}

        <StepFormTestimonials
          formId={form.slug}
          config={(form.seo_config as any)?.social_proof?.enabled ? (form.seo_config as any)?.social_proof : undefined}
        />

        <StepFormFooter footerConfig={form.footer_config} />
      </div>
    </div>
  );
};

export default StepForm;
