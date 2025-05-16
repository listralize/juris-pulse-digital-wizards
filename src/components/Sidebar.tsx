
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'areas', label: 'Áreas', href: '#areas' },
    { id: 'partners', label: 'Sócios', href: '#partners' },
    { id: 'client', label: 'Cliente', href: '#client' },
    { id: 'contact', label: 'Contato', href: '#contact' }
  ];

  // Close menu when clicking a link on mobile
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Futuristic menu toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-black/20 backdrop-blur-lg rounded-full hover:bg-black/40 transition-all duration-500 border border-white/10 shadow-lg"
        aria-label="Toggle menu"
      >
        <div className="relative flex items-center justify-center">
          <span className={`absolute h-0.5 bg-white transition-all duration-500 ${isOpen ? 'w-6 rotate-45' : 'w-6 -translate-y-1.5'}`}></span>
          <span className={`absolute h-0.5 w-6 bg-white transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`absolute h-0.5 bg-white transition-all duration-500 ${isOpen ? 'w-6 -rotate-45' : 'w-6 translate-y-1.5'}`}></span>
        </div>
      </button>

      {/* Futuristic fullscreen menu overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-700 ${
          isOpen ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90 transition-opacity duration-700 ${
          isOpen ? 'opacity-90' : 'opacity-0'
        }`}></div>
        
        {/* Menu content */}
        <div className="h-full w-full flex flex-col items-center justify-center relative">
          {sidebarItems.map((item, index) => (
            <a 
              key={item.id}
              href={item.href}
              onClick={handleLinkClick}
              className={`relative my-5 text-3xl md:text-4xl lg:text-5xl font-light group transition-all duration-500 hover:scale-110 ${
                activeSection === item.id ? 'text-white' : 'text-gray-400'
              }`}
              style={{
                transitionDelay: `${isOpen ? index * 100 : 0}ms`,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <span className="flex items-center">
                <span className="relative overflow-hidden">
                  {item.label}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full ${
                    activeSection === item.id ? 'w-full' : ''
                  }`}></span>
                </span>
              </span>
            </a>
          ))}
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 opacity-20 blur-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
