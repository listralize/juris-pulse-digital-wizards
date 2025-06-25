
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
    
    // Definir quais seções têm altura fixa (não permitem scroll)
    const isFixedHeightSection = ['home', 'about', 'areas', 'cliente', 'blog', 'partners'].includes(id);
    
    return (
      <div 
        id={id} 
        ref={ref}
        data-section={id}
        data-active={isActive}
        data-allow-scroll={allowScroll ? "true" : "false"}
        className={`section-container w-full h-full ${className}`}
        style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          maxHeight: isFixedHeightSection ? '100vh' : (allowScroll || id === 'contact') ? 'auto' : '100vh',
          height: isFixedHeightSection ? '100vh' : 'auto',
          overflow: isFixedHeightSection ? 'hidden' : (allowScroll || id === 'contact') ? 'auto' : 'hidden',
          WebkitOverflowScrolling: (allowScroll || id === 'contact') ? 'touch' : 'auto',
          opacity: 1,
          visibility: 'visible',
          padding: '0.75rem',
          paddingBottom: window.innerWidth < 768 ? '80px' : '140px',
          touchAction: (allowScroll || id === 'contact') ? 'auto' : 'pan-y',
          backgroundColor: 'transparent', // SEMPRE transparente para mostrar o neural
          color: isDark ? '#ffffff' : '#000000',
          zIndex: 1
        }}
      >
        <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center relative z-10" style={{ opacity: 1, visibility: 'visible' }}>
          {children}
        </div>
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
