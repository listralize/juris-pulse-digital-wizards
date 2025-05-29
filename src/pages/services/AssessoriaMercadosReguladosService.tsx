
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaMercadosReguladosService = () => {
  const benefits = [
    {
      title: "Expertise Setorial",
      description: "Consultoria especializada para setores regulados com conhecimento das especificidades normativas.",
      icon: "🏭"
    },
    {
      title: "Conformidade Regulatória",
      description: "Garantia de adequação às normas das agências reguladoras e legislação específica.",
      icon: "✅"
    },
    {
      title: "Relacionamento Institucional",
      description: "Representação qualificada perante agências reguladoras e órgãos de controle.",
      icon: "🤝"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise Regulatória",
      description: "Estudo do arcabouço regulatório específico do setor e identificação de obrigações."
    },
    {
      step: 2,
      title: "Adequação Normativa",
      description: "Implementação de medidas para garantir conformidade com todas as exigências regulatórias."
    },
    {
      step: 3,
      title: "Monitoramento Contínuo",
      description: "Acompanhamento de mudanças regulatórias e adaptação das práticas empresariais."
    },
    {
      step: 4,
      title: "Defesa de Interesses",
      description: "Representação em processos administrativos e defesa perante agências reguladoras."
    }
  ];

  const testimonials = [
    {
      name: "Empresa de Telecomunicações",
      quote: "Assessoria fundamental para navegar no complexo ambiente regulatório do setor."
    },
    {
      name: "Companhia de Energia",
      quote: "Excelente trabalho na adequação às normas da ANEEL e defesa em processos administrativos."
    },
    {
      name: "Operadora de Saúde",
      quote: "Conhecimento técnico excepcional das normas da ANS. Resultados muito positivos."
    }
  ];

  const faq = [
    {
      question: "Quais setores são considerados regulados?",
      answer: "Telecomunicações, energia elétrica, petróleo e gás, aviação civil, saúde suplementar, entre outros."
    },
    {
      question: "Como funciona a representação perante agências?",
      answer: "Atuamos em processos administrativos, audiências públicas e relacionamento institucional contínuo."
    },
    {
      question: "Vocês acompanham mudanças regulatórias?",
      answer: "Sim, mantemos monitoramento constante de alterações normativas e seus impactos."
    },
    {
      question: "É possível contestar decisões das agências?",
      answer: "Sim, através de recursos administrativos e, quando cabível, ações judiciais."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Assessoria em Mercados Regulados"
      serviceDescription="Navegação Estratégica em Setores Regulados. Consultoria especializada para conformidade e representação perante agências reguladoras."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default AssessoriaMercadosReguladosService;
