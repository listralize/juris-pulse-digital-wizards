
import React from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';
import Section from './Section';
import { Hero, About, PracticeAreas, Partners, ClientArea, Blog, Contact } from './sections';

const sections = [
  { id: 'home', component: Hero },
  { id: 'about', component: About },
  { id: 'areas', component: PracticeAreas },
  { id: 'team', component: Partners },
  { id: 'cliente', component: ClientArea },
  { id: 'blog', component: Blog },
  { id: 'contact', component: Contact }
];

const SectionsContainer = () => {
  const {
    activeSection,
    activeSectionIndex,
    transitionToSection,
    sectionsRef,
    containerRef,
    isInitialized
  } = useSectionTransition(sections);

  console.log('SectionsContainer render:', { 
    activeSection, 
    activeSectionIndex, 
    isInitialized,
    sectionsCount: sections.length 
  });

  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        ref={containerRef}
        className="w-full"
        style={{ 
          height: `${sections.length * 100}vh`,
          willChange: 'transform'
        }}
      >
        {sections.map((section, index) => {
          const Component = section.component;
          const isActive = activeSection === section.id;
          const allowScroll = section.id === 'contact' || section.id === 'areas';
          
          return (
            <Section
              key={section.id}
              id={section.id}
              ref={el => sectionsRef.current[index] = el}
              isActive={isActive}
              allowScroll={allowScroll}
              className="w-full"
              style={{ height: '100vh' }}
            >
              <Component />
            </Section>
          );
        })}
      </div>
    </div>
  );
};

export default SectionsContainer;
