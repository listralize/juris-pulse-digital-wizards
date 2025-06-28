
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Desabilitar completamente no mobile/touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024; // Aumentar threshold
    
    if (isTouchDevice || isMobile) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Throttle agressivo para desktop
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
          duration: 0.08,
          ease: "power1.out"
        });
        
        gsap.to(cursorDot, {
          x: x,
          y: y,
          duration: 0.04,
          ease: "power1.out"
        });
      });
    };
    
    const enlargeCursor = () => {
      gsap.to(cursor, {
        scale: 2,
        opacity: 0.8,
        duration: 0.1,
        ease: "power1.out"
      });
    };
    
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.1,
        ease: "power1.out"
      });
    };
    
    const hideCursor = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.08
      });
    };
    
    const showCursor = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.08
      });
    };
    
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    
    // Elementos interativos simplificados
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], [onclick]');
    
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
    // Apenas desktop
    if (window.innerWidth >= 1024 && !('ontouchstart' in window)) {
      document.body.style.cursor = 'none';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  // Não renderizar nada no mobile
  if (typeof window !== 'undefined' && (window.innerWidth < 1024 || 'ontouchstart' in window)) {
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
