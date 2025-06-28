
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);
  const isMobile = useRef(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Check if device has touch or is mobile
    const checkDevice = () => {
      isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      isMobile.current = window.innerWidth < 768;
      
      if (isTouch.current || isMobile.current) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return true;
      }
      return false;
    };
    
    if (checkDevice()) return;
    
    // Throttle para melhor performance
    let rafId: number;
    let lastMoveTime = 0;
    
    const moveCursor = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 8) return; // ~120fps max
      lastMoveTime = now;
      
      const x = e.clientX;
      const y = e.clientY;
      
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        gsap.to(cursor, {
          x: x,
          y: y,
          duration: 0.1, // Reduzir duração para melhor performance
          ease: "power1.out"
        });
        
        gsap.to(cursorDot, {
          x: x,
          y: y,
          duration: 0.05,
          ease: "power1.out"
        });
      });
    };
    
    const enlargeCursor = () => {
      gsap.to(cursor, {
        scale: 2,
        opacity: 0.8,
        duration: 0.15, // Reduzir duração
        ease: "power1.out"
      });
    };
    
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.15, // Reduzir duração
        ease: "power1.out"
      });
    };
    
    const hideCursor = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.1
      });
    };
    
    const showCursor = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.1
      });
    };
    
    // Event listeners com throttle
    const throttledMouseMove = (e: MouseEvent) => {
      if (!isMobile.current) moveCursor(e);
    };
    
    document.addEventListener('mousemove', throttledMouseMove, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    
    // Add hover effects to interactive elements - com debounce
    let interactiveElements: NodeListOf<Element>;
    let debounceTimer: ReturnType<typeof setTimeout>;
    
    const updateInteractiveElements = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (interactiveElements) {
          interactiveElements.forEach(element => {
            element.removeEventListener('mouseenter', enlargeCursor);
            element.removeEventListener('mouseleave', shrinkCursor);
          });
        }
        
        interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], [onclick], .hover-effect, .cursor-pointer');
        
        interactiveElements.forEach(element => {
          element.addEventListener('mouseenter', enlargeCursor, { passive: true });
          element.addEventListener('mouseleave', shrinkCursor, { passive: true });
        });
      }, 100);
    };
    
    updateInteractiveElements();
    
    // Observer otimizado para elementos dinâmicos
    const observer = new MutationObserver((mutations) => {
      let hasChanges = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        updateInteractiveElements();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(debounceTimer);
      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      
      if (interactiveElements) {
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', enlargeCursor);
          element.removeEventListener('mouseleave', shrinkCursor);
        });
      }
      
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    // Set cursor style on body - otimizado
    const checkAndSetCursor = () => {
      if (!('ontouchstart' in window) && window.innerWidth >= 768) {
        document.body.style.cursor = 'none';
      } else {
        document.body.style.cursor = 'auto';
      }
    };
    
    checkAndSetCursor();
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="custom-cursor-dot"></div>
    </>
  );
};

export default CustomCursor;
