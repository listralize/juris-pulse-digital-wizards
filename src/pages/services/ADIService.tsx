
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ADIService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Ação Direta de Inconstitucionalidade (ADI)"
      serviceDescription="A ADI é a espada da Justiça Constitucional. Quando uma lei ou ato normativo federal ou estadual viola a Constituição, impetramos ADI no STF para declarar sua inconstitucionalidade. Não toleramos afronta à Carta Magna. Nossa expertise garante que normas inconstitucionais sejam expurgadas do ordenamento jurídico com a força e precisão necessárias."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Controle Abstrato de Constitucionalidade",
          description: "Atuação direta no STF para questionar normas inconstitucionais em tese, protegendo a ordem jurídica constitucional de forma ampla e definitiva."
        },
        {
          title: "Efeitos Erga Omnes",
          description: "Decisão produz efeitos contra todos, garantindo que a inconstitucionalidade seja reconhecida de forma geral e vinculante para todo o território nacional."
        },
        {
          title: "Proteção do Estado Democrático de Direito",
          description: "Defesa da supremacia constitucional e dos princípios fundamentais que estruturam nosso ordenamento jurídico democrático."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Constitucionalidade",
          description: "Exame minucioso da norma questionada para identificar vícios de inconstitucionalidade formal ou material em face da Constituição Federal."
        },
        {
          step: 2,
          title: "Verificação de Legitimidade Ativa",
          description: "Confirmação de que o requerente possui legitimidade constitucional para propor a ação conforme art. 103 da Constituição Federal."
        },
        {
          step: 3,
          title: "Fundamentação Jurídica Robusta",
          description: "Elaboração de petição inicial com sólida fundamentação constitucional, demonstrando clara violação aos preceitos constitucionais."
        },
        {
          step: 4,
          title: "Protocolo no STF",
          description: "Distribuição da ação diretamente no Supremo Tribunal Federal, com acompanhamento processual especializado."
        },
        {
          step: 5,
          title: "Acompanhamento até Julgamento",
          description: "Sustentação oral e acompanhamento integral do processo até decisão final do Plenário do STF."
        }
      ]}
      testimonials={[
        {
          name: "Confederação Nacional",
          quote: "A ADI que impetramos resultou na declaração de inconstitucionalidade de lei estadual que violava princípios federativos. Vitória histórica para o setor."
        },
        {
          name: "Assembleia Legislativa",
          quote: "Nossa competência legislativa foi preservada através de ADI bem-sucedida que reconheceu invasão de competência por norma federal."
        }
      ]}
      faq={[
        {
          question: "Quem pode propor ADI?",
          answer: "Apenas os legitimados do art. 103 da CF: Presidente da República, Mesa do Senado/Câmara, Mesa de Assembleia Legislativa, Governador, PGR, Conselho Federal da OAB, partido político, confederação sindical ou entidade de classe de âmbito nacional."
        },
        {
          question: "Qual o objeto da ADI?",
          answer: "Lei ou ato normativo federal ou estadual que contrarie a Constituição Federal. Não cabe contra normas municipais, atos administrativos ou normas anteriores à Constituição."
        },
        {
          question: "A decisão tem efeito retroativo?",
          answer: "Sim, a decisão em ADI tem efeito ex tunc (retroativo), anulando a norma desde sua origem, salvo modulação temporal excepcional pelo STF por razões de segurança jurídica."
        }
      ]}
      relatedServices={[
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        },
        {
          name: "Consultoria Constitucional",
          path: "/servicos/consultoria-constitucional"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default ADIService;
