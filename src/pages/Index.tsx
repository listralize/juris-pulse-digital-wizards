
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
import NeuralBackground from '../components/NeuralBackground';
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
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.style.height = '100vh';
      html.style.height = '100vh';
      body.style.maxHeight = '100vh';
      html.style.maxHeight = '100vh';
      
      // Garantir que o background seja visível
      body.style.margin = '0';
      body.style.padding = '0';
      
      // Definir background baseado no tema
      if (isDark) {
        body.style.backgroundColor = '#000000';
        html.style.backgroundColor = '#000000';
      } else {
        body.style.backgroundColor = '#ffffff';
        html.style.backgroundColor = '#ffffff';
      }
      
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
  }, [isDark]);

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
          ? 'bg-black text-white' 
          : 'bg-white text-black'
      }`}
      style={{ 
        position: 'relative',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: isDark ? '#000000' : '#ffffff'
      }}
    >
      {/* Neural Background para todo o site - sempre visível */}
      <NeuralBackground inverted={isDark} />

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
