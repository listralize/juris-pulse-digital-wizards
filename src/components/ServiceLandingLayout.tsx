import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageCircle, CheckCircle, Clock, Users, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import Navbar from './navbar';
import Footer from './sections/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceLandingLayoutProps {
  title: string;
  description: string;
  category: string;
  benefits?: Benefit[];
  processSteps?: ProcessStep[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  whatsappNumber?: string;
}

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  title: string;
  image: string;
  content: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const defaultBenefits: Benefit[] = [
  { id: 1, title: 'Expertise Jurídica', description: 'Profissionais altamente qualificados.', icon: <Award size={32} /> },
  { id: 2, title: 'Atendimento Personalizado', description: 'Soluções sob medida para cada cliente.', icon: <Users size={32} /> },
  { id: 3, title: 'Resultados Comprovados', description: 'Histórico de sucesso em diversas áreas do direito.', icon: <CheckCircle size={32} /> }
];

const defaultProcessSteps: ProcessStep[] = [
  { id: 1, title: 'Consulta Inicial', description: 'Entendemos suas necessidades e objetivos.' },
  { id: 2, title: 'Análise Detalhada', description: 'Analisamos o caso e definimos a estratégia.' },
  { id: 3, title: 'Execução Estratégica', description: 'Implementamos a solução de forma eficiente.' }
];

const defaultTestimonials: Testimonial[] = [];

const defaultFAQs: FAQ[] = [
  { id: 1, question: 'Como agendar uma consulta?', answer: 'Entre em contato por telefone ou WhatsApp.' },
  { id: 2, question: 'Quais áreas do direito vocês atendem?', answer: 'Atuamos em diversas áreas, como cível, empresarial e tributário.' }
];

const ServiceLandingLayout: React.FC<ServiceLandingLayoutProps> = ({
  title,
  description,
  category,
  benefits = defaultBenefits,
  processSteps = defaultProcessSteps,
  testimonials = defaultTestimonials,
  faqs = defaultFAQs,
  whatsappNumber = '5562994594496'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const benefitsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const benefitsPosition = benefitsRef.current?.offsetTop || 0;
      const processPosition = processRef.current?.offsetTop || 0;
      const testimonialsPosition = testimonialsRef.current?.offsetTop || 0;
      const faqPosition = faqRef.current?.offsetTop || 0;
      const ctaPosition = ctaRef.current?.offsetTop || 0;

      const scrollPosition = window.scrollY + 150;

      if (scrollPosition >= benefitsPosition && scrollPosition < processPosition) {
        // console.log('Scrolling through Benefits Section');
      } else if (scrollPosition >= processPosition && scrollPosition < testimonialsPosition) {
        // console.log('Scrolling through Process Section');
      } else if (scrollPosition >= testimonialsPosition && scrollPosition < faqPosition) {
        // console.log('Scrolling through Testimonials Section');
      } else if (scrollPosition >= faqPosition && scrollPosition < ctaPosition) {
        // console.log('Scrolling through FAQ Section');
      } else if (scrollPosition >= ctaPosition) {
        // console.log('Scrolling through CTA Section');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre ${title}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      <Navbar />
      
      <div className="pt-20">
        {/* Header Hero Section */}
        <div className={`relative ${isDark ? 'bg-gradient-to-b from-black via-black/95 to-black' : 'bg-gradient-to-b from-white via-white/95 to-white'} py-16 md:py-24`}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 mb-6 ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar</span>
            </button>
            
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              {title}
            </h1>
            <p className={`text-lg md:text-xl max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {description}
            </p>
            
            <div className="mt-8">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className={`group font-satoshi text-lg px-8 py-6 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section ref={benefitsRef} className={`py-16 ${isDark ? 'bg-black/50' : 'bg-white/50'}`}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className={`text-2xl md:text-3xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
              Nossos Benefícios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="p-6 rounded-lg shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    {benefit.icon && <div className="text-blue-500">{benefit.icon}</div>}
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{benefit.title}</h3>
                  </div>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className={`py-16 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className={`text-2xl md:text-3xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
              Nosso Processo
            </h2>
            <div className="space-y-6">
              {processSteps.map((step) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {step.id}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{step.title}</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section ref={testimonialsRef} className={`py-16 ${isDark ? 'bg-black/50' : 'bg-white/50'}`}>
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
              <h2 className={`text-2xl md:text-3xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
                Depoimentos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{testimonial.name}</h3>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{testimonial.title}</p>
                      </div>
                    </div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section ref={faqRef} className={`py-16 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
              <h2 className={`text-2xl md:text-3xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
                Perguntas Frequentes
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="rounded-lg shadow-md overflow-hidden">
                    <button
                      className={`flex items-center justify-between w-full p-4 ${isDark ? 'bg-black/50 text-white hover:bg-black/70' : 'bg-white text-black hover:bg-gray-100'} transition-colors`}
                      onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                    >
                      <span className="font-semibold">{faq.question}</span>
                      {activeFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {activeFaq === faq.id && (
                      <div className={`p-4 ${isDark ? 'bg-black/80 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section ref={ctaRef} id="contact-form" className={`py-16 ${isDark ? 'bg-gradient-to-b from-black/50 to-black' : 'bg-gradient-to-b from-white/50 to-white'}`}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className={`text-3xl md:text-4xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
              Entre em Contato
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Estamos prontos para entender suas necessidades e oferecer as melhores soluções jurídicas.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className={`group font-satoshi text-lg px-8 py-6 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              <Mail className="mr-2 h-5 w-5" />
              Enviar Mensagem
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceLandingLayout;
