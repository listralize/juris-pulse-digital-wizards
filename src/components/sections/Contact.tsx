
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

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} py-12`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-8 relative z-10">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl mb-4 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            Precisa de ajuda jurídica?
          </h2>
          <div className={`w-20 h-1 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Entre em contato para uma consulta personalizada
          </p>
        </div>
        
        <div 
          ref={contentRef} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="space-y-6">
            <div className={`p-5 rounded-lg ${isDark ? 'bg-black border-gray-800' : 'bg-white/90 border-gray-100'} border shadow-lg`}>
              <h3 className={`text-xl mb-4 font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                Por que escolher a Serafim & Trombela Advocacia?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className={`mt-1 mr-2 h-4 w-4 ${isDark ? 'text-white' : 'text-black'}`} />
                  <span>Atendimento personalizado para cada cliente</span>
                </li>
                <li className="flex items-start">
                  <Check className={`mt-1 mr-2 h-4 w-4 ${isDark ? 'text-white' : 'text-black'}`} />
                  <span>Equipe especializada em diversas áreas do direito</span>
                </li>
                <li className="flex items-start">
                  <Check className={`mt-1 mr-2 h-4 w-4 ${isDark ? 'text-white' : 'text-black'}`} />
                  <span>Comunicação clara e transparente durante todo o processo</span>
                </li>
                <li className="flex items-start">
                  <Check className={`mt-1 mr-2 h-4 w-4 ${isDark ? 'text-white' : 'text-black'}`} />
                  <span>Soluções jurídicas eficientes para seus problemas</span>
                </li>
              </ul>
            </div>
            <ContactInfo />
            <LocationMap />
          </div>
          
          <div className="relative h-auto">
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
        <div className="flex justify-center mt-10">
          <div className={`animate-bounce cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}>
            <ChevronDown size={30} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
