
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

  // Add wheel event listener for scroll navigation
  useEffect(() => {
    let isScrolling = false;
    
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling || isTransitioning) return;
      
      // For scrollable sections, check if we're at boundaries
      if (activeSection === 'contact' || activeSection === 'socios') {
        const target = e.target as HTMLElement;
        const scrollContainer = target.closest('[data-allow-scroll="true"]') || 
                               target.closest('.section-container');
        
        if (scrollContainer) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          const isAtTop = scrollTop <= 1;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
          
          // Only allow section transition if at boundaries
          if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            console.log('Allowing internal scroll, not at boundary');
            return; // Allow normal scrolling within the section
          }
          
          console.log('At boundary, allowing section transition');
        }
      }
      
      // Check if we're inside any other scrollable container that shouldn't trigger transitions
      const target = e.target as HTMLElement;
      const scrollableParent = target.closest('[data-radix-scroll-area-viewport]') ||
                              target.closest('.scroll-area:not(.section-container)');
      
      if (scrollableParent && activeSection !== 'contact' && activeSection !== 'socios') {
        console.log('Found other scrollable parent, allowing normal scroll');
        return;
      }
      
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
