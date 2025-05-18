
import React from 'react';
import { Link } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import PracticeAreasDropdown from './PracticeAreasDropdown';

interface DesktopNavigationProps {
  activeSection: string;
  handleNavigation: (sectionId: string, path: string) => void;
}

const DesktopNavigation = ({ activeSection, handleNavigation }: DesktopNavigationProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavigationItem 
        to="/" 
        label="Home"
        isActive={activeSection === 'home'}
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
  );
};

export default DesktopNavigation;
