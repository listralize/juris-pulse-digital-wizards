
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Hero, 
  About, 
  PracticeAreas, 
  Team,
  ClientArea, 
  Contact, 
  Footer, 
  Blog, 
  Partners 
} from './sections';

gsap.registerPlugin(ScrollTrigger);

const SectionsContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    
    if (!container || !sections) return;

    // Get all section elements
    const sectionElements = sections.children;
    const numSections = sectionElements.length;

    if (numSections === 0) return;

    // Set up horizontal scrolling
    const totalWidth = numSections * 100;
    
    gsap.set(sections, {
      width: `${totalWidth}vw`,
      display: 'flex'
    });

    // Set each section to take full viewport
    gsap.set(sectionElements, {
      width: '100vw',
      height: '100vh',
      flexShrink: 0
    });

    // Create horizontal scroll animation
    const scrollAnimation = gsap.to(sections, {
      x: () => -(totalWidth - 100) + 'vw',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${(numSections - 1) * window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Handle wheel events for horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const scrollProgress = scrollAnimation.progress();
      const delta = e.deltaY * 0.001;
      const newProgress = Math.max(0, Math.min(1, scrollProgress + delta));
      
      scrollAnimation.progress(newProgress);
    };

    // Handle keyboard navigation
    const handleKeydown = (e: KeyboardEvent) => {
      const scrollProgress = scrollAnimation.progress();
      const step = 1 / (numSections - 1);
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newProgress = Math.min(1, scrollProgress + step);
        scrollAnimation.progress(newProgress);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const newProgress = Math.max(0, scrollProgress - step);
        scrollAnimation.progress(newProgress);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={sectionsRef} className="flex">
        <Hero />
        <About />
        <PracticeAreas />
        <Team />
        <ClientArea />
        <Blog />
        <Partners />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default SectionsContainer;
