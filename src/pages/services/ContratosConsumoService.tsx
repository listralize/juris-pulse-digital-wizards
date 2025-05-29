
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContratosConsumoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Contratos de Consumo"
      serviceDescription="Análise e contestação especializada de cláusulas abusivas em contratos de adesão e outros contratos de consumo. Nossa atuação identifica práticas contratuais que violam o equilíbrio da relação de consumo, garantindo a revisão ou anulação de cláusulas prejudiciais e a preservação dos direitos fundamentais do consumidor."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação de Cláusulas Abusivas",
          description: "Análise técnica especializada para identificar cláusulas que violam o CDC, incluindo as que estabelecem obrigações excessivas, limitam direitos essenciais ou criam vantagens exageradas para o fornecedor."
        },
        {
          title: "Revisão Judicial de Contratos",
          description: "Atuação para revisão ou anulação de cláusulas abusivas através de ação judicial, garantindo reequilíbrio contratual e reparação por danos causados pela aplicação de cláusulas ilegais."
        },
        {
          title: "Proteção Integral do Consumidor",
          description: "Defesa que vai além da simples revisão contratual, incluindo indenização por danos morais quando a aplicação de cláusulas abusivas causa constrangimento ou prejuízo significativo ao consumidor."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Jurídica do Contrato",
          description: "Exame detalhado de todas as cláusulas contratuais para identificar disposições abusivas conforme artigo 51 do CDC e jurisprudência consolidada dos tribunais superiores."
        },
        {
          step: 2,
          title: "Identificação de Desequilíbrios",
          description: "Mapeamento de cláusulas que criam desequilíbrio excessivo entre direitos e obrigações, incluindo multas abusivas, limitações de responsabilidade e transferência inadequada de riscos."
        },
        {
          step: 3,
          title: "Estratégia de Contestação",
          description: "Desenvolvimento de estratégia específica para contestar as cláusulas abusivas, seja através de negociação extrajudicial ou preparação para ação judicial revisional."
        },
        {
          step: 4,
          title: "Negociação com Fornecedor",
          description: "Tentativa de acordo amigável para revisão das cláusulas abusivas, buscando solução rápida que preserve a relação contratual com termos equilibrados."
        },
        {
          step: 5,
          title: "Ação Revisional de Contrato",
          description: "Quando necessário, ajuizamento de ação para revisão judicial do contrato, buscando anulação de cláusulas abusivas e indenização por danos causados por sua aplicação."
        }
      ]}
      testimonials={[
        {
          name: "João Pedro S.",
          quote: "Tinha um contrato de financiamento com juros abusivos e multa desproporcional. A assessoria jurídica conseguiu revisar o contrato, reduzindo significativamente os juros e eliminando a multa excessiva. Economizei milhares de reais."
        },
        {
          name: "Maria Helena R.",
          quote: "Um plano de saúde tinha cláusulas que limitavam meus direitos de forma absurda. Com a revisão judicial, consegui não só a anulação das cláusulas como também indenização pelos tratamentos que foram negados indevidamente."
        },
        {
          name: "Empresa Familiar",
          quote: "Nosso contrato de fornecimento tinha cláusulas que nos prejudicavam enormemente. A renegociação conduzida pela equipe jurídica resultou em termos muito mais equilibrados e justos para ambas as partes."
        },
        {
          name: "Ana Beatriz L.",
          quote: "Descobri que meu contrato de cartão de crédito tinha várias cláusulas abusivas sobre tarifas e encargos. Além da revisão das cláusulas, consegui ressarcimento de todos os valores cobrados indevidamente ao longo dos anos."
        },
        {
          name: "Roberto C.",
          quote: "Um contrato de prestação de serviços tinha cláusula que me obrigava a pagar mesmo se o serviço não fosse prestado adequadamente. A ação judicial anulou essa cláusula e ainda consegui indenização por danos morais."
        }
      ]}
      faq={[
        {
          question: "O que são cláusulas abusivas e como identificá-las?",
          answer: "Cláusulas abusivas são disposições contratuais que estabelecem obrigações iníquas, abusivas, que coloquem o consumidor em desvantagem exagerada ou sejam incompatíveis com a boa-fé. O artigo 51 do CDC lista várias modalidades, como cláusulas que limitam responsabilidade, transferem riscos inerentes ao fornecedor ou estabelecem penalidades desproporcionais."
        },
        {
          question: "Posso revisar um contrato mesmo depois de assinado há anos?",
          answer: "Sim, cláusulas abusivas são nulas de pleno direito, independentemente do tempo transcorrido desde a assinatura. O CDC protege o consumidor contra práticas abusivas mesmo em contratos antigos. Além disso, há direito à repetição de valores pagos indevidamente com base em cláusulas nulas."
        },
        {
          question: "A revisão de contrato pode gerar indenização por danos morais?",
          answer: "Sim, quando a aplicação de cláusulas abusivas causa constrangimento, limitação excessiva de direitos ou prejuízo significativo ao consumidor, pode haver direito à indenização por danos morais. A jurisprudência reconhece que certas práticas contratuais abusivas violam a dignidade do consumidor."
        },
        {
          question: "Como funciona o processo de revisão judicial de contrato?",
          answer: "A ação revisional busca a anulação das cláusulas abusivas e o reequilíbrio do contrato. O juiz pode declarar a nulidade de cláusulas específicas, manter o restante do contrato e determinar a restituição de valores pagos indevidamente. É um processo que visa preservar a relação contratual com termos justos."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos do Consumidor",
          path: "/servicos/direitos-consumidor"
        },
        {
          name: "Práticas Abusivas",
          path: "/servicos/praticas-abusivas"
        }
      ]}
      mainAreaPath="/consumidor"
    />
  );
};

export default ContratosConsumoService;
