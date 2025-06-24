
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import ContactInfo from '../contact/ContactInfo';
import LocationMap from '../contact/LocationMap';
import UnifiedContactForm from '../contact/UnifiedContactForm';

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Estados para título e subtítulo da página de contato
  const [contactTitle, setContactTitle] = useState('Entre em Contato');
  const [contactSubtitle, setContactSubtitle] = useState('Estamos prontos para ajudá-lo com suas questões jurídicas');

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadContactPageData = async () => {
      try {
        console.log('📞 Contact: Carregando dados iniciais da página...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Buscar dados da site_settings
        const { data: settings } = await supabase
          .from('site_settings')
          .select('contact_title, contact_subtitle')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('📞 Contact: Dados encontrados:', settings);
          setContactTitle(settings.contact_title || contactTitle);
          setContactSubtitle(settings.contact_subtitle || contactSubtitle);
        }
      } catch (error) {
        console.error('❌ Contact: Erro ao carregar dados da página:', error);
      }
    };

    loadContactPageData();
  }, []);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📞 Contact: Evento pageTextsUpdated recebido:', event.detail);
      
      const data = event.detail;
      
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

  return (
    <div className={`min-h-full w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <div className="px-6 md:px-16 lg:px-24 py-8 md:py-12">
        {/* Header da seção */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            {contactTitle}
          </h1>
          <p className={`text-lg md:text-xl font-satoshi max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {contactSubtitle}
          </p>
        </div>

        {/* Grid de conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Coluna 1: Informações de Contato */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>

          {/* Coluna 2: Mapa */}
          <div className="lg:col-span-1">
            <LocationMap />
          </div>

          {/* Coluna 3: Formulário */}
          <div className="lg:col-span-1">
            <UnifiedContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
