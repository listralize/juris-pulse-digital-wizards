
import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import SectionsContainer from '../components/SectionsContainer';
import { useTheme } from '../components/ThemeProvider';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('home');
  
  const handleActiveChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      <SectionsContainer onActiveChange={handleActiveChange} />
    </div>
  );
};

export default Index;
