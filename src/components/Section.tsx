
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
    
    // Definir quais seções têm altura fixa (não permitem scroll)
    const isFixedHeightSection = ['home', 'about', 'areas', 'cliente', 'blog'].includes(id);
    
    // Para a seção de contato, sempre permitir scroll
    const shouldAllowScroll = id === 'contact' || allowScroll;
    
    // Detectar mobile
    const isMobile = window.innerWidth < 768;
    
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
          // Para contato no mobile: altura completamente automática
          minHeight: id === 'contact' && isMobile ? 'auto' : '100vh',
          maxHeight: isFixedHeightSection && id !== 'contact' ? '100vh' : 'none',
          height: id === 'contact' && isMobile ? 'auto' : (isMobile && isFixedHeightSection ? '100vh' : (isFixedHeightSection ? '100vh' : 'auto')),
          // Para contato no mobile: overflow sempre visível
          overflow: id === 'contact' && isMobile ? 'visible' : (shouldAllowScroll ? 'visible' : (isFixedHeightSection ? 'hidden' : 'auto')),
          WebkitOverflowScrolling: shouldAllowScroll ? 'touch' : 'auto',
          opacity: 1,
          visibility: 'visible',
          padding: '0.75rem',
          paddingBottom: isMobile && id !== 'contact' ? '80px' : (isMobile && id === 'contact' ? '0' : '140px'),
          touchAction: shouldAllowScroll || (id === 'contact' && isMobile) ? 'auto' : 'pan-y'
        }}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col justify-center" style={{ 
          opacity: 1, 
          visibility: 'visible',
          height: id === 'contact' && isMobile ? 'auto' : (isMobile && isFixedHeightSection ? '100%' : '100%')
        }}>
          {children}
        </div>
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
