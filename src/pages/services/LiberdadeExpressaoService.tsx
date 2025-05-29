
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const LiberdadeExpressaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Liberdade de Expressão e Imprensa"
      serviceDescription="Atuação em casos de censura ou restrições indevidas à manifestação do pensamento, garantindo a plenitude da liberdade de expressão. Defendemos o direito fundamental à livre manifestação de ideias, opiniões e pensamentos contra qualquer forma de cerceamento ou censura."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Contra Censura",
          description: "Defesa rigorosa contra qualquer tentativa de censura prévia ou posterior, garantindo o pleno exercício da liberdade de expressão."
        },
        {
          title: "Liberdade de Imprensa",
          description: "Proteção específica da atividade jornalística e dos meios de comunicação contra interferências indevidas do poder público."
        },
        {
          title: "Manifestação do Pensamento",
          description: "Garantia do direito constitucional de expressar opiniões, ideias e pensamentos sem medo de retaliação ou perseguição."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação da Violação",
          description: "Análise detalhada do ato ou medida que restringe ou censura a manifestação do pensamento ou atividade de imprensa."
        },
        {
          step: 2,
          title: "Fundamentação Constitucional",
          description: "Elaboração de defesa baseada nos artigos 5º, IV e IX, e 220 da Constituição Federal sobre liberdade de expressão."
        },
        {
          step: 3,
          title: "Medidas Judiciais Cabíveis",
          description: "Impetração de mandado de segurança, ADPF ou outras ações constitucionais para cessar a violação à liberdade."
        },
        {
          step: 4,
          title: "Tutela de Urgência",
          description: "Pedido de liminar para suspensão imediata de atos censórios ou restritivos à liberdade de expressão."
        },
        {
          step: 5,
          title: "Acompanhamento Integral",
          description: "Sustentação da causa até decisão definitiva que restabeleça plenamente a liberdade de expressão violada."
        }
      ]}
      testimonials={[
        {
          name: "Jornalista Independente",
          quote: "A defesa da liberdade de imprensa foi fundamental para manter meu direito de informar sem censura ou intimidação."
        },
        {
          name: "Empresa de Comunicação",
          quote: "Conseguimos derrubar tentativa de censura prévia que ameaçava nossa linha editorial e independência jornalística."
        }
      ]}
      faq={[
        {
          question: "A liberdade de expressão é absoluta?",
          answer: "Não. Embora seja um direito fundamental, encontra limites em outros direitos como honra, imagem, privacidade e na vedação ao discurso de ódio e incitação à violência."
        },
        {
          question: "O que configura censura?",
          answer: "Qualquer forma de controle prévio de conteúdo pelo poder público, bem como medidas posteriores que visem impedir ou restringir a circulação de informações e opiniões."
        },
        {
          question: "Como proceder em caso de censura?",
          answer: "Buscar imediatamente proteção judicial através de mandado de segurança ou outras medidas constitucionais para cessar a violação e obter reparação."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        },
        {
          name: "Mandado de Segurança",
          path: "/servicos/mandado-seguranca"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default LiberdadeExpressaoService;
