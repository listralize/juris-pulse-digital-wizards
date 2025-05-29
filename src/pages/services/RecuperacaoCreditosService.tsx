
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RecuperacaoCreditosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Revisão e Recuperação de Tributos"
      serviceDescription="Realizamos uma revisão fiscal completa de suas operações, identificando tributos pagos indevidamente ou a maior nos últimos 5 anos. Atuamos de forma estratégica para a restituição, ressarcimento ou compensação desses valores, melhorando seu fluxo de caixa."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Recuperação de Tributos Diretos",
          description: "IRPJ (Imposto de Renda Pessoa Jurídica) e CSLL (Contribuição Social sobre o Lucro Líquido) pagos indevidamente ou a maior."
        },
        {
          title: "Recuperação de Tributos Indiretos",
          description: "PIS, COFINS, ICMS e IPI. Inclui exclusão do ICMS da base de cálculo de PIS/COFINS (Tema 69 STF) e ressarcimento de IPI via PER/DCOMP."
        },
        {
          title: "Compensação Tributária Estratégica",
          description: "Utilização de créditos tributários para quitar débitos futuros, com base na Lei nº 9.430/96, otimizando o fluxo de caixa."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Auditoria Tributária Retrospectiva",
          description: "Análise completa dos tributos pagos nos últimos 5 anos para identificar pagamentos indevidos, excessivos ou oportunidades de créditos."
        },
        {
          step: 2,
          title: "Quantificação e Documentação",
          description: "Cálculo preciso dos valores a serem recuperados, incluindo correção monetária e juros, com documentação robusta para suporte."
        },
        {
          step: 3,
          title: "Estratégia de Recuperação",
          description: "Definição da melhor via: pedido administrativo de restituição, compensação com outros tributos ou ação judicial, conforme cada caso."
        },
        {
          step: 4,
          title: "Execução dos Procedimentos",
          description: "Protocolo de pedidos administrativos (PER/DCOMP) ou ajuizamento de ações de repetição de indébito conforme estratégia definida."
        },
        {
          step: 5,
          title: "Acompanhamento e Recebimento",
          description: "Monitoramento dos processos até o efetivo recebimento dos valores ou compensação com tributos futuros."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Química Brasileira",
          quote: "Recuperamos R$ 3,2 milhões em créditos de IPI e PIS/COFINS não aproveitados, recursos fundamentais para nossa expansão."
        },
        {
          name: "Rede de Supermercados Regional",
          quote: "A exclusão do ICMS da base de PIS/COFINS (Tema 69 STF) nos permitiu recuperar R$ 1,8 milhão dos últimos 5 anos."
        },
        {
          name: "Grupo Logístico Nacional",
          quote: "A compensação de créditos de IRPJ com débitos de CSLL otimizou nosso fluxo de caixa em mais de R$ 800 mil anuais."
        }
      ]}
      faq={[
        {
          question: "Quais são os principais tributos que podem ser recuperados?",
          answer: "Os principais são: IRPJ e CSLL (quando há base negativa ou presunção inadequada), PIS/COFINS (créditos sobre insumos, energia, exclusão do ICMS), ICMS (substituição tributária, diferencial de alíquotas), IPI (créditos na aquisição de insumos), e contribuições previdenciárias sobre valores não salariais."
        },
        {
          question: "Qual o prazo para recuperar tributos pagos indevidamente?",
          answer: "O prazo decadencial é de 5 anos contados do pagamento indevido, conforme art. 168 do CTN. Por isso é fundamental fazer revisões periódicas. Administrativamente, os pedidos podem levar de 6 meses a 2 anos para análise. Judicialmente, é possível obter antecipação de tutela em casos com jurisprudência consolidada."
        },
        {
          question: "Como funciona a compensação de tributos?",
          answer: "A compensação permite utilizar créditos de um tributo para quitar débitos de outros tributos da mesma esfera, conforme Lei nº 9.430/96. Por exemplo, créditos de PIS podem compensar débitos de COFINS ou IRPJ. É mais rápida que a restituição em dinheiro e melhora imediatamente o fluxo de caixa, sendo formalizada via DCTF e PER/DCOMP."
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
