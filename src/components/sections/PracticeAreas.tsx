
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import { Card, CardContent } from '../ui/card';
import NeuralBackground from '../NeuralBackground';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const { categories: lawCategories, isLoading } = useSupabaseLawCategories();

  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const handleAreaClick = (slug: string) => {
    navigate(`/areas/${slug}`);
  };

  useEffect(() => {
    if (isLoading || lawCategories.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 15, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6,
        stagger: 0.1 
      },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, [isLoading, lawCategories.length]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  return (
    <div 
      ref={sectionRef}
      className={`h-full w-full py-4 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} relative`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
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
              Áreas de Atuação
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
            <p className={`text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mt-4 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Nossos especialistas oferecem soluções jurídicas completas em diversas áreas do direito
            </p>
          </div>

          <div 
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl px-4"
          >
            {lawCategories.map((area) => (
              <Card
                key={area.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm border ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30' 
                    : 'bg-white/80 hover:bg-white border-gray-200/60 hover:border-gray-400/60'
                } shadow-lg hover:shadow-xl`}
                onClick={() => handleAreaClick(area.value)}
                onMouseEnter={() => setHoveredArea(area.value)}
                onMouseLeave={() => setHoveredArea(null)}
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col relative">
                  {/* Gradiente de hover overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ${
                    isDark ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
                  }`}></div>
                  
                  <div className={`text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 transition-all duration-300 ${
                    hoveredArea === area.value ? 'scale-110' : 'scale-100'
                  } relative z-10`}>
                    {area.icon}
                  </div>
                  
                  <h3 className={`text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors relative z-10 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {area.name}
                  </h3>
                  
                  <p className={`text-xs sm:text-sm leading-relaxed flex-1 relative z-10 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {area.description}
                  </p>
                  
                  <div className={`mt-3 sm:mt-4 text-xs sm:text-sm font-medium group-hover:translate-x-1 transition-transform relative z-10 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Saiba mais →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeAreas;
