
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaConcursosPublicosService = () => {
  const benefits = [
    {
      title: "Orientação Completa",
      description: "Assessoria em todas as fases de concursos públicos e questões do regime jurídico de servidores.",
      icon: "📋"
    },
    {
      title: "Proteção de Direitos",
      description: "Defesa de direitos desde a inscrição até a aposentadoria, passando por todas as fases da carreira.",
      icon: "🛡️"
    },
    {
      title: "Expertise Específica",
      description: "Conhecimento especializado do regime jurídico único e legislação de pessoal.",
      icon: "⚖️"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise da Situação",
      description: "Estudo detalhado da questão específica do servidor e identificação dos direitos aplicáveis."
    },
    {
      step: 2,
      title: "Estratégia Jurídica",
      description: "Desenvolvimento de estratégia adequada, seja administrativa ou judicial."
    },
    {
      step: 3,
      title: "Execução das Medidas",
      description: "Implementação das ações necessárias para garantia e reconhecimento dos direitos."
    },
    {
      step: 4,
      title: "Acompanhamento Integral",
      description: "Monitoramento até efetiva solução da questão e reconhecimento dos direitos."
    }
  ];

  const testimonials = [
    {
      name: "Servidor Federal",
      quote: "Excelente orientação que me ajudou desde a posse até questões complexas de progressão na carreira."
    },
    {
      name: "Professora Estadual",
      quote: "Assessoria fundamental para resolução de questões previdenciárias e reconhecimento de tempo especial."
    },
    {
      name: "Policial Civil",
      quote: "Conhecimento técnico excepcional das normas de pessoal. Direitos reconhecidos integralmente."
    }
  ];

  const faq = [
    {
      question: "Quais questões de concursos vocês atendem?",
      answer: "Impugnação de editais, recursos contra gabarito, anulação de questões e todos os aspectos do certame."
    },
    {
      question: "Atendem questões de progressão na carreira?",
      answer: "Sim, atuamos em progressões, promoções, mudanças de classe e reconhecimento de direitos funcionais."
    },
    {
      question: "E questões previdenciárias de servidores?",
      answer: "Atendemos aposentadorias especiais, contagem de tempo, pensões e benefícios específicos do servidor."
    },
    {
      question: "Há diferença entre regime celetista e estatutário?",
      answer: "Sim, cada regime tem regras específicas que exigem conhecimento técnico especializado."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Assessoria em Concursos Públicos"
      serviceDescription="Carreira Pública Protegida. Orientação completa em concursos e regime jurídico de servidores públicos."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default AssessoriaConcursosPublicosService;
