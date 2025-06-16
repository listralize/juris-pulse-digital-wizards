
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Lock, ArrowRight, MessageSquare } from 'lucide-react';

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

  if (isLoading) {
    return (
      <section id="cliente" className={`min-h-screen flex flex-col justify-center py-8 px-4 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="flex justify-center items-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
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
      className={`h-full flex flex-col justify-center items-center py-2 px-4 md:py-4 md:px-6 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'}`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-16">
          <div className="w-full md:w-2/5 order-1 md:order-1">
            <div className="relative mb-4 md:mb-0 bg-black p-6 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-xl"></div>
              <img 
                ref={imageRef}
                src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
                alt="Área do Cliente em Smartphone" 
                className="relative z-10 max-w-full w-full h-auto mx-auto"
                style={{ maxHeight: '600px', objectFit: 'contain' }}
              />
            </div>
          </div>
          
          <div className="w-full md:w-3/5 text-center md:text-left order-2 md:order-2">
            <h2 
              ref={titleRef} 
              className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {clientAreaTitle}
            </h2>
            
            <p 
              ref={textRef} 
              className={`text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {clientAreaDescription}
            </p>
            
            <div className="flex flex-col space-y-3 md:space-y-4">
              <a 
                ref={button1Ref}
                href={clientPortalLink} 
                className={`group relative overflow-hidden rounded-lg md:rounded-xl ${isDark ? 'bg-white text-black' : 'bg-black text-white'} px-6 md:px-8 py-3 md:py-4 transition-all duration-300 hover:shadow-lg flex items-center justify-center text-sm md:text-base`}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-200 to-gray-300 transition-all duration-500 ease-out group-hover:w-full"></span>
                <Lock className={`mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 relative z-10 ${!isDark && 'text-white'}`} />
                <span className="font-medium relative z-10">Acessar minha área</span>
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              <a 
                ref={button2Ref}
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} 
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-lg md:rounded-xl border ${isDark 
                  ? 'border-white/20 text-white' 
                  : 'border-black/20 text-black'} px-6 md:px-8 py-3 md:py-4 transition-all duration-300 hover:shadow-lg flex items-center justify-center text-sm md:text-base`}
              >
                <span className={`absolute inset-0 w-0 ${isDark 
                  ? 'bg-white/10' 
                  : 'bg-black/5'} transition-all duration-500 ease-out group-hover:w-full`}></span>
                <MessageSquare className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 relative z-10" />
                <span className="font-medium relative z-10">Primeiro acesso via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
