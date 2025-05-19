
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
        className={`section-container w-full min-h-screen ${className}`}
        style={{ 
          opacity: 1, 
          pointerEvents: 'auto', 
          position: 'relative', 
          transition: 'opacity 500ms ease, transform 500ms ease'
        }}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
