
import React from 'react';

interface SectionProps {
  id: string;
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, isActive, className = "", children }) => {
  return (
    <div 
      id={id} 
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
};

export default Section;
