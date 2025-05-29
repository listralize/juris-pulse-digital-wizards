
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
      title: "Benefícios de Aposentadoria",
      icon: <Calendar className="w-8 h-8" />,
      description: "Assessoria completa para obtenção de diferentes modalidades de aposentadoria pelo INSS.",
      services: [
        {
          name: "Benefícios Previdenciários",
          description: "Assessoria na obtenção de aposentadorias por idade, tempo de contribuição, especial e por invalidez.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Planejamento Previdenciário",
          description: "Elaboração de estratégias personalizadas para maximizar os benefícios previdenciários futuros.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Benefícios por Incapacidade",
      icon: <Heart className="w-8 h-8" />,
      description: "Representação em casos de incapacidade temporária ou permanente para o trabalho.",
      services: [
        {
          name: "Benefícios por Incapacidade",
          description: "Assessoria para obtenção e manutenção de benefícios por incapacidade temporária ou permanente.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Auxílio-Doença",
          description: "Representação em casos de solicitação, prorrogação ou restabelecimento de auxílio-doença.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Benefícios aos Dependentes",
      icon: <Users className="w-8 h-8" />,
      description: "Orientação e representação para dependentes em processos de pensão e outros benefícios.",
      services: [
        {
          name: "Pensões",
          description: "Orientação e representação em processos de concessão de pensão por morte e outros benefícios a dependentes.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Benefícios Assistenciais",
          description: "Orientação sobre o BPC/LOAS e outros benefícios assistenciais para idosos e pessoas com deficiência.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Revisão e Contencioso",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Análise de benefícios concedidos e representação em litígios previdenciários.",
      services: [
        {
          name: "Revisão de Benefícios",
          description: "Análise e revisão de benefícios previdenciários já concedidos para correção de valores.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Contencioso Previdenciário",
          description: "Representação em litígios administrativos e judiciais contra o INSS e outras entidades previdenciárias.",
          path: "/servicos/beneficios-previdenciarios"
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
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                {category.icon}
              </div>
              <div className="text-center">
                <h3 className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {category.services.map((service, serviceIndex) => (
                <Card 
                  key={serviceIndex}
                  className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-6 text-center">
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
