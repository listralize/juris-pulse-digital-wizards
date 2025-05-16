
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClientArea = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
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
      className="min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-16 lg:px-24 bg-gray-50"
    >
      <div className="max-w-2xl text-center">
        <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl mb-8 font-canela">
          Área Exclusiva do Cliente
        </h2>
        
        <p ref={textRef} className="text-lg md:text-xl mb-12 font-satoshi text-gray-700">
          Acompanhe seus processos com total segurança e transparência.
        </p>
        
        <div className="flex flex-col space-y-4">
          <a 
            ref={button1Ref}
            href="#" 
            className="bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-all duration-300 font-satoshi flex items-center justify-center"
          >
            <span className="mr-2">🔐</span> Acessar minha área
          </a>
          
          <a 
            ref={button2Ref}
            href="https://api.whatsapp.com/send?phone=5562994594496" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black border border-black px-8 py-4 rounded hover:bg-gray-100 transition-all duration-300 font-satoshi flex items-center justify-center"
          >
            <span className="mr-2">📲</span> Primeiro acesso via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
