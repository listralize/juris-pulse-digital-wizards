
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GovernancaCorporativaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Governança Corporativa"
      serviceDescription="Implementação de práticas de governança corporativa, regulamentos internos, políticas de compliance e estruturas de controle para melhorar a gestão e transparência empresarial."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Transparência e Controle",
          description: "Estabelecimento de práticas que aumentam a transparência na gestão e melhoram os controles internos da empresa."
        },
        {
          title: "Atração de Investimentos",
          description: "Estruturas de governança sólidas facilitam a captação de recursos e aumentam a confiança de investidores."
        },
        {
          title: "Redução de Riscos",
          description: "Implementação de políticas e procedimentos que minimizam riscos operacionais, legais e reputacionais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico de Governança",
          description: "Avaliação da estrutura atual de governança, identificando gaps e oportunidades de melhoria conforme melhores práticas."
        },
        {
          step: 2,
          title: "Desenho da Estrutura",
          description: "Desenvolvimento de estrutura de governança personalizada, incluindo conselhos, comitês e políticas específicas."
        },
        {
          step: 3,
          title: "Elaboração de Políticas",
          description: "Criação de código de conduta, políticas de compliance, regimentos internos e outros documentos normativos."
        },
        {
          step: 4,
          title: "Implementação e Treinamento",
          description: "Implementação das práticas de governança e treinamento dos colaboradores sobre as novas políticas."
        },
        {
          step: 5,
          title: "Monitoramento e Aperfeiçoamento",
          description: "Acompanhamento contínuo da efetividade das práticas implementadas e propostas de melhorias."
        }
      ]}
      testimonials={[
        {
          name: "Empresa Familiar Premium",
          quote: "A implementação da governança corporativa profissionalizou nossa gestão familiar e preparou a empresa para o crescimento sustentável."
        },
        {
          name: "Startup em Crescimento",
          quote: "As práticas de governança implementadas foram fundamentais para nossa rodada de investimento Series A."
        },
        {
          name: "Grupo Empresarial Consolidado",
          quote: "A reestruturação da governança melhorou significativamente nossos controles internos e transparência para stakeholders."
        }
      ]}
      faq={[
        {
          question: "O que é governança corporativa e por que é importante?",
          answer: "Governança corporativa é o conjunto de práticas, políticas e estruturas que orientam a gestão e controle de uma empresa. É importante porque melhora a transparência, reduz riscos, facilita acesso a capital, profissionaliza a gestão e aumenta a confiança de stakeholders, resultando em maior valor para a empresa."
        },
        {
          question: "Quais são os principais órgãos de governança?",
          answer: "Os principais órgãos incluem: Assembleia de Sócios/Acionistas (órgão máximo de decisão), Conselho de Administração (orientação estratégica), Diretoria Executiva (gestão operacional), Conselho Fiscal (fiscalização), e Comitês Especializados (auditoria, riscos, sustentabilidade, etc.). A estrutura varia conforme o porte e tipo da empresa."
        },
        {
          question: "Como implementar governança em empresas familiares?",
          answer: "Em empresas familiares, a governança deve equilibrar interesses familiares e empresariais. Inclui criação de conselho familiar, acordo de sócios, políticas de emprego familiar, planejamento sucessório, e separação clara entre propriedade, gestão e família. O objetivo é profissionalizar a gestão mantendo os valores familiares."
        }
      ]}
      relatedServices={[
        {
          name: "Compliance Empresarial",
          path: "/servicos/compliance-empresarial"
        },
        {
          name: "Reestruturação Societária",
          path: "/servicos/reestruturacao-societaria"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default GovernancaCorporativaService;
