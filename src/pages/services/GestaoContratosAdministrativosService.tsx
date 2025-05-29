
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GestaoContratosAdministrativosService = () => {
  const benefits = [
    {
      title: "Contratos Seguros",
      description: "Elaboração e gestão de contratos administrativos com máxima segurança jurídica.",
      icon: "📋"
    },
    {
      title: "Minimização de Riscos",
      description: "Identificação e mitigação de riscos contratuais específicos do direito público.",
      icon: "🛡️"
    },
    {
      title: "Execução Eficiente",
      description: "Acompanhamento da execução contratual para garantir cumprimento das obrigações.",
      icon: "⚡"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Elaboração Contratual",
      description: "Redação de contratos com cláusulas adequadas às particularidades do direito administrativo."
    },
    {
      step: 2,
      title: "Análise de Riscos",
      description: "Identificação de potenciais problemas e elaboração de estratégias de mitigação."
    },
    {
      step: 3,
      title: "Gestão da Execução",
      description: "Acompanhamento do cumprimento das obrigações contratuais por ambas as partes."
    },
    {
      step: 4,
      title: "Resolução de Conflitos",
      description: "Mediação de conflitos e busca de soluções para questões contratuais."
    }
  ];

  const testimonials = [
    {
      name: "Empresa Prestadora",
      quote: "A gestão contratual foi exemplar. Evitamos vários problemas graças ao acompanhamento técnico."
    },
    {
      name: "Órgão Público Municipal",
      quote: "Contratos bem elaborados que minimizaram riscos e facilitaram a execução dos serviços."
    },
    {
      name: "Fornecedor Governamental",
      quote: "Excelente trabalho na resolução de conflitos contratuais. Soluções práticas e eficazes."
    }
  ];

  const faq = [
    {
      question: "O que diferencia contratos administrativos?",
      answer: "Contratos administrativos possuem cláusulas exorbitantes que conferem prerrogativas especiais à Administração."
    },
    {
      question: "Como funciona a alteração contratual?",
      answer: "Alterações devem respeitar limites legais: 25% para acréscimos/supressões e 50% para reforma de equipamentos."
    },
    {
      question: "O que é reequilíbrio econômico-financeiro?",
      answer: "É a recomposição da equação contratual quando alterações geram desequilíbrio não previsto."
    },
    {
      question: "Quais garantias podem ser exigidas?",
      answer: "Caução em dinheiro, títulos da dívida pública, seguro-garantia ou fiança bancária, limitadas a 5% do valor."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Elaboração e Gestão de Contratos Administrativos"
      serviceDescription="Contratos Públicos com Máxima Segurança. Elaboração, gestão e execução de contratos administrativos minimizando riscos."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default GestaoContratosAdministrativosService;
