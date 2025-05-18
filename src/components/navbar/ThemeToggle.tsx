
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useTheme } from '../ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Toggle 
      aria-label="Toggle theme"
      pressed={isDark}
      onPressedChange={toggleTheme}
      className={`rounded-full p-2 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Toggle>
  );
};

export default ThemeToggle;
