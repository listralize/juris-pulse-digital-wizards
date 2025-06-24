
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Estado local para textos
  const [aboutTitle, setAboutTitle] = useState('Sobre Nós');
  const [aboutDescription, setAboutDescription] = useState('Somos um escritório de advocacia comprometido com a excelência jurídica e o atendimento personalizado. Nossa equipe de profissionais altamente qualificados está dedicada a oferecer soluções estratégicas e eficazes para nossos clientes.');

  // Carregar dados iniciais e escutar atualizações
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        const { data: settings } = await supabase
          .from('site_settings')
          .select('about_title, about_description')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          if (settings.about_title) setAboutTitle(settings.about_title);
          if (settings.about_description) setAboutDescription(settings.about_description);
        }
      } catch (error) {
        console.error('❌ About: Erro ao carregar dados:', error);
      }
    };

    loadInitialData();

    const handlePageTextsUpdate = (event: CustomEvent) => {
      const data = event.detail;
      if (data && typeof data === 'object') {
        if (data.aboutTitle !== undefined) setAboutTitle(data.aboutTitle);
        if (data.aboutDescription !== undefined) setAboutDescription(data.aboutDescription);
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);
  
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      [contentRef.current, imageRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.4"
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-24 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}
          >
            {aboutTitle}
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="space-y-8">
            <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}>
              {aboutDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className={`text-lg leading-relaxed ${isDark ? 'text-white/80' : 'text-black/70'}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="gri
d grid-cols-2 gap-8 pt-8">
              <div className="text-center">
                <div className={`text-4xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  15+
                </div>
                <div className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                  Anos de Experiência
                </div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  1000+
                </div>
                <div className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                  Casos Resolvidos
                </div>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <div className={`aspect-square rounded-2xl overflow-hidden shadow-2xl ${
              isDark ? 'bg-white/10' : 'bg-black/5'
            }`}>
              <img 
                src="/lovable-uploads/aa4517a5-ce63-4dcf-aebf-16a5da902506.png"
                alt="Sobre o escritório"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Elemento decorativo */}
            <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 ${
              isDark ? 'bg-white' : 'bg-black'
            }`}></div>
            <div className={`absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20 ${
              isDark ? 'bg-white' : 'bg-black'
            }`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
