
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const LocationMap: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'border-white/10 glass-card text-white' : 'border border-gray-100'} rounded-lg overflow-hidden shadow-lg relative h-full`}>
      <img 
        src="/lovable-uploads/a8cc2627-db98-4461-9afa-8b1f238766e0.png" 
        alt="Localização do escritório"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 right-2">
        <a 
          href="https://maps.google.com/?q=World+Trade+Center+Goiania" 
          target="_blank"
          rel="noopener noreferrer"
          className={`elegant-button ${isDark ? 'bg-white/20 text-white hover:bg-white hover:text-black' : 'bg-black/80 text-white hover:bg-black'} backdrop-blur-md text-xs py-1 flex items-center px-2 rounded-none`}
        >
          <MapPin className="w-2.5 h-2.5 mr-1" /> Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
