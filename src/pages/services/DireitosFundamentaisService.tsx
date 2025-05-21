
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitosFundamentaisService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Direitos Fundamentais"
      serviceDescription="Proteção e defesa especializada dos direitos fundamentais garantidos pela Constituição Federal, como liberdade, igualdade e dignidade da pessoa humana através de medidas judiciais e extrajudiciais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Integral",
          description: "Atuação abrangente na defesa de todos os seus direitos constitucionalmente garantidos contra violações por parte do Estado ou particulares."
        },
        {
          title: "Mecanismos Constitucionais",
          description: "Utilização de instrumentos específicos de proteção como habeas corpus, mandado de segurança, habeas data e outros remédios constitucionais."
        },
        {
          title: "Reparação de Danos",
          description: "Busca de compensação por violações a direitos fundamentais, incluindo danos morais, materiais e restabelecimento de direitos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Violação",
          description: "Avaliação detalhada do caso para identificar quais direitos fundamentais foram violados e por quais agentes ou instituições."
        },
        {
          step: 2,
          title: "Estratégia de Proteção",
          description: "Desenvolvimento de plano jurídico personalizado, definindo os instrumentos legais mais adequados para cada situação específica."
        },
        {
          step: 3,
          title: "Medidas Urgentes",
          description: "Quando necessário, obtenção de liminares e tutelas de urgência para interromper ou prevenir violações imediatamente."
        },
        {
          step: 4,
          title: "Ações Judiciais",
          description: "Ajuizamento de ações específicas como mandados de segurança, habeas corpus, ou ações ordinárias conforme o caso."
        },
        {
          step: 5,
          title: "Acompanhamento Recursal",
          description: "Representação em todas as instâncias judiciais, incluindo tribunais superiores quando necessário para garantir o respeito aos direitos fundamentais."
        }
      ]}
      testimonials={[
        {
          name: "Maria L.",
          quote: "O mandado de segurança impetrado garantiu meu direito fundamental à saúde, assegurando o tratamento médico que estava sendo negado pelo sistema público."
        },
        {
          name: "Associação Comunitária Vila Nova",
          quote: "A ação coletiva garantiu que nossa comunidade tivesse respeitado seu direito fundamental à moradia digna, impedindo uma remoção forçada sem alternativas adequadas."
        },
        {
          name: "Pedro G., Professor",
          quote: "Através de uma ação constitucional, consegui defender minha liberdade de cátedra e expressão acadêmica contra censura institucional."
        }
      ]}
      faq={[
        {
          question: "Quais são os principais direitos fundamentais protegidos pela Constituição?",
          answer: "A Constituição Federal protege diversos direitos fundamentais, incluindo: direito à vida, liberdade, igualdade, segurança, propriedade, além de direitos sociais como educação, saúde, trabalho, moradia, lazer, segurança, previdência social, proteção à maternidade e à infância, e assistência aos desamparados. Também são garantidas liberdades individuais como expressão, religião, locomoção e associação."
        },
        {
          question: "O que é um remédio constitucional e quando utilizá-lo?",
          answer: "Remédios constitucionais são instrumentos jurídicos criados para proteger direitos fundamentais. Os principais são: Habeas Corpus (protege a liberdade de locomoção), Mandado de Segurança (protege direito líquido e certo não amparado por HC), Mandado de Injunção (garante exercício de direitos prejudicados por falta de regulamentação), Habeas Data (acesso ou retificação de informações pessoais) e Ação Popular (anulação de atos lesivos ao patrimônio público). Cada um tem requisitos específicos e deve ser utilizado conforme a natureza do direito violado."
        },
        {
          question: "É possível acionar o Estado por omissão na garantia de direitos fundamentais?",
          answer: "Sim. O Estado pode ser responsabilizado tanto por ações que violem direitos fundamentais quanto por omissões. A omissão estatal ocorre quando há dever constitucional de agir para garantir determinado direito e o Estado se mantém inerte. Para isso, existem instrumentos como o Mandado de Injunção e Ação Direta de Inconstitucionalidade por Omissão (no controle concentrado), além de ações ordinárias que podem buscar a implementação de políticas públicas ou reparação por danos causados pela omissão estatal."
        }
      ]}
      relatedServices={[
        {
          name: "Liberdades Constitucionais",
          path: "/servicos/liberdades-constitucionais"
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

export default DireitosFundamentaisService;
