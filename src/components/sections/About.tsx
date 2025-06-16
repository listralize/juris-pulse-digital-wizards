
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { pageTexts } = useAdminData();
  const [currentPageTexts, setCurrentPageTexts] = useState(pageTexts);

  // Listen for page texts updates
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('About: Recebendo atualização de pageTexts', event.detail);
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
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  const aboutImage = currentPageTexts.aboutImage || '/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png';

  return (
    <div 
      ref={sectionRef}
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} py-4 px-4`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-center" style={{ minHeight: '100vh' }}>
        <div ref={titleRef} className="mb-6 text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            {currentPageTexts.aboutTitle}
          </h2>
          <div className={`w-20 h-1 mx-auto mt-2 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
        </div>
        
        <div ref={contentRef} className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={aboutImage}
                alt="Sobre nós"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-4">
            <p className={`text-base md:text-lg lg:text-xl leading-relaxed ${isDark ? 'text-white/80' : 'text-black/80'}`}>
              {currentPageTexts.aboutDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
