
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
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Set active section based on path and hash
    const path = location.pathname;
    const hash = location.hash.substring(1);
    
    if (path === '/') {
      // For home page, use hash to determine active section
      if (hash && ['home', 'about', 'areas', 'socios', 'cliente', 'contact'].includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
    } else if (['/familia', '/tributario', '/empresarial', '/trabalho', 
               '/constitucional', '/administrativo', '/previdenciario', 
               '/consumidor', '/civil'].includes(path)) {
      setActiveSection('areas');
    } else {
      setActiveSection('');
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle smooth scrolling for anchor links
  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId);
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      // Navigate to home first with the hash
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        console.log('Found section element:', section);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
      return;
    }
    
    const section = document.getElementById(sectionId);
    console.log('Direct scroll - Found section element:', section);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash
      if (history.pushState) {
        history.pushState(null, '', `#${sectionId}`);
      }
      setActiveSection(sectionId);
    }
  };
  
  // Navigate to section on home page or specific page
  const handleNavigation = (sectionId: string, path: string) => {
    console.log('Handle navigation called:', sectionId, path);
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => scrollToSection(sectionId), 200);
    }
  };

  return (
    <nav className={`${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} py-4 md:py-4 border-b ${isDark ? 'border-white' : 'border-gray-200'} sticky top-0 z-50 w-full transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center relative h-12 md:h-auto">
          {/* Theme toggle - on the left for mobile */}
          <div className="md:hidden absolute left-0 flex">
            <ThemeToggle />
          </div>
          
          {/* Desktop navigation in the center */}
          <div className="hidden md:flex justify-center items-center w-full">
            <DesktopNavigation 
              activeSection={activeSection}
              handleNavigation={handleNavigation}
            />
          </div>

          <div className="flex items-center absolute right-0">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${isDark ? "p-2 rounded-md text-white hover:bg-white/10" : "p-2 rounded-md text-black hover:bg-black/10"} transition-colors duration-200`}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6 transition-transform duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
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
