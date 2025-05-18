
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    id: 'serafim',
    name: 'Dr. Vinicius Serafim',
    title: 'Advogado',
    oab: 'OAB/GO: 67.790',
    email: 'serafim@stadv.com',
    image: '/lovable-uploads/9b5a5e2d-bc9e-4a28-880e-7b2acf0ff5a6.png',
    description: 'Especializado em Direito Empresarial e Tributário, com vasta experiência em consultorias e contencioso estratégico.'
  },
  {
    id: 'trombela',
    name: 'Dr. Enzo Trombela',
    title: 'Advogado',
    oab: 'OAB/GO: 67.754',
    email: 'trombela@stadv.com',
    image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png',
    description: 'Atuação em Direito Civil e Contratual, com foco em soluções jurídicas para empresas e pessoas físicas.'
  }
];

const Partners = () => {
  const [activePartner, setActivePartner] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      // Create a pin for the section to enable sticky scrolling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    if (contentRef.current && imageRef.current && cardRef.current) {
      tl.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
      
      tl.fromTo(
        cardRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
    }
    
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
      className="min-h-screen bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-50 z-0"></div>
      
      <div className="flex flex-col md:flex-row h-screen">
        <div ref={imageRef} className="md:w-1/2 h-full flex items-center justify-center relative z-10 px-6 md:px-12">
          {partners.map((partner, index) => (
            <div 
              key={partner.id} 
              className={`absolute transition-opacity duration-700 ease-in-out ${index === activePartner ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={partner.image} 
                alt={partner.name}
                className="max-h-[80vh] w-auto object-contain drop-shadow-xl"
              />
            </div>
          ))}
        </div>
        
        <div className="md:w-1/2 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-2 font-canela gradient-text">Sócios</h2>
            <div className="h-1 w-16 bg-black"></div>
          </div>
          
          <div 
            ref={cardRef}
            className={`backdrop-blur-sm bg-white/70 p-8 border border-gray-100 shadow-lg transition-all duration-500`}
          >
            <h3 className="text-2xl md:text-3xl mb-3 font-canela">{partners[activePartner].name}</h3>
            <p className="text-xl mb-2 font-satoshi text-gray-800">
              {partners[activePartner].title}
            </p>
            <p className="text-gray-700 mb-3 font-satoshi">
              {partners[activePartner].oab}
            </p>
            <p className="text-gray-800 mb-6 font-satoshi leading-relaxed">
              {partners[activePartner].description}
            </p>
            
            <a 
              href={`mailto:${partners[activePartner].email}`}
              className="inline-flex items-center text-gray-900 hover:text-black hover:underline font-satoshi transition-colors duration-300"
            >
              <Mail className="w-5 h-5 mr-3" /> 
              {partners[activePartner].email}
            </a>
          </div>
          
          <div className="flex space-x-4 mt-8">
            {partners.map((partner, index) => (
              <button
                key={partner.id}
                onClick={() => handlePartnerChange(index)}
                className={`h-1 transition-all duration-300 ${
                  index === activePartner 
                    ? 'bg-black w-16' 
                    : 'bg-gray-300 w-8 hover:bg-gray-800 hover:w-12'
                }`}
                aria-label={`Ver perfil de ${partner.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
