
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
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Don't render children until theme is initialized
  if (!isInitialized) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
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
