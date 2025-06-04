
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
  const [isInitialized, setIsInitialized] = useState(false);

  console.log('useSectionTransition - Current state:', { 
    activeSection, 
    activeSectionIndex, 
    sectionsLength: sections.length,
    sectionIds: sections.map(s => s.id),
    isInitialized
  });

  // Simplified initialization
  useEffect(() => {
    console.log('useSectionTransition - Initializing...');
    
    const hash = location.hash.substring(1);
    const targetSection = hash && sections.find(s => s.id === hash) ? hash : 'home';
    const targetIndex = sections.findIndex(s => s.id === targetSection);
    const finalIndex = targetIndex >= 0 ? targetIndex : 0;
    
    console.log('useSectionTransition - Setting initial state:', { targetSection, finalIndex });
    
    setActiveSection(targetSection);
    setActiveSectionIndex(finalIndex);
    
    // Set initial position immediately without animation
    if (containerRef.current) {
      gsap.set(containerRef.current, { x: `-${finalIndex * 100}vw` });
    }
    
    setIsInitialized(true);
    console.log('useSectionTransition - Initialization complete');
  }, [location.hash, sections]);

  const transitionToSection = useCallback((sectionId: string) => {
    console.log('transitionToSection called:', { 
      sectionId, 
      activeSection, 
      isTransitioning: isTransitioning.current,
      sections: sections.map(s => s.id)
    });
    
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) {
      console.warn('Section not found:', sectionId);
      return;
    }

    if (activeSection === sectionId && activeSectionIndex === sectionIndex) {
      console.log('Already on target section:', sectionId);
      return;
    }
    
    // Force stop any ongoing transitions
    if (isTransitioning.current && containerRef.current) {
      gsap.killTweensOf(containerRef.current);
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
    
    // Animate transition
    if (containerRef.current) {
      const targetX = -sectionIndex * 100;
      
      console.log('Animating to position:', targetX + 'vw');
      
      gsap.to(containerRef.current, {
        x: `${targetX}vw`,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          isTransitioning.current = false;
          console.log('Transition completed for:', sectionId);
        },
        onInterrupt: () => {
          isTransitioning.current = false;
          console.log('Transition interrupted for:', sectionId);
        }
      });
    } else {
      isTransitioning.current = false;
    }
  }, [activeSection, activeSectionIndex, sections, location.pathname]);

  // Handle keyboard navigation with better logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInitialized) return;
      
      let newIndex = activeSectionIndex;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = Math.max(activeSectionIndex - 1, 0);
      }
      
      if (newIndex !== activeSectionIndex && sections[newIndex]) {
        console.log('Keyboard navigation to:', sections[newIndex].id);
        transitionToSection(sections[newIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized]);

  // Improved scroll navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInitialized) return;
      
      const now = Date.now();
      
      // Reduced throttle time and improved logic
      if (now - lastScrollTime.current < 600) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 30) return;

      e.preventDefault();
      lastScrollTime.current = now;
      
      let newIndex = activeSectionIndex;
      
      if (e.deltaY > 0) {
        // Scroll down - next section
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else {
        // Scroll up - previous section
        newIndex = Math.max(activeSectionIndex - 1, 0);
      }
      
      if (newIndex !== activeSectionIndex && sections[newIndex]) {
        console.log('Scroll navigation to:', sections[newIndex].id);
        transitionToSection(sections[newIndex].id);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized]);

  return {
    activeSection,
    activeSectionIndex,
    transitionToSection,
    sectionsRef,
    containerRef,
    isInitialized
  };
};
