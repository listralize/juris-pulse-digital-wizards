
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GestaoContratosPublicosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Gestão de Contratos Públicos"
      serviceDescription="Assessoria especializada na gestão, acompanhamento e execução de contratos administrativos, garantindo conformidade legal e otimização de resultados para o setor público."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Gestão Especializada",
          description: "Acompanhamento técnico de todas as fases contratuais, desde a elaboração até a execução final."
        },
        {
          title: "Conformidade Legal",
          description: "Garantia de cumprimento de todas as normas aplicáveis aos contratos administrativos."
        },
        {
          title: "Otimização de Resultados",
          description: "Estratégias para maximizar a eficiência e economicidade na execução contratual."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Contratual",
          description: "Revisão detalhada das cláusulas contratuais e identificação de riscos e oportunidades."
        },
        {
          step: 2,
          title: "Planejamento da Execução",
          description: "Elaboração de cronograma e estratégias para execução eficiente do contrato."
        },
        {
          step: 3,
          title: "Acompanhamento Contínuo",
          description: "Monitoramento da execução contratual e gestão de eventuais intercorrências."
        },
        {
          step: 4,
          title: "Gestão de Aditivos",
          description: "Assessoria na elaboração e negociação de termos aditivos quando necessário."
        },
        {
          step: 5,
          title: "Encerramento Formal",
          description: "Condução do processo de finalização contratual com todas as formalidades legais."
        }
      ]}
      testimonials={[
        {
          name: "Prefeitura Municipal",
          quote: "A gestão especializada dos contratos reduziu significativamente os problemas na execução e garantiu economia aos cofres públicos."
        },
        {
          name: "Autarquia Estadual",
          quote: "O acompanhamento técnico evitou várias irregularidades que poderiam resultar em problemas com os órgãos de controle."
        }
      ]}
      faq={[
        {
          question: "Qual a importância da gestão especializada de contratos públicos?",
          answer: "A gestão especializada garante o cumprimento das normas legais, otimiza recursos públicos e previne problemas que podem resultar em prejuízos ao erário."
        },
        {
          question: "Como funciona o acompanhamento da execução contratual?",
          answer: "Realizamos monitoramento contínuo do cumprimento das obrigações contratuais, prazos, qualidade dos serviços e conformidade legal."
        }
      ]}
      relatedServices={[
        {
          name: "Licitações e Contratos",
          path: "/servicos/licitacoes-contratos"
        },
        {
          name: "Assessoria em Licitações",
          path: "/servicos/assessoria-licitacoes"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default GestaoContratosPublicosService;
