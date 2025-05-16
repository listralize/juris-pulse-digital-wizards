
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
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  const sections = [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'partners', component: Partners }, 
    { id: 'client', component: ClientArea },
    { id: 'contact', component: Contact }
  ];
  
  // Function to scroll to section
  const scrollToSection = (id: string) => {
    if (isScrolling) return;
    
    const sectionIndex = sections.findIndex(section => section.id === id);
    if (sectionIndex === -1) return;
    
    setIsScrolling(true);
    
    const targetSection = sectionsRef.current[sectionIndex];
    if (!targetSection) {
      setIsScrolling(false);
      return;
    }
    
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: targetSection,
        autoKill: false,
        offsetY: 0
      },
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          setIsScrolling(false);
          setActiveSection(id);
          
          // Update URL without refreshing page
          window.history.pushState({}, "", `#${id}`);
        }, 200); // Small delay to prevent rapid scrolling
      }
    });
  };
  
  // Handle initial load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && !isScrolling) {
        scrollToSection(hash);
      }
    };
    
    // Set initial active section based on URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
      setActiveSection(initialHash);
      setTimeout(() => {
        scrollToSection(initialHash);
      }, 500);
    }
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isScrolling]);
  
  // Set up scroll detection and section visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isScrolling) {
          const id = entry.target.id;
          setActiveSection(id);
          
          // Update URL without refreshing page
          if (window.location.hash !== `#${id}`) {
            window.history.replaceState({}, "", `#${id}`);
          }
        }
      });
    }, {
      threshold: 0.6 // More than half of the section must be visible
    });
    
    // Get all section elements
    const sectionElements = sectionsRef.current;
    sectionElements.forEach(section => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sectionElements.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isScrolling]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        scrollToSection(sections[nextIndex].id);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        scrollToSection(sections[prevIndex].id);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isScrolling]);
  
  // Handle mousewheel scrolling
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      // Clear any existing timeout
      clearTimeout(wheelTimeout);
      
      // Set a timeout to prevent rapid scrolling
      wheelTimeout = setTimeout(() => {
        const currentIndex = sections.findIndex(section => section.id === activeSection);
        const direction = e.deltaY > 0 ? 1 : -1;
        const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
        
        if (targetIndex !== currentIndex) {
          scrollToSection(sections[targetIndex].id);
        }
      }, 50);
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [activeSection, isScrolling]);
  
  return (
    <div className="min-h-screen bg-white">
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
            className="min-h-screen w-full snap-start"
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
