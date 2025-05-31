
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

import UnifiedContactForm from '../contact/UnifiedContactForm';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} pt-32 pb-24 transition-colors duration-500`}
      style={{ paddingTop: '140px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 relative z-10">
          <h2 className={`text-3xl md:text-4xl font-canela overflow-visible ${isDark ? 'text-white' : 'text-black'}`}>
            Precisa de ajuda jurídica?
          </h2>
          <div className={`w-20 h-1 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
          <p className={`mt-2 text-base ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Entre em contato para uma consulta personalizada
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 overflow-visible"
        >
          {/* Map and Contact info stacked - left side (smaller) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Map - smaller and horizontal */}
            <div className="w-full">
              <div className="h-64 lg:h-72">
                <LocationMap />
              </div>
            </div>
            
            {/* Contact info - smaller */}
            <div className="w-full">
              <ContactInfo />
            </div>
          </div>
          
          {/* Contact form - larger and more prominent */}
          <div className="lg:col-span-3">
            <UnifiedContactForm />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-8 mb-6 animate-bounce cursor-pointer" onClick={scrollToNext}>
          <ChevronDown size={24} className={`${isDark ? 'text-white/50' : 'text-black/50'}`} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
