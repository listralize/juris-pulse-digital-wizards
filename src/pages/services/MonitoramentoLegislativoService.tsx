
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const MonitoramentoLegislativoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Monitoramento Legislativo"
      serviceDescription="Acompanhamento de proposições legislativas e identificação de impactos constitucionais, permitindo uma ação proativa e estratégica. Mantemos vigilância constante sobre projetos que possam afetar seus interesses, antecipando riscos e oportunidades."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Antecipação de Riscos",
          description: "Identificação precoce de proposições que possam impactar negativamente seus interesses ou atividades."
        },
        {
          title: "Identificação de Oportunidades",
          description: "Detecção de projetos de lei que possam beneficiar seus objetivos ou criar novas possibilidades."
        },
        {
          title: "Ação Estratégica Tempestiva",
          description: "Possibilidade de intervir no momento certo do processo legislativo para máxima efetividade."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Definição de Escopo",
          description: "Identificação das áreas temáticas e tipos de proposição relevantes para monitoramento."
        },
        {
          step: 2,
          title: "Sistema de Acompanhamento",
          description: "Implementação de sistema de monitoramento automatizado de proposições legislativas."
        },
        {
          step: 3,
          title: "Análise de Impacto",
          description: "Avaliação técnica dos potenciais impactos de cada proposição identificada como relevante."
        },
        {
          step: 4,
          title: "Relatórios Periódicos",
          description: "Elaboração de relatórios regulares com análise das proposições e recomendações estratégicas."
        },
        {
          step: 5,
          title: "Alertas Estratégicos",
          description: "Comunicação imediata sobre proposições urgentes que demandem ação rápida."
        }
      ]}
      testimonials={[
        {
          name: "Grupo Empresarial",
          quote: "O monitoramento permitiu antecipar mudanças regulatórias e adaptar nossa estratégia empresarial preventivamente."
        },
        {
          name: "Federação Nacional",
          quote: "Identificamos projetos importantes para nosso setor antes mesmo que chegassem às comissões, garantindo influência efetiva."
        }
      ]}
      faq={[
        {
          question: "O que é monitorado?",
          answer: "Projetos de lei, medidas provisórias, propostas de emenda constitucional e outras proposições em tramitação no Congresso Nacional."
        },
        {
          question: "Com que frequência são emitidos relatórios?",
          answer: "Conforme acordo: relatórios semanais, quinzenais ou mensais, além de alertas imediatos para proposições urgentes."
        },
        {
          question: "É possível monitorar legislativo estadual?",
          answer: "Sim. O serviço pode abranger assembleias legislativas estaduais e câmaras municipais conforme necessidade do cliente."
        }
      ]}
      relatedServices={[
        {
          name: "Lobby Legislativo",
          path: "/servicos/lobby-legislativo"
        },
        {
          name: "Análise de Constitucionalidade",
          path: "/servicos/analise-constitucionalidade"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default MonitoramentoLegislativoService;
