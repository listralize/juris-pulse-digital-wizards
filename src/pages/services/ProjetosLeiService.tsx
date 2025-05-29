
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ProjetosLeiService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Elaboração e Análise de Projetos de Lei"
      serviceDescription="Redação e revisão de propostas legislativas sob a ótica constitucional, assegurando sua solidez jurídica. Desenvolvemos projetos de lei tecnicamente perfeitos e constitucionalmente adequados, antecipando questionamentos e garantindo efetividade normativa."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Técnica Legislativa Aprimorada",
          description: "Elaboração de textos normativos com técnica legislativa impecável e linguagem juridicamente precisa."
        },
        {
          title: "Conformidade Constitucional",
          description: "Garantia de que projetos de lei respeitem todos os preceitos constitucionais e não sejam passíveis de questionamento."
        },
        {
          title: "Viabilidade Política",
          description: "Análise da viabilidade política e estratégias para aprovação no processo legislativo."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Definição de Objetivos",
          description: "Identificação clara dos objetivos da proposição legislativa e análise de sua necessidade e oportunidade."
        },
        {
          step: 2,
          title: "Pesquisa Legislativa",
          description: "Levantamento da legislação existente, projetos em tramitação e experiências de outros países."
        },
        {
          step: 3,
          title: "Redação Técnica",
          description: "Elaboração do texto com observância das regras de técnica legislativa e conformidade constitucional."
        },
        {
          step: 4,
          title: "Análise de Impacto",
          description: "Avaliação dos impactos jurídicos, sociais e econômicos da proposição legislativa."
        },
        {
          step: 5,
          title: "Estratégia de Tramitação",
          description: "Orientação sobre estratégias para tramitação e aprovação no Poder Legislativo."
        }
      ]}
      testimonials={[
        {
          name: "Deputado Federal",
          quote: "O projeto de lei elaborado foi aprovado sem alterações, demonstrando a qualidade técnica impecável do texto."
        },
        {
          name: "Associação Empresarial",
          quote: "A análise constitucional prévia evitou que nosso projeto enfrentasse questionamentos durante a tramitação."
        }
      ]}
      faq={[
        {
          question: "Quem pode apresentar projetos de lei?",
          answer: "Deputados, senadores, Presidente da República, STF, tribunais superiores, PGR e cidadãos (através de iniciativa popular)."
        },
        {
          question: "O que é técnica legislativa?",
          answer: "Conjunto de regras e princípios para elaboração de textos normativos claros, precisos e juridicamente adequados."
        },
        {
          question: "Como garantir aprovação do projeto?",
          answer: "Através de texto tecnicamente perfeito, articulação política adequada e demonstração da necessidade e utilidade da proposição."
        }
      ]}
      relatedServices={[
        {
          name: "Emendas Parlamentares",
          path: "/servicos/emendas-parlamentares"
        },
        {
          name: "Monitoramento Legislativo",
          path: "/servicos/monitoramento-legislativo"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default ProjetosLeiService;
