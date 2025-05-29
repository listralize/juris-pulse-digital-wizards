
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ResponsabilidadeCivilEstadoService = () => {
  const benefits = [
    {
      title: "Reparação Integral",
      description: "Busca de indenização completa por danos causados por ações ou omissões do Estado.",
      icon: "💰"
    },
    {
      title: "Responsabilidade Objetiva",
      description: "Aproveitamento da responsabilidade objetiva do Estado para facilitar a obtenção de reparação.",
      icon: "⚖️"
    },
    {
      title: "Expertise Especializada",
      description: "Conhecimento profundo da teoria da responsabilidade civil do Estado e jurisprudência específica.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Identificação do Dano",
      description: "Análise detalhada dos danos sofridos e sua relação com a conduta estatal."
    },
    {
      step: 2,
      title: "Nexo de Causalidade",
      description: "Demonstração do nexo causal entre a ação/omissão estatal e o dano verificado."
    },
    {
      step: 3,
      title: "Quantificação dos Danos",
      description: "Cálculo preciso dos danos materiais e morais para fundamentar o pedido indenizatório."
    },
    {
      step: 4,
      title: "Ação Indenizatória",
      description: "Ajuizamento de ação contra o ente público responsável com acompanhamento até o ressarcimento."
    }
  ];

  const testimonials = [
    {
      name: "João Carlos",
      quote: "Conseguimos indenização integral pelos danos causados pela obra pública. Excelente trabalho da equipe."
    },
    {
      name: "Maria Fernanda",
      quote: "A ação contra o Estado foi bem-sucedida. Recebemos reparação pelos prejuízos sofridos."
    },
    {
      name: "Dr. Paulo Santos",
      quote: "Conhecimento técnico excepcional da responsabilidade civil estatal. Resultado muito positivo."
    }
  ];

  const faq = [
    {
      question: "Quando o Estado é responsável por indenizar?",
      answer: "Sempre que causar danos a terceiros, independentemente de culpa, salvo em casos de força maior ou culpa exclusiva da vítima."
    },
    {
      question: "E se o dano foi causado por omissão?",
      answer: "Na omissão, a responsabilidade é subjetiva, exigindo prova da culpa do serviço público."
    },
    {
      question: "Qual o prazo para cobrar indenização?",
      answer: "O prazo prescricional é de 5 anos contados da ciência do dano e sua autoria."
    },
    {
      question: "Posso cobrar danos morais do Estado?",
      answer: "Sim, o Estado pode ser condenado ao pagamento de danos morais quando sua conduta causar sofrimento injusto."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Responsabilidade Civil do Estado"
      serviceDescription="Reparação Integral de Danos Estatais. Busca de indenização por prejuízos causados por ações ou omissões do poder público."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default ResponsabilidadeCivilEstadoService;
