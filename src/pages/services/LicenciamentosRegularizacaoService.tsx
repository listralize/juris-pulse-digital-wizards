
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const LicenciamentosRegularizacaoService = () => {
  const benefits = [
    {
      title: "Licenças Completas",
      description: "Obtenção de todas as licenças urbanísticas e ambientais necessárias para o projeto.",
      icon: "📋"
    },
    {
      title: "Conformidade Legal",
      description: "Garantia de adequação a todas as normas urbanísticas em todas as esferas governamentais.",
      icon: "✅"
    },
    {
      title: "Agilidade no Processo",
      description: "Tramitação eficiente junto aos órgãos competentes para aprovação dos projetos.",
      icon: "⚡"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise do Projeto",
      description: "Estudo das características do projeto e identificação de todas as licenças necessárias."
    },
    {
      step: 2,
      title: "Adequação Normativa",
      description: "Verificação de conformidade com legislação urbanística, ambiental e de uso do solo."
    },
    {
      step: 3,
      title: "Tramitação Administrativa",
      description: "Condução dos processos junto aos órgãos municipais, estaduais e federais competentes."
    },
    {
      step: 4,
      title: "Acompanhamento e Regularização",
      description: "Monitoramento até obtenção das licenças e regularização de eventuais pendências."
    }
  ];

  const testimonials = [
    {
      name: "Construtora Modelo",
      quote: "Conseguimos todas as licenças urbanísticas no prazo. Acompanhamento técnico excepcional."
    },
    {
      name: "Incorporadora ABC",
      quote: "Excelente trabalho na regularização do empreendimento. Solução rápida e eficaz."
    },
    {
      name: "Empresa Industrial",
      quote: "Licenciamento ambiental complexo resolvido com competência e agilidade."
    }
  ];

  const faq = [
    {
      question: "Quais licenças urbanísticas existem?",
      answer: "Alvará de construção, habite-se, licença de funcionamento, uso do solo, entre outras específicas de cada município."
    },
    {
      question: "É necessário licenciamento ambiental?",
      answer: "Depende do tipo e porte do empreendimento. Atividades potencialmente poluidoras exigem licenciamento."
    },
    {
      question: "Qual o prazo para obter licenças?",
      answer: "Varia conforme complexidade do projeto e órgão competente, podendo ser de 30 dias a vários meses."
    },
    {
      question: "E se o projeto não for aprovado?",
      answer: "Analisamos os motivos da negativa e buscamos adequações ou recursos cabíveis."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Licenciamentos e Regularização"
      serviceDescription="Viabilização de Empreendimentos. Obtenção de licenças e regularização urbanística com conformidade legal total."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default LicenciamentosRegularizacaoService;
