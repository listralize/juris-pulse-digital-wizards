
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { FileText, Calendar, MessageCircle, Download, Shield, Clock } from 'lucide-react';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import NeuralBackground from '../NeuralBackground';

gsap.registerPlugin(ScrollTrigger);

const ClientArea = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { pageTexts, isLoading } = useSupabaseDataNew();
  
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);

  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('👤 ClientArea: Recebendo atualização de textos:', event.detail);
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
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 15, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6,
        stagger: 0.1 
      },
      "-=0.4"
    );
    
    return () => {
      tl.kill();
    };
  }, [isLoading]);

  const clientAreaServices = [
    {
      icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Documentos",
      description: "Acesse contratos, petições e documentos do seu processo",
      action: "Ver Documentos"
    },
    {
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Agenda",
      description: "Consulte audiências, prazos e compromissos importantes",
      action: "Ver Agenda"
    },
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Comunicação",
      description: "Converse diretamente com nossos advogados",
      action: "Enviar Mensagem"
    },
    {
      icon: <Download className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Downloads",
      description: "Baixe relatórios e documentos importantes",
      action: "Acessar Downloads"
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Segurança",
      description: "Ambiente 100% seguro para seus dados",
      action: "Sobre Segurança"
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Atualizações",
      description: "Receba notificações sobre o andamento do seu caso",
      action: "Ver Atualizações"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  const clientAreaTitle = localPageTexts?.clientAreaTitle || 'Área do Cliente';

  return (
    <div 
      ref={sectionRef}
      className={`h-full w-full py-4 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} relative`}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Header padronizado - mesma altura que outras páginas */}
          <div className="text-center mb-8 md:mb-12">
            <h2 
              ref={titleRef}
              className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}
            >
              {clientAreaTitle}
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
            <p className={`text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mt-4 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Gerencie seu processo de forma fácil e segura
            </p>
          </div>

          <div 
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full px-4"
          >
            {clientAreaServices.map((service, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm border ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30' 
                    : 'bg-white/80 hover:bg-white border-gray-200/60 hover:border-gray-400/60'
                } shadow-lg hover:shadow-xl`}
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col relative">
                  {/* Gradiente de hover overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ${
                    isDark ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
                  }`}></div>
                  
                  <div className={`mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 relative z-10 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {service.icon}
                  </div>
                  
                  <h3 className={`text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors relative z-10 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1 relative z-10 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {service.description}
                  </p>
                  
                  <Button 
                    variant="outline"
                    className={`w-full transition-all duration-300 group-hover:scale-105 relative z-10 ${
                      isDark 
                        ? 'border-white/20 hover:border-white/40 text-white hover:bg-white/10' 
                        : 'border-gray-300 hover:border-gray-400 text-black hover:bg-gray-50'
                    }`}
                  >
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 px-4">
            <Button 
              className={`px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDark 
                  ? 'bg-gradient-to-b from-white to-gray-100 text-black hover:shadow-white/25 hover:scale-105' 
                  : 'bg-gradient-to-b from-black to-gray-800 text-white hover:shadow-black/25 hover:scale-105'
              }`}
            >
              Fazer Login na Área do Cliente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientArea;
