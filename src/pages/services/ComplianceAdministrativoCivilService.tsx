
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ComplianceAdministrativoCivilService = () => {
  const benefits = [
    {
      title: "Programas Robustos",
      description: "Desenvolvimento de programas de compliance administrativo específicos para cada organização.",
      icon: "🔒"
    },
    {
      title: "Prevenção de Riscos",
      description: "Identificação e mitigação de riscos de infrações administrativas e sanções.",
      icon: "🛡️"
    },
    {
      title: "Relacionamento Governamental",
      description: "Estratégias éticas de relacionamento com órgãos públicos e agentes governamentais.",
      icon: "🤝"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Diagnóstico Organizacional",
      description: "Análise dos riscos específicos e mapeamento dos pontos de vulnerabilidade."
    },
    {
      step: 2,
      title: "Desenvolvimento do Programa",
      description: "Criação de políticas, procedimentos e controles internos adequados."
    },
    {
      step: 3,
      title: "Implementação e Treinamento",
      description: "Implementação do programa com treinamento de colaboradores e gestores."
    },
    {
      step: 4,
      title: "Monitoramento Contínuo",
      description: "Acompanhamento da efetividade e atualização conforme mudanças regulatórias."
    }
  ];

  const testimonials = [
    {
      name: "Empresa Multinacional",
      quote: "Programa de compliance robusto que nos protege em todas as operações com o setor público."
    },
    {
      name: "Grupo Empresarial",
      quote: "Excelente trabalho na estruturação de compliance que minimizou nossos riscos regulatórios."
    },
    {
      name: "Organização do Terceiro Setor",
      quote: "Compliance adaptado à nossa realidade que garantiu conformidade com todas as exigências."
    }
  ];

  const faq = [
    {
      question: "O que é compliance administrativo?",
      answer: "É o conjunto de práticas para garantir conformidade com normas administrativas e prevenir infrações."
    },
    {
      question: "Quais riscos o compliance previne?",
      answer: "Multas, sanções administrativas, impedimento de contratar com o poder público e danos reputacionais."
    },
    {
      question: "Como funciona o relacionamento governamental?",
      answer: "Através de práticas éticas e transparentes, sempre dentro dos limites legais estabelecidos."
    },
    {
      question: "O programa precisa ser atualizado?",
      answer: "Sim, deve ser constantemente atualizado conforme mudanças na legislação e na organização."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Compliance Administrativo"
      serviceDescription="Conformidade e Gestão de Riscos. Programas robustos de compliance para relacionamento ético com o setor público."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default ComplianceAdministrativoCivilService;
