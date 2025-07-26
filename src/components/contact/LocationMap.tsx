
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';

const LocationMap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [mapConfig, setMapConfig] = useState({
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15287.357738754663!2d-49.2666729!3d-16.6868916!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef205c3fd8e61%3A0x5c8b4e2c7a6b1234!2sWorld%20Trade%20Center%20-%20Torre%20Office%20Corporate!5e0!3m2!1spt!2sbr!4v1635789456123!5m2!1spt!2sbr',
    location: 'World Trade Center, Goiânia - GO'
  });

  // Carregar configurações do mapa do Supabase
  useEffect(() => {
    const loadMapConfig = async () => {
      try {
        console.log('🗺️ LocationMap: Carregando dados do mapa...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Buscar dados da contact_info que pode ter mapEmbedUrl
        const { data: contact } = await supabase
          .from('contact_info')
          .select('map_embed_url, address')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (contact) {
          if (contact.map_embed_url) {
            setMapConfig(prev => ({
              ...prev,
              embedUrl: contact.map_embed_url
            }));
          }
          if (contact.address) {
            setMapConfig(prev => ({
              ...prev,
              location: contact.address
            }));
          }
        }
        
        console.log('🗺️ LocationMap: Dados carregados:', contact);
      } catch (error) {
        console.error('❌ LocationMap: Erro ao carregar configurações do mapa:', error);
      }
    };

    loadMapConfig();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🗺️ LocationMap: Evento pageTextsUpdated recebido:', event.detail);
      
      const data = event.detail;
      
      if (data.contactTexts) {
        const { address, mapEmbedUrl, map_embed_url } = data.contactTexts;
        if (address) {
          setMapConfig(prev => ({
            ...prev,
            location: address
          }));
        }
        if (mapEmbedUrl || map_embed_url) {
          setMapConfig(prev => ({
            ...prev,
            embedUrl: mapEmbedUrl || map_embed_url
          }));
        }
      }
    };

    // Escutar evento geral
    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  return (
    <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} h-full border`}>
      <div className="h-full min-h-[200px]">
        <iframe
          src={mapConfig.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '200px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Localização: ${mapConfig.location}`}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LocationMap;
