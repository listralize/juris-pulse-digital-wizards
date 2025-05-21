
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const LicitacoesContratosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Licitações e Contratos Públicos"
      serviceDescription="Assessoria completa em participação de licitações e execução de contratos administrativos, garantindo conformidade legal e proteção dos interesses de fornecedores e prestadores de serviços ao setor público."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Maximização de Oportunidades",
          description: "Identificação e preparação para participação em licitações com maior chance de êxito para seu perfil empresarial."
        },
        {
          title: "Prevenção de Problemas",
          description: "Análise preventiva de editais e contratos, identificando cláusulas problemáticas e exigências desproporcionais."
        },
        {
          title: "Defesa de Interesses",
          description: "Representação em impugnações, recursos e medidas administrativas ou judiciais para proteção dos seus direitos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Oportunidades",
          description: "Verificação de editais publicados e avaliação da compatibilidade com o perfil e capacidade da empresa interessada."
        },
        {
          step: 2,
          title: "Preparação de Documentação",
          description: "Organização e adequação de todos os documentos necessários para habilitação e participação no certame."
        },
        {
          step: 3,
          title: "Verificação de Conformidade",
          description: "Análise crítica do edital, identificando possíveis ilegalidades ou restrições indevidas à competitividade."
        },
        {
          step: 4,
          title: "Participação e Acompanhamento",
          description: "Assessoria durante todas as fases da licitação, incluindo elaboração de propostas e participação em sessões públicas."
        },
        {
          step: 5,
          title: "Gestão Contratual",
          description: "Acompanhamento da execução do contrato, incluindo eventuais alterações, reajustes e defesa em processos de penalização."
        }
      ]}
      testimonials={[
        {
          name: "Construtora Progresso",
          quote: "A assessoria especializada nos permitiu identificar falhas no edital que, após impugnadas, abriram caminho para nossa participação e vitória na licitação."
        },
        {
          name: "Ricardo M., Empresário",
          quote: "O suporte na execução do contrato e nas medições foi fundamental para evitarmos glosas indevidas e garantirmos o recebimento integral pelos serviços prestados."
        },
        {
          name: "TechServ Informática",
          quote: "Conseguimos reverter uma inabilitação injusta através de recurso administrativo bem fundamentado, o que nos garantiu a continuidade no certame e eventual adjudicação do objeto."
        }
      ]}
      faq={[
        {
          question: "Quais são as principais modalidades de licitação e quando se aplicam?",
          answer: "As principais modalidades tradicionais são: Concorrência (valores mais elevados ou maior complexidade), Tomada de Preços (valores intermediários), Convite (valores menores), Pregão (aquisição de bens e serviços comuns), Leilão (venda de bens) e Concurso (seleção de trabalho técnico ou artístico). A Nova Lei de Licitações (Lei 14.133/2021) manteve o Pregão, a Concorrência, o Concurso e o Leilão, acrescentando o Diálogo Competitivo para contratações de inovação."
        },
        {
          question: "Como impugnar um edital de licitação com cláusulas restritivas?",
          answer: "A impugnação deve ser apresentada até 3 dias úteis antes da data de abertura das propostas (na Nova Lei) ou 2 dias úteis (na Lei 8.666/93, ainda em vigor durante a transição). O documento deve apontar claramente as irregularidades, fundamentando juridicamente as razões da impugnação. Se não houver resposta ou se for negada, é possível recorrer ao Tribunal de Contas ou ao Judiciário."
        },
        {
          question: "Que medidas podem ser tomadas em caso de atraso nos pagamentos pela Administração Pública?",
          answer: "Em caso de atraso, o contratado tem direito a: correção monetária, juros de mora, indenização por eventuais danos comprovados e, em alguns casos, reequilíbrio econômico-financeiro do contrato. Se o atraso for superior a 90 dias, pode-se solicitar a suspensão da execução do contrato ou até mesmo sua rescisão, com indenização pelos prejuízos regularmente comprovados."
        }
      ]}
      relatedServices={[
        {
          name: "Processos Administrativos",
          path: "/servicos/processos-administrativos"
        },
        {
          name: "Responsabilidade do Estado",
          path: "/servicos/responsabilidade-estado"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default LicitacoesContratosService;
