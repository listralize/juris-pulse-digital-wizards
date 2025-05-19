
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const LocationMap: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'border-neutral-700 bg-neutral-800 text-neutral-100' : 'border border-gray-100'} rounded-lg overflow-hidden shadow-lg relative h-full min-h-[150px]`}>
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
          className={`elegant-button ${isDark ? 'bg-neutral-800/80 text-neutral-100 hover:bg-neutral-700' : 'bg-black/80 text-white hover:bg-black'} backdrop-blur-sm text-xs py-1 flex items-center px-2 rounded-none`}
        >
          <MapPin className="w-3 h-3 mr-1" /> Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
