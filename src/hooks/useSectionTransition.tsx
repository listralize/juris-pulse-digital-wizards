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

  console.log('useSectionTransition - Estado atual:', { 
    activeSection, 
    activeSectionIndex, 
    sectionsLength: sections.length,
    sectionIds: sections.map(s => s.id),
    isInitialized,
    isMobile,
    isTablet
  });

  // Detectar se é mobile/tablet
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
    // Removido 'areas' da lista para permitir navegação por teclado no desktop
    return ['contact', 'blog', 'socios'].includes(sectionId);
  };

  // Inicialização única
  useEffect(() => {
    if (hasInitialized.current) return;
    
    console.log('useSectionTransition - Inicializando ÚNICA VEZ...');
    
    const hash = location.hash.substring(1);
    let targetSection = 'home';
    let targetIndex = 0;
    
    if (hash && sections.find(s => s.id === hash)) {
      targetSection = hash;
      targetIndex = sections.findIndex(s => s.id === hash);
    }
    
    console.log('useSectionTransition - Estado inicial:', { targetSection, targetIndex });
    
    setActiveSection(targetSection);
    setActiveSectionIndex(targetIndex);
    
    // Posição inicial - NO MOBILE/TABLET, NÃO USAR TRANSFORMS
    if (containerRef.current) {
      if (isMobile || isTablet) {
        // No mobile/tablet, resetar qualquer transform e deixar fluir naturalmente
        gsap.set(containerRef.current, { 
          x: 0,
          y: 0,
          clearProps: "all",
          force3D: false
        });
      } else {
        // No desktop, usar scroll horizontal
        gsap.set(containerRef.current, { 
          x: `-${targetIndex * 100}vw`,
          y: 0,
          force3D: true
        });
      }
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
    console.log('useSectionTransition - Inicialização completa');
  }, [isMobile, isTablet]);

  const transitionToSection = useCallback((sectionId: string) => {
    console.log('transitionToSection chamado:', { 
      sectionId, 
      activeSection, 
      isTransitioning: isTransitioning.current,
      sections: sections.map(s => s.id),
      isMobile,
      isTablet
    });
    
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) {
      console.warn('Seção não encontrada:', sectionId);
      return;
    }

    if (activeSection === sectionId && activeSectionIndex === sectionIndex) {
      console.log('Já está na seção alvo:', sectionId);
      return;
    }
    
    if (isTransitioning.current) {
      console.log('Já em transição, ignorando...');
      return;
    }
    
    console.log('Iniciando transição para:', sectionId, 'Índice:', sectionIndex);
    isTransitioning.current = true;
    
    // Atualizar URL hash
    if (location.pathname === '/') {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    
    // Atualizar estado imediatamente
    setActiveSection(sectionId);
    setActiveSectionIndex(sectionIndex);
    
    // Notificar outros componentes sobre a mudança de seção
    window.dispatchEvent(new CustomEvent('activeSectionChanged', { detail: sectionId }));
    
    // Animar transição - NO MOBILE/TABLET, SEM ANIMAÇÃO DE TRANSFORM
    if (containerRef.current) {
      // Parar qualquer animação anterior
      gsap.killTweensOf(containerRef.current);
      
      if (isMobile || isTablet) {
        // Mobile/Tablet: scroll nativo para a seção
        const targetSection = sectionsRef.current[sectionIndex];
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        isTransitioning.current = false;
        console.log('Transição mobile/tablet por scroll nativo completada para:', sectionId);
      } else {
        // Desktop: transição horizontal
        const targetX = -sectionIndex * 100;
        console.log('Desktop - Animando para posição X:', targetX + 'vw');
        
        gsap.to(containerRef.current, {
          x: `${targetX}vw`,
          y: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          force3D: true,
          onComplete: () => {
            isTransitioning.current = false;
            console.log('Transição desktop completada para:', sectionId);
          },
          onInterrupt: () => {
            isTransitioning.current = false;
            console.log('Transição desktop interrompida para:', sectionId);
          }
        });
      }
    } else {
      isTransitioning.current = false;
    }
  }, [activeSection, activeSectionIndex, sections, location.pathname, isMobile, isTablet]);

  // Navegação por teclado - DESABILITADA NO MOBILE/TABLET
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
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
        console.log('Navegação por teclado para:', sections[newIndex].id);
        transitionToSection(sections[newIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection, isMobile, isTablet]);

  // Navegação por scroll - DESABILITADA NO MOBILE/TABLET
  useEffect(() => {
    if (!isInitialized || isMobile || isTablet) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const now = Date.now();
      
      // Throttle para evitar scroll muito rápido
      if (now - lastScrollTime.current < 600) {
        return;
      }

      // Desktop - sempre prevenir scroll vertical padrão
      e.preventDefault();
      
      if (Math.abs(e.deltaY) < 50) return;

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
        console.log('Navegação desktop por scroll para:', sections[newIndex].id, 'de', activeSection);
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
