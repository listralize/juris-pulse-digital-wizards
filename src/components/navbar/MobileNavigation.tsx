import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden">
      <div className={`pt-4 pb-4 space-y-2 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} transition-colors duration-500 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <a 
          href="/"
          className={`block px-4 py-3 rounded-lg mx-2 ${activeSection === 'home'
            ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
            : ''} font-medium text-sm transition-colors duration-200`}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('home', '/');
            setIsMenuOpen(false);
          }}
        >
          Home
        </a>
        
        <div className="relative space-y-1">
          <p className="block px-4 py-3 font-medium text-sm mx-2">Áreas de Atuação</p>
          <div className="pl-4 space-y-1">
            {practiceAreas.map((area) => (
              <Link 
                key={area.id} 
                to={area.path} 
                className={`block px-4 py-2 rounded-lg mx-2 ${
                  window.location.pathname === area.path 
                  ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
                  : ''} font-medium text-sm transition-colors duration-200`}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(area.path);
                }}
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
            setIsMenuOpen(false);
          }}
          className="block px-4 py-3 rounded-lg mx-2 font-medium text-sm transition-colors duration-200"
        >
          Sobre Nós
        </a>
        
        <a
          href="/#socios"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('socios', '/#socios');
            setIsMenuOpen(false);
          }}
          className="block px-4 py-3 rounded-lg mx-2 font-medium text-sm transition-colors duration-200"
        >
          Nossa Equipe
        </a>
        
        <a
          href="/#cliente"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('cliente', '/#cliente');
            setIsMenuOpen(false);
          }}
          className="block px-4 py-3 rounded-lg mx-2 font-medium text-sm transition-colors duration-200"
        >
          Área do Cliente
        </a>
        
        <Link
          to="/blog"
          className={`block px-4 py-3 rounded-lg mx-2 ${
            window.location.pathname === '/blog'
            ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
            : ''} font-medium text-sm transition-colors duration-200`}
          onClick={() => {
            setIsMenuOpen(false);
            navigate('/blog');
          }}
        >
          Blog
        </Link>
        
        <a 
          href="/#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('contact', '/#contact');
            setIsMenuOpen(false);
          }}
          className="block px-4 py-3 rounded-lg mx-2 font-medium text-sm transition-colors duration-200"
        >
          Contato
        </a>
      </div>
    </div>
  );
};

export default MobileNavigation;
