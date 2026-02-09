
import React, { useEffect } from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';
import { useIsMobile, useIsTablet } from '../hooks/use-mobile';
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
  
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { activeSection, activeSectionIndex, transitionToSection, sectionsRef, containerRef, isInitialized } = useSectionTransition(sections);

  // Debug logging removed for production performance

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
        minHeight: (isMobile || isTablet) ? 'auto' : '100vh',
        height: (isMobile || isTablet) ? 'auto' : '100vh',
        maxHeight: (isMobile || isTablet) ? 'none' : '100vh',
        overflow: (isMobile || isTablet) ? 'visible' : 'hidden',
        margin: 0,
        padding: 0
      }}
    >
      <div 
        ref={containerRef}
        className={`${(isMobile || isTablet) ? 'block' : 'flex h-full'}`}
        style={{ 
          width: (isMobile || isTablet) ? '100%' : `${sections.length * 100}vw`,
          height: (isMobile || isTablet) ? 'auto' : '100vh',
          minHeight: (isMobile || isTablet) ? 'auto' : '100vh',
          maxHeight: (isMobile || isTablet) ? 'none' : '100vh',
          willChange: (isMobile || isTablet) ? 'auto' : 'transform',
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
              className={`relative ${
                (isMobile || isTablet) ? 'w-full block' : 'flex-shrink-0 w-screen h-full'
              }`}
              style={{ 
                width: (isMobile || isTablet) ? '100%' : '100vw',
                height: (isMobile || isTablet) ? 'auto' : '100vh',
                minWidth: (isMobile || isTablet) ? 'auto' : '100vw',
                minHeight: (isMobile || isTablet) ? 'auto' : '100vh',
                maxHeight: (isMobile || isTablet) ? 'none' : '100vh',
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
                className={(isMobile || isTablet) ? 'min-h-auto' : 'h-full'}
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
