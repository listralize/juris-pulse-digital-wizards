
import React from 'react';
import { Link } from 'react-router-dom';
import { Toggle } from '../ui/toggle';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { practiceAreas } from './practiceAreas';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  activeSection: string;
  handleNavigation: (sectionId: string, path: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileNavigation = ({ 
  isMenuOpen, 
  activeSection, 
  handleNavigation, 
  setIsMenuOpen 
}: MobileNavigationProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden">
      <div className={`pt-2 pb-4 space-y-1 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Link 
          to="/" 
          className={`block px-3 py-2 rounded-md ${activeSection === 'home'
            ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
            : ''} font-medium`}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        
        <div className="relative space-y-1">
          <p className="block px-3 py-2 font-medium">Áreas de Atuação</p>
          <div className="pl-6 space-y-1">
            {practiceAreas.map((area) => (
              <Link 
                key={area.id} 
                to={area.path} 
                className={`block px-3 py-2 rounded-md ${
                  window.location.pathname === area.path 
                  ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
                  : ''} font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {area.label}
              </Link>
            ))}
          </div>
        </div>
        
        <a 
          href="/#about"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('about', '/#about');
          }}
          className="block px-3 py-2 rounded-md font-medium"
        >
          Sobre
        </a>
        
        <Link
          to="/#socios"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('socios', '/#socios');
          }}
          className="block px-3 py-2 rounded-md font-medium"
        >
          Sócios
        </Link>
        
        <Link
          to="/#cliente"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('cliente', '/#cliente');
          }}
          className="block px-3 py-2 rounded-md font-medium"
        >
          Cliente
        </Link>
        
        <a 
          href="/#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('contact', '/#contact');
          }}
          className="block px-3 py-2 rounded-md font-medium"
        >
          Contato
        </a>
        
        <div className="px-3 py-2">
          <Toggle 
            aria-label="Toggle theme"
            pressed={isDark}
            onPressedChange={toggleTheme}
            className={`rounded-full p-2 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'} w-full justify-start`}
          >
            <span className="mr-2">{isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</span>
            <span>{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
          </Toggle>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
