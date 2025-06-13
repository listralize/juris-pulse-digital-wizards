
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
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize theme from localStorage or use default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey);
      const initialTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme as Theme : 'light';
      setTheme(initialTheme);
      setIsInitialized(true);
      console.log('Theme initialized:', initialTheme);
    }
  }, [storageKey]);
  
  // Apply theme to document when theme changes
  useEffect(() => {
    if (!isInitialized) return;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme);
      
      const body = document.body;
      const html = document.documentElement;
      
      // Remove all theme classes first
      body.classList.remove('dark', 'light');
      html.classList.remove('dark', 'light');
      
      console.log('Applying theme:', theme);
      
      if (theme === 'dark') {
        body.classList.add('dark');
        html.classList.add('dark');
        html.style.backgroundColor = '#000000';
        html.style.color = '#FFFFFF';
        body.style.backgroundColor = '#000000';
        body.style.color = '#FFFFFF';
      } else {
        body.classList.add('light');
        html.classList.add('light');
        html.style.backgroundColor = '#f5f5f5';
        html.style.color = '#000000';
        body.style.backgroundColor = '#f5f5f5';
        body.style.color = '#000000';
      }
    }
  }, [theme, storageKey, isInitialized]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setTheme(newTheme);
  };

  // Show loading with light background while initializing
  if (!isInitialized) {
    return (
      <div className="w-full h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-black">Carregando...</div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
