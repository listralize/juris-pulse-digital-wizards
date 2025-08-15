
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import DesktopNavigation from './DesktopNavigation';
import CompactMobileNavbar from './CompactMobileNavbar';

const Navbar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('home');
  
  // Check if we're on home page and at the very top
  const isHomePage = location.pathname === '/';
  const [isAtTop, setIsAtTop] = useState(true);
  // Sempre mostrar logo no mobile
  const showLogoOnMobile = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set active section based on path and hash
    const path = location.pathname;
    const hash = location.hash.substring(1);
    
    console.log('Navbar: Current path:', path, 'Hash:', hash);
    
    if (path === '/') {
      // For home page, use hash to determine active section
      if (hash && ['home', 'about', 'areas', 'socios', 'cliente', 'blog', 'contact'].includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
    } else if (['/familia', '/tributario', '/empresarial', '/trabalho', 
               '/constitucional', '/administrativo', '/previdenciario', 
               '/consumidor', '/civil'].includes(path)) {
      setActiveSection('areas');
    } else if (path === '/blog') {
      setActiveSection('blog');
    } else {
      setActiveSection('');
    }
  }, [location]);

  // Listen for section changes from the transition hook
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      const section = event.detail;
      console.log('Navbar: Received section change event:', section);
      setActiveSection(section);
    };

    window.addEventListener('activeSectionChanged', handleSectionChange as EventListener);
    return () => window.removeEventListener('activeSectionChanged', handleSectionChange as EventListener);
  }, []);
  
  // Improved navigation handling
  const handleNavigation = (sectionId: string, path: string) => {
    console.log('Navbar: Handle navigation called:', sectionId, path);
    
    // Special handling for home navigation
    if (sectionId === 'home') {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
        setActiveSection('home');
      } else {
        // Force navigation to home section
        setActiveSection(sectionId);
        window.dispatchEvent(new CustomEvent('sectionChange', { detail: sectionId }));
      }
      return;
    }
    
    // For other sections, ensure we're on home page first
    if (location.pathname !== '/') {
      console.log('Navbar: Not on home page, navigating to home first');
      navigate('/', { replace: true });
      
      // Wait for navigation to complete, then change section
      setTimeout(() => {
        setActiveSection(sectionId);
        window.dispatchEvent(new CustomEvent('sectionChange', { detail: sectionId }));
      }, 150);
      return;
    }
    
    // If already on home page, change section directly
    console.log('Navbar: Changing section to:', sectionId);
    setActiveSection(sectionId);
    window.dispatchEvent(new CustomEvent('sectionChange', { detail: sectionId }));
  };

  return (
    <>
      {/* Mobile Navigation */}
      <CompactMobileNavbar showLogo={showLogoOnMobile} />

      {/* Desktop Navigation - Always fixed */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 ${isDark ? 'bg-black/60 text-white' : 'bg-[#f5f5f5]/60 text-black'} py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'} w-full transition-colors duration-300 backdrop-blur-md`} style={{ zIndex: 99999999 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center relative h-12">
            <div className="flex justify-center items-center w-full">
              <DesktopNavigation 
                activeSection={activeSection}
                handleNavigation={handleNavigation}
              />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer for fixed navbar on desktop */}
      <div className="hidden md:block h-[60px]"></div>
    </>
  );
};

export default Navbar;
