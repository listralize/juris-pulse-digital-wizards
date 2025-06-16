
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '../ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [heroTitle, setHeroTitle] = useState('Escritório de Advocacia');
  const [heroSubtitle, setHeroSubtitle] = useState('Soluções jurídicas com excelência e compromisso');
  const [whatsappNumber, setWhatsappNumber] = useState('5562994594496');

  // Carregar dados do Supabase
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Carregar textos do hero
        const { data: settings } = await supabase
          .from('site_settings')
          .select('hero_title, hero_subtitle')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Carregar WhatsApp
        const { data: contact } = await supabase
          .from('contact_info')
          .select('whatsapp')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          console.log('🎯 Hero: Dados carregados do Supabase:', settings);
          setHeroTitle(settings.hero_title || 'Escritório de Advocacia');
          setHeroSubtitle(settings.hero_subtitle || 'Soluções jurídicas com excelência e compromisso');
        }

        if (contact?.whatsapp) {
          console.log('📱 Hero: WhatsApp carregado:', contact.whatsapp);
          setWhatsappNumber(contact.whatsapp);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados do Hero:', error);
      }
    };

    loadHeroData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🎯 Hero: Recebendo atualização de textos:', event.detail);
      const { heroTitle: newTitle, heroSubtitle: newSubtitle } = event.detail;
      
      if (newTitle !== undefined) setHeroTitle(newTitle);
      if (newSubtitle !== undefined) setHeroSubtitle(newSubtitle);
    };

    const handleContactUpdate = (event: CustomEvent) => {
      console.log('📱 Hero: Recebendo atualização de contato:', event.detail);
      if (event.detail.whatsapp) {
        setWhatsappNumber(event.detail.whatsapp);
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    window.addEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
      window.removeEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    try {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    } catch (error) {
      console.error('❌ Erro na animação Hero:', error);
    }
  }, [heroTitle, heroSubtitle]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de falar com um advogado.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 
          ref={titleRef}
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 font-canela leading-tight ${isDark ? 'text-white' : 'text-black'}`}
        >
          {heroTitle}
        </h1>
        
        <p 
          ref={subtitleRef}
          className={`text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 md:mb-12 font-satoshi leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {heroSubtitle}
        </p>

        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handleWhatsAppClick}
            size="lg"
            className={`group font-satoshi text-lg px-8 py-6 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Fale Conosco
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="lg"
            className={`font-satoshi text-lg px-8 py-6 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
          >
            Saiba Mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
