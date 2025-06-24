import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import { ArrowUpRight, Scale, Building2, Users, Shield, Briefcase, Gavel, Heart, Coins } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const { pageTexts, servicePages, isLoading: pagesLoading } = useSupabaseDataNew();
  const { categories: supabaseCategories, isLoading: categoriesLoading } = useSupabaseLawCategories();
  const isDark = theme === 'dark';

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
          description: 'Proteção e orientação jurídica',
          href: '/areas/familia',
          services: 0,
          icon: Heart
        },
        {
          id: 'tributario-fallback', 
          title: 'Direito Tributário',
          description: 'Consultoria e planejamento',
          href: '/areas/tributario',
          services: 0,
          icon: Coins
        },
        {
          id: 'empresarial-fallback',
          title: 'Direito Empresarial', 
          description: 'Suporte jurídico completo',
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
        description: category.description || `Serviços especializados em ${category.label}`,
        href: `/areas/${category.value}`,
        services: categoryPages.length,
        icon: IconComponent
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
  }, [isLoading, practiceAreas]);

  if (isLoading) {
    return (
      <section className={`${isDark ? 'bg-black' : 'bg-white'} min-h-screen flex items-center justify-center`}>
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
      className={`${isDark ? 'bg-black' : 'bg-white'} py-12 px-4 md:px-8 lg:px-16 relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 
            ref={titleRef}
            className={`text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-3 ${isDark ? 'text-white' : 'text-black'}`}
          >
            {areasTitle}
          </h2>
          <div className={`w-16 h-px mx-auto ${isDark ? 'bg-white/30' : 'bg-black/30'}`}></div>
        </div>
        
        {/* 3x3 Compact Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {practiceAreas.map((area, index) => {
            const IconComponent = area.icon;
            
            return (
              <Link 
                key={area.id}
                to={area.href}
                className="group block"
              >
                <div className={`
                  relative h-32 rounded-lg border transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:-translate-y-1
                  ${isDark 
                    ? 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]' 
                    : 'bg-black/[0.02] border-black/[0.08] hover:bg-black/[0.04] hover:border-black/[0.15]'
                  }
                  backdrop-blur-sm overflow-hidden
                `}>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-transparent to-black/[0.03] group-hover:to-black/[0.06] transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                    
                    {/* Top Section */}
                    <div className="flex-1">
                      {/* Icon */}
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center mb-2
                        transition-all duration-300 group-hover:scale-110
                        ${isDark 
                          ? 'bg-white/[0.08] text-white group-hover:bg-white/[0.15]' 
                          : 'bg-black/[0.08] text-black group-hover:bg-black/[0.15]'
                        }
                      `}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      
                      {/* Title */}
                      <h3 className={`
                        text-sm font-medium mb-1 transition-all duration-300 leading-tight line-clamp-2
                        ${isDark ? 'text-white group-hover:text-white/90' : 'text-black group-hover:text-black/90'}
                      `}>
                        {area.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`
                        text-xs leading-relaxed transition-all duration-300 line-clamp-2
                        ${isDark ? 'text-white/60 group-hover:text-white/70' : 'text-black/60 group-hover:text-black/70'}
                      `}>
                        {area.description}
                      </p>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 mt-auto">
                      <span className={`
                        text-xs font-medium
                        ${isDark ? 'text-white/50' : 'text-black/50'}
                      `}>
                        {area.services} serviço{area.services !== 1 ? 's' : ''}
                      </span>
                      
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center
                        transition-all duration-300 group-hover:scale-110
                        ${isDark 
                          ? 'bg-white/[0.05] text-white/60 group-hover:bg-white/[0.1] group-hover:text-white' 
                          : 'bg-black/[0.05] text-black/60 group-hover:bg-black/[0.1] group-hover:text-black'
                        }
                      `}>
                        <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </section>
  );
};

export default PracticeAreas;
