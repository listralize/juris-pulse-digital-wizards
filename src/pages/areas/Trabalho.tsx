
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const TrabalhoPage = () => {
  const services = [
    "Assessoria em Relações Trabalhistas",
    "Contencioso Trabalhista",
    "Acordos Coletivos",
    "Rescisões Contratuais",
    "Compliance Trabalhista",
    "Consultoria Previdenciária",
    "Defesa em Reclamações Trabalhistas",
    "Saúde e Segurança do Trabalho"
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Trabalho"
      description="O Direito do Trabalho se concentra nas relações laborais, incluindo contratos de trabalho, salários, direitos e deveres de empregadores e empregados, segurança no trabalho e solução de conflitos trabalhistas."
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

export default TrabalhoPage;
