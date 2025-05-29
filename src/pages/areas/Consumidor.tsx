
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { ShoppingCart, Shield, AlertTriangle, FileText, Users, Scale } from 'lucide-react';

const ConsumidorPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Direitos Fundamentais do Consumidor",
      icon: <Shield className="w-8 h-8" />,
      description: "Defesa dos direitos básicos previstos no Código de Defesa do Consumidor.",
      services: [
        {
          name: "Direitos do Consumidor",
          description: "Assessoria completa na defesa dos direitos previstos no Código de Defesa do Consumidor.",
          path: "/servicos/direitos-consumidor"
        },
        {
          name: "Responsabilidade por Produtos",
          description: "Representação em casos de danos causados por produtos ou serviços defeituosos.",
          path: "/servicos/responsabilidade-produtos"
        },
        {
          name: "Recalls e Segurança",
          description: "Orientação sobre direitos em casos de recall e problemas de segurança em produtos.",
          path: "/servicos/recalls-seguranca"
        }
      ]
    },
    {
      title: "Práticas Comerciais Abusivas",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Combate a práticas comerciais desleais e abusivas contra consumidores.",
      services: [
        {
          name: "Práticas Abusivas",
          description: "Atuação contra cobranças indevidas, vendas casadas e outras práticas comerciais abusivas.",
          path: "/servicos/praticas-abusivas"
        },
        {
          name: "Publicidade Enganosa",
          description: "Combate a propagandas enganosas ou abusivas que violam direitos do consumidor.",
          path: "/servicos/publicidade-enganosa"
        }
      ]
    },
    {
      title: "Contratos e Relações de Consumo",
      icon: <FileText className="w-8 h-8" />,
      description: "Análise e defesa em questões contratuais e relações de consumo.",
      services: [
        {
          name: "Contratos de Consumo",
          description: "Análise e contestação de cláusulas abusivas em contratos de adesão e outros contratos de consumo.",
          path: "/servicos/contratos-consumo"
        },
        {
          name: "Indenizações por Danos",
          description: "Busca de compensação por danos morais e materiais em relações de consumo.",
          path: "/servicos/indenizacao-danos"
        }
      ]
    },
    {
      title: "Defesa Coletiva de Consumidores",
      icon: <Users className="w-8 h-8" />,
      description: "Representação em ações coletivas para proteção de grupos de consumidores.",
      services: [
        {
          name: "Defesa Coletiva",
          description: "Atuação em ações coletivas para proteção de grupos de consumidores lesados.",
          path: "/servicos/defesa-coletiva"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Consumidor"
      description="É uma área do direito que visa proteger os interesses e direitos dos consumidores em transações comerciais e relações de consumo. É uma disciplina abrangente que aborda uma variedade de questões legais relacionadas às interações entre consumidores e empresas."
      currentArea="consumidor"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            🛒 Serviços Jurídicos em Direito do Consumidor
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada na defesa dos direitos do consumidor, combatendo práticas abusivas e garantindo relações de consumo justas e equilibradas.
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

export default ConsumidorPage;
