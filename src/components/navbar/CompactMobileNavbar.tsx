
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Phone, MapPin, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { practiceAreas } from './practiceAreas';

interface CompactMobileNavbarProps {
  showLogo?: boolean;
}

const CompactMobileNavbar = ({ showLogo = true }: CompactMobileNavbarProps) => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open('https://api.whatsapp.com/send?phone=5562994594496', '_blank');
  };

  const handleLocation = () => {
    window.open('https://maps.google.com/?q=World+Trade+Center+Goiânia+GO', '_blank');
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith('/#')) {
      const section = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('sectionChange', { detail: section }));
        }, 150);
      } else {
        window.dispatchEvent(new CustomEvent('sectionChange', { detail: section }));
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className={`md:hidden ${isDark ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'} fixed top-0 left-0 right-0 z-50 transition-colors duration-300`}>
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Left side - Logo (conditional) */}
          <div className="flex items-center">
            {showLogo && (
              <Link to="/" className="flex items-center">
                <img 
                  src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
                  alt="Logo" 
                  className="h-12 object-contain"
                />
              </Link>
            )}
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-green-600 text-white hover:bg-green-500' 
                  : 'bg-green-600 text-white hover:bg-green-500'
              }`}
              title="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </button>

            {/* Location Button */}
            <button
              onClick={handleLocation}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
              title="Localização"
            >
              <MapPin className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'hover:bg-white/10 text-white' 
                  : 'hover:bg-black/10 text-black'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-200'} border-t`}>
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => handleNavigation('/')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/' 
                    ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                    : (isDark ? 'text-white/80 hover:bg-white/5' : 'text-black/80 hover:bg-black/5')
                }`}
              >
                Home
              </button>

              <div className="space-y-1">
                <p className={`px-3 py-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                  Áreas de Atuação
                </p>
                <div className="pl-4 space-y-1">
                  {practiceAreas.slice(0, 6).map((area) => (
                    <button
                      key={area.id}
                      onClick={() => handleNavigation(area.path)}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                        location.pathname === area.path 
                          ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                          : (isDark ? 'text-white/70 hover:bg-white/5' : 'text-black/70 hover:bg-black/5')
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleNavigation('/#about')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  isDark ? 'text-white/80 hover:bg-white/5' : 'text-black/80 hover:bg-black/5'
                }`}
              >
                Sobre Nós
              </button>

              <button
                onClick={() => handleNavigation('/#socios')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  isDark ? 'text-white/80 hover:bg-white/5' : 'text-black/80 hover:bg-black/5'
                }`}
              >
                Nossa Equipe
              </button>

              <button
                onClick={() => handleNavigation('/#contact')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  isDark ? 'text-white/80 hover:bg-white/5' : 'text-black/80 hover:bg-black/5'
                }`}
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default CompactMobileNavbar;
