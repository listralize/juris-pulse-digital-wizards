
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { Lock, ArrowRight, WhatsApp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ClientArea = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
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
  }, []);

  return (
    <section 
      id="client" 
      className={`min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Mobile Image Column */}
          <div className="w-full md:w-2/5">
            <div className="relative mb-8 md:mb-0 bg-black p-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-xl"></div>
              <img 
                ref={imageRef}
                src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
                alt="Área do Cliente em Smartphone" 
                className="relative z-10 max-w-full w-full h-auto mx-auto"
              />
            </div>
          </div>
          
          {/* Content Column */}
          <div className="w-full md:w-3/5 text-center md:text-left">
            <h2 
              ref={titleRef} 
              className={`text-3xl md:text-4xl lg:text-5xl mb-6 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              Área Exclusiva do Cliente
            </h2>
            
            <p 
              ref={textRef} 
              className={`text-lg md:text-xl mb-8 font-satoshi ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Acompanhe seus processos com total segurança e transparência. Acesse documentos, atualizações e comunicações com seu advogado em um só lugar.
            </p>
            
            <div className="flex flex-col space-y-4">
              <a 
                ref={button1Ref}
                href="#" 
                className={`group relative overflow-hidden rounded-xl ${isDark ? 'bg-white text-black' : 'bg-black text-white'} px-8 py-4 transition-all duration-300 hover:shadow-lg flex items-center justify-center`}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-200 to-gray-300 transition-all duration-500 ease-out group-hover:w-full"></span>
                <Lock className={`mr-3 h-5 w-5 relative z-10 ${!isDark && 'text-white'}`} />
                <span className="font-medium relative z-10">Acessar minha área</span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              <a 
                ref={button2Ref}
                href="https://api.whatsapp.com/send?phone=5562994594496" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-xl border ${isDark 
                  ? 'border-white/20 text-white' 
                  : 'border-black/20 text-black'} px-8 py-4 transition-all duration-300 hover:shadow-lg flex items-center justify-center`}
              >
                <span className={`absolute inset-0 w-0 ${isDark 
                  ? 'bg-white/10' 
                  : 'bg-black/5'} transition-all duration-500 ease-out group-hover:w-full`}></span>
                <WhatsApp className="mr-3 h-5 w-5 relative z-10" />
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
