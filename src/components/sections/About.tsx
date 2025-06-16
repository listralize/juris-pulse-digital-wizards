
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();
  const { pageTexts, isLoading } = useAdminData();
  const isDark = theme === 'dark';
  
  // Estado local para receber atualizações em tempo real
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);

  // Atualizar quando pageTexts muda
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 About: Recebendo atualização de textos:', event.detail);
      setLocalPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    try {
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
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    } catch (error) {
      console.error('❌ Erro na animação About:', error);
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <section id="about" className={`min-h-screen flex flex-col justify-center py-8 px-4 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="flex justify-center items-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div>
      </section>
    );
  }

  const aboutTitle = localPageTexts?.aboutTitle || 'Sobre Nós';
  const aboutDescription = localPageTexts?.aboutDescription || 'Descrição sobre o escritório';

  return (
    <section 
      id="about" 
      className={`h-full flex flex-col justify-center items-center px-4 md:px-6 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'}`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          ref={titleRef} 
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 font-canela ${isDark ? 'text-white' : 'text-black'}`}
        >
          {aboutTitle}
        </h2>
        
        <p 
          ref={textRef} 
          className={`text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-satoshi ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {aboutDescription}
        </p>
      </div>
    </section>
  );
};

export default About;
