
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GestaoContratosPublicosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Gestão e Reequilíbrio de Contratos Públicos"
      serviceDescription="Contratos públicos são dinâmicos. Fornecemos orientação especializada em interpretação de contratos, modificações, reequilíbrio econômico-financeiro e resolução de disputas, garantindo que seus acordos com a Administração Pública permaneçam viáveis e lucrativos ao longo de seu ciclo de vida."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Reequilíbrio Econômico-Financeiro",
          description: "Análise e pleito de recomposição do equilíbrio contratual quando alterações imprevistas impactam a viabilidade econômica do contrato."
        },
        {
          title: "Interpretação e Modificações Contratuais",
          description: "Orientação especializada na interpretação de cláusulas contratuais e negociação de aditivos e modificações necessárias."
        },
        {
          title: "Resolução de Disputas Contratuais",
          description: "Mediação e resolução de conflitos contratuais, evitando rescisões prejudiciais e mantendo relações contratuais saudáveis."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Contratual Detalhada",
          description: "Avaliação completa do contrato, identificando direitos, obrigações, riscos e oportunidades de otimização da relação contratual."
        },
        {
          step: 2,
          title: "Monitoramento de Performance",
          description: "Acompanhamento da execução contratual, identificando desvios, necessidades de adequação e oportunidades de melhoria."
        },
        {
          step: 3,
          title: "Estratégia de Reequilíbrio",
          description: "Desenvolvimento de estratégia para pleitos de reequilíbrio econômico-financeiro, com fundamentação técnica e jurídica robusta."
        },
        {
          step: 4,
          title: "Negociação e Formalização",
          description: "Condução de negociações com a Administração Pública e formalização de aditivos, modificações e acordos de reequilíbrio."
        },
        {
          step: 5,
          title: "Gestão Contínua",
          description: "Assessoria contínua durante toda a vigência contratual, antecipando problemas e maximizando resultados contratuais."
        }
      ]}
      testimonials={[
        {
          name: "Construtora Horizonte",
          quote: "O reequilíbrio econômico-financeiro obtido compensou integralmente os custos adicionais de materiais, mantendo a viabilidade do projeto de R$ 30 milhões."
        },
        {
          name: "Empresa de Serviços Públicos",
          quote: "A gestão contratual preventiva evitou múltiplas disputas e garantiu execução tranquila de contrato de 5 anos com o município."
        },
        {
          name: "Fornecedora Hospitalar Ltda",
          quote: "A interpretação técnica das cláusulas contratuais nos protegeu de penalidades indevidas e garantiu pagamentos em dia durante toda a execução."
        }
      ]}
      faq={[
        {
          question: "Quando é possível pleitear reequilíbrio econômico-financeiro?",
          answer: "O reequilíbrio é cabível quando fatos supervenientes, alterações unilaterais ou circunstâncias imprevistas rompem o equilíbrio econômico-financeiro original do contrato, conforme previsto na Lei 14.133/21."
        },
        {
          question: "Como é calculado o reequilíbrio econômico-financeiro?",
          answer: "O cálculo considera os custos adicionais comprovadamente incorridos, índices de atualização apropriados e metodologias técnicas reconhecidas, sempre mantendo a equação econômico-financeira original."
        },
        {
          question: "É possível modificar contratos públicos após a assinatura?",
          answer: "Sim, contratos públicos podem ser modificados através de termos aditivos, desde que respeitados os limites legais e procedimentos estabelecidos na legislação de licitações."
        },
        {
          question: "Como resolver disputas contratuais sem rescisão?",
          answer: "Através de negociação direta, mediação, comissões de acompanhamento contratual e, quando necessário, arbitragem, sempre buscando soluções que preservem a continuidade do contrato."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Estratégica em Licitações",
          path: "/servicos/assessoria-licitacoes"
        },
        {
          name: "Defesa em Processos Licitatórios",
          path: "/servicos/defesa-licitacoes"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default GestaoContratosPublicosService;
