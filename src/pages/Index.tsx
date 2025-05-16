
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
  const [canScroll, setCanScroll] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  const sections = [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'partners', component: Partners }, 
    { id: 'client', component: ClientArea },
    { id: 'contact', component: Contact }
  ];
  
  useEffect(() => {
    const container = containerRef.current;
    const sectionElements = sectionsRef.current;
    
    if (!container) return;
    
    // Set up each section to be full height
    sectionElements.forEach(section => {
      section.style.height = '100vh';
      section.style.width = '100%';
      section.style.overflowY = 'hidden';
    });
    
    // Function to scroll to a specific section
    const scrollToSection = (index: number) => {
      if (!canScroll) return;
      
      setCanScroll(false);
      
      const targetSection = sectionElements[index];
      if (!targetSection) return;
      
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetSection,
          autoKill: false
        },
        ease: "power3.inOut",
        onComplete: () => {
          setCanScroll(true);
          setActiveSection(sections[index].id);
        }
      });
    };
    
    // Handle wheel events for custom scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (!canScroll) return;
      
      const currentIndex = sectionElements.findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentIndex === -1) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sectionElements.length - 1);
      
      if (targetIndex !== currentIndex) {
        scrollToSection(targetIndex);
      }
    };
    
    // Handle anchor links
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const index = sections.findIndex(section => section.id === hash);
      
      if (index !== -1) {
        scrollToSection(index);
      }
    };
    
    // Handle initial hash and URL changes
    setTimeout(handleHashChange, 500);
    window.addEventListener('hashchange', handleHashChange);
    
    // Set up wheel event for custom scrolling
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        scrollToSection(nextIndex);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const prevIndex = Math.max(currentIndex - 1, 0);
        scrollToSection(prevIndex);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [activeSection, canScroll]);
  
  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <CustomCursor />
      <Sidebar activeSection={activeSection} />
      <WhatsAppButton />
      
      {sections.map((section, index) => {
        const Component = section.component;
        return (
          <div 
            key={section.id} 
            id={section.id} 
            ref={el => el && (sectionsRef.current[index] = el)}
            className="section-container"
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
