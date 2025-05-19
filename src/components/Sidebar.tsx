
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './navbar/ThemeToggle';
import { useTheme } from './ThemeProvider';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const sidebarItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'Sobre', href: '#about' },
    { id: 'areas', label: 'Áreas de Atuação', href: '#areas' },
    { id: 'socios', label: 'Sócios', href: '#socios' },
    { id: 'client', label: 'Cliente', href: '#client' },
    { id: 'contact', label: 'Contato', href: '#contact' }
  ];

  const navigate = useNavigate();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onSectionChange(id);
    
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      hasScrolled 
        ? (isDark 
            ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' 
            : 'bg-white/90 backdrop-blur-md border-b border-gray-100') 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center py-4">
          {/* Centered menu items */}
          <div className="flex items-center justify-center space-x-8 md:space-x-12">
            {sidebarItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:scale-105 transform cursor-pointer ${
                  activeSection === item.id 
                    ? (isDark ? 'text-white' : 'text-black')
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                  isDark ? 'bg-white' : 'bg-black'
                } transform origin-left transition-transform duration-300 ${
                  activeSection === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </a>
            ))}
          </div>
          
          {/* Theme toggle moved to the right side */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden flex items-center justify-center py-2">
          <select 
            className={`
              block appearance-none px-3 py-2 rounded border
              ${isDark ? 'bg-black text-white border-gray-800' : 'bg-white text-black border-gray-100'}
              focus:outline-none
            `}
            value={activeSection}
            onChange={(e) => {
              onSectionChange(e.target.value);
              const section = document.getElementById(e.target.value);
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {sidebarItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
