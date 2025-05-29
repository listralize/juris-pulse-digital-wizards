
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaCompletaLicitacoesService = () => {
  const benefits = [
    {
      title: "Suporte Estratégico",
      description: "Assessoria completa em todas as modalidades licitatórias, desde análise de editais até recursos.",
      icon: "📋"
    },
    {
      title: "Maximização de Chances",
      description: "Estratégias para aumentar as possibilidades de êxito nas licitações públicas.",
      icon: "🎯"
    },
    {
      title: "Conformidade Legal",
      description: "Garantia de adequação a todas as exigências legais e regulamentares do processo licitatório.",
      icon: "⚖️"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise do Edital",
      description: "Estudo detalhado do edital para identificar requisitos, riscos e oportunidades."
    },
    {
      step: 2,
      title: "Elaboração da Proposta",
      description: "Preparação de proposta técnica e comercial em conformidade com as exigências."
    },
    {
      step: 3,
      title: "Acompanhamento do Certame",
      description: "Participação ativa no processo licitatório com defesa de interesses."
    },
    {
      step: 4,
      title: "Recursos e Defesas",
      description: "Interposição de recursos quando necessário e defesa contra impugnações."
    }
  ];

  const testimonials = [
    {
      name: "Empresa ABC Ltda",
      quote: "A assessoria foi fundamental para vencermos a licitação. Análise técnica excepcional do edital."
    },
    {
      name: "João Empresário",
      quote: "Suporte completo que nos permitiu participar com segurança do processo licitatório."
    },
    {
      name: "Construtora XYZ",
      quote: "Excelente trabalho na elaboração da proposta e acompanhamento do certame."
    }
  ];

  const faq = [
    {
      question: "Em quais modalidades atuamos?",
      answer: "Atuamos em todas as modalidades: pregão, concorrência, tomada de preços, convite, concurso e leilão."
    },
    {
      question: "Qual o momento ideal para contratar assessoria?",
      answer: "O ideal é desde a análise do edital, mas podemos atuar em qualquer fase do processo."
    },
    {
      question: "Vocês elaboram toda a documentação?",
      answer: "Sim, auxiliamos na preparação de toda documentação técnica e habilitatória necessária."
    },
    {
      question: "E se perdermos a licitação?",
      answer: "Analisamos a possibilidade de recursos administrativos ou judiciais para reverter o resultado."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Assessoria Completa em Licitações"
      serviceDescription="Sucesso no Mercado Público. Suporte estratégico completo para maximizar chances de êxito em processos licitatórios."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default AssessoriaCompletaLicitacoesService;
