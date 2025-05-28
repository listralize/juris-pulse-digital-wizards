
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ComplianceTrabalhistaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Compliance Trabalhista"
      serviceDescription="Implementação de programas de conformidade com a legislação trabalhista e previdenciária, garantindo que sua empresa opere dentro das normas legais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Prevenção de Riscos",
          description: "Identificação e correção proativa de não conformidades antes que se tornem problemas jurídicos."
        },
        {
          title: "Redução de Custos",
          description: "Diminuição significativa de multas, processos e passivos trabalhistas através da conformidade preventiva."
        },
        {
          title: "Cultura de Compliance",
          description: "Implementação de uma cultura organizacional baseada no cumprimento das normas trabalhistas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Inicial",
          description: "Auditoria completa dos processos de RH e práticas trabalhistas da empresa para identificar não conformidades."
        },
        {
          step: 2,
          title: "Plano de Ação",
          description: "Elaboração de plano detalhado para correção das irregularidades identificadas e implementação de controles."
        },
        {
          step: 3,
          title: "Implementação",
          description: "Execução das medidas corretivas e implementação de políticas e procedimentos de compliance."
        },
        {
          step: 4,
          title: "Treinamento",
          description: "Capacitação das equipes de RH e gestores sobre as normas trabalhistas e novos procedimentos."
        },
        {
          step: 5,
          title: "Monitoramento",
          description: "Acompanhamento contínuo para garantir manutenção da conformidade e atualização conforme mudanças legais."
        }
      ]}
      testimonials={[
        {
          name: "Multinacional do Setor Alimentício",
          quote: "O programa de compliance trabalhista reduziu em 80% os processos trabalhistas e trouxe segurança jurídica para nossa operação."
        },
        {
          name: "Grupo de Construção Civil",
          quote: "A implementação do compliance nos ajudou a evitar multas significativas do Ministério do Trabalho e melhorou nossa relação com os empregados."
        }
      ]}
      faq={[
        {
          question: "O que inclui um programa de compliance trabalhista?",
          answer: "Um programa completo inclui: auditoria de processos, adequação de políticas internas, treinamentos, controles de jornada, gestão de documentos trabalhistas, procedimentos de admissão e demissão, e monitoramento contínuo da conformidade."
        },
        {
          question: "Com que frequência deve ser feita a revisão do compliance?",
          answer: "Recomenda-se revisões semestrais para verificar a efetividade dos controles, além de atualizações sempre que houver mudanças na legislação trabalhista ou na estrutura da empresa."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Trabalhista",
          path: "/servicos/assessoria-trabalhista"
        },
        {
          name: "Rescisões Contratuais",
          path: "/servicos/rescisoes-contratuais"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default ComplianceTrabalhistaService;
