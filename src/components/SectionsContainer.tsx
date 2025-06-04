
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
import Footer from './sections/Footer';

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
  
  const { activeSection, activeSectionIndex, transitionToSection, sectionsRef, containerRef, isInitialized } = useSectionTransition(sections);

  console.log('SectionsContainer render:', { 
    activeSection, 
    activeSectionIndex, 
    sectionsLength: sections.length, 
    isInitialized
  });

  // Listen for custom section change events with improved handling
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      const targetSection = event.detail;
      console.log('SectionsContainer: Section change event received:', targetSection);
      
      // Validate that the section exists
      const sectionExists = sections.find(s => s.id === targetSection);
      if (sectionExists) {
        transitionToSection(targetSection);
      } else {
        console.warn('SectionsContainer: Invalid section requested:', targetSection);
      }
    };

    window.addEventListener('sectionChange', handleSectionChange as EventListener);
    
    return () => {
      window.removeEventListener('sectionChange', handleSectionChange as EventListener);
    };
  }, [transitionToSection, sections]);

  // Show minimal loading state
  if (!isInitialized) {
    return (
      <div className="w-full h-screen bg-transparent flex items-center justify-center">
        <div className="text-current opacity-50">Inicializando...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Horizontal container */}
      <div 
        ref={containerRef}
        className="flex h-full will-change-transform"
        style={{ 
          width: `${sections.length * 100}vw`
        }}
      >
        {sections.map((section, index) => {
          const Component = section.component;
          const allowScroll = section.id === 'contact' || section.id === 'socios';
          const isActive = activeSectionIndex === index;
          
          return (
            <div
              key={section.id}
              className="w-screen h-full flex-shrink-0 relative"
              style={{ 
                width: '100vw',
                minWidth: '100vw'
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
                className={section.id === 'contact' ? 'pb-0' : ''}
              >
                <Component />
                {section.id === 'contact' && <Footer />}
              </Section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionsContainer;
