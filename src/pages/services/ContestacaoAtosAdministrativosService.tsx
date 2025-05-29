
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContestacaoAtosAdministrativosService = () => {
  const benefits = [
    {
      title: "Impugnação Técnica",
      description: "Contestação fundamentada de atos administrativos ilegais ou abusivos através dos recursos cabíveis.",
      icon: "📋"
    },
    {
      title: "Proteção de Direitos",
      description: "Defesa efetiva contra arbitrariedades do poder público que violem direitos individuais ou coletivos.",
      icon: "🛡️"
    },
    {
      title: "Estratégia Integrada",
      description: "Utilização de recursos administrativos e judiciais de forma coordenada e estratégica.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise do Ato",
      description: "Estudo detalhado do ato administrativo para identificar vícios de legalidade, legitimidade ou oportunidade."
    },
    {
      step: 2,
      title: "Escolha da Via",
      description: "Definição entre recursos administrativos ou ação judicial conforme estratégia mais adequada."
    },
    {
      step: 3,
      title: "Fundamentação Jurídica",
      description: "Elaboração de peça com fundamentação técnica robusta baseada em doutrina e jurisprudência."
    },
    {
      step: 4,
      title: "Acompanhamento Integral",
      description: "Monitoramento do processo até decisão final e execução das medidas necessárias."
    }
  ];

  const testimonials = [
    {
      name: "Ana Paula Rocha",
      quote: "A contestação do ato administrativo foi bem-sucedida. Conseguimos reverter decisão que nos prejudicava."
    },
    {
      name: "Roberto Lima",
      quote: "Excelente trabalho na impugnação da multa. A fundamentação jurídica foi impecável."
    },
    {
      name: "Dra. Fernanda Costa",
      quote: "Estratégia processual muito bem elaborada. Resultados obtidos superaram expectativas."
    }
  ];

  const faq = [
    {
      question: "Quais atos podem ser contestados?",
      answer: "Qualquer ato administrativo que viole a legalidade, legitimidade, moralidade, eficiência ou outros princípios administrativos."
    },
    {
      question: "Qual o prazo para contestar?",
      answer: "Varia conforme o tipo de ato e recurso. Geralmente entre 10 a 30 dias da ciência ou publicação."
    },
    {
      question: "É melhor recurso administrativo ou judicial?",
      answer: "Depende do caso. Recursos administrativos são mais rápidos, mas ação judicial pode ter efeito suspensivo."
    },
    {
      question: "Posso pedir indenização?",
      answer: "Sim, se o ato ilegal causar danos, é possível buscar reparação através de ação de responsabilidade civil."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Contestação de Atos Administrativos"
      serviceDescription="Defesa Contra Arbitrariedades do Poder Público. Impugnação técnica de decisões ilegais utilizando todos os recursos disponíveis."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default ContestacaoAtosAdministrativosService;
