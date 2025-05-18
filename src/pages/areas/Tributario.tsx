
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const TributarioPage = () => {
  const services = [
    "Planejamento Tributário",
    "Contencioso Administrativo e Judicial",
    "Recuperação de Créditos Tributários",
    "Consultoria em Impostos Federais, Estaduais e Municipais",
    "Análise de Benefícios Fiscais",
    "Gestão de Passivos Tributários",
    "Defesas em Autuações Fiscais",
    "Recursos Administrativos e Judiciais"
  ];

  return (
    <PracticeAreaLayout
      title="Direito Tributário"
      description="Trata das leis e regulamentos relacionados a impostos e tributos. Isso inclui a interpretação e aplicação de leis fiscais, planejamento tributário, disputas fiscais e recursos relacionados a impostos."
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

export default TributarioPage;
