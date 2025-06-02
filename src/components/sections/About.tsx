
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { pageTexts, isLoading } = useAdminData();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );
    
    return () => {
      tl.kill();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 ref={titleRef} className={`text-4xl md:text-5xl lg:text-6xl mb-8 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
          {pageTexts.aboutTitle}
        </h2>
        
        <div ref={textRef} className="space-y-6">
          <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'} font-satoshi max-w-3xl mx-auto`}>
            {pageTexts.aboutDescription}
          </p>
        </div>
        
        <div className="mt-8">
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-white' : 'bg-black'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default About;
