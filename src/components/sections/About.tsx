
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../ThemeProvider';
import { useIsMobile } from '../../hooks/use-mobile';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { logger } from '@/utils/logger';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const { siteSettings } = useSupabaseData();

  const aboutTitle = siteSettings?.about_title || 'Quem Somos';
  const aboutDescription = siteSettings?.about_description || 'Uma equipe dedicada à excelência jurídica';
  const aboutImage = siteSettings?.about_image || '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png';
  const aboutVideoStorageUrl = siteSettings?.about_video_storage_url || '';
  const mediaType = siteSettings?.about_media_type || 'image';

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
      if (aboutVideoStorageUrl) {
        return (
          <div 
            className="about-video-container w-full rounded-lg overflow-hidden" 
            style={{
              aspectRatio: isMobile ? '9/16' : '16/9',
              maxHeight: isMobile ? '24rem' : 'auto',
              position: 'relative',
              zIndex: isMobile ? 9999 : 20,
              isolation: 'isolate'
            }}
          >
            <video
              src={aboutVideoStorageUrl}
              title="About Us Video"
              className="w-full h-full rounded-lg object-cover blur-[1.5px]"
              style={{ 
                position: 'relative',
                zIndex: isMobile ? 9999 : 20,
                pointerEvents: 'auto',
                touchAction: 'auto',
                isolation: 'isolate'
              }}
              controls
              controlsList="nodownload"
              preload="metadata"
              playsInline
              webkit-playsinline="true"
            />
          </div>
        );
      }
      
      if (aboutImage && aboutImage.includes('youtube')) {
        const embedUrl = getYouTubeEmbedUrl(aboutImage);
        
        return (
          <div className={`w-full rounded-lg overflow-hidden relative ${
            isMobile ? 'aspect-[9/16] max-h-96' : 'aspect-video'
          }`} style={{ zIndex: isMobile ? 9999 : 20 }}>
            <iframe
              src={`${embedUrl}${isMobile ? '&playsinline=1' : ''}`}
              title="About Us Video"
              className="w-full h-full rounded-lg"
              style={{ 
                zIndex: isMobile ? 9999 : 20,
                position: 'relative',
                pointerEvents: 'auto',
                touchAction: 'auto'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
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
        loading="lazy"
        decoding="async"
        width="600"
        height="256"
      />
    );
  };

  return (
    <div 
      ref={sectionRef}
      className={`w-full min-h-screen px-4 md:px-6 lg:px-8 relative overflow-hidden rounded-2xl ${
        isMobile 
          ? 'bg-transparent text-white' 
          : isDark 
            ? 'bg-black text-white' 
            : 'bg-white text-black'
      }`}
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: isMobile ? 9999 : 10
      }}
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-center mb-8 md:mb-12">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {aboutTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
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
