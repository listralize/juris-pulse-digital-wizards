
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const LiberdadesConstitucionaisService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Liberdades Constitucionais"
      serviceDescription="Atuação na defesa das liberdades asseguradas pela Constituição, como liberdade de expressão, de reunião e de associação, garantindo o pleno exercício dos direitos civis fundamentais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção contra Censura",
          description: "Defesa jurídica contra qualquer tipo de censura ou restrição indevida à liberdade de expressão e manifestação do pensamento."
        },
        {
          title: "Garantia de Direitos Civis",
          description: "Atuação para assegurar o exercício de direitos como reunião pacífica, associação e livre circulação."
        },
        {
          title: "Reparação de Violações",
          description: "Busca de compensação e responsabilização em casos de violações às liberdades constitucionalmente garantidas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Caso",
          description: "Avaliação detalhada da situação para identificar qual liberdade constitucional foi violada e em que circunstâncias."
        },
        {
          step: 2,
          title: "Estratégia Jurídica",
          description: "Desenvolvimento de estratégia customizada, selecionando os instrumentos legais mais adequados para o caso concreto."
        },
        {
          step: 3,
          title: "Medidas Preventivas",
          description: "Quando possível, atuação preventiva para evitar violações iminentes através de notificações e medidas cautelares."
        },
        {
          step: 4,
          title: "Ações Judiciais",
          description: "Ajuizamento de ações específicas como mandados de segurança, habeas corpus ou ações ordinárias conforme necessário."
        },
        {
          step: 5,
          title: "Acompanhamento Completo",
          description: "Representação em todas as instâncias judiciais até decisão final, incluindo tribunais superiores quando necessário."
        }
      ]}
      testimonials={[
        {
          name: "Jornal Independente",
          quote: "A intervenção jurídica garantiu nosso direito de publicar reportagens investigativas sem sofrer censura prévia ou retaliações indevidas."
        },
        {
          name: "Coletivo Cultural",
          quote: "Conseguimos realizar nossa manifestação artística que havia sido arbitrariamente proibida, graças à defesa eficiente de nossa liberdade de expressão."
        },
        {
          name: "Roberto M., Professor",
          quote: "A defesa constitucional garantiu meu direito de expressar opiniões acadêmicas sem sofrer perseguição ou constrangimento institucional."
        }
      ]}
      faq={[
        {
          question: "Quais são as principais liberdades garantidas pela Constituição Federal?",
          answer: "A Constituição garante, entre outras, as seguintes liberdades: liberdade de expressão e manifestação do pensamento; liberdade de consciência e crença religiosa; liberdade de locomoção; liberdade de reunião pacífica; liberdade de associação; liberdade profissional; liberdade de iniciativa econômica; e liberdade política. Estas liberdades são consideradas direitos fundamentais e gozam de proteção especial no ordenamento jurídico."
        },
        {
          question: "A liberdade de expressão permite qualquer tipo de manifestação?",
          answer: "Não. Apesar de ser um direito fundamental, a liberdade de expressão não é absoluta. Encontra limites em outros direitos constitucionais, como a honra, a imagem, a privacidade e a dignidade humana. Não estão protegidos pela liberdade de expressão manifestações que constituam crimes, como discurso de ódio, incitação à violência, calúnia, injúria, difamação ou apologia a crimes. O desafio jurídico está justamente em definir esse equilíbrio entre liberdades nos casos concretos."
        },
        {
          question: "O que fazer quando uma autoridade pública restringe indevidamente uma liberdade constitucional?",
          answer: "Quando uma autoridade pública restringe indevidamente uma liberdade constitucional, é possível utilizar remédios constitucionais como o mandado de segurança (para proteger direito líquido e certo) ou habeas corpus (no caso de restrição à liberdade de locomoção). Também é possível ingressar com ação ordinária pedindo a anulação do ato restritivo e eventual indenização por danos morais e materiais. Em situações urgentes, pode-se solicitar medidas liminares para suspender imediatamente os efeitos do ato restritivo enquanto se discute o mérito da questão."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        },
        {
          name: "Mandados de Segurança",
          path: "/servicos/mandados-seguranca"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default LiberdadesConstitucionaisService;
