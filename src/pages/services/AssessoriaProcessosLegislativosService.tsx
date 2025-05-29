
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaProcessosLegislativosService = () => {
  const benefits = [
    {
      title: "Influência Legislativa",
      description: "Acompanhamento e influência na tramitação de projetos de lei desde a concepção até a aprovação final.",
      icon: "🏛️"
    },
    {
      title: "Expertise Parlamentar",
      description: "Conhecimento profundo dos procedimentos legislativos e das dinâmicas do Congresso Nacional.",
      icon: "📜"
    },
    {
      title: "Representação Qualificada",
      description: "Defesa técnica e estratégica de interesses específicos no processo de elaboração de normas.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Monitoramento Legislativo",
      description: "Acompanhamento sistemático de projetos de lei e propostas regulamentares que impactem os interesses do cliente."
    },
    {
      step: 2,
      title: "Análise de Impacto",
      description: "Avaliação detalhada dos possíveis efeitos das proposições legislativas nos negócios e atividades do cliente."
    },
    {
      step: 3,
      title: "Estratégia de Atuação",
      description: "Desenvolvimento de estratégia específica para influenciar positivamente a tramitação das proposições."
    },
    {
      step: 4,
      title: "Execução e Acompanhamento",
      description: "Implementação da estratégia através de relacionamento institucional e acompanhamento até aprovação final."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Paulo Costa",
      quote: "A assessoria legislativa foi decisiva para aprovar emendas favoráveis ao nosso setor. Conhecimento técnico e político excepcional."
    },
    {
      name: "Ana Rodrigues",
      quote: "O acompanhamento das proposições legislativas nos permitiu antecipar mudanças e nos preparar adequadamente."
    },
    {
      name: "Carlos Oliveira",
      quote: "Excelente trabalho de influência legislativa. As emendas propostas foram aprovadas e protegeram nossos interesses."
    }
  ];

  const faq = [
    {
      question: "Como funciona a assessoria em processos legislativos?",
      answer: "Acompanhamos projetos de lei relevantes, analisamos impactos e desenvolvemos estratégias para influenciar positivamente a tramitação."
    },
    {
      question: "É possível propor emendas a projetos?",
      answer: "Sim, elaboramos propostas de emendas técnicas e articulamos sua apresentação através de parlamentares aliados."
    },
    {
      question: "Qual o alcance da assessoria?",
      answer: "Atuamos no Congresso Nacional, Assembleias Legislativas e Câmaras Municipais, conforme necessidade do cliente."
    },
    {
      question: "Como é feito o relacionamento institucional?",
      answer: "Mantemos relacionamento ético e transparente com parlamentares e assessores, sempre dentro dos limites legais."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Assessoria em Processos Legislativos"
      serviceDescription="Influência Estratégica na Elaboração de Normas. Representação qualificada nos processos legislativos para defesa de interesses específicos."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default AssessoriaProcessosLegislativosService;
