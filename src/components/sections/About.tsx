
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Estado local para textos da página
  const [aboutTitle, setAboutTitle] = useState('Sobre Nós');
  const [aboutDescription, setAboutDescription] = useState('Descrição sobre o escritório');

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Buscar apenas o registro mais recente
        const { data: settings } = await supabase
          .from('site_settings')
          .select('about_title, about_description')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('📱 About: Dados carregados do Supabase:', settings);
          setAboutTitle(settings.about_title || 'Sobre Nós');
          setAboutDescription(settings.about_description || 'Descrição sobre o escritório');
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados iniciais:', error);
      }
    };

    loadInitialData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 About: Recebendo atualização de textos via evento:', event.detail);
      const { aboutTitle: newTitle, aboutDescription: newDescription } = event.detail;
      
      if (newTitle !== undefined) {
        console.log('📱 About: Atualizando título:', newTitle);
        setAboutTitle(newTitle);
      }
      if (newDescription !== undefined) {
        console.log('📱 About: Atualizando descrição:', newDescription);
        setAboutDescription(newDescription);
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
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
  }, []);

  console.log('🔍 About renderizando com:', { aboutTitle, aboutDescription });

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
