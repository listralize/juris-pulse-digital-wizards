
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
          opacity: 1, 
          pointerEvents: 'auto', 
          position: 'relative', 
          transition: 'opacity 500ms ease, transform 500ms ease, background-color 500ms ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: id === 'contact' ? '90vh' : '80vh', // Reduced contact section height slightly
          paddingTop: id === 'contact' ? '100px' : '0' // Increased padding for contact section
        }}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
