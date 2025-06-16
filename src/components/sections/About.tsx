
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Estado local para textos da página
  const [aboutTitle, setAboutTitle] = useState('Sobre Nós');
  const [aboutDescription, setAboutDescription] = useState('Somos um escritório de advocacia com mais de 20 anos de experiência, oferecendo serviços jurídicos de excelência em diversas áreas do direito.');
  const [aboutMedia, setAboutMedia] = useState('');
  const [aboutMediaType, setAboutMediaType] = useState<'image' | 'video'>('image');

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Buscar apenas o registro mais recente
        const { data: settings } = await supabase
          .from('site_settings')
          .select('about_title, about_description, about_image, about_media_type')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('📱 About: Dados carregados do Supabase:', settings);
          setAboutTitle(settings.about_title || 'Sobre Nós');
          setAboutDescription(settings.about_description || 'Somos um escritório de advocacia com mais de 20 anos de experiência, oferecendo serviços jurídicos de excelência em diversas áreas do direito.');
          setAboutMedia(settings.about_image || '');
          
          // Corrigir o tipo para aceitar apenas os valores válidos
          const mediaType = settings.about_media_type;
          if (mediaType === 'video' || mediaType === 'image') {
            setAboutMediaType(mediaType);
          } else {
            setAboutMediaType('image');
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados iniciais:', error);
      }
    };

    loadInitialData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 About: Recebendo atualização de textos via evento:', event.detail);
      const { aboutTitle: newTitle, aboutDescription: newDescription, aboutImage: newMedia, aboutMediaType: newMediaType } = event.detail;
      
      if (newTitle !== undefined) {
        console.log('📱 About: Atualizando título:', newTitle);
        setAboutTitle(newTitle);
      }
      if (newDescription !== undefined) {
        console.log('📱 About: Atualizando descrição:', newDescription);
        setAboutDescription(newDescription);
      }
      if (newMedia !== undefined) {
        console.log('📱 About: Atualizando mídia:', newMedia);
        setAboutMedia(newMedia);
      }
      if (newMediaType !== undefined) {
        console.log('📱 About: Atualizando tipo de mídia:', newMediaType);
        if (newMediaType === 'video' || newMediaType === 'image') {
          setAboutMediaType(newMediaType);
        }
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    try {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scaleY: 0.9 },
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      if (aboutMedia) {
        gsap.fromTo(
          mediaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
              trigger: mediaRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    } catch (error) {
      console.error('❌ Erro na animação About:', error);
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [aboutMedia]);

  console.log('🔍 About renderizando com:', { aboutTitle, aboutDescription, aboutMedia, aboutMediaType });

  // Função para converter URL do YouTube para embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url; // Já é uma URL de embed
    }
    return url; // Se for outro formato
  };

  return (
    <section 
      id="about" 
      className={`h-full flex flex-col justify-center items-center px-4 md:px-6 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'}`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          ref={titleRef} 
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 font-canela ${isDark ? 'text-white' : 'text-black'}`}
        >
          {aboutTitle}
        </h2>
        
        <p 
          ref={textRef} 
          className={`text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-satoshi mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {aboutDescription}
        </p>

        {aboutMedia && (
          <div ref={mediaRef} className="mt-8 max-w-2xl mx-auto">
            {aboutMediaType === 'video' ? (
              <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={getYouTubeEmbedUrl(aboutMedia)}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Vídeo sobre nós"
                />
              </div>
            ) : (
              <img
                src={aboutMedia}
                alt="Sobre nós"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ maxHeight: '400px' }}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
