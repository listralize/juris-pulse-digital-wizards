
import React, { useEffect } from 'react';
import Navbar from './navbar';
import PageBanner from './PageBanner';
import WhatsAppButton from './WhatsAppButton';
import Footer from './sections/Footer';
import { useTheme } from './ThemeProvider';
import CtaSection from './serviceLanding/CtaSection';
import { Card, CardContent } from './ui/card';
import { CheckCircle, ArrowRight, MessageCircle, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      
      <PageBanner 
        title={serviceName}
        subtitle={serviceDescription}
        bgImage={mainImage}
      />
      
      {/* Service Overview */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-canela mb-6 text-left ${isDark ? 'text-white' : 'text-black'}`}>
                Por que escolher nossos serviços?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`text-xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        {benefit.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-left">
              <img 
                src={mainImage}
                alt={serviceName}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className={`mt-6 p-6 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className="flex items-center space-x-4 mb-4">
                  <MessageCircle className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
                  <span className={`text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                    Consulta Gratuita
                  </span>
                </div>
                <p className={`mb-4 text-left ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Agende uma consulta gratuita para avaliar seu caso e conhecer suas opções.
                </p>
                <button 
                  onClick={() => navigate('/contato')}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    isDark 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  Agendar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-canela mb-12 text-left ${isDark ? 'text-white' : 'text-black'}`}>
            Como funciona nosso processo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <Card key={index} className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-white text-black' : 'bg-black text-white'} flex items-center justify-center font-bold text-lg mb-4`}>
                    {step.step}
                  </div>
                  <h3 className={`text-xl font-canela mb-3 text-left ${isDark ? 'text-white' : 'text-black'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-left ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-canela mb-12 text-left ${isDark ? 'text-white' : 'text-black'}`}>
            O que nossos clientes dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border`}>
                <CardContent className="p-6">
                  <p className={`mb-4 italic text-left ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{testimonial.quote}"
                  </p>
                  <p className={`font-medium text-left ${isDark ? 'text-white' : 'text-black'}`}>
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-canela mb-12 text-left ${isDark ? 'text-white' : 'text-black'}`}>
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <Card key={index} className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border`}>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-canela mb-3 text-left ${isDark ? 'text-white' : 'text-black'}`}>
                    {item.question}
                  </h3>
                  <p className={`text-left ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-canela mb-8 text-left ${isDark ? 'text-white' : 'text-black'}`}>
            Serviços Relacionados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {relatedServices.map((service, index) => (
              <Card 
                key={index}
                className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border hover:${isDark ? 'bg-white/10' : 'bg-black/10'} transition-colors cursor-pointer`}
                onClick={() => navigate(service.path)}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <span className={`text-lg font-medium text-left ${isDark ? 'text-white' : 'text-black'}`}>
                    {service.name}
                  </span>
                  <ArrowRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card 
            className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border hover:${isDark ? 'bg-white/10' : 'bg-black/10'} transition-colors cursor-pointer`}
            onClick={() => navigate(mainAreaPath)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <span className={`text-lg font-medium text-left ${isDark ? 'text-white' : 'text-black'}`}>
                Ver todos os serviços de {serviceArea}
              </span>
              <ArrowRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
            </CardContent>
          </Card>
        </div>
      </section>
      
      <CtaSection serviceArea={serviceArea} respectTheme={true} />
      
      <WhatsAppButton />
      <Footer respectTheme={true} />
    </div>
  );
};

export default ServiceLandingLayout;
