
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function() {
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
          textRef1.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: textRef1.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(
          textRef2.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: textRef2.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      },
      '(max-width: 767px)': function() {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, scaleY: 0.9 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(
          textRef1.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: textRef1.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(
          textRef2.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: textRef2.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <section id="about" className={`min-h-screen flex flex-col justify-center py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <h2 ref={titleRef} className={`text-3xl md:text-4xl lg:text-5xl mb-12 font-canela ${isDark ? 'text-white' : 'text-black'}`}>Sobre Nós</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <p ref={textRef1} className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'} font-satoshi`}>
          A história do Serafim & Trombela Advocacia é moldada pelo compromisso com a excelência jurídica e o sucesso de nossos clientes.
        </p>
        
        <p ref={textRef2} className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'} font-satoshi`}>
          Nossa equipe é formada por advogados experientes e apaixonados, que compreendem a fundo os desafios enfrentados por cada cliente. Buscamos soluções inovadoras, eficazes e com foco em resultados reais.
        </p>
      </div>
      
      <div className="mt-16 flex justify-center">
        <div className={`w-24 h-1 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
      </div>
    </section>
  );
};

export default About;
