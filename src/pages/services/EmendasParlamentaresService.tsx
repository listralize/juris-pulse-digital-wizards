
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const EmendasParlamentaresService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Emendas Parlamentares"
      serviceDescription="Formulação de alterações a projetos de lei em tramitação, buscando aprimorar ou proteger seus interesses no processo legislativo. Elaboramos emendas estratégicas que garantem seus objetivos sejam contemplados durante a tramitação legislativa."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Intervenção Estratégica",
          description: "Possibilidade de influenciar projetos de lei em tramitação através de emendas bem fundamentadas."
        },
        {
          title: "Proteção de Interesses",
          description: "Defesa de interesses específicos através de alterações pontuais em projetos que possam impactá-los."
        },
        {
          title: "Aprimoramento Legislativo",
          description: "Contribuição para melhoria da qualidade das leis através de emendas tecnicamente adequadas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Projeto Original",
          description: "Estudo detalhado do projeto de lei em tramitação e identificação de pontos que necessitam alteração."
        },
        {
          step: 2,
          title: "Estratégia de Emenda",
          description: "Definição do tipo de emenda mais adequado: supressiva, substitutiva, modificativa ou aditiva."
        },
        {
          step: 3,
          title: "Redação Técnica",
          description: "Elaboração do texto da emenda com fundamentação jurídica e observância das regras regimentais."
        },
        {
          step: 4,
          title: "Articulação Parlamentar",
          description: "Identificação de parlamentares alinhados e estratégias para apresentação e aprovação da emenda."
        },
        {
          step: 5,
          title: "Acompanhamento da Votação",
          description: "Monitoramento da tramitação e votação da emenda nas comissões e plenário."
        }
      ]}
      testimonials={[
        {
          name: "Setor Industrial",
          quote: "As emendas apresentadas protegeram nossos interesses e evitaram impactos negativos da nova legislação."
        },
        {
          name: "Entidade de Classe",
          quote: "Conseguimos incluir dispositivos importantes para nossa categoria através de emendas estratégicas."
        }
      ]}
      faq={[
        {
          question: "Quais tipos de emenda existem?",
          answer: "Supressiva (remove texto), substitutiva (substitui), modificativa (altera) e aditiva (acrescenta texto)."
        },
        {
          question: "Quando podem ser apresentadas emendas?",
          answer: "Durante prazos específicos na tramitação: nas comissões ou em plenário, conforme regimento das Casas Legislativas."
        },
        {
          question: "Emendas precisam de justificação?",
          answer: "Sim. Emendas devem ser acompanhadas de justificação que demonstre sua necessidade e adequação ao projeto."
        }
      ]}
      relatedServices={[
        {
          name: "Projetos de Lei",
          path: "/servicos/projetos-lei"
        },
        {
          name: "Lobby Legislativo",
          path: "/servicos/lobby-legislativo"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default EmendasParlamentaresService;
