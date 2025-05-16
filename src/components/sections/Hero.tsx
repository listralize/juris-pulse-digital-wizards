
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(logoRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5 }
    )
    .fromTo(headlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(subheadlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div ref={logoRef} className="mb-12 w-full max-w-xs md:max-w-sm">
        <img 
          src="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
          alt="Serafim & Trombela Advocacia Logo"
          className="w-full h-auto"
        />
      </div>
      
      <h1 ref={headlineRef} className="text-3xl md:text-5xl lg:text-6xl mb-4 text-center max-w-3xl font-canela tracking-tight">
        Soluções Jurídicas Inovadoras
      </h1>
      
      <p ref={subheadlineRef} className="text-lg md:text-xl text-gray-700 mb-12 text-center max-w-lg font-satoshi">
        Suas questões nas mãos de quem entende.
      </p>
      
      <div ref={ctaRef}>
        <a 
          href="https://api.whatsapp.com/send?phone=5562994594496" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors duration-300 font-satoshi"
        >
          Fale Conosco no WhatsApp
        </a>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M7 13L12 18L17 13" 
            stroke="#000000" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M7 7L12 12L17 7" 
            stroke="#000000" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
