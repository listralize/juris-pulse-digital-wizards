
import React, { forwardRef } from 'react';

interface SectionProps {
  id: string;
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, isActive, className = "", children }, ref) => {
    return (
      <div 
        id={id} 
        ref={ref}
        className={`absolute inset-0 min-h-screen w-full transition-opacity duration-500 ${className}`}
        style={{ 
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          zIndex: isActive ? 10 : 0
        }}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
