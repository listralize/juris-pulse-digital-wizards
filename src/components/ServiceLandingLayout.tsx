
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './navbar';
import { Footer } from './sections';
import WhatsAppButton from './WhatsAppButton';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceLandingLayoutProps {
  serviceArea: string;
  serviceName: string;
  serviceDescription: string;
  mainImage: string;
  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];
  process: {
    title: string;
    description: string;
    step: number;
  }[];
  testimonials: {
    name: string;
    quote: string;
    image?: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedServices?: {
    name: string;
    path: string;
  }[];
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
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // Hero section animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
    
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.4 }
    );
    
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
    );
    
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.8 }
    );
    
    // Clean up animations
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  const handleContactClick = () => {
    window.location.href = "https://api.whatsapp.com/send?phone=5562994594496&text=Olá! Tenho interesse em consultar sobre " + serviceName;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className={`px-6 md:px-16 lg:px-24 py-4 ${isDark ? 'bg-black/80 text-white/80' : 'bg-white/80 text-black/80'} border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="max-w-6xl mx-auto flex items-center text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to={mainAreaPath} className="hover:underline">{serviceArea}</Link>
          <span className="mx-2">/</span>
          <span>{serviceName}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black' : 'bg-[#f9f9f9]'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
              {serviceArea}
            </div>
            
            <h1 ref={titleRef} className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              {serviceName}
            </h1>
            
            <p ref={descriptionRef} className={`text-lg md:text-xl mb-8 font-satoshi ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {serviceDescription}
            </p>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleContactClick}
                className={`px-8 py-6 text-base ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                Fale com um Especialista <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate(mainAreaPath)}
                className={`px-8 py-6 text-base ${isDark 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-black/20 text-black hover:bg-black/10'}`}
              >
                Saiba mais sobre {serviceArea}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <img 
              ref={imageRef}
              src={mainImage} 
              alt={serviceName}
              className={`rounded-xl shadow-lg max-h-[500px] w-auto ${isDark ? 'shadow-white/5' : 'shadow-black/10'}`}
            />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black/80' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-canela mb-12 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            Benefícios e Vantagens
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-gray-50 border border-black/5'} hover:transform hover:scale-105 transition-transform duration-300`}
              >
                {benefit.icon && <div className="text-2xl mb-4">{benefit.icon}</div>}
                <h3 className={`text-xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{benefit.title}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-canela mb-12 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            Como Funciona o Processo
          </h2>
          
          <div className="space-y-12">
            {process.map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row gap-6 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${isDark 
                    ? 'bg-white text-black' 
                    : 'bg-black text-white'}`}>
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className={`text-2xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                    {step.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black/80' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-canela mb-12 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            O que Nossos Clientes Dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-gray-50 border border-black/5'}`}
              >
                <div className="text-3xl mb-4">"</div>
                <p className={`italic mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  {testimonial.image && (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  )}
                  <span className="font-medium">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-canela mb-12 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-black/5'}`}
              >
                <h3 className={`text-xl font-medium mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  {item.question}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black/90' : 'bg-black text-white'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-canela mb-6 text-white">
            Pronto para Resolver sua Situação?
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Nossa equipe de especialistas está pronta para ajudar você. Entre em contato agora e dê o primeiro passo para resolver seu caso.
          </p>
          
          <Button 
            onClick={handleContactClick}
            className="px-8 py-6 text-base bg-white text-black hover:bg-gray-200"
          >
            Agendar Consulta Gratuita <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl md:text-3xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
              Serviços Relacionados
            </h2>
            
            <div className="flex flex-wrap gap-4">
              {relatedServices.map((service, index) => (
                <Link 
                  key={index}
                  to={service.path}
                  className={`px-4 py-2 rounded-full transition-all ${isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-black/5 hover:bg-black/10 text-black'}`}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default ServiceLandingLayout;
