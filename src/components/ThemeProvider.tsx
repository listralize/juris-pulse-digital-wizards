
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
  
  // Apply theme to DOM immediately
  const applyThemeToDOM = (themeToApply: Theme) => {
    if (typeof window === 'undefined') return;
    
    const body = document.body;
    const html = document.documentElement;
    
    console.log('🎨 Aplicando tema ao DOM:', themeToApply);
    
    // Remove all theme classes first
    body.classList.remove('dark', 'light');
    html.classList.remove('dark', 'light');
    
    // Apply theme
    if (themeToApply === 'dark') {
      body.classList.add('dark');
      html.classList.add('dark');
    } else {
      body.classList.add('light');
      html.classList.add('light');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    console.log('🎨 ThemeProvider: Inicializando...');
    
    if (typeof window !== 'undefined') {
      // Get saved theme or use light as default
      const savedTheme = localStorage.getItem(storageKey);
      const initialTheme: Theme = savedTheme === 'dark' ? 'dark' : 'light';
      
      console.log('🎨 Tema inicial:', initialTheme);
      
      // Set theme state and apply to DOM
      setTheme(initialTheme);
      applyThemeToDOM(initialTheme);
    }
  }, [storageKey]);

  // Apply theme when theme changes
  useEffect(() => {
    console.log('🎨 Tema mudou para:', theme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme);
      applyThemeToDOM(theme);
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('🎨 Alternando tema de', theme, 'para', newTheme);
    setTheme(newTheme);
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
