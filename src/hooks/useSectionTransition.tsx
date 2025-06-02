
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

  // Add wheel event listener for scroll navigation only for non-scrollable sections
  useEffect(() => {
    let isScrolling = false;
    
    const handleWheel = (e: WheelEvent) => {
      // Allow normal scroll for contact and socios sections
      if (activeSection === 'contact' || activeSection === 'socios') {
        return;
      }
      
      // Check if we're inside a scrollable element within socios section
      const target = e.target as HTMLElement;
      if (target.closest('#socios')) {
        return;
      }
      
      if (isScrolling || isTransitioning) return;
      
      e.preventDefault();
      isScrolling = true;
      
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      let nextIndex = currentIndex;
      
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll down
        nextIndex = currentIndex + 1;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up
        nextIndex = currentIndex - 1;
      }
      
      if (nextIndex !== currentIndex) {
        const nextSection = sections[nextIndex];
        transitionToSection(nextSection.id);
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    // Add wheel event listener to document
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, sections, isTransitioning]);
  
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
