
import React, { forwardRef } from 'react';
import { useTheme } from './ThemeProvider';
import { useIsMobile, useIsTablet } from '../hooks/use-mobile';

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
    const isTablet = useIsTablet();
    const isTouch = isMobile || isTablet;
    
    const getBackgroundClass = () => {
      if (id === 'home') return 'bg-black text-white';
      return isDark ? 'bg-black text-white' : 'bg-white text-black';
    };
    
    const shouldAllowScroll = id === 'contact' || allowScroll;
    
    return (
      <div 
        id={id} 
        ref={ref}
        role="region"
        aria-label={id}
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
          minHeight: isTouch ? 'auto' : '100vh',
          maxHeight: isTouch ? 'none' : '100vh',
          height: isTouch ? 'auto' : '100vh',
          overflow: isTouch ? 'visible' : (shouldAllowScroll ? 'visible' : 'hidden'),
          WebkitOverflowScrolling: shouldAllowScroll ? 'touch' : 'auto',
          opacity: 1,
          visibility: 'visible',
          padding: isTouch ? (isTablet ? '1.5rem' : '1rem') : '0.75rem',
          paddingBottom: isTouch ? '0' : '140px',
          touchAction: shouldAllowScroll || (id === 'contact' && isTouch) ? 'auto' : 'pan-y',
          margin: 0
        }}
      >
        <div 
          className="w-full max-w-6xl mx-auto flex flex-col justify-center" 
          style={{ 
            opacity: 1, 
            visibility: 'visible',
            height: isTouch ? 'auto' : '100%',
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