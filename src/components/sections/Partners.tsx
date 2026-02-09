import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, User, Mail } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useIsMobile } from '../../hooks/use-mobile';
import { logger } from '@/utils/logger';

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { teamMembers, isLoading, siteSettings } = useSupabaseData();
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const teamTitle = siteSettings?.team_title || 'Nossa Equipe';
  const teamVideoEnabled = siteSettings?.team_video_enabled ?? false;
  const teamBackgroundVideo = siteSettings?.team_background_video || '';

  useEffect(() => {
    setCurrentSlide(0);
  }, [teamMembers]);

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

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);
  const nextSlide = () => handleSlideChange((currentSlide + 1) % totalSlides);
  const prevSlide = () => handleSlideChange((currentSlide - 1 + totalSlides) % totalSlides);

  const openMemberProfile = (member: any) => {
    setSelectedMember(member);
    setIsProfileOpen(true);
  };

  const closeMemberProfile = () => {
    setIsProfileOpen(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !carouselRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(carouselRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");

    return () => { tl.kill(); };
  }, [teamMembers, isLoading]);

  useEffect(() => {
    if (!isMobile || totalSlides <= 1 || !autoPlayActive) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, totalSlides, autoPlayActive]);

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    if (isMobile) {
      setAutoPlayActive(false);
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
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      {/* Video background - state driven */}
      {teamVideoEnabled && teamBackgroundVideo && (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ zIndex: -1 }}>
          <video
            src={teamBackgroundVideo}
            className="w-full h-full object-cover opacity-70 blur-[2px]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ minWidth: '100vw', minHeight: '100vh', objectFit: 'cover' }}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              video.play().catch(() => {
                setTimeout(() => video.play(), 1000);
              });
            }}
          />
        </div>
      )}
      
      <div className="team-responsive-container w-full relative z-10" style={{ marginTop: '-100px' }}>
        <div className="flex flex-col items-center justify-start flex-1" style={{ paddingTop: isMobile ? '100px' : '155px' }}>
          <div className="text-center mb-8 md:mb-12">
            <h2 ref={titleRef} className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              {teamTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          <div className="relative w-full max-w-6xl px-4 sm:px-8 lg:px-12">
            <div ref={carouselRef} className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                width: `${totalSlides * 100}%`
              }}>
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className={`w-full flex-shrink-0 px-2 sm:px-4 ${isMobile ? 'flex justify-center' : 'grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8'}`} style={{ width: `${100 / totalSlides}%` }}>
                    {teamMembers.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((member, index) => (
                      <div key={index} className={`group p-2 sm:p-3 lg:p-4 ${isMobile ? 'w-full max-w-sm mx-auto' : ''}`}>
                        <div 
                          onClick={() => openMemberProfile(member)}
                          className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-50'} shadow-md hover:shadow-xl`} 
                          style={{ height: '420px' }}
                        >
                          <div className="h-48 relative overflow-hidden">
                            {member.image ? (
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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

      <Dialog open={isProfileOpen} onOpenChange={closeMemberProfile}>
        <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${isDark ? 'bg-black text-white border-white/20' : 'bg-white text-black'}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedMember?.image ? (
                <img src={selectedMember.image} alt={selectedMember?.name} className="w-12 h-12 rounded-full object-cover" />
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
            {selectedMember?.image && (
              <div className="flex justify-center">
                <img src={selectedMember.image} alt={selectedMember.name} className="w-48 h-48 rounded-lg object-cover shadow-lg" />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User size={18} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                <span className="font-medium">Nome:</span>
                <span>{selectedMember?.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail size={18} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                <span className="font-medium">E-mail:</span>
                <a href={`mailto:${selectedMember?.email}`} className={`hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
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
