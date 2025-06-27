
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import FloatingFooter from '../components/FloatingFooter';
import LegalPopup from '../components/legal/LegalPopup';
import SectionsContainer from '../components/SectionsContainer';
import { useTheme } from '../components/ThemeProvider';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showLegalPopup, setShowLegalPopup] = useState(false);
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

  useEffect(() => {
    try {
      const body = document.body;
      const html = document.documentElement;
      
      // Configuração diferente para mobile e desktop
      if (isMobile) {
        // Mobile: permitir scroll natural completo, mas sem altura extra
        body.style.overflow = 'auto';
        html.style.overflow = 'auto';
        body.style.height = 'auto';
        html.style.height = 'auto';
        body.style.maxHeight = 'none';
        html.style.maxHeight = 'none';
        body.style.minHeight = '100vh';
        html.style.minHeight = '100vh';
      } else {
        // Desktop: configuração original
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        body.style.height = '100vh';
        html.style.height = '100vh';
        body.style.maxHeight = '100vh';
        html.style.maxHeight = '100vh';
      }
      
      // Garantir que o background seja visível
      body.style.margin = '0';
      body.style.padding = '0';
      
      // Garantir que o cursor seja visível no desktop
      if (window.innerWidth >= 768) {
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
    } catch (error) {
      console.error('❌ Erro ao configurar scroll:', error);
    }
  }, [isMobile]);
  
  // Verificar se os termos já foram aceitos e mostrar popup se necessário
  useEffect(() => {
    const checkTermsAcceptance = () => {
      const accepted = localStorage.getItem('legal-terms-accepted');
      if (!accepted) {
        setTimeout(() => {
          setShowLegalPopup(true);
        }, 3000);
      }
    };

    checkTermsAcceptance();
  }, []);
  
  return (
    <div 
      className={`transition-colors duration-300 relative ${
        isDark 
          ? 'bg-neutral-950 text-neutral-100' 
          : 'bg-white text-neutral-900'
      }`}
      style={{ 
        position: 'relative',
        // Mobile: altura mínima sem altura extra
        minHeight: '100vh',
        height: isMobile ? 'auto' : '100vh',
        maxHeight: isMobile ? 'none' : '100vh',
        // Mobile: scroll visível
        overflow: isMobile ? 'visible' : 'hidden'
      }}
    >
      {/* Background gradients - similar ao código de referência */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 -z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 -z-10"></div>

      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      {/* FloatingFooter apenas para desktop */}
      <FloatingFooter />
      
      <SectionsContainer />

      {/* Popup Legal discreto */}
      <LegalPopup 
        isOpen={showLegalPopup} 
        onClose={() => setShowLegalPopup(false)} 
      />
    </div>
  );
};

export default Index;
