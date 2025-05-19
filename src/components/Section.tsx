
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
        className={`section-container w-full bg-black text-white ${className}`}
        style={{ 
          opacity: 1, 
          pointerEvents: 'auto', 
          position: 'relative', 
          transition: 'opacity 500ms ease, transform 500ms ease, background-color 500ms ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '80vh' // Reduced height
        }}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
