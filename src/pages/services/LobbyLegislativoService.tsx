
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const LobbyLegislativoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Lobby Legislativo"
      serviceDescription="Atuação estratégica junto a parlamentares para influenciar a elaboração e aprovação de normas jurídicas, defendendo seus objetivos com inteligência. Realizamos advocacy legislativo ético e transparente para proteger e promover seus interesses no processo legislativo."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Influência Legislativa Ética",
          description: "Atuação transparente e dentro da legalidade para influenciar positivamente o processo legislativo."
        },
        {
          title: "Acesso Direto aos Parlamentares",
          description: "Relacionamento institucional que permite diálogo direto com deputados e senadores."
        },
        {
          title: "Monitoramento Contínuo",
          description: "Acompanhamento permanente de proposições que possam impactar seus interesses ou setor."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Mapeamento de Interesses",
          description: "Identificação clara dos objetivos e interesses a serem defendidos no processo legislativo."
        },
        {
          step: 2,
          title: "Análise do Cenário Político",
          description: "Avaliação do cenário político e identificação de parlamentares-chave para a estratégia."
        },
        {
          step: 3,
          title: "Estratégia de Atuação",
          description: "Desenvolvimento de estratégia de advocacy baseada em argumentos técnicos e dados objetivos."
        },
        {
          step: 4,
          title: "Execução da Estratégia",
          description: "Realização de reuniões, apresentações e fornecimento de subsídios técnicos aos parlamentares."
        },
        {
          step: 5,
          title: "Monitoramento de Resultados",
          description: "Acompanhamento dos resultados da atuação e ajustes na estratégia conforme necessário."
        }
      ]}
      testimonials={[
        {
          name: "Confederação Industrial",
          quote: "O lobby legislativo profissional garantiu que nossos pleitos fossem contemplados na nova lei setorial."
        },
        {
          name: "Associação de Profissionais",
          quote: "A atuação estratégica no Congresso protegeu direitos importantes para nossa categoria profissional."
        }
      ]}
      faq={[
        {
          question: "Lobby legislativo é legal?",
          answer: "Sim, quando exercido de forma transparente e ética, respeitando as regras de credenciamento e registro de atividades."
        },
        {
          question: "Como funciona o credenciamento?",
          answer: "Através de registro nas Casas Legislativas, declarando interesses representados e atividades desenvolvidas."
        },
        {
          question: "Quais são os limites éticos?",
          answer: "Transparência nas atividades, vedação a benefícios pessoais aos parlamentares e foco em argumentos técnicos legítimos."
        }
      ]}
      relatedServices={[
        {
          name: "Monitoramento Legislativo",
          path: "/servicos/monitoramento-legislativo"
        },
        {
          name: "Emendas Parlamentares",
          path: "/servicos/emendas-parlamentares"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default LobbyLegislativoService;
