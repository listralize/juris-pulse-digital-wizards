
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RevisaoReenquadramentoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Revisão e Reenquadramento"
      serviceDescription="Revisão de benefícios previdenciários já concedidos para correção de valores, reenquadramento em modalidades mais vantajosas e recuperação de valores pagos a menor."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Aumento do Valor do Benefício",
          description: "Correção de cálculos incorretos que resultam em aumento significativo do valor mensal."
        },
        {
          title: "Recuperação de Atrasados",
          description: "Recebimento de valores retroativos desde a data em que o benefício deveria ter sido corrigido."
        },
        {
          title: "Reenquadramento Vantajoso",
          description: "Mudança para modalidade de aposentadoria mais favorável quando aplicável."
        },
        {
          title: "Correção de Tempo de Contribuição",
          description: "Inclusão de períodos não computados que impactam no valor do benefício."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Benefício Atual",
          description: "Revisão completa da carta de concessão e cálculos realizados pelo INSS."
        },
        {
          step: 2,
          title: "Identificação de Irregularidades",
          description: "Localização de erros de cálculo, períodos não computados ou enquadramento incorreto."
        },
        {
          step: 3,
          title: "Cálculo Correto",
          description: "Elaboração dos cálculos corretos com fundamentação técnica e jurídica."
        },
        {
          step: 4,
          title: "Pedido Administrativo",
          description: "Protocolo do pedido de revisão junto ao INSS com toda documentação necessária."
        },
        {
          step: 5,
          title: "Ação Judicial (se necessário)",
          description: "Ajuizamento de ação caso o INSS negue a revisão administrativamente."
        }
      ]}
      testimonials={[
        {
          name: "Antônio S., Aposentado",
          quote: "A revisão da minha aposentadoria aumentou o benefício em R$ 1.200 mensais, além de receber R$ 45.000 de atrasados."
        },
        {
          name: "Helena P., Pensionista",
          quote: "Conseguiram reenquadrar minha pensão e corrigir o valor que estava sendo pago incorretamente há 5 anos."
        },
        {
          name: "José C., Aposentado Especial",
          quote: "A revisão provou que tinha direito à aposentadoria especial e não por idade, aumentando muito meu benefício."
        }
      ]}
      faq={[
        {
          question: "Quais são os principais tipos de revisão de benefícios?",
          answer: "Os principais tipos incluem: revisão da vida toda (inclusão de salários anteriores a 1994), revisão do buraco negro (correção de benefícios concedidos entre 1999-2009), revisão da menor faixa, revisão de atividade especial não reconhecida, revisão por erro de cálculo, e reenquadramento em modalidade mais vantajosa."
        },
        {
          question: "Existe prazo para solicitar revisão de benefícios?",
          answer: "Para revisões administrativas junto ao INSS, o prazo é de 10 anos a partir da data da primeira prestação. Para ações judiciais, há diferentes prazos dependendo do tipo de revisão. Algumas revisões, como a 'da vida toda', têm prazos específicos que devem ser observados."
        },
        {
          question: "Como saber se tenho direito à revisão do meu benefício?",
          answer: "É necessária análise técnica da carta de concessão, histórico contributivo e legislação aplicável à época da concessão. Principais indícios: valor baixo em relação às contribuições, não computação de períodos especiais, aposentadoria por idade quando poderia ser por tempo de contribuição, ou benefício concedido em período de regras desfavoráveis."
        }
      ]}
      relatedServices={[
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Planejamento Previdenciário",
          path: "/servicos/planejamento-previdenciario"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default RevisaoReenquadramentoService;
