
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
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
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
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} py-4 pb-16 transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-2 relative z-10">
          <h2 className={`text-2xl md:text-3xl font-canela ${isDark ? 'text-white' : 'text-black'} overflow-visible`}>
            Precisa de ajuda jurídica?
          </h2>
          <div className={`w-20 h-1 ${isDark ? 'bg-white/70' : 'bg-black'}`}></div>
          <p className={`mt-2 text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
            Entre em contato para uma consulta personalizada
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className="grid grid-cols-12 gap-3 overflow-visible"
        >
          {/* Left side - Contact info */}
          <div className="col-span-12 md:col-span-3">
            <div className="grid grid-cols-1 gap-3">
              <ContactInfo />
              
              <div className={`p-3 rounded-lg ${isDark ? 'glass-card text-white' : 'bg-white/90 border-gray-100 border shadow-lg'}`}>
                <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  Por que escolher a Serafim & Trombela Advocacia?
                </h3>
                <ul className="space-y-1.5 text-xs mt-2">
                  <li className="flex items-start">
                    <Check className={`mt-0.5 mr-1.5 h-3.5 w-3.5 ${isDark ? 'text-white/70' : 'text-black'}`} />
                    <span>Atendimento personalizado para cada cliente</span>
                  </li>
                  <li className="flex items-start">
                    <Check className={`mt-0.5 mr-1.5 h-3.5 w-3.5 ${isDark ? 'text-white/70' : 'text-black'}`} />
                    <span>Equipe especializada em diversas áreas do direito</span>
                  </li>
                  <li className="flex items-start">
                    <Check className={`mt-0.5 mr-1.5 h-3.5 w-3.5 ${isDark ? 'text-white/70' : 'text-black'}`} />
                    <span>Comunicação clara e transparente durante todo o processo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Middle - Map */}
          <div className="col-span-12 md:col-span-4 h-64 md:h-auto">
            <LocationMap />
          </div>
          
          {/* Right - Contact form */}
          <div className="col-span-12 md:col-span-5">
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
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-3 animate-bounce cursor-pointer" onClick={scrollToNext}>
          <ChevronDown size={20} className={isDark ? 'text-white/50' : 'text-black'} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
