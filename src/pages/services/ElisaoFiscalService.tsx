
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ElisaoFiscalService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Elisão Fiscal Estratégica"
      serviceDescription="Estratégias legais avançadas para redução da carga tributária através de planejamento estruturado, utilizando brechas legais e benefícios fiscais disponíveis na legislação brasileira."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Redução Legal de Impostos",
          description: "Diminuição significativa da carga tributária através de métodos legais e estruturados, respeitando integralmente a legislação vigente.",
          icon: "💰"
        },
        {
          title: "Aproveitamento de Incentivos",
          description: "Utilização estratégica de benefícios fiscais, isenções e incentivos disponíveis para diferentes setores e regiões do país.",
          icon: "🎁"
        },
        {
          title: "Segurança Jurídica",
          description: "Estratégias fundamentadas em lei, jurisprudência consolidada e doutrina, garantindo proteção contra questionamentos fiscais.",
          icon: "🛡️"
        },
        {
          title: "Estruturação Preventiva",
          description: "Planejamento antecipado de operações para evitar a incidência tributária, sempre com propósito negocial legítimo.",
          icon: "🎯"
        },
        {
          title: "Otimização de Estruturas",
          description: "Reorganização societária e operacional para maximizar benefícios fiscais sem comprometer a legalidade das operações.",
          icon: "🏗️"
        },
        {
          title: "Acompanhamento Especializado",
          description: "Monitoramento contínuo da legislação e ajustes nas estratégias conforme mudanças no cenário tributário.",
          icon: "👁️"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Estrutura Atual",
          description: "Estudo detalhado da situação tributária atual e identificação de oportunidades de elisão fiscal baseadas na operação específica da empresa."
        },
        {
          step: 2,
          title: "Mapeamento de Benefícios",
          description: "Identificação de incentivos fiscais, regimes especiais e benefícios aplicáveis ao seu negócio, considerando atividade e localização."
        },
        {
          step: 3,
          title: "Planejamento Estratégico",
          description: "Desenvolvimento de estratégia personalizada de elisão fiscal, considerando riscos, benefícios e impactos operacionais."
        },
        {
          step: 4,
          title: "Validação Jurídica",
          description: "Verificação da conformidade legal de todas as estratégias propostas, incluindo análise de jurisprudência e precedentes."
        },
        {
          step: 5,
          title: "Implementação Controlada",
          description: "Execução das medidas planejadas, incluindo alterações societárias ou operacionais necessárias, com acompanhamento rigoroso."
        },
        {
          step: 6,
          title: "Monitoramento Contínuo",
          description: "Acompanhamento dos resultados e adequação das estratégias conforme mudanças legislativas e evolução do negócio."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Metalúrgica Premier, CFO",
          quote: "A elisão fiscal implementada reduziu nossa carga tributária em 18% no primeiro ano, mantendo total conformidade legal. A fundamentação jurídica nos deu segurança para operar sem receios."
        },
        {
          name: "Comércio Varejista Nacional, Diretor Financeiro",
          quote: "Descobrimos benefícios fiscais regionais que não conhecíamos, resultando em economia de R$ 420 mil anuais sem qualquer risco legal. A expertise da equipe foi fundamental."
        },
        {
          name: "Prestadora de Serviços Tech, CEO",
          quote: "O planejamento de elisão fiscal nos permitiu reinvestir recursos em P&D, mantendo nossa competitividade no mercado internacional. Economia que fez toda diferença no crescimento."
        },
        {
          name: "Holding de Investimentos, Controller",
          quote: "A estruturação elisiva da nossa holding resultou em otimização significativa na tributação sobre distribuição de lucros, maximizando o retorno aos investidores."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre elisão e evasão fiscal?",
          answer: "Elisão fiscal é a redução legal da carga tributária através de planejamento antes da ocorrência do fato gerador, utilizando lacunas e benefícios previstos em lei. Evasão fiscal é a sonegação ou fraude, ocorrendo após o fato gerador através de meios ilegais. A elisão é perfeitamente legal e recomendada, enquanto a evasão é crime."
        },
        {
          question: "A elisão fiscal pode ser questionada pela Receita Federal?",
          answer: "Sim, especialmente se não houver propósito negocial válido ou se configurar abuso de direito. Por isso é fundamental que as estratégias tenham substância econômica, propósito comercial legítimo e sejam adequadamente documentadas. Nossa abordagem sempre considera esses aspectos."
        },
        {
          question: "Quais são os principais métodos de elisão fiscal?",
          answer: "Os métodos incluem: aproveitamento de incentivos fiscais regionais, mudança de regime tributário, reestruturação societária, planejamento de operações comerciais, aproveitamento de créditos tributários, e otimização de dedutibilidades. Cada método é analisado conforme o perfil específico da empresa."
        },
        {
          question: "Como garantir que a elisão fiscal seja segura juridicamente?",
          answer: "Através de fundamentação legal sólida, documentação adequada, propósito negocial legítimo, substância econômica das operações e acompanhamento de jurisprudência. Sempre fornecemos parecer jurídico detalhado sobre os riscos envolvidos."
        },
        {
          question: "Qual o prazo para implementar estratégias de elisão?",
          answer: "Varia conforme a complexidade. Mudanças simples podem ser implementadas em 30-60 dias, enquanto reestruturações societárias podem levar 3-6 meses. O importante é planejar antes da ocorrência do fato gerador."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Incentivos Fiscais",
          path: "/servicos/incentivos-fiscais"
        },
        {
          name: "Compliance Tributário",
          path: "/servicos/compliance-tributario"
        }
      ]}
      mainAreaPath="/areas/tributario"
    />
  );
};

export default ElisaoFiscalService;
