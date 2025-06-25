
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
      
      // Configurar altura fixa para as páginas iniciais
      body.style.overflow = 'hidden'; // Remover scroll vertical global
      html.style.overflow = 'hidden'; // Remover scroll vertical global
      body.style.height = '100vh';
      html.style.height = '100vh';
      body.style.maxHeight = '100vh';
      html.style.maxHeight = '100vh';
      
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
  }, []);

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
      className={`h-screen w-full transition-colors duration-300 relative overflow-hidden ${
        isDark 
          ? 'bg-neutral-950 text-neutral-100' 
          : 'bg-white text-neutral-900'
      }`}
      style={{ 
        position: 'relative',
        height: '100vh',
        maxHeight: '100vh'
      }}
    >
      {/* Background gradients - similar ao código de referência */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 -z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 -z-10"></div>

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
