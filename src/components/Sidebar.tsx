
import React, { useState } from 'react';
import { Home, Scale, Users, Lock, Mail } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [isHovering, setIsHovering] = useState('');

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'areas', label: 'Áreas', icon: Scale, href: '#areas' },
    { id: 'partners', label: 'Sócios', icon: Users, href: '#partners' },
    { id: 'client', label: 'Cliente', icon: Lock, href: '#client' },
    { id: 'contact', label: 'Contato', icon: Mail, href: '#contact' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 flex justify-center items-center z-40 bg-black/10 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {sidebarItems.map((item) => (
          <a 
            key={item.id}
            href={item.href}
            className={`sidebar-link group ${activeSection === item.id ? 'text-black' : ''}`}
            onMouseEnter={() => setIsHovering(item.id)}
            onMouseLeave={() => setIsHovering('')}
          >
            <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-black' : ''}`} />
            <span 
              className={`icon-label absolute left-16 text-sm font-medium whitespace-nowrap ${isHovering === item.id ? 'opacity-100' : ''} group-hover:opacity-100`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
