
import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import CustomCursor from '../components/CustomCursor';
import Sidebar from '../components/Sidebar';
import WhatsAppButton from '../components/WhatsAppButton';
import SectionsContainer from '../components/SectionsContainer';
import Footer from '../components/sections/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  
  return (
    <div className="min-h-screen dark:bg-black bg-white dark:text-white">
      <CustomCursor />
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <WhatsAppButton />
      
      <SectionsContainer onActiveChange={handleSectionChange} />
      
      <Footer />
    </div>
  );
};

export default Index;
