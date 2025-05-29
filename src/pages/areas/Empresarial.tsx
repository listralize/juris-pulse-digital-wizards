
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Building, FileText, Users, Shield, TrendingUp, Briefcase } from 'lucide-react';

const EmpresarialPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Constituição e Estruturação",
      icon: <Building className="w-8 h-8" />,
      description: "Criação e estruturação jurídica de empresas com foco estratégico e proteção patrimonial.",
      services: [
        {
          name: "Constituição e Estruturação de Empresas",
          description: "Arquitetamos seu império desde a fundação, garantindo que cada cláusula seja uma peça estratégica no plano de dominação de mercado.",
          path: "/servicos/constituicao-empresas"
        },
        {
          name: "Reestruturação Societária",
          description: "Governamos as relações internas, protegendo seu legado e garantindo a continuidade do poder.",
          path: "/servicos/reestruturacao-societaria"
        }
      ]
    },
    {
      title: "Contratos e Negociações",
      icon: <FileText className="w-8 h-8" />,
      description: "Elaboração e negociação de contratos empresariais estratégicos e blindagem jurídica.",
      services: [
        {
          name: "Contratos Empresariais",
          description: "Forjamos seus acordos como armas estratégicas, dominando negociações e garantindo execução impecável.",
          path: "/servicos/contratos-empresariais"
        },
        {
          name: "Propriedade Intelectual",
          description: "Seu gênio criativo é ouro. Blindamos suas inovações e as transformamos em fonte de receita.",
          path: "/servicos/propriedade-intelectual"
        }
      ]
    },
    {
      title: "Fusões e Expansão",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Operações de fusões, aquisições e expansão empresarial com visão estratégica.",
      services: [
        {
          name: "Fusões e Aquisições",
          description: "Orquestramos sua expansão como um golpe de mestre, garantindo domínio de mercado.",
          path: "/servicos/fusoes-aquisicoes"
        }
      ]
    },
    {
      title: "Governança e Compliance",
      icon: <Shield className="w-8 h-8" />,
      description: "Implementação de práticas de governança corporativa e programas de compliance.",
      services: [
        {
          name: "Governança Corporativa",
          description: "Implementamos práticas de governança que não apenas atendem regulamentações, mas criam vantagem competitiva.",
          path: "/servicos/governanca-corporativa"
        },
        {
          name: "Compliance Empresarial",
          description: "Antecipamos riscos e transformamos conformidade em vantagem competitiva.",
          path: "/servicos/compliance-empresarial"
        }
      ]
    },
    {
      title: "Contencioso Empresarial",
      icon: <Briefcase className="w-8 h-8" />,
      description: "Resolução estratégica de conflitos empresariais e proteção de ativos corporativos.",
      services: [
        {
          name: "Contencioso Empresarial",
          description: "A batalha é nossa, a vitória é sua. Conflitos são resolvidos com precisão cirúrgica e domínio estratégico.",
          path: "/servicos/contencioso-empresarial"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Empresarial"
      description="No tabuleiro de xadrez do mundo corporativo, onde cada movimento pode definir o destino de um império, a mediocridade não é uma opção. Empresas não buscam apenas advogados; buscam estrategistas, negociadores implacáveis e parceiros que transformam desafios em vitórias."
      currentArea="empresarial"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            🏢 Serviços Jurídicos em Direito Empresarial
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em todas as esferas do Direito Empresarial, desde constituição e estruturação até fusões e aquisições, garantindo crescimento seguro e estratégico para seu negócio.
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

export default EmpresarialPage;
