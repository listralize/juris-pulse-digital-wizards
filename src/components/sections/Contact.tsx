import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import UnifiedContactForm from '../contact/UnifiedContactForm';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import Footer from './Footer';
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
    <div className="min-h-screen flex flex-col">
      <div 
        ref={sectionRef}
        className={`flex-1 w-full ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'} py-16 px-4 md:px-6 lg:px-24`}
      >
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef} className="mb-12 text-center">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              {contactTitle}
            </h2>
            <div className={`w-20 h-1 mx-auto mb-4 ${isDark ? 'bg-white/70' : 'bg-black/70'}`}></div>
            <p className={`text-base md:text-lg lg:text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>
              {contactSubtitle}
            </p>
          </div>
          
          <div 
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <div className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} rounded-lg p-1 shadow-lg border`}>
                <div className="h-48 lg:h-56">
                  <LocationMap />
                </div>
              </div>
              
              <div className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}>
                <ContactInfo />
              </div>
            </div>
            
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}>
                <UnifiedContactForm darkBackground={isDark} pageId="contato" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer sempre aparece na página de contato */}
      <Footer respectTheme={true} />
    </div>
  );
};

export default Contact;
