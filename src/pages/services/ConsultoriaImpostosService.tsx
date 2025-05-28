
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConsultoriaImpostosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Consultoria em Impostos"
      serviceDescription="Orientação especializada sobre a aplicação de impostos federais, estaduais e municipais, interpretação da legislação fiscal e adequação das operações empresariais às normas tributárias."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Orientação Especializada",
          description: "Consultoria técnica sobre aplicação correta da legislação tributária em operações específicas do negócio."
        },
        {
          title: "Redução de Riscos",
          description: "Minimização de riscos fiscais através de interpretação adequada das normas e jurisprudência aplicáveis."
        },
        {
          title: "Otimização Operacional",
          description: "Adequação de processos operacionais para cumprimento eficiente das obrigações tributárias."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Operação",
          description: "Entendimento detalhado da operação ou questão específica que demanda orientação tributária."
        },
        {
          step: 2,
          title: "Pesquisa Normativa",
          description: "Levantamento da legislação aplicável, regulamentos, instruções normativas e jurisprudência relevante."
        },
        {
          step: 3,
          title: "Análise Técnica",
          description: "Avaliação técnica da questão à luz da legislação, identificando alternativas e riscos envolvidos."
        },
        {
          step: 4,
          title: "Parecer Fundamentado",
          description: "Elaboração de parecer técnico com conclusões fundamentadas e recomendações práticas."
        },
        {
          step: 5,
          title: "Acompanhamento",
          description: "Suporte na implementação das recomendações e esclarecimentos de dúvidas posteriores."
        }
      ]}
      testimonials={[
        {
          name: "Empresa de Comércio Exterior",
          quote: "A consultoria sobre tributação em operações de importação nos ajudou a otimizar nossos custos e garantir total conformidade."
        },
        {
          name: "Prestadora de Serviços Digitais",
          quote: "A orientação sobre ISS para serviços digitais foi fundamental para estruturarmos nossa operação corretamente desde o início."
        },
        {
          name: "Indústria Alimentícia",
          quote: "A consultoria sobre IPI e ICMS nas nossas operações industriais resultou em significativa economia e segurança jurídica."
        }
      ]}
      faq={[
        {
          question: "Quando é recomendável buscar consultoria tributária?",
          answer: "É recomendável buscar consultoria antes de iniciar novas operações, lançar produtos, expandir para novos mercados, estruturar operações complexas, enfrentar fiscalizações, ou quando há dúvidas sobre aplicação de normas tributárias. A consultoria preventiva evita problemas futuros e otimiza a carga tributária."
        },
        {
          question: "Qual a diferença entre consultoria e planejamento tributário?",
          answer: "Consultoria foca em orientação específica sobre questões pontuais e interpretação normativa. Planejamento tributário é mais abrangente, envolvendo estruturação de operações e reorganizações para otimização da carga tributária. A consultoria pode ser parte do processo de planejamento ou atender demandas específicas."
        },
        {
          question: "Como escolher entre regime de tributação do Simples, Lucro Presumido ou Real?",
          answer: "A escolha depende de fatores como faturamento, atividade, margem de lucro, créditos tributários disponíveis e estrutura de custos. Simples para empresas menores, Lucro Presumido para margens altas sem muitos créditos, e Lucro Real para empresas com prejuízos ou muitos créditos. Análise detalhada é essencial para decisão correta."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Contencioso Tributário",
          path: "/servicos/contencioso-tributario"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default ConsultoriaImpostosService;
