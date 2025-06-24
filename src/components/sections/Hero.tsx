
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Estado local para textos do hero
  const [heroTitle, setHeroTitle] = useState('Excelência Jurídica, Soluções Estratégicas');
  const [heroSubtitle, setHeroSubtitle] = useState('Protegemos seus direitos com dedicação, experiência e resultados comprovados');
  const [heroPrimaryButtonText, setHeroPrimaryButtonText] = useState('Consultoria Gratuita');
  const [heroSecondaryButtonText, setHeroSecondaryButtonText] = useState('Conheça Nossos Serviços');

  // Carregar dados iniciais e escutar atualizações
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        const { data: settings } = await supabase
          .from('site_settings')
          .select('hero_title, hero_subtitle, hero_primary_button_text, hero_secondary_button_text')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          if (settings.hero_title) setHeroTitle(settings.hero_title);
          if (settings.hero_subtitle) setHeroSubtitle(settings.hero_subtitle);
          if (settings.hero_primary_button_text) setHeroPrimaryButtonText(settings.hero_primary_button_text);
          if (settings.hero_secondary_button_text) setHeroSecondaryButtonText(settings.hero_secondary_button_text);
        }
      } catch (error) {
        console.error('❌ Hero: Erro ao carregar dados:', error);
      }
    };

    loadInitialData();

    const handlePageTextsUpdate = (event: CustomEvent) => {
      const data = event.detail;
      if (data && typeof data === 'object') {
        if (data.heroTitle !== undefined) setHeroTitle(data.heroTitle);
        if (data.heroSubtitle !== undefined) setHeroSubtitle(data.heroSubtitle);
        if (data.heroPrimaryButtonText !== undefined) setHeroPrimaryButtonText(data.heroPrimaryButtonText);
        if (data.heroSecondaryButtonText !== undefined) setHeroSecondaryButtonText(data.heroSecondaryButtonText);
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1 }
    ).fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.3"
    ).fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.2"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 opacity-5 ${isDark ? 'bg-white' : 'bg-black'}`}>
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px), 
                             radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <img 
            ref={logoRef}
            src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png"
            alt="Serafim & Trombela Advocacia"
            className="w-80 md:w-96 lg:w-[400px] h-auto mx-auto filter drop-shadow-lg"
          />
        </div>
        
        {/* Title */}
        <h1 
          ref={titleRef}
          className={`text-4xl md:text-6xl lg:text-7xl font-canela mb-8 leading-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {heroTitle}
        </h1>
        
        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className={`text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light ${
            isDark ? 'text-white/80' : 'text-black/70'
          }`}
        >
          {heroSubtitle}
        </p>
        
        {/* Buttons */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link 
            to="/contato"
            className={`px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {heroPrimaryButtonText}
          </Link>
          
          <Link 
            to="#areas"
            className={`px-8 py-4 rounded-lg font-medium text-lg border-2 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'border-white text-white hover:bg-white hover:text-black'
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            {heroSecondaryButtonText}
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-px h-16 ${isDark ? 'bg-white/30' : 'bg-black/30'} relative`}>
            <div 
              className={`w-1 h-4 ${isDark ? 'bg-white/60' : 'bg-black/60'} absolute top-0 left-1/2 transform -translate-x-1/2 animate-pulse`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
