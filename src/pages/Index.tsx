
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
  
  // Force initial theme application
  useEffect(() => {
    console.log('Index useEffect - forcing initial theme application');
    
    const body = document.body;
    const html = document.documentElement;
    
    // Force light theme initially
    body.style.backgroundColor = '#f5f5f5';
    html.style.backgroundColor = '#f5f5f5';
    body.style.color = '#000000';
    html.style.color = '#000000';
    body.classList.add('light');
    html.classList.add('light');
    body.classList.remove('dark');
    html.classList.remove('dark');
    
  }, []);
  
  // Setup horizontal scroll behavior and theme
  useEffect(() => {
    console.log('Index useEffect - setting up horizontal scroll and theme:', { theme, isDark });
    
    const body = document.body;
    const html = document.documentElement;
    
    // Disable scroll for horizontal navigation
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    body.style.height = '100vh';
    html.style.height = '100vh';
    
    // Force background colors based on theme
    if (isDark) {
      body.style.backgroundColor = '#000000';
      html.style.backgroundColor = '#000000';
      body.style.color = '#ffffff';
      html.style.color = '#ffffff';
      body.classList.add('dark');
      html.classList.add('dark');
      body.classList.remove('light');
      html.classList.remove('light');
    } else {
      body.style.backgroundColor = '#f5f5f5';
      html.style.backgroundColor = '#f5f5f5';
      body.style.color = '#000000';
      html.style.color = '#000000';
      body.classList.add('light');
      html.classList.add('light');
      body.classList.remove('dark');
      html.classList.remove('dark');
    }
    
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
  }, [isDark, theme]);
  
  return (
    <div 
      className={`h-screen w-full transition-colors duration-300 overflow-hidden ${
        isDark 
          ? 'bg-black text-white' 
          : 'bg-[#f5f5f5] text-black'
      }`}
      style={{ 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        backgroundColor: isDark ? '#000000' : '#f5f5f5',
        color: isDark ? '#ffffff' : '#000000'
      }}
    >
      {/* Global styles to force theme colors */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        body, html {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          background-color: ${isDark ? '#000000' : '#f5f5f5'} !important;
          color: ${isDark ? '#ffffff' : '#000000'} !important;
        }
        body::-webkit-scrollbar,
        html::-webkit-scrollbar {
          display: none !important;
        }
        /* Force light theme by default */
        body.light {
          background-color: #f5f5f5 !important;
          color: #000000 !important;
        }
        body.dark {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
      `}</style>
      
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      
      <SectionsContainer />
    </div>
  );
};

export default Index;
