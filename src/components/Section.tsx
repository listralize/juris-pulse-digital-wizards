
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
    
    console.log(`Section ${id} render:`, { isActive, isDark, allowScroll });
    
    // A seção Hero sempre tem background preto, outras seguem o tema
    const getBackgroundClass = () => {
      if (id === 'home') {
        return 'bg-black text-white'; // Hero sempre preto
      }
      return isDark ? 'bg-black text-white' : 'bg-white text-black';
    };
    
    // Para a seção de contato, permitir altura dinâmica
    const isContactSection = id === 'contact';
    
    return (
      <div 
        id={id} 
        ref={ref}
        data-section={id}
        data-active={isActive}
        data-allow-scroll={allowScroll ? "true" : "false"}
        className={`section-container w-full ${isContactSection ? 'h-screen' : 'h-full'} ${getBackgroundClass()} ${className}`}
        style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: allowScroll || isContactSection ? 'hidden' : 'hidden',
          WebkitOverflowScrolling: 'auto',
          opacity: 1,
          visibility: 'visible'
        }}
      >
        <div className="w-full h-full" style={{ opacity: 1, visibility: 'visible' }}>
          {children}
        </div>
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
