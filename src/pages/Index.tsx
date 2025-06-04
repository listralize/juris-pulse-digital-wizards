
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
  
  // Apply theme to body
  useEffect(() => {
    console.log('Index useEffect - applying theme:', { isDark });
    
    const body = document.body;
    const html = document.documentElement;
    
    if (isDark) {
      body.classList.add('dark');
      body.classList.remove('light');
      html.style.backgroundColor = '#000000';
      html.style.color = '#FFFFFF';
      body.style.backgroundColor = '#000000';
      body.style.color = '#FFFFFF';
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
      html.style.backgroundColor = '#f5f5f5';
      html.style.color = '#000000';
      body.style.backgroundColor = '#f5f5f5';
      body.style.color = '#000000';
    }
  }, [isDark]);
  
  // Setup horizontal scroll behavior
  useEffect(() => {
    console.log('Index useEffect - setting up horizontal scroll behavior');
    
    const body = document.body;
    const html = document.documentElement;
    
    // Disable scroll for horizontal navigation
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    body.style.height = '100vh';
    html.style.height = '100vh';
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    return () => {
      body.style.overflow = '';
      html.style.overflow = '';
      body.style.height = '';
      html.style.height = '';
      
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
