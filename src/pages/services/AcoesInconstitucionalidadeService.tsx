
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AcoesInconstitucionalidadeService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Ações de Inconstitucionalidade"
      serviceDescription="Quando a validade de uma lei está em jogo, o Supremo Tribunal Federal é o palco. Nossa equipe não apenas conhece as regras; nós as dominamos. Seja para derrubar um ato inconstitucional que ameaça seus direitos ou para defender a constitucionalidade de uma norma essencial, nossa estratégia é implacável e nossos resultados, incontestáveis."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Expertise no STF",
          description: "Dominamos os procedimentos e estratégias específicas do Supremo Tribunal Federal, garantindo representação de elite na mais alta corte do país."
        },
        {
          title: "Controle Concentrado Completo",
          description: "Atuação em ADI, ADC, ADPF e ADO com visão estratégica integral, seja para atacar normas inconstitucionais ou defender a validade de atos essenciais."
        },
        {
          title: "Impacto Jurisprudencial",
          description: "Nossas ações não apenas resolvem seu caso, mas podem criar precedentes que moldam o direito brasileiro, protegendo direitos em escala nacional."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Constitucional Profunda",
          description: "Examinamos minuciosamente a norma questionada, identificando vícios de inconstitucionalidade formal ou material com precisão cirúrgica."
        },
        {
          step: 2,
          title: "Estratégia Jurisprudencial",
          description: "Desenvolvemos argumentação baseada no posicionamento do STF, antecipando movimentos dos ministros e construindo teses vencedoras."
        },
        {
          step: 3,
          title: "Legitimidade Ativa",
          description: "Verificamos e, quando necessário, articulamos a legitimidade adequada para propor a ação, garantindo admissibilidade processual."
        },
        {
          step: 4,
          title: "Petição Técnica Impecável",
          description: "Elaboramos peças processuais de alto nível técnico, com fundamentação doutrinária e jurisprudencial irrefutável."
        },
        {
          step: 5,
          title: "Sustentação Oral Estratégica",
          description: "Quando admitida, realizamos sustentação oral focada nos pontos cruciais, influenciando diretamente o julgamento dos ministros."
        }
      ]}
      testimonials={[
        {
          name: "Confederação Nacional da Indústria",
          quote: "A ação direta de inconstitucionalidade proposta derrubou norma que inviabilizaria nossas operações, protegendo milhares de empregos e bilhões em investimentos."
        },
        {
          name: "Município de São Paulo",
          quote: "A ADC garantiu a constitucionalidade de nossa lei municipal inovadora, permitindo que servisse de modelo para outras cidades brasileiras."
        },
        {
          name: "Ordem dos Advogados do Brasil",
          quote: "A ADPF impetrada protegeu prerrogativas fundamentais da advocacia, assegurando o exercício pleno da profissão em todo território nacional."
        }
      ]}
      faq={[
        {
          question: "Quem pode propor ações de controle concentrado de constitucionalidade?",
          answer: "As ações podem ser propostas por legitimados específicos previstos na Constituição, como Presidente da República, governadores, assembleias legislativas, partidos políticos, confederações sindicais, entidades de classe de âmbito nacional, Procurador-Geral da República e Conselho Federal da OAB."
        },
        {
          question: "Qual a diferença entre ADI e ADC?",
          answer: "A ADI (Ação Direta de Inconstitucionalidade) busca declarar uma norma inconstitucional, enquanto a ADC (Ação Declaratória de Constitucionalidade) visa confirmar a constitucionalidade de norma que enfrenta controvérsia judicial. Ambas têm efeito vinculante para todo o Poder Judiciário."
        },
        {
          question: "O que é uma ADPF e quando utilizá-la?",
          answer: "A ADPF (Arguição de Descumprimento de Preceito Fundamental) é usada quando houver lesão ou ameaça a preceito fundamental da Constituição, especialmente quando não houver outro meio eficaz. É cabível contra atos do Poder Público de qualquer esfera."
        },
        {
          question: "As decisões do STF nessas ações têm que efeito?",
          answer: "As decisões têm efeito vinculante em relação aos demais órgãos do Poder Judiciário e à Administração Pública direta e indireta, nas esferas federal, estadual e municipal, e efeito erga omnes (contra todos)."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
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

export default AcoesInconstitucionalidadeService;
