
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Lock, ArrowRight, MessageSquare, Crown } from 'lucide-react';
import NeuralBackground from '../NeuralBackground';

gsap.registerPlugin(ScrollTrigger);

const ClientArea = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();
  const { pageTexts, isLoading } = useAdminData();
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(false);
  
  // Estado local para receber atualizações em tempo real
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);

  // Atualizar quando pageTexts muda
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 ClientArea: Recebendo atualização de textos:', event.detail);
      setLocalPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);
  
  useEffect(() => {
    if (isLoading) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
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
    
    gsap.fromTo(
      button1Ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: button1Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      button2Ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: button2Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [isLoading]);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <section className={`${isDark ? 'bg-black' : 'bg-white'} h-screen flex items-center justify-center`}>
        <div className="relative">
          <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${isDark ? 'border-white/20' : 'border-black/20'}`}></div>
          <div className={`absolute inset-0 w-8 h-8 border-2 border-transparent border-t-current rounded-full animate-spin ${isDark ? 'text-white' : 'text-black'}`}></div>
        </div>
      </section>
    );
  }

  const whatsappNumber = localPageTexts?.contactTexts?.whatsapp || '5562994594496';
  const clientPortalLink = localPageTexts?.clientPortalLink || '#';
  const clientAreaTitle = localPageTexts?.clientAreaTitle || 'Área do Cliente';
  const clientAreaDescription = localPageTexts?.clientAreaDescription || 'Acesse sua área restrita para acompanhar seus processos';

  return (
    <section 
      id="cliente" 
      className={`${isDark ? 'bg-black' : 'bg-white'} flex flex-col overflow-visible relative`}
      style={{
        height: 'auto',
        minHeight: 'auto',
        maxHeight: 'none',
        padding: isMobile ? '2rem 1rem' : '4rem 2rem'
      }}
    >
      {/* Neural Background */}
      {isDark && <NeuralBackground />}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Container centralizado */}
        <div className="flex flex-col items-center justify-center">
          {/* Header padronizado */}
          <div className="text-center mb-8 md:mb-12">
            <h2 
              ref={titleRef}
              className={`text-3xl md:text-4xl lg:text-5xl mb-4 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {clientAreaTitle}
            </h2>
            <div className={`w-20 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl w-full items-center">
            {/* Imagem com label melhorada */}
            <div ref={imageRef} className="flex justify-center items-center order-2 lg:order-1">
              <div className="relative">
                {/* Container da imagem */}
                <div className="bg-black rounded-2xl p-6 relative">
                  <img 
                    src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
                    alt="Área do Cliente em Smartphone" 
                    className="w-full max-w-sm h-auto object-contain"
                  />
                </div>
                
                {/* Label Premium repositionada e melhorada */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="relative">
                    {/* Badge principal */}
                    <div className={`
                      px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase 
                      flex items-center gap-2 whitespace-nowrap shadow-lg
                      ${isDark 
                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black' 
                        : 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black'
                      }
                    `}>
                      <Crown className="w-3 h-3" />
                      <span>EXCLUSIVO PARA CLIENTES ST PRIME</span>
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`
                      absolute inset-0 rounded-full blur-sm opacity-30
                      ${isDark 
                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400' 
                        : 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500'
                      }
                    `}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Conteúdo */}
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <p 
                ref={textRef}
                className={`text-lg md:text-xl leading-relaxed mb-8 font-satoshi ${isDark ? 'text-white/90' : 'text-black/90'}`}
              >
                {clientAreaDescription}
              </p>
              
              <div className="flex flex-col space-y-4">
                <a 
                  ref={button1Ref}
                  href={clientPortalLink} 
                  className={`group relative overflow-hidden rounded-lg px-6 py-4 transition-all duration-300 hover:shadow-xl flex items-center justify-center text-base font-medium ${
                    isDark 
                      ? 'bg-white text-black hover:bg-gray-100 shadow-lg' 
                      : 'bg-black text-white hover:bg-gray-800 shadow-lg'
                  }`}
                >
                  <Lock className="mr-3 h-5 w-5" />
                  <span>Acessar minha área</span>
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                
                <a 
                  ref={button2Ref}
                  href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-lg border-2 px-6 py-4 transition-all duration-300 hover:shadow-xl flex items-center justify-center text-base font-medium ${
                    isDark 
                      ? 'border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 shadow-lg' 
                      : 'border-black/40 text-black bg-black/10 hover:bg-black/20 hover:border-black/60 shadow-lg'
                  }`}
                >
                  <MessageSquare className="mr-3 h-5 w-5" />
                  <span>Primeiro acesso via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
