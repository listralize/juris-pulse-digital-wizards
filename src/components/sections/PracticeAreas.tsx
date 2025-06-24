
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { theme } = useTheme();
  const { pageTexts, servicePages, isLoading: pagesLoading } = useSupabaseDataNew();
  const { categories: supabaseCategories, isLoading: categoriesLoading } = useSupabaseLawCategories();
  const isDark = theme === 'dark';

  // Estado local para receber atualizações em tempo real
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [localCategories, setLocalCategories] = useState(supabaseCategories);

  // Atualizar quando pageTexts muda
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  // Atualizar quando categories mudam
  useEffect(() => {
    setLocalCategories(supabaseCategories);
  }, [supabaseCategories]);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 PracticeAreas: Recebendo atualização de textos:', event.detail);
      setLocalPageTexts(event.detail);
    };

    const handleCategoriesUpdate = (event: CustomEvent) => {
      console.log('📱 PracticeAreas: Recebendo atualização de categorias:', event.detail);
      setLocalCategories(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    window.addEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
      window.removeEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);
    };
  }, []);

  console.log('🔍 PracticeAreas DADOS:', {
    categoriesCount: localCategories?.length || 0,
    servicePagesCount: servicePages?.length || 0,
    isLoading: categoriesLoading || pagesLoading,
    categories: localCategories,
    servicePages
  });

  // Gerar áreas de atuação baseadas nas categorias do Supabase
  const practiceAreas = React.useMemo(() => {
    if (!localCategories || localCategories.length === 0) {
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

    return localCategories.map(category => {
      const categoryPages = servicePages?.filter(page => 
        page.category === category.value
      ) || [];

      console.log(`📂 Categoria ${category.label}: ${categoryPages.length} páginas`);

      return {
        id: category.id || category.value,
        title: category.label || category.name,
        description: category.description || `Serviços especializados em ${category.label}`,
        href: `/areas/${category.value}`,
        pageCount: categoryPages.length,
        icon: category.icon,
        color: category.color
      };
    });
  }, [localCategories, servicePages]);

  const isLoading = categoriesLoading || pagesLoading;

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
      <section className={`${isDark ? 'bg-black text-white' : 'bg-black text-white'} min-h-screen flex flex-col justify-center py-8 px-4 md:px-16 lg:px-24`}>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  console.log('🎯 Renderizando áreas:', practiceAreas.length);

  const areasTitle = localPageTexts?.areasTitle || 'Áreas de Atuação';

  return (
    <section 
      id="areas"
      ref={sectionRef}
      className={`${isDark ? 'bg-black text-white' : 'bg-black text-white'} flex flex-col justify-center py-8 px-4 md:px-6 lg:px-24`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-canela text-center text-white mb-8 md:mb-12"
        >
          {areasTitle}
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
                  className="bg-black/80 border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 p-4"
                  ref={el => cardsRef.current[index] = el}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {area.icon && (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: area.color }}
                      >
                        {area.icon}
                      </div>
                    )}
                    <h3 className="text-lg font-canela text-white">
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-sm mb-2 text-gray-300">
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

          {/* Desktop: Grid sem scroll area */}
          <div className="hidden md:block w-full">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map((area, index) => (
                <Link 
                  key={area.id}
                  to={area.href}
                  className="group block"
                >
                  <div 
                    className="bg-black/80 border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 h-full p-6"
                    ref={el => cardsRef.current[index] = el}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {area.icon && (
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold"
                          style={{ backgroundColor: area.color }}
                        >
                          {area.icon}
                        </div>
                      )}
                      <h3 className="text-xl xl:text-2xl font-canela text-white">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-sm mb-3 text-gray-300">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
