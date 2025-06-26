
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

  const itemsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide.desktop);

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
      className={`h-full w-full py-4 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} relative`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-100px',
        paddingTop: '50px'
      }}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Header padronizado - mesma altura que outras páginas */}
          <div className="text-center mb-8 md:mb-12">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {teamTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Carousel Container com padding adequado */}
          <div className="relative w-full max-w-6xl px-4 sm:px-8 lg:px-12">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full flex-shrink-0 px-2 sm:px-4"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    {teamMembers
                      .slice(slideIndex * itemsPerSlide.desktop, (slideIndex + 1) * itemsPerSlide.desktop)
                      .map((member, index) => (
                        <div key={index} className="group p-2 sm:p-3 lg:p-4">
                          <div className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                            isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-50'
                          } shadow-md hover:shadow-xl`}>
                            {/* Foto com altura responsiva */}
                            <div className="aspect-[4/3] relative">
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
                            
                            {/* Conteúdo responsivo */}
                            <div className="p-3 sm:p-4 lg:p-5">
                              <h3 className={`text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                                {member.name}
                              </h3>
                              <p className={`text-xs sm:text-sm mb-2 sm:mb-3 font-medium ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                {member.title || 'Advogado'}
                              </p>
                              <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
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

            {/* Navigation Buttons */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                      : 'bg-white/90 hover:bg-white text-black border border-gray-200'
                  } shadow-lg hover:scale-110 z-10`}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                      : 'bg-white/90 hover:bg-white text-black border border-gray-200'
                  } shadow-lg hover:scale-110 z-10`}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? isDark ? 'bg-white' : 'bg-black'
                        : isDark ? 'bg-white/30' : 'bg-black/30'
                    }`}
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
