
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
    isInitialized,
    allSectionIds: sections.map(s => s.id)
  });

  // Listen for custom section change events from navbar
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      const targetSection = event.detail;
      console.log('SectionsContainer: Custom section change event:', targetSection);
      transitionToSection(targetSection);
    };

    window.addEventListener('sectionChange', handleSectionChange as EventListener);
    
    return () => {
      window.removeEventListener('sectionChange', handleSectionChange as EventListener);
    };
  }, [transitionToSection]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Horizontal container that slides */}
      <div 
        ref={containerRef}
        className="flex h-full will-change-transform"
        style={{ 
          width: `${sections.length * 100}vw`,
          transform: `translateX(-${activeSectionIndex * 100}vw)`,
          transition: 'none'
        }}
      >
        {sections.map((section, index) => {
          const Component = section.component;
          const allowScroll = section.id === 'contact' || section.id === 'socios';
          const isActive = activeSectionIndex === index;
          
          console.log(`Section ${section.id} (${index}):`, { 
            isActive, 
            index, 
            allowScroll, 
            activeSectionIndex,
            component: Component.name
          });
          
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
