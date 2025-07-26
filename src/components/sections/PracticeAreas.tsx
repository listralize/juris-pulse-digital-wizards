
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import { ArrowUpRight, Scale, Building2, Users, Shield, Briefcase, Gavel, Heart, Coins } from 'lucide-react';
import NeuralBackground from '../NeuralBackground';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const { pageTexts, servicePages, isLoading: pagesLoading } = useSupabaseDataNew();
  const { categories: supabaseCategories, isLoading: categoriesLoading } = useSupabaseLawCategories();
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [localCategories, setLocalCategories] = useState(supabaseCategories);

  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  useEffect(() => {
    setLocalCategories(supabaseCategories);
  }, [supabaseCategories]);

  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      setLocalPageTexts(event.detail);
    };

    const handleCategoriesUpdate = (event: CustomEvent) => {
      setLocalCategories(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    window.addEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
      window.removeEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);
    };
  }, []);

  const iconMapping = {
    'administrativo': Building2,
    'tributario': Coins,
    'empresarial': Briefcase,
    'trabalho': Users,
    'previdenciario': Shield,
    'consumidor': Scale,
    'constitucional': Gavel,
    'civil': Scale,
    'familia': Heart
  };

  const practiceAreas = React.useMemo(() => {
    if (!localCategories || localCategories.length === 0) {
      return [
        {
          id: 'familia-fallback',
          title: 'Direito de Família',
          href: '/areas/familia',
          services: 0,
          icon: Heart
        },
        {
          id: 'tributario-fallback', 
          title: 'Direito Tributário',
          href: '/areas/tributario',
          services: 0,
          icon: Coins
        },
        {
          id: 'empresarial-fallback',
          title: 'Direito Empresarial', 
          href: '/areas/empresarial',
          services: 0,
          icon: Briefcase
        }
      ];
    }

    return localCategories.slice(0, 9).map(category => {
      const categoryPages = servicePages?.filter(page => 
        page.category === category.value
      ) || [];

      const IconComponent = iconMapping[category.value as keyof typeof iconMapping] || Scale;

      return {
        id: category.id || category.value,
        title: category.label || category.name,
        href: `/areas/${category.value}`,
        services: categoryPages.length,
        icon: IconComponent
      };
    });
  }, [localCategories, servicePages]);

  const isLoading = categoriesLoading || pagesLoading;

  useEffect(() => {
    if (isLoading) return;

    // No mobile, não usar ScrollTrigger para permitir scroll natural
    if (isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    tl.fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 40, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      },
      "-=0.4"
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading, practiceAreas, isMobile]);

  if (isLoading) {
    return (
      <section className={`${isDark ? 'bg-black' : 'bg-white'} h-screen flex items-center justify-center`}>
        <div className="relative">
          <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${isDark ? 'border-white/20' : 'border-black/20'}`}></div>
          <div className={`absolute inset-0 w-8 h-8 border-2 border-transparent border-t-current rounded-full animate-spin ${isDark ? 'text-white' : 'text-black'}`}></div>
        </div>
      </section>
    );
  }

  const areasTitle = localPageTexts?.areasTitle || 'Áreas de Atuação';

  return (
    <section 
      id="areas"
      ref={sectionRef}
      className={`min-h-screen w-full py-8 md:py-16 relative ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{
        // Permitir scroll vertical no mobile
        overflowY: isMobile ? 'auto' : 'hidden',
        maxHeight: isMobile ? 'none' : '100vh'
      }}
    >
      {/* Neural Background apenas desktop */}
      {isDark && !isMobile && <NeuralBackground />}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        {/* Container flexível para mobile e centralizado para desktop com ajuste de posição */}
        <div className={`${!isMobile ? 'h-screen flex flex-col justify-center' : 'py-8'}`} style={{ 
          marginTop: !isMobile ? '-100px' : '0' 
        }}>
          {/* Header padronizado */}
          <div className="text-center mb-8 md:mb-12">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {areasTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Grid Container - adaptativo para mobile */}
          <div 
            ref={gridRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full mx-auto"
          >
            {practiceAreas.map((area, index) => {
              const IconComponent = area.icon;
              
              return (
                <Link 
                  key={area.id}
                  to={area.href}
                  className="group block"
                >
                  <div className={`
                    relative h-32 lg:h-36 rounded-xl border transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:-translate-y-1
                    ${isDark 
                      ? 'bg-white/[0.15] border-white/[0.25] hover:bg-white/[0.20] hover:border-white/[0.35]' 
                      : 'bg-black/[0.15] border-black/[0.25] hover:bg-black/[0.20] hover:border-black/[0.35]'
                    }
                    backdrop-blur-sm overflow-hidden
                  `}>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-black/[0.03] group-hover:to-black/[0.06] transition-all duration-300"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-4 lg:p-5 h-full flex flex-col">
                      
                      {/* Top Row - Icon and Arrow */}
                      <div className="flex items-center justify-between mb-2">
                        {/* Icon */}
                        <div className={`
                          w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center
                          transition-all duration-300 group-hover:scale-110
                          ${isDark 
                            ? 'bg-white/[0.25] text-white group-hover:bg-white/[0.35]' 
                            : 'bg-white/[0.90] text-black group-hover:bg-white'
                          }
                        `}>
                          <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                        
                        {/* Arrow */}
                        <div className={`
                          w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center
                          transition-all duration-300 group-hover:scale-110
                          ${isDark 
                            ? 'bg-white/[0.15] text-white/90 group-hover:bg-white/[0.25] group-hover:text-white' 
                            : 'bg-black/[0.15] text-black/90 group-hover:bg-black/[0.25] group-hover:text-black'
                          }
                        `}>
                          <ArrowUpRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className={`
                        text-base lg:text-lg font-medium mb-1 transition-all duration-300 leading-tight flex-1 font-space-grotesk
                        ${isDark ? 'text-white group-hover:text-white/90' : 'text-black group-hover:text-black/90'}
                      `}>
                        {area.title}
                      </h3>
                      
                      {/* Service Count */}
                      <div className="mt-auto">
                        <span className={`
                          text-xs lg:text-sm font-medium font-inter
                          ${isDark ? 'text-white/80' : 'text-black/80'}
                        `}>
                          {area.services} serviço{area.services !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Espaçamento adicional no mobile para permitir scroll */}
          {isMobile && <div className="h-16"></div>}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
