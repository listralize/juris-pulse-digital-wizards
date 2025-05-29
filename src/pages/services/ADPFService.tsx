
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ADPFService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Arguição de Descumprimento de Preceito Fundamental (ADPF)"
      serviceDescription="A ADPF é nossa artilharia pesada quando preceitos fundamentais da Constituição são violados por atos do poder público. Quando outros instrumentos são insuficientes, impetramos ADPF no STF para prevenir ou reparar lesões aos alicerces constitucionais. Protegemos os fundamentos da República com a máxima determinação."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção de Preceitos Fundamentais",
          description: "Salvaguarda dos princípios e regras mais essenciais da Constituição, garantindo integridade do sistema constitucional."
        },
        {
          title: "Subsidiariedade Estratégica",
          description: "Utilizada quando não há outro meio eficaz para sanar lesão a preceito fundamental, oferecendo proteção constitucional residual mas poderosa."
        },
        {
          title: "Amplo Objeto de Controle",
          description: "Abrange atos federais, estaduais e municipais, incluindo normas pré-constitucionais e atos administrativos, com escopo mais amplo que outras ações."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação do Preceito Fundamental",
          description: "Demonstração clara de qual preceito fundamental está sendo violado - direitos fundamentais, princípios constitucionais estruturantes ou cláusulas pétreas."
        },
        {
          step: 2,
          title: "Comprovação de Lesão ou Ameaça",
          description: "Evidenciação de que o ato do poder público causa ou ameaça causar lesão efetiva ao preceito fundamental identificado."
        },
        {
          step: 3,
          title: "Demonstração de Subsidiariedade",
          description: "Prova de que não existe outro meio eficaz para sanar a lesividade, atendendo ao requisito da subsidiariedade."
        },
        {
          step: 4,
          title: "Protocolo no STF",
          description: "Elaboração e apresentação de petição fundamentada diretamente no Supremo Tribunal Federal."
        },
        {
          step: 5,
          title: "Sustentação e Acompanhamento",
          description: "Defesa técnica com sustentação oral e acompanhamento até decisão final que preserve os preceitos fundamentais."
        }
      ]}
      testimonials={[
        {
          name: "Partido Político Nacional",
          quote: "A ADPF protegeu preceitos democráticos fundamentais contra atos que ameaçavam a estrutura constitucional. Vitória pela democracia."
        },
        {
          name: "Entidade de Classe Nacional",
          quote: "Quando direitos fundamentais profissionais foram atingidos por norma municipal, a ADPF foi o instrumento que garantiu nossa proteção constitucional."
        }
      ]}
      faq={[
        {
          question: "O que são preceitos fundamentais?",
          answer: "São os princípios e regras constitucionais mais essenciais: direitos e garantias fundamentais, princípios constitucionais sensíveis, cláusulas pétreas e princípios estruturantes da Constituição."
        },
        {
          question: "Quando a ADPF é cabível?",
          answer: "Quando ato do poder público lesiona preceito fundamental e não há outro meio eficaz para sanar a lesividade (subsidiariedade). Cabe contra atos federais, estaduais e municipais."
        },
        {
          question: "ADPF pode questionar lei municipal?",
          answer: "Sim, diferentemente da ADI. A ADPF pode questionar qualquer ato do poder público (federal, estadual ou municipal) que viole preceito fundamental."
        }
      ]}
      relatedServices={[
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        },
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default ADPFService;
