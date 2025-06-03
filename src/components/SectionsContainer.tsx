
import React from 'react';
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
  
  const { activeSection, transitionToSection, sectionsRef } = useSectionTransition(sections);

  console.log('SectionsContainer render:', { activeSection, sectionsLength: sections.length });

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {sections.map((section, index) => {
        const Component = section.component;
        const allowScroll = section.id === 'contact' || section.id === 'socios';
        const isActive = activeSection === section.id;
        
        console.log(`Section ${section.id}:`, { isActive, index, allowScroll });
        
        return (
          <Section 
            key={section.id} 
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
        );
      })}
    </div>
  );
};

export default SectionsContainer;
