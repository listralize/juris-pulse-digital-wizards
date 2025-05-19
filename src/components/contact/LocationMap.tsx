
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const LocationMap: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'border-white/10 bg-black/80' : 'border-gray-200 bg-white/90'} border rounded-lg overflow-hidden shadow-lg relative h-full backdrop-blur-sm`}>
      <img 
        src="/lovable-uploads/a8cc2627-db98-4461-9afa-8b1f238766e0.png" 
        alt="Localização do escritório"
        className={`w-full h-full object-cover ${isDark ? 'opacity-80' : 'opacity-90'}`}
      />
      <div className="absolute bottom-2 right-2">
        <a 
          href="https://maps.google.com/?q=World+Trade+Center+Goiania" 
          target="_blank"
          rel="noopener noreferrer"
          className={`${
            isDark 
            ? 'bg-white/20 text-white hover:bg-white hover:text-black'
            : 'bg-black/60 text-white hover:bg-black'
          } backdrop-blur-md text-xs md:text-sm py-1 flex items-center px-2 transition-all duration-300 rounded-sm`}
        >
          <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
