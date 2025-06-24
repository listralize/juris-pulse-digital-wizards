
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

  // Função melhorada para verificar se o usuário rolou até o final da seção
  const isAtBottom = (element: HTMLElement) => {
    const threshold = 50; // Aumentar tolerância
    return element.scrollTop + element.clientHeight >= element.scrollHeight - threshold;
  };

  // Função melhorada para verificar se o usuário está no topo da seção
  const isAtTop = (element: HTMLElement) => {
    return element.scrollTop <= 50; // Aumentar tolerância
  };

  // Função para verificar se a seção permite scroll interno
  const sectionAllowsScroll = (sectionId: string) => {
    return ['areas', 'contact', 'blog'].includes(sectionId);
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
        x: `-${targetIndex * 100}vw`,
        force3D: true
      });
    }
    
    hasInitialized.current = true;
    setIsInitialized(true);
    console.log('useSectionTransition - Inicialização completa');
  }, []); // Dependências vazias para rodar apenas uma vez

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
    
    // Animar transição
    if (containerRef.current) {
      const targetX = -sectionIndex * 100;
      
      console.log('Animando para posição:', targetX + 'vw');
      
      // Parar qualquer animação anterior
      gsap.killTweensOf(containerRef.current);
      
      gsap.to(containerRef.current, {
        x: `${targetX}vw`,
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
      
      // Se estamos em uma seção que permite scroll, não interceptar teclas de navegação
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
        console.log('Navegação por teclado para:', sections[newIndex].id);
        transitionToSection(sections[newIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, sections, transitionToSection, isInitialized, activeSection]);

  // Navegação por scroll melhorada
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const currentSection = sectionsRef.current[activeSectionIndex];
      if (!currentSection) return;

      // Se estamos na seção de áreas de atuação, permitir scroll completo
      if (activeSection === 'areas') {
        const scrollContainer = currentSection.querySelector('#areas') || currentSection;
        
        if (e.deltaY > 0) {
          // Rolando para baixo - verifica se já chegou ao final
          if (!isAtBottom(scrollContainer as HTMLElement)) {
            return; // Permite o scroll interno
          }
        } else {
          // Rolando para cima - verifica se está no topo
          if (!isAtTop(scrollContainer as HTMLElement)) {
            return; // Permite o scroll interno
          }
        }
      }

      // Se estamos na seção de contato
      if (activeSection === 'contact' && currentSection) {
        const contactElement = currentSection.querySelector('#contact') || currentSection;
        
        if (e.deltaY > 0) {
          // Rolando para baixo - verifica se já chegou ao final
          if (!isAtBottom(contactElement as HTMLElement)) {
            return; // Permite o scroll interno
          }
        } else {
          // Rolando para cima - verifica se está no topo
          if (!isAtTop(contactElement as HTMLElement)) {
            return; // Permite o scroll interno
          }
        }
      }

      // Se estamos na seção de blog
      if (activeSection === 'blog' && currentSection) {
        const blogElement = currentSection.querySelector('#blog') || currentSection;
        
        if (e.deltaY > 0) {
          if (!isAtBottom(blogElement as HTMLElement)) {
            return; // Permite o scroll interno
          }
        } else {
          if (!isAtTop(blogElement as HTMLElement)) {
            return; // Permite o scroll interno
          }
        }
      }
      
      const now = Date.now();
      
      // Throttle para evitar scroll muito rápido
      if (now - lastScrollTime.current < 800) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 50) return;

      e.preventDefault();
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
