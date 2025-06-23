
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import MarbleBanner from '../MarbleBanner';
import { useSupabasePageTexts } from '../../hooks/supabase/useSupabasePageTexts';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Usar o hook do Supabase que salva os dados
  const { pageTexts, isLoading } = useSupabasePageTexts();

  console.log('🦸 Hero: pageTexts carregados:', pageTexts);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🦸 Hero: Evento pageTextsUpdated recebido:', event.detail);
      // O hook já atualiza automaticamente os pageTexts
    };

    // Escutar evento geral
    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

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

  if (isLoading) {
    return (
      <section id="home" className="h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden bg-black">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-white`}></div>
      </section>
    );
  }

  return (
    <section id="home" className="h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden bg-black">
      {/* Background com marble banner */}
      <div ref={bgRef} className="absolute inset-0 z-0 w-full h-full" style={{ transform: 'scale(1.2)' }}>
        <MarbleBanner />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl h-full flex flex-col justify-center items-center -mt-8 md:-mt-12">
        <div 
          ref={logoRef} 
          className="mb-2 md:mb-4 w-full max-w-sm md:max-w-lg mx-auto relative"
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
        
        <h1 ref={headlineRef} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 md:mb-3 text-center max-w-3xl mx-auto font-canela tracking-tight text-white">
          {pageTexts.heroTitle}
        </h1>
        
        <p ref={subheadlineRef} className="text-base md:text-lg lg:text-xl text-gray-200 mb-4 md:mb-6 text-center max-w-lg mx-auto font-satoshi">
          {pageTexts.heroSubtitle}
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-3 justify-center">
          <a 
            href={pageTexts.heroPrimaryButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="elegant-button flex items-center justify-center gap-2 bg-white text-black hover:bg-black hover:text-white hover:border-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
          >
            {pageTexts.heroPrimaryButtonText}
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <a 
            href={pageTexts.heroSecondaryButtonLink}
            className="elegant-button flex items-center justify-center gap-2 bg-transparent text-white border-white hover:bg-white hover:text-black text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
          >
            {pageTexts.heroSecondaryButtonText}
            <ArrowRight className="w-5 h-5" />
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
