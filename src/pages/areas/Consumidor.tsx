
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const ConsumidorPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Direitos do Consumidor",
      description: "Assessoria completa na defesa dos direitos previstos no Código de Defesa do Consumidor.",
      path: "/servicos/direitos-consumidor"
    },
    {
      title: "Responsabilidade por Produtos",
      description: "Representação em casos de danos causados por produtos ou serviços defeituosos.",
      path: "/servicos/direitos-consumidor"
    },
    {
      title: "Práticas Abusivas",
      description: "Atuação contra cobranças indevidas, vendas casadas e outras práticas comerciais abusivas.",
      path: "/servicos/praticas-abusivas"
    },
    {
      title: "Publicidade Enganosa",
      description: "Combate a propagandas enganosas ou abusivas que violam direitos do consumidor.",
      path: "/servicos/praticas-abusivas"
    },
    {
      title: "Contratos de Consumo",
      description: "Análise e contestação de cláusulas abusivas em contratos de adesão e outros contratos de consumo.",
      path: "/servicos/direitos-consumidor"
    },
    {
      title: "Defesa Coletiva",
      description: "Atuação em ações coletivas para proteção de grupos de consumidores lesados.",
      path: "/servicos/direitos-consumidor"
    },
    {
      title: "Indenizações por Danos",
      description: "Busca de compensação por danos morais e materiais em relações de consumo.",
      path: "/servicos/praticas-abusivas"
    },
    {
      title: "Recalls e Segurança",
      description: "Orientação sobre direitos em casos de recall e problemas de segurança em produtos.",
      path: "/servicos/direitos-consumidor"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Consumidor"
      description="É uma área do direito que visa proteger os interesses e direitos dos consumidores em transações comerciais e relações de consumo. É uma disciplina abrangente que aborda uma variedade de questões legais relacionadas às interações entre consumidores e empresas."
      currentArea="consumidor"
    >
      <h2 className={`text-4xl font-canela mb-16 ${isDark ? 'text-white' : 'text-black'}`}>Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700' + ' leading-relaxed'}>{service.description}</p>
              <p className={`mt-4 font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                Saiba mais →
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default ConsumidorPage;
