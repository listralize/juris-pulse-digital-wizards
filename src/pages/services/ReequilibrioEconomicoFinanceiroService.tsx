
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ReequilibrioEconomicoFinanceiroService = () => {
  const benefits = [
    {
      title: "Proteção da Viabilidade",
      description: "Renegociação de condições contratuais para manter a viabilidade econômica dos contratos.",
      icon: "📊"
    },
    {
      title: "Fundamentação Técnica",
      description: "Elaboração de estudos técnicos robustos para demonstrar necessidade de reequilíbrio.",
      icon: "📋"
    },
    {
      title: "Resolução Estratégica",
      description: "Busca de soluções que atendam tanto o interesse público quanto a viabilidade privada.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise do Desequilíbrio",
      description: "Identificação e quantificação dos fatores que causaram desequilíbrio na equação contratual."
    },
    {
      step: 2,
      title: "Fundamentação Técnica",
      description: "Elaboração de estudos econômicos e jurídicos para demonstrar a necessidade de reequilíbrio."
    },
    {
      step: 3,
      title: "Negociação Administrativa",
      description: "Tentativa de solução amigável através de negociação com o órgão contratante."
    },
    {
      step: 4,
      title: "Medidas Judiciais",
      description: "Ajuizamento de ação judicial quando necessário para garantir o reequilíbrio."
    }
  ];

  const testimonials = [
    {
      name: "Construtora Modelo",
      quote: "O reequilíbrio obtido garantiu a continuidade do contrato e a viabilidade do projeto."
    },
    {
      name: "Empresa de Serviços",
      quote: "Estudos técnicos convincentes que resultaram no reconhecimento do desequilíbrio."
    },
    {
      name: "Concessionária ABC",
      quote: "Excelente trabalho na renegociação que preservou os interesses de ambas as partes."
    }
  ];

  const faq = [
    {
      question: "Quando é cabível o reequilíbrio?",
      answer: "Quando fatos supervenientes, imprevistos ou de força maior alteram substancialmente a equação econômico-financeira."
    },
    {
      question: "Quais são as formas de reequilíbrio?",
      answer: "Revisão de preços, prorrogação de prazo, compensação financeira ou alteração de obrigações contratuais."
    },
    {
      question: "A inflação gera direito ao reequilíbrio?",
      answer: "Não automaticamente, mas inflação extraordinária e imprevisível pode justificar o reequilíbrio."
    },
    {
      question: "Qual o prazo para pedir reequilíbrio?",
      answer: "Deve ser requerido tão logo identificado o desequilíbrio, sob pena de preclusão do direito."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Reequilíbrio Econômico-Financeiro"
      serviceDescription="Preservação da Viabilidade Contratual. Renegociação estratégica de condições para manter equilíbrio econômico-financeiro."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default ReequilibrioEconomicoFinanceiroService;
