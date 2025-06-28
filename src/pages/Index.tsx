
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import FloatingFooter from '../components/FloatingFooter';
import LegalPopup from '../components/legal/LegalPopup';
import SectionsContainer from '../components/SectionsContainer';
import { useTheme } from '../components/ThemeProvider';
import { useIsMobile, useIsTablet } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showLegalPopup, setShowLegalPopup] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    if (isMobile || isTablet) {
      // Mobile/Tablet: configuração natural otimizada
      body.style.overflow = 'auto';
      html.style.overflow = 'auto';
      body.style.height = 'auto';
      html.style.height = 'auto';
      body.style.overflowX = 'hidden';
      html.style.overflowX = 'hidden';
      body.style.margin = '0';
      body.style.padding = '0';
      // Otimizações de performance para mobile (sem webkit)
      body.style.transform = 'translate3d(0,0,0)';
    } else {
      // Desktop: configuração original
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.style.height = '100vh';
      html.style.height = '100vh';
      body.style.maxHeight = '100vh';
      html.style.maxHeight = '100vh';
    }
    
    // Cursor apenas desktop
    if (window.innerWidth >= 1024 && !('ontouchstart' in window)) {
      body.style.cursor = 'none';
    } else {
      body.style.cursor = 'auto';
    }
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, [isMobile, isTablet]);
  
  // Legal popup com delay menor no mobile
  useEffect(() => {
    const checkTermsAcceptance = () => {
      const accepted = localStorage.getItem('legal-terms-accepted');
      if (!accepted) {
        setTimeout(() => {
          setShowLegalPopup(true);
        }, isMobile ? 1500 : 3000); // Delay menor no mobile
      }
    };

    checkTermsAcceptance();
  }, [isMobile]);
  
  return (
    <div 
      className={`transition-colors duration-300 relative ${
        isDark 
          ? 'bg-neutral-950 text-neutral-100' 
          : 'bg-white text-neutral-900'
      }`}
      style={{ 
        position: 'relative',
        minHeight: (isMobile || isTablet) ? 'auto' : '100vh',
        height: (isMobile || isTablet) ? 'auto' : '100vh', 
        maxHeight: (isMobile || isTablet) ? 'none' : '100vh',
        overflow: (isMobile || isTablet) ? 'auto' : 'hidden',
        margin: 0,
        padding: 0,
        // Otimizações CSS para mobile
        ...(isMobile && {
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        })
      }}
    >
      {/* Background gradients simplificados no mobile */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 -z-10"></div>
      {!isMobile && (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 -z-10"></div>
      )}

      {/* Componentes condicionais */}
      {!isMobile && <CustomCursor />}
      <Navbar />
      <WhatsAppButton />
      
      {!isMobile && !isTablet && <FloatingFooter />}
      
      <SectionsContainer />

      <LegalPopup 
        isOpen={showLegalPopup} 
        onClose={() => setShowLegalPopup(false)} 
      />
    </div>
  );
};

export default Index;
