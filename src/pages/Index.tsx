
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
  
  console.log('Index page render:', { theme, isDark });
  
  // Apply theme class to body
  useEffect(() => {
    console.log('Index useEffect - applying theme:', { isDark });
    
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
      document.documentElement.style.backgroundColor = '#FFFFFF';
      document.documentElement.style.color = '#000000';
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#000000';
    }
  }, [isDark]);
  
  // Disable default scroll and enable horizontal navigation
  useEffect(() => {
    console.log('Index useEffect - setting up horizontal scroll behavior');
    
    // Disable scroll on body and html for horizontal navigation
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
      
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);
  
  return (
    <div className={`h-screen w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500 overflow-hidden`}>
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      <SectionsContainer />
    </div>
  );
};

export default Index;
