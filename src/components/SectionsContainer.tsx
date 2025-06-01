
import React, { useState, useEffect } from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';
import Section from './Section';

// Import Sections
import Hero from './sections/Hero';
import About from './sections/About';
import PracticeAreas from './sections/PracticeAreas';
import Partners from './sections/Partners';
import ClientArea from './sections/ClientArea';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const SectionsContainer: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const sections = [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'socios', component: Partners }, 
    { id: 'cliente', component: ClientArea },
    { id: 'blog', component: Blog },
    { id: 'contact', component: Contact }
  ];
  
  const { transitionToSection, sectionsRef } = useSectionTransition(sections);
  
  // Load home section on first render and handle navigation
  useEffect(() => {
    // Force scroll to top on initial load if no hash
    const hash = window.location.hash.substring(1);
    console.log('Initial hash:', hash);
    
    if (!hash || hash === 'home') {
      window.scrollTo(0, 0);
      setActiveSection('home');
      
      // Make sure URL has #home hash
      if (history.pushState && hash !== 'home') {
        history.pushState(null, '', '#home');
      }
    } else {
      // Try to scroll to the section corresponding to the hash
      const sectionElement = document.getElementById(hash);
      console.log('Found section for hash:', hash, sectionElement);
      if (sectionElement) {
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        setActiveSection(hash);
      }
    }
  }, []);
  
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          const sectionId = entry.target.id;
          console.log('Section intersecting:', sectionId);
          setActiveSection(sectionId);
          
          // Update URL without reloading
          if (history.pushState && window.location.hash !== `#${sectionId}`) {
            history.pushState(null, '', `#${sectionId}`);
          }
        }
      });
    };
    
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3,
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    sectionsRef.current.forEach((section) => {
      if (section) {
        console.log('Observing section:', section.id);
        observer.observe(section);
      }
    });
    
    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [sectionsRef]);

  return (
    <div className="relative min-h-screen w-full">
      {sections.map((section, index) => {
        const Component = section.component;
        return (
          <Section 
            key={section.id} 
            id={section.id} 
            isActive={true}
            ref={el => {
              if (el) {
                sectionsRef.current[index] = el;
                console.log('Section ref set:', section.id, el);
              }
            }}
            className={section.id === 'contact' ? 'pb-0' : ''}
          >
            <Component />
            {section.id === 'contact' && <Footer />}
          </Section>
        );
      })}
    </div>
  );
};

export default SectionsContainer;
