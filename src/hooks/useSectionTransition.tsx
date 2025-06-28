
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

  // Detectar se é mobile/tablet com throttle otimizado
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    
    const checkDeviceType = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width < 640);
        setIsTablet(width >= 640 && width < 1024);
      }, 100);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  // Função otimizada para verificar se o usuário rolou até o final da seção
  const isAtBottom = useCallback((element: HTMLElement) => {
    const threshold = 50;
    return element.scrollTop + element.clientHeight >= element.scrollHeight - threshold;
  }, []);

  // Função otimizada para verificar se o usuário está no topo da seção
  const isAtTop = useCallback((element: HTMLElement) => {
    return element.scrollTop <= 50;
  }, []);

  // Função para verificar se a seção permite scroll interno
  const sectionAllowsScroll = useCallback((sectionId: string) => {
    if (window.innerWidth < 768 && sectionId === 'areas') {
      return true;
    }
    return ['areas', 'contact', 'blog', 'socios'].includes(sectionId);
  }, []);

  // Inicialização única - otimizada para performance
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
    
    // Posição inicial otimizada
    if (containerRef.current) {
      requestAnimationFrame(() => {
        if (isMobile || isTablet) {
          gsap.set(containerRef.current, { 
            x: 0,
            y: 0,
            clearProps: "all",
            force3D: false
          });
        } else {
          gsap.set(containerRef.current, { 
            x: `-${targetIndex * 100}vw`,
            y: 0,
            force3D: true,
            willChange: 'transform'
          });
        }
      });
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
  }, [isMobile, isTablet, location.hash, sections]);

  const transitionToSection = useCallback((sectionId: string) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) {
      console.warn('Seção não encontrada:', sectionId);
      return;
    }

    if (activeSection === sectionId && activeSectionIndex === sectionIndex) {
      return;
    }
    
    if (isTransitioning.current) {
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
    
    // Animar transição otimizada
    if (containerRef.current) {
      gsap.killTweensOf(containerRef.current);
      
      if (isMobile || isTablet) {
        const targetSection = sectionsRef.current[sectionIndex];
        if (targetSection) {
          requestAnimationFrame(() => {
            targetSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          });
        }
        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      } else {
        const targetX = -sectionIndex * 100;
        
        gsap.to(containerRef.current, {
          x: `${targetX}vw`,
          y: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          force3D: true,
          willChange: 'transform',
          onComplete: () => {
            isTransitioning.current = false;
            if (containerRef.current) {
              containerRef.current.style.willChange = 'auto';
            }
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

  // Navegação por teclado otimizada - desabilitada no mobile/tablet
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    let keydownTimer: ReturnType<typeof setTimeout>;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
      clearTimeout(keydownTimer);
      keydownTimer = setTimeout(() => {
        if (sectionAllowsScroll(activeSection)) {
          return;
        }
        
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
      }, 50);
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      clearTimeout(keydownTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection, isMobile, isTablet, sectionAllowsScroll]);

  // Navegação por scroll otimizada - desabilitada no mobile/tablet
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const now = Date.now();
      
      if (now - lastScrollTime.current < 800) {
        return;
      }

      e.preventDefault();
      
      if (Math.abs(e.deltaY) < 30) return;

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
