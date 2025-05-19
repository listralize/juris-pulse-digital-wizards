
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
    
    // If there's a hash in the URL, scroll to that section
    if (initialHash) {
      setTimeout(() => {
        const section = document.getElementById(initialHash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
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
    
    // Show both sections during transition
    gsap.set(targetSection, { display: 'block', opacity: 0 });
    
    // Animate current section out
    gsap.to(currentSection, { 
      y: -100 * direction, 
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(currentSection, { display: 'none' });
      }
    });
    
    // Animate target section in
    gsap.fromTo(
      targetSection,
      { 
        y: 100 * direction, 
        opacity: 0,
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

  return {
    activeSection,
    transitionToSection,
    sectionsRef
  };
};

export default useSectionTransition;
