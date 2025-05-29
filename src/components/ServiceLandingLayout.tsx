
import React, { useEffect } from 'react';
import Navbar from './navbar';
import PageBanner from './PageBanner';
import WhatsAppButton from './WhatsAppButton';
import Footer from './sections/Footer';
import { useTheme } from './ThemeProvider';
import { Card, CardContent } from './ui/card';
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
      
      {/* Contact Form Section - At the top */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-canela mb-6 text-white">
              Pronto para Resolver sua Situação?
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Nossa equipe de especialistas está pronta para ajudar você. Entre em contato agora e dê o primeiro passo para resolver seu caso.
            </p>
          </div>
          
          <UnifiedContactForm 
            preselectedService={getServiceSelection(serviceArea)}
            darkBackground={true}
          />
        </div>
      </section>
      
      {/* Service Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-canela mb-6 text-white">
                Por que escolher nossos serviços?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-white" />
                    <div>
                      <h3 className="text-xl font-canela mb-2 text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <img 
                src={mainImage}
                alt={serviceName}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-6 p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                  <span className="text-lg font-canela text-white">
                    Consulta Gratuita
                  </span>
                </div>
                <p className="mb-4 text-gray-300">
                  Agende uma consulta gratuita para avaliar seu caso e conhecer suas opções.
                </p>
                <button 
                  onClick={() => navigate('/contato')}
                  className="w-full py-3 px-6 rounded-lg font-medium transition-colors bg-white text-black hover:bg-gray-200"
                >
                  Agendar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-canela mb-12 text-white">
            Como funciona nosso processo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="bg-black/80 border-white/20 border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-canela mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-canela mb-12 text-white">
            O que nossos clientes dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/5 border-white/20 border">
                <CardContent className="p-6">
                  <p className="mb-4 italic text-gray-300">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-medium text-white">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-canela mb-12 text-white">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <Card key={index} className="bg-black/80 border-white/20 border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-canela mb-3 text-white">
                    {item.question}
                  </h3>
                  <p className="text-gray-300">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-canela mb-8 text-white">
            Serviços Relacionados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {relatedServices.map((service, index) => (
              <Card 
                key={index}
                className="bg-white/5 border-white/20 border hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => navigate(service.path)}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <span className="text-lg font-medium text-white">
                    {service.name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card 
            className="bg-white/5 border-white/20 border hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => navigate(mainAreaPath)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <span className="text-lg font-medium text-white">
                Ver todos os serviços de {serviceArea}
              </span>
              <ArrowRight className="w-5 h-5 text-white" />
            </CardContent>
          </Card>
        </div>
      </section>
      
      <WhatsAppButton />
      <Footer respectTheme={false} />
    </div>
  );
};

export default ServiceLandingLayout;
