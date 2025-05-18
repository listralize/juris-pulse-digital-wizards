
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const PrevidenciarioPage = () => {
  const services = [
    "Aposentadorias",
    "Pensões",
    "Benefícios por Incapacidade",
    "Auxílio-Doença",
    "Benefícios Assistenciais",
    "Revisão de Benefícios",
    "Planejamento Previdenciário",
    "Contencioso Previdenciário"
  ];

  return (
    <PracticeAreaLayout
      title="Direito Previdenciário"
      description="Esta área lida com a seguridade social, incluindo benefícios como aposentadoria, pensões, auxílio-doença e assistência social. A ST te auxilia na obtenção desses benefícios e na resolução de questões relacionadas."
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

export default PrevidenciarioPage;
