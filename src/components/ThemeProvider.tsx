
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
  defaultTheme = 'dark',
  storageKey = 'theme' 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme as Theme;
      }
    }
    
    // Always default to dark theme
    return 'dark';
  });
  
  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme);
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = '#000000'; // Pure black background for dark mode
        document.documentElement.style.color = '#FFFFFF';
        document.body.style.backgroundColor = '#000000'; // Pure black background for dark mode
        document.body.style.color = '#FFFFFF';
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = '#FFFFFF'; // White background for light mode
        document.documentElement.style.color = '#000000';
        document.body.style.backgroundColor = '#FFFFFF'; // White background for light mode
        document.body.style.color = '#000000';
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
    }
  }, [theme, storageKey]);

  // Force dark theme on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set dark theme immediately
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#000000';
      document.documentElement.style.color = '#FFFFFF';
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#FFFFFF';
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      
      // Save dark as default
      localStorage.setItem(storageKey, 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

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
