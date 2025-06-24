
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { teamMembers, pageTexts, isLoading } = useSupabaseDataNew();
  
  // Estado local para receber atualizações em tempo real
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Atualizar quando pageTexts muda
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  // Escutar eventos de atualização
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

  // Apenas um membro por slide
  const totalSlides = teamMembers.length;

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

  // Auto-play carousel
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
      className={`h-full w-full py-8 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-12">
          <h2 
            ref={titleRef}
            className={`text-2xl md:text-3xl lg:text-4xl mb-4 font-canela ${isDark ? 'text-white' : 'text-black'}`}
          >
            {teamTitle}
          </h2>
          <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
        </div>
        
        {/* Carousel Container - Um membro por slide */}
        <div className="relative max-w-md mx-auto">
          <div 
            ref={carouselRef} 
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${totalSlides * 100}%`
              }}
            >
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  <div className="group">
                    <div className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${
                      isDark ? 'bg-white/5' : 'bg-white'
                    } shadow-lg hover:shadow-xl`}>
                      <div className="aspect-[3/4] relative">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center text-6xl ${
                            isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'
                          }`}>
                            👤
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                          {member.name}
                        </h3>
                        <p className={`text-sm mb-3 font-medium ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                          {member.title || 'Advogado'}
                        </p>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                    : 'bg-white/90 hover:bg-white text-black border border-gray-200'
                } shadow-lg hover:scale-110 z-10`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                    : 'bg-white/90 hover:bg-white text-black border border-gray-200'
                } shadow-lg hover:scale-110 z-10`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
  );
};

export default Partners;
