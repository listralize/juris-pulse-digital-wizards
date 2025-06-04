
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollArea } from '../ui/scroll-area';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { theme } = useTheme();
  const { pageTexts, servicePages, isLoading } = useSupabaseDataNew();
  const isDark = theme === 'dark';

  // Usar servicePages do Supabase em vez de dados hardcoded
  const practiceAreas = servicePages.map(page => ({
    id: page.id,
    title: page.title,
    description: page.description,
    href: page.href?.startsWith('/') ? page.href : `/servicos/${page.href}`
  }));

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
      <section id="areas" className={`min-h-screen flex flex-col justify-center py-8 px-4 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-black'}`}>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="areas"
      ref={sectionRef}
      className="bg-black text-white h-full py-2 px-4 md:py-4 md:px-6 lg:px-24 relative"
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col h-full justify-center">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 md:mb-3 font-canela text-center text-white"
        >
          {pageTexts.areasTitle}
        </h2>
        
        <div className="flex-1 flex items-center">
          {/* Mobile: Grid compacto sem scroll */}
          <div className="md:hidden grid grid-cols-1 gap-2 w-full max-h-[70vh] overflow-y-auto">
            {practiceAreas.map((area, index) => (
              <Link 
                key={area.id}
                to={area.href}
                className="group block"
              >
                <div 
                  className="bg-black/80 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105"
                  ref={el => cardsRef.current[index] = el}
                >
                  <div className="p-3">
                    <h3 className="text-base font-canela mb-1 text-white">
                      {area.title}
                    </h3>
                    <p className="text-xs text-gray-300">
                      {area.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: Grid com scroll area centralizado */}
          <div className="hidden md:block w-full">
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-4">
                {practiceAreas.map((area, index) => (
                  <Link 
                    key={area.id}
                    to={area.href}
                    className="group block"
                  >
                    <div 
                      className="bg-black/80 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 h-full"
                      ref={el => cardsRef.current[index] = el}
                    >
                      <div className="p-4 lg:p-6">
                        <h3 className="text-lg lg:text-xl xl:text-2xl font-canela mb-3 text-white">
                          {area.title}
                        </h3>
                        <p className="text-sm text-gray-300">
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
      </div>
    </section>
  );
};

export default PracticeAreas;
