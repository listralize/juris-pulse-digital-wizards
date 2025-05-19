
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const LocationMap: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="border-white/10 bg-neutral-900/90 rounded-lg overflow-hidden shadow-lg relative h-full backdrop-blur-sm">
      <img 
        src="/lovable-uploads/a8cc2627-db98-4461-9afa-8b1f238766e0.png" 
        alt="Localização do escritório"
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute bottom-2 right-2">
        <a 
          href="https://maps.google.com/?q=World+Trade+Center+Goiania" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md text-xs md:text-sm py-1 flex items-center px-2 transition-all duration-300 rounded-sm"
        >
          <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
