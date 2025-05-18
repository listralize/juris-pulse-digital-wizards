
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const ConstitucionalPage = () => {
  const services = [
    {
      title: "Ações de Inconstitucionalidade",
      description: "Representação em ações que visam declarar a inconstitucionalidade de leis ou atos normativos perante o Supremo Tribunal Federal."
    },
    {
      title: "Direitos Fundamentais",
      description: "Proteção e defesa dos direitos fundamentais garantidos pela Constituição Federal, como liberdade, igualdade e dignidade."
    },
    {
      title: "Liberdades Constitucionais",
      description: "Atuação na defesa das liberdades asseguradas pela Constituição, como liberdade de expressão, de reunião e de associação."
    },
    {
      title: "Igualdade e Não-Discriminação",
      description: "Defesa do princípio constitucional da igualdade e combate à discriminação em todas as suas formas."
    },
    {
      title: "Processos de Natureza Constitucional",
      description: "Atuação especializada em processos que envolvem questões de natureza constitucional em diversas instâncias judiciais."
    },
    {
      title: "Ações de Controle de Constitucionalidade",
      description: "Atuação em ADI, ADC, ADPF e outras ações do sistema brasileiro de controle de constitucionalidade."
    },
    {
      title: "Mandados de Segurança",
      description: "Impetração de mandados de segurança para proteger direito líquido e certo ameaçado ou violado por autoridade pública."
    },
    {
      title: "Habeas Corpus",
      description: "Defesa da liberdade de locomoção contra prisões ilegais ou ameaças à liberdade individual."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Constitucional"
      description="Trata das leis fundamentais que regem um país, incluindo a Constituição. Essa área abrange a estrutura do governo, os direitos individuais e coletivos, a organização dos poderes e as garantias fundamentais."
      currentArea="constitucional"
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

export default ConstitucionalPage;
