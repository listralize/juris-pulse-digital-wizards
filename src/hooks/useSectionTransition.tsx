import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

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
  const hasInitialized = useRef(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    if (hasInitialized.current) return;
    
    const hash = location.hash.substring(1);
    let targetSection = 'home';
    let targetIndex = 0;
    
    if (hash && sections.find(s => s.id === hash)) {
      targetSection = hash;
      targetIndex = sections.findIndex(s => s.id === hash);
    }
    
    setActiveSection(targetSection);
    setActiveSectionIndex(targetIndex);
    
    if (containerRef.current) {
      if (isMobile || isTablet) {
        containerRef.current.style.transform = 'none';
      } else {
        gsap.set(containerRef.current, { x: `-${targetIndex * 100}vw`, y: 0, force3D: true });
      }
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
  }, [isMobile, isTablet]);

  const transitionToSection = useCallback((sectionId: string) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) return;
    if (activeSection === sectionId && activeSectionIndex === sectionIndex) return;
    if (isTransitioning.current) return;
    
    isTransitioning.current = true;
    
    if (location.pathname === '/') {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    
    setActiveSection(sectionId);
    setActiveSectionIndex(sectionIndex);
    window.dispatchEvent(new CustomEvent('activeSectionChanged', { detail: sectionId }));
    
    if (containerRef.current) {
      gsap.killTweensOf(containerRef.current);
      
      if (isMobile || isTablet) {
        const targetSection = sectionsRef.current[sectionIndex];
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        isTransitioning.current = false;
      } else {
        const targetX = -sectionIndex * 100;
        
        gsap.to(containerRef.current, {
          x: `${targetX}vw`,
          y: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          force3D: true,
          onComplete: () => {
            isTransitioning.current = false;
          },
          onInterrupt: () => {
            isTransitioning.current = false;
          }
        });
      }
    } else {
      isTransitioning.current = false;
    }
  }, [activeSection, activeSectionIndex, sections, location.pathname, isMobile, isTablet]);

  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
      let newIndex = activeSectionIndex;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = Math.max(activeSectionIndex - 1, 0);
      }
      
      if (newIndex !== activeSectionIndex && sections[newIndex]) {
        transitionToSection(sections[newIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection, isMobile, isTablet]);

  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 600) return;

      e.preventDefault();
      if (Math.abs(e.deltaY) < 50) return;

      lastScrollTime.current = now;
      
      let newIndex = activeSectionIndex;
      
      if (e.deltaY > 0) {
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else {
        newIndex = Math.max(activeSectionIndex - 1, 0);
      }
      
      if (newIndex !== activeSectionIndex && sections[newIndex]) {
        transitionToSection(sections[newIndex].id);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection, isMobile, isTablet]);

  return {
    activeSection,
    activeSectionIndex,
    transitionToSection,
    sectionsRef,
    containerRef,
    isInitialized,
    isMobile
  };
};
