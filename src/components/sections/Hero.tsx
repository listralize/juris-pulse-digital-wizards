
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { pageTexts } = useAdminData();
  const [currentPageTexts, setCurrentPageTexts] = useState(pageTexts);

  // Listen for page texts updates
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('Hero: Recebendo atualização de pageTexts', event.detail);
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
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  const backgroundImage = currentPageTexts.heroBackgroundImage || '/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png';

  return (
    <div 
      ref={sectionRef}
      className={`relative w-full h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-canela text-white mb-6 leading-tight"
        >
          {currentPageTexts.heroTitle}
        </h1>
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          {currentPageTexts.heroSubtitle}
        </p>
      </div>
    </div>
  );
};

export default Hero;
