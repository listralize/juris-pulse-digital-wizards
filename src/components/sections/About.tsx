
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import NeuralBackground from '../NeuralBackground';
import { useIsMobile } from '../../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  // Estados para os textos editáveis
  const [aboutTitle, setAboutTitle] = useState('Quem Somos');
  const [aboutDescription, setAboutDescription] = useState('Uma equipe dedicada à excelência jurídica');
  const [aboutImage, setAboutImage] = useState('/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png');
  const [aboutVideoStorageUrl, setAboutVideoStorageUrl] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [teamVideoEnabled, setTeamVideoEnabled] = useState(false);
  const [teamBackgroundVideo, setTeamBackgroundVideo] = useState('');

  // Carregar dados do Supabase
  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('about_title, about_description, about_image, about_media_type, about_video_storage_url, team_video_enabled, team_background_video')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('ℹ️ About: Dados carregados do Supabase:', settings);
          setAboutTitle(settings.about_title || 'Quem Somos');
          setAboutDescription(settings.about_description || 'Uma equipe dedicada à excelência jurídica');
          setAboutImage(settings.about_image || '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png');
          setAboutVideoStorageUrl(settings.about_video_storage_url || '');
          setMediaType(settings.about_media_type || 'image');
          setTeamVideoEnabled(settings.team_video_enabled || false);
          setTeamBackgroundVideo(settings.team_background_video || '');
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados do About:', error);
      }
    };

    loadAboutData();
  }, []);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('ℹ️ About: Recebendo atualização de textos:', event.detail);
      const { 
        aboutTitle: newTitle, 
        aboutDescription: newDescription,
        aboutImage: newImage,
        aboutMediaType: newMediaType
      } = event.detail;
      
      if (newTitle !== undefined) {
        console.log('ℹ️ About: Atualizando título:', newTitle);
        setAboutTitle(newTitle);
      }
      if (newDescription !== undefined) {
        console.log('ℹ️ About: Atualizando descrição:', newDescription);
        setAboutDescription(newDescription);
      }
      if (newImage !== undefined) {
        console.log('ℹ️ About: Atualizando imagem:', newImage);
        setAboutImage(newImage);
      }
      if (newMediaType !== undefined) {
        console.log('ℹ️ About: Atualizando tipo de mídia:', newMediaType);
        setMediaType(newMediaType);
      }
    };

    const handleTeamVideoUpdate = (event: CustomEvent) => {
      console.log('ℹ️ About: Recebendo atualização de vídeo da equipe:', event.detail);
      const { team_video_enabled, team_background_video } = event.detail;
      
      setTeamVideoEnabled(team_video_enabled || false);
      setTeamBackgroundVideo(team_background_video || '');
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    window.addEventListener('teamVideoSettingsUpdated', handleTeamVideoUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
      window.removeEventListener('teamVideoSettingsUpdated', handleTeamVideoUpdate as EventListener);
    };
  }, []);

  // Função para converter URL do YouTube para embed
  const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      [contentRef.current, mediaRef.current],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  const renderMedia = () => {
    if (mediaType === 'video') {
      // Priorizar vídeo do storage se disponível
      if (aboutVideoStorageUrl) {
        console.log('🎥 About: Renderizando vídeo do storage:', aboutVideoStorageUrl);
        return (
          <div className="about-video-container w-full rounded-lg overflow-hidden relative" style={{
            aspectRatio: isMobile ? '9/16' : '16/9',
            maxHeight: isMobile ? '24rem' : 'auto',
            zIndex: 999999,
            isolation: 'isolate'
          }}>
            <video
              src={aboutVideoStorageUrl}
              title="About Us Video"
              className="w-full h-full rounded-lg object-cover cursor-pointer"
              style={{ 
                zIndex: 999999,
                position: 'relative',
                pointerEvents: 'auto',
                isolation: 'isolate'
              }}
              controls
              preload="metadata"
              playsInline
              webkit-playsinline="true"
            />
          </div>
        );
      }
      
      // Fallback para YouTube se storage não disponível
      if (aboutImage) {
        const embedUrl = getYouTubeEmbedUrl(aboutImage);
        console.log('🎥 About: Renderizando vídeo do YouTube:', { originalUrl: aboutImage, embedUrl });
        
        return (
          <div className={`w-full rounded-lg overflow-hidden relative ${
            isMobile ? 'aspect-[9/16] max-h-96' : 'aspect-video'
          }`}>
            <iframe
              src={`${embedUrl}${isMobile ? '&playsinline=1' : ''}`}
              title="About Us Video"
              className="w-full h-full rounded-lg cursor-pointer touch-manipulation"
              style={{ 
                zIndex: 10,
                position: 'relative',
                pointerEvents: 'auto'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
    }
    
    return (
      <img 
        src={aboutImage} 
        alt="Sobre nós" 
        className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg"
      />
    );
  };

  return (
    <div 
      ref={sectionRef}
      className={`w-full min-h-screen px-4 md:px-6 lg:px-8 relative overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Neural Background apenas no desktop e tema escuro */}
      {isDark && !isMobile && (
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <NeuralBackground />
        </div>
      )}
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Container centralizado com padrão uniforme */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Header padronizado - mesmo padrão de todas as outras seções */}
          <div className="text-center mb-8 md:mb-12">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {aboutTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Content Grid - padronizado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full">
            <div ref={contentRef}>
              <p className={`text-base md:text-lg leading-relaxed font-satoshi ${isDark ? 'text-white/90' : 'text-black/80'}`}>
                {aboutDescription}
              </p>
            </div>
            
            <div ref={mediaRef}>
              {renderMedia()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
