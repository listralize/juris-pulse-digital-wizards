
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      bgRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5 }
    )
    .fromTo(
      logoRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.5 },
      "-=1"
    )
    .fromTo(
      headlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.7"
    )
    .fromTo(
      subheadlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );
    
    // Parallax effect
    gsap.to(bgRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Dynamic background with parallax effect */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-90"></div>
        <div className="absolute top-[20%] left-[20%] w-96 h-96 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[20%] w-64 h-64 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl">
        <div ref={logoRef} className="mb-12 w-full max-w-xs md:max-w-sm mx-auto">
          <img 
            src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png"
            alt="Serafim & Trombela Advocacia Logo"
            className="w-full h-auto"
          />
        </div>
        
        <h1 ref={headlineRef} className="text-4xl md:text-6xl lg:text-7xl mb-6 text-center max-w-3xl mx-auto font-canela tracking-tight gradient-text">
          Soluções Jurídicas Inovadoras
        </h1>
        
        <p ref={subheadlineRef} className="text-lg md:text-xl text-gray-700 mb-12 text-center max-w-lg mx-auto font-satoshi">
          Suas questões nas mãos de quem entende. Experiência e excelência a serviço dos seus direitos.
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="https://api.whatsapp.com/send?phone=5562994594496" 
            target="_blank"
            rel="noopener noreferrer"
            className="elegant-button flex items-center justify-center gap-2"
          >
            Fale Conosco no WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <a 
            href="#areas" 
            className="elegant-button bg-white text-black border-black hover:bg-black hover:text-white flex items-center justify-center gap-2"
          >
            Conheça Nossas Áreas de Atuação
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
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
