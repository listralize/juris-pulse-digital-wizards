
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const AdministrativoPage = () => {
  const services = [
    {
      title: "Licitações e Contratos Públicos",
      description: "Assessoria completa em participação de licitações e execução de contratos administrativos."
    },
    {
      title: "Processos Administrativos",
      description: "Representação em processos e procedimentos junto à Administração Pública."
    },
    {
      title: "Responsabilidade do Estado",
      description: "Atuação em casos de responsabilização civil do Estado por danos causados a particulares."
    },
    {
      title: "Direito dos Servidores Públicos",
      description: "Defesa de direitos e interesses de servidores em relações estatutárias."
    },
    {
      title: "Desapropriação e Intervenção",
      description: "Assessoria em processos de desapropriação, requisição e outras formas de intervenção estatal."
    },
    {
      title: "Atos Administrativos",
      description: "Contestação e anulação de atos administrativos ilegais ou abusivos."
    },
    {
      title: "Improbidade Administrativa",
      description: "Defesa em processos de improbidade e atuação preventiva para compliance público."
    },
    {
      title: "Regulação e Fiscalização",
      description: "Assessoria nas relações com agências reguladoras e órgãos de fiscalização."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Administrativo"
      description="Trata das relações entre os cidadãos e a administração pública. Isso inclui questões como licitações, contratos públicos, responsabilidade do Estado, direitos dos administrados e a atuação de órgãos governamentais."
      currentArea="administrativo"
    >
      <div className="mt-8 md:mt-16">
        <h2 className="text-3xl md:text-4xl font-canela mb-8 inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Serviços Especializados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-canela mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PracticeAreaLayout>
  );
};

export default AdministrativoPage;
