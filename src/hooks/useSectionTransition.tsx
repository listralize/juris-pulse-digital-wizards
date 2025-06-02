
import { useState, useRef, useEffect } from 'react';

interface Section {
  id: string;
  component: React.ComponentType;
}

export const useSectionTransition = (sections: Section[]) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Handle initial load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const validIds = sections.map(section => section.id);
      const newSection = hash && validIds.includes(hash) ? hash : 'home';
      
      console.log('Hash change detected:', hash, 'Setting section to:', newSection);
      setActiveSection(newSection);
    };

    // Set initial section
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [sections]);
  
  // Function to transition to a section
  const transitionToSection = (id: string) => {
    if (isTransitioning || id === activeSection) return;
    
    console.log('Transitioning to section:', id);
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
    sectionsRef,
    isTransitioning
  };
};

export default useSectionTransition;
