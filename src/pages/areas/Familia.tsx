
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const FamiliaPage = () => {
  const services = [
    {
      title: "Casamento e União Estável",
      description: "Assessoria jurídica para formalização e regularização de casamentos e uniões estáveis, incluindo contratos e acordos pré-nupciais."
    },
    {
      title: "Divórcio e Separação",
      description: "Orientação e representação em processos de divórcio e separação, buscando soluções amigáveis ou litigiosas conforme necessário."
    },
    {
      title: "Guarda de Filhos",
      description: "Assessoria em questões de guarda compartilhada, unilateral, direito de visitas e convivência parental."
    },
    {
      title: "Pensão Alimentícia",
      description: "Atuação em ações de fixação, revisão e execução de pensão alimentícia para filhos e ex-cônjuges."
    },
    {
      title: "Adoção",
      description: "Orientação e acompanhamento jurídico em processos de adoção, nacional ou internacional, e seus requisitos legais."
    },
    {
      title: "Inventário e Partilha de Bens",
      description: "Assessoria em processos de inventário e partilha de bens após falecimento ou em casos de divórcio."
    },
    {
      title: "Proteção de Menores",
      description: "Atuação jurídica para proteção dos direitos de crianças e adolescentes em situações de vulnerabilidade."
    },
    {
      title: "Testamentos e Sucessões",
      description: "Planejamento sucessório, elaboração de testamentos e resolução de questões sucessórias."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito da Família"
      description="É uma área do direito que lida com questões relacionadas às relações familiares, incluindo casamento, divórcio, guarda de crianças, pensão alimentícia, adoção, proteção de menores, entre outras."
      currentArea="familia"
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

export default FamiliaPage;
