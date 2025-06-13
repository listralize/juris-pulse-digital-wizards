
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
  const { pageTexts, categories, servicePages, isLoading } = useSupabaseDataNew();
  const isDark = theme === 'dark';

  console.log('🔍 PracticeAreas DADOS:', {
    categoriesCount: categories?.length || 0,
    servicePagesCount: servicePages?.length || 0,
    isLoading,
    categories,
    servicePages
  });

  // Gerar áreas de atuação baseadas nas categorias do Supabase
  const practiceAreas = React.useMemo(() => {
    if (!categories || categories.length === 0) {
      console.log('⚠️ Nenhuma categoria encontrada, usando áreas padrão');
      // Áreas padrão como fallback
      return [
        {
          id: 'familia-fallback',
          title: 'Direito de Família',
          description: 'Proteção e orientação em questões familiares',
          href: '/areas/familia'
        },
        {
          id: 'tributario-fallback', 
          title: 'Direito Tributário',
          description: 'Consultoria e planejamento tributário',
          href: '/areas/tributario'
        },
        {
          id: 'empresarial-fallback',
          title: 'Direito Empresarial', 
          description: 'Suporte jurídico para empresas',
          href: '/areas/empresarial'
        }
      ];
    }

    return categories.map(category => {
      const categoryPages = servicePages?.filter(page => 
        page.category === category.value
      ) || [];

      console.log(`📂 Categoria ${category.label}: ${categoryPages.length} páginas`);

      return {
        id: category.id || category.value,
        title: category.label || category.name,
        description: category.description || `Serviços especializados em ${category.label}`,
        href: `/areas/${category.value}`,
        pageCount: categoryPages.length
      };
    });
  }, [categories, servicePages]);

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
  }, [isLoading, practiceAreas]);

  if (isLoading) {
    return (
      <section className="bg-black text-white min-h-screen flex flex-col justify-center py-8 px-4 md:px-16 lg:px-24">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  console.log('🎯 Renderizando áreas:', practiceAreas.length);

  return (
    <section 
      id="areas"
      ref={sectionRef}
      className="bg-black text-white flex flex-col justify-center py-8 px-4 md:px-6 lg:px-24"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-canela text-center text-white mb-8 md:mb-12"
        >
          {pageTexts.areasTitle || 'Áreas de Atuação'}
        </h2>
        
        <div className="flex-1 flex items-center">
          {/* Mobile: Grid compacto */}
          <div className="md:hidden grid grid-cols-1 gap-4 w-full">
            {practiceAreas.map((area, index) => (
              <Link 
                key={area.id}
                to={area.href}
                className="group block"
              >
                <div 
                  className="bg-black/80 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 p-4"
                  ref={el => cardsRef.current[index] = el}
                >
                  <h3 className="text-lg font-canela mb-2 text-white">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {area.description}
                  </p>
                  {area.pageCount !== undefined && (
                    <p className="text-xs text-gray-400">
                      {area.pageCount} serviço{area.pageCount !== 1 ? 's' : ''} disponível{area.pageCount !== 1 ? 'eis' : ''}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: Grid com scroll area */}
          <div className="hidden md:block w-full">
            <ScrollArea className="h-[50vh]">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                {practiceAreas.map((area, index) => (
                  <Link 
                    key={area.id}
                    to={area.href}
                    className="group block"
                  >
                    <div 
                      className="bg-black/80 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 h-full p-6"
                      ref={el => cardsRef.current[index] = el}
                    >
                      <h3 className="text-xl xl:text-2xl font-canela mb-3 text-white">
                        {area.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3">
                        {area.description}
                      </p>
                      {area.pageCount !== undefined && (
                        <p className="text-xs text-gray-400">
                          {area.pageCount} serviço{area.pageCount !== 1 ? 's' : ''} disponível{area.pageCount !== 1 ? 'eis' : ''}
                        </p>
                      )}
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
