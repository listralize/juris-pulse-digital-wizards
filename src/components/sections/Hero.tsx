
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '../ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [heroTitle, setHeroTitle] = useState('Escritório de Advocacia');
  const [heroSubtitle, setHeroSubtitle] = useState('Soluções jurídicas com excelência e compromisso');
  const [whatsappNumber, setWhatsappNumber] = useState('5562994594496');
  const [primaryButtonText, setPrimaryButtonText] = useState('Fale Conosco');
  const [secondaryButtonText, setSecondaryButtonText] = useState('Saiba Mais');
  const [primaryButtonLink, setPrimaryButtonLink] = useState('');
  const [secondaryButtonLink, setSecondaryButtonLink] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  // Carregar dados do Supabase
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Carregar textos do hero
        const { data: settings } = await supabase
          .from('site_settings')
          .select('hero_title, hero_subtitle, hero_background_image, hero_primary_button_text, hero_secondary_button_text, hero_primary_button_link, hero_secondary_button_link')
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
          setBackgroundImage(settings.hero_background_image || '');
          setPrimaryButtonText(settings.hero_primary_button_text || 'Fale Conosco');
          setSecondaryButtonText(settings.hero_secondary_button_text || 'Saiba Mais');
          setPrimaryButtonLink(settings.hero_primary_button_link || '');
          setSecondaryButtonLink(settings.hero_secondary_button_link || '');
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
      const { 
        heroTitle: newTitle, 
        heroSubtitle: newSubtitle,
        heroPrimaryButtonText: newPrimaryText,
        heroSecondaryButtonText: newSecondaryText,
        heroPrimaryButtonLink: newPrimaryLink,
        heroSecondaryButtonLink: newSecondaryLink,
        heroBackgroundImage: newBgImage
      } = event.detail;
      
      if (newTitle !== undefined) setHeroTitle(newTitle);
      if (newSubtitle !== undefined) setHeroSubtitle(newSubtitle);
      if (newPrimaryText !== undefined) setPrimaryButtonText(newPrimaryText);
      if (newSecondaryText !== undefined) setSecondaryButtonText(newSecondaryText);
      if (newPrimaryLink !== undefined) setPrimaryButtonLink(newPrimaryLink);
      if (newSecondaryLink !== undefined) setSecondaryButtonLink(newSecondaryLink);
      if (newBgImage !== undefined) setBackgroundImage(newBgImage);
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

      // Efeito de parallax no banner apenas se houver imagem de fundo
      if (bannerRef.current && backgroundImage) {
        gsap.set(bannerRef.current, { 
          backgroundPosition: 'center 20%',
          scale: 1.1
        });
        
        gsap.to(bannerRef.current, {
          backgroundPosition: 'center 80%',
          scale: 1,
          duration: 20,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
      }

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
  }, [heroTitle, heroSubtitle, backgroundImage]);

  const handlePrimaryButtonClick = () => {
    if (primaryButtonLink) {
      if (primaryButtonLink.startsWith('http') || primaryButtonLink.startsWith('mailto:') || primaryButtonLink.startsWith('tel:')) {
        window.open(primaryButtonLink, '_blank');
      } else {
        const element = document.getElementById(primaryButtonLink.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Default WhatsApp behavior
      const message = encodeURIComponent('Olá! Gostaria de falar com um advogado.');
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
  };

  const handleSecondaryButtonClick = () => {
    if (secondaryButtonLink) {
      if (secondaryButtonLink.startsWith('http') || secondaryButtonLink.startsWith('mailto:') || secondaryButtonLink.startsWith('tel:')) {
        window.open(secondaryButtonLink, '_blank');
      } else {
        const element = document.getElementById(secondaryButtonLink.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Default scroll to contact behavior
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      ref={bannerRef}
      className={`relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-24 ${isDark ? 'bg-black' : 'bg-white'} overflow-hidden`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para melhor legibilidade */}
      {backgroundImage && (
        <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-white/60'}`} />
      )}
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 
          ref={titleRef}
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 font-canela leading-tight ${isDark ? 'text-white' : 'text-black'} drop-shadow-lg`}
        >
          {heroTitle}
        </h1>
        
        <p 
          ref={subtitleRef}
          className={`text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 md:mb-12 font-satoshi leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'} drop-shadow-md`}
        >
          {heroSubtitle}
        </p>

        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handlePrimaryButtonClick}
            size="lg"
            className={`group font-satoshi text-lg px-8 py-6 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} shadow-lg`}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {primaryButtonText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={handleSecondaryButtonClick}
            variant="outline"
            size="lg"
            className={`font-satoshi text-lg px-8 py-6 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} shadow-lg backdrop-blur-sm`}
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
