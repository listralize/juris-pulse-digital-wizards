
import React, { useState, useEffect } from 'react';
import { Home, Scale, Users, Lock, Mail } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'areas', label: 'Áreas', icon: Scale, href: '#areas' },
    { id: 'partners', label: 'Sócios', icon: Users, href: '#partners' },
    { id: 'client', label: 'Cliente', icon: Lock, href: '#client' },
    { id: 'contact', label: 'Contato', icon: Mail, href: '#contact' }
  ];

  // Close menu when clicking a link on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
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
      {/* Menu toggle button - visible on all screen sizes */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-black/10 backdrop-blur-md rounded-full hover:bg-black/20 transition-all duration-300"
      >
        <div className="relative w-6 h-6">
          <span className={`absolute h-0.5 bg-black transition-all duration-300 ${isOpen ? 'w-6 top-3 rotate-45' : 'w-6 top-1.5'}`}></span>
          <span className={`absolute h-0.5 w-6 bg-black top-3 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`absolute h-0.5 bg-black transition-all duration-300 ${isOpen ? 'w-6 top-3 -rotate-45' : 'w-6 top-4.5'}`}></span>
        </div>
      </button>

      {/* Menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full w-full flex flex-col items-center justify-center">
          {sidebarItems.map((item, index) => (
            <a 
              key={item.id}
              href={item.href}
              onClick={handleLinkClick}
              className={`relative my-4 text-2xl md:text-3xl font-light group transition-all duration-300 ${
                activeSection === item.id ? 'text-white' : 'text-gray-400'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              <div className="flex items-center">
                <item.icon className={`mr-3 w-6 h-6 ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.label}</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full ${
                  activeSection === item.id ? 'w-full' : ''
                }`}></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
