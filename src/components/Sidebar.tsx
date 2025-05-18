
import React, { useState, useEffect } from 'react';
import { useSectionTransition } from '../hooks/useSectionTransition';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const sidebarItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'Sobre', href: '#about' },
    { id: 'areas', label: 'Áreas', href: '#areas' },
    { id: 'partners', label: 'Sócios', href: '#partners' },
    { id: 'client', label: 'Cliente', href: '#client' },
    { id: 'contact', label: 'Contato', href: '#contact' }
  ];

  // Track if user has scrolled down
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track scroll position to update menu visibility
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section transition navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onSectionChange(id);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      hasScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center space-x-8 md:space-x-12">
              {sidebarItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:scale-105 transform ${
                    activeSection === item.id 
                      ? 'text-black' 
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-black transform origin-left transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0'
                  }`}></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
