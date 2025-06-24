
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
      
      // Configurar overflow para navegação horizontal
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.style.height = '100vh';
      html.style.height = '100vh';
      
      // Garantir que o background seja visível
      body.style.margin = '0';
      body.style.padding = '0';
      
      // Garantir que não há background preto forçado
      body.style.backgroundColor = '';
      
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      return () => {
        body.style.overflow = '';
        html.style.overflow = '';
        body.style.height = '';
        html.style.height = '';
        body.style.backgroundColor = '';
        
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'auto';
        }
      };
    } catch (error) {
      console.error('❌ Erro ao configurar scroll:', error);
    }
  }, []);

  // Verificar se os termos já foram aceitos e mostrar popup automaticamente
  useEffect(() => {
    const checkTermsAcceptance = () => {
      const accepted = localStorage.getItem('legal-terms-accepted');
      if (!accepted) {
        // Mostrar popup após 1 segundo
        setTimeout(() => {
          setShowLegalPopup(true);
        }, 1000);
      }
    };

    checkTermsAcceptance();
  }, []);
  
  return (
    <div 
      className={`min-h-screen w-full transition-colors duration-300 overflow-hidden ${
        isDark 
          ? 'bg-black text-white' 
          : 'bg-white text-black'
      }`}
      style={{ 
        height: '100vh',
        position: 'relative'
      }}
    >
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      <FloatingFooter />
      
      <SectionsContainer />

      {/* Popup Legal automático */}
      <LegalPopup 
        isOpen={showLegalPopup} 
        onClose={() => setShowLegalPopup(false)} 
      />
    </div>
  );
};

export default Index;
