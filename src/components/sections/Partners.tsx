
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { teamMembers, pageTexts, isLoading } = useAdminData();

  useEffect(() => {
    if (isLoading || !teamMembers.length) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });
    
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [teamMembers, isLoading]);

  if (isLoading) {
    return (
      <section id="socios" className={`min-h-screen flex flex-col justify-center py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className="flex justify-center items-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div>
      </section>
    );
  }

  // Resumir o texto do Dr. Enzo Trombela
  const getTeamMemberDescription = (member: any) => {
    if (member.name === 'Dr. Enzo Trombela') {
      return 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Vice-Presidente Jovem da CEDPC – OAB/GO. Presidente Científico da Força da Advocacia. Sócio fundador especializado em direito civil, empresarial e contratual.';
    }
    return member.description;
  };

  return (
    <section 
      id="socios"
      ref={sectionRef}
      className={`min-h-screen py-10 px-6 md:px-16 lg:px-24 relative ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} flex flex-col justify-center`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 
          ref={titleRef}
          className={`text-3xl md:text-4xl lg:text-5xl mb-8 font-canela text-center ${isDark ? 'text-white' : 'text-black'}`}
        >
          {pageTexts.teamTitle}
        </h2>
        
        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {teamMembers.map((partner) => (
                <CarouselItem key={partner.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className={`${isDark ? 'bg-black/80 border border-white/10' : 'bg-white/80 border border-black/10'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 h-full`}>
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden flex-shrink-0 border-2 border-white/20">
                          <img 
                            src={partner.image} 
                            alt={partner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className={`text-lg md:text-xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                            {partner.name}
                          </h3>
                          <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            {partner.title} - {partner.oab}
                          </p>
                          <a 
                            href={`mailto:${partner.email}`} 
                            className={`text-xs hover:underline ${isDark ? 'text-white' : 'text-black'} block mb-3`}
                          >
                            {partner.email}
                          </a>
                          <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                            {getTeamMemberDescription(partner)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`} />
            <CarouselNext className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`} />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Partners;
