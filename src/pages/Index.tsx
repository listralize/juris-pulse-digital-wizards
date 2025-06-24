
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
  
  useEffect(() => {
    try {
      const body = document.body;
      const html = document.documentElement;
      
      // Configurar scroll suave e responsivo
      body.style.overflow = 'auto';
      html.style.overflow = 'auto';
      body.style.height = 'auto';
      html.style.height = 'auto';
      
      // Garantir que o background seja visível
      body.style.margin = '0';
      body.style.padding = '0';
      
      // Garantir que não há background preto forçado
      body.style.backgroundColor = '';
      
      // Configurar scroll suave
      html.style.scrollBehavior = 'smooth';
      
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
  }, []);

  // Verificar se os termos já foram aceitos e mostrar popup se necessário
  useEffect(() => {
    const checkTermsAcceptance = () => {
      const accepted = localStorage.getItem('legal-terms-accepted');
      if (!accepted) {
        // Mostrar popup após 3 segundos
        setTimeout(() => {
          setShowLegalPopup(true);
        }, 3000);
      }
    };

    checkTermsAcceptance();
  }, []);
  
  return (
    <div 
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDark 
          ? 'bg-neutral-950 text-neutral-100' 
          : 'bg-white text-neutral-900'
      }`}
      style={{ 
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      {/* FloatingFooter only for desktop */}
      <div className="hidden md:block">
        <FloatingFooter />
      </div>
      
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
