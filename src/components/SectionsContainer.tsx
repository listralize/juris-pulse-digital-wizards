
import React, { useState, useEffect } from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';
import Section from './Section';

// Import Sections
import Hero from './sections/Hero';
import About from './sections/About';
import PracticeAreas from './sections/PracticeAreas';
import Partners from './sections/Partners';
import ClientArea from './sections/ClientArea';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const SectionsContainer: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const sections = [
    { id: 'home', component: Hero },
    { id: 'about', component: About },
    { id: 'areas', component: PracticeAreas },
    { id: 'partners', component: Partners }, 
    { id: 'client', component: ClientArea },
    { id: 'contact', component: Contact }
  ];
  
  const { transitionToSection, sectionsRef } = useSectionTransition(sections);
  
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          
          // Update URL without reloading
          if (history.pushState) {
            history.pushState(null, '', `#${sectionId}`);
          } else {
            window.location.hash = sectionId;
          }
        }
      });
    };
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
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
            isActive={true} // Make all sections visible
            ref={el => el && (sectionsRef.current[index] = el)}
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
