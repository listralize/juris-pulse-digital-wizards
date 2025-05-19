
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

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
    // Set initial active section based on URL hash
    const initialHash = window.location.hash.substring(1);
    const validIds = sections.map(section => section.id);
    const initialSection = initialHash && validIds.includes(initialHash) ? initialHash : 'home';
    
    setActiveSection(initialSection);
    
    // If there's a hash in the URL, scroll to that section
    if (initialHash && initialHash !== 'home') {
      setTimeout(() => {
        const section = document.getElementById(initialHash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top for home section
      window.scrollTo(0, 0);
    }
  }, [sections]);
  
  // Function to transition to a section
  const transitionToSection = (id: string) => {
    if (isTransitioning || id === activeSection) return;
    
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      
      // Update URL without reloading
      if (history.pushState) {
        history.pushState(null, '', `#${id}`);
      } else {
        window.location.hash = id;
      }
      
      setActiveSection(id);
    }
  };

  return {
    activeSection,
    transitionToSection,
    sectionsRef
  };
};

export default useSectionTransition;
