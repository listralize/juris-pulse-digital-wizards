
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ParecereConstituicionalidadeService = () => {
  const benefits = [
    {
      title: "Análise Técnica Especializada",
      description: "Pareceres fundamentados em sólida base doutrinária e jurisprudencial, oferecendo segurança jurídica para decisões estratégicas.",
      icon: "📋"
    },
    {
      title: "Prevenção de Riscos",
      description: "Identificação antecipada de inconstitucionalidades, evitando custos com revisões posteriores ou questionamentos judiciais.",
      icon: "🛡️"
    },
    {
      title: "Conformidade Constitucional",
      description: "Garantia de que atos e normas estejam em conformidade com os princípios e regras constitucionais vigentes.",
      icon: "⚖️"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise Preliminar",
      description: "Estudo inicial da norma ou ato questionado, identificando potenciais conflitos constitucionais e definindo escopo da análise."
    },
    {
      step: 2,
      title: "Pesquisa Jurisprudencial",
      description: "Levantamento de precedentes do STF e tribunais superiores, identificando tendências interpretativas relevantes."
    },
    {
      step: 3,
      title: "Fundamentação Técnica",
      description: "Elaboração de fundamentação robusta baseada em doutrina, jurisprudência e princípios constitucionais aplicáveis."
    },
    {
      step: 4,
      title: "Conclusão e Recomendações",
      description: "Apresentação de conclusões claras e recomendações práticas para mitigação de riscos constitucionais."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Ricardo Mendes",
      quote: "O parecer de constitucionalidade foi fundamental para aprovar nossa proposta legislativa. Análise técnica impecável que antecipou questionamentos."
    },
    {
      name: "Maria Silva",
      quote: "A qualidade técnica do parecer nos deu segurança para implementar as mudanças regulamentares. Excelente fundamentação jurídica."
    },
    {
      name: "Roberto Santos",
      quote: "Parecer detalhado que identificou riscos constitucionais e apresentou soluções práticas. Trabalho de altíssima qualidade técnica."
    }
  ];

  const faq = [
    {
      question: "Quando é necessário um parecer de constitucionalidade?",
      answer: "Sempre que há dúvidas sobre a conformidade de normas ou atos com a Constituição, especialmente em projetos legislativos ou regulamentações."
    },
    {
      question: "O parecer tem valor legal?",
      answer: "O parecer é uma opinião técnica fundamentada que serve como orientação, mas não vincula decisões judiciais ou administrativas."
    },
    {
      question: "Qual o prazo para elaboração?",
      answer: "Varia conforme a complexidade da matéria, podendo ser de 15 a 45 dias para análises completas."
    },
    {
      question: "Posso usar o parecer em processos judiciais?",
      answer: "Sim, pareceres técnicos podem ser utilizados como fundamento em peças processuais e sustentações."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Pareceres Jurídicos e Análise de Constitucionalidade"
      serviceDescription="Segurança Jurídica através de Análise Técnica Especializada. Pareceres fundamentados para orientar decisões estratégicas e garantir conformidade constitucional."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default ParecereConstituicionalidadeService;
