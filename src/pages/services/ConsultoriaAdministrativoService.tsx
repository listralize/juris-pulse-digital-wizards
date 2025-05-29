
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConsultoriaAdministrativoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Consultoria e Pareceres em Direito Administrativo"
      serviceDescription="A melhor defesa é um ataque forte, e no direito administrativo, isso significa orientação proativa. Fornecemos pareceres jurídicos perspicazes e consultoria estratégica em todas as facetas do direito administrativo, possibilitando a tomada de decisões informadas e prevenindo disputas custosas antes que surjam."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Pareceres Jurídicos Especializados",
          description: "Elaboração de pareceres técnicos fundamentados em questões complexas de direito administrativo, fornecendo segurança jurídica para decisões."
        },
        {
          title: "Consultoria Preventiva",
          description: "Orientação proativa para prevenção de riscos administrativos, evitando litígios e garantindo conformidade com a legislação."
        },
        {
          title: "Assessoria Estratégica Contínua",
          description: "Suporte jurídico permanente para empresas e órgãos públicos em questões administrativas complexas e estratégicas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico da Situação",
          description: "Análise completa da questão administrativa apresentada, identificando riscos, oportunidades e marcos legais aplicáveis."
        },
        {
          step: 2,
          title: "Pesquisa e Fundamentação",
          description: "Pesquisa jurisprudencial e doutrinária aprofundada para embasar as conclusões e recomendações do parecer."
        },
        {
          step: 3,
          title: "Elaboração do Parecer",
          description: "Redação de parecer técnico fundamentado, com análise detalhada dos aspectos jurídicos e recomendações práticas."
        },
        {
          step: 4,
          title: "Apresentação e Discussão",
          description: "Apresentação do parecer ao cliente, esclarecimento de dúvidas e discussão de estratégias de implementação."
        },
        {
          step: 5,
          title: "Acompanhamento e Atualização",
          description: "Monitoramento de mudanças legislativas e jurisprudenciais que possam impactar as conclusões do parecer."
        }
      ]}
      testimonials={[
        {
          name: "Ministério Público Estadual",
          quote: "O parecer sobre legalidade de convênio público foi fundamental para nossa decisão institucional, proporcionando segurança jurídica total."
        },
        {
          name: "Prefeitura Municipal",
          quote: "A consultoria preventiva evitou problemas em processo licitatório de R$ 50 milhões, garantindo conformidade e economizando recursos públicos."
        },
        {
          name: "Empresa de Tecnologia",
          quote: "A assessoria contínua em questões regulatórias nos mantém sempre em conformidade e preparados para mudanças no setor."
        }
      ]}
      faq={[
        {
          question: "Quando é recomendável solicitar um parecer jurídico?",
          answer: "Sempre que houver dúvidas sobre legalidade de atos, interpretação de normas complexas, análise de riscos em decisões importantes ou necessidade de fundamentação jurídica sólida."
        },
        {
          question: "Qual a diferença entre parecer e consultoria jurídica?",
          answer: "Parecer é opinião jurídica formal e fundamentada sobre questão específica. Consultoria é assessoria mais ampla e contínua, incluindo orientação estratégica e acompanhamento."
        },
        {
          question: "Como a consultoria preventiva economiza recursos?",
          answer: "Evita litígios custosos, multas, penalidades e retrabalhos, além de otimizar processos e garantir conformidade desde o início, reduzindo riscos operacionais."
        },
        {
          question: "Pareceres jurídicos têm valor probatório?",
          answer: "Sim, pareceres elaborados por advogados especializados têm valor probatório e podem ser utilizados em processos administrativos e judiciais como elementos de defesa."
        }
      ]}
      relatedServices={[
        {
          name: "Atos Administrativos",
          path: "/servicos/atos-administrativos"
        },
        {
          name: "Regulação e Fiscalização",
          path: "/servicos/regulacao-fiscalizacao"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default ConsultoriaAdministrativoService;
