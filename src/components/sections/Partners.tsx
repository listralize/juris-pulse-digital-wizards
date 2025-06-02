import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Button } from '../ui/button';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const { teamMembers, pageTexts, isLoading } = useAdminData();
  const isDark = theme === 'dark';

  // Navigation function to next section
  const goToNextSection = () => {
    // Navigate to cliente section
    if (history.pushState) {
      history.pushState(null, '', '#cliente');
    } else {
      window.location.hash = 'cliente';
    }
    // Trigger hash change event
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      carouselRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );
    
    return () => {
      tl.kill();
    };
  }, [isLoading]);

  // Add scroll event listener for section navigation
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      
      // If scrolled to bottom, allow navigation to next section
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        // Add a small buffer zone at the bottom for easier navigation
        const nextButton = document.getElementById('next-section-button');
        if (nextButton) {
          nextButton.style.opacity = '1';
          nextButton.style.transform = 'scale(1.05)';
        }
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('scroll', handleScroll);
      return () => section.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  return (
    <div 
      ref={sectionRef}
      data-allow-scroll="true"
      className={`min-h-screen py-10 px-6 md:px-16 lg:px-24 relative ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} flex flex-col justify-start overflow-auto`}
      style={{ 
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: '100px' // Extra space for navigation
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 
          ref={titleRef}
          className={`text-4xl md:text-5xl lg:text-6xl mb-12 text-center font-canela ${isDark ? 'text-white' : 'text-black'}`}
        >
          {pageTexts.teamTitle}
        </h2>
        
        <div ref={carouselRef} className="px-12" data-allow-scroll="true">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {teamMembers.map((member, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className={`p-6 h-full ${isDark ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col`}>
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center text-4xl ${isDark ? 'bg-white/10' : 'bg-gray-300'}`}>
                          👤
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center flex-1 flex flex-col">
                      <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        {member.name}
                      </h3>
                      <p className={`text-sm mb-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                        {member.position}
                      </p>
                      <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                        {member.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Navigation button to next section */}
        <div ref={buttonRef} className="flex justify-center mt-12">
          <Button
            id="next-section-button"
            onClick={goToNextSection}
            variant="outline"
            className={`px-8 py-3 text-lg transition-all duration-300 ${
              isDark 
                ? 'bg-transparent border-white text-white hover:bg-white hover:text-black' 
                : 'bg-transparent border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            Próxima Seção: Área do Cliente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
