
import React, { useEffect, useMemo } from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';
import { useIsMobile, useIsTablet } from '../hooks/use-mobile';
import Section from './Section';

import Hero from './sections/Hero';
import About from './sections/About';
import PracticeAreas from './sections/PracticeAreas';
import Partners from './sections/Partners';
import ClientArea from './sections/ClientArea';
import Blog from './sections/Blog';
import Contact from './sections/Contact';

const sectionLabels: Record<string, string> = {
  home: 'Início',
  about: 'Sobre nós',
  areas: 'Áreas de atuação',
  socios: 'Sócios',
  cliente: 'Área do cliente',
  blog: 'Blog',
  contact: 'Contato'
};

const SectionsContainer: React.FC = () => {
  const sections = useMemo(() => [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'socios', component: Partners }, 
    { id: 'cliente', component: ClientArea },
    { id: 'blog', component: Blog },
    { id: 'contact', component: Contact }
  ], []);
  
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isTouch = isMobile || isTablet;
  const { activeSection, activeSectionIndex, transitionToSection, sectionsRef, containerRef, isInitialized } = useSectionTransition(sections);

  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      const targetSection = event.detail;
      const sectionExists = sections.find(s => s.id === targetSection);
      if (sectionExists) {
        transitionToSection(targetSection);
      }
    };

    window.addEventListener('sectionChange', handleSectionChange as EventListener);
    return () => {
      window.removeEventListener('sectionChange', handleSectionChange as EventListener);
    };
  }, [transitionToSection, sections]);

  if (!isInitialized) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white opacity-50">Carregando...</div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full" 
      style={{ 
        minHeight: isTouch ? 'auto' : '100vh',
        height: isTouch ? 'auto' : '100vh',
        maxHeight: isTouch ? 'none' : '100vh',
        overflow: isTouch ? 'visible' : 'hidden',
        margin: 0,
        padding: 0
      }}
    >
      {/* Skip navigation */}
      <a 
        href="#contact" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Pular para o contato
      </a>

      <div 
        ref={containerRef}
        className={`${isTouch ? 'block' : 'flex h-full'}`}
        style={{ 
          width: isTouch ? '100%' : `${sections.length * 100}vw`,
          height: isTouch ? 'auto' : '100vh',
          minHeight: isTouch ? 'auto' : '100vh',
          maxHeight: isTouch ? 'none' : '100vh',
          willChange: isTouch ? 'auto' : 'transform',
          backgroundColor: 'transparent',
          margin: 0,
          padding: 0
        }}
      >
        {sections.map((section, index) => {
          const Component = section.component;
          const allowScroll = section.id === 'contact' || section.id === 'socios';
          const isActive = activeSectionIndex === index;
          
          return (
            <div
              key={section.id}
              className={`relative ${isTouch ? 'w-full block' : 'flex-shrink-0 w-screen h-full'}`}
              style={{ 
                width: isTouch ? '100%' : '100vw',
                height: isTouch ? 'auto' : '100vh',
                minWidth: isTouch ? 'auto' : '100vw',
                minHeight: isTouch ? 'auto' : '100vh',
                maxHeight: isTouch ? 'none' : '100vh',
                backgroundColor: 'transparent',
                margin: 0,
                padding: 0
              }}
            >
              <Section 
                id={section.id} 
                isActive={isActive}
                allowScroll={allowScroll}
                ref={el => {
                  if (el) {
                    sectionsRef.current[index] = el;
                  }
                }}
                className={isTouch ? 'min-h-auto' : 'h-full'}
              >
                <Component />
              </Section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionsContainer;