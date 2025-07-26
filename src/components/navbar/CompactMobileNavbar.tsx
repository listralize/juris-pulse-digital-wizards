
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { MapPin, Menu, X } from 'lucide-react';
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
  const [adminData, setAdminData] = useState<any>({});

  // Carregar dados do admin
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        const { data } = await supabase
          .from('site_settings')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (data) {
          setAdminData(data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do admin:', error);
      }
    };
    
    loadAdminData();
  }, []);

  const handleWhatsApp = () => {
    const whatsappNumber = adminData?.whatsapp || '5562994594496';
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}`, '_blank');
  };

  const handleLocation = () => {
    const mapUrl = adminData?.map_embed_url || 'https://maps.google.com/?q=World+Trade+Center+Goiânia+GO';
    window.open(mapUrl, '_blank');
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
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-[100] ${isDark ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'} transition-colors duration-300`}>
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
                alt="Logo" 
                className="h-10 object-contain"
                style={{ display: 'block', visibility: 'visible' }}
              />
            </Link>
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488"/>
              </svg>
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
                onClick={() => handleNavigation('/#cliente')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  isDark ? 'text-white/80 hover:bg-white/5' : 'text-black/80 hover:bg-black/5'
                }`}
              >
                Área do Cliente
              </button>

              <button
                onClick={() => handleNavigation('/#blog')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  isDark ? 'text-white/80 hover:bg-white/5' : 'text-black/80 hover:bg-black/5'
                }`}
              >
                Blog
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
      
      {/* Spacer for fixed navbar */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default CompactMobileNavbar;
