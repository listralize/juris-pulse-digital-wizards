
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
  const [isInitialized, setIsInitialized] = useState(false);

  console.log('useSectionTransition - Current activeSection:', activeSection);

  // Initialize active section based on hash or default to home
  useEffect(() => {
    const hash = location.hash.substring(1);
    console.log('useSectionTransition - Hash changed:', hash);
    
    const targetSection = hash && sections.find(s => s.id === hash) ? hash : 'home';
    setActiveSection(targetSection);
    setIsInitialized(true);
    
    console.log('useSectionTransition - Setting active section to:', targetSection);
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
    
    // Reset transition flag after animation
    setTimeout(() => {
      isTransitioning.current = false;
      console.log('Transition completed for:', sectionId);
    }, 800);
  }, [activeSection, sections, location.pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isInitialized) return;
    
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
  }, [activeSection, sections, transitionToSection, isInitialized]);

  // Handle scroll for section navigation with improved logic
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      console.log('Wheel event detected:', { 
        deltaY: e.deltaY, 
        isTransitioning: isTransitioning.current,
        timeSinceLastScroll: now - lastScrollTime.current,
        activeSection
      });

      // Prevent scroll if transitioning
      if (isTransitioning.current) {
        e.preventDefault();
        console.log('Blocking scroll - transition in progress');
        return;
      }

      // Throttle scroll events more aggressively
      if (now - lastScrollTime.current < 800) {
        e.preventDefault();
        console.log('Blocking scroll - too soon since last scroll');
        return;
      }

      // Only handle significant scroll movements
      if (Math.abs(e.deltaY) < 50) {
        console.log('Scroll too small, ignoring');
        return;
      }

      // Prevent default scrolling
      e.preventDefault();
      lastScrollTime.current = now;
      
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      console.log('Processing scroll - currentIndex:', currentIndex, 'deltaY:', e.deltaY);
      
      if (e.deltaY > 0) {
        // Scroll down
        if (currentIndex < sections.length - 1) {
          const nextIndex = currentIndex + 1;
          console.log('Scrolling down to section:', sections[nextIndex].id);
          transitionToSection(sections[nextIndex].id);
        } else {
          console.log('Already at last section, cannot scroll down');
        }
      } else if (e.deltaY < 0) {
        // Scroll up
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          console.log('Scrolling up to section:', sections[prevIndex].id);
          transitionToSection(sections[prevIndex].id);
        } else {
          console.log('Already at first section, cannot scroll up');
        }
      }
    };

    // Add event listener with passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, sections, transitionToSection, isInitialized]);

  return {
    activeSection,
    transitionToSection,
    sectionsRef,
    isInitialized
  };
};
