import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import NeuralBackground from '../NeuralBackground';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { teamMembers, pageTexts, isLoading } = useSupabaseDataNew();
  
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 Partners: Recebendo atualização de textos:', event.detail);
      setLocalPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  // Cálculos de slides baseados no dispositivo
  const itemsPerSlide = isMobile ? 1 : 3; // Mobile: 1 card, Desktop: 3 cards
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      carouselRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, [isLoading]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  const teamTitle = localPageTexts?.teamTitle || 'Nossa Equipe';

  return (
    <div 
      ref={sectionRef}
      className={`responsive-container center-absolute ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} relative performance-optimized`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: isMobile ? 'clamp(-80px, -12vw, -60px)' : 'clamp(-200px, -15vw, -140px)',
        paddingTop: 'clamp(2rem, 8vh, 4rem)',
        paddingBottom: 'clamp(2rem, 8vh, 4rem)',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
      <div className="responsive-container center-absolute w-full relative z-10">
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          {/* Header responsivo e centralizado */}
          <div className="text-center center-horizontal fluid-spacing-lg w-full">
            <h2 
              ref={titleRef}
              className={`fluid-text-4xl mb-3 font-canela responsive-transition ${isDark ? 'text-white' : 'text-black'}`}
              style={{
                lineHeight: 'clamp(1.2, 1.4, 1.6)',
                letterSpacing: 'clamp(-0.02em, 0, 0.02em)'
              }}
            >
              {teamTitle}
            </h2>
            <div 
              className={`mx-auto responsive-transition ${isDark ? 'bg-white/50' : 'bg-black/50'}`}
              style={{
                width: 'clamp(3rem, 8vw, 5rem)',
                height: 'clamp(1px, 0.2vw, 2px)'
              }}
            ></div>
          </div>
          
          {/* Carousel Container responsivo e centralizado */}
          <div 
            className="relative w-full center-horizontal responsive-transition"
            style={{
              maxWidth: 'min(90vw, 1200px)',
              padding: 'clamp(1rem, 4vw, 3rem)'
            }}
          >
            <div 
              ref={carouselRef} 
              className="overflow-hidden"
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                  width: `${totalSlides * 100}%`
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div 
                     key={slideIndex}
                    className={`w-full flex-shrink-0 responsive-transition ${
                      isMobile 
                        ? 'flex justify-center center-absolute' 
                        : 'grid grid-responsive gap-4 sm:gap-6 lg:gap-8 center-horizontal'
                    }`}
                    style={{ 
                      width: `${100 / totalSlides}%`,
                      padding: 'clamp(0.5rem, 2vw, 1.5rem)',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))'
                    }}
                  >
                    {teamMembers
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((member, index) => (
                         <div 
                           key={index} 
                           className={`group fluid-spacing-sm performance-optimized responsive-transition ${
                             isMobile ? 'w-full center-horizontal' : 'w-full'
                           }`}
                           style={{
                             maxWidth: isMobile ? 'min(90vw, 400px)' : '100%'
                           }}
                         >
                           <div className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                             isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-50'
                           } shadow-md hover:shadow-xl aspect-ratio-4-3`}>
                             {/* Foto com altura responsiva e proporção mantida */}
                             <div 
                               className="aspect-ratio-4-3 relative w-full overflow-hidden"
                               style={{
                                 minHeight: 'clamp(200px, 30vw, 300px)',
                                 maxHeight: 'clamp(250px, 35vw, 350px)'
                               }}
                             >
                              {member.image ? (
                                <img 
                                  src={member.image} 
                                  alt={member.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center text-2xl sm:text-3xl ${
                                  isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'
                                }`}>
                                  👤
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                             {/* Conteúdo responsivo e bem estruturado */}
                             <div 
                               className="fluid-spacing-md"
                               style={{
                                 padding: 'clamp(0.75rem, 3vw, 1.5rem)'
                               }}
                             >
                               <h3 
                                 className={`fluid-text-lg font-semibold responsive-transition ${isDark ? 'text-white' : 'text-black'}`}
                                 style={{
                                   marginBottom: 'clamp(0.25rem, 1vw, 0.75rem)',
                                   lineHeight: 'clamp(1.3, 1.5, 1.7)'
                                 }}
                               >
                                 {member.name}
                               </h3>
                               <p 
                                 className={`fluid-text-sm font-medium responsive-transition ${isDark ? 'text-white/70' : 'text-gray-600'}`}
                                 style={{
                                   marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                                 }}
                               >
                                 {member.title || 'Advogado'}
                               </p>
                               <p 
                                 className={`fluid-text-sm leading-relaxed line-clamp-3 responsive-transition ${isDark ? 'text-white/60' : 'text-gray-700'}`}
                                 style={{
                                   lineHeight: 'clamp(1.4, 1.6, 1.8)'
                                 }}
                               >
                                 {member.description}
                               </p>
                             </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Responsivos e proporcionais */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 responsive-transition center-absolute performance-optimized ${
                    isDark 
                      ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                      : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
                  } hover:scale-110 z-10 rounded-full`}
                  style={{
                    left: 'clamp(0.25rem, 2vw, 1rem)',
                    width: 'clamp(2rem, 5vw, 3rem)',
                    height: 'clamp(2rem, 5vw, 3rem)'
                  }}
                >
                  <ChevronLeft 
                    style={{
                      width: 'clamp(1rem, 3vw, 1.5rem)',
                      height: 'clamp(1rem, 3vw, 1.5rem)'
                    }}
                  />
                </button>
                
                <button
                  onClick={nextSlide}
                  className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 responsive-transition center-absolute performance-optimized ${
                    isDark 
                      ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                      : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
                  } hover:scale-110 z-10 rounded-full`}
                  style={{
                    right: 'clamp(0.25rem, 2vw, 1rem)',
                    width: 'clamp(2rem, 5vw, 3rem)',
                    height: 'clamp(2rem, 5vw, 3rem)'
                  }}
                >
                  <ChevronRight 
                    style={{
                      width: 'clamp(1rem, 3vw, 1.5rem)',
                      height: 'clamp(1rem, 3vw, 1.5rem)'
                    }}
                  />
                </button>
              </>
            )}

            {/* Dots Indicator - Responsivo e centralizado */}
            {totalSlides > 1 && (
              <div 
                className="flex justify-center center-horizontal responsive-transition"
                style={{
                  marginTop: 'clamp(1.5rem, 4vw, 2.5rem)',
                  gap: 'clamp(0.375rem, 1vw, 0.75rem)'
                }}
              >
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 responsive-transition performance-optimized ${
                      currentSlide === index
                        ? isDark ? 'bg-white' : 'bg-black'
                        : isDark ? 'bg-white/20' : 'bg-black/20'
                    }`}
                    style={{
                      width: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                      height: 'clamp(0.5rem, 1.5vw, 0.75rem)'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
