
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DesapropriacaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Desapropriação e Intervenção na Propriedade"
      serviceDescription="Quando o Estado intervém na sua propriedade por meio de desapropriação ou outras formas de intervenção, seus direitos à justa compensação e ao devido processo legal são primordiais. Avaliamos meticulosamente a legalidade de tais ações e lutamos pela indenização máxima possível, garantindo que seus ativos sejam protegidos e seus interesses sejam mantidos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Justa Indenização",
          description: "Luta pela indenização máxima possível, considerando valor de mercado, lucros cessantes, danos emergentes e outros prejuízos decorrentes da desapropriação."
        },
        {
          title: "Contestação de Ilegalidades",
          description: "Análise rigorosa da legalidade do procedimento desapropriatório, contestando vícios que possam anular ou invalidar a desapropriação."
        },
        {
          title: "Estratégia Processual Completa",
          description: "Atuação em todas as fases do processo, desde a declaração de utilidade pública até a execução da indenização."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Declaração Expropriatória",
          description: "Avaliação da legalidade da declaração de utilidade pública, necessidade pública ou interesse social que fundamenta a desapropriação."
        },
        {
          step: 2,
          title: "Avaliação Técnica do Bem",
          description: "Contratação de peritos especializados para avaliação precisa do imóvel, considerando todos os fatores que influenciam seu valor."
        },
        {
          step: 3,
          title: "Estratégia de Defesa",
          description: "Desenvolvimento de estratégia processual, definindo se será contestada a desapropriação ou apenas pleiteada justa indenização."
        },
        {
          step: 4,
          title: "Negociação ou Litígio",
          description: "Tentativa de acordo amigável ou condução de processo judicial para garantir indenização adequada aos prejuízos sofridos."
        },
        {
          step: 5,
          title: "Execução da Indenização",
          description: "Acompanhamento da execução até o efetivo recebimento da indenização, incluindo correção monetária e juros legais."
        }
      ]}
      testimonials={[
        {
          name: "Empresa Imobiliária Norte",
          quote: "Conseguimos indenização 300% superior à oferta inicial do município através de avaliação técnica criteriosa e estratégia processual eficaz."
        },
        {
          name: "Proprietário Rural João",
          quote: "A desapropriação da minha fazenda para rodovia resultou em indenização justa que contemplou não apenas a terra, mas todos os investimentos realizados."
        },
        {
          name: "Família Proprietária",
          quote: "Nossa casa foi desapropriada para obra pública, mas a defesa técnica garantiu indenização adequada para aquisição de imóvel equivalente em local melhor."
        }
      ]}
      faq={[
        {
          question: "Quais são os requisitos para desapropriação?",
          answer: "A desapropriação requer declaração de utilidade pública, necessidade pública ou interesse social, mediante decreto do poder público, observando o devido processo legal e garantindo justa indenização."
        },
        {
          question: "Como é calculada a indenização na desapropriação?",
          answer: "A indenização deve ser justa, prévia e em dinheiro, considerando valor de mercado atual, benfeitorias, lucros cessantes, juros compensatórios e outros prejuízos comprovadamente sofridos."
        },
        {
          question: "É possível contestar uma desapropriação?",
          answer: "Sim, pode-se contestar a necessidade, utilidade ou interesse social, vícios no procedimento, valor da indenização ou qualquer ilegalidade no processo desapropriatório."
        },
        {
          question: "Qual o prazo para conclusão de uma desapropriação?",
          answer: "O prazo varia conforme o fundamento: 5 anos para utilidade pública, 2 anos para interesse social urbano, sendo prorrogáveis por igual período mediante nova declaração fundamentada."
        }
      ]}
      relatedServices={[
        {
          name: "Responsabilidade Civil do Estado",
          path: "/servicos/responsabilidade-estado"
        },
        {
          name: "Direito Urbanístico Administrativo",
          path: "/servicos/direito-urbanistico"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default DesapropriacaoService;
