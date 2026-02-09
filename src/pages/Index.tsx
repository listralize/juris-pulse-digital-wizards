import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


import Navbar from '../components/navbar';
import FloatingFooter from '../components/FloatingFooter';

import SectionsContainer from '../components/SectionsContainer';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { useTheme } from '../components/ThemeProvider';
import { useIsMobile, useIsTablet } from '../hooks/use-mobile';
import { useAnalytics } from '../hooks/useAnalytics';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  // Inicializar analytics para rastrear visitantes automaticamente
  useAnalytics();

  useEffect(() => {
    try {
      const body = document.body;
      const html = document.documentElement;
      
      if (isMobile || isTablet) {
        // Mobile/Tablet: configuração natural sem forçar alturas
        body.style.overflow = 'auto';
        html.style.overflow = 'auto';
        body.style.height = 'auto';
        html.style.height = 'auto';
        body.style.maxHeight = 'none';
        html.style.maxHeight = 'none';
        body.style.minHeight = 'auto';
        html.style.minHeight = 'auto';
        body.style.overflowX = 'hidden';
        html.style.overflowX = 'hidden';
        body.style.margin = '0';
        body.style.padding = '0';
      } else {
        // Desktop: configuração original
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        body.style.height = '100vh';
        html.style.height = '100vh';
        body.style.maxHeight = '100vh';
        html.style.maxHeight = '100vh';
      }
      
      // Usar cursor padrão do navegador em todos os dispositivos
      body.style.cursor = 'auto';
      
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      return () => {
        // Reset styles on unmount to avoid side-effects on other pages
        body.style.overflow = '';
        body.style.height = '';
        body.style.maxHeight = '';
        body.style.minHeight = '';
        body.style.overflowX = '';
        body.style.margin = '';
        body.style.padding = '';
        body.style.cursor = '';
        html.style.overflow = '';
        html.style.height = '';
        html.style.maxHeight = '';
        html.style.minHeight = '';
        html.style.overflowX = '';
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'auto';
        }
      };
    } catch (error) {
      console.error('❌ Erro ao configurar scroll:', error);
    }
  }, [isMobile, isTablet]);
  
  
  return (
    <div 
      className={`transition-colors duration-300 relative ${
        isDark 
          ? 'bg-neutral-950 text-neutral-100' 
          : 'bg-white text-neutral-900'
      }`}
      style={{ 
        position: 'relative',
        // Mobile/Tablet: não forçar alturas, deixar natural
        minHeight: (isMobile || isTablet) ? 'auto' : '100vh',
        height: (isMobile || isTablet) ? 'auto' : '100vh', 
        maxHeight: (isMobile || isTablet) ? 'none' : '100vh',
        overflow: (isMobile || isTablet) ? 'auto' : 'hidden',
        margin: 0,
        padding: 0
      }}
    >
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 -z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 -z-10"></div>

      
      <Navbar />
      
      {/* FloatingFooter apenas para desktop */}
      {!isMobile && !isTablet && <FloatingFooter />}
      
      <SectionsContainer />
      
      {/* Seção de Depoimentos - OCULTA NO MOBILE */}
      <div className="relative z-10 py-20 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja os depoimentos de quem já confiou em nossos serviços jurídicos
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </div>

    </div>
  );
};

export default Index;
