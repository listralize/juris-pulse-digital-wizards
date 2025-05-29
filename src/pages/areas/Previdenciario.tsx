
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Users, Heart, Calendar, TrendingUp, Shield, FileCheck } from 'lucide-react';

const PrevidenciarioPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Aposentadorias",
      icon: <Calendar className="w-8 h-8" />,
      description: "Assessoria completa para obtenção de diferentes modalidades de aposentadoria pelo INSS.",
      services: [
        {
          name: "Aposentadoria por Idade",
          description: "Benefício para trabalhadores que atingiram idade mínima e tempo de contribuição.",
          path: "/servicos/aposentadoria-idade"
        },
        {
          name: "Aposentadoria por Tempo de Contribuição",
          description: "Assessoria para aposentadoria por tempo de contribuição com regras de transição.",
          path: "/servicos/aposentadoria-tempo-contribuicao"
        },
        {
          name: "Aposentadoria por Invalidez",
          description: "Representação para trabalhadores permanentemente incapacitados.",
          path: "/servicos/aposentadoria-invalidez"
        }
      ]
    },
    {
      title: "Benefícios por Incapacidade",
      icon: <Heart className="w-8 h-8" />,
      description: "Representação em casos de incapacidade temporária ou permanente para o trabalho.",
      services: [
        {
          name: "Auxílio-Doença",
          description: "Representação para obtenção e manutenção de auxílio-doença.",
          path: "/servicos/auxilio-doenca"
        },
        {
          name: "Benefícios Previdenciários",
          description: "Assessoria geral para aposentadorias, pensões, auxílios e outros benefícios.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Benefícios Assistenciais",
      icon: <Users className="w-8 h-8" />,
      description: "Orientação para benefícios assistenciais e de proteção social.",
      services: [
        {
          name: "BPC/LOAS",
          description: "Assessoria para Benefício de Prestação Continuada para idosos e deficientes.",
          path: "/servicos/bpc-loas"
        }
      ]
    },
    {
      title: "Planejamento e Revisões",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Planejamento estratégico e revisão de benefícios previdenciários.",
      services: [
        {
          name: "Planejamento Previdenciário",
          description: "Estratégias personalizadas para otimizar sua futura aposentadoria.",
          path: "/servicos/planejamento-previdenciario"
        },
        {
          name: "Revisão da Vida Toda",
          description: "Revisão de benefícios para incluir contribuições anteriores a 1994.",
          path: "/servicos/revisao-vida-toda"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Previdenciário"
      description="Esta área lida com a seguridade social, incluindo benefícios como aposentadoria, pensões, auxílio-doença e assistência social. A ST te auxilia na obtenção desses benefícios e na resolução de questões relacionadas."
      currentArea="previdenciario"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            🏥 Serviços Jurídicos em Direito Previdenciário
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em todas as questões previdenciárias, desde a obtenção de benefícios até revisões e contencioso, garantindo seus direitos junto ao INSS e outras entidades previdenciárias.
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

export default PrevidenciarioPage;
