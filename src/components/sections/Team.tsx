
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '../ui/card';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { pageTexts, teamMembers } = useAdminData();
  const [currentPageTexts, setCurrentPageTexts] = useState(pageTexts);

  // Listen for page texts updates
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('Team: Recebendo atualização de pageTexts', event.detail);
      setCurrentPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  // Update local state when pageTexts prop changes
  useEffect(() => {
    setCurrentPageTexts(pageTexts);
  }, [pageTexts]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      cardsRef.current?.children || [],
      { opacity: 0, y: 15 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.1 
      },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, [teamMembers]);

  return (
    <div 
      ref={sectionRef}
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} py-4 px-4`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-center" style={{ minHeight: '100vh' }}>
        <div ref={titleRef} className="mb-6 text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            {currentPageTexts.teamTitle}
          </h2>
          <div className={`w-20 h-1 mx-auto mt-2 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {teamMembers.map((member) => (
            <Card 
              key={member.id}
              className={`transition-all duration-300 hover:scale-105 ${isDark ? 'bg-black/80 border-white/10 hover:border-white/30' : 'bg-white/80 border-gray-200 hover:border-gray-400'}`}
            >
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 overflow-hidden">
                  <img
                    src={member.image || '/lovable-uploads/placeholder-member.jpg'}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`font-semibold text-base md:text-lg mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                  {member.name}
                </h3>
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {member.title}
                </p>
                <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {member.oab}
                </p>
                {member.description && (
                  <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {member.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
