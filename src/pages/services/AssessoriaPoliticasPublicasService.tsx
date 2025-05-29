
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssessoriaPoliticasPublicasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Assessoria em Políticas Públicas"
      serviceDescription="Orientação jurídica na formulação e implementação de políticas públicas alinhadas aos preceitos constitucionais, garantindo conformidade e eficácia. Assessoramos governos e organizações na criação de políticas que respeitem direitos fundamentais e promovam o bem-estar social."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Conformidade Constitucional",
          description: "Garantia de que políticas públicas respeitem princípios constitucionais e direitos fundamentais desde sua concepção."
        },
        {
          title: "Efetividade das Políticas",
          description: "Orientação para criação de políticas públicas eficazes que realmente alcancem seus objetivos sociais."
        },
        {
          title: "Prevenção de Judicialização",
          description: "Antecipação de possíveis questionamentos judiciais através de adequação constitucional preventiva."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Constitucional",
          description: "Análise dos aspectos constitucionais envolvidos na área de política pública a ser desenvolvida."
        },
        {
          step: 2,
          title: "Mapeamento de Direitos",
          description: "Identificação dos direitos fundamentais e sociais que devem ser observados na política pública."
        },
        {
          step: 3,
          title: "Desenho Institucional",
          description: "Orientação sobre estrutura, competências e procedimentos para implementação constitucional da política."
        },
        {
          step: 4,
          title: "Elaboração Normativa",
          description: "Assessoria na redação de decretos, portarias e normas regulamentares constitucionalmente adequadas."
        },
        {
          step: 5,
          title: "Monitoramento Constitucional",
          description: "Acompanhamento da implementação para garantir conformidade constitucional permanente."
        }
      ]}
      testimonials={[
        {
          name: "Secretaria de Estado",
          quote: "A assessoria constitucional garantiu que nossa política social fosse implementada sem questionamentos judiciais."
        },
        {
          name: "Prefeitura Municipal",
          quote: "O desenho constitucional da política de habitação assegurou sua efetividade e sustentabilidade jurídica."
        }
      ]}
      faq={[
        {
          question: "Por que políticas públicas precisam de assessoria constitucional?",
          answer: "Para garantir que respeitem direitos fundamentais, princípios constitucionais e competências federativas, evitando invalidação judicial."
        },
        {
          question: "Quais áreas podem solicitar assessoria?",
          answer: "Qualquer área de política pública: saúde, educação, habitação, assistência social, meio ambiente, segurança, entre outras."
        },
        {
          question: "A assessoria inclui participação social?",
          answer: "Sim. Orientamos sobre mecanismos constitucionais de participação popular na formulação e controle de políticas públicas."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos Sociais",
          path: "/servicos/direitos-sociais"
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

export default AssessoriaPoliticasPublicasService;
