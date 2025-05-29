
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaProcessosAmbientaisService = () => {
  const benefits = [
    {
      title: "Defesa Especializada",
      description: "Representação técnica em processos administrativos ambientais e urbanísticos.",
      icon: "🛡️"
    },
    {
      title: "Conhecimento Técnico",
      description: "Expertise em legislação ambiental e urbanística para defesa qualificada.",
      icon: "📚"
    },
    {
      title: "Estratégia Integrada",
      description: "Defesa coordenada considerando aspectos técnicos, legais e ambientais.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise do Auto",
      description: "Estudo detalhado do auto de infração ou notificação para identificar vícios e defesas."
    },
    {
      step: 2,
      title: "Estratégia de Defesa",
      description: "Elaboração de linha defensiva com fundamentação técnica e jurídica robusta."
    },
    {
      step: 3,
      title: "Defesa Administrativa",
      description: "Apresentação de defesa no prazo legal com toda documentação necessária."
    },
    {
      step: 4,
      title: "Recursos e Acompanhamento",
      description: "Interposição de recursos e acompanhamento até decisão administrativa final."
    }
  ];

  const testimonials = [
    {
      name: "Empresa do Agronegócio",
      quote: "Defesa técnica excelente que resultou no cancelamento do auto de infração ambiental."
    },
    {
      name: "Indústria Química",
      quote: "Conhecimento impressionante da legislação ambiental. Conseguimos redução significativa da multa."
    },
    {
      name: "Construtora Regional",
      quote: "Defesa fundamentada que reverteu embargo da obra. Trabalho técnico de alta qualidade."
    }
  ];

  const faq = [
    {
      question: "Qual o prazo para apresentar defesa?",
      answer: "Geralmente 15 a 30 dias da notificação, variando conforme o órgão ambiental competente."
    },
    {
      question: "É possível suspender a multa?",
      answer: "Sim, através de defesa administrativa ou, em casos específicos, medida judicial com efeito suspensivo."
    },
    {
      question: "O que fazer em caso de embargo?",
      answer: "Apresentar defesa e, quando cabível, requerer suspensão ou flexibilização da medida."
    },
    {
      question: "Posso recorrer da decisão?",
      answer: "Sim, há recursos administrativos hierárquicos e, posteriormente, possibilidade de ação judicial."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Defesa em Processos Administrativos Ambientais"
      serviceDescription="Proteção Contra Sanções Ambientais. Defesa especializada em processos administrativos ambientais e urbanísticos."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default DefesaProcessosAmbientaisService;
