
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
  const [contactTitle, setContactTitle] = useState('Fale Conosco');
  const [contactSubtitle, setContactSubtitle] = useState('Estamos prontos para ajudá-lo');

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('📞 Contact: Carregando dados iniciais...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Buscar primeiro na tabela site_settings
        const { data: settings } = await supabase
          .from('site_settings')
          .select('contact_title, contact_subtitle')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('📞 Contact: Dados carregados da site_settings:', settings);
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
      
      // Atualizar título e subtítulo de contato
      if (data.contactTitle !== undefined) {
        console.log('📞 Contact: Atualizando título:', data.contactTitle);
        setContactTitle(data.contactTitle);
      }
      
      if (data.contactSubtitle !== undefined) {
        console.log('📞 Contact: Atualizando subtítulo:', data.contactSubtitle);
        setContactSubtitle(data.contactSubtitle);
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
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className={`${isDark ? 'bg-neutral-950' : 'bg-gray-50'} py-12 px-4 md:px-8 lg:px-16`}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div ref={titleRef} className="mb-12 text-center">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-medium tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            {contactTitle}
          </h2>
          <div className={`w-16 h-0.5 mx-auto mb-4 ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-lg md:text-xl font-inter ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {contactSubtitle}
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className={`${isDark ? 'bg-neutral-900/50 border-white/10' : 'bg-white border-gray-200'} rounded-xl p-2 shadow-lg border backdrop-blur-sm`}>
              <div className="h-40 lg:h-48">
                <LocationMap />
              </div>
            </div>
            
            <div className={`${isDark ? 'bg-neutral-900/50 border-white/10' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-lg border backdrop-blur-sm`}>
              <ContactInfo />
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className={`${isDark ? 'bg-neutral-900/50 border-white/10' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-lg border backdrop-blur-sm`}>
              <UnifiedContactForm darkBackground={isDark} pageId="contato" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
