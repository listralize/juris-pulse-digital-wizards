
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ElisaoFiscalService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Elisão Fiscal"
      serviceDescription="Estratégias legais para redução da carga tributária através de planejamento estruturado, utilizando brechas legais e benefícios fiscais disponíveis na legislação."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Redução Legal de Impostos",
          description: "Diminuição da carga tributária através de métodos legais e estruturados, respeitando a legislação vigente."
        },
        {
          title: "Aproveitamento de Incentivos",
          description: "Utilização de benefícios fiscais, isenções e incentivos disponíveis para diferentes setores e regiões."
        },
        {
          title: "Segurança Jurídica",
          description: "Estratégias fundamentadas em lei, jurisprudência e doutrina, garantindo proteção contra questionamentos fiscais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Estrutura Atual",
          description: "Estudo detalhado da situação tributária atual e identificação de oportunidades de elisão fiscal."
        },
        {
          step: 2,
          title: "Mapeamento de Benefícios",
          description: "Identificação de incentivos fiscais, regimes especiais e benefícios aplicáveis ao seu negócio."
        },
        {
          step: 3,
          title: "Planejamento Estratégico",
          description: "Desenvolvimento de estratégia personalizada de elisão fiscal, considerando riscos e benefícios."
        },
        {
          step: 4,
          title: "Implementação",
          description: "Execução das medidas planejadas, incluindo alterações societárias ou operacionais necessárias."
        },
        {
          step: 5,
          title: "Monitoramento Contínuo",
          description: "Acompanhamento dos resultados e adequação das estratégias conforme mudanças legislativas."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Metalúrgica Santos",
          quote: "A elisão fiscal implementada reduziu nossa carga tributária em 18% no primeiro ano, mantendo total conformidade legal."
        },
        {
          name: "Comércio Varejista ABC",
          quote: "Descobrimos benefícios fiscais que não conhecíamos, resultando em economia significativa sem riscos legais."
        },
        {
          name: "Prestadora de Serviços Tech",
          quote: "O planejamento de elisão fiscal nos permitiu reinvestir recursos em P&D, mantendo nossa competitividade no mercado."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre elisão e evasão fiscal?",
          answer: "Elisão fiscal é a redução legal da carga tributária através de planejamento antes da ocorrência do fato gerador, utilizando lacunas e benefícios previstos em lei. Evasão fiscal é a sonegação ou fraude, ocorrendo após o fato gerador através de meios ilegais. A elisão é perfeitamente legal e recomendada, enquanto a evasão é crime."
        },
        {
          question: "A elisão fiscal pode ser questionada pela Receita Federal?",
          answer: "Sim, especialmente se não houver propósito negocial válido ou se configurar abuso de direito. Por isso é fundamental que as estratégias tenham substância econômica, propósito comercial legítimo e sejam adequadamente documentadas. Nossa abordagem sempre considera esses aspectos para minimizar riscos de questionamentos."
        },
        {
          question: "Quais são os principais métodos de elisão fiscal?",
          answer: "Os métodos incluem: aproveitamento de incentivos fiscais regionais ou setoriais, mudança de regime tributário (Simples, Lucro Presumido, Lucro Real), reestruturação societária, planejamento de operações comerciais, aproveitamento de créditos tributários, e otimização de dedutibilidades. Cada método é analisado conforme o perfil específico da empresa."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Auditoria Tributária",
          path: "/servicos/auditoria-tributaria"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default ElisaoFiscalService;
