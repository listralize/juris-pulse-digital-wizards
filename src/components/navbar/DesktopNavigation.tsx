
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import PracticeAreasDropdown from './PracticeAreasDropdown';

interface DesktopNavigationProps {
  activeSection: string;
  handleNavigation: (sectionId: string, path: string) => void;
}

const DesktopNavigation = ({ activeSection, handleNavigation }: DesktopNavigationProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex w-full justify-between items-center">
      <Link to="/" className="flex-shrink-0">
        <img 
          src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
          alt="Serafim & Trombela Advocacia Logo" 
          className="h-14 object-contain transform transition-transform hover:scale-105"
        />
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">
        <NavigationItem 
          to="/" 
          label="Home"
          isActive={activeSection === 'home'}
          onClick={() => navigate('/')}
        />
        
        <PracticeAreasDropdown 
          isActive={activeSection === 'areas'} 
        />
        
        <NavigationItem 
          to="/#about"
          label="Sobre"
          isActive={activeSection === 'about'}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('about', '/#about');
          }}
        />
        
        <NavigationItem 
          to="/#socios"
          label="Sócios"
          isActive={activeSection === 'socios'}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('socios', '/#socios');
          }}
        />
        
        <NavigationItem 
          to="/#cliente"
          label="Cliente"
          isActive={activeSection === 'cliente'}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('cliente', '/#cliente');
          }}
        />
        
        <NavigationItem 
          to="/#contact"
          label="Contato"
          isActive={activeSection === 'contact'}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('contact', '/#contact');
          }}
        />
      </div>
    </div>
  );
};

export default DesktopNavigation;
