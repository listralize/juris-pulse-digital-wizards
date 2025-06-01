
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { theme } = useTheme();
  const { pageTexts, isLoading } = useAdminData();
  const isDark = theme === 'dark';

  const practiceAreas = [
    {
      id: 'familia',
      title: pageTexts.familiaTitle,
      description: pageTexts.familiaDescription,
      href: '/familia'
    },
    {
      id: 'tributario',
      title: pageTexts.tributarioTitle,
      description: pageTexts.tributarioDescription,
      href: '/tributario'
    },
    {
      id: 'empresarial',
      title: pageTexts.empresarialTitle,
      description: pageTexts.empresarialDescription,
      href: '/empresarial'
    },
    {
      id: 'trabalho',
      title: pageTexts.trabalhoTitle,
      description: pageTexts.trabalhoDescription,
      href: '/trabalho'
    },
    {
      id: 'constitucional',
      title: pageTexts.constitucionalTitle,
      description: pageTexts.constitucionalDescription,
      href: '/constitucional'
    },
    {
      id: 'administrativo',
      title: pageTexts.administrativoTitle,
      description: pageTexts.administrativoDescription,
      href: '/administrativo'
    },
    {
      id: 'previdenciario',
      title: pageTexts.previdenciarioTitle,
      description: pageTexts.previdenciarioDescription,
      href: '/previdenciario'
    },
    {
      id: 'consumidor',
      title: pageTexts.consumidorTitle,
      description: pageTexts.consumidorDescription,
      href: '/consumidor'
    },
    {
      id: 'civil',
      title: pageTexts.civilTitle,
      description: pageTexts.civilDescription,
      href: '/civil'
    }
  ];

  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6
      }
    );
    
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <section id="areas" className={`min-h-screen flex flex-col justify-center py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className="flex justify-center items-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="areas"
      ref={sectionRef}
      className={`min-h-screen py-20 px-6 md:px-16 lg:px-24 relative ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className={`text-3xl md:text-4xl lg:text-5xl mb-12 font-canela text-center ${isDark ? 'text-white' : 'text-black'}`}
        >
          {pageTexts.areasTitle}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {practiceAreas.map((area, index) => (
            <Link 
              key={area.id}
              to={area.href}
              className="group block"
            >
              <div 
                className={`${isDark ? 'bg-black/80 border border-white/10' : 'bg-white/80 border border-black/10'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 h-full`}
                ref={el => cardsRef.current[index] = el}
              >
                <div className="p-6 md:p-8">
                  <h3 className={`text-2xl md:text-3xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                    {area.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {area.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
