
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

interface Section {
  id: string;
  component: React.ComponentType;
}

export const useSectionTransition = (sections: Section[]) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioning = useRef(false);
  const lastScrollTime = useRef(0);

  console.log('useSectionTransition - Current activeSection:', activeSection);

  // Initialize active section based on hash or default to home
  useEffect(() => {
    const hash = location.hash.substring(1);
    console.log('useSectionTransition - Hash changed:', hash);
    if (hash && sections.find(s => s.id === hash)) {
      setActiveSection(hash);
    } else {
      setActiveSection('home');
    }
  }, [location.hash, sections]);

  const transitionToSection = useCallback((sectionId: string) => {
    console.log('transitionToSection called:', { sectionId, activeSection, isTransitioning: isTransitioning.current });
    
    if (isTransitioning.current || activeSection === sectionId) {
      console.log('Transition blocked - already transitioning or same section');
      return;
    }
    
    const sectionExists = sections.find(s => s.id === sectionId);
    if (!sectionExists) {
      console.warn('Section not found:', sectionId);
      return;
    }
    
    console.log('Starting transition to:', sectionId);
    isTransitioning.current = true;
    
    // Update URL hash
    if (location.pathname === '/') {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    
    // Set new active section immediately
    setActiveSection(sectionId);
    
    // Reset transition flag
    setTimeout(() => {
      isTransitioning.current = false;
      console.log('Transition completed for:', sectionId);
    }, 700);
  }, [activeSection, sections, location.pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        console.log('Keyboard navigation down:', sections[nextIndex].id);
        transitionToSection(sections[nextIndex].id);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        console.log('Keyboard navigation up:', sections[prevIndex].id);
        transitionToSection(sections[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sections, transitionToSection]);

  // Handle scroll for section navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      console.log('Wheel event:', { 
        deltaY: e.deltaY, 
        isTransitioning: isTransitioning.current,
        timeSinceLastScroll: now - lastScrollTime.current,
        activeSection
      });

      // Prevent scroll if transitioning
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      // Throttle scroll events
      if (now - lastScrollTime.current < 300) {
        e.preventDefault();
        return;
      }

      // Only handle significant scroll movements
      if (Math.abs(e.deltaY) < 50) {
        return;
      }

      lastScrollTime.current = now;
      e.preventDefault();
      
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      console.log('Processing scroll - currentIndex:', currentIndex);
      
      if (e.deltaY > 0) {
        // Scroll down
        const nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : currentIndex;
        if (nextIndex !== currentIndex) {
          console.log('Scrolling down to:', sections[nextIndex].id);
          transitionToSection(sections[nextIndex].id);
        }
      } else if (e.deltaY < 0) {
        // Scroll up
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        if (prevIndex !== currentIndex) {
          console.log('Scrolling up to:', sections[prevIndex].id);
          transitionToSection(sections[prevIndex].id);
        }
      }
    };

    // Add event listener with passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, sections, transitionToSection]);

  return {
    activeSection,
    transitionToSection,
    sectionsRef
  };
};
