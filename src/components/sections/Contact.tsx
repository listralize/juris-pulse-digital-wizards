
import React, { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UnifiedContactForm from '../contact/UnifiedContactForm';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import Footer from './Footer';
import { useTheme } from '../ThemeProvider';
import NeuralBackground from '../NeuralBackground';
import { useIsMobile, useIsTablet } from '../../hooks/use-mobile';
import { supabase } from '../../integrations/supabase/client';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Estado local para receber atualizações em tempo real
  const [contactTitle, setContactTitle] = useState('Fale Conosco');
  const [contactSubtitle, setContactSubtitle] = useState('Estamos prontos para ajudá-lo');

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('📞 Contact: Carregando dados iniciais...');
        

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
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });
    
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
    <div 
      className={`w-full relative ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{
        minHeight: 'auto',
        height: 'auto',
        maxHeight: 'none',
        overflow: 'visible',
        margin: 0,
        padding: 0
      }}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
      <div 
        ref={sectionRef} 
        className="w-full relative z-10"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minHeight: 'auto',
          margin: 0,
          padding: isMobile ? '2rem 1rem 0 1rem' : isTablet ? '3rem 2rem 0 2rem' : '4rem 1.5rem 0 1.5rem'
        }}
      >
        <div className={`mx-auto w-full ${
          isMobile ? 'max-w-lg' : isTablet ? 'max-w-4xl' : 'max-w-4xl'
        }`}>
          <div 
            ref={contentRef} 
            className={`gap-3 ${
              isMobile ? 'grid grid-cols-1' : isTablet ? 'grid grid-cols-1 lg:grid-cols-3' : 'grid grid-cols-1 lg:grid-cols-5'
            }`}
          >
            <div className={`space-y-3 order-2 lg:order-1 ${
              isMobile ? '' : isTablet ? 'lg:col-span-1' : 'lg:col-span-2'
            }`}>
              <div className={`rounded-lg border shadow-md ${
                isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'
              } ${isTablet ? 'p-2' : 'p-1'}`}>
                <div className={`${isTablet ? 'h-32' : 'h-24 lg:h-32'}`}>
                  <LocationMap />
                </div>
              </div>
              
              <div className={`rounded-lg border shadow-md ${
                isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'
              } ${isTablet ? 'p-4' : 'p-3'}`}>
                <ContactInfo />
              </div>
            </div>
            
            <div className={`order-1 lg:order-2 ${
              isMobile ? '' : isTablet ? 'lg:col-span-2' : 'lg:col-span-3'
            }`} style={{ zIndex: 20, position: 'relative' }}>
              <div className={`rounded-lg border shadow-md ${
                isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'
              } ${isTablet ? 'p-4' : 'p-3'}`}>
                <UnifiedContactForm darkBackground={isDark} pageId="contato" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer sempre visível no mobile/tablet - COM espaçamento adequado */}
      {(isMobile || isTablet) && (
        <div 
          className="w-full" 
          style={{ 
            margin: isTablet ? '2rem 0 0 0' : '0',
            padding: '0'
          }}
        >
          <Footer respectTheme={true} />
        </div>
      )}
    </div>
  );
};

export default Contact;
