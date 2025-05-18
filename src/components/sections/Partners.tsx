
import React, { useEffect, useRef } from 'react';
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  
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
    
    if (contentRef.current && card1Ref.current && card2Ref.current) {
      // Animate both cards to enter from opposite sides
      tl.fromTo(
        card1Ref.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
      
      tl.fromTo(
        card2Ref.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
    }
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="partners" 
      ref={sectionRef}
      className="min-h-screen bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-50 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-20 h-full">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-2 font-canela gradient-text">Sócios</h2>
          <div className="h-1 w-16 bg-black mx-auto"></div>
        </div>
        
        <div 
          ref={contentRef}
          className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 justify-center items-center lg:items-stretch h-full"
        >
          {/* First Partner Card */}
          <div 
            ref={card1Ref}
            className="w-full lg:w-1/2 max-w-xl"
          >
            <div className="backdrop-blur-sm bg-white/70 p-8 border border-gray-100 shadow-lg h-full flex flex-col">
              <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                <img 
                  src={partners[0].image} 
                  alt={partners[0].name}
                  className="w-40 h-40 object-cover rounded-full shadow-md"
                />
                <div>
                  <h3 className="text-2xl md:text-3xl mb-2 font-canela">{partners[0].name}</h3>
                  <p className="text-lg mb-1 font-satoshi text-gray-800">
                    {partners[0].title}
                  </p>
                  <p className="text-gray-700 mb-0 font-satoshi">
                    {partners[0].oab}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-6 font-satoshi leading-relaxed flex-grow">
                {partners[0].description}
              </p>
              
              <a 
                href={`mailto:${partners[0].email}`}
                className="inline-flex items-center text-gray-900 hover:text-black hover:underline font-satoshi transition-colors duration-300 mt-auto"
              >
                <Mail className="w-5 h-5 mr-3" /> 
                {partners[0].email}
              </a>
            </div>
          </div>
          
          {/* Second Partner Card */}
          <div 
            ref={card2Ref}
            className="w-full lg:w-1/2 max-w-xl"
          >
            <div className="backdrop-blur-sm bg-white/70 p-8 border border-gray-100 shadow-lg h-full flex flex-col">
              <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                <img 
                  src={partners[1].image} 
                  alt={partners[1].name}
                  className="w-40 h-40 object-cover rounded-full shadow-md"
                />
                <div>
                  <h3 className="text-2xl md:text-3xl mb-2 font-canela">{partners[1].name}</h3>
                  <p className="text-lg mb-1 font-satoshi text-gray-800">
                    {partners[1].title}
                  </p>
                  <p className="text-gray-700 mb-0 font-satoshi">
                    {partners[1].oab}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-6 font-satoshi leading-relaxed flex-grow">
                {partners[1].description}
              </p>
              
              <a 
                href={`mailto:${partners[1].email}`}
                className="inline-flex items-center text-gray-900 hover:text-black hover:underline font-satoshi transition-colors duration-300 mt-auto"
              >
                <Mail className="w-5 h-5 mr-3" /> 
                {partners[1].email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
