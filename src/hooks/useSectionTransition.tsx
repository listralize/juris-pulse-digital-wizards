
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

  // Detectar se é mobile/tablet com throttle
  useEffect(() => {
    let resizeTimer: number;
    
    const checkDeviceType = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width < 640);
        setIsTablet(width >= 640 && width < 1024);
      }, 100); // Debounce resize events
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  // Função melhorada para verificar se o usuário rolou até o final da seção
  const isAtBottom = (element: HTMLElement) => {
    const threshold = 50;
    return element.scrollTop + element.clientHeight >= element.scrollHeight - threshold;
  };

  // Função melhorada para verificar se o usuário está no topo da seção
  const isAtTop = (element: HTMLElement) => {
    return element.scrollTop <= 50;
  };

  // Função para verificar se a seção permite scroll interno
  const sectionAllowsScroll = (sectionId: string) => {
    // No mobile, 'areas' também permite scroll para ver todos os cards
    if (window.innerWidth < 768 && sectionId === 'areas') {
      return true;
    }
    return ['areas', 'contact', 'blog', 'socios'].includes(sectionId);
  };

  // Inicialização única - otimizada
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
    
    // Posição inicial - otimizada para mobile
    if (containerRef.current) {
      // Usar requestAnimationFrame para melhor performance
      requestAnimationFrame(() => {
        if (isMobile || isTablet) {
          // No mobile/tablet, resetar qualquer transform
          gsap.set(containerRef.current, { 
            x: 0,
            y: 0,
            clearProps: "all",
            force3D: false
          });
        } else {
          // No desktop, usar scroll horizontal com otimização
          gsap.set(containerRef.current, { 
            x: `-${targetIndex * 100}vw`,
            y: 0,
            force3D: true,
            will-change: 'transform'
          });
        }
      });
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
  }, [isMobile, isTablet]);

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
    
    // Atualizar URL hash - otimizado
    if (location.pathname === '/') {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
    
    // Atualizar estado imediatamente
    setActiveSection(sectionId);
    setActiveSectionIndex(sectionIndex);
    
    // Animar transição - otimizada para mobile
    if (containerRef.current) {
      // Parar qualquer animação anterior
      gsap.killTweensOf(containerRef.current);
      
      if (isMobile || isTablet) {
        // Mobile/Tablet: scroll nativo otimizado
        const targetSection = sectionsRef.current[sectionIndex];
        if (targetSection) {
          // Usar requestAnimationFrame para melhor performance
          requestAnimationFrame(() => {
            targetSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          });
        }
        // Reduzir tempo de bloqueio para mobile
        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      } else {
        // Desktop: transição horizontal otimizada
        const targetX = -sectionIndex * 100;
        
        gsap.to(containerRef.current, {
          x: `${targetX}vw`,
          y: 0,
          duration: 0.6, // Reduzir duração para melhor performance
          ease: 'power2.inOut',
          force3D: true,
          will-change: 'transform',
          onComplete: () => {
            isTransitioning.current = false;
            // Limpar will-change após animação
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

  // Navegação por teclado - otimizada e desabilitada no mobile/tablet
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    let keydownTimer: number;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
      // Throttle keyboard events
      clearTimeout(keydownTimer);
      keydownTimer = setTimeout(() => {
        // Se estamos em uma seção que permite scroll, não interceptar teclas de navegação
        if (sectionAllowsScroll(activeSection)) {
          return;
        }
        
        let newIndex = activeSectionIndex;
        
        // Desktop: usar setas horizontais e verticais
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
      }, 50); // Throttle de 50ms
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      clearTimeout(keydownTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection, isMobile, isTablet]);

  // Navegação por scroll - muito otimizada e desabilitada no mobile/tablet
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const now = Date.now();
      
      // Throttle mais agressivo para melhor performance
      if (now - lastScrollTime.current < 800) {
        return;
      }

      // Desktop - sempre prevenir scroll vertical padrão
      e.preventDefault();
      
      if (Math.abs(e.deltaY) < 30) return; // Aumentar threshold

      lastScrollTime.current = now;
      
      let newIndex = activeSectionIndex;
      
      if (e.deltaY > 0) {
        // Scroll para baixo - próxima seção
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else {
        // Scroll para cima - seção anterior
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
