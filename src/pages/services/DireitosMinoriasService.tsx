
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitosMinoriasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Direitos das Minorias"
      serviceDescription="Proteção jurídica a grupos vulneráveis, assegurando que seus direitos e garantias constitucionais sejam plenamente respeitados e efetivados. Defendemos comunidades LGBTQIA+, indígenas, quilombolas, pessoas com deficiência e outros grupos que necessitam de proteção especial."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Especializada",
          description: "Defesa jurídica específica para grupos vulneráveis, considerando suas particularidades e necessidades especiais de proteção."
        },
        {
          title: "Políticas Afirmativas",
          description: "Promoção e defesa de ações afirmativas que garantam igualdade material e compensem desvantagens históricas."
        },
        {
          title: "Combate à Discriminação",
          description: "Ação firme contra todas as formas de preconceito, intolerância e discriminação que atingem grupos minoritários."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação da Vulnerabilidade",
          description: "Análise da situação específica do grupo minoritário e identificação das violações ou ameaças a seus direitos."
        },
        {
          step: 2,
          title: "Fundamentação Específica",
          description: "Aplicação de normas constitucionais e internacionais de proteção a grupos vulneráveis e minorias."
        },
        {
          step: 3,
          title: "Estratégia Diferenciada",
          description: "Desenvolvimento de abordagem jurídica que considere as especificidades culturais, sociais e históricas do grupo."
        },
        {
          step: 4,
          title: "Articulação Institucional",
          description: "Trabalho conjunto com órgãos de proteção como Ministério Público, Defensoria e movimentos sociais."
        },
        {
          step: 5,
          title: "Proteção Integral",
          description: "Acompanhamento contínuo para garantir efetivação plena dos direitos e prevenção de novas violações."
        }
      ]}
      testimonials={[
        {
          name: "Comunidade Quilombola",
          quote: "Conseguimos a titulação definitiva de nossas terras ancestrais após décadas de luta, garantindo nossa identidade cultural."
        },
        {
          name: "Pessoa LGBTQIA+",
          quote: "A defesa dos meus direitos fundamentais garantiu o reconhecimento da minha identidade e proteção contra discriminação."
        }
      ]}
      faq={[
        {
          question: "Quem são consideradas minorias?",
          answer: "Grupos que, mesmo podendo ser numericamente majoritários, estão em situação de vulnerabilidade social, política ou econômica, necessitando proteção especial."
        },
        {
          question: "As ações afirmativas são constitucionais?",
          answer: "Sim. O STF reconhece a constitucionalidade das ações afirmativas como instrumentos de promoção da igualdade material e correção de desigualdades históricas."
        },
        {
          question: "Como funciona a proteção internacional?",
          answer: "Através de tratados de direitos humanos que o Brasil ratificou, criando obrigações de proteção especial a grupos vulneráveis com força constitucional."
        }
      ]}
      relatedServices={[
        {
          name: "Igualdade e Não Discriminação",
          path: "/servicos/igualdade-nao-discriminacao"
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

export default DireitosMinoriasService;
