
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Não renderizar cursor no mobile/tablet - economia de recursos
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Performance otimizada apenas para desktop
    let rafId: number;
    let lastMoveTime = 0;
    
    const moveCursor = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 16) return; // 60fps max
      lastMoveTime = now;
      
      const x = e.clientX;
      const y = e.clientY;
      
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        gsap.to(cursor, {
          x: x,
          y: y,
          duration: 0.1,
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
        duration: 0.15,
        ease: "power1.out"
      });
    };
    
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.15,
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
    
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    
    // Elementos interativos - simplificado
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], [onclick], .hover-effect, .cursor-pointer');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', enlargeCursor, { passive: true });
      element.addEventListener('mouseleave', shrinkCursor, { passive: true });
    });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', enlargeCursor);
        element.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, []);
  
  useEffect(() => {
    // Cursor style apenas para desktop
    if (window.innerWidth >= 1024 && !('ontouchstart' in window)) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  // Não renderizar elementos no mobile
  if (window.innerWidth < 1024 || 'ontouchstart' in window) {
    return null;
  }
  
  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="custom-cursor-dot"></div>
    </>
  );
};

export default CustomCursor;
