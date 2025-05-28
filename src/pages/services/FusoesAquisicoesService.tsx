
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const FusoesAquisicoesService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Fusões e Aquisições"
      serviceDescription="Assessoria completa em operações de M&A, incluindo due diligence, negociação de termos, estruturação jurídica e acompanhamento até o fechamento da transação."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Due Diligence Completa",
          description: "Análise minuciosa de todos os aspectos legais, financeiros e operacionais para identificar riscos e oportunidades."
        },
        {
          title: "Estruturação Otimizada",
          description: "Desenvolvimento da melhor estrutura jurídica e tributária para a operação, maximizando benefícios e minimizando riscos."
        },
        {
          title: "Negociação Especializada",
          description: "Suporte técnico durante todas as etapas de negociação, protegendo seus interesses e facilitando o fechamento."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Estruturação da Operação",
          description: "Definição da estratégia de M&A, incluindo estrutura jurídica, cronograma e aspectos regulatórios envolvidos."
        },
        {
          step: 2,
          title: "Due Diligence Legal",
          description: "Revisão completa da documentação societária, contratos, litígios, compliance e demais aspectos jurídicos relevantes."
        },
        {
          step: 3,
          title: "Negociação de Termos",
          description: "Participação ativa nas negociações, elaboração de LOI, term sheet e documentos definitivos da transação."
        },
        {
          step: 4,
          title: "Documentação da Transação",
          description: "Elaboração de todos os contratos necessários, incluindo acordo de compra e venda, garantias e documentos acessórios."
        },
        {
          step: 5,
          title: "Fechamento e Pós-Transação",
          description: "Acompanhamento do cumprimento das condições precedentes e suporte na integração pós-aquisição."
        }
      ]}
      testimonials={[
        {
          name: "TechCorp Investimentos",
          quote: "A assessoria em M&A foi fundamental para o sucesso da nossa aquisição. O due diligence identificou pontos críticos que foram negociados adequadamente."
        },
        {
          name: "Grupo Industrial ABC",
          quote: "A estruturação jurídica proposta otimizou nossa operação de fusão, resultando em significativa economia tributária e operacional."
        },
        {
          name: "Fundo de Private Equity",
          quote: "O suporte durante todo o processo de aquisição foi excepcional, desde o LOI até o fechamento. Profissionalismo e expertise incomparáveis."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre fusão, incorporação e aquisição?",
          answer: "Na fusão, duas ou mais empresas se unem formando uma nova sociedade. Na incorporação, uma empresa absorve outra(s), mantendo sua personalidade jurídica. Na aquisição, há compra de participação societária ou ativos, podendo manter as empresas separadas. Cada estrutura tem implicações jurídicas e tributárias específicas."
        },
        {
          question: "O que é due diligence e por que é importante?",
          answer: "Due diligence é a investigação detalhada de todos os aspectos de uma empresa antes da transação. Inclui análise legal, financeira, tributária, trabalhista, ambiental e operacional. É crucial para identificar riscos, validar informações e subsidiar a tomada de decisão sobre preço e termos da operação."
        },
        {
          question: "Quais são as principais aprovações necessárias em M&A?",
          answer: "Podem ser necessárias aprovações do CADE (antitruste), BACEN (instituições financeiras), ANATEL (telecomunicações), ANS (saúde suplementar), entre outros órgãos reguladores específicos. Também podem ser necessárias aprovações societárias internas e cumprimento de cláusulas de preferência ou tag along."
        }
      ]}
      relatedServices={[
        {
          name: "Reestruturação Societária",
          path: "/servicos/reestruturacao-societaria"
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

export default FusoesAquisicoesService;
