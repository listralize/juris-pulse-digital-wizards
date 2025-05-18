
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Toggle } from './ui/toggle';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDark = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Set active section based on path
    const path = location.pathname;
    if (path === '/') {
      setActiveSection('home');
    } else if (path.includes('sobre') || path === '/#about') {
      setActiveSection('about');
    } else if (path.includes('contato') || path === '/#contact') {
      setActiveSection('contact');
    } else if (['/familia', '/tributario', '/empresarial', '/trabalho', 
               '/constitucional', '/administrativo', '/previdenciario', 
               '/consumidor'].includes(path)) {
      setActiveSection('areas');
    } else if (path.includes('socios')) {
      setActiveSection('socios');
    } else if (path.includes('cliente')) {
      setActiveSection('cliente');
    }
  }, [location]);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle smooth scrolling for anchor links
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      // Navigate to home first with the hash
      window.location.href = `/${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Navigate to section on home page or specific page
  const handleNavigation = (sectionId: string, path: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = path;
    }
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
                className="h-20 object-contain transform transition-transform hover:scale-105"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeSection === 'home'
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
                  activeSection === 'areas'
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
            
            <a 
              href="/#about" 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('about', '/#about');
              }}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeSection === 'about'
                  ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                  : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
              }`}
            >
              Sobre
            </a>
            
            <Link
              to="/#socios"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('socios', '/#socios');
              }}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeSection === 'socios'
                  ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                  : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
              }`}
            >
              Sócios
            </Link>
            
            <Link
              to="/#cliente"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('cliente', '/#cliente');
              }}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeSection === 'cliente'
                  ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                  : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
              }`}
            >
              Cliente
            </Link>
            
            <a 
              href="/#contact" 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('contact', '/#contact');
              }}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeSection === 'contact'
                  ? (isDark ? 'border-white text-white' : 'border-black text-black') 
                  : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
              }`}
            >
              Contato
            </a>
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
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md ${isDark ? 'text-white' : 'text-black'}`}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
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
                        isActiveRoute(area.path) 
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
