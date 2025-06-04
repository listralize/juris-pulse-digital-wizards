
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollArea } from '../ui/scroll-area';
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
      href: '/areas/familia'
    },
    {
      id: 'tributario',
      title: pageTexts.tributarioTitle,
      description: pageTexts.tributarioDescription,
      href: '/areas/tributario'
    },
    {
      id: 'empresarial',
      title: pageTexts.empresarialTitle,
      description: pageTexts.empresarialDescription,
      href: '/areas/empresarial'
    },
    {
      id: 'trabalho',
      title: pageTexts.trabalhoTitle,
      description: pageTexts.trabalhoDescription,
      href: '/areas/trabalho'
    },
    {
      id: 'constitucional',
      title: pageTexts.constitucionalTitle,
      description: pageTexts.constitucionalDescription,
      href: '/areas/constitucional'
    },
    {
      id: 'administrativo',
      title: pageTexts.administrativoTitle,
      description: pageTexts.administrativoDescription,
      href: '/areas/administrativo'
    },
    {
      id: 'previdenciario',
      title: pageTexts.previdenciarioTitle,
      description: pageTexts.previdenciarioDescription,
      href: '/areas/previdenciario'
    },
    {
      id: 'consumidor',
      title: pageTexts.consumidorTitle,
      description: pageTexts.consumidorDescription,
      href: '/areas/consumidor'
    },
    {
      id: 'civil',
      title: pageTexts.civilTitle,
      description: pageTexts.civilDescription,
      href: '/areas/civil'
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
      className={`h-full py-8 px-4 md:py-20 md:px-6 lg:px-24 relative ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col h-full">
        <h2 
          ref={titleRef}
          className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 md:mb-12 font-canela text-center ${isDark ? 'text-white' : 'text-black'}`}
        >
          {pageTexts.areasTitle}
        </h2>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pb-4">
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
                    <div className="p-4 md:p-6 lg:p-8">
                      <h3 className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-canela mb-3 md:mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                        {area.title}
                      </h3>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {area.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
