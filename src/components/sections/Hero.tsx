import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import NeuralBackground from '../NeuralBackground';
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const {
    theme
  } = useTheme();
  const isDark = theme === 'dark';
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  // Estados para os textos editáveis
  const [heroTitle, setHeroTitle] = useState('Excelência em Advocacia');
  const [heroSubtitle, setHeroSubtitle] = useState('Defendemos seus direitos com dedicação e expertise');
  const [primaryButtonText, setPrimaryButtonText] = useState('Fale Conosco');
  const [primaryButtonLink, setPrimaryButtonLink] = useState('https://api.whatsapp.com/send?phone=5562994594496');
  const [secondaryButtonText, setSecondaryButtonText] = useState('Conheça Nossas Áreas de Atuação');
  const [secondaryButtonLink, setSecondaryButtonLink] = useState('#areas');

  // Carregar dados do Supabase e event listeners
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        console.log('🦸 Hero: Carregando dados iniciais...');
        const {
          supabase
        } = await import('../../integrations/supabase/client');
        const {
          data: settings
        } = await supabase.from('site_settings').select('*').order('updated_at', {
          ascending: false
        }).limit(1).maybeSingle();
        if (settings) {
          console.log('🦸 Hero: Dados carregados do Supabase:', settings);
          if (settings.hero_title) setHeroTitle(settings.hero_title);
          if (settings.hero_subtitle) setHeroSubtitle(settings.hero_subtitle);
          if (settings.hero_primary_button_text) setPrimaryButtonText(settings.hero_primary_button_text);
          if (settings.hero_primary_button_link) setPrimaryButtonLink(settings.hero_primary_button_link);
          if (settings.hero_secondary_button_text) setSecondaryButtonText(settings.hero_secondary_button_text);
          if (settings.hero_secondary_button_link) setSecondaryButtonLink(settings.hero_secondary_button_link);
        }
      } catch (error) {
        console.error('❌ Hero: Erro ao carregar dados:', error);
      }
    };
    loadHeroData();
  }, []);
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🦸 Hero: Evento pageTextsUpdated recebido:', event.detail);
      const data = event.detail;
      if (data.heroTitle !== undefined) {
        console.log('🦸 Hero: Atualizando título para:', data.heroTitle);
        setHeroTitle(data.heroTitle);
      }
      if (data.heroSubtitle !== undefined) {
        console.log('🦸 Hero: Atualizando subtítulo para:', data.heroSubtitle);
        setHeroSubtitle(data.heroSubtitle);
      }
      if (data.heroPrimaryButtonText !== undefined) {
        console.log('🦸 Hero: Atualizando botão primário para:', data.heroPrimaryButtonText);
        setPrimaryButtonText(data.heroPrimaryButtonText);
      }
      if (data.heroPrimaryButtonLink !== undefined) {
        setPrimaryButtonLink(data.heroPrimaryButtonLink);
      }
      if (data.heroSecondaryButtonText !== undefined) {
        console.log('🦸 Hero: Atualizando botão secundário para:', data.heroSecondaryButtonText);
        setSecondaryButtonText(data.heroSecondaryButtonText);
      }
      if (data.heroSecondaryButtonLink !== undefined) {
        setSecondaryButtonLink(data.heroSecondaryButtonLink);
      }
    };
    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  // Animações simplificadas
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });
    tl.fromTo(logoRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1
    }).fromTo(headlineRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6").fromTo(subheadlineRef.current, {
      opacity: 0,
      y: 15
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.4").fromTo(ctaRef.current, {
      opacity: 0,
      y: 15,
      scale: 0.95
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6
    }, "-=0.3");
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Detectar mobile/tablet
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Alternância entre indicadores de scroll - APENAS DESKTOP
  useEffect(() => {
    // Só mostrar indicadores no desktop
    if (isMobile || isTablet) return;
    const interval = setInterval(() => {
      setShowScrollIndicator(prev => !prev);
    }, 3000); // Alterna a cada 3 segundos

    return () => clearInterval(interval);
  }, [isMobile, isTablet]);

  // Função para navegar para a seção de áreas
  const handleAreasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🎯 Hero: Navegando para seção areas');

    // Disparar evento correto para o sistema de transição
    window.dispatchEvent(new CustomEvent('sectionChange', {
      detail: 'areas'
    }));
  };
  return <section id="home" className="h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-black">
      {/* Neural Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <NeuralBackground />
      </div>
      
      {/* Overlay gradient */}
      <div className=""></div>
      
      {/* conteúdo centralizado */}
      <div className="relative z-10 text-center max-w-4xl h-full flex flex-col justify-center items-center -mt-8 md:-mt-12">
        <div ref={logoRef} className="mb-6 md:mb-8 w-full max-w-sm md:max-w-lg mx-auto relative">
          <div className="logo-container relative">
            <img src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" alt="Serafim & Trombela Advocacia Logo" className="w-full h-auto relative z-10 hover:scale-105 transition-transform duration-300" style={{
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.7))'
          }} />
          </div>
        </div>
        
        
        
        <p ref={subheadlineRef} className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 text-center max-w-xl mx-auto font-satoshi leading-relaxed">
          {heroSubtitle}
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-3 justify-center">
          <a href={primaryButtonLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 hover:text-black border border-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {primaryButtonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <button onClick={handleAreasClick} className="group flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white hover:bg-white hover:text-black text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/30" tabIndex={0} onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAreasClick(e as any);
          }
        }} aria-label="Navegar para a seção de áreas de atuação">
            {secondaryButtonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Indicador de scroll dinâmico alternado - APENAS DESKTOP */}
      {!isMobile && !isTablet && <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-3">
            {showScrollIndicator ? <div className="flex flex-col items-center gap-2 animate-bounce">
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <span>Role para baixo</span>
                  <ChevronDown className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{
              animationDelay: '0.3s'
            }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{
              animationDelay: '0.6s'
            }}></div>
                </div>
              </div> : <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4 animate-pulse" style={{
              animation: 'pulse 1s infinite, translateX 2s infinite alternate'
            }} />
                  <span>Use as setas</span>
                  <ArrowRight className="w-4 h-4 animate-pulse" style={{
              animation: 'pulse 1s infinite, translateX 2s infinite alternate-reverse'
            }} />
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{
              animationDelay: '0.3s'
            }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{
              animationDelay: '0.6s'
            }}></div>
                </div>
              </div>}
          </div>
        </div>}
    </section>;
};
export default Hero;