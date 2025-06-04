
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import UnifiedContactForm from '../contact/UnifiedContactForm';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { pageTexts } = useAdminData();
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} py-8 px-4`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-8 text-center">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            {pageTexts.contactTitle}
          </h2>
          <div className={`w-20 h-1 mx-auto mt-2 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
          <p className={`mt-2 text-sm md:text-base ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {pageTexts.contactSubtitle}
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className="flex flex-col lg:grid lg:grid-cols-5 gap-6"
        >
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className="w-full">
              <div className="h-48 lg:h-56">
                <LocationMap />
              </div>
            </div>
            
            <div className="w-full">
              <ContactInfo />
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="w-full">
              <UnifiedContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
