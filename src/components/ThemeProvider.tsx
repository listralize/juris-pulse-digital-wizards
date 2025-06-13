
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
  
  // Initialize theme immediately with light as default
  useEffect(() => {
    console.log('🎨 ThemeProvider: Inicializando tema...');
    
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey);
      const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
      
      console.log('🎨 Tema salvo no localStorage:', savedTheme);
      console.log('🎨 Tema inicial definido:', initialTheme);
      
      setTheme(initialTheme);
      applyThemeToDOM(initialTheme);
      setIsInitialized(true);
    }
  }, [storageKey]);
  
  // Apply theme to DOM
  const applyThemeToDOM = (themeToApply: Theme) => {
    if (typeof window === 'undefined') return;
    
    const body = document.body;
    const html = document.documentElement;
    
    console.log('🎨 Aplicando tema ao DOM:', themeToApply);
    
    // Remove all theme classes first
    body.classList.remove('dark', 'light');
    html.classList.remove('dark', 'light');
    
    if (themeToApply === 'dark') {
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
  };

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

  // Don't show loading, just render with light theme as default
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
