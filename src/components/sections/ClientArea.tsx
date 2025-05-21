import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

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
      <div className={`max-w-2xl rounded-2xl ${isDark ? '' : 'bg-black text-white'} py-16 px-8 md:px-12`}>
        <div className="mb-8 flex justify-center">
          <img 
            ref={imageRef}
            src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
            alt="Área do Cliente em Smartphone" 
            className="max-w-[280px] md:max-w-[320px] lg:max-w-[350px] h-auto" 
          />
        </div>
        
        <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl mb-8 font-canela text-white">
          Área Exclusiva do Cliente
        </h2>
        
        <p ref={textRef} className="text-lg md:text-xl mb-12 font-satoshi text-gray-300">
          Acompanhe seus processos com total segurança e transparência.
        </p>
        
        <div className="flex flex-col space-y-4">
          <a 
            ref={button1Ref}
            href="#" 
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded transition-all duration-300 font-satoshi flex items-center justify-center"
          >
            <span className="mr-2">🔐</span> Acessar minha área
          </a>
          
          <a 
            ref={button2Ref}
            href="https://api.whatsapp.com/send?phone=5562994594496" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white border border-white hover:bg-gray-900 px-8 py-4 rounded transition-all duration-300 font-satoshi flex items-center justify-center"
          >
            <span className="mr-2">📲</span> Primeiro acesso via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
