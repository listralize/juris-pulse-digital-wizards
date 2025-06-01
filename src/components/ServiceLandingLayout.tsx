
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import UnifiedContactForm from './contact/UnifiedContactForm';
import { useServicePageData } from '../hooks/useServicePageData';

gsap.registerPlugin(ScrollTrigger);

interface ServiceLandingLayoutProps {
  serviceId?: string; // ID da página de serviço - opcional para compatibilidade
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
  serviceId,
  serviceArea,
  serviceName,
  serviceDescription,
  mainImage,
  benefits: defaultBenefits,
  process: defaultProcess,
  testimonials: defaultTestimonials,
  faq: defaultFaq,
  relatedServices,
  mainAreaPath
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  // Buscar dados editados do admin apenas se serviceId for fornecido
  const { servicePage, isLoading } = useServicePageData(serviceId);
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Usar dados do admin se disponíveis, senão usar os padrão
  const finalTitle = servicePage?.title || serviceName;
  const finalDescription = servicePage?.description || serviceDescription;
  const finalBenefits = servicePage?.benefits?.length ? servicePage.benefits : defaultBenefits;
  const finalProcess = servicePage?.process?.length ? servicePage.process : defaultProcess;
  const finalTestimonials = servicePage?.testimonials?.length ? servicePage.testimonials : defaultTestimonials;
  const finalFaq = servicePage?.faq?.length ? servicePage.faq : defaultFaq;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
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
    
    // Clean up animations
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  if (isLoading && serviceId) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

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
          <span>{finalTitle}</span>
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
              {finalTitle}
            </h1>
            
            <p ref={descriptionRef} className={`text-lg md:text-xl mb-8 font-satoshi ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {finalDescription}
            </p>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate(mainAreaPath)}
                className={`px-5 py-5 text-base ${isDark 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-black/20 text-black hover:bg-black/10'} transition-all`}
              >
                Ver mais serviços
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <UnifiedContactForm 
              preselectedService={serviceArea.toLowerCase().includes('tributario') ? 'tributario' : 
                serviceArea.toLowerCase().includes('familia') ? 'familia' : 
                serviceArea.toLowerCase().includes('empresarial') ? 'empresarial' : 
                serviceArea.toLowerCase().includes('trabalho') ? 'trabalho' : 
                serviceArea.toLowerCase().includes('constitucional') ? 'constitucional' : 
                serviceArea.toLowerCase().includes('administrativo') ? 'administrativo' : 
                serviceArea.toLowerCase().includes('previdenciario') ? 'previdenciario' : 
                serviceArea.toLowerCase().includes('consumidor') ? 'consumidor' : 'outro'
              }
              darkBackground={isDark}
            />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black/80' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-canela mb-4 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            Benefícios e Vantagens
          </h2>
          
          <p className={`text-lg max-w-3xl mx-auto text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Nossa assessoria jurídica proporciona diversos benefícios para você
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {finalBenefits.map((benefit, index) => (
              <div 
                key={index}
                className={`p-8 rounded-xl ${isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-black/5 border border-black/5'} 
                  hover:transform hover:scale-105 transition-all duration-300 
                  backdrop-blur-sm shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  isDark ? 'bg-white/10' : 'bg-black/5'
                }`}>
                  {benefit.icon ? (
                    <div className="text-2xl">{benefit.icon}</div>
                  ) : (
                    <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                
                <h3 className={`text-xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  {benefit.title}
                </h3>
                
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-canela mb-4 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            Como Funciona o Processo
          </h2>
          
          <p className={`text-lg max-w-3xl mx-auto text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Entenda o passo a passo de como trabalhamos para resolver seu caso
          </p>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-[26px] md:left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-20 hidden md:block"></div>
            
            <div className="space-y-16">
              {finalProcess.map((step, index) => (
                <div 
                  key={index}
                  className="relative"
                >
                  <div className={`flex flex-col md:flex-row md:items-center gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                    <div className="md:w-1/2 flex md:justify-center">
                      <div className={`flex flex-row md:flex-col items-center gap-6 ${
                        index % 2 === 0 ? 'md:items-end text-left' : 'md:items-start text-right'
                      }`}>
                        <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold z-10 
                          ${isDark ? 'bg-white text-black' : 'bg-black text-white'} shadow-lg`}
                        >
                          {step.step}
                        </div>
                        
                        <div className={`flex-1 md:flex-initial`}>
                          <h3 className={`text-2xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className={`p-8 rounded-xl ${isDark 
                        ? 'bg-white/5 border border-white/10' 
                        : 'bg-white border border-black/5'} shadow-md`}>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${isDark ? 'bg-black/80' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-canela mb-4 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            O que Nossos Clientes Dizem
          </h2>
          
          <p className={`text-lg max-w-3xl mx-auto text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Histórias de sucesso compartilhadas por quem confiou em nossos serviços
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {finalTestimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`p-8 rounded-xl ${isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-gray-50 border border-black/5'} shadow-lg`}
              >
                <div className={`text-4xl mb-6 font-serif ${isDark ? 'text-white/40' : 'text-black/40'}`}>"</div>
                <p className={`italic mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      isDark ? 'bg-white/10' : 'bg-black/5'
                    }`}>
                      <span className={`text-xl font-bold ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
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
          <h2 className={`text-3xl md:text-4xl font-canela mb-4 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            Perguntas Frequentes
          </h2>
          
          <p className={`text-lg max-w-3xl mx-auto text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Respostas para as dúvidas mais comuns sobre nossos serviços
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            {finalFaq.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className={`border-0 rounded-xl ${isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-black/5'} shadow-sm overflow-hidden`}
              >
                <AccordionTrigger 
                  className={`p-6 ${isDark ? 'hover:text-white' : 'hover:text-black'} no-underline hover:no-underline`}
                >
                  <span className={`text-xl font-medium text-left ${isDark ? 'text-white' : 'text-black'}`}>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl md:text-3xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Serviços Relacionados
            </h2>
            
            <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Explore outros serviços que podem ser de seu interesse
            </p>
            
            <div className="flex flex-wrap gap-4">
              {relatedServices.map((service, index) => (
                <Link 
                  key={index}
                  to={service.path}
                  className={`px-5 py-3 rounded-full transition-all ${isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-black/5 hover:bg-black/10 text-black'} hover:shadow-md`}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <WhatsAppButton />
      <Footer respectTheme={true} />
    </div>
  );
};

export default ServiceLandingLayout;
