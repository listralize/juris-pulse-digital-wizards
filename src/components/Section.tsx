
import React, { forwardRef } from 'react';
import { useTheme } from './ThemeProvider';

interface SectionProps {
  id: string;
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
  allowScroll?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, isActive, className = "", children, allowScroll = false }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    // Special handling for scrollable sections - remove fixed positioning completely
    if (allowScroll && (id === 'socios' || id === 'contact')) {
      return (
        <div 
          id={id} 
          ref={ref}
          data-allow-scroll="true"
          className={`section-container w-full min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} ${className}`}
          style={{ 
            opacity: isActive ? 1 : 0,
            visibility: isActive ? 'visible' : 'hidden',
            pointerEvents: isActive ? 'auto' : 'none',
            position: isActive ? 'relative' : 'absolute',
            top: isActive ? 0 : '-100vh',
            left: 0,
            right: 0,
            zIndex: isActive ? 10 : 1,
            transition: 'opacity 600ms ease-in-out, visibility 600ms ease-in-out',
            display: 'block',
            height: 'auto',
            minHeight: '100vh'
          }}
        >
          {children}
        </div>
      );
    }
    
    return (
      <div 
        id={id} 
        ref={ref}
        data-allow-scroll={allowScroll ? "true" : "false"}
        className={`section-container w-full h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} ${className}`}
        style={{ 
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          pointerEvents: isActive ? 'auto' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: isActive ? 10 : 1,
          transition: 'opacity 600ms ease-in-out, visibility 600ms ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
