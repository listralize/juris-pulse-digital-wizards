
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ContactForm from '../contact/ContactForm';
import SuccessMessage from '../contact/SuccessMessage';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Remove pinning to allow for full scrolling
    if (titleRef.current && formContainerRef.current && mapRef.current) {
      // Animate elements on initial load
      const tl = gsap.timeline();
      
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
      className="min-h-screen relative pb-20 bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full flex flex-col">
        <div ref={titleRef} className="mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-canela gradient-text">
            Contato
          </h2>
          <div className="h-1 w-16 bg-black"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 mb-8">
          <div ref={formContainerRef} className="md:w-1/2 z-10">
            {formSubmitted ? (
              <SuccessMessage onNewMessage={handleNewMessage} />
            ) : (
              <ContactForm onSubmitSuccess={handleSubmitSuccess} />
            )}
          </div>
          
          <div ref={mapRef} className="md:w-1/2 z-10 flex flex-col">
            <ContactInfo />
            <div className="mt-8 flex-grow">
              <LocationMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
