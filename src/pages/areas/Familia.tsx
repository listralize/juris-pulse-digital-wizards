
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Users, Heart, Scale, FileText, Shield, Home } from 'lucide-react';

const Familia = () => {
  const { pageTexts, isLoading } = useAdminData();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  const serviceCategories = [
    {
      title: "Divórcio e Separação",
      icon: <Scale className="w-8 h-8" />,
      description: "Assessoria completa em processos de divórcio e separação, priorizando soluções amigáveis.",
      services: [
        {
          name: "Divórcio e Separação",
          description: "Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes.",
          path: "/servicos/divorcio"
        },
        {
          name: "União Estável",
          description: "Reconhecimento, dissolução e regulamentação de direitos em união estável.",
          path: "/servicos/uniao-estavel"
        }
      ]
    },
    {
      title: "Filhos e Guarda",
      icon: <Users className="w-8 h-8" />,
      description: "Proteção dos direitos das crianças e definição de arranjos de guarda justos.",
      services: [
        {
          name: "Guarda de Filhos",
          description: "Defesa dos melhores interesses das crianças em disputas de guarda, visitação e regulamentação de convivência.",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Pensão Alimentícia",
          description: "Ações de fixação, revisão e execução de pensão alimentícia para garantir o sustento adequado.",
          path: "/servicos/pensao-alimenticia"
        }
      ]
    },
    {
      title: "Adoção e Proteção",
      icon: <Heart className="w-8 h-8" />,
      description: "Suporte completo em processos de adoção e proteção de menores.",
      services: [
        {
          name: "Adoção",
          description: "Acompanhamento jurídico completo em processos de adoção nacional e internacional.",
          path: "/servicos/adocao"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title={pageTexts.familiaTitle}
      description={pageTexts.familiaDescription}
      currentArea="familia"
    >
      <div className="space-y-16">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            O Direito de Família é uma das áreas mais sensíveis e importantes do direito civil, 
            pois trata das relações familiares e dos aspectos mais íntimos da vida das pessoas. 
            Nossa equipe especializada oferece assessoria completa e humanizada para todas as 
            questões que envolvem as relações familiares.
          </p>
          
          <p className="text-lg leading-relaxed">
            Trabalhamos sempre priorizando o diálogo e a busca por soluções amigáveis, mas quando 
            necessário, oferecemos uma defesa técnica sólida e estratégica para proteger os direitos 
            e interesses de nossos clientes.
          </p>
        </div>

        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            👨‍👩‍👧‍👦 Serviços Jurídicos em Direito de Família
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada e humanizada em todas as questões familiares, sempre buscando soluções que preservem os vínculos e protejam os direitos de todos os envolvidos.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                {category.icon}
              </div>
              <div>
                <h3 className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, serviceIndex) => (
                <Card 
                  key={serviceIndex}
                  className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-6">
                    <h4 className={`text-lg font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                      {service.name}
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                      {service.description}
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                      Saiba mais →
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default Familia;
