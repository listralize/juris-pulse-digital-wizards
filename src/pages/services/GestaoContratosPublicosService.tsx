
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GestaoContratosPublicosService = () => {
  const benefits = [
    {
      title: "Compliance em Contratos Públicos",
      description: "Garantimos que todos os contratos públicos estejam em conformidade com a legislação vigente, reduzindo riscos legais."
    },
    {
      title: "Otimização de Processos",
      description: "Estruturamos processos eficientes para gestão de contratos, aumentando a produtividade da administração."
    },
    {
      title: "Transparência e Accountability",
      description: "Implementamos mecanismos que asseguram transparência e prestação de contas nos contratos públicos."
    },
    {
      title: "Prevenção de Irregularidades",
      description: "Identificamos e prevenimos irregularidades antes que se tornem problemas legais ou administrativos."
    },
    {
      title: "Assessoria Especializada",
      description: "Oferecemos consultoria especializada em todas as fases do contrato, desde a elaboração até a execução."
    },
    {
      title: "Resolução de Conflitos",
      description: "Mediamos e resolvemos conflitos contratuais, evitando litígios desnecessários e custosos."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise Inicial",
      description: "Realizamos uma análise detalhada dos contratos existentes e identificamos pontos de melhoria e conformidade."
    },
    {
      step: 2,
      title: "Elaboração de Estratégia",
      description: "Desenvolvemos uma estratégia personalizada de gestão contratual adequada às necessidades específicas do órgão."
    },
    {
      step: 3,
      title: "Implementação de Processos",
      description: "Implementamos novos processos e procedimentos para otimizar a gestão de contratos públicos."
    },
    {
      step: 4,
      title: "Monitoramento Contínuo",
      description: "Estabelecemos sistema de monitoramento contínuo para garantir a eficiência e conformidade dos contratos."
    },
    {
      step: 5,
      title: "Treinamento de Equipes",
      description: "Capacitamos as equipes responsáveis pela gestão contratual com as melhores práticas do mercado."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Carlos Mendes",
      quote: "A assessoria na gestão de contratos públicos transformou nossa administração, aumentando a eficiência e reduzindo riscos."
    },
    {
      name: "Dra. Ana Paula Santos",
      quote: "Profissionais altamente qualificados que nos ajudaram a implementar processos mais transparentes e eficientes."
    },
    {
      name: "Secretário Municipal João Silva",
      quote: "O trabalho desenvolvido trouxe mais segurança jurídica e melhor aproveitamento dos recursos públicos."
    }
  ];

  const faq = [
    {
      question: "O que inclui a gestão de contratos públicos?",
      answer: "Inclui desde a elaboração de editais, acompanhamento da execução contratual, fiscalização, até a resolução de conflitos e renovações contratuais."
    },
    {
      question: "Como garantir a conformidade legal dos contratos?",
      answer: "Através de análise detalhada da legislação aplicável, implementação de procedimentos padronizados e monitoramento contínuo da execução."
    },
    {
      question: "Qual o prazo para implementar melhorias na gestão?",
      answer: "O prazo varia conforme a complexidade e volume de contratos, mas normalmente implementamos as primeiras melhorias em 30 a 60 dias."
    },
    {
      question: "É possível prevenir irregularidades contratuais?",
      answer: "Sim, através de processos bem estruturados, controles internos eficientes e capacitação adequada das equipes gestoras."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Gestão de Contratos Públicos"
      serviceDescription="Oferecemos assessoria completa na gestão de contratos públicos, garantindo conformidade legal, transparência e eficiência na administração pública."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/areas/constitucional"
    />
  );
};

export default GestaoContratosPublicosService;
