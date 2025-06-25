
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import NeuralBackground from '../NeuralBackground';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const { pageTexts, isLoading } = useSupabaseDataNew();
  const { categories: lawCategories } = useSupabaseLawCategories();
  
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);

  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🦶 Footer: Recebendo atualização de textos:', event.detail);
      setLocalPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
    
    return () => {
      tl.kill();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  const contactInfo = {
    address: localPageTexts?.contactTexts?.address || "Rua Principal, 123 - Centro",
    phone: localPageTexts?.contactTexts?.phone || "(11) 9999-9999",
    email: localPageTexts?.contactTexts?.email || "contato@exemplo.com",
    hours: "Seg-Sex: 9h às 18h"
  };

  return (
    <div 
      ref={sectionRef}
      className={`h-full w-full py-8 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} relative`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div 
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={isDark ? "/lovable-uploads/d11e57cf-ddb3-4377-9caf-91e75503165b.png" : "/lovable-uploads/aa4517a5-ce63-4dcf-aebf-16a5da902506.png"}
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {localPageTexts?.footerTexts?.description || "Escritório de advocacia especializado em soluções jurídicas completas e personalizadas."}
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className={`p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className={`p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Áreas de Atuação */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              Áreas de Atuação
            </h3>
            <ul className="space-y-2">
              {lawCategories.slice(0, 6).map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => navigate(`/areas/${area.value}`)}
                    className={`text-sm hover:underline transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                  >
                    {area.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Úteis */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              Links Úteis
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className={`text-sm hover:underline transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                >
                  Blog Jurídico
                </button>
              </li>
              <li>
                <a href="#" className={`text-sm hover:underline transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm hover:underline transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm hover:underline transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                  LGPD
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              Contato
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {contactInfo.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {contactInfo.email}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {contactInfo.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-12 pt-8 border-t text-center ${isDark ? 'border-white/20 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
          <p className="text-sm">
            © {new Date().getFullYear()} {localPageTexts?.footerTexts?.companyName || "Escritório de Advocacia"}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
