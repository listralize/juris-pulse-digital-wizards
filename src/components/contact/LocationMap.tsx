
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';

const LocationMap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [mapConfig, setMapConfig] = useState({
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8377!2d-49.2647!3d-16.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b5d8b00001%3A0x1234567890abcdef!2sWorld%20Trade%20Center%20Goi%C3%A2nia!5e0!3m2!1spt!2sbr!4v1234567890123',
    location: 'World Trade Center, Goiânia - GO'
  });

  // Carregar configurações do mapa do Supabase
  useEffect(() => {
    const loadMapConfig = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: contact } = await supabase
          .from('contact_info')
          .select('address, map_embed_url')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (contact) {
          console.log('🗺️ LocationMap: Dados carregados:', contact);
          setMapConfig(prev => ({
            ...prev,
            location: contact.address || prev.location,
            embedUrl: contact.map_embed_url || prev.embedUrl
          }));
        }
      } catch (error) {
        console.error('❌ Erro ao carregar configurações do mapa:', error);
      }
    };

    loadMapConfig();
  }, []);

  // Escutar eventos de atualização
  useEffect(() => {
    const handleContactUpdate = (event: CustomEvent) => {
      console.log('🗺️ LocationMap: Recebendo atualização direta:', event.detail);
      if (event.detail.address) {
        setMapConfig(prev => ({
          ...prev,
          location: event.detail.address
        }));
      }
      if (event.detail.map_embed_url) {
        setMapConfig(prev => ({
          ...prev,
          embedUrl: event.detail.map_embed_url
        }));
      }
    };

    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🗺️ LocationMap: Recebendo atualização via pageTexts:', event.detail);
      if (event.detail.contactTexts?.address) {
        setMapConfig(prev => ({
          ...prev,
          location: event.detail.contactTexts.address
        }));
      }
      if (event.detail.contactTexts?.mapEmbedUrl) {
        setMapConfig(prev => ({
          ...prev,
          embedUrl: event.detail.contactTexts.mapEmbedUrl
        }));
      }
    };

    window.addEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  return (
    <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'} h-full`}>
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
