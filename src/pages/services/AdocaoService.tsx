
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AdocaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito da Família"
      serviceName="Adoção"
      serviceDescription="Orientação e acompanhamento jurídico completo em processos de adoção, nacional ou internacional, auxiliando famílias a concretizarem o sonho de adotar uma criança ou adolescente."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Acompanhamento Integral",
          description: "Suporte em todas as etapas do processo de adoção, do cadastro inicial até a sentença definitiva."
        },
        {
          title: "Conhecimento Especializado",
          description: "Experiência com os requisitos específicos e procedimentos legais do sistema de adoção brasileiro."
        },
        {
          title: "Preparação Completa",
          description: "Orientação para entrevistas, visitas domiciliares e demais avaliações necessárias durante o processo."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Gratuita",
          description: "Realizamos uma análise preliminar do seu caso, entendemos suas expectativas e explicamos todos os requisitos e etapas do processo de adoção."
        },
        {
          step: 2,
          title: "Preparação e Documentação",
          description: "Auxiliamos na preparação da documentação necessária para inscrição no Cadastro Nacional de Adoção e orientamos sobre os cursos preparatórios obrigatórios."
        },
        {
          step: 3,
          title: "Habilitação para Adoção",
          description: "Acompanhamos todo o processo de habilitação, incluindo entrevistas, visitas domiciliares e avaliações psicossociais."
        },
        {
          step: 4,
          title: "Período de Convivência",
          description: "Fornecemos suporte jurídico durante o estágio de convivência, assegurando que todos os requisitos legais sejam cumpridos."
        },
        {
          step: 5,
          title: "Finalização do Processo",
          description: "Acompanhamos a conclusão do processo com a sentença de adoção e posterior emissão da nova certidão de nascimento."
        }
      ]}
      testimonials={[
        {
          name: "Família Oliveira",
          quote: "Após cinco anos de espera, finalmente nosso filho chegou. O apoio jurídico durante todo esse período foi fundamental para não desistirmos."
        },
        {
          name: "Roberta e Marcos",
          quote: "O conhecimento dos advogados sobre os trâmites da adoção internacional nos deu segurança em cada etapa do processo."
        },
        {
          name: "Helena P.",
          quote: "Como mãe solo, temia encontrar obstáculos no processo de adoção, mas com a orientação adequada, consegui realizar meu sonho."
        }
      ]}
      faq={[
        {
          question: "Quais são os requisitos para adotar no Brasil?",
          answer: "Os principais requisitos são: ser maior de 18 anos, diferença mínima de 16 anos entre adotante e adotado, comprovação de idoneidade e estabilidade, participação em curso preparatório e aprovação em avaliação psicossocial."
        },
        {
          question: "Quanto tempo dura o processo de adoção?",
          answer: "O tempo pode variar significativamente. O processo de habilitação leva em média 6 a 12 meses. Após habilitado, o tempo de espera depende do perfil da criança desejado. Quanto mais restritivo o perfil (bebês, sem irmãos, sem doenças), maior o tempo de espera, que pode chegar a anos."
        },
        {
          question: "Pessoas solteiras ou casais homoafetivos podem adotar?",
          answer: "Sim. A legislação brasileira permite a adoção por pessoas solteiras e por casais homoafetivos. O que se avalia é a capacidade de oferecer um ambiente familiar adequado para o desenvolvimento da criança ou adolescente."
        }
      ]}
      relatedServices={[
        {
          name: "Proteção de Menores",
          path: "/servicos/protecao-menores"
        },
        {
          name: "Casamento e União Estável",
          path: "/servicos/casamento-uniao-estavel"
        }
      ]}
      mainAreaPath="/familia"
    />
  );
};

export default AdocaoService;
