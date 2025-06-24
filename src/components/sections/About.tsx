import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Estados para os textos editáveis
  const [aboutTitle, setAboutTitle] = useState('Quem Somos');
  const [aboutDescription, setAboutDescription] = useState('Uma equipe dedicada à excelência jurídica');
  const [aboutImage, setAboutImage] = useState('/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png');
  const [mediaType, setMediaType] = useState('image');

  // Carregar dados do Supabase
  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('about_title, about_description, about_image, about_media_type')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('ℹ️ About: Dados carregados do Supabase:', settings);
          setAboutTitle(settings.about_title || 'Quem Somos');
          setAboutDescription(settings.about_description || 'Uma equipe dedicada à excelência jurídica');
          setAboutImage(settings.about_image || '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png');
          setMediaType(settings.about_media_type || 'image');
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

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
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
    if (mediaType === 'video' && aboutImage) {
      const embedUrl = getYouTubeEmbedUrl(aboutImage);
      console.log('🎥 About: Renderizando vídeo:', { originalUrl: aboutImage, embedUrl });
      
      return (
        <div className="w-full h-64 md:h-80 lg:h-96">
          <iframe
            src={embedUrl}
            title="About Us Video"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    
    return (
      <img 
        src={aboutImage} 
        alt="Sobre nós" 
        className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
      />
    );
  };

  return (
    <div 
      ref={sectionRef}
      className={`w-full min-h-screen py-16 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12 text-center">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            {aboutTitle}
          </h2>
          <div className={`w-20 h-1 mx-auto mt-4 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed font-satoshi ${isDark ? 'text-white/80' : 'text-black/80'}`}>
              {aboutDescription}
            </p>
          </div>
          
          <div ref={mediaRef}>
            {renderMedia()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
