
import React, { useState, useEffect } from 'react';

interface SidebarProps {
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
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

  // Handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.location.hash = id;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      hasScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex items-center justify-center w-full">
            <div className="hidden md:flex items-center justify-center w-full">
              <div className="flex items-baseline space-x-8">
                {sidebarItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`relative px-3 py-2 text-sm font-medium group transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'text-black' 
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-black transform origin-left transition-transform duration-300 ${
                      activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - always visible at top center */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex overflow-x-auto scrollbar-hide">
          {sidebarItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium ${
                activeSection === item.id 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
