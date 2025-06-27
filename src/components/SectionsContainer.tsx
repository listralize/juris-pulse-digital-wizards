
import React, { useEffect } from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';
import Section from './Section';

// Import Sections
import Hero from './sections/Hero';
import About from './sections/About';
import PracticeAreas from './sections/PracticeAreas';
import Partners from './sections/Partners';
import ClientArea from './sections/ClientArea';
import Blog from './sections/Blog';
import Contact from './sections/Contact';

const SectionsContainer: React.FC = () => {
  const sections = [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'socios', component: Partners }, 
    { id: 'cliente', component: ClientArea },
    { id: 'blog', component: Blog },
    { id: 'contact', component: Contact }
  ];
  
  const { activeSection, activeSectionIndex, transitionToSection, sectionsRef, containerRef, isInitialized, isMobile } = useSectionTransition(sections);

  console.log('SectionsContainer render:', { 
    activeSection, 
    activeSectionIndex, 
    sectionsLength: sections.length, 
    isInitialized,
    isMobile
  });

  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      const targetSection = event.detail;
      console.log('SectionsContainer: Evento de mudança de seção recebido:', targetSection);
      
      const sectionExists = sections.find(s => s.id === targetSection);
      if (sectionExists) {
        transitionToSection(targetSection);
      } else {
        console.warn('SectionsContainer: Seção inválida solicitada:', targetSection);
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
    <div className="relative w-full" style={{ 
      minHeight: isMobile ? 'auto' : '100vh',
      height: isMobile ? 'auto' : '100vh',
      overflow: isMobile ? 'visible' : 'hidden' 
    }}>
      <div 
        ref={containerRef}
        className={`${isMobile ? 'flex-col' : 'flex h-full'}`}
        style={{ 
          width: isMobile ? '100vw' : `${sections.length * 100}vw`,
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? 'auto' : '100vh',
          willChange: 'transform',
          backgroundColor: 'transparent'
        }}
      >
        {sections.map((section, index) => {
          const Component = section.component;
          const allowScroll = section.id === 'contact' || section.id === 'socios';
          const isActive = activeSectionIndex === index;
          
          return (
            <div
              key={section.id}
              className={`flex-shrink-0 relative ${isMobile ? 'w-full' : 'w-screen h-full'}`}
              style={{ 
                width: '100vw',
                height: isMobile && section.id === 'contact' ? 'auto' : '100vh',
                minWidth: '100vw',
                minHeight: isMobile && section.id === 'contact' ? 'auto' : '100vh',
                maxHeight: isMobile && section.id !== 'contact' ? '100vh' : 'none',
                backgroundColor: 'transparent'
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
                className={isMobile && section.id !== 'contact' ? 'h-screen' : 'h-full'}
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
