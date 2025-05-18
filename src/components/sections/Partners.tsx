import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    id: 'serafim',
    name: 'Dr. Vinicius Serafim',
    title: 'Advogado',
    oab: 'OAB/GO: 67.790',
    email: 'serafim@stadv.com',
    image: '/lovable-uploads/9b5a5e2d-bc9e-4a28-880e-7b2acf0ff5a6.png'
  },
  {
    id: 'trombela',
    name: 'Dr. Enzo Trombela',
    title: 'Advogado',
    oab: 'OAB/GO: 67.754',
    email: 'trombela@stadv.com',
    image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png'
  }
];

const Partners = () => {
  const [activePartner, setActivePartner] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scaleY: 0.9 },
      {
        opacity: 1,
        scaleY: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Create a pin for the section to enable sticky scrolling
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    
    return () => {
      tl.kill();
    };
  }, [activePartner]);
  
  const handlePartnerChange = (index: number) => {
    setActivePartner(index);
  };

  return (
    <section 
      id="partners" 
      ref={sectionRef}
      className="min-h-screen bg-white flex flex-col md:flex-row relative"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-50 z-0"></div>
      
      <div ref={imageContainerRef} className="md:w-1/2 h-screen flex items-center justify-center relative z-10">
        {partners.map((partner, index) => (
          <div 
            key={partner.id} 
            className={`absolute transition-all duration-700 ${index === activePartner ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <img 
              src={partner.image} 
              alt={partner.name}
              className="max-h-[80vh] w-auto object-contain drop-shadow-xl"
            />
          </div>
        ))}
      </div>
      
      <div className="md:w-1/2 h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 relative z-10">
        <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl mb-12 font-canela gradient-text">Sócios</h2>
        
        <div ref={contentRef} className="mb-12 backdrop-blur-sm bg-white/30 p-8 border border-gray-100">
          <h3 className="text-2xl md:text-3xl mb-2 font-canela">{partners[activePartner].name}</h3>
          <p className="text-xl md:text-xl mb-1 font-satoshi text-gray-800">
            {partners[activePartner].title}
          </p>
          <p className="text-gray-700 mb-4 font-satoshi">
            {partners[activePartner].oab}
          </p>
          <a 
            href={`mailto:${partners[activePartner].email}`}
            className="text-gray-900 hover:underline font-satoshi inline-flex items-center"
          >
            <span className="mr-2">📧</span> {partners[activePartner].email}
          </a>
        </div>
        
        <div className="flex space-x-4">
          {partners.map((partner, index) => (
            <button
              key={partner.id}
              onClick={() => handlePartnerChange(index)}
              className={`h-1 transition-all duration-300 ${
                index === activePartner 
                  ? 'bg-black w-16' 
                  : 'bg-gray-400 w-8 hover:bg-gray-800 hover:w-12'
              }`}
              aria-label={`Ver perfil de ${partner.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
