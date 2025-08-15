import React, { useEffect, useState } from 'react';
import { useIsMobile, useIsTablet } from '../hooks/use-mobile';

const MobileVideoBackground = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [videoUrl, setVideoUrl] = useState('');
  const [videoEnabled, setVideoEnabled] = useState(false);

  // Só mostrar em mobile e tablet
  const shouldShow = isMobile || isTablet;

  console.log('📱 MobileVideoBackground:', { isMobile, isTablet, shouldShow });

  // Carregar configurações do vídeo de fundo
  useEffect(() => {
    if (!shouldShow) return;

    const loadVideo = async () => {
      try {
        const { supabase } = await import('../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('team_video_enabled, team_background_video')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        console.log('🎥 Mobile/Tablet - Vídeo de fundo:', settings);

        if (settings?.team_background_video) {
          setVideoUrl(settings.team_background_video);
          setVideoEnabled(settings.team_video_enabled !== false);
          console.log('✅ Mobile/Tablet - Vídeo configurado:', {
            url: settings.team_background_video,
            enabled: settings.team_video_enabled
          });
        }
      } catch (error) {
        console.error('❌ Erro ao carregar vídeo mobile:', error);
      }
    };

    loadVideo();
  }, [shouldShow]);

  // Escutar configurações de vídeo de fundo  
  useEffect(() => {
    if (!shouldShow) return;

    const handleVideoSettings = (event: CustomEvent) => {
      const { team_video_enabled, team_background_video } = event.detail;
      
      if (team_background_video) {
        setVideoUrl(team_background_video);
        setVideoEnabled(team_video_enabled !== false);
        console.log('🔄 Mobile/Tablet - Configurações atualizadas:', {
          url: team_background_video,
          enabled: team_video_enabled
        });
      }
    };

    window.addEventListener('teamVideoSettingsUpdated', handleVideoSettings as EventListener);
    return () => {
      window.removeEventListener('teamVideoSettingsUpdated', handleVideoSettings as EventListener);
    };
  }, [shouldShow]);

  // Não renderizar se não for mobile/tablet ou se não houver configuração
  if (!shouldShow || !videoUrl || !videoEnabled) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none" style={{
      zIndex: -1
    }}>
      <video
        id="mobile-background-video"
        src={videoUrl}
        className="w-full h-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        style={{ 
          minWidth: '100vw',
          minHeight: '100vh',
          objectFit: 'cover'
        }}
        onLoadStart={() => console.log('🎥 Mobile/Tablet - Vídeo iniciando carregamento')}
        onCanPlay={() => console.log('✅ Mobile/Tablet - Vídeo pronto para reproduzir')}
        onError={(e) => console.error('❌ Erro no vídeo mobile:', e)}
        onLoadedMetadata={(e) => {
          const video = e.target as HTMLVideoElement;
          console.log('📹 Mobile/Tablet - Metadados carregados');
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => console.log('▶️ Mobile/Tablet - Vídeo reproduzindo'))
              .catch(() => {
                console.log('🎥 Mobile/Tablet - Autoplay falhou, tentando novamente');
                setTimeout(() => video.play(), 1000);
              });
          }
        }}
      />
    </div>
  );
};

export default MobileVideoBackground;