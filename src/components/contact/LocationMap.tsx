
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const LocationMap: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'border-white/10 bg-neutral-900/90' : 'border-black/10 bg-neutral-100/90'} rounded-lg overflow-hidden shadow-lg relative h-full backdrop-blur-sm border`}>
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img 
          src="/lovable-uploads/19f07831-e584-4a1f-b8ef-284685df9717.png" 
          alt="World Trade Center Goiânia"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="absolute bottom-2 right-2">
        <a 
          href="https://maps.google.com/?q=World+Trade+Center+Goiania" 
          target="_blank"
          rel="noopener noreferrer"
          className={`${isDark ? 'bg-white/20 text-white hover:bg-white hover:text-black' : 'bg-black/20 text-white hover:bg-black hover:text-white'} backdrop-blur-md text-xs md:text-sm py-1 flex items-center px-2 transition-all duration-300 rounded-sm`}
        >
          <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
