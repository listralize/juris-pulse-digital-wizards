
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useTheme } from '../ThemeProvider';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

const ThemeToggle = ({ showLabel = false, className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Toggle 
      aria-label={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
      pressed={isDark}
      onPressedChange={toggleTheme}
      className={`rounded-full p-2 transition-all hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDark 
          ? 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 focus:bg-white/20 focus:ring-white/30' 
          : 'bg-black/10 text-black hover:bg-black/20 focus:bg-black/20 focus:ring-black/30'
        } ${className}`}
      style={{ zIndex: 20 }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
    >
      {isDark 
        ? <Sun className="h-5 w-5" aria-hidden="true" /> 
        : <Moon className="h-5 w-5" aria-hidden="true" />
      }
      {showLabel && <span className="ml-2">{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>}
      <span className="sr-only">{isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}</span>
    </Toggle>
  );
};

export default ThemeToggle;
