
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import PageBanner from './PageBanner';
import WhatsAppButton from './WhatsAppButton';
import Footer from './sections/Footer';
import { useTheme } from './ThemeProvider';
import { Card, CardContent } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { CheckCircle, ArrowRight, MessageCircle, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UnifiedContactForm from './contact/UnifiedContactForm';

interface Benefit {
  title: string;
  description: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  quote: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedService {
  name: string;
  path: string;
}

interface ServiceLandingLayoutProps {
  serviceArea: string;
  serviceName: string;
  serviceDescription: string;
  mainImage: string;
  benefits: Benefit[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  faq: FAQ[];
  relatedServices: RelatedService[];
  mainAreaPath: string;
}

const ServiceLandingLayout: React.FC<ServiceLandingLayoutProps> = ({
  serviceArea,
  serviceName,
  serviceDescription,
  mainImage,
  benefits,
  process,
  testimonials,
  faq,
  relatedServices,
  mainAreaPath
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function to determine the correct service selection
  const getServiceSelection = (area: string) => {
    const serviceMap: { [key: string]: string } = {
      'Direito da Família': 'familia',
      'Direito Tributário': 'tributario',
      'Direito Empresarial': 'empresarial',
      'Direito do Trabalho': 'trabalho',
      'Direito Constitucional': 'constitucional',
      'Direito Administrativo': 'administrativo',
      'Direito Previdenciário': 'previdenciario',
      'Direito do Consumidor': 'consumidor'
    };
    
    return serviceMap[area] || 'outro';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <PageBanner 
        title={serviceName}
        subtitle={serviceDescription}
        bgImage={mainImage}
      />
      
      {/* Service Overview with Side-by-Side Form */}
      <section className="px-6 md:px-16 lg:px-24 py-20 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Benefits Section */}
            <div>
              <h2 className="text-4xl font-canela mb-8 text-white">
                Por que escolher nossos serviços?
              </h2>
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-canela mb-3 text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:pl-8">
              <div className="sticky top-8">
                <div className="bg-black border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-canela mb-3 text-white">
                      Consulta Gratuita
                    </h3>
                    <p className="text-gray-300">
                      Agende uma consulta gratuita para avaliar seu caso e conhecer suas opções.
                    </p>
                  </div>
                  
                  <UnifiedContactForm 
                    preselectedService={getServiceSelection(serviceArea)}
                    darkBackground={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Modern Step Design */}
      <section className="px-6 md:px-16 lg:px-24 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-canela mb-16 text-white text-center">
            Como funciona nosso processo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-black border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-canela mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Connection Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-white/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 lg:px-24 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-canela mb-16 text-white text-center">
            O que nossos clientes dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black border-white/20 border hover:border-white/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl text-white/20 mb-4">"</div>
                  <p className="mb-6 italic text-gray-300 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <p className="font-medium text-white">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Modern Accordion */}
      <section className="px-6 md:px-16 lg:px-24 py-20 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-canela mb-16 text-white text-center">
            Perguntas Frequentes
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-black border border-white/20 rounded-xl px-6 hover:border-white/40 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-canela text-white hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Services - Compact Modern Design */}
      <section className="px-6 md:px-16 lg:px-24 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-canela mb-12 text-white text-center">
            Serviços Relacionados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {relatedServices.map((service, index) => (
              <div
                key={index}
                className="group bg-black border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(service.path)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-white group-hover:text-gray-200 transition-colors">
                    {service.name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
          
          <div
            className="group bg-black border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(mainAreaPath)}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-white group-hover:text-gray-200 transition-colors">
                Ver todos os serviços de {serviceArea}
              </span>
              <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </section>
      
      <WhatsAppButton />
      <Footer respectTheme={false} />
    </div>
  );
};

export default ServiceLandingLayout;
