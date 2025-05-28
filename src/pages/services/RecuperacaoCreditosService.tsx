
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RecuperacaoCreditosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Recuperação de Créditos Tributários"
      serviceDescription="Identificação e recuperação de créditos tributários pagos indevidamente ou a maior, incluindo compensações, restituições e aproveitamento de créditos não utilizados."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Recursos Financeiros Imediatos",
          description: "Recuperação de valores significativos através de restituições e compensações com outros tributos devidos."
        },
        {
          title: "Melhoria do Fluxo de Caixa",
          description: "Otimização do capital de giro através do aproveitamento de créditos e redução da carga tributária efetiva."
        },
        {
          title: "Revisão Sistemática",
          description: "Análise completa dos últimos 5 anos para identificar todas as oportunidades de recuperação disponíveis."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Auditoria Tributária",
          description: "Análise detalhada dos tributos pagos nos últimos 5 anos para identificar pagamentos indevidos ou excessivos."
        },
        {
          step: 2,
          title: "Quantificação dos Créditos",
          description: "Cálculo preciso dos valores a serem recuperados, incluindo correção monetária e juros aplicáveis."
        },
        {
          step: 3,
          title: "Estratégia de Recuperação",
          description: "Definição da melhor estratégia: pedido administrativo de restituição, compensação ou ação judicial."
        },
        {
          step: 4,
          title: "Execução dos Procedimentos",
          description: "Protocolo dos pedidos administrativos ou ajuizamento de ações judiciais para recuperação dos créditos."
        },
        {
          step: 5,
          title: "Acompanhamento e Recebimento",
          description: "Monitoramento dos processos até o efetivo recebimento dos valores ou compensação com outros tributos."
        }
      ]}
      testimonials={[
        {
          name: "Metalúrgica Progresso",
          quote: "Conseguimos recuperar mais de R$ 2 milhões em créditos de ICMS não aproveitados, o que foi fundamental para nossos investimentos."
        },
        {
          name: "Comércio Atacadista ABC",
          quote: "A revisão tributária identificou pagamentos indevidos de PIS/COFINS que nem sabíamos que existiam. Recuperamos valores substanciais."
        },
        {
          name: "Prestadora de Serviços XYZ",
          quote: "O processo de recuperação de créditos de ISS foi conduzido com total profissionalismo, resultando em significativa melhoria do nosso fluxo de caixa."
        }
      ]}
      faq={[
        {
          question: "Quais tipos de créditos tributários podem ser recuperados?",
          answer: "Podem ser recuperados diversos tipos de créditos: ICMS pago por substituição tributária, créditos de IPI na aquisição de insumos, PIS/COFINS sobre insumos e energia elétrica, contribuições previdenciárias sobre valores não salariais, IR retido na fonte em excesso, entre outros. Cada caso deve ser analisado individualmente para identificar as oportunidades específicas."
        },
        {
          question: "Qual é o prazo para recuperar créditos tributários?",
          answer: "O prazo decadencial para recuperação de créditos tributários é de 5 anos contados do pagamento indevido. Por isso é importante fazer revisões periódicas para não perder o direito à recuperação. Os prazos para resposta dos órgãos fiscais variam: administrativamente pode levar de 6 meses a 2 anos, enquanto judicialmente pode ser mais longo, mas com possibilidade de antecipação de tutela."
        },
        {
          question: "É possível compensar créditos tributários com outros tributos?",
          answer: "Sim, em muitos casos é possível compensar créditos de um tributo com débitos de outros tributos da mesma esfera (federal, estadual ou municipal). Por exemplo, créditos de PIS podem ser compensados com débitos de COFINS ou IRPJ. Isso pode ser mais rápido que aguardar a restituição em dinheiro e melhora imediatamente o fluxo de caixa da empresa."
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

export default RecuperacaoCreditosService;
