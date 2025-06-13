
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
    <div className={`h-screen w-full transition-colors duration-500 overflow-hidden ${
      isDark 
        ? 'bg-black text-white' 
        : 'bg-[#f5f5f5] text-black'
    }`}
         style={{ 
           scrollbarWidth: 'none', 
           msOverflowStyle: 'none' 
         }}>
         
      {/* Force specific background colors */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        body, html {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        body::-webkit-scrollbar,
        html::-webkit-scrollbar {
          display: none !important;
        }
        
        /* Force light theme colors */
        body.light, html.light {
          background-color: #f5f5f5 !important;
          color: #000000 !important;
        }
        
        /* Force dark theme colors when needed */
        body.dark, html.dark {
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
