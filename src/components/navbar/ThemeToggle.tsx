
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useTheme } from '../ThemeProvider';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

const ThemeToggle = ({ showLabel = false, className = '' }: ThemeToggleProps) => {
  // Add error boundary protection
  let theme = 'light';
  let toggleTheme = () => {};
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    console.warn('ThemeToggle: useTheme hook failed, using defaults:', error);
  }
  
  const isDark = theme === 'dark';

  console.log('ThemeToggle render:', { theme, isDark });

  return (
    <Toggle 
      aria-label="Alternar tema"
      pressed={isDark}
      onPressedChange={() => {
        console.log('Theme toggle clicked, current theme:', theme);
        toggleTheme();
      }}
      className={`rounded-full p-2 transition-all hover:scale-105 
        ${isDark 
          ? 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20' 
          : 'bg-black/10 text-black hover:bg-black/20'
        } ${className}`}
      style={{ zIndex: 20 }}
    >
      {isDark 
        ? <Sun className="h-5 w-5" /> 
        : <Moon className="h-5 w-5" />
      }
      {showLabel && <span className="ml-2">{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>}
      <span className="sr-only">{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
    </Toggle>
  );
};

export default ThemeToggle;
