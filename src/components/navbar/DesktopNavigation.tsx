
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import PracticeAreasDropdown from './PracticeAreasDropdown';


interface DesktopNavigationProps {
  activeSection: string;
  handleNavigation: (sectionId: string, path: string) => void;
}

const DesktopNavigation = ({
  activeSection,
  handleNavigation
}: DesktopNavigationProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex w-full justify-center items-center" role="navigation" aria-label="Menu principal">
      <div className="flex items-center space-x-6" role="menubar">
        <NavigationItem 
          to="/" 
          label="Home" 
          isActive={activeSection === 'home'} 
          onClick={e => {
            e.preventDefault();
            handleNavigation('home', '/');
          }}
        />
        
        <NavigationItem 
          to="/#about" 
          label="Sobre Nós" 
          isActive={activeSection === 'about'} 
          onClick={e => {
            e.preventDefault();
            handleNavigation('about', '/#about');
          }}
        />
        
        <PracticeAreasDropdown isActive={activeSection === 'areas'} />
        
        <NavigationItem 
          to="/#socios" 
          label="Nossa Equipe" 
          isActive={activeSection === 'socios'} 
          onClick={e => {
            e.preventDefault();
            handleNavigation('socios', '/#socios');
          }}
        />
        
        <NavigationItem 
          to="/#cliente" 
          label="Área do Cliente" 
          isActive={activeSection === 'cliente'} 
          onClick={e => {
            e.preventDefault();
            handleNavigation('cliente', '/#cliente');
          }}
        />
        
        <NavigationItem 
          to="/#blog" 
          label="Blog" 
          isActive={activeSection === 'blog'} 
          onClick={e => {
            e.preventDefault();
            handleNavigation('blog', '/#blog');
          }}
        />
        
        <NavigationItem 
          to="/#contact" 
          label="Contato" 
          isActive={activeSection === 'contact'} 
          onClick={e => {
            e.preventDefault();
            handleNavigation('contact', '/#contact');
          }}
        />
        
      </div>
    </nav>
  );
};

export default DesktopNavigation;
