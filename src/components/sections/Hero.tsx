import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { logger } from '@/utils/logger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { siteSettings } = useSupabaseData();

  const heroTitle = siteSettings?.hero_title || 'Excelência em Advocacia';
  const heroSubtitle = siteSettings?.hero_subtitle || 'Defendemos seus direitos com dedicação e expertise';
  const primaryButtonText = siteSettings?.hero_primary_button_text || 'Fale Conosco';
  const primaryButtonLink = siteSettings?.hero_primary_button_link || 'https://api.whatsapp.com/send?phone=5562994594496';
  const secondaryButtonText = siteSettings?.hero_secondary_button_text || 'Conheça Nossas Áreas de Atuação';
  const secondaryButtonLink = siteSettings?.hero_secondary_button_link || '#areas';

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    gsap.set(logoRef.current, { opacity: 0 });
    tl.fromTo(logoRef.current, { opacity: 0, y: 60, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 3.5, ease: 'power2.out' })
      .fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, "-=0.8")
      .fromTo(subheadlineRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, "-=0.6")
      .fromTo(ctaRef.current, { opacity: 0, y: 25, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power2.out' }, "-=0.4");
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) return;
    const interval = setInterval(() => {
      setShowScrollIndicator(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, isTablet]);

  const handleAreasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    logger.log('🎯 Hero: Navegando para seção areas');
    window.dispatchEvent(new CustomEvent('sectionChange', { detail: 'areas' }));
  };

  return (
    <section id="home" className="h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="relative text-center max-w-4xl h-full flex flex-col justify-center items-center -mt-8 md:-mt-12" style={{ zIndex: 100, pointerEvents: 'auto' }}>
        <div ref={logoRef} className="mb-6 md:mb-8 w-full max-w-sm md:max-w-lg mx-auto relative">
          <div className="logo-container relative">
            <img 
              src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" 
              alt="Serafim & Trombela Advocacia Logo" 
              className="w-full h-auto relative z-10 hover:scale-105 transition-transform duration-300"
              width="512"
              height="512"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
        
        <p ref={subheadlineRef} className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 text-center max-w-xl mx-auto font-satoshi leading-relaxed">
          {heroSubtitle}
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-3 justify-center">
          <a href={primaryButtonLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-glow text-white hover:from-primary-glow hover:to-primary border border-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
            {primaryButtonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <button onClick={handleAreasClick} className="group flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-accent text-white border-2 border-white hover:from-accent hover:to-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 shadow-lg" tabIndex={0} onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleAreasClick(e as any);
            }
          }} aria-label="Navegar para a seção de áreas de atuação">
            {secondaryButtonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {!isMobile && !isTablet && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex flex-col items-center gap-3">
            {showScrollIndicator ? (
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <span>Role para baixo</span>
                  <ChevronDown className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4 animate-pulse" style={{ animation: 'pulse 1s infinite, translateX 2s infinite alternate' }} />
                  <span>Use as setas</span>
                  <ArrowRight className="w-4 h-4 animate-pulse" style={{ animation: 'pulse 1s infinite, translateX 2s infinite alternate-reverse' }} />
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
