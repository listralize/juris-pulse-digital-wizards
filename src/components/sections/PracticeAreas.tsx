
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import { ArrowUpRight, Scale, Building2, Users, Shield, Briefcase, Gavel, Heart, Coins } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const { pageTexts, servicePages, isLoading: pagesLoading, siteSettings } = useSupabaseData();
  const { categories: supabaseCategories, isLoading: categoriesLoading } = useSupabaseLawCategories();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

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
    if (!supabaseCategories || supabaseCategories.length === 0) {
      return [
        { id: 'familia-fallback', title: 'Direito de Família', href: '/areas/familia', services: 0, icon: Heart },
        { id: 'tributario-fallback', title: 'Direito Tributário', href: '/areas/tributario', services: 0, icon: Coins },
        { id: 'empresarial-fallback', title: 'Direito Empresarial', href: '/areas/empresarial', services: 0, icon: Briefcase }
      ];
    }

    return supabaseCategories.slice(0, 9).map(category => {
      const categoryPages = servicePages?.filter(page => page.category === category.value) || [];
      const IconComponent = iconMapping[category.value as keyof typeof iconMapping] || Scale;
      return {
        id: category.id || category.value,
        title: category.label || category.name,
        href: `/areas/${category.value}`,
        services: categoryPages.length,
        icon: IconComponent
      };
    });
  }, [supabaseCategories, servicePages]);

  const isLoading = categoriesLoading || pagesLoading;

  useEffect(() => {
    if (isLoading || isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    tl.fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
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

  const areasTitle = siteSettings?.areas_title || pageTexts?.areasTitle || 'Áreas de Atuação';

  return (
    <section 
      id="areas"
      ref={sectionRef}
      className={`min-h-screen w-full py-8 md:py-16 relative ${
        isMobile 
          ? 'bg-transparent text-white' 
          : isDark 
            ? 'bg-black text-white' 
            : 'bg-white text-black'
      }`}
      style={{
        zIndex: isMobile ? 9999 : 10,
        position: 'relative',
        overflowY: isMobile ? 'auto' : 'hidden',
        maxHeight: isMobile ? 'none' : '100vh'
      }}
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative px-4 md:px-6 lg:px-8" style={{ zIndex: isMobile ? 9999 : 20 }}>
        <div className={`${!isMobile ? 'h-screen flex flex-col justify-center' : 'py-8'}`} style={{ marginTop: !isMobile ? '-100px' : '0' }}>
          <div className="text-center mb-8 md:mb-12">
            <h2 ref={titleRef} className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              {areasTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          <div 
            ref={gridRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full mx-auto"
            style={{ zIndex: isMobile ? 9999 : 30, position: 'relative' }}
          >
            {practiceAreas.map((area) => {
              const IconComponent = area.icon;
              
              return (
                <Link 
                  key={area.id}
                  to={area.href}
                  className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded-xl"
                  tabIndex={0}
                  style={{
                    zIndex: isMobile ? 99999 : 40,
                    position: 'relative',
                    minHeight: isMobile ? '44px' : 'auto',
                    touchAction: 'manipulation'
                  }}
                  aria-label={`${area.title} - ${area.services} serviço${area.services !== 1 ? 's' : ''}`}
                >
                  <div className={`
                    relative h-32 lg:h-36 rounded-xl border transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:-translate-y-1
                    ${isMobile ? 'active:scale-[0.98] active:bg-opacity-80' : ''}
                    ${isDark 
                      ? 'bg-white/[0.15] border-white/[0.25] hover:bg-white/[0.20] hover:border-white/[0.35]' 
                      : 'bg-black/[0.15] border-black/[0.25] hover:bg-black/[0.20] hover:border-black/[0.35]'
                    }
                    backdrop-blur-sm overflow-hidden
                  `} style={{ pointerEvents: 'auto', cursor: 'pointer', zIndex: 1 }}>
                    
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-black/[0.03] group-hover:to-black/[0.06] transition-all duration-300"></div>
                    
                    <div className="relative p-4 lg:p-5 h-full flex flex-col" style={{ zIndex: 2, pointerEvents: 'none' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-white/[0.25] text-white group-hover:bg-white/[0.35]' : 'bg-white/[0.90] text-black group-hover:bg-white'}`}>
                          <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                        <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-white/[0.15] text-white/90 group-hover:bg-white/[0.25] group-hover:text-white' : 'bg-black/[0.15] text-black/90 group-hover:bg-black/[0.25] group-hover:text-black'}`}>
                          <ArrowUpRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                      
                      <h3 className={`text-base lg:text-lg font-medium mb-1 transition-all duration-300 leading-tight flex-1 font-space-grotesk ${isDark ? 'text-white group-hover:text-white/90' : 'text-black group-hover:text-black/90'}`}>
                        {area.title}
                      </h3>
                      
                      <div className="mt-auto">
                        <span className={`text-xs lg:text-sm font-medium font-inter ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                          {area.services} serviço{area.services !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {isMobile && <div className="h-16"></div>}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
