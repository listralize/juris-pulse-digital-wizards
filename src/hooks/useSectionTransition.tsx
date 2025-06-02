
import { useState, useRef, useEffect } from 'react';

interface Section {
  id: string;
  component: React.ComponentType;
}

export const useSectionTransition = (sections: Section[]) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Handle initial load
  useEffect(() => {
    const initialHash = window.location.hash.substring(1);
    const validIds = sections.map(section => section.id);
    const initialSection = initialHash && validIds.includes(initialHash) ? initialHash : 'home';
    
    setActiveSection(initialSection);
    
    // Update URL if needed
    if (window.location.hash !== `#${initialSection}`) {
      if (history.pushState) {
        history.pushState(null, '', `#${initialSection}`);
      } else {
        window.location.hash = initialSection;
      }
    }
  }, [sections]);
  
  // Function to transition to a section
  const transitionToSection = (id: string) => {
    if (isTransitioning || id === activeSection) return;
    setIsTransitioning(true);
    
    // Update URL
    if (history.pushState) {
      history.pushState(null, '', `#${id}`);
    } else {
      window.location.hash = id;
    }
    
    setActiveSection(id);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return {
    activeSection,
    transitionToSection,
    sectionsRef
  };
};

export default useSectionTransition;
