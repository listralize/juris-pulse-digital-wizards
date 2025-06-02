
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
      document.documentElement.style.backgroundColor = '#000000';
      document.documentElement.style.color = '#FFFFFF';
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#FFFFFF';
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f5f5f5';
      document.documentElement.style.color = '#000000';
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#000000';
    }
  }, [isDark]);
  
  // Disable default scroll and enable custom navigation
  useEffect(() => {
    // Disable scroll on body and html
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.height = 'auto';
    };
  }, []);
  
  return (
    <div className={`h-screen w-full ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} transition-colors duration-500 overflow-hidden`}>
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      <SectionsContainer />
    </div>
  );
};

export default Index;
