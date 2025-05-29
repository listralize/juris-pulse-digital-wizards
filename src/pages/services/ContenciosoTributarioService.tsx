
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContenciosoTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Defesas Administrativas e Judiciais"
      serviceDescription="Atuamos com expertise na defesa contra autos de infração e demais notificações fiscais, protegendo seus direitos e buscando a anulação ou redução de cobranças indevidas através de contencioso administrativo e judicial estratégico."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Contencioso Administrativo",
          description: "Elaboração de impugnações e recursos perante RFB, SEFAZ, CARF e TIT. Resolução mais célere e menos custosa que a via judicial."
        },
        {
          title: "Contencioso Judicial Estratégico",
          description: "Ações declaratórias, anulatórias, mandados de segurança e repetição de indébito no Poder Judiciário com fundamentação robusta."
        },
        {
          title: "Defesa em Execuções Fiscais",
          description: "Embargos à execução e exceção de pré-executividade para suspender cobranças e evitar penhoras, conforme Lei nº 6.830/80."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Auto de Infração",
          description: "Estudo detalhado da autuação, identificação de vícios formais e materiais, e definição da estratégia de defesa mais adequada."
        },
        {
          step: 2,
          title: "Defesa Administrativa",
          description: "Elaboração de impugnação robusta com fundamentação jurídica, doutrinária e jurisprudencial perante o órgão competente."
        },
        {
          step: 3,
          title: "Recursos Administrativos",
          description: "Interposição de recursos ao CARF, TIT ou órgãos superiores, aprofundando a argumentação e buscando precedentes favoráveis."
        },
        {
          step: 4,
          title: "Estratégia Judicial",
          description: "Caso necessário, ajuizamento de ações judiciais específicas (declaratória, anulatória, mandado de segurança) conforme o caso."
        },
        {
          step: 5,
          title: "Acompanhamento Integral",
          description: "Monitoramento de todos os processos até decisão definitiva, incluindo recursos especiais e extraordinários quando cabíveis."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Farmacêutica Delta",
          quote: "Nossa defesa administrativa no CARF resultou no cancelamento de R$ 5 milhões em autuações de PIS/COFINS, evitando um longo processo judicial."
        },
        {
          name: "Grupo de Construção Civil",
          quote: "O mandado de segurança preventivo impediu a cobrança indevida de ISS sobre nossa atividade, garantindo segurança jurídica para o negócio."
        },
        {
          name: "Holding de Investimentos",
          quote: "A ação anulatória de débito fiscal desconstituiu uma cobrança de R$ 2,8 milhões baseada em interpretação equivocada da legislação."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre defesa administrativa e judicial?",
          answer: "A defesa administrativa é feita perante órgãos como CARF, TIT e SEFAZ, seguindo o Decreto nº 70.235/72. É mais rápida e menos custosa, mas limitada à revisão de legalidade. A defesa judicial permite argumentação constitucional mais ampla, produção de provas e suspensão da exigibilidade, mas tem custos maiores e tramitação mais longa."
        },
        {
          question: "Quais são os principais tipos de ações judiciais tributárias?",
          answer: "As principais são: Ação Declaratória (para declarar inexistência de obrigação tributária), Ação Anulatória (para desconstituir crédito já formalizado), Mandado de Segurança (para direitos líquidos e certos), Ação de Repetição de Indébito (para reaver tributos pagos indevidamente) e Ação de Consignação em Pagamento (para efetuar pagamento contestado)."
        },
        {
          question: "É possível suspender a cobrança durante o processo?",
          answer: "Sim. Administrativamente, a impugnação tempestiva suspende a exigibilidade. Judicialmente, é possível obter liminar ou tutela antecipada para suspender a cobrança, especialmente em casos com jurisprudência favorável ou quando há fumaça do bom direito e risco de dano irreparável."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Parcelamento de Débitos",
          path: "/servicos/parcelamento-debitos"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default ContenciosoTributarioService;
