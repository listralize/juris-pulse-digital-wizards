
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ParcelamentoDebitosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Parcelamento de Débitos"
      serviceDescription="Negociação e estruturação de parcelamentos fiscais junto aos órgãos competentes, incluindo programas especiais de regularização e renegociação de dívidas tributárias."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Regularização Fiscal",
          description: "Possibilidade de regularizar débitos em atraso e obter certidões de regularidade fiscal para participar de licitações e operações."
        },
        {
          title: "Redução de Encargos",
          description: "Aproveitamento de programas especiais com desconto de juros e multas, reduzindo significativamente o valor total da dívida."
        },
        {
          title: "Preservação do Fluxo de Caixa",
          description: "Divisão do débito em parcelas compatíveis com a capacidade financeira da empresa, preservando o capital de giro."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Levantamento de Débitos",
          description: "Identificação completa de todos os débitos tributários pendentes em diferentes esferas (federal, estadual, municipal)."
        },
        {
          step: 2,
          title: "Análise de Modalidades",
          description: "Estudo das diferentes modalidades de parcelamento disponíveis e programas especiais de regularização vigentes."
        },
        {
          step: 3,
          title: "Estratégia de Negociação",
          description: "Definição da melhor estratégia considerando capacidade de pagamento, benefícios disponíveis e prioridades da empresa."
        },
        {
          step: 4,
          title: "Formalização do Parcelamento",
          description: "Protocolo dos pedidos de parcelamento e acompanhamento até a aprovação pelos órgãos competentes."
        },
        {
          step: 5,
          title: "Gestão do Acordo",
          description: "Monitoramento do cumprimento das parcelas e assessoria para manutenção da regularidade fiscal."
        }
      ]}
      testimonials={[
        {
          name: "Construtora Millennium",
          quote: "Conseguimos parcelar R$ 3 milhões em débitos com 70% de desconto em juros e multas através do programa especial de regularização."
        },
        {
          name: "Transportadora Nacional",
          quote: "O parcelamento nos permitiu regularizar nossa situação fiscal e voltar a participar de licitações públicas, recuperando 40% do nosso faturamento."
        },
        {
          name: "Indústria Têxtil Regional",
          quote: "Estruturamos um parcelamento em 60 meses que se adequou perfeitamente ao nosso fluxo de caixa, evitando o fechamento da empresa."
        }
      ]}
      faq={[
        {
          question: "Quais são as modalidades de parcelamento disponíveis?",
          answer: "Existem diversas modalidades: parcelamento comum (até 60 parcelas), parcelamento especial para microempresas, programas de regularização como PERT, parcelamento de débitos em execução fiscal, e parcelamentos específicos por tipo de tributo. Cada modalidade tem requisitos, prazos e benefícios específicos que devem ser analisados caso a caso."
        },
        {
          question: "Posso parcelar débitos que estão sendo discutidos judicialmente?",
          answer: "Sim, mas há particularidades. Débitos em discussão administrativa ou judicial podem ser parcelados, mas geralmente exigem a desistência da discussão ou confissão da dívida. Em alguns casos, é possível parcelar mantendo a discussão do mérito. É importante avaliar se vale mais a pena continuar a discussão ou aderir ao parcelamento com seus benefícios."
        },
        {
          question: "O que acontece se eu não conseguir pagar as parcelas do acordo?",
          answer: "O descumprimento do parcelamento acarreta a rescisão automática do acordo e o vencimento antecipado de todo o débito, voltando a situação anterior com juros e multas. Por isso é fundamental negociar parcelas realistas. Em alguns casos, é possível renegociar o acordo ou solicitar novo parcelamento, dependendo da legislação vigente."
        }
      ]}
      relatedServices={[
        {
          name: "Contencioso Tributário",
          path: "/servicos/contencioso-tributario"
        },
        {
          name: "Compliance Tributário",
          path: "/servicos/compliance-tributario"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default ParcelamentoDebitosService;
