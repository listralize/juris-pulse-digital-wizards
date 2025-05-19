
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const practiceAreas = [
  {
    id: 'family',
    title: 'Direito da Família',
    description: 'Assessoria completa em questões familiares, divórcios, guarda de filhos e partilha de bens.',
    link: '/familia'
  },
  {
    id: 'tax',
    title: 'Direito Tributário',
    description: 'Planejamento tributário estratégico e defesa em processos administrativos e judiciais.',
    link: '/tributario'
  },
  {
    id: 'corporate',
    title: 'Direito Empresarial',
    description: 'Consultoria jurídica para empresas, contratos, fusões, aquisições e compliance.',
    link: '/empresarial'
  },
  {
    id: 'labor',
    title: 'Direito do Trabalho',
    description: 'Assessoria para empresas e empregados em questões trabalhistas e previdenciárias.',
    link: '/trabalho'
  },
  {
    id: 'constitutional',
    title: 'Direito Constitucional',
    description: 'Atuação em causas que envolvem direitos e garantias fundamentais.',
    link: '/constitucional'
  },
  {
    id: 'administrative',
    title: 'Direito Administrativo',
    description: 'Representação perante órgãos públicos e defesa em processos administrativos.',
    link: '/administrativo'
  },
  {
    id: 'social-security',
    title: 'Direito Previdenciário',
    description: 'Orientação em benefícios previdenciários, aposentadorias e revisões.',
    link: '/previdenciario'
  },
  {
    id: 'consumer',
    title: 'Direito do Consumidor',
    description: 'Defesa dos direitos do consumidor em relações de consumo.',
    link: '/consumidor'
  }
];

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
    
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <section 
      id="areas" 
      ref={sectionRef} 
      className={`min-h-screen py-20 px-6 md:px-16 lg:px-24 relative ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      {!isDark && <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white opacity-50 z-[-1]"></div>}
      
      <h2 ref={titleRef} className={`text-3xl md:text-4xl lg:text-5xl mb-12 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
        Áreas de Atuação
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceAreas.map((area, index) => (
          <Link to={area.link} key={area.id}>
            <Card 
              ref={(el) => (cardsRef.current[index] = el)}
              className={`border transition-all duration-300 h-full ${
                isDark 
                  ? 'border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-900' 
                  : 'border-gray-100 shadow-sm hover:shadow-lg bg-white/80 backdrop-blur-sm'
              }`}
            >
              <CardContent className="p-8">
                <h3 className={`text-xl md:text-2xl mb-4 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                  {area.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi`}>
                  {area.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PracticeAreas;
