
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ExternalLink, MessageSquare, FileText, Clock } from 'lucide-react';
import { PageTexts } from '../../types/adminTypes';

interface ClientAreaProps {
  pageTexts: PageTexts;
}

const ClientArea: React.FC<ClientAreaProps> = ({ pageTexts: initialPageTexts }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [pageTexts, setPageTexts] = useState(initialPageTexts);

  // Escutar por atualizações dos pageTexts
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🎯 ClientArea: Recebendo atualização de pageTexts:', event.detail);
      setPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  // Atualizar quando props mudarem
  useEffect(() => {
    setPageTexts(initialPageTexts);
  }, [initialPageTexts]);

  const clientAreaTitle = pageTexts?.clientAreaTitle || 'Área do Cliente';
  const clientAreaDescription = pageTexts?.clientAreaDescription || 'Acesse nossa plataforma exclusiva para clientes e acompanhe seus processos';
  const clientPortalLink = pageTexts?.clientPortalLink || '#';
  const whatsappNumber = pageTexts?.contactTexts?.whatsapp || '5562994594496';

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Documentos",
      description: "Acesse todos os seus documentos processuais de forma segura"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Acompanhamento",
      description: "Monitore o andamento dos seus processos em tempo real"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Comunicação",
      description: "Mantenha contato direto com nossa equipe jurídica"
    }
  ];

  return (
    <section className={`py-16 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {clientAreaTitle}
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {clientAreaDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className={`text-center ${isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-gray-200'}`}>
              <CardContent className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <div className={isDark ? 'text-white' : 'text-black'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open(clientPortalLink, '_blank')}
              className="inline-flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Acessar Portal do Cliente
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}`, '_blank')}
              className="inline-flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Primeiro Acesso - WhatsApp
            </Button>
          </div>
          
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Novo cliente? Entre em contato pelo WhatsApp para receber suas credenciais de acesso
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientArea;
