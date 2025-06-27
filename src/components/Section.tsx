import React, { forwardRef } from 'react';
import { useTheme } from './ThemeProvider';
import { useIsMobile } from '../hooks/use-mobile';

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
    const isMobile = useIsMobile();
    
    console.log(`Section ${id} render:`, { isActive, isDark, allowScroll, isMobile });
    
    // A seção Hero sempre tem background preto, outras seguem o tema
    const getBackgroundClass = () => {
      if (id === 'home') {
        return 'bg-black text-white'; // Hero sempre preto
      }
      // Área do cliente: sempre seguir tema atual
      if (id === 'cliente') {
        return isDark ? 'bg-black text-white' : 'bg-white text-black';
      }
      return isDark ? 'bg-black text-white' : 'bg-white text-black';
    };
    
    // Para a seção de contato, sempre permitir scroll
    const shouldAllowScroll = id === 'contact' || allowScroll;
    
    return (
      <div 
        id={id} 
        ref={ref}
        data-section={id}
        data-active={isActive}
        data-allow-scroll={shouldAllowScroll ? "true" : "false"}
        className={`section-container w-full ${getBackgroundClass()} ${className}`}
        style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: id === 'contact' ? 'flex-start' : 'center',
          alignItems: 'center',
          minHeight: isMobile ? 'auto' : '100vh',
          maxHeight: isMobile ? 'none' : '100vh',
          height: isMobile ? 'auto' : '100vh',
          overflow: isMobile ? 'visible' : (shouldAllowScroll ? 'visible' : 'hidden'),
          WebkitOverflowScrolling: shouldAllowScroll ? 'touch' : 'auto',
          opacity: 1,
          visibility: 'visible',
          padding: isMobile ? '1rem' : '0.75rem',
          paddingBottom: isMobile ? '0' : '140px', // ZERO padding-bottom no mobile
          touchAction: shouldAllowScroll || (id === 'contact' && isMobile) ? 'auto' : 'pan-y',
          margin: 0
        }}
      >
        <div 
          className="w-full max-w-6xl mx-auto flex flex-col justify-center" 
          style={{ 
            opacity: 1, 
            visibility: 'visible',
            height: isMobile ? 'auto' : '100%',
            margin: 0,
            padding: 0
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
