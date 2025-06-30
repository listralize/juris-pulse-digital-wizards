
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
  const hasInitialized = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detectar se é mobile/tablet - simplificado
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkDeviceType();
    
    // Só adicionar listener se não for mobile para economizar recursos
    if (window.innerWidth >= 640) {
      const debouncedCheck = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkDeviceType, 150);
      };
      let resizeTimer: ReturnType<typeof setTimeout>;
      
      window.addEventListener('resize', debouncedCheck, { passive: true });
      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', debouncedCheck);
      };
    }
  }, []);

  // Função simples para verificar se permite scroll interno
  const sectionAllowsScroll = useCallback((sectionId: string) => {
    return ['areas', 'contact', 'blog', 'socios'].includes(sectionId);
  }, []);

  // Inicialização simplificada para mobile
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
    
    // Mobile: sem animações GSAP
    if (isMobile || isTablet) {
      if (containerRef.current) {
        containerRef.current.style.transform = 'none';
      }
    } else {
      // Desktop: manter animações originais
      if (containerRef.current) {
        requestAnimationFrame(() => {
          gsap.set(containerRef.current, { 
            x: `-${targetIndex * 100}vw`,
            y: 0,
            force3D: true
          });
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
    
    // Atualizar URL hash
    if (location.pathname === '/') {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
    
    // Atualizar estado
    setActiveSection(sectionId);
    setActiveSectionIndex(sectionIndex);
    
    // Mobile: scroll nativo simples
    if (isMobile || isTablet) {
      const targetSection = sectionsRef.current[sectionIndex];
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      // Timeout mais curto para mobile
      setTimeout(() => {
        isTransitioning.current = false;
      }, 300);
    } else {
      // Desktop: manter animações GSAP
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
        
        const targetX = -sectionIndex * 100;
        gsap.to(containerRef.current, {
          x: `${targetX}vw`,
          y: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          force3D: true,
          onComplete: () => {
            isTransitioning.current = false;
          },
          onInterrupt: () => {
            isTransitioning.current = false;
          }
        });
      } else {
        isTransitioning.current = false;
      }
    }
  }, [activeSection, sections, location.pathname, isMobile, isTablet]);

  // Navegação por teclado - APENAS desktop
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

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection, isMobile, isTablet, sectionAllowsScroll]);

  // Navegação por scroll - APENAS desktop
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 800 || Math.abs(e.deltaY) < 30) {
        return;
      }

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
