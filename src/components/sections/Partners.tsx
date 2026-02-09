import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, X, Mail, User } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { logger } from '@/utils/logger';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const {
    teamMembers,
    pageTexts,
    isLoading
  } = useSupabaseDataNew();
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Force carousel to always start at first slide
  useEffect(() => {
    setCurrentSlide(0);
  }, [teamMembers]);

  // Force reset to first slide whenever component is accessed
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      if (event.detail?.section === 'socios') {
        setCurrentSlide(0);
      }
    };
    window.addEventListener('activeSectionChanged', handleSectionChange as EventListener);
    return () => {
      window.removeEventListener('activeSectionChanged', handleSectionChange as EventListener);
    };
  }, []);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sincronizar textos da página
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      const { teamTitle } = event.detail;
      if (teamTitle !== undefined) {
        setLocalPageTexts(prev => ({ ...prev, teamTitle }));
      }
    };
    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  // Carregar vídeo de fundo da página completa
  useEffect(() => {
    const loadVideo = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('team_video_enabled, team_background_video')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        logger.log('🎥 Carregando vídeo de fundo:', settings);

        if (settings?.team_background_video) {
          setTimeout(() => {
            const videoElement = document.getElementById('team-background-video') as HTMLVideoElement;
            
            if (videoElement) {
              videoElement.src = settings.team_background_video;
              if (settings.team_video_enabled) {
                videoElement.style.display = 'block';
                videoElement.play().then(() => {
                  logger.log('✅ Vídeo de fundo carregado e reproduzindo');
                }).catch(err => {
                  logger.error('❌ Erro ao reproduzir vídeo:', err);
                });
              }
            } else {
              logger.error('❌ Elemento de vídeo não encontrado!');
            }
          }, 100);
        }
      } catch (error) {
        logger.error('❌ Erro ao carregar vídeo:', error);
      }
    };

    loadVideo();
  }, []);

  // Escutar configurações de vídeo de fundo  
  useEffect(() => {
    const handleVideoSettings = (event: CustomEvent) => {
      const { team_video_enabled, team_background_video } = event.detail;
      const videoElement = document.getElementById('team-background-video') as HTMLVideoElement;
      
      if (videoElement && team_background_video) {
        videoElement.src = team_background_video;
        if (team_video_enabled) {
          videoElement.style.display = 'block';
          videoElement.play().catch(logger.error);
        } else {
          videoElement.style.display = 'none';
        }
      }
    };

    window.addEventListener('teamVideoSettingsUpdated', handleVideoSettings as EventListener);
    return () => {
      window.removeEventListener('teamVideoSettingsUpdated', handleVideoSettings as EventListener);
    };
  }, []);
  const itemsPerSlide = isMobile ? 1 : 3; // Mobile: 1 card, Desktop: 3 cards
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);
  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % totalSlides;
    handleSlideChange(newSlide);
  };
  
  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    handleSlideChange(newSlide);
  };

  // Abrir perfil do membro
  const openMemberProfile = (member: any) => {
    setSelectedMember(member);
    setIsProfileOpen(true);
  };

  // Fechar perfil
  const closeMemberProfile = () => {
    setIsProfileOpen(false);
    setSelectedMember(null);
  };

  const teamTitle = localPageTexts?.teamTitle || 'Nossa Equipe';

  // Animação com GSAP
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !carouselRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      carouselRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, [teamMembers, isLoading]);

  // Autoplay no mobile - rolar automaticamente
  useEffect(() => {
    if (!isMobile || totalSlides <= 1 || !autoPlayActive) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 4000); // Trocar slide a cada 4 segundos

    return () => clearInterval(interval);
  }, [isMobile, totalSlides, autoPlayActive]);

  // Pausar autoplay quando usuário interagir
  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    if (isMobile) {
      setAutoPlayActive(false);
      // Reativar após 10 segundos
      setTimeout(() => setAutoPlayActive(true), 10000);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4">Carregando equipe...</p>
      </div>
    </div>;
  }

  return (
    <div 
      ref={sectionRef}
      className={`w-full min-h-screen relative overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* NeuralBackground removed - using global instance */}
      
      {/* Vídeo de fundo da página TODA */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{
        zIndex: -1
      }}>
        <video
          id="team-background-video"
          src="https://hmfsvccbyxhdwmrgcyff.supabase.co/storage/v1/object/public/videos/1755185975420-fisow0xrmc-0814_2_.mp4"
          className="w-full h-full object-cover opacity-70 blur-[2px]"
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
          onLoadStart={() => logger.log('🎥 Vídeo iniciando carregamento')}
          onCanPlay={() => logger.log('✅ Vídeo pronto para reproduzir')}
          onError={(e) => logger.error('❌ Erro no vídeo:', e)}
          onLoadedMetadata={(e) => {
            const video = e.target as HTMLVideoElement;
            // Force play on mobile
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Mobile might require user interaction first
                logger.log('🎥 Autoplay falhou, tentando reproduzir novamente');
                setTimeout(() => video.play(), 1000);
              });
            }
          }}
        />
      </div>
      
      
      
      
      <div className="team-responsive-container w-full relative z-10" style={{
      marginTop: '-100px'
    }}>
        <div className="flex flex-col items-center justify-start flex-1" style={{
        paddingTop: isMobile ? '100px' : '155px' // Reduzindo no mobile
      }}>
          {/* Header responsivo */}
          <div className="text-center mb-8 md:mb-12">
            <h2 ref={titleRef} className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              {teamTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Carousel Container */}
          <div className="relative w-full max-w-6xl px-4 sm:px-8 lg:px-12">
            <div ref={carouselRef} className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`
            }}>
                {Array.from({
                length: totalSlides
              }).map((_, slideIndex) => (
                <div key={slideIndex} className={`w-full flex-shrink-0 px-2 sm:px-4 ${isMobile ? 'flex justify-center' : 'grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8'}`} style={{
                width: `${100 / totalSlides}%`
              }}>
                    {teamMembers.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((member, index) => (
                      <div key={index} className={`group p-2 sm:p-3 lg:p-4 ${isMobile ? 'w-full max-w-sm mx-auto' : ''}`}>
                        <div 
                          onClick={() => openMemberProfile(member)}
                          className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-50'} shadow-md hover:shadow-xl`} 
                          style={{ height: '420px' }}
                        >
                          {/* Foto com altura fixa */}
                          <div className="h-48 relative overflow-hidden">
                            {member.image ? (
                              <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                              />
                            ) : (
                              <div className={`w-full h-full flex items-center justify-center text-2xl sm:text-3xl ${isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-400'}`}>
                                <User size={48} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Ver perfil
                            </div>
                          </div>
                          
                          {/* Conteúdo com altura fixa */}
                          <div className="p-3 sm:p-4 lg:p-5 flex-1">
                            <h3 className={`text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                              {member.name}
                            </h3>
                            <p className={`text-xs sm:text-sm mb-2 sm:mb-3 font-medium ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                              {member.title || 'Advogado'}
                            </p>
                            <p className={`text-xs sm:text-sm leading-relaxed line-clamp-4 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                              {member.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Responsivos */}
            {totalSlides > 1 && (
              <>
                <button onClick={prevSlide} className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 transition-all duration-300 team-nav-button rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'} hover:scale-110 z-10`}>
                  <ChevronLeft className="team-nav-icon" />
                </button>
                
                <button onClick={nextSlide} className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 transition-all duration-300 team-nav-button rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'} hover:scale-110 z-10`}>
                  <ChevronRight className="team-nav-icon" />
                </button>
              </>
            )}

            {/* Dots Indicator - OCULTO NO MOBILE, VISÍVEL APENAS EM DESKTOP */}
            {totalSlides > 1 && (
              <div className="justify-center mt-6 space-x-2 hidden md:flex">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index
                        ? isDark ? 'bg-white' : 'bg-black'
                        : isDark ? 'bg-white/30' : 'bg-black/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Perfil do Membro */}
      <Dialog open={isProfileOpen} onOpenChange={closeMemberProfile}>
        <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${isDark ? 'bg-black text-white border-white/20' : 'bg-white text-black'}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedMember?.image ? (
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember?.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <User size={24} />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{selectedMember?.name}</h3>
                <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  {selectedMember?.title || 'Advogado'}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            {/* Foto em destaque */}
            {selectedMember?.image && (
              <div className="flex justify-center">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  className="w-48 h-48 rounded-lg object-cover shadow-lg"
                />
              </div>
            )}
            
            {/* Informações básicas */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User size={18} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                <span className="font-medium">Nome:</span>
                <span>{selectedMember?.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail size={18} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                <span className="font-medium">E-mail:</span>
                <a 
                  href={`mailto:${selectedMember?.email}`}
                  className={`hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                >
                  {selectedMember?.email}
                </a>
              </div>
              
              {selectedMember?.oab && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">OAB:</span>
                  <span>{selectedMember.oab}</span>
                </div>
              )}
            </div>
            
            {/* Descrição completa */}
            {selectedMember?.description && (
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Sobre</h4>
                <p className={`leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                  {selectedMember.description}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Partners;