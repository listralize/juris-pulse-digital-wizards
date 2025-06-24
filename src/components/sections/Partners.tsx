
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
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
  }, [teamMembers.length]);

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
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 
            ref={titleRef}
            className={`text-3xl md:text-4xl lg:text-5xl mb-4 font-space-grotesk font-medium tracking-tight ${isDark ? 'text-white' : 'text-black'}`}
          >
            {teamTitle}
          </h2>
          <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
        </div>
        
        {/* Netflix-style Carousel */}
        <div className="relative">
          <div 
            ref={carouselRef} 
            className="overflow-hidden rounded-lg"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-2"
                >
                  {/* Netflix-style Card */}
                  <div className={`relative group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDark ? 'bg-neutral-900/50' : 'bg-white'
                  } shadow-2xl border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center text-6xl ${
                          isDark ? 'bg-neutral-800 text-white/50' : 'bg-gray-200 text-gray-400'
                        }`}>
                          👤
                        </div>
                      )}
                      
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70"></div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl md:text-2xl font-bold mb-1 font-space-grotesk">
                        {member.name}
                      </h3>
                      <p className="text-sm md:text-base font-medium mb-2 text-white/80 font-inter">
                        {member.title || 'Advogado'}
                      </p>
                      <p className="text-xs md:text-sm leading-relaxed text-white/70 line-clamp-3 font-inter">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {teamMembers.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                  isDark 
                    ? 'bg-black/70 hover:bg-black/90 text-white border border-white/20' 
                    : 'bg-white/90 hover:bg-white text-black border border-gray-200'
                } shadow-lg hover:scale-110 backdrop-blur-sm`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                  isDark 
                    ? 'bg-black/70 hover:bg-black/90 text-white border border-white/20' 
                    : 'bg-white/90 hover:bg-white text-black border border-gray-200'
                } shadow-lg hover:scale-110 backdrop-blur-sm`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {teamMembers.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
