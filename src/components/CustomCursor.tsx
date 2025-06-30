
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Check if device has touch
    const checkTouch = () => {
      isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouch.current) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
      }
    };
    
    checkTouch();
    
    if (isTouch.current) return;
    
    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.15,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.05,
        ease: "power2.out"
      });
    };
    
    const enlargeCursor = () => {
      gsap.to(cursor, {
        scale: 2,
        opacity: 0.8,
        duration: 0.2,
        ease: "power2.out"
      });
    };
    
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
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
    
    // Event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], [onclick], .hover-effect, .cursor-pointer');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', enlargeCursor);
      element.addEventListener('mouseleave', shrinkCursor);
    });
    
    // Observer for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            
            // Check if the added element is interactive
            if (element.matches('a, button, input, textarea, select, [role="button"], [onclick], .hover-effect, .cursor-pointer')) {
              element.addEventListener('mouseenter', enlargeCursor);
              element.addEventListener('mouseleave', shrinkCursor);
            }
            
            // Check for interactive children
            const interactiveChildren = element.querySelectorAll('a, button, input, textarea, select, [role="button"], [onclick], .hover-effect, .cursor-pointer');
            interactiveChildren.forEach(child => {
              child.addEventListener('mouseenter', enlargeCursor);
              child.addEventListener('mouseleave', shrinkCursor);
            });
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', enlargeCursor);
        element.removeEventListener('mouseleave', shrinkCursor);
      });
      
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    // Set cursor style on body
    if (!isTouch.current) {
      document.body.style.cursor = 'none';
    }
    
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
