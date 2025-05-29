
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const HabeasCorpusDataCivilService = () => {
  const benefits = [
    {
      title: "Proteção da Liberdade",
      description: "Defesa da liberdade de locomoção através do habeas corpus contra coação ilegal ou abuso de poder.",
      icon: "🔓"
    },
    {
      title: "Acesso à Informação",
      description: "Garantia do acesso a informações pessoais em bancos de dados governamentais através do habeas data.",
      icon: "📊"
    },
    {
      title: "Atuação Especializada",
      description: "Expertise em remédios constitucionais com foco na proteção de direitos fundamentais.",
      icon: "⚖️"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Identificação da Violação",
      description: "Análise detalhada da situação para identificar violação à liberdade ou negativa de acesso à informação."
    },
    {
      step: 2,
      title: "Escolha do Instrumento",
      description: "Definição entre habeas corpus ou habeas data conforme a natureza do direito violado."
    },
    {
      step: 3,
      title: "Fundamentação Constitucional",
      description: "Elaboração de peça processual com sólida fundamentação constitucional e doutrinária."
    },
    {
      step: 4,
      title: "Execução e Acompanhamento",
      description: "Protocolo da ação e acompanhamento até a efetiva proteção do direito fundamental."
    }
  ];

  const testimonials = [
    {
      name: "Ana Paula Rocha",
      quote: "O habeas corpus foi fundamental para restaurar minha liberdade de locomoção. Atuação técnica impecável da equipe."
    },
    {
      name: "Roberto Lima",
      quote: "Através do habeas data consegui acesso às informações que me eram negadas. Procedimento rápido e eficaz."
    },
    {
      name: "Dra. Fernanda Costa",
      quote: "A expertise em remédios constitucionais demonstrada foi excepcional. Resultados obtidos em tempo recorde."
    }
  ];

  const faq = [
    {
      question: "Quando usar habeas corpus?",
      answer: "Quando há violação ou ameaça à liberdade de locomoção por ilegalidade ou abuso de poder."
    },
    {
      question: "O que é habeas data?",
      answer: "Remédio constitucional para acesso a informações pessoais em bancos de dados públicos ou para retificação de dados."
    },
    {
      question: "Há prazo para impetrar?",
      answer: "Não há prazo específico, mas deve ser impetrado logo após a violação ou conhecimento da negativa de acesso."
    },
    {
      question: "Posso usar esses remédios preventivamente?",
      answer: "Sim, tanto habeas corpus quanto habeas data podem ser preventivos, para evitar violação iminente do direito."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Habeas Corpus e Habeas Data"
      serviceDescription="Proteção Fundamental da Liberdade e Acesso à Informação. Instrumentos constitucionais para defesa contra coação ilegal e garantia de transparência."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default HabeasCorpusDataCivilService;
