
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const MandadoInjuncaoAcaoPopularService = () => {
  const benefits = [
    {
      title: "Efetivação de Direitos",
      description: "Mandado de injunção para garantir exercício de direitos constitucionais dependentes de regulamentação.",
      icon: "📜"
    },
    {
      title: "Defesa do Patrimônio Público",
      description: "Ação popular para proteção do patrimônio público, meio ambiente e moralidade administrativa.",
      icon: "🏛️"
    },
    {
      title: "Cidadania Ativa",
      description: "Instrumentos que permitem atuação cidadã na defesa de interesses coletivos e difusos.",
      icon: "👥"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise da Omissão",
      description: "Identificação de omissão normativa que impede exercício de direito ou lesão ao patrimônio público."
    },
    {
      step: 2,
      title: "Estratégia Processual",
      description: "Definição entre mandado de injunção ou ação popular conforme a natureza da questão."
    },
    {
      step: 3,
      title: "Fundamentação Técnica",
      description: "Elaboração de peça com fundamentação constitucional robusta e demonstração da lesividade."
    },
    {
      step: 4,
      title: "Acompanhamento Processual",
      description: "Condução do processo até decisão que efetive o direito ou proteja o patrimônio público."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Paulo Mendes",
      quote: "O mandado de injunção viabilizou o exercício de direitos que estavam suspensos por falta de regulamentação. Excelente trabalho."
    },
    {
      name: "Associação Cidadã",
      quote: "A ação popular resultou na anulação de ato lesivo ao patrimônio municipal. Atuação determinante para o interesse público."
    },
    {
      name: "Maria Fernanda",
      quote: "Instrumentos fundamentais para exercício da cidadania. A equipe demonstrou domínio técnico excepcional."
    }
  ];

  const faq = [
    {
      question: "O que é mandado de injunção?",
      answer: "Remédio constitucional para viabilizar exercício de direitos constitucionais impedidos por falta de norma regulamentadora."
    },
    {
      question: "Quem pode propor ação popular?",
      answer: "Qualquer cidadão brasileiro no pleno gozo dos direitos políticos pode propor ação popular."
    },
    {
      question: "Quais atos podem ser impugnados?",
      answer: "Atos lesivos ao patrimônio público, moralidade administrativa, meio ambiente e patrimônio histórico e cultural."
    },
    {
      question: "Há custos para propor ação popular?",
      answer: "Não, o autor de ação popular está isento de custas e ônus da sucumbência, salvo comprovada má-fé."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Mandado de Injunção e Ação Popular"
      serviceDescription="Instrumentos de Cidadania e Efetivação de Direitos. Ferramentas constitucionais para suprir omissões e proteger o patrimônio público."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default MandadoInjuncaoAcaoPopularService;
