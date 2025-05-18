
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const ConstitucionalPage = () => {
  const services = [
    "Ações de Inconstitucionalidade",
    "Direitos Fundamentais",
    "Liberdades Constitucionais",
    "Igualdade e Não-Discriminação",
    "Processos de Natureza Constitucional",
    "Ações de Controle de Constitucionalidade",
    "Mandados de Segurança",
    "Habeas Corpus"
  ];

  return (
    <PracticeAreaLayout
      title="Direito Constitucional"
      description="Trata das leis fundamentais que regem um país, incluindo a Constituição. Essa área abrange a estrutura do governo, os direitos individuais e coletivos, a organização dos poderes e as garantias fundamentais."
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

export default ConstitucionalPage;
