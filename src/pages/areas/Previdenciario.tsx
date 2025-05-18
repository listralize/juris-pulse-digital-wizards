
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const PrevidenciarioPage = () => {
  const services = [
    {
      title: "Aposentadorias",
      description: "Assessoria na obtenção de aposentadorias por idade, tempo de contribuição, especial e por invalidez."
    },
    {
      title: "Pensões",
      description: "Orientação e representação em processos de concessão de pensão por morte e outros benefícios a dependentes."
    },
    {
      title: "Benefícios por Incapacidade",
      description: "Assessoria para obtenção e manutenção de benefícios por incapacidade temporária ou permanente."
    },
    {
      title: "Auxílio-Doença",
      description: "Representação em casos de solicitação, prorrogação ou restabelecimento de auxílio-doença."
    },
    {
      title: "Benefícios Assistenciais",
      description: "Orientação sobre o BPC/LOAS e outros benefícios assistenciais para idosos e pessoas com deficiência."
    },
    {
      title: "Revisão de Benefícios",
      description: "Análise e revisão de benefícios previdenciários já concedidos para correção de valores."
    },
    {
      title: "Planejamento Previdenciário",
      description: "Elaboração de estratégias personalizadas para maximizar os benefícios previdenciários futuros."
    },
    {
      title: "Contencioso Previdenciário",
      description: "Representação em litígios administrativos e judiciais contra o INSS e outras entidades previdenciárias."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Previdenciário"
      description="Esta área lida com a seguridade social, incluindo benefícios como aposentadoria, pensões, auxílio-doença e assistência social. A ST te auxilia na obtenção desses benefícios e na resolução de questões relacionadas."
      currentArea="previdenciario"
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

export default PrevidenciarioPage;
