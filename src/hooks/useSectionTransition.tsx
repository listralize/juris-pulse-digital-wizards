
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

interface Section {
  id: string;
  component: React.ComponentType;
}

export const useSectionTransition = (sections: Section[]) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const lastScrollTime = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasInitialized = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detectar dispositivo uma única vez e não ficar verificando
  useEffect(() => {
    const width = window.innerWidth;
    setIsMobile(width < 640);
    setIsTablet(width >= 640 && width < 1024);
  }, []);

  // Verificar se seção permite scroll
  const sectionAllowsScroll = useCallback((sectionId: string) => {
    return ['areas', 'contact', 'blog', 'socios'].includes(sectionId);
  }, []);

  // Inicialização única e rápida
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
    
    // Posição inicial sem animação
    if (containerRef.current) {
      if (isMobile || isTablet) {
        // Mobile/Tablet: sem transformação
        gsap.set(containerRef.current, { 
          clearProps: "all",
          force3D: false
        });
      } else {
        // Desktop: posição inicial direta
        gsap.set(containerRef.current, { 
          x: `-${targetIndex * 100}vw`,
          force3D: true
        });
      }
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
  }, [isMobile, isTablet, location.hash, sections]);

  const transitionToSection = useCallback((sectionId: string) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1 || activeSection === sectionId || isTransitioning.current) {
      return;
    }
    
    isTransitioning.current = true;
    
    // Atualizar URL
    if (location.pathname === '/') {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
    
    setActiveSection(sectionId);
    setActiveSectionIndex(sectionIndex);
    
    if (containerRef.current) {
      if (isMobile || isTablet) {
        // Mobile/Tablet: scroll nativo
        const targetSection = sectionsRef.current[sectionIndex];
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        setTimeout(() => {
          isTransitioning.current = false;
        }, 300);
      } else {
        // Desktop: animação GSAP otimizada
        gsap.killTweensOf(containerRef.current);
        
        gsap.to(containerRef.current, {
          x: `-${sectionIndex * 100}vw`,
          duration: 0.5, // Mais rápido
          ease: 'power2.out', // Ease mais simples
          force3D: true,
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    } else {
      isTransitioning.current = false;
    }
  }, [activeSection, sections, location.pathname, isMobile, isTablet]);

  // Navegação por teclado apenas desktop
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current || sectionAllowsScroll(activeSection)) return;
      
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
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection, isMobile, isTablet, sectionAllowsScroll]);

  // Scroll wheel apenas desktop com throttle pesado
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return; // Throttle muito pesado
      
      if (Math.abs(e.deltaY) < 50) return; // Threshold maior

      e.preventDefault();
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
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, isMobile, isTablet]);

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
