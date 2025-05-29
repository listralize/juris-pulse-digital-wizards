
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const EstruturacaoConcessoesPPPsService = () => {
  const benefits = [
    {
      title: "Estruturação Complexa",
      description: "Assessoria na estruturação de projetos de infraestrutura e parcerias público-privadas.",
      icon: "🏗️"
    },
    {
      title: "Viabilidade Jurídica",
      description: "Garantia de conformidade legal e regulatória para viabilização dos projetos.",
      icon: "✅"
    },
    {
      title: "Segurança do Investimento",
      description: "Estruturas contratuais robustas que protegem investimentos e garantem retorno adequado.",
      icon: "🔒"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise de Viabilidade",
      description: "Estudo da viabilidade jurídica, econômica e regulatória do projeto proposto."
    },
    {
      step: 2,
      title: "Estruturação Jurídica",
      description: "Elaboração da modelagem jurídica adequada ao tipo de projeto e investimento."
    },
    {
      step: 3,
      title: "Documentação Contratual",
      description: "Redação de contratos, editais e documentos necessários à implementação."
    },
    {
      step: 4,
      title: "Acompanhamento da Execução",
      description: "Suporte durante a execução do projeto e resolução de questões contratuais."
    }
  ];

  const testimonials = [
    {
      name: "Fundo de Investimento",
      quote: "Estruturação impecável que viabilizou nosso investimento em infraestrutura portuária."
    },
    {
      name: "Concessionária Rodoviária",
      quote: "Excelente trabalho na modelagem da concessão rodoviária. Segurança jurídica total."
    },
    {
      name: "Governo Estadual",
      quote: "Assessoria fundamental para estruturar PPP de saneamento com modelagem inovadora."
    }
  ];

  const faq = [
    {
      question: "Qual a diferença entre concessão e PPP?",
      answer: "PPP envolve contraprestação pública, enquanto concessão comum é remunerada apenas por tarifas dos usuários."
    },
    {
      question: "Quais setores podem ter concessões?",
      answer: "Transporte, saneamento, energia, portos, aeroportos, presídios, hospitais, entre outros."
    },
    {
      question: "Como é definida a remuneração?",
      answer: "Através de tarifas, contraprestação pública ou modelo híbrido, conforme a modalidade."
    },
    {
      question: "Há garantias para os investidores?",
      answer: "Sim, podem incluir seguros, fundos garantidores e garantias governamentais específicas."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Estruturação de Concessões e PPPs"
      serviceDescription="Grandes Projetos de Infraestrutura. Assessoria na estruturação de concessões e parcerias público-privadas com segurança jurídica."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default EstruturacaoConcessoesPPPsService;
