
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { logger } from '../../utils/logger';

const LocationMap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const convertToEmbedUrl = (url: string): string => {
    try {
      if (url.includes('/maps/embed')) return url;
      
      if (url.includes('maps.app.goo.gl') || url.includes('goo.gl')) {
        return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d-49.2666729!3d-16.6868916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQxJzEyLjgiUyA0OcKwMTUnNjAuMCJX!5e0!3m2!1spt!2sbr!4v1635789456123!5m2!1spt!2sbr&q=${encodeURIComponent(url)}`;
      }
      
      if (url.includes('google.com/maps')) {
        return url.replace(/\/maps\//, '/maps/embed/');
      }
      
      return `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(url)}`;
    } catch (error) {
      console.error('Erro ao converter URL do mapa:', error);
      return url;
    }
  };

  const [mapConfig, setMapConfig] = useState({
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15287.357738754663!2d-49.2666729!3d-16.6868916!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef205c3fd8e61%3A0x5c8b4e2c7a6b1234!2sWorld%20Trade%20Center%20-%20Torre%20Office%20Corporate!5e0!3m2!1spt!2sbr!4v1635789456123!5m2!1spt!2sbr',
    location: 'World Trade Center, Goiânia - GO'
  });

  const [mapUrl, setMapUrl] = useState('');
  
  useEffect(() => {
    const loadMapConfig = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: contact } = await supabase
          .from('contact_info')
          .select('map_embed_url, address')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (contact) {
          if (contact.map_embed_url) {
            const processedUrl = convertToEmbedUrl(contact.map_embed_url);
            setMapConfig(prev => ({ ...prev, embedUrl: processedUrl }));
            setMapUrl(contact.map_embed_url);
          }
          if (contact.address) {
            setMapConfig(prev => ({ ...prev, location: contact.address }));
          }
        }
      } catch (error) {
        console.error('LocationMap: Erro ao carregar configurações do mapa:', error);
      }
    };

    loadMapConfig();
  }, []);

  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      const data = event.detail;
      
      if (data.contactTexts) {
        const { address, mapEmbedUrl, map_embed_url } = data.contactTexts;
        if (address) {
          setMapConfig(prev => ({ ...prev, location: address }));
        }
        if (mapEmbedUrl || map_embed_url) {
          const rawUrl = mapEmbedUrl || map_embed_url;
          const processedUrl = convertToEmbedUrl(rawUrl);
          setMapConfig(prev => ({ ...prev, embedUrl: processedUrl }));
          setMapUrl(rawUrl);
        }
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  const handleMapClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} h-full border relative`}>
      <div className="h-full min-h-[200px] relative">
        <iframe
          src={mapConfig.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '200px', pointerEvents: 'auto' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Localização: ${mapConfig.location}`}
          className="w-full h-full"
          onError={(e) => {
            console.error('LocationMap: Erro ao carregar iframe do mapa:', e);
            const fallbackUrl = `https://www.google.com/maps/embed/v1/search?key=&q=${encodeURIComponent(mapConfig.location)}`;
            (e.target as HTMLIFrameElement).src = fallbackUrl;
          }}
        />
        <button
          onClick={handleMapClick}
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded shadow-lg transition-all hover:scale-105 ${
            isDark ? 'bg-black/80 text-white hover:bg-black' : 'bg-white/90 text-black hover:bg-white'
          }`}
          style={{ zIndex: 10 }}
        >
          📍 Ver no Google Maps
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
