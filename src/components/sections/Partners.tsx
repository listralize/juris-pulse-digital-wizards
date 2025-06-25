import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, User, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

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

  // Mobile: 1 card por slide, Desktop: 3 cards por slide
  const itemsPerSlide = {
    mobile: 1,
    desktop: 3
  };

  const totalSlidesMobile = teamMembers.length;
  const totalSlidesDesktop = Math.ceil(teamMembers.length / itemsPerSlide.desktop);

  const nextSlide = () => {
    const isMobile = window.innerWidth < 1024;
    const totalSlides = isMobile ? totalSlidesMobile : totalSlidesDesktop;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    const isMobile = window.innerWidth < 1024;
    const totalSlides = isMobile ? totalSlidesMobile : totalSlidesDesktop;
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
    <section 
      ref={sectionRef}
      className={`h-screen flex flex-col overflow-hidden relative bg-transparent ${isDark ? 'text-white' : 'text-black'}`}
    >
      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Header padronizado - mesma altura que Blog - subindo no desktop */}
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {teamTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Carousel Container */}
          <div className="relative w-full max-w-5xl px-4 sm:px-8 lg:px-12">
            <div 
              ref={carouselRef} 
              className="overflow-hidden"
            >
              {/* Mobile: Um card por vez */}
              <div className="block lg:hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentSlide * 100}%)`,
                    width: `${totalSlidesMobile * 100}%`
                  }}
                >
                  {teamMembers.map((member, index) => (
                    <div 
                      key={index}
                      className="w-full flex-shrink-0 px-2"
                      style={{ width: `${100 / totalSlidesMobile}%` }}
                    >
                      <div className="group p-3">
                        <div className={`
                          relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 h-52
                          ${isDark 
                            ? 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]' 
                            : 'bg-black/[0.02] border-black/[0.08] hover:bg-black/[0.04] hover:border-black/[0.15]'
                          }
                          backdrop-blur-sm shadow-md hover:shadow-xl flex
                        `}>
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-black/[0.03] group-hover:to-black/[0.06] transition-all duration-300"></div>
                          
                          <div className="w-28 h-full relative flex-shrink-0">
                            {member.image ? (
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-l-xl"
                              />
                            ) : (
                              <div className={`w-full h-full flex items-center justify-center text-2xl rounded-l-xl ${
                                isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'
                              }`}>
                                <User className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 p-3 relative z-10 flex flex-col justify-between">
                            <div>
                              <h3 className={`text-sm font-semibold mb-1 font-space-grotesk ${isDark ? 'text-white' : 'text-black'}`}>
                                {member.name}
                              </h3>
                              <p className={`text-xs mb-2 font-medium font-inter ${isDark ? 'text-white/70' : 'text-black/50'}`}>
                                {member.title || 'Advogado'}
                              </p>
                              <p className={`text-xs leading-relaxed line-clamp-3 ${isDark ? 'text-white/60' : 'text-black/50'}`}>
                                {member.description}
                              </p>
                            </div>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className={`
                                  mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all duration-200 self-start
                                  ${isDark 
                                    ? 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white' 
                                    : 'bg-black/10 hover:bg-black/20 text-black/80 hover:text-black'
                                  }
                                `}>
                                  <Eye className="w-3 h-3" />
                                  Ver perfil
                                </button>
                              </DialogTrigger>
                              <DialogContent className={`max-w-md ${isDark ? 'bg-black/90 border-white/20' : 'bg-white/90 border-black/20'}`}>
                                <DialogHeader>
                                  <DialogTitle className={`text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                                    Perfil Completo
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                      {member.image ? (
                                        <img 
                                          src={member.image} 
                                          alt={member.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className={`w-full h-full flex items-center justify-center ${
                                          isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'
                                        }`}>
                                          <User className="w-6 h-6" />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h3 className={`text-lg font-semibold font-space-grotesk ${isDark ? 'text-white' : 'text-black'}`}>
                                        {member.name}
                                      </h3>
                                      <p className={`text-sm font-medium font-inter ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                                        {member.title || 'Advogado'}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                                      {member.description}
                                    </p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Grid com 3 cards por slide */}
              <div className="hidden lg:block">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentSlide * (100 / totalSlidesDesktop)}%)`,
                    width: `${totalSlidesDesktop * 100}%`
                  }}
                >
                  {Array.from({ length: totalSlidesDesktop }).map((_, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className="grid grid-cols-3 gap-8 w-full flex-shrink-0 px-4"
                      style={{ width: `${100 / totalSlidesDesktop}%` }}
                    >
                      {teamMembers
                        .slice(slideIndex * itemsPerSlide.desktop, (slideIndex + 1) * itemsPerSlide.desktop)
                        .map((member, index) => (
                          <div key={index} className="group p-4">
                            <div className={`
                              relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 h-52
                              ${isDark 
                                ? 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]' 
                                : 'bg-black/[0.02] border-black/[0.08] hover:bg-black/[0.04] hover:border-black/[0.15]'
                              }
                              backdrop-blur-sm shadow-md hover:shadow-xl flex
                            `}>
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-black/[0.03] group-hover:to-black/[0.06] transition-all duration-300"></div>
                              
                              <div className="w-28 h-full relative flex-shrink-0">
                                {member.image ? (
                                  <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-l-xl"
                                  />
                                ) : (
                                  <div className={`w-full h-full flex items-center justify-center text-2xl rounded-l-xl ${
                                    isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'
                                  }`}>
                                    <User className="w-8 h-8" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 p-3 relative z-10 flex flex-col justify-between">
                                <div>
                                  <h3 className={`text-base font-semibold mb-1 font-space-grotesk ${isDark ? 'text-white' : 'text-black'}`}>
                                    {member.name}
                                  </h3>
                                  <p className={`text-xs mb-2 font-medium font-inter ${isDark ? 'text-white/70' : 'text-black/50'}`}>
                                    {member.title || 'Advogado'}
                                  </p>
                                  <p className={`text-xs leading-relaxed line-clamp-3 ${isDark ? 'text-white/60' : 'text-black/50'}`}>
                                    {member.description}
                                  </p>
                                </div>
                                
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button className={`
                                      mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all duration-200 self-start
                                      ${isDark 
                                        ? 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white' 
                                        : 'bg-black/10 hover:bg-black/20 text-black/80 hover:text-black'
                                      }
                                    `}>
                                      <Eye className="w-3 h-3" />
                                      Ver perfil
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className={`max-w-md ${isDark ? 'bg-black/90 border-white/20' : 'bg-white/90 border-black/20'}`}>
                                    <DialogHeader>
                                      <DialogTitle className={`text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                                        Perfil Completo
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                          {member.image ? (
                                            <img 
                                              src={member.image} 
                                              alt={member.name}
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${
                                              isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'
                                            }`}>
                                              <User className="w-6 h-6" />
                                            </div>
                                          )}
                                        </div>
                                        <div>
                                          <h3 className={`text-lg font-semibold font-space-grotesk ${isDark ? 'text-white' : 'text-black'}`}>
                                            {member.name}
                                          </h3>
                                          <p className={`text-sm font-medium font-inter ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                                            {member.title || 'Advogado'}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                                          {member.description}
                                        </p>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons - sempre visíveis */}
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

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {/* Mobile dots */}
              <div className="block lg:hidden">
                {Array.from({ length: totalSlidesMobile }).map((_, index) => (
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
              
              {/* Desktop dots */}
              <div className="hidden lg:block">
                {Array.from({ length: totalSlidesDesktop }).map((_, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
