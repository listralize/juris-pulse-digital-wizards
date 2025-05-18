
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const FamiliaPage = () => {
  const services = [
    "Casamento e União Estável",
    "Divórcio e Separação",
    "Guarda de Filhos",
    "Pensão Alimentícia",
    "Adoção",
    "Inventário e Partilha de Bens",
    "Proteção de Menores",
    "Testamentos e Sucessões"
  ];

  return (
    <PracticeAreaLayout
      title="Direito da Família"
      description="É uma área do direito que lida com questões relacionadas às relações familiares, incluindo casamento, divórcio, guarda de crianças, pensão alimentícia, adoção, proteção de menores, entre outras."
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

export default FamiliaPage;
