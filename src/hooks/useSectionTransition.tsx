import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { logger } from '@/utils/logger';

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

  logger.log('useSectionTransition - Estado atual:', { 
    activeSection, activeSectionIndex, sectionsLength: sections.length,
    sectionIds: sections.map(s => s.id), isInitialized, isMobile, isTablet
  });

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  const sectionAllowsScroll = (sectionId: string) => false;

  useEffect(() => {
    if (hasInitialized.current) return;
    
    logger.log('useSectionTransition - Inicializando ÚNICA VEZ...');
    
    const hash = location.hash.substring(1);
    let targetSection = 'home';
    let targetIndex = 0;
    
    if (hash && sections.find(s => s.id === hash)) {
      targetSection = hash;
      targetIndex = sections.findIndex(s => s.id === hash);
    }
    
    logger.log('useSectionTransition - Estado inicial:', { targetSection, targetIndex });
    
    setActiveSection(targetSection);
    setActiveSectionIndex(targetIndex);
    
    if (containerRef.current) {
      if (isMobile || isTablet) {
        gsap.set(containerRef.current, { x: 0, y: 0, clearProps: "all", force3D: false });
      } else {
        gsap.set(containerRef.current, { x: `-${targetIndex * 100}vw`, y: 0, force3D: true });
      }
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
    logger.log('useSectionTransition - Inicialização completa');
  }, [isMobile, isTablet]);

  const transitionToSection = useCallback((sectionId: string) => {
    logger.log('transitionToSection chamado:', { sectionId, activeSection, isTransitioning: isTransitioning.current, isMobile, isTablet });
    
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) {
      logger.warn('Seção não encontrada:', sectionId);
      return;
    }

    if (activeSection === sectionId && activeSectionIndex === sectionIndex) {
      logger.log('Já está na seção alvo:', sectionId);
      return;
    }
    
    if (isTransitioning.current) {
      logger.log('Já em transição, ignorando...');
      return;
    }
    
    logger.log('Iniciando transição para:', sectionId, 'Índice:', sectionIndex);
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
        logger.log('Transição mobile/tablet completada para:', sectionId);
      } else {
        const targetX = -sectionIndex * 100;
        logger.log('Desktop - Animando para posição X:', targetX + 'vw');
        
        gsap.to(containerRef.current, {
          x: `${targetX}vw`,
          y: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          force3D: true,
          onComplete: () => {
            isTransitioning.current = false;
            logger.log('Transição desktop completada para:', sectionId);
          },
          onInterrupt: () => {
            isTransitioning.current = false;
            logger.log('Transição desktop interrompida para:', sectionId);
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
      if (sectionAllowsScroll(activeSection)) return;
      
      let newIndex = activeSectionIndex;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = Math.max(activeSectionIndex - 1, 0);
      }
      
      if (newIndex !== activeSectionIndex && sections[newIndex]) {
        logger.log('Navegação por teclado para:', sections[newIndex].id);
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
        logger.log('Navegação desktop por scroll para:', sections[newIndex].id);
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
