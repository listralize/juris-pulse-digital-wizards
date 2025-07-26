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
  const {
    theme
  } = useTheme();
  const isDark = theme === 'dark';
  const {
    teamMembers,
    pageTexts,
    isLoading
  } = useSupabaseDataNew();
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Force carousel to always start at first slide
  useEffect(() => {
    setCurrentSlide(0);
  }, [teamMembers]);

  // Force reset to first slide whenever component is accessed
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      if (event.detail?.section === 'socios') {
        setCurrentSlide(0);
      }
    };
    window.addEventListener('activeSectionChanged', handleSectionChange as EventListener);
    return () => {
      window.removeEventListener('activeSectionChanged', handleSectionChange as EventListener);
    };
  }, []);

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
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };
  useEffect(() => {
    if (isLoading) return;
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });
    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }).fromTo(carouselRef.current, {
      opacity: 0,
      y: 15
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.4");
    return () => {
      tl.kill();
    };
  }, [isLoading]);
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000); // Mudou de 5000 para 8000ms (8 segundos)
    return () => clearInterval(interval);
  }, [totalSlides]);
  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>;
  }
  const teamTitle = localPageTexts?.teamTitle || 'Nossa Equipe';
  return <div ref={sectionRef} className={`h-full w-full py-4 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} relative`} style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // Mudando de center para flex-start
    marginTop: '0px',
    paddingTop: '50px' // Reduzindo significativamente o padding do topo
  }}>
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
      <div className="team-responsive-container w-full relative z-10" style={{
      marginTop: '-100px'
    }}>
        <div className="flex flex-col items-center justify-start flex-1" style={{
        paddingTop: '155px'
      }}>
          {/* Header responsivo */}
          <div className="text-center mb-8 md:mb-12">
            <h2 ref={titleRef} className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              {teamTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Carousel Container */}
          <div className="relative w-full max-w-6xl px-4 sm:px-8 lg:px-12">
            <div ref={carouselRef} className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`
            }}>
                {Array.from({
                length: totalSlides
              }).map((_, slideIndex) => <div key={slideIndex} className={`w-full flex-shrink-0 px-2 sm:px-4 ${isMobile ? 'flex justify-center' : 'grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8'}`} style={{
                width: `${100 / totalSlides}%`
              }}>
                    {teamMembers.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((member, index) => <div key={index} className={`group p-2 sm:p-3 lg:p-4 ${isMobile ? 'w-full max-w-sm mx-auto' : ''}`}>
                          <div className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-50'} shadow-md hover:shadow-xl`} style={{
                    height: '420px'
                  }} // Altura fixa para todos os cards
                  >
                            {/* Foto com altura fixa */}
                            <div className="h-48 relative overflow-hidden">
                              {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /> : <div className={`w-full h-full flex items-center justify-center text-2xl sm:text-3xl ${isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'}`}>
                                  👤
                                </div>}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            
                            {/* Conteúdo com altura fixa */}
                            <div className="p-3 sm:p-4 lg:p-5 flex-1">
                              <h3 className={`text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                                {member.name}
                              </h3>
                              <p className={`text-xs sm:text-sm mb-2 sm:mb-3 font-medium ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                {member.title || 'Advogado'}
                              </p>
                              <p className={`text-xs sm:text-sm leading-relaxed line-clamp-4 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                                {member.description}
                              </p>
                            </div>
                          </div>
                        </div>)}
                  </div>)}
              </div>
            </div>

            {/* Navigation Buttons - Responsivos */}
            {totalSlides > 1 && <>
                <button onClick={prevSlide} className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 transition-all duration-300 team-nav-button rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'} hover:scale-110 z-10`}>
                  <ChevronLeft className="team-nav-icon" />
                </button>
                
                <button onClick={nextSlide} className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 transition-all duration-300 team-nav-button rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'} hover:scale-110 z-10`}>
                  <ChevronRight className="team-nav-icon" />
                </button>
              </>}

            {/* Dots Indicator - Responsivo */}
            {totalSlides > 1}
          </div>
        </div>
      </div>
    </div>;
};
export default Partners;