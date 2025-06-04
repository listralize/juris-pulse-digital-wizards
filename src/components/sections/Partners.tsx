
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { teamMembers, isLoading } = useSupabaseDataNew();

  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      listRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );
    
    return () => {
      tl.kill();
    };
  }, [isLoading]);

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
      className={`h-full w-full py-6 px-4 md:py-8 md:px-6 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 
          ref={titleRef}
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 md:mb-12 text-center font-canela ${isDark ? 'text-white' : 'text-black'}`}
        >
          Nossa Equipe
        </h2>
        
        <div ref={listRef} className="space-y-6 md:space-y-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`${isDark ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg`}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full overflow-hidden bg-gray-200">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-3xl md:text-4xl ${isDark ? 'bg-white/10' : 'bg-gray-300'}`}>
                      👤
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-xl md:text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-base md:text-lg mb-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                    {member.title || 'Advogado'}
                  </p>
                  <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
