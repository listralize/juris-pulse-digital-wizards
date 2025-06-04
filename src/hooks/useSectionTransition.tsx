
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

  console.log('useSectionTransition - Estado atual:', { 
    activeSection, 
    activeSectionIndex, 
    sectionsLength: sections.length,
    sectionIds: sections.map(s => s.id),
    isInitialized
  });

  // Função para verificar se o usuário rolou até o final da seção
  const isAtBottom = (element: HTMLElement) => {
    return element.scrollTop + element.clientHeight >= element.scrollHeight - 10;
  };

  // Função para verificar se o usuário está no topo da seção
  const isAtTop = (element: HTMLElement) => {
    return element.scrollTop <= 10;
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
    
    // Posição inicial sem animação
    if (containerRef.current) {
      gsap.set(containerRef.current, { 
        y: `-${targetIndex * 100}vh`,
        force3D: true
      });
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
    console.log('useSectionTransition - Inicialização completa');
  }, []);

  const transitionToSection = useCallback((sectionId: string) => {
    console.log('transitionToSection chamado:', { 
      sectionId, 
      activeSection, 
      isTransitioning: isTransitioning.current,
      sections: sections.map(s => s.id)
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
    
    // Animar transição vertical
    if (containerRef.current) {
      const targetY = -sectionIndex * 100;
      
      console.log('Animando para posição:', targetY + 'vh');
      
      // Parar qualquer animação anterior
      gsap.killTweensOf(containerRef.current);
      
      gsap.to(containerRef.current, {
        y: `${targetY}vh`,
        duration: 0.8,
        ease: 'power2.inOut',
        force3D: true,
        onComplete: () => {
          isTransitioning.current = false;
          console.log('Transição completada para:', sectionId);
        },
        onInterrupt: () => {
          isTransitioning.current = false;
          console.log('Transição interrompida para:', sectionId);
        }
      });
    } else {
      isTransitioning.current = false;
    }
  }, [activeSection, activeSectionIndex, sections, location.pathname]);

  // Navegação por teclado
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      
      let newIndex = activeSectionIndex;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp') {
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
  }, [activeSectionIndex, sections, transitionToSection, isInitialized]);

  // Navegação por scroll melhorada
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const isMobile = window.innerWidth <= 768;
      const currentSection = sectionsRef.current[activeSectionIndex];
      
      // Verificar se estamos em uma seção que permite scroll interno
      if (currentSection) {
        const scrollableElements = currentSection.querySelectorAll('[data-radix-scroll-area-viewport], .overflow-y-auto, #contact');
        
        for (const element of scrollableElements) {
          const htmlElement = element as HTMLElement;
          
          if (e.deltaY > 0) {
            // Rolando para baixo
            if (!isAtBottom(htmlElement)) {
              return; // Permite scroll interno
            }
          } else {
            // Rolando para cima
            if (!isAtTop(htmlElement)) {
              return; // Permite scroll interno
            }
          }
        }
      }
      
      const now = Date.now();
      
      // Throttle mais rigoroso
      if (now - lastScrollTime.current < 800) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 50) return;

      e.preventDefault();
      lastScrollTime.current = now;
      
      let newIndex = activeSectionIndex;
      
      if (e.deltaY > 0) {
        newIndex = Math.min(activeSectionIndex + 1, sections.length - 1);
      } else {
        newIndex = Math.max(activeSectionIndex - 1, 0);
      }
      
      if (newIndex !== activeSectionIndex && sections[newIndex]) {
        console.log('Navegação por scroll para:', sections[newIndex].id, 'de', activeSection);
        transitionToSection(sections[newIndex].id);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection]);

  return {
    activeSection,
    activeSectionIndex,
    transitionToSection,
    sectionsRef,
    containerRef,
    isInitialized
  };
};
