
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import MarbleBanner from '../MarbleBanner';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Estados para os textos editáveis
  const [heroTitle, setHeroTitle] = useState('Excelência em Advocacia');
  const [heroSubtitle, setHeroSubtitle] = useState('Defendemos seus direitos com dedicação e expertise');
  const [primaryButtonText, setPrimaryButtonText] = useState('Fale Conosco no WhatsApp');
  const [primaryButtonLink, setPrimaryButtonLink] = useState('https://api.whatsapp.com/send?phone=5562994594496');
  const [secondaryButtonText, setSecondaryButtonText] = useState('Conheça Nossas Áreas de Atuação');
  const [secondaryButtonLink, setSecondaryButtonLink] = useState('#areas');

  // Carregar dados do Supabase
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('🦸 Hero: Dados carregados do Supabase:', settings);
          setHeroTitle(settings.hero_title || 'Excelência em Advocacia');
          setHeroSubtitle(settings.hero_subtitle || 'Defendemos seus direitos com dedicação e expertise');
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
        heroPrimaryButtonText,
        heroPrimaryButtonLink,
        heroSecondaryButtonText,
        heroSecondaryButtonLink
      } = event.detail;
      
      if (newTitle !== undefined) {
        console.log('🦸 Hero: Atualizando título:', newTitle);
        setHeroTitle(newTitle);
      }
      if (newSubtitle !== undefined) {
        console.log('🦸 Hero: Atualizando subtítulo:', newSubtitle);
        setHeroSubtitle(newSubtitle);
      }
      if (heroPrimaryButtonText !== undefined) {
        console.log('🦸 Hero: Atualizando texto do botão primário:', heroPrimaryButtonText);
        setPrimaryButtonText(heroPrimaryButtonText);
      }
      if (heroPrimaryButtonLink !== undefined) {
        console.log('🦸 Hero: Atualizando link do botão primário:', heroPrimaryButtonLink);
        setPrimaryButtonLink(heroPrimaryButtonLink);
      }
      if (heroSecondaryButtonText !== undefined) {
        console.log('🦸 Hero: Atualizando texto do botão secundário:', heroSecondaryButtonText);
        setSecondaryButtonText(heroSecondaryButtonText);
      }
      if (heroSecondaryButtonLink !== undefined) {
        console.log('🦸 Hero: Atualizando link do botão secundário:', heroSecondaryButtonLink);
        setSecondaryButtonLink(heroSecondaryButtonLink);
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
      bgRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5 }
    )
    .fromTo(
      logoRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.5 },
      "-=1"
    )
    .fromTo(
      headlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.7"
    )
    .fromTo(
      subheadlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );
    
    // Parallax effect
    gsap.to(bgRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="home" className="h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden bg-black">
      {/* Background com marble banner */}
      <div ref={bgRef} className="absolute inset-0 z-0 w-full h-full" style={{ transform: 'scale(1.2)' }}>
        <MarbleBanner />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl h-full flex flex-col justify-center items-center -mt-8 md:-mt-12">
        <div 
          ref={logoRef} 
          className="mb-2 md:mb-4 w-full max-w-sm md:max-w-lg mx-auto relative"
        >
          <div className="logo-container relative">
            <img 
              src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png"
              alt="Serafim & Trombela Advocacia Logo"
              className="w-full h-auto relative z-10"
              style={{
                filter: 'drop-shadow(5px 8px 12px rgba(0,0,0,0.95))'
              }}
            />
          </div>
        </div>
        
        <h1 ref={headlineRef} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 md:mb-3 text-center max-w-3xl mx-auto font-canela tracking-tight text-white">
          {heroTitle}
        </h1>
        
        <p ref={subheadlineRef} className="text-base md:text-lg lg:text-xl text-gray-200 mb-4 md:mb-6 text-center max-w-lg mx-auto font-satoshi">
          {heroSubtitle}
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-3 justify-center">
          <a 
            href={primaryButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="elegant-button flex items-center justify-center gap-2 bg-white text-black hover:bg-black hover:text-white hover:border-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
          >
            {primaryButtonText}
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <a 
            href={secondaryButtonLink}
            className="elegant-button flex items-center justify-center gap-2 bg-transparent text-white border-white hover:bg-white hover:text-black text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
          >
            {secondaryButtonText}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M7 13L12 18L17 13" 
            stroke="#FFFFFF"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M7 7L12 12L17 7" 
            stroke="#FFFFFF"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
