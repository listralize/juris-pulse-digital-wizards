
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationMap: React.FC = () => {
  return (
    <div className="flex-grow rounded-lg overflow-hidden shadow-lg border border-gray-100 relative">
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
          className="elegant-button bg-black/80 backdrop-blur-sm hover:bg-black/100 text-sm py-2 flex items-center"
        >
          <MapPin className="w-4 h-4 mr-1" /> Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
