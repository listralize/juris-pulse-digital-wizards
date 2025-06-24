
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

  // Gerar áreas de atuação baseadas nas categorias do Supabase
  const practiceAreas = React.useMemo(() => {
    if (!localCategories || localCategories.length === 0) {
      console.log('⚠️ Nenhuma categoria encontrada, usando áreas padrão');
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
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
    
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1 * index,
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
      <section className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col justify-center py-8 px-4 md:px-16 lg:px-24`}>
        <div className="flex justify-center items-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div>
      </section>
    );
  }

  const areasTitle = localPageTexts?.areasTitle || 'Áreas de Atuação';

  return (
    <section 
      id="areas"
      ref={sectionRef}
      className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col justify-center py-8 px-4 md:px-8 lg:px-16`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 
          ref={titleRef}
          className={`text-2xl md:text-3xl lg:text-4xl font-canela text-center mb-6 md:mb-8 ${isDark ? 'text-white' : 'text-black'}`}
        >
          {areasTitle}
        </h2>
        
        {/* BentoGrid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {practiceAreas.map((area, index) => {
            // Define diferentes tamanhos para criar layout BentoGrid
            const isLarge = index === 0 || index === 4 || index === 7;
            const isTall = index === 1 || index === 5;
            
            return (
              <Link 
                key={area.id}
                to={area.href}
                className={`group block ${
                  isLarge ? 'md:col-span-2' : ''
                } ${
                  isTall ? 'md:row-span-2' : ''
                }`}
              >
                <div 
                  className={`${
                    isDark ? 'bg-black border-white/10' : 'bg-white border-gray-100'
                  } backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] p-4 md:p-5 rounded-lg border h-full min-h-[120px] flex flex-col justify-between`}
                  ref={el => cardsRef.current[index] = el}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {area.icon && (
                        <div 
                          className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold ${
                            isDark ? 'bg-white text-black' : 'bg-black text-white'
                          }`}
                        >
                          {area.icon}
                        </div>
                      )}
                      <h3 className={`text-sm md:text-base lg:text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                        {area.title}
                      </h3>
                    </div>
                    <p className={`text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                      {area.description}
                    </p>
                  </div>
                  
                  {area.pageCount !== undefined && (
                    <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {area.pageCount} serviço{area.pageCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
