
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AcoesOriginariasSuperioresService = () => {
  const benefits = [
    {
      title: "Conhecimento Especializado",
      description: "Domínio das regras específicas de competência originária e dos procedimentos especiais dos tribunais superiores.",
      icon: "🏛️"
    },
    {
      title: "Experiência Comprovada",
      description: "Histórico consolidado de atuação em ações originárias, com resultados expressivos e reconhecimento pela qualidade técnica.",
      icon: "📊"
    },
    {
      title: "Visão Institucional",
      description: "Compreensão profunda das relações institucionais e do impacto das decisões nos diversos níveis federativos.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise de Competência",
      description: "Estudo detalhado das regras de competência originária para determinar a corte adequada e a viabilidade processual da demanda."
    },
    {
      step: 2,
      title: "Estratégia Processual Específica",
      description: "Desenvolvimento de estratégia adaptada às particularidades da competência originária, considerando prazos e procedimentos especiais."
    },
    {
      step: 3,
      title: "Fundamentação Técnica Avançada",
      description: "Construção de fundamentação sólida baseada em precedentes dos tribunais superiores e doutrina especializada."
    },
    {
      step: 4,
      title: "Acompanhamento Processual Integral",
      description: "Monitoramento completo desde a petição inicial até a decisão final, aproveitando todas as oportunidades processuais."
    }
  ];

  const testimonials = [
    {
      name: "Dra. Ana Paula Rocha",
      quote: "A representação em nossa ação originária no STF foi magistral. O conhecimento técnico resultou em decisão favorável que protegeu os interesses do estado."
    },
    {
      name: "Carlos Alberto Santos",
      quote: "A defesa em conflito de competência no STJ demonstrou excelência técnica. A argumentação precisa garantiu precedente favorável."
    },
    {
      name: "Dr. Fernando Oliveira",
      quote: "A qualidade das peças processuais em ações originárias demonstra nível de excelência raramente observado nos tribunais superiores."
    }
  ];

  const faq = [
    {
      question: "O que são ações de competência originária?",
      answer: "São processos que tramitam diretamente nos tribunais superiores, sem passar por instâncias inferiores, devido à natureza específica da matéria ou das partes envolvidas."
    },
    {
      question: "Qual a diferença entre STF e STJ em ações originárias?",
      answer: "O STF julga conflitos entre entes federativos e questões constitucionais. O STJ julga conflitos de competência e outros casos previstos na Constituição."
    },
    {
      question: "Quanto tempo demora uma ação originária?",
      answer: "O prazo varia conforme a complexidade e urgência do caso, podendo ser desde meses até alguns anos, dependendo da matéria e da Corte."
    },
    {
      question: "Posso recorrer de decisão em ação originária?",
      answer: "As possibilidades recursais são limitadas, geralmente cabendo apenas embargos de declaração ou, em casos específicos, recursos extraordinários."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Ações Originárias em Tribunais Superiores"
      serviceDescription="Representação Estratégica no STF e STJ. Atuação especializada em processos de competência originária onde decisões têm impacto nacional."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default AcoesOriginariasSuperioresService;
