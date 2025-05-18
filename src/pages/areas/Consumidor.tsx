
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const ConsumidorPage = () => {
  const services = [
    "Direitos do Consumidor",
    "Responsabilidade por Produtos e Serviços",
    "Práticas Abusivas",
    "Publicidade Enganosa",
    "Contratos de Consumo",
    "Defesa Coletiva do Consumidor",
    "Indenizações por Danos",
    "Recalls e Segurança de Produtos"
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Consumidor"
      description="É uma área do direito que visa proteger os interesses e direitos dos consumidores em transações comerciais e relações de consumo. É uma disciplina abrangente que aborda uma variedade de questões legais relacionadas às interações entre consumidores e empresas."
    >
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-canela mb-6">Serviços Oferecidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-md transition-shadow border-none">
              <CardContent className="p-6">
                <h3 className="font-medium text-lg">{service}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PracticeAreaLayout>
  );
};

export default ConsumidorPage;
