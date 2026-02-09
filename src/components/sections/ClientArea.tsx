import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Lock, ArrowRight, MessageSquare, Crown } from 'lucide-react';
import { useIsMobile, useIsTablet } from '../../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const ClientArea = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();
  const { pageTexts, isLoading, siteSettings, contactInfo } = useSupabaseData();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const tweensRef = useRef<gsap.core.Tween[]>([]);
  
  useEffect(() => {
    if (isLoading) return;

    const tweens: gsap.core.Tween[] = [];

    tweens.push(gsap.fromTo(imageRef.current, { opacity: 0, y: -20 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: imageRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
    }));
    
    tweens.push(gsap.fromTo(titleRef.current, { opacity: 0, scaleY: 0.9 }, {
      opacity: 1, scaleY: 1, duration: 0.8,
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
    }));
    
    tweens.push(gsap.fromTo(textRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
    }));
    
    tweens.push(gsap.fromTo(button1Ref.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, delay: 0.2,
      scrollTrigger: { trigger: button1Ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
    }));
    
    tweens.push(gsap.fromTo(button2Ref.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, delay: 0.3,
      scrollTrigger: { trigger: button2Ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
    }));

    tweensRef.current = tweens;
    
    return () => {
      tweens.forEach(tween => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [isLoading]);

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

  const whatsappNumber = contactInfo?.whatsapp || pageTexts?.contactTexts?.whatsapp || '5562994594496';
  const clientPortalLink = siteSettings?.client_portal_link || pageTexts?.clientPortalLink || '#';
  const clientAreaTitle = siteSettings?.client_area_title || pageTexts?.clientAreaTitle || 'Área do Cliente';
  const clientAreaDescription = siteSettings?.client_area_description || pageTexts?.clientAreaDescription || 'Acesse sua área restrita para acompanhar seus processos';

  return (
    <section 
      id="cliente" 
      className={`${isDark ? 'bg-black' : 'bg-white'} flex flex-col overflow-visible relative`}
      style={{
        height: 'auto',
        minHeight: 'auto',
        maxHeight: 'none',
        padding: isMobile ? '2rem 1rem' : isTablet ? '4rem 2rem' : '4rem 2rem'
      }}
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {(isMobile || isTablet) && (
          <div ref={imageRef} className="flex justify-center items-center mb-8">
            <div className="relative">
              <div className="bg-black rounded-2xl p-6 relative">
                <img 
                  src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
                  alt="Área do Cliente em Smartphone" 
                  className={`w-full object-contain ${isMobile ? 'max-w-sm h-auto' : 'max-w-md h-auto'}`}
                  loading="lazy"
                  decoding="async"
                  width="384"
                  height="384"
                />
              </div>
              
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="relative">
                  <div className={`px-4 py-2 rounded-full font-bold tracking-wider uppercase flex items-center gap-2 whitespace-nowrap shadow-lg ${isMobile ? 'text-xs' : 'text-sm'} ${isDark ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>
                    <Crown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span>EXCLUSIVO PARA CLIENTES ST PRIME</span>
                  </div>
                  <div className={`absolute inset-0 rounded-full blur-sm opacity-30 ${isDark ? 'bg-gray-100' : 'bg-gray-50'}`}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mb-8 md:mb-12">
          <h2 
            ref={titleRef}
            className={`mb-4 font-canela ${isDark ? 'text-white' : 'text-black'} ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl lg:text-4xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}
          >
            {clientAreaTitle}
          </h2>
          <div className={`w-20 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
        </div>
        
        <div className={`max-w-5xl mx-auto w-full items-center ${isMobile || isTablet ? 'block' : 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'}`}>
          {!isMobile && !isTablet && (
            <div ref={imageRef} className="flex justify-center items-center order-2 lg:order-1">
              <div className="relative">
                <div className="bg-black rounded-2xl p-6 relative">
                  <img 
                    src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
                    alt="Área do Cliente em Smartphone" 
                    className="w-full max-w-sm h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    width="384"
                    height="384"
                  />
                </div>
                
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="relative">
                    <div className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 whitespace-nowrap shadow-lg ${isDark ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>
                      <Crown className="w-3 h-3" />
                      <span>EXCLUSIVO PARA CLIENTES ST PRIME</span>
                    </div>
                    <div className={`absolute inset-0 rounded-full blur-sm opacity-30 ${isDark ? 'bg-gray-100' : 'bg-gray-50'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className={`flex flex-col justify-center ${isMobile || isTablet ? 'order-1' : 'order-1 lg:order-2'}`}>
            <p 
              ref={textRef}
              className={`leading-relaxed mb-8 font-satoshi ${isDark ? 'text-white/90' : 'text-black/90'} ${isMobile ? 'text-lg text-center' : isTablet ? 'text-xl text-center' : 'text-lg md:text-xl'}`}
            >
              {clientAreaDescription}
            </p>
            
            <div className={`flex flex-col space-y-4 ${isTablet ? 'max-w-md mx-auto' : ''}`}>
              <a 
                ref={button1Ref}
                href={clientPortalLink} 
                className={`group relative overflow-hidden rounded-lg px-6 py-4 transition-all duration-300 hover:shadow-xl flex items-center justify-center font-medium ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-base'} ${isDark ? 'bg-white text-black hover:bg-gray-100 shadow-lg' : 'bg-black text-white hover:bg-gray-800 shadow-lg'}`}
              >
                <Lock className="mr-3 h-5 w-5" />
                <span>Acessar minha área</span>
                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              <a 
                ref={button2Ref}
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} 
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-lg border-2 px-6 py-4 transition-all duration-300 hover:shadow-xl flex items-center justify-center font-medium ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-base'} ${isDark ? 'border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 shadow-lg' : 'border-black/40 text-black bg-black/10 hover:bg-black/20 hover:border-black/60 shadow-lg'}`}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                <span>Primeiro acesso via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
