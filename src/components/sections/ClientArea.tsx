
import React, { useEffect, useRef } from 'react';
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

  const whatsappNumber = pageTexts.contactTexts.whatsapp || '5562994594496';
  const clientPortalLink = pageTexts.clientPortalLink || '#';

  return (
    <section 
      id="cliente" 
      className={`h-full py-6 px-4 md:py-8 md:px-6 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'}`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          {/* Imagem centralizada */}
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
            <div className="relative bg-black p-8 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className="absolute -top-3 -right-3 w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-xl"></div>
              <img 
                ref={imageRef}
                src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
                alt="Área do Cliente em Smartphone" 
                className="relative z-10 w-full h-auto max-h-[500px] md:max-h-[600px] object-contain"
              />
            </div>
          </div>
          
          {/* Conteúdo textual centralizado */}
          <div className="w-full max-w-4xl">
            <h2 
              ref={titleRef} 
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {pageTexts.clientAreaTitle}
            </h2>
            
            <p 
              ref={textRef} 
              className={`text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 md:mb-12 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {pageTexts.clientAreaDescription}
            </p>
            
            {/* Botões centralizados */}
            <div className="flex flex-col space-y-4 md:space-y-6 max-w-md mx-auto">
              <a 
                ref={button1Ref}
                href={clientPortalLink} 
                className={`group relative overflow-hidden rounded-xl ${isDark ? 'bg-white text-black' : 'bg-black text-white'} px-8 py-4 md:py-5 transition-all duration-300 hover:shadow-lg flex items-center justify-center text-base md:text-lg`}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-200 to-gray-300 transition-all duration-500 ease-out group-hover:w-full"></span>
                <Lock className={`mr-3 h-5 w-5 md:h-6 md:w-6 relative z-10 ${!isDark && 'text-white'}`} />
                <span className="font-medium relative z-10">Acessar minha área</span>
                <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              <a 
                ref={button2Ref}
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} 
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-xl border ${isDark 
                  ? 'border-white/20 text-white' 
                  : 'border-black/20 text-black'} px-8 py-4 md:py-5 transition-all duration-300 hover:shadow-lg flex items-center justify-center text-base md:text-lg`}
              >
                <span className={`absolute inset-0 w-0 ${isDark 
                  ? 'bg-white/10' 
                  : 'bg-black/5'} transition-all duration-500 ease-out group-hover:w-full`}></span>
                <MessageSquare className="mr-3 h-5 w-5 md:h-6 md:w-6 relative z-10" />
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
