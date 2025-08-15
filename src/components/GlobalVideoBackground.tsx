import React, { useEffect, useState } from 'react';

const GlobalVideoBackground = () => {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Carregar configurações do vídeo de fundo
  useEffect(() => {
    const loadVideo = async () => {
      try {
        const { supabase } = await import('../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('team_video_enabled, team_background_video')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        console.log('🎥 Carregando vídeo de fundo global:', settings);

        if (settings?.team_background_video) {
          setVideoUrl(settings.team_background_video);
          setVideoEnabled(settings.team_video_enabled !== false); // Default to true if not explicitly false
          console.log('✅ Vídeo configurado:', {
            url: settings.team_background_video,
            enabled: settings.team_video_enabled
          });
        }
      } catch (error) {
        console.error('❌ Erro ao carregar vídeo:', error);
      }
    };

    loadVideo();
  }, []);

  // Escutar configurações de vídeo de fundo  
  useEffect(() => {
    const handleVideoSettings = (event: CustomEvent) => {
      const { team_video_enabled, team_background_video } = event.detail;
      
      if (team_background_video) {
        setVideoUrl(team_background_video);
        setVideoEnabled(team_video_enabled !== false);
        console.log('🔄 Configurações de vídeo atualizadas:', {
          url: team_background_video,
          enabled: team_video_enabled
        });
      }
    };

    window.addEventListener('teamVideoSettingsUpdated', handleVideoSettings as EventListener);
    return () => {
      window.removeEventListener('teamVideoSettingsUpdated', handleVideoSettings as EventListener);
    };
  }, []);

  // Debug: sempre mostrar se há URL
  console.log('🎬 GlobalVideoBackground estado:', {
    videoEnabled,
    videoUrl,
    shouldRender: videoUrl && videoEnabled
  });

  // Renderizar se houver URL (remover condição de enabled para debug)
  if (!videoUrl) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none" style={{
      zIndex: -1
    }}>
      <video
        id="global-background-video"
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
        onLoadStart={() => console.log('🎥 Vídeo global iniciando carregamento')}
        onCanPlay={() => console.log('✅ Vídeo global pronto para reproduzir')}
        onError={(e) => console.error('❌ Erro no vídeo global:', e)}
        onLoadedMetadata={(e) => {
          const video = e.target as HTMLVideoElement;
          console.log('📹 Metadados do vídeo carregados');
          // Force play on mobile
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => console.log('▶️ Vídeo reproduzindo com sucesso'))
              .catch(() => {
                // Mobile might require user interaction first
                console.log('🎥 Autoplay falhou no mobile, tentando reproduzir novamente');
                setTimeout(() => video.play(), 1000);
              });
          }
        }}
      />
    </div>
  );
};

export default GlobalVideoBackground;