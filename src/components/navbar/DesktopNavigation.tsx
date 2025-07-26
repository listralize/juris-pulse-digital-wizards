
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import PracticeAreasDropdown from './PracticeAreasDropdown';
import ThemeToggle from './ThemeToggle';

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
    <div className="flex w-full justify-center items-center">
      <div className="flex items-center space-x-6">
        <NavigationItem 
          to="/" 
          label="Home" 
          isActive={activeSection === 'home'} 
          onClick={e => {
            e.preventDefault();
            console.log('DesktopNavigation: Home clicked');
            handleNavigation('home', '/');
          }} 
        />
        
        <NavigationItem 
          to="/#about" 
          label="Sobre Nós" 
          isActive={activeSection === 'about'} 
          onClick={e => {
            e.preventDefault();
            console.log('DesktopNavigation: About clicked');
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
            console.log('DesktopNavigation: Team clicked');
            handleNavigation('socios', '/#socios');
          }} 
        />
        
        <NavigationItem 
          to="/blog" 
          label="Blog" 
          isActive={activeSection === 'blog'} 
          onClick={e => {
            e.preventDefault();
            console.log('DesktopNavigation: Blog clicked');
            navigate('/blog');
          }} 
        />
        
        <NavigationItem 
          to="/#cliente" 
          label="Área do Cliente" 
          isActive={activeSection === 'cliente'} 
          onClick={e => {
            e.preventDefault();
            console.log('DesktopNavigation: Client Area clicked');
            handleNavigation('cliente', '/#cliente');
          }} 
        />
        
        <NavigationItem 
          to="/#contact" 
          label="Contato" 
          isActive={activeSection === 'contact'} 
          onClick={e => {
            e.preventDefault();
            console.log('DesktopNavigation: Contact clicked');
            handleNavigation('contact', '/#contact');
          }} 
        />
        
        <div className="ml-4 pl-4 border-l border-white/20">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default DesktopNavigation;
