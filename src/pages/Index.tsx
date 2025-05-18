
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import CustomCursor from '../components/CustomCursor';
import Sidebar from '../components/Sidebar';
import WhatsAppButton from '../components/WhatsAppButton';

// Import Sections
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import PracticeAreas from '../components/sections/PracticeAreas';
import Partners from '../components/sections/Partners';
import ClientArea from '../components/sections/ClientArea';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'partners', component: Partners }, 
    { id: 'client', component: ClientArea },
    { id: 'contact', component: Contact }
  ];
  
  // Function to transition to a section
  const transitionToSection = (id: string) => {
    if (isTransitioning) return;
    
    const sectionIndex = sections.findIndex(section => section.id === id);
    if (sectionIndex === -1) return;
    
    setIsTransitioning(true);
    
    const targetSection = sectionsRef.current[sectionIndex];
    if (!targetSection) {
      setIsTransitioning(false);
      return;
    }
    
    // Update URL without refreshing page
    window.history.pushState({}, "", `#${id}`);
    
    // Hide all sections except current and target
    sectionsRef.current.forEach((section, idx) => {
      if (section && idx !== sectionIndex) {
        section.style.display = 'none';
      }
    });
    
    // Show target section
    targetSection.style.display = 'block';
    
    // Animate transition
    gsap.fromTo(
      targetSection,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        onComplete: () => {
          setActiveSection(id);
          setIsTransitioning(false);
        }
      }
    );
  };
  
  // Handle initial load
  useEffect(() => {
    // Set initial active section based on URL hash
    const initialHash = window.location.hash.substring(1);
    const initialSection = initialHash || 'home';
    
    // Hide all sections except initial
    const initialIndex = sections.findIndex(section => section.id === initialSection);
    sectionsRef.current.forEach((section, idx) => {
      if (section) {
        section.style.display = idx === initialIndex ? 'block' : 'none';
      }
    });
    
    setActiveSection(initialSection);
  }, []);
  
  // Handle keyboard navigation
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
  }, [activeSection, isTransitioning]);
  
  // Handle mousewheel scrolling - Improved for page transition
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollCooldown = 800; // ms between scroll events
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default scrolling
      
      const currentTime = new Date().getTime();
      if (currentTime - lastScrollTime < scrollCooldown || isTransitioning) {
        return;
      }
      
      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Find current and target section index
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
      
      // Only proceed if we're changing sections
      if (targetIndex !== currentIndex) {
        lastScrollTime = currentTime;
        transitionToSection(sections[targetIndex].id);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, isTransitioning]);
  
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
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [activeSection, isTransitioning]);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <CustomCursor />
      <Sidebar activeSection={activeSection} onSectionChange={transitionToSection} />
      <WhatsAppButton />
      
      {sections.map((section, index) => {
        const Component = section.component;
        return (
          <div 
            key={section.id} 
            id={section.id} 
            ref={el => el && (sectionsRef.current[index] = el)}
            className="min-h-screen w-full page-transition"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Component />
          </div>
        );
      })}
      
      <Footer />
    </div>
  );
};

export default Index;
