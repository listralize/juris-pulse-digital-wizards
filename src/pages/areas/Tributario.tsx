
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Calculator, FileText, Shield, TrendingUp, Search, AlertTriangle } from 'lucide-react';

const TributarioPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Planejamento e Otimização Tributária",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Estratégias legais para redução da carga tributária e otimização fiscal de pessoas físicas e jurídicas.",
      services: [
        {
          name: "Planejamento Tributário",
          description: "Estruturação de estratégias legais para otimizar a carga tributária de pessoas físicas e jurídicas.",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Elisão Fiscal",
          description: "Estratégias legais para redução da carga tributária através de planejamento estruturado.",
          path: "/servicos/elisao-fiscal"
        },
        {
          name: "Consultoria em Impostos",
          description: "Orientação especializada sobre a aplicação de impostos federais, estaduais e municipais.",
          path: "/servicos/consultoria-impostos"
        }
      ]
    },
    {
      title: "Contencioso e Defesa Fiscal",
      icon: <Shield className="w-8 h-8" />,
      description: "Representação em processos fiscais e defesa contra autuações e cobranças tributárias.",
      services: [
        {
          name: "Contencioso Administrativo e Judicial",
          description: "Defesa em processos fiscais junto aos órgãos administrativos e Poder Judiciário.",
          path: "/servicos/contencioso-tributario"
        },
        {
          name: "Recuperação de Créditos Tributários",
          description: "Identificação e recuperação de créditos fiscais pagos indevidamente ou a maior.",
          path: "/servicos/recuperacao-creditos"
        },
        {
          name: "Parcelamento de Débitos",
          description: "Negociação e estruturação de parcelamentos fiscais junto aos órgãos competentes.",
          path: "/servicos/parcelamento-debitos"
        }
      ]
    },
    {
      title: "Auditoria e Compliance Fiscal",
      icon: <Search className="w-8 h-8" />,
      description: "Revisão, auditoria e implementação de controles para garantir conformidade tributária.",
      services: [
        {
          name: "Auditoria Tributária",
          description: "Revisão completa da situação fiscal para identificar riscos e oportunidades de otimização.",
          path: "/servicos/auditoria-tributaria"
        },
        {
          name: "Compliance Tributário",
          description: "Implementação de rotinas e controles para garantir conformidade com as obrigações fiscais.",
          path: "/servicos/compliance-tributario"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Tributário"
      description="Trata das leis e regulamentos relacionados a impostos e tributos. Isso inclui a interpretação e aplicação de leis fiscais, planejamento tributário, disputas fiscais e recursos relacionados a impostos."
      currentArea="tributario"
    >
      <div className="space-y-16">
        <div className="text-left">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            💼 Serviços Jurídicos em Direito Tributário
          </h2>
          <p className={`text-lg max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em todas as esferas do Direito Tributário, desde planejamento fiscal estratégico até defesa em contencioso, garantindo a otimização da carga tributária e conformidade legal.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-12">
            <div className="text-left space-y-4">
              <div className="flex justify-start">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                  {category.icon}
                </div>
              </div>
              <h3 className={`text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                {category.title}
              </h3>
              <p className={`text-lg max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {category.services.map((service, serviceIndex) => (
                <Card 
                  key={serviceIndex}
                  className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group h-full`}
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      <h4 className={`text-xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                        {service.name}
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-base leading-relaxed mb-6`}>
                        {service.description}
                      </p>
                    </div>
                    <p className={`text-base font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
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

export default TributarioPage;
