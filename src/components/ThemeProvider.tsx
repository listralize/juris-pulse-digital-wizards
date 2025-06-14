
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light',
  storageKey = 'theme' 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    }
    return defaultTheme;
  });
  
  // Apply theme to DOM
  const applyTheme = (themeToApply: Theme) => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    const body = document.body;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(themeToApply);
    body.classList.add(themeToApply);
    
    // Set explicit styles
    if (themeToApply === 'dark') {
      root.style.colorScheme = 'dark';
      body.style.backgroundColor = '#000000';
      body.style.color = '#ffffff';
    } else {
      root.style.colorScheme = 'light';
      body.style.backgroundColor = '#f5f5f5';
      body.style.color = '#000000';
    }
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme);
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const contextValue: ThemeContextProps = {
    theme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
