
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Loader, ChevronDown } from 'lucide-react';

import ContactForm from '../contact/ContactForm';
import SuccessMessage from '../contact/SuccessMessage';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmitSuccess = () => {
    setIsSuccess(true);
    setIsSubmitting(false);
  };
  
  const resetForm = () => {
    setIsSuccess(false);
  };
  
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  const scrollToNext = () => {
    if (window) {
      window.scrollBy({
        top: window.innerHeight * 0.5,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`w-full ${isDark ? 'bg-black text-neutral-200' : 'bg-white text-black'} py-6 pb-16`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-4 relative z-10">
          <h2 className={`text-2xl md:text-3xl mb-2 font-canela ${isDark ? 'text-neutral-200' : 'text-black'}`}>
            Precisa de ajuda jurídica?
          </h2>
          <div className={`w-20 h-1 ${isDark ? 'bg-neutral-400' : 'bg-black'}`}></div>
          <p className={`mt-2 text-sm ${isDark ? 'text-neutral-400' : 'text-gray-700'}`}>
            Entre em contato para uma consulta personalizada
          </p>
        </div>
        
        <div 
          ref={contentRef} 
          className="grid grid-cols-1 lg:grid-cols-12 gap-3"
        >
          <div className="lg:col-span-5 space-y-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white/90 border-gray-100'} border shadow-lg`}>
              <h3 className={`text-base mb-2 font-medium ${isDark ? 'text-neutral-200' : 'text-black'}`}>
                Por que escolher a Serafim & Trombela Advocacia?
              </h3>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start">
                  <Check className={`mt-0.5 mr-1.5 h-3.5 w-3.5 ${isDark ? 'text-neutral-400' : 'text-black'}`} />
                  <span>Atendimento personalizado para cada cliente</span>
                </li>
                <li className="flex items-start">
                  <Check className={`mt-0.5 mr-1.5 h-3.5 w-3.5 ${isDark ? 'text-neutral-400' : 'text-black'}`} />
                  <span>Equipe especializada em diversas áreas do direito</span>
                </li>
                <li className="flex items-start">
                  <Check className={`mt-0.5 mr-1.5 h-3.5 w-3.5 ${isDark ? 'text-neutral-400' : 'text-black'}`} />
                  <span>Comunicação clara e transparente durante todo o processo</span>
                </li>
                <li className="flex items-start">
                  <Check className={`mt-0.5 mr-1.5 h-3.5 w-3.5 ${isDark ? 'text-neutral-400' : 'text-black'}`} />
                  <span>Soluções jurídicas eficientes para seus problemas</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ContactInfo />
              <LocationMap />
            </div>
          </div>
          
          <div className="lg:col-span-7">
            {!isSuccess ? (
              <ContactForm 
                onSubmitSuccess={handleSubmitSuccess} 
                isSubmitting={isSubmitting} 
              />
            ) : (
              <SuccessMessage onNewMessage={resetForm} onReset={resetForm} />
            )}
          </div>
        </div>
        
        {/* Indicador de rolagem */}
        <div className="flex justify-center mt-6 animate-bounce cursor-pointer" onClick={scrollToNext}>
          <ChevronDown size={24} className={isDark ? 'text-neutral-400' : 'text-black'} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
