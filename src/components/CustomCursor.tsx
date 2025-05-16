
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };
    
    const enlargeCursor = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3
      });
    };
    
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3
      });
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    document.querySelectorAll('a, button, input, textarea, .hover-effect').forEach(item => {
      item.addEventListener('mouseenter', enlargeCursor);
      item.addEventListener('mouseleave', shrinkCursor);
    });
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      
      document.querySelectorAll('a, button, input, textarea, .hover-effect').forEach(item => {
        item.removeEventListener('mouseenter', enlargeCursor);
        item.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, []);
  
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Fix for mobile devices
    const handleTouchStart = () => {
      document.body.style.cursor = 'auto';
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  
  return (
    <>
      <div ref={cursorRef} id="cursor" className="custom-cursor"></div>
      <div ref={cursorDotRef} id="cursor-dot" className="custom-cursor-dot"></div>
    </>
  );
};

export default CustomCursor;
