
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Section {
  id: string;
  component: React.ComponentType;
}

export const useSectionTransition = (sections: Section[]) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Handle initial load
  useEffect(() => {
    // Set initial active section based on URL hash
    const initialHash = window.location.hash.substring(1);
    const validIds = sections.map(section => section.id);
    const initialSection = initialHash && validIds.includes(initialHash) ? initialHash : 'home';
    
    setActiveSection(initialSection);
  }, [sections]);
  
  // Function to transition to a section
  const transitionToSection = (id: string) => {
    if (isTransitioning || id === activeSection) return;
    
    const targetIndex = sections.findIndex(section => section.id === id);
    if (targetIndex === -1) return;
    
    setIsTransitioning(true);
    
    // Update URL without refreshing page
    window.history.pushState({}, "", `#${id}`);
    
    // Get the current visible section index
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    
    // Determine the direction of transition (up or down)
    const direction = targetIndex > currentIndex ? 1 : -1;
    
    // Get target section element
    const targetSection = sectionsRef.current[targetIndex];
    const currentSection = sectionsRef.current[currentIndex];
    
    if (!targetSection || !currentSection) {
      setIsTransitioning(false);
      return;
    }
    
    // Animate current section out
    gsap.to(currentSection, { 
      y: -100 * direction, 
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    });
    
    // Show and animate target section in
    gsap.fromTo(
      targetSection,
      { 
        y: 100 * direction, 
        opacity: 0,
        display: "block" 
      },
      { 
        y: 0, 
        opacity: 1,
        duration: 0.5,
        delay: 0.3, // Slight delay for better transition feel
        ease: "power2.out",
        onComplete: () => {
          setActiveSection(id);
          setIsTransitioning(false);
        }
      }
    );
  };

  // Setup navigation handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        if (nextIndex !== currentIndex) {
          transitionToSection(sections[nextIndex].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (prevIndex !== currentIndex) {
          transitionToSection(sections[prevIndex].id);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isTransitioning, sections]);
  
  // Handle mousewheel scrolling
  useEffect(() => {
    let isThrottled = false;
    const throttleDelay = 1000; // ms between scroll events
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default scrolling
      
      if (isThrottled || isTransitioning) return;
      
      // Set throttle flag
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, throttleDelay);
      
      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Find current and target section index
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
      
      // Only proceed if we're changing sections
      if (targetIndex !== currentIndex) {
        transitionToSection(sections[targetIndex].id);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, isTransitioning, sections]);
  
  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      
      touchEndY = e.changedTouches[0].clientY;
      const distance = touchStartY - touchEndY;
      
      if (Math.abs(distance) < minSwipeDistance) return;
      
      const direction = distance > 0 ? 1 : -1;
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
      
      if (targetIndex !== currentIndex) {
        transitionToSection(sections[targetIndex].id);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isTransitioning, sections]);

  return {
    activeSection,
    transitionToSection,
    sectionsRef
  };
};

export default useSectionTransition;
