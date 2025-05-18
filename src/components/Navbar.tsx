
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Toggle } from './ui/toggle';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDark = theme === 'dark';

  const practiceAreas = [
    { id: 'familia', label: 'Família', path: '/familia' },
    { id: 'tributario', label: 'Tributário', path: '/tributario' },
    { id: 'empresarial', label: 'Empresarial', path: '/empresarial' },
    { id: 'trabalho', label: 'Trabalho', path: '/trabalho' },
    { id: 'constitucional', label: 'Constitucional', path: '/constitucional' },
    { id: 'administrativo', label: 'Administrativo', path: '/administrativo' },
    { id: 'previdenciario', label: 'Previdenciário', path: '/previdenciario' },
    { id: 'consumidor', label: 'Consumidor', path: '/consumidor' }
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`${isDark ? 'bg-black' : 'bg-white'} py-6 border-b ${isDark ? 'border-white/10' : 'border-black/10'} sticky top-0 z-50 w-full`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img 
                src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
                alt="Serafim & Trombela Advocacia Logo" 
                className="h-20 transform transition-transform hover:scale-105"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                isActiveRoute('/') 
                  ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                  : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
              }`}
            >
              Home
            </Link>
            
            <div className="relative group">
              <Link 
                to="#" 
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  location.pathname.includes('/') && !isActiveRoute('/') && !location.pathname.includes('contact') && !location.pathname.includes('about')
                    ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                    : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
                }`}
              >
                Áreas de Atuação
              </Link>
              <div className={`absolute left-0 mt-2 w-60 ${isDark ? 'bg-black/95 border-white/10' : 'bg-white border-black/10'} border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
                <div className="py-2">
                  {practiceAreas.map((area) => (
                    <Link 
                      key={area.id} 
                      to={area.path} 
                      className={`block px-4 py-2 ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'} transition-colors`}
                    >
                      {area.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link 
              to="/#about" 
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                location.pathname.includes('about') 
                  ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                  : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
              }`}
            >
              Sobre
            </Link>
            
            <Link 
              to="/#contact" 
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                location.pathname.includes('contact') 
                  ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                  : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
              }`}
            >
              Contato
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Toggle 
              aria-label="Toggle theme"
              pressed={isDark}
              onPressedChange={toggleTheme}
              className={`rounded-full p-2 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Toggle>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
