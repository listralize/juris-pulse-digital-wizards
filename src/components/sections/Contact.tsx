
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ContactForm from '../contact/ContactForm';
import SuccessMessage from '../contact/SuccessMessage';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation for the elements
    if (titleRef.current && formContainerRef.current && mapRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          end: "bottom bottom",
          toggleActions: "play none none none"
        }
      });
      
      tl.fromTo(
        titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      
      tl.fromTo(
        formContainerRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      
      tl.fromTo(
        mapRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
    
    return () => {
      // Clean up all ScrollTrigger instances to avoid memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  const handleSubmitSuccess = () => {
    setFormSubmitted(true);
  };

  const handleNewMessage = () => {
    setFormSubmitted(false);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-16 relative w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black via-gray-900 to-black' : 'bg-gradient-to-b from-white via-gray-50 to-white'} opacity-50 z-0`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <div ref={titleRef} className="mb-10 relative z-10">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl mb-4 font-canela ${isDark ? 'text-white' : 'gradient-text'}`}>
            Contato
          </h2>
          <div className={`h-1 w-16 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-10">
          <div ref={formContainerRef} className="md:w-1/2 z-10">
            {formSubmitted ? (
              <SuccessMessage onNewMessage={handleNewMessage} />
            ) : (
              <ContactForm onSubmitSuccess={handleSubmitSuccess} />
            )}
          </div>
          
          <div ref={mapRef} className="md:w-1/2 z-10 flex flex-col">
            <ContactInfo />
            <div className="mt-6 flex-grow">
              <LocationMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
