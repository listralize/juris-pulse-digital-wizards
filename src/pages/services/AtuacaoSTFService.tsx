
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AtuacaoSTFService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Supremo Tribunal Federal (STF)"
      serviceDescription="Representação em ações de controle de constitucionalidade e recursos extraordinários, atuando no mais alto tribunal do país para defender seus interesses. Nossa equipe possui expertise específica para atuar perante o STF em todas as modalidades processuais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Expertise Especializada",
          description: "Conhecimento técnico específico dos procedimentos, precedentes e jurisprudência do Supremo Tribunal Federal."
        },
        {
          title: "Acesso Direto ao STF",
          description: "Capacidade de atuar diretamente nas mais importantes questões constitucionais do país."
        },
        {
          title: "Repercussão Nacional",
          description: "Participação em decisões que definem interpretações constitucionais com efeitos em todo território nacional."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Admissibilidade",
          description: "Verificação dos requisitos de admissibilidade e estratégia processual mais adequada para o STF."
        },
        {
          step: 2,
          title: "Elaboração Técnica Especializada",
          description: "Redação de petições com o rigor técnico e fundamentação exigidos pelo Supremo Tribunal Federal."
        },
        {
          step: 3,
          title: "Protocolo e Acompanhamento",
          description: "Protocolo eletrônico e acompanhamento de todos os andamentos processuais no sistema do STF."
        },
        {
          step: 4,
          title: "Sustentação Oral",
          description: "Realização de sustentação oral quando cabível, apresentando argumentos diretamente aos Ministros."
        },
        {
          step: 5,
          title: "Cumprimento de Decisões",
          description: "Acompanhamento da execução das decisões e orientação sobre seus efeitos e desdobramentos."
        }
      ]}
      testimonials={[
        {
          name: "Empresa Nacional",
          quote: "A atuação no STF garantiu interpretação constitucional favorável que beneficiou todo nosso setor econômico."
        },
        {
          name: "Entidade de Classe",
          quote: "O recurso extraordinário foi provido, estabelecendo precedente importante para proteção de direitos constitucionais."
        }
      ]}
      faq={[
        {
          question: "Quem pode propor ações no STF?",
          answer: "Dependendo da ação: Presidente, Congresso, PGR, partidos, confederações sindicais, entidades de classe nacionais, entre outros (art. 103 CF)."
        },
        {
          question: "O que é repercussão geral?",
          answer: "Requisito para recursos extraordinários que exige relevância econômica, política, social ou jurídica que transcenda os interesses das partes."
        },
        {
          question: "Decisões do STF são definitivas?",
          answer: "Sim. As decisões do STF em matéria constitucional são definitivas e têm efeito vinculante para todos os demais órgãos do Poder Judiciário."
        }
      ]}
      relatedServices={[
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        },
        {
          name: "Superior Tribunal de Justiça",
          path: "/servicos/atuacao-stj"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default AtuacaoSTFService;
