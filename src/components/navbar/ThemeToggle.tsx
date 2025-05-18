
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
      aria-label="Alternar tema"
      pressed={isDark}
      onPressedChange={toggleTheme}
      className={`rounded-full p-2 transition-all hover:scale-105 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'} ${className}`}
    >
      <span className="mr-2">{isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</span>
      {showLabel && <span>{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>}
      <span className="sr-only">{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
    </Toggle>
  );
};

export default ThemeToggle;
