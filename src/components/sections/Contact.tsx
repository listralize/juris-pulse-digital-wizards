import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import UnifiedContactForm from '../contact/UnifiedContactForm';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Estado local para receber atualizações em tempo real
  const [contactTitle, setContactTitle] = useState('Entre em Contato');
  const [contactSubtitle, setContactSubtitle] = useState('Estamos prontos para ajudá-lo');

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('📞 Contact: Carregando dados iniciais...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('📞 Contact: Dados carregados do Supabase:', settings);
          if (settings.contact_title) setContactTitle(settings.contact_title);
          if (settings.contact_subtitle) setContactSubtitle(settings.contact_subtitle);
        }
      } catch (error) {
        console.error('❌ Contact: Erro ao carregar dados:', error);
      }
    };

    loadInitialData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📞 Contact: Evento pageTextsUpdated recebido:', event.detail);
      
      const data = event.detail;
      
      if (data.contactTitle) {
        console.log('📞 Contact: Atualizando título para:', data.contactTitle);
        setContactTitle(data.contactTitle);
      }
      
      if (data.contactSubtitle) {
        console.log('📞 Contact: Atualizando subtítulo para:', data.contactSubtitle);
        setContactSubtitle(data.contactSubtitle);
      }
    };

    // Escutar evento geral
    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} py-4 px-4`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-6 text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            {contactTitle}
          </h2>
          <div className={`w-20 h-1 mx-auto mt-2 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
          <p className={`mt-2 text-base md:text-lg lg:text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {contactSubtitle}
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className="flex flex-col lg:grid lg:grid-cols-5 gap-4"
        >
          <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
            <div className="w-full">
              <div className="h-40 lg:h-48">
                <LocationMap />
              </div>
            </div>
            
            <div className="w-full">
              <ContactInfo />
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="w-full">
              <UnifiedContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
