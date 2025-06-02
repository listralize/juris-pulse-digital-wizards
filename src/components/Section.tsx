
import React, { forwardRef } from 'react';
import { useTheme } from './ThemeProvider';

interface SectionProps {
  id: string;
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, isActive, className = "", children }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    return (
      <div 
        id={id} 
        ref={ref}
        className={`section-container w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} ${className}`}
        style={{ 
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: isActive ? 10 : 1,
          transition: 'opacity 500ms ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden',
          padding: id === 'contact' ? '60px 0 20px 0' : '0'
        }}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
