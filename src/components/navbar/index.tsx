
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle smooth scrolling for anchor links
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      // Navigate to home first with the hash
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  return (
    <nav className={`${isDark ? 'bg-black' : 'bg-[#f5f5f5]'} py-4 md:py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} sticky top-0 z-50 w-full`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center relative h-12 md:h-auto">
          {/* Theme toggle on the left for both mobile and desktop */}
          <div className="absolute left-0 flex">
            <ThemeToggle />
          </div>

          {/* Centered logo */}
          <div className="text-center">
            <Link to="/" className="font-canela text-xl flex items-center justify-center">
              {/* Desktop: Text logo */}
              <span className="hidden md:block">{isDark ? 'S&T Advocacia' : 'S&T Advocacia'}</span>
              
              {/* Mobile: Logo image */}
              <span className="md:hidden flex items-center justify-center">
                S&T
              </span>
            </Link>
          </div>
          
          <DesktopNavigation 
            activeSection={activeSection}
            handleNavigation={handleNavigation}
          />

          <div className="flex items-center space-x-4 absolute right-0">
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
        
        <MobileNavigation 
          isMenuOpen={isMenuOpen}
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
