
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
  defaultTheme = 'dark', // Mudou para dark como padrão
  storageKey = 'theme' 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  
  const applyTheme = (themeToApply: Theme) => {
    if (typeof window === 'undefined') return;
    
    console.log('🎨 ThemeProvider: Aplicando tema:', themeToApply);
    const root = document.documentElement;
    const body = document.body;
    
    // Remove classes anteriores
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Adiciona a nova classe
    root.classList.add(themeToApply);
    body.classList.add(themeToApply);
    
    // Define o color-scheme
    root.style.colorScheme = themeToApply;
    console.log('✅ ThemeProvider: Tema aplicado com sucesso');
  };

  useEffect(() => {
    const savedTheme = localStorage?.getItem(storageKey) as Theme;
    const themeToApply = savedTheme || defaultTheme;
    console.log('🎨 ThemeProvider: Inicializando tema:', { savedTheme, defaultTheme, themeToApply });
    applyTheme(themeToApply);
    setTheme(themeToApply);
  }, [defaultTheme, storageKey]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage?.setItem(storageKey, newTheme);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage?.setItem(storageKey, newTheme);
  };

  const contextValue: ThemeContextProps = {
    theme,
    toggleTheme,
    setTheme: handleSetTheme
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
