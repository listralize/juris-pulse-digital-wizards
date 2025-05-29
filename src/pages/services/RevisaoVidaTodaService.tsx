
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RevisaoVidaTodaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Revisão da Vida Toda"
      serviceDescription="Revisão especializada de aposentadorias e pensões utilizando todas as contribuições desde o início da vida laborativa, incluindo período anterior a julho de 1994, para majoração do benefício."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Análise Completa do Histórico",
          description: "Levantamento de todas as contribuições desde o início da vida laborativa, incluindo período pré-1994."
        },
        {
          title: "Cálculo Comparativo",
          description: "Comparação entre o benefício atual e o novo valor com inclusão de todo período contributivo."
        },
        {
          title: "Recuperação de Valores",
          description: "Cálculo das diferenças mensais e valores retroativos devidos."
        },
        {
          title: "Estratégia Judicial",
          description: "Ação judicial fundamentada para implementação da revisão com jurisprudência favorável."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Viabilidade",
          description: "Verificação se o segurado possui contribuições anteriores a julho de 1994 que beneficiem a revisão."
        },
        {
          step: 2,
          title: "Levantamento Histórico",
          description: "Coleta de documentos e informações sobre todo período contributivo, especialmente pré-1994."
        },
        {
          step: 3,
          title: "Cálculos Atuariais",
          description: "Elaboração de cálculos comparativos demonstrando o ganho financeiro da revisão."
        },
        {
          step: 4,
          title: "Fundamentação Jurídica",
          description: "Preparação da ação judicial com base na jurisprudência do STF e legislação aplicável."
        },
        {
          step: 5,
          title: "Acompanhamento Processual",
          description: "Condução do processo judicial até obtenção da revisão e recebimento dos valores."
        }
      ]}
      testimonials={[
        {
          name: "Carlos R., Aposentado",
          quote: "A revisão da vida toda aumentou minha aposentadoria em R$ 800 por mês. Recebi também os atrasados de 5 anos."
        },
        {
          name: "Lucia M., Pensionista",
          quote: "A pensão do meu marido foi revista e hoje recebo quase o dobro do valor anterior."
        }
      ]}
      faq={[
        {
          question: "O que é a revisão da vida toda?",
          answer: "É uma revisão que inclui no cálculo do benefício todas as contribuições do segurado, inclusive as anteriores a julho de 1994. O STF decidiu que essa inclusão é possível quando for mais vantajosa para o segurado."
        },
        {
          question: "Quem pode pedir a revisão da vida toda?",
          answer: "Podem pedir aposentados e pensionistas que tenham contribuições anteriores a julho de 1994 e que essas contribuições, se incluídas no cálculo, resultem em benefício mais vantajoso."
        },
        {
          question: "Qual o prazo para pedir a revisão?",
          answer: "O prazo é de 10 anos contados do primeiro pagamento do benefício. Porém, há discussões jurídicas sobre este prazo, especialmente após a decisão do STF de 2022."
        }
      ]}
      relatedServices={[
        {
          name: "Revisão de Benefícios",
          path: "/servicos/revisao-beneficios"
        },
        {
          name: "Cálculos Previdenciários",
          path: "/servicos/calculos-previdenciarios"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default RevisaoVidaTodaService;
