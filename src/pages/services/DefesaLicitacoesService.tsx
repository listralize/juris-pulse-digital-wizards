
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaLicitacoesService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Defesa em Processos Licitatórios"
      serviceDescription="Quando surgem disputas na arena de licitações, atuamos como defensores incansáveis. Desde a contestação de editais injustos e recursos contra decisões de classificação até a defesa contra penalidades e o enfrentamento de licitações direcionadas, lutamos para proteger seu direito de competir de forma justa e assegurar seus interesses contratuais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Contestação de Editais Injustos",
          description: "Identificação e contestação de cláusulas editalícias ilegais, restritivas ou que violem princípios licitatórios, garantindo competição justa."
        },
        {
          title: "Recursos Administrativos",
          description: "Interposição de recursos contra decisões de habilitação, classificação e julgamento, protegendo seus direitos em todas as fases."
        },
        {
          title: "Defesa Contra Penalidades",
          description: "Defesa robusta contra aplicação de penalidades administrativas, multas e sanções decorrentes de processos licitatórios."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Situação Jurídica",
          description: "Avaliação detalhada da irregularidade ou prejuízo sofrido no processo licitatório, identificando fundamentos legais para defesa."
        },
        {
          step: 2,
          title: "Estratégia de Contestação",
          description: "Desenvolvimento de estratégia processual adequada, definindo as medidas cabíveis e os argumentos jurídicos mais eficazes."
        },
        {
          step: 3,
          title: "Elaboração de Peças Processuais",
          description: "Redação de impugnações, recursos administrativos e defesas, com fundamentação jurídica sólida e documentação probatória."
        },
        {
          step: 4,
          title: "Acompanhamento Processual",
          description: "Monitoramento de prazos, protocolos e decisões administrativas, garantindo cumprimento de todas as etapas processuais."
        },
        {
          step: 5,
          title: "Recursos e Medidas Judiciais",
          description: "Interposição de recursos hierárquicos e, se necessário, ingresso com medidas judiciais para proteção definitiva dos direitos."
        }
      ]}
      testimonials={[
        {
          name: "Construtora Silva & Filhos",
          quote: "Nossa impugnação ao edital foi acolhida integralmente, resultando na reformulação do certame e nossa posterior vitória. Defesa técnica impecável."
        },
        {
          name: "Empresa Logística Norte",
          quote: "Conseguimos reverter nossa desclassificação através de recurso administrativo bem fundamentado, garantindo nossa participação e vitória na licitação."
        },
        {
          name: "Fornecedora Industrial Ltda",
          quote: "A defesa contra penalidades injustas nos salvou de uma multa de R$ 2 milhões e manteve nossa idoneidade para participar de futuras licitações."
        }
      ]}
      faq={[
        {
          question: "Quando é possível contestar um edital de licitação?",
          answer: "Editais podem ser contestados quando contêm cláusulas ilegais, restritivas à competição, com critérios inadequados ou que violem princípios constitucionais e legais da licitação."
        },
        {
          question: "Qual o prazo para interpor recursos em licitações?",
          answer: "Os prazos variam conforme a modalidade e fase: geralmente 5 dias úteis para recursos contra habilitação/inabilitação e julgamento, e até o terceiro dia útil anterior à data fixada para abertura dos envelopes para impugnação de editais."
        },
        {
          question: "É possível reverter uma desclassificação em licitação?",
          answer: "Sim, através de recursos administrativos fundamentados, demonstrando que a desclassificação foi indevida ou baseada em interpretação equivocada dos critérios editalícios."
        },
        {
          question: "Como funciona a defesa contra penalidades licitatórias?",
          answer: "A defesa envolve análise do processo administrativo, contestação de irregularidades procedimentais, demonstração da inexistência de falta ou apresentação de circunstâncias atenuantes para redução de penalidades."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Estratégica em Licitações",
          path: "/servicos/assessoria-licitacoes"
        },
        {
          name: "Gestão de Contratos Públicos",
          path: "/servicos/gestao-contratos-publicos"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default DefesaLicitacoesService;
