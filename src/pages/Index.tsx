
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
  
  // Apply theme class to body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    
    // Force reload theme colors on document
    document.documentElement.style.backgroundColor = isDark ? '#000000' : '#ffffff';
    document.documentElement.style.color = isDark ? '#FFFFFF' : '#000000';
    document.body.style.backgroundColor = isDark ? '#000000' : '#ffffff';
    document.body.style.color = isDark ? '#FFFFFF' : '#000000';
  }, [isDark]);
  
  // Scroll to home section when component mounts
  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash;
      if (!hash || hash === '#' || hash === '#home') {
        window.scrollTo(0, 0);
      } else if (hash) {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      <SectionsContainer />
    </div>
  );
};

export default Index;
