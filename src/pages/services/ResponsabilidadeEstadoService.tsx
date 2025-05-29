
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ResponsabilidadeEstadoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Responsabilidade Civil do Estado"
      serviceDescription="Quando as ações ou omissões do Estado causam danos, garantimos a responsabilização. Nossa expertise em responsabilidade civil do Estado nos permite construir casos convincentes para compensação, assegurando justiça para indivíduos e entidades prejudicados pela conduta governamental."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Responsabilização Objetiva do Estado",
          description: "Aplicação da teoria da responsabilidade objetiva do Estado, garantindo indenização independente de comprovação de culpa ou dolo."
        },
        {
          title: "Quantificação Precisa de Danos",
          description: "Avaliação técnica e jurídica completa dos danos materiais, morais e lucros cessantes para maximizar a compensação devida."
        },
        {
          title: "Estratégia Processual Eficaz",
          description: "Desenvolvimento de estratégia processual robusta para comprovar nexo causal e responsabilidade estatal."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Evento Danoso",
          description: "Avaliação detalhada dos fatos, identificando a conduta estatal (ação ou omissão) e sua relação com os danos sofridos."
        },
        {
          step: 2,
          title: "Comprovação do Nexo Causal",
          description: "Demonstração técnica e jurídica da relação de causalidade entre a conduta estatal e os danos experimentados."
        },
        {
          step: 3,
          title: "Quantificação dos Prejuízos",
          description: "Cálculo detalhado dos danos materiais, morais, estéticos e lucros cessantes, com fundamentação técnica e documental."
        },
        {
          step: 4,
          title: "Estratégia de Cobrança",
          description: "Definição da melhor estratégia: tentativa de acordo administrativo ou ajuizamento direto de ação indenizatória."
        },
        {
          step: 5,
          title: "Execução e Recebimento",
          description: "Acompanhamento da execução judicial ou cumprimento do acordo até o efetivo recebimento da indenização."
        }
      ]}
      testimonials={[
        {
          name: "Família Oliveira",
          quote: "Conseguimos indenização de R$ 500 mil por erro médico em hospital público. A expertise jurídica foi fundamental para comprovar a responsabilidade estatal."
        },
        {
          name: "Empresa Transportadora",
          quote: "Fomos indenizados pelos prejuízos causados por buraco na rodovia estadual. O processo foi conduzido com excelência técnica e resultados efetivos."
        },
        {
          name: "Comerciante Local",
          quote: "A responsabilização do município por danos causados por obras públicas mal planejadas garantiu a compensação pelos prejuízos no meu negócio."
        }
      ]}
      faq={[
        {
          question: "Quando o Estado pode ser responsabilizado por danos?",
          answer: "O Estado responde objetivamente por danos causados por seus agentes ou atividades, independente de culpa, desde que comprovados o dano, a conduta estatal e o nexo causal entre eles."
        },
        {
          question: "É possível responsabilizar o Estado por omissão?",
          answer: "Sim, o Estado pode ser responsabilizado por omissão quando tinha o dever legal de agir e sua inércia causou ou contribuiu para o dano, aplicando-se responsabilidade subjetiva nestes casos."
        },
        {
          question: "Qual o prazo para ingressar com ação contra o Estado?",
          answer: "O prazo prescricional é de 5 anos para ações de reparação civil contra a Fazenda Pública, contados da data do conhecimento do dano e de sua autoria."
        },
        {
          question: "O Estado pode se eximir da responsabilidade?",
          answer: "O Estado pode se eximir comprovando caso fortuito, força maior, culpa exclusiva da vítima ou de terceiro, ou ausência de nexo causal entre sua conduta e o dano."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos dos Servidores Públicos",
          path: "/servicos/direitos-servidores"
        },
        {
          name: "Atos Administrativos",
          path: "/servicos/atos-administrativos"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default ResponsabilidadeEstadoService;
