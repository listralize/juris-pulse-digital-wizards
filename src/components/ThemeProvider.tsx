
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
    body.classList.add(themeToApply);
    html.classList.add(themeToApply);
    
    // Force background colors immediately
    if (themeToApply === 'dark') {
      body.style.backgroundColor = '#000000';
      html.style.backgroundColor = '#000000';
      body.style.color = '#ffffff';
      html.style.color = '#ffffff';
    } else {
      body.style.backgroundColor = '#f5f5f5';
      html.style.backgroundColor = '#f5f5f5';
      body.style.color = '#000000';
      html.style.color = '#000000';
    }
  };

  // Initialize theme immediately
  useEffect(() => {
    console.log('🎨 ThemeProvider: Inicializando tema...');
    
    let initialTheme: Theme = 'light'; // Default to light
    
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        initialTheme = savedTheme;
      }
    }
    
    console.log('🎨 Tema inicial determinado:', initialTheme);
    
    // Apply theme immediately
    applyThemeToDOM(initialTheme);
    setTheme(initialTheme);
    setIsInitialized(true);
  }, [storageKey]);

  // Apply theme when theme changes
  useEffect(() => {
    if (!isInitialized) return;
    
    console.log('🎨 Tema mudou para:', theme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme);
      applyThemeToDOM(theme);
    }
  }, [theme, storageKey, isInitialized]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('🎨 Alternando tema de', theme, 'para', newTheme);
    setTheme(newTheme);
  };

  // Apply initial theme immediately on render
  if (typeof window !== 'undefined' && !isInitialized) {
    applyThemeToDOM('light');
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
