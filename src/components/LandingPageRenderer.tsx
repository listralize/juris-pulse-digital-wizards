
import React, { useState } from 'react';
import { LandingPage, FormStep } from '../types/adminTypes';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { toast } from 'sonner';

interface LandingPageRendererProps {
  page: LandingPage;
}

export const LandingPageRenderer: React.FC<LandingPageRendererProps> = ({ page }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormField = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const nextStep = () => {
    if (currentStep < page.formSteps.length - 1) {
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
      if (page.webhookUrl) {
        await fetch(page.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            page_slug: page.slug,
            page_title: page.title
          }),
        });
      }

      // Salvar dados localmente
      const submissions = JSON.parse(localStorage.getItem('landingPageSubmissions') || '[]');
      submissions.push({
        id: Date.now().toString(),
        pageSlug: page.slug,
        pageTitle: page.title,
        data: formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('landingPageSubmissions', JSON.stringify(submissions));

      toast.success('Formulário enviado com sucesso!');

      // Redirecionar se configurado
      if (page.redirectUrl) {
        window.location.href = page.redirectUrl;
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao enviar formulário. Tente novamente.');
    }
    
    setIsSubmitting(false);
  };

  const renderFormField = (field: any, stepId: string) => {
    const fieldId = `${stepId}-${field.id}`;
    const value = formData[fieldId] || '';

    switch (field.type) {
      case 'email':
        return (
          <Input
            type="email"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        );
      case 'phone':
        return (
          <Input
            type="tel"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        );
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={4}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => updateFormField(fieldId, val)}>
            <SelectTrigger className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={fieldId}
              checked={value}
              onCheckedChange={(checked) => updateFormField(fieldId, checked)}
            />
            <label htmlFor={fieldId} className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              {field.label}
            </label>
          </div>
        );
      default:
        return (
          <Input
            type="text"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        {page.heroImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${page.heroImage})` }}
          />
        )}
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {page.heroTitle}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {page.heroSubtitle}
          </p>
          <Button 
            size="lg"
            onClick={() => {
              if (page.hasForm) {
                document.getElementById('landing-form')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.open(page.ctaButtonLink, '_blank');
              }
            }}
          >
            {page.ctaButtonText}
          </Button>
        </div>
      </div>

      {/* Seções */}
      {page.sections.map((section) => (
        <div key={section.id} className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {section.type === 'text' && (
              <div className="text-center">
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                  {section.title}
                </h2>
                <div className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {section.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
            {section.type === 'image' && (
              <div className="text-center">
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                  {section.title}
                </h2>
                {section.image && (
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="mx-auto max-w-full h-auto rounded-lg shadow-lg mb-6"
                  />
                )}
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {section.content}
                </p>
              </div>
            )}
            
            {section.type === 'cta' && (
              <Card className={`${isDark ? 'bg-black/50 border-white/20' : 'bg-gray-50 border-gray-200'}`}>
                <CardContent className="p-8 text-center">
                  <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                    {section.title}
                  </h2>
                  <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {section.content}
                  </p>
                  {section.image && (
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="mx-auto max-w-sm h-auto rounded-lg mb-6"
                    />
                  )}
                  <Button 
                    size="lg"
                    onClick={() => window.open(section.buttonLink, '_blank')}
                  >
                    {section.buttonText}
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {section.type === 'testimonial' && (
              <Card className={`${isDark ? 'bg-black/50 border-white/20' : 'bg-gray-50 border-gray-200'}`}>
                <CardContent className="p-8 text-center">
                  <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                    {section.title}
                  </h2>
                  <blockquote className={`text-xl italic mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    "{section.content}"
                  </blockquote>
                  {section.image && (
                    <img 
                      src={section.image} 
                      alt="Depoimento"
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                    />
                  )}
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {section.buttonText || 'Cliente'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ))}

      {/* Formulário por Steps */}
      {page.hasForm && page.formSteps.length > 0 && (
        <div id="landing-form" className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`text-center ${isDark ? 'text-white' : 'text-black'}`}>
                  {page.formSteps[currentStep]?.title}
                </CardTitle>
                <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {page.formSteps[currentStep]?.description}
                </p>
                <div className="flex justify-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Etapa {currentStep + 1} de {page.formSteps.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {page.formSteps[currentStep]?.fields.map((field) => (
                  <div key={field.id}>
                    {field.type !== 'checkbox' && (
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                    )}
                    {renderFormField(field, page.formSteps[currentStep].id)}
                  </div>
                ))}
                
                <div className="flex justify-between pt-6">
                  <Button 
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  
                  {currentStep === page.formSteps.length - 1 ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </Button>
                  ) : (
                    <Button onClick={nextStep}>
                      Próximo
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
