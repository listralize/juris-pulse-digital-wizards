
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
        className={`section-container w-full ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} ${className}`}
        style={{ 
          opacity: 1, 
          pointerEvents: 'auto', 
          position: 'relative', 
          transition: 'opacity 500ms ease, transform 500ms ease, background-color 500ms ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: id === 'contact' ? '100vh' : '80vh', // Increased height for contact section
          paddingTop: id === 'contact' ? '80px' : '0' // Add padding to contact section
        }}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
