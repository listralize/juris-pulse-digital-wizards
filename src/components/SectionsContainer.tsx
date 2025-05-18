
import React from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';

// Import Sections
import Hero from './sections/Hero';
import About from './sections/About';
import PracticeAreas from './sections/PracticeAreas';
import Partners from './sections/Partners';
import ClientArea from './sections/ClientArea';
import Contact from './sections/Contact';

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
    <div className="relative min-h-screen w-full">
      {sections.map((section, index) => {
        const Component = section.component;
        return (
          <div 
            key={section.id} 
            id={section.id} 
            ref={el => el && (sectionsRef.current[index] = el)}
            className="absolute inset-0 min-h-screen w-full"
            style={{ display: index === 0 ? 'block' : 'none' }}
          >
            <Component />
          </div>
        );
      })}
    </div>
  );
};

export default SectionsContainer;
