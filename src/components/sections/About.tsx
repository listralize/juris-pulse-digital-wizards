import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import NeuralBackground from '../NeuralBackground';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { pageTexts, isLoading } = useSupabaseDataNew();
  
  // Estado local para receber atualizações em tempo real
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

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
      buttonRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [isLoading]);

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

  const aboutTitle = localPageTexts?.aboutTitle || 'Sobre Nós';
  const aboutDescription = localPageTexts?.aboutDescription || 'Somos especialistas em direito com anos de experiência.';
  const whatsappNumber = localPageTexts?.contactTexts?.whatsapp || '5562994594496';

  return (
    <section 
      id="about" 
      className={`${isDark ? 'bg-black' : 'bg-white'} h-screen flex flex-col overflow-hidden relative`}
      style={{
        marginTop: isMobile ? '0' : '-30px'
      }}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
        {/* Container centralizado com padrão uniforme */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Header padronizado - mesmo padrão de todas as outras seções */}
          <div className="text-center mb-6">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {aboutTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Content Grid - padronizado com ordem invertida */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
            {/* Imagem agora na primeira coluna (esquerda) */}
            <div ref={imageRef} className="flex justify-center items-center order-2 lg:order-1">
              <img 
                src="/lovable-uploads/6961999b-9861-4149-8a9c-695274335c49.png"
                alt="Sobre Nós" 
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
            
            {/* Conteúdo agora na segunda coluna (direita) */}
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <p 
                ref={textRef}
                className={`text-base md:text-lg leading-relaxed mb-6 font-satoshi ${isDark ? 'text-white/80' : 'text-black/80'}`}
              >
                {aboutDescription}
              </p>
              
              <a 
                ref={buttonRef}
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} 
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-lg px-6 py-3 transition-all duration-300 hover:shadow-lg flex items-center justify-center text-sm md:text-base ${
                  isDark 
                    ? 'bg-white text-black hover:bg-gray-100' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp mr-2 h-4 w-4 md:h-5 md:w-5"><path d="m2.81 14.42 1.58 4.58a1 1 0 0 0 .86.64l4.79.93 2.45-2.53"/><path d="M18.51 7.49c-2.72-2.72-6.35-3.5-10.19-1.9a11 11 0 0 0-4.14 3.68l-.43.43-1.47 4.29 4.3-1.41.44-.44a11 11 0 0 0 3.53-4.06c1.6-3.61.92-7.13-1.8-9.86l-.08-.08ZM15 9l-6 6m3-3 3 3"/>
                </svg>
                <span className="font-medium">Fale Conosco via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
