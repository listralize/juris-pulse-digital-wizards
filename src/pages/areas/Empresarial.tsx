
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const EmpresarialPage = () => {
  const services = [
    "Constituição de Empresas",
    "Contratos Empresariais",
    "Fusões e Aquisições",
    "Reestruturação Societária",
    "Governança Corporativa",
    "Compliance Empresarial",
    "Propriedade Intelectual",
    "Contencioso Empresarial"
  ];

  return (
    <PracticeAreaLayout
      title="Direito Empresarial"
      description="O Direito Empresarial tem como objetivo cuidar o exercício da atividade econômica organizada de fornecimento de bens e serviços, a chamada empresa. Seu objeto de estudo é resolver os conflitos de interesses envolvendo empresários ou relacionados às empresas que eles exploram."
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

export default EmpresarialPage;
