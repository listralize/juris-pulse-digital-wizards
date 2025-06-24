
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

  // Carregar dados iniciais do Supabase da tabela site_settings
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('📞 Contact: Carregando dados iniciais da tabela site_settings...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('contact_title, contact_subtitle')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('📞 Contact: Dados carregados do Supabase site_settings:', settings);
          if (settings.contact_title) {
            console.log('📞 Contact: Definindo título inicial:', settings.contact_title);
            setContactTitle(settings.contact_title);
          }
          if (settings.contact_subtitle) {
            console.log('📞 Contact: Definindo subtítulo inicial:', settings.contact_subtitle);
            setContactSubtitle(settings.contact_subtitle);
          }
        } else {
          console.log('📞 Contact: Nenhuma configuração encontrada na site_settings, usando defaults');
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
      
      // Atualizar dados diretamente dos campos de contato
      if (data.contactTitle !== undefined) {
        console.log('📞 Contact: Atualizando título de:', contactTitle, 'para:', data.contactTitle);
        setContactTitle(data.contactTitle);
      }
      
      if (data.contactSubtitle !== undefined) {
        console.log('📞 Contact: Atualizando subtítulo de:', contactSubtitle, 'para:', data.contactSubtitle);
        setContactSubtitle(data.contactSubtitle);
      }
    };

    // Escutar evento geral de atualização de textos das páginas
    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, [contactTitle, contactSubtitle]);
  
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

  // Log para debug
  console.log('📞 Contact: Renderizando com título:', contactTitle, 'e subtítulo:', contactSubtitle);

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
              <UnifiedContactForm darkBackground={isDark} pageId="contato" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
