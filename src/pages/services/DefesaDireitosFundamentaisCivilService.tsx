
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaDireitosFundamentaisCivilService = () => {
  const benefits = [
    {
      title: "Proteção Constitucional",
      description: "Defesa robusta de direitos fundamentais contra violações por parte do poder público ou particulares.",
      icon: "🔒"
    },
    {
      title: "Expertise Especializada",
      description: "Conhecimento aprofundado da teoria dos direitos fundamentais e sua aplicação prática.",
      icon: "⚖️"
    },
    {
      title: "Atuação Estratégica",
      description: "Utilização de todos os instrumentos constitucionais disponíveis para proteção efetiva de direitos.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Identificação da Violação",
      description: "Análise detalhada da situação para identificar qual direito fundamental está sendo violado e por quem."
    },
    {
      step: 2,
      title: "Escolha do Instrumento",
      description: "Seleção da ferramenta jurídica mais adequada para proteção do direito violado (mandado de segurança, habeas corpus, etc.)."
    },
    {
      step: 3,
      title: "Fundamentação Constitucional",
      description: "Construção de argumentação sólida baseada na teoria dos direitos fundamentais e precedentes relevantes."
    },
    {
      step: 4,
      title: "Execução e Monitoramento",
      description: "Implementação da estratégia processual e acompanhamento até a efetiva proteção do direito."
    }
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      quote: "A defesa dos nossos direitos fundamentais foi impecável. Conseguimos reverter decisão que violava princípios constitucionais básicos."
    },
    {
      name: "Dr. João Silva",
      quote: "Excelente trabalho na proteção de direitos de minorias. A fundamentação constitucional demonstrou alta qualidade técnica."
    },
    {
      name: "Ana Costa",
      quote: "A estratégia adotada para defender nossos direitos foi eficaz. Resultados obtidos superaram nossas expectativas."
    }
  ];

  const faq = [
    {
      question: "Quais são os direitos fundamentais protegidos?",
      answer: "Todos os direitos previstos no Título II da Constituição: vida, liberdade, igualdade, segurança, propriedade, direitos sociais, políticos e de nacionalidade."
    },
    {
      question: "Posso defender direitos contra empresas privadas?",
      answer: "Sim, direitos fundamentais também se aplicam nas relações privadas, especialmente quando há desequilíbrio de poder."
    },
    {
      question: "Qual a diferença para direito civil comum?",
      answer: "Direitos fundamentais têm proteção constitucional especial e instrumentos específicos, como os remédios constitucionais."
    },
    {
      question: "Há prazo para defender direitos fundamentais?",
      answer: "Depende do instrumento utilizado. Alguns têm prazos específicos, outros podem ser acionados a qualquer tempo."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Defesa de Direitos Fundamentais"
      serviceDescription="Proteção Constitucional das Liberdades Essenciais. Defesa especializada contra violações de direitos fundamentais em todas as esferas."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default DefesaDireitosFundamentaisCivilService;
