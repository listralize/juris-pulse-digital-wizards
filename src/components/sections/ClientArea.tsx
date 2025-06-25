
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Lock, ArrowRight, MessageSquare, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ClientArea = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();
  const { pageTexts, isLoading } = useAdminData();
  const isDark = theme === 'dark';
  
  // Estado local para receber atualizações em tempo real
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);

  // Atualizar quando pageTexts muda
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📱 ClientArea: Recebendo atualização de textos:', event.detail);
      setLocalPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);
  
  useEffect(() => {
    if (isLoading) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scaleY: 0.9 },
      {
        opacity: 1,
        scaleY: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      button1Ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: button1Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      button2Ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: button2Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <section className={`${isDark ? 'bg-black' : 'bg-white'} h-screen flex items-center justify-center`}>
        <div className="relative">
          <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${isDark ? 'border-white/20' : 'border-black/20'}`}></div>
          <div className={`absolute inset-0 w-8 h-8 border-2 border-transparent border-t-current rounded-full animate-spin ${isDark ? 'text-white' : 'text-black'}`}></div>
        </div>
      </section>
    );
  }

  const whatsappNumber = localPageTexts?.contactTexts?.whatsapp || '5562994594496';
  const clientPortalLink = localPageTexts?.clientPortalLink || '#';
  const clientAreaTitle = localPageTexts?.clientAreaTitle || 'Área do Cliente';
  const clientAreaDescription = localPageTexts?.clientAreaDescription || 'Acesse sua área restrita para acompanhar seus processos';

  return (
    <section 
      id="cliente" 
      className={`${isDark ? 'bg-black' : 'bg-white'} h-screen flex flex-col overflow-hidden relative`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
        {/* Container centralizado com padrão uniforme */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Header padronizado - mesmo padrão de todas as outras seções */}
          <div className="text-center mb-6">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {clientAreaTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>
          
          {/* Content Grid - padronizado com ordem invertida */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
            {/* Imagem agora na primeira coluna (esquerda) */}
            <div ref={imageRef} className="flex justify-center items-center order-1 lg:order-1">
              <div className="relative bg-black rounded-2xl p-6">
                {/* Label de Destaque */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-wide">EXCLUSIVO PARA CLIENTES ST PRIME</span>
                  </div>
                </div>
                
                <img 
                  src="/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png"
                  alt="Área do Cliente em Smartphone" 
                  className="w-full max-w-sm h-auto object-contain"
                />
              </div>
            </div>
            
            {/* Conteúdo agora na segunda coluna (direita) */}
            <div className="flex flex-col justify-center order-2 lg:order-2">
              <p 
                ref={textRef}
                className={`text-base md:text-lg leading-relaxed mb-6 font-satoshi ${isDark ? 'text-white/80' : 'text-black/80'}`}
              >
                {clientAreaDescription}
              </p>
              
              <div className="flex flex-col space-y-4">
                <a 
                  ref={button1Ref}
                  href={clientPortalLink} 
                  className={`group relative overflow-hidden rounded-lg px-6 py-3 transition-all duration-300 hover:shadow-lg flex items-center justify-center text-sm md:text-base ${
                    isDark 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Lock className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-medium">Acessar minha área</span>
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                
                <a 
                  ref={button2Ref}
                  href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-lg border px-6 py-3 transition-all duration-300 hover:shadow-lg flex items-center justify-center text-sm md:text-base ${
                    isDark 
                      ? 'border-white/20 text-white hover:bg-white/10' 
                      : 'border-black/20 text-black hover:bg-black/5'
                  }`}
                >
                  <MessageSquare className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-medium">Primeiro acesso via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
