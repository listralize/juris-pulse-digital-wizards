
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { teamMembers, pageTexts, isLoading } = useSupabaseDataNew();
  
  // Estado local para receber atualizações em tempo real
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);

  // Atualizar quando pageTexts muda
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 Partners: Recebendo atualização de textos:', event.detail);
      setLocalPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  if (isLoading) {
    return (
      <section className={`py-12 ${isDark ? 'bg-neutral-950' : 'bg-gray-50'}`} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
          </div>
        </div>
      </section>
    );
  }

  const teamTitle = localPageTexts?.teamTitle || 'Nossa Equipe';

  return (
    <section 
      ref={sectionRef}
      className={`py-12 px-4 ${isDark ? 'bg-neutral-950' : 'bg-gray-50'}`} 
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-medium tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}
          >
            {teamTitle}
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-inter ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Conheça nossa equipe de profissionais especializados
          </p>
        </div>

        {teamMembers.length > 0 ? (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-1">
                {teamMembers.map((member, index) => (
                  <CarouselItem key={member.id || index} className="pl-1 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className={`h-full transition-all duration-300 hover:scale-105 ${
                        isDark 
                          ? 'bg-neutral-900/80 border-white/10 hover:border-white/30' 
                          : 'bg-white/80 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-48 md:h-56 object-cover"
                              onError={(e) => {
                                console.log('Image failed to load:', member.image);
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className={`w-full h-48 md:h-56 flex items-center justify-center text-6xl ${
                              isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-gray-200 text-gray-400'
                            }`}>
                              👤
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h3 className={`font-semibold text-lg md:text-xl mb-2 font-space-grotesk ${
                            isDark ? 'text-white' : 'text-black'
                          }`}>
                            {member.name}
                          </h3>
                          
                          <p className={`text-sm md:text-base font-medium mb-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {member.title || 'Advogado'}
                          </p>
                          
                          <p className={`text-sm line-clamp-3 font-inter ${
                            isDark ? 'text-gray-400' : 'text-gray-700'
                          }`}>
                            {member.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 md:-left-12" />
              <CarouselNext className="right-2 md:-right-12" />
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Em breve, informações sobre nossa equipe serão publicadas aqui.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
