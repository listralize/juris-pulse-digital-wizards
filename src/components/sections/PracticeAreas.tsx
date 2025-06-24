
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
      <section className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col justify-center py-16 px-6 md:px-16 lg:px-24`}>
        <div className="flex justify-center items-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
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
      className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} py-16 px-6 md:px-16 lg:px-24`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}
          >
            {areasTitle}
          </h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-white/70' : 'text-black/70'}`}>
            Oferecemos assessoria jurídica especializada em diversas áreas do direito, 
            com soluções estratégicas para proteger seus direitos e interesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, index) => (
            <Link 
              key={area.id}
              to={area.href}
              className="group block h-full"
            >
              <div 
                className={`p-8 rounded-lg border transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl h-full ${
                  isDark 
                    ? 'bg-black/50 border-white/10 hover:border-white/30' 
                    : 'bg-white/90 border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-lg'
                }`}
                ref={el => cardsRef.current[index] = el}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-colors ${
                      isDark 
                        ? 'bg-white/10 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {area.icon}
                  </div>
                  <h3 className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                    {area.title}
                  </h3>
                </div>
                
                <p className={`text-base mb-6 leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {area.description}
                </p>
                
                {area.pageCount !== undefined && (
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {area.pageCount} serviço{area.pageCount !== 1 ? 's' : ''} disponível{area.pageCount !== 1 ? 'eis' : ''}
                  </div>
                )}
                
                <div className={`mt-6 flex items-center gap-2 text-sm font-medium transition-colors ${
                  isDark 
                    ? 'text-blue-400 group-hover:text-blue-300' 
                    : 'text-blue-600 group-hover:text-blue-500'
                }`}>
                  <span>Saiba mais</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
