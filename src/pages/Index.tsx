
import React, { useEffect } from 'react';
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
  
  // Scroll to home section when component mounts
  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash;
      if (!hash || hash === '#' || hash === '#home') {
        window.scrollTo(0, 0);
      }
    }, 100);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-neutral-200' : 'bg-white text-black'} transition-colors duration-300`}>
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      <SectionsContainer />
    </div>
  );
};

export default Index;
