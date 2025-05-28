
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ComplianceEmpresarialService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Compliance Empresarial"
      serviceDescription="Desenvolvimento e implementação de programas de integridade e conformidade com as legislações aplicáveis, incluindo prevenção à corrupção, lavagem de dinheiro e outras práticas ilícitas."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Prevenção de Riscos",
          description: "Identificação e mitigação de riscos legais, regulatórios e reputacionais através de controles preventivos efetivos."
        },
        {
          title: "Conformidade Regulatória",
          description: "Garantia de cumprimento de leis anticorrupção, LGPD, normas setoriais e outras regulamentações aplicáveis."
        },
        {
          title: "Proteção da Reputação",
          description: "Preservação da imagem corporativa através de práticas éticas e transparentes no mercado."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Assessment de Riscos",
          description: "Mapeamento completo dos riscos de compliance específicos do negócio, incluindo análise setorial e regulatória."
        },
        {
          step: 2,
          title: "Desenvolvimento do Programa",
          description: "Criação de programa de compliance customizado, incluindo políticas, procedimentos e controles específicos."
        },
        {
          step: 3,
          title: "Implementação e Treinamento",
          description: "Implementação das políticas com treinamento abrangente de colaboradores e criação de canais de denúncia."
        },
        {
          step: 4,
          title: "Monitoramento Contínuo",
          description: "Estabelecimento de sistema de monitoramento e auditoria interna para verificar efetividade do programa."
        },
        {
          step: 5,
          title: "Atualização e Melhoria",
          description: "Revisão periódica do programa com atualizações conforme mudanças legislativas e evolução do negócio."
        }
      ]}
      testimonials={[
        {
          name: "Multinacional Brasileira",
          quote: "O programa de compliance implementado nos protegeu em uma investigação regulatória e demonstrou nosso comprometimento com a ética."
        },
        {
          name: "Empresa de Tecnologia",
          quote: "A adequação à LGPD através do programa de compliance evitou multas significativas e melhorou nossa posição competitiva."
        },
        {
          name: "Construtora Regional",
          quote: "O compliance anticorrupção foi fundamental para nossa participação em licitações públicas e contratos com grandes empresas."
        }
      ]}
      faq={[
        {
          question: "O que é um programa de compliance e quais são seus elementos?",
          answer: "Um programa de compliance é um conjunto estruturado de políticas, procedimentos e controles para garantir conformidade legal e ética. Elementos essenciais incluem: código de conduta, políticas específicas, treinamentos, canal de denúncias, due diligence de terceiros, monitoramento, investigações internas e medidas disciplinares."
        },
        {
          question: "Quais leis exigem programas de compliance no Brasil?",
          answer: "Principais leis incluem: Lei Anticorrupção (12.846/13) exige programas de integridade; LGPD (13.709/18) requer governança de dados; Lei de Lavagem de Dinheiro (9.613/98) para setores específicos; normas setoriais do BACEN, SUSEP, ANS; e regulamentações de órgãos como CVM, CADE. Cada setor pode ter exigências específicas."
        },
        {
          question: "Como medir a efetividade de um programa de compliance?",
          answer: "A efetividade é medida através de KPIs como: número de treinamentos realizados, taxa de conclusão, denúncias recebidas e investigadas, auditorias internas, testes de controles, incidentes identificados e resolvidos, e feedback de stakeholders. Importante também avaliar a cultura de compliance através de pesquisas e avaliações comportamentais."
        }
      ]}
      relatedServices={[
        {
          name: "Governança Corporativa",
          path: "/servicos/governanca-corporativa"
        },
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ComplianceEmpresarialService;
