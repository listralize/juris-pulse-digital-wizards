
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const ConsumidorPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const services = [
    {
      title: "Direitos do Consumidor",
      description: "Assessoria completa na defesa dos direitos previstos no Código de Defesa do Consumidor."
    },
    {
      title: "Responsabilidade por Produtos",
      description: "Representação em casos de danos causados por produtos ou serviços defeituosos."
    },
    {
      title: "Práticas Abusivas",
      description: "Atuação contra cobranças indevidas, vendas casadas e outras práticas comerciais abusivas."
    },
    {
      title: "Publicidade Enganosa",
      description: "Combate a propagandas enganosas ou abusivas que violam direitos do consumidor."
    },
    {
      title: "Contratos de Consumo",
      description: "Análise e contestação de cláusulas abusivas em contratos de adesão e outros contratos de consumo."
    },
    {
      title: "Defesa Coletiva",
      description: "Atuação em ações coletivas para proteção de grupos de consumidores lesados."
    },
    {
      title: "Indenizações por Danos",
      description: "Busca de compensação por danos morais e materiais em relações de consumo."
    },
    {
      title: "Recalls e Segurança",
      description: "Orientação sobre direitos em casos de recall e problemas de segurança em produtos."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Consumidor"
      description="É uma área do direito que visa proteger os interesses e direitos dos consumidores em transações comerciais e relações de consumo. É uma disciplina abrangente que aborda uma variedade de questões legais relacionadas às interações entre consumidores e empresas."
      currentArea="consumidor"
    >
      <h2 className="text-4xl font-canela mb-16 text-white">Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="bg-black border border-white/20 hover:bg-black/80 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-canela mb-4 text-white">{service.title}</h3>
              <p className="text-white/80 leading-relaxed">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default ConsumidorPage;
