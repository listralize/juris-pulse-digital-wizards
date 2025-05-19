
import React from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';
import Section from './Section';

// Import Sections
import Hero from './sections/Hero';
import About from './sections/About';
import PracticeAreas from './sections/PracticeAreas';
import Partners from './sections/Partners';
import ClientArea from './sections/ClientArea';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

interface SectionsContainerProps {
  onActiveChange: (sectionId: string) => void;
}

const SectionsContainer: React.FC<SectionsContainerProps> = ({ onActiveChange }) => {
  const sections = [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'partners', component: Partners }, 
    { id: 'client', component: ClientArea },
    { id: 'contact', component: Contact }
  ];
  
  const { activeSection, transitionToSection, sectionsRef } = useSectionTransition(sections);
  
  // Update parent component when active section changes
  React.useEffect(() => {
    onActiveChange(activeSection);
  }, [activeSection, onActiveChange]);

  return (
    <div className="relative min-h-screen w-full bg-black dark:bg-black">
      {sections.map((section, index) => {
        const Component = section.component;
        return (
          <Section 
            key={section.id} 
            id={section.id} 
            isActive={section.id === activeSection}
            ref={el => el && (sectionsRef.current[index] = el)}
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
