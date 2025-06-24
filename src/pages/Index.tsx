
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import CustomCursor from '../components/CustomCursor';
import SectionsContainer from '../components/SectionsContainer';
import { MainLayout } from '../components/layout/MainLayout';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
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
  
  return (
    <MainLayout>
      <div className="min-h-screen w-full overflow-hidden" style={{ height: '100vh' }}>
        <CustomCursor />
        <SectionsContainer />
      </div>
    </MainLayout>
  );
};

export default Index;
