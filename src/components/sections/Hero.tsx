
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import MarbleBanner from '../MarbleBanner';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    <section id="home" className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Full-width marble banner background - always using black regardless of theme */}
      <div ref={bgRef} className="absolute inset-0 z-0 w-full h-full">
        <MarbleBanner />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl">
        <div 
          ref={logoRef} 
          className="mb-4 w-full max-w-md md:max-w-lg mx-auto relative"
        >
          <div className="logo-container relative">
            <img 
              src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png"
              alt="Serafim & Trombela Advocacia Logo"
              className="w-full h-auto relative z-10"
              style={{
                filter: 'drop-shadow(5px 8px 12px rgba(0,0,0,0.95))'
              }}
            />
          </div>
        </div>
        
        <h1 ref={headlineRef} className="text-3xl md:text-5xl lg:text-6xl mb-3 text-center max-w-3xl mx-auto font-canela tracking-tight text-white">
          Soluções Jurídicas Inovadoras
        </h1>
        
        <p ref={subheadlineRef} className="text-base md:text-lg text-gray-200 mb-6 text-center max-w-lg mx-auto font-satoshi">
          Suas questões nas mãos de quem entende. Experiência e excelência a serviço dos seus direitos.
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-3 justify-center">
          <a 
            href="https://api.whatsapp.com/send?phone=5562994594496" 
            target="_blank"
            rel="noopener noreferrer"
            className="elegant-button flex items-center justify-center gap-2 bg-white text-black hover:bg-black hover:text-white hover:border-white"
          >
            Fale Conosco no WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <a 
            href="#areas" 
            className="elegant-button flex items-center justify-center gap-2 bg-transparent text-white border-white hover:bg-white hover:text-black"
          >
            Conheça Nossas Áreas de Atuação
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M7 13L12 18L17 13" 
            stroke="#FFFFFF"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M7 7L12 12L17 7" 
            stroke="#FFFFFF"
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
