
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
  
  const [aboutTitle, setAboutTitle] = useState('Sobre Nós');
  const [aboutDescription, setAboutDescription] = useState('Descrição sobre o escritório');
  const [aboutMedia, setAboutMedia] = useState('');
  const [aboutMediaType, setAboutMediaType] = useState<'image' | 'video'>('image');

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
          console.log('📱 About: Dados carregados do Supabase:', settings);
          setAboutTitle(settings.about_title || 'Sobre Nós');
          setAboutDescription(settings.about_description || 'Descrição sobre o escritório');
          setAboutMedia(settings.about_image || '');
          setAboutMediaType(settings.about_media_type || 'image');
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados da seção About:', error);
      }
    };

    loadAboutData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 About: Recebendo atualização de textos via evento:', event.detail);
      const { aboutTitle: newTitle, aboutDescription: newDescription, aboutImage: newMedia, aboutMediaType: newMediaType } = event.detail;
      
      if (newTitle !== undefined) setAboutTitle(newTitle);
      if (newDescription !== undefined) setAboutDescription(newDescription);
      if (newMedia !== undefined) setAboutMedia(newMedia);
      if (newMediaType !== undefined) setAboutMediaType(newMediaType);
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
              <video
                src={aboutMedia}
                controls
                className="w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>
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
