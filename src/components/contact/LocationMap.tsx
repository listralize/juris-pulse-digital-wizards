
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const LocationMap: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex-grow rounded-lg overflow-hidden shadow-lg ${isDark ? 'border border-gray-700 bg-gray-900/80' : 'border border-gray-100'} relative h-[300px]`}>
      <img 
        src="/lovable-uploads/a8cc2627-db98-4461-9afa-8b1f238766e0.png" 
        alt="Localização do escritório"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 right-4">
        <a 
          href="https://maps.google.com/?q=World+Trade+Center+Goiania" 
          target="_blank"
          rel="noopener noreferrer"
          className={`elegant-button ${isDark ? 'bg-black/80 text-white hover:bg-black' : 'bg-black/80 text-white hover:bg-black'} backdrop-blur-sm text-sm py-2 flex items-center px-4 rounded-none`}
        >
          <MapPin className="w-4 h-4 mr-1" /> Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
