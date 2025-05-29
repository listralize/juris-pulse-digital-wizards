
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaDireitosProgressoesService = () => {
  const benefits = [
    {
      title: "Reconhecimento de Direitos",
      description: "Garantia de reconhecimento de todos os direitos, vantagens e progressões devidas ao servidor.",
      icon: "🏆"
    },
    {
      title: "Valorização da Carreira",
      description: "Maximização do desenvolvimento e valorização da carreira no serviço público.",
      icon: "📈"
    },
    {
      title: "Justiça Remuneratória",
      description: "Busca pela remuneração adequada conforme direitos adquiridos e evolução funcional.",
      icon: "💰"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise dos Direitos",
      description: "Levantamento completo dos direitos, vantagens e progressões devidas ao servidor."
    },
    {
      step: 2,
      title: "Documentação Comprobatória",
      description: "Organização de toda documentação necessária para comprovar os direitos pleiteados."
    },
    {
      step: 3,
      title: "Requerimento Administrativo",
      description: "Apresentação de requerimento fundamentado ao órgão de pessoal competente."
    },
    {
      step: 4,
      title: "Ação Judicial se Necessário",
      description: "Ajuizamento de ação judicial quando a via administrativa não for suficiente."
    }
  ];

  const testimonials = [
    {
      name: "Servidor do Judiciário",
      quote: "Consegui o reconhecimento da progressão negada há anos. Trabalho técnico excepcional."
    },
    {
      name: "Professora Universitária",
      quote: "Excelente assessoria que resultou no reconhecimento de direitos de capacitação e titulação."
    },
    {
      name: "Fiscal de Rendas",
      quote: "Direitos reconhecidos integralmente com pagamento retroativo. Muito satisfeito com o resultado."
    }
  ];

  const faq = [
    {
      question: "Quais direitos podem ser reconhecidos?",
      answer: "Progressões, promoções, mudanças de nível, adicionais por tempo de serviço, titulação, capacitação, entre outros."
    },
    {
      question: "Há prazo para requerer direitos?",
      answer: "Alguns direitos têm prazo prescricional de 5 anos para efeitos patrimoniais retroativos."
    },
    {
      question: "É possível receber valores atrasados?",
      answer: "Sim, quando há direito reconhecido, é possível receber valores retroativos respeitando a prescrição."
    },
    {
      question: "Como funcionam as progressões automáticas?",
      answer: "Dependem de critérios como tempo de serviço, avaliação de desempenho e capacitação, conforme cada carreira."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Defesa de Direitos e Progressões"
      serviceDescription="Valorização da Carreira Pública. Reconhecimento integral de direitos, vantagens e progressões no serviço público."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default DefesaDireitosProgressoesService;
