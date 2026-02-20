import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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

// Inject dynamic SEO meta tags from form config
const useStepFormSEO = (form: any, slug?: string) => {
  useEffect(() => {
    if (!form) return;

    const seoConfig = form.seo_config as any;
    const seo = form.seo as any;

    // Title
    const title = seoConfig?.meta_title || seo?.meta_title || form.title || 'Formulário';
    document.title = title;

    // Helper to set/create meta tags
    const setMeta = (name: string, content: string, property?: boolean) => {
      if (!content) return;
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const description = seoConfig?.meta_description || seo?.meta_description || '';
    const keywords = seoConfig?.meta_keywords || '';

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', window.location.href, true);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + '/formulario/' + (slug || '');

    // JSON-LD
    let jsonLd = document.querySelector('script[data-stepform-jsonld]') as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      jsonLd.setAttribute('data-stepform-jsonld', 'true');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: form.name || form.title,
      description: description,
      url: window.location.href,
      areaServed: { '@type': 'Country', name: 'Brazil' },
      serviceType: form.name || 'Consultoria Jurídica'
    });

    return () => {
      // Cleanup JSON-LD on unmount
      jsonLd?.remove();
    };
  }, [form, slug]);
};

const StepForm: React.FC = () => {
  const {
    slug, form, currentStep, currentStepId, formData, setFormData, loading, progress,
    canGoBack, saveAnswer, goToNextStep, goBack, handleFormSubmit
  } = useStepForm();

  useStepFormSEO(form, slug);

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
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              {canGoBack && (
                <Button variant="ghost" onClick={goBack} className="mb-4 p-0 h-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                </Button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepId}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
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
                </motion.div>
              </AnimatePresence>
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
