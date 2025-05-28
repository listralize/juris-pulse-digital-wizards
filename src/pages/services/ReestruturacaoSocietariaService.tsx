
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ReestruturacaoSocietariaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Reestruturação Societária"
      serviceDescription="Planejamento e execução de reorganizações societárias para otimização operacional, tributária e sucessória, incluindo cisões, fusões, incorporações e transformações societárias."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Otimização Tributária",
          description: "Reorganização da estrutura societária para reduzir a carga tributária de forma legal e eficiente."
        },
        {
          title: "Melhoria Operacional",
          description: "Simplificação da estrutura empresarial para facilitar a gestão e aumentar a eficiência operacional."
        },
        {
          title: "Planejamento Sucessório",
          description: "Preparação da empresa para sucessão familiar ou profissional através de estruturas adequadas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico da Estrutura Atual",
          description: "Análise detalhada da estrutura societária existente, identificando pontos de melhoria e oportunidades."
        },
        {
          step: 2,
          title: "Planejamento da Reestruturação",
          description: "Elaboração de proposta detalhada com as mudanças necessárias e cronograma de implementação."
        },
        {
          step: 3,
          title: "Elaboração dos Atos Societários",
          description: "Redação de todos os documentos necessários para formalizar as alterações societárias."
        },
        {
          step: 4,
          title: "Aprovação e Registros",
          description: "Condução das assembleias necessárias e protocolo dos documentos nos órgãos competentes."
        },
        {
          step: 5,
          title: "Acompanhamento Pós-Reestruturação",
          description: "Monitoramento dos resultados e ajustes necessários após a implementação das mudanças."
        }
      ]}
      testimonials={[
        {
          name: "Grupo Empresarial XYZ",
          quote: "A reestruturação societária resultou em uma economia tributária de 30% e simplificou significativamente nossa gestão corporativa."
        },
        {
          name: "Família Empreendedora ABC",
          quote: "O planejamento sucessório através da reestruturação garantiu a continuidade dos nossos negócios para as próximas gerações."
        },
        {
          name: "Holding Investimentos",
          quote: "A nova estrutura societária otimizou nossos investimentos e facilitou futuras operações de M&A."
        }
      ]}
      faq={[
        {
          question: "Quais são os tipos de reestruturação societária disponíveis?",
          answer: "Os principais tipos incluem: fusão (união de duas ou mais empresas), incorporação (absorção de uma empresa por outra), cisão (divisão de uma empresa), transformação (mudança de tipo societário), e criação de holdings. Cada tipo tem vantagens específicas dependendo dos objetivos da reestruturação."
        },
        {
          question: "Quanto tempo demora uma reestruturação societária?",
          answer: "O prazo varia conforme a complexidade da operação, mas geralmente leva de 2 a 6 meses. Reestruturações simples podem ser concluídas em 60 dias, enquanto operações complexas envolvendo múltiplas empresas podem levar mais tempo devido às aprovações necessárias."
        },
        {
          question: "A reestruturação societária pode gerar custos tributários?",
          answer: "Dependendo do tipo de operação, podem haver implicações tributárias. No entanto, muitas reestruturações podem ser realizadas de forma neutra fiscalmente, especialmente quando há propósito negocial válido. É essencial o planejamento tributário adequado antes da execução."
        }
      ]}
      relatedServices={[
        {
          name: "Constituição de Empresas",
          path: "/servicos/constituicao-empresas"
        },
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ReestruturacaoSocietariaService;
