
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Create triggers for each section to update the active section for nav highlighting
    const sections = ['home', 'about', 'areas', 'partners', 'client', 'contact'];
    
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    // Initialize custom cursor script
    const cursor = document.getElementById("cursor");
    const cursorDot = document.getElementById("cursor-dot");
    
    if (cursor && cursorDot) {
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
      document.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <Sidebar activeSection={activeSection} />
      <WhatsAppButton />
      
      <Hero />
      <About />
      <PracticeAreas />
      <Partners />
      <ClientArea />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
