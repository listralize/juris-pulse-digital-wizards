
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import UnifiedContactForm from '../contact/UnifiedContactForm';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';

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
        const { data: settings } = await supabase
          .from('site_settings')
          .select('contact_title, contact_subtitle')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('📞 Contact: Dados carregados:', settings);
          if (settings.contact_title) {
            setContactTitle(settings.contact_title);
          }
          if (settings.contact_subtitle) {
            setContactSubtitle(settings.contact_subtitle);
          }
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
      
      if (data && typeof data === 'object') {
        if (data.contactTitle !== undefined) {
          console.log('📞 Contact: Atualizando título para:', data.contactTitle);
          setContactTitle(data.contactTitle);
        }
        
        if (data.contactSubtitle !== undefined) {
          console.log('📞 Contact: Atualizando subtítulo para:', data.contactSubtitle);
          setContactSubtitle(data.contactSubtitle);
        }
      }
    };

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
      className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} py-16 px-6 md:px-16 lg:px-24`}
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {contactTitle}
          </h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-white/70' : 'text-black/70'}`}>
            {contactSubtitle}
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12"
        >
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
              <LocationMap />
            </div>
            
            <div className={`p-8 rounded-lg border ${
              isDark 
                ? 'bg-black/50 border-white/10' 
                : 'bg-white/90 border-gray-200 shadow-sm'
            }`}>
              <ContactInfo />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className={`p-8 rounded-lg border ${
              isDark 
                ? 'bg-black/50 border-white/10' 
                : 'bg-white/90 border-gray-200 shadow-sm'
            }`}>
              <UnifiedContactForm darkBackground={isDark} pageId="contato" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
