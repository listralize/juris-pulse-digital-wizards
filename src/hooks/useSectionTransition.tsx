
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

  // Initialize active section based on hash or default to home
  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash && sections.find(s => s.id === hash)) {
      setActiveSection(hash);
    } else {
      setActiveSection('home');
    }
  }, [location.hash, sections]);

  const transitionToSection = useCallback((sectionId: string) => {
    if (isTransitioning.current || activeSection === sectionId) return;
    
    console.log('Transitioning to section:', sectionId);
    
    const sectionExists = sections.find(s => s.id === sectionId);
    if (!sectionExists) {
      console.warn('Section not found:', sectionId);
      return;
    }
    
    isTransitioning.current = true;
    
    // Update URL hash
    if (location.pathname === '/') {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    
    // Set new active section immediately for better UX
    setActiveSection(sectionId);
    
    // Reset transition flag after animation
    setTimeout(() => {
      isTransitioning.current = false;
    }, 600);
  }, [activeSection, sections, location.pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        transitionToSection(sections[nextIndex].id);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        transitionToSection(sections[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sections, transitionToSection]);

  // Handle scroll for section navigation
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentIndex = sections.findIndex(s => s.id === activeSection);
        
        if (e.deltaY > 0) {
          // Scroll down
          const nextIndex = (currentIndex + 1) % sections.length;
          transitionToSection(sections[nextIndex].id);
        } else if (e.deltaY < 0) {
          // Scroll up
          const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
          transitionToSection(sections[prevIndex].id);
        }
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection, sections, transitionToSection]);

  return {
    activeSection,
    transitionToSection,
    sectionsRef
  };
};
