
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Estados para os textos editáveis  
  const [heroTitle, setHeroTitle] = useState('Excelência em Advocacia');
  const [heroSubtitle, setHeroSubtitle] = useState('Defendemos seus direitos com dedicação e expertise');
  const [heroButtonContact, setHeroButtonContact] = useState('Fale Conosco');
  const [heroButtonServices, setHeroButtonServices] = useState('Conheça Nossas Áreas de Atuação');

  // Carregar dados do Supabase
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('hero_title, hero_subtitle, hero_button_contact, hero_button_services')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('🦸 Hero: Dados carregados do Supabase:', settings);
          setHeroTitle(settings.hero_title || 'Excelência em Advocacia');
          setHeroSubtitle(settings.hero_subtitle || 'Defendemos seus direitos com dedicação e expertise');
          setHeroButtonContact(settings.hero_button_contact || 'Fale Conosco');
          setHeroButtonServices(settings.hero_button_services || 'Conheça Nossas Áreas de Atuação');
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados do Hero:', error);
      }
    };

    loadHeroData();
  }, []);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🦸 Hero: Recebendo atualização de textos:', event.detail);
      const { 
        heroTitle: newTitle, 
        heroSubtitle: newSubtitle,
        heroButtonContact: newButtonContact,
        heroButtonServices: newButtonServices
      } = event.detail;
      
      if (newTitle !== undefined) {
        console.log('🦸 Hero: Atualizando título:', newTitle);
        setHeroTitle(newTitle);
      }
      if (newSubtitle !== undefined) {
        console.log('🦸 Hero: Atualizando subtítulo:', newSubtitle);
        setHeroSubtitle(newSubtitle);
      }
      if (newButtonContact !== undefined) {
        console.log('🦸 Hero: Atualizando botão contato:', newButtonContact);
        setHeroButtonContact(newButtonContact);
      }
      if (newButtonServices !== undefined) {
        console.log('🦸 Hero: Atualizando botão serviços:', newButtonServices);
        setHeroButtonServices(newButtonServices);
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
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2 }
    ).fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke={isDark ? "white" : "black"} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Logo */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png"
          alt="Serafim & Trombela Advocacia Logo"
          className="h-24 md:h-32 w-auto"
          style={{
            filter: isDark 
              ? 'drop-shadow(0 0 25px rgba(255,255,255,0.3)) drop-shadow(5px 8px 15px rgba(0,0,0,0.95))'
              : 'drop-shadow(0 0 25px rgba(0,0,0,0.3)) drop-shadow(5px 8px 15px rgba(0,0,0,0.15))'
          }}
        />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div ref={contentRef}>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-canela tracking-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {heroTitle}
          </h1>
          
          <p className={`text-lg md:text-xl lg:text-2xl mb-12 font-satoshi max-w-2xl mx-auto ${
            isDark ? 'text-white/80' : 'text-black/80'
          }`}>
            {heroSubtitle}
          </p>
        </div>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/#contact"
            className={`group inline-flex items-center justify-center px-8 py-4 font-satoshi font-medium transition-all duration-300 rounded-lg ${
              isDark 
                ? 'bg-white text-black hover:bg-white/90 hover:shadow-lg' 
                : 'bg-black text-white hover:bg-black/90 hover:shadow-lg'
            }`}
          >
            {heroButtonContact}
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link 
            to="/#areas"
            className={`group inline-flex items-center justify-center px-8 py-4 font-satoshi font-medium border transition-all duration-300 rounded-lg ${
              isDark 
                ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/40' 
                : 'border-black/20 text-black hover:bg-black/5 hover:border-black/40'
            }`}
          >
            {heroButtonServices}
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
