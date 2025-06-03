
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

interface Section {
  id: string;
  component: React.ComponentType;
}

export const useSectionTransition = (sections: Section[]) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const lastScrollTime = useRef(0);
  const [isInitialized, setIsInitialized] = useState(true); // Inicializar como true

  console.log('useSectionTransition - Current state:', { activeSection, activeSectionIndex, sectionsLength: sections.length });

  // Initialize active section based on hash or default to home
  useEffect(() => {
    const hash = location.hash.substring(1);
    console.log('useSectionTransition - Hash changed:', hash);
    
    const targetSection = hash && sections.find(s => s.id === hash) ? hash : 'home';
    const targetIndex = sections.findIndex(s => s.id === targetSection);
    
    setActiveSection(targetSection);
    setActiveSectionIndex(targetIndex >= 0 ? targetIndex : 0);
    
    // Definir posição inicial do container sem animação
    if (containerRef.current && targetIndex >= 0) {
      gsap.set(containerRef.current, { x: `-${targetIndex * 100}vw` });
    }
    
    console.log('useSectionTransition - Initialized:', { targetSection, targetIndex });
  }, [location.hash, sections]);

  const transitionToSection = useCallback((sectionId: string) => {
    console.log('transitionToSection called:', { sectionId, activeSection, isTransitioning: isTransitioning.current });
    
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) {
      console.warn('Section not found:', sectionId);
      return;
    }

    // If same section, don't transition
    if (activeSection === sectionId) {
      console.log('Already on target section:', sectionId);
      return;
    }
    
    console.log('Starting transition to:', sectionId, 'Index:', sectionIndex);
    isTransitioning.current = true;
    
    // Update URL hash
    if (location.pathname === '/') {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    
    // Set new active section immediately
    setActiveSection(sectionId);
    setActiveSectionIndex(sectionIndex);
    
    // Animate horizontal slide transition using GSAP
    if (containerRef.current) {
      const targetX = -sectionIndex * 100; // Each section is 100vw wide
      
      gsap.to(containerRef.current, {
        x: `${targetX}vw`,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          isTransitioning.current = false;
          console.log('Transition completed for:', sectionId);
        }
      });
    } else {
      isTransitioning.current = false;
    }
  }, [activeSection, sections, location.pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = activeSectionIndex < sections.length - 1 ? activeSectionIndex + 1 : activeSectionIndex;
        if (nextIndex !== activeSectionIndex) {
          console.log('Keyboard navigation next:', sections[nextIndex].id);
          transitionToSection(sections[nextIndex].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = activeSectionIndex > 0 ? activeSectionIndex - 1 : activeSectionIndex;
        if (prevIndex !== activeSectionIndex) {
          console.log('Keyboard navigation prev:', sections[prevIndex].id);
          transitionToSection(sections[prevIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, sections, transitionToSection]);

  // Handle scroll for section navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      console.log('Wheel event:', { 
        deltaY: e.deltaY, 
        isTransitioning: isTransitioning.current,
        timeSinceLastScroll: now - lastScrollTime.current,
        activeSection,
        activeSectionIndex
      });

      // Block scroll during transition
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      // Throttle scroll events
      if (now - lastScrollTime.current < 800) {
        e.preventDefault();
        return;
      }

      // Only handle significant scroll movements
      if (Math.abs(e.deltaY) < 30) {
        return;
      }

      // Prevent default scrolling
      e.preventDefault();
      lastScrollTime.current = now;
      
      if (e.deltaY > 0) {
        // Scroll down - move to next section
        if (activeSectionIndex < sections.length - 1) {
          const nextIndex = activeSectionIndex + 1;
          console.log('Scrolling to next section:', sections[nextIndex].id);
          transitionToSection(sections[nextIndex].id);
        }
      } else if (e.deltaY < 0) {
        // Scroll up - move to previous section
        if (activeSectionIndex > 0) {
          const prevIndex = activeSectionIndex - 1;
          console.log('Scrolling to prev section:', sections[prevIndex].id);
          transitionToSection(sections[prevIndex].id);
        }
      }
    };

    // Add event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSectionIndex, sections, transitionToSection]);

  return {
    activeSection,
    activeSectionIndex,
    transitionToSection,
    sectionsRef,
    containerRef,
    isInitialized
  };
};
