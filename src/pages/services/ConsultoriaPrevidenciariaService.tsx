
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConsultoriaPrevidenciariaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Consultoria Previdenciária"
      serviceDescription="Orientação especializada sobre contribuições previdenciárias, benefícios e impactos nas relações de trabalho, garantindo conformidade e otimização de custos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Otimização de Custos",
          description: "Estratégias para redução legal dos encargos previdenciários sem prejudicar os direitos dos trabalhadores."
        },
        {
          title: "Conformidade Previdenciária",
          description: "Garantia de cumprimento correto das obrigações previdenciárias, evitando multas e autuações."
        },
        {
          title: "Planejamento Estratégico",
          description: "Desenvolvimento de estratégias previdenciárias que se alinhem aos objetivos de negócio da empresa."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Folha de Pagamento",
          description: "Revisão detalhada da folha de pagamento e cálculo das contribuições previdenciárias."
        },
        {
          step: 2,
          title: "Identificação de Oportunidades",
          description: "Mapeamento de oportunidades de otimização e adequação das práticas previdenciárias."
        },
        {
          step: 3,
          title: "Plano de Adequação",
          description: "Elaboração de plano para implementação das melhorias identificadas de forma gradual e segura."
        },
        {
          step: 4,
          title: "Implementação",
          description: "Execução das medidas de otimização com acompanhamento jurídico especializado."
        },
        {
          step: 5,
          title: "Monitoramento",
          description: "Acompanhamento contínuo para garantir manutenção da conformidade e benefícios obtidos."
        }
      ]}
      testimonials={[
        {
          name: "Empresa de Serviços",
          quote: "A consultoria previdenciária resultou em economia significativa nos encargos mensais, mantendo total conformidade legal."
        },
        {
          name: "Indústria Farmacêutica",
          quote: "O planejamento previdenciário nos ajudou a evitar autuações e otimizar nossos custos de folha de pagamento."
        }
      ]}
      faq={[
        {
          question: "Como pode ser reduzida a carga previdenciária legalmente?",
          answer: "Através de estratégias como: adequação do enquadramento sindical, revisão de verbas salariais, implementação de benefícios não tributáveis, análise de isenções aplicáveis e estruturação adequada da remuneração."
        },
        {
          question: "Quais são as principais obrigações previdenciárias das empresas?",
          answer: "As empresas devem recolher contribuições sobre a folha de salários, enviar informações através do eSocial, manter documentação adequada, cumprir prazos de recolhimento e declaração, e observar as alíquotas corretas conforme o regime tributário."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Trabalhista",
          path: "/servicos/assessoria-trabalhista"
        },
        {
          name: "Compliance Trabalhista",
          path: "/servicos/compliance-trabalhista"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default ConsultoriaPrevidenciariaService;
