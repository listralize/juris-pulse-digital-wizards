
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { UnifiedContactForm } from '../contact/UnifiedContactForm';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Estados para textos editáveis via admin
  const [contactTitle, setContactTitle] = useState('Fale Conosco');
  const [contactSubtitle, setContactSubtitle] = useState('Estamos prontos para ajudar você');

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadContactData = async () => {
      try {
        console.log('📞 Contact: Carregando dados iniciais...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: settings } = await supabase
          .from('site_settings')
          .select('contact_title, contact_subtitle')
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

    loadContactData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📞 Contact: Evento pageTextsUpdated recebido:', event.detail);
      
      const data = event.detail;
      
      if (data.contactTitle !== undefined) {
        console.log('📞 Contact: Atualizando título para:', data.contactTitle);
        setContactTitle(data.contactTitle);
      }
      
      if (data.contactSubtitle !== undefined) {
        console.log('📞 Contact: Atualizando subtítulo para:', data.contactSubtitle);
        setContactSubtitle(data.contactSubtitle);
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      sectionRef.current?.querySelector('.contact-form-container'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.contact-form-container'),
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contato" 
      className={`py-16 md:py-24 px-4 md:px-16 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className={`text-3xl md:text-4xl lg:text-5xl mb-4 font-canela ${isDark ? 'text-white' : 'text-black'}`}
          >
            {contactTitle}
          </h2>
          <p 
            ref={subtitleRef}
            className={`text-lg md:text-xl font-satoshi ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {contactSubtitle}
          </p>
        </div>
        
        <div className="contact-form-container">
          <UnifiedContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
