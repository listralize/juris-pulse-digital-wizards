
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();
  const { pageTexts, isLoading } = useAdminData();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    if (isLoading) return;

    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function() {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, scaleY: 0.9 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(
          textRef1.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: textRef1.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(
          textRef2.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: textRef2.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      },
      '(max-width: 767px)': function() {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, scaleY: 0.9 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(
          textRef1.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: textRef1.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(
          textRef2.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: textRef2.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <section id="about" className={`min-h-screen flex flex-col justify-center py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="flex justify-center items-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div>
      </section>
    );
  }

  // Split description into two paragraphs for layout
  const description = pageTexts.aboutDescription;
  const midPoint = Math.floor(description.length / 2);
  const breakPoint = description.indexOf(' ', midPoint);
  const firstPart = description.substring(0, breakPoint);
  const secondPart = description.substring(breakPoint + 1);

  return (
    <section id="about" className={`min-h-screen flex flex-col justify-center py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <h2 ref={titleRef} className={`text-3xl md:text-4xl lg:text-5xl mb-12 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
        {pageTexts.aboutTitle}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <p ref={textRef1} className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'} font-satoshi`}>
          {firstPart}
        </p>
        
        <p ref={textRef2} className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'} font-satoshi`}>
          {secondPart}
        </p>
      </div>
      
      <div className="mt-16 flex justify-center">
        <div className={`w-24 h-1 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
      </div>
    </section>
  );
};

export default About;
