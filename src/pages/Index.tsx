
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import CustomCursor from '../components/CustomCursor';
import Sidebar from '../components/Sidebar';
import WhatsAppButton from '../components/WhatsAppButton';
import SectionsContainer from '../components/SectionsContainer';
import { useTheme } from '../components/ThemeProvider';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <CustomCursor />
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <WhatsAppButton />
      
      <SectionsContainer onActiveChange={handleSectionChange} />
    </div>
  );
};

export default Index;
