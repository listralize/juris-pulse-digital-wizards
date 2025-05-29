
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AtuacaoSTJService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Superior Tribunal de Justiça (STJ)"
      serviceDescription="Atuação em recursos especiais e outras matérias de competência do tribunal, garantindo a aplicação uniforme da lei federal. Nossa expertise permite atuar eficazmente no STJ em questões que envolvem interpretação de lei federal e uniformização jurisprudencial."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Uniformização Jurisprudencial",
          description: "Participação na criação de precedentes que uniformizam a aplicação da lei federal em todo país."
        },
        {
          title: "Revisão de Decisões",
          description: "Possibilidade de revisão de decisões dos tribunais locais através de recursos especiais."
        },
        {
          title: "Expertise em Lei Federal",
          description: "Conhecimento especializado na interpretação e aplicação da legislação federal infraconstitucional."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Cabimento",
          description: "Verificação dos requisitos específicos para recursos especiais: violação ou divergência de lei federal."
        },
        {
          step: 2,
          title: "Fundamentação Técnica",
          description: "Elaboração de recurso com demonstração clara da violação à lei federal ou divergência jurisprudencial."
        },
        {
          step: 3,
          title: "Protocolo Eletrônico",
          description: "Apresentação do recurso no sistema eletrônico do STJ dentro dos prazos e requisitos legais."
        },
        {
          step: 4,
          title: "Acompanhamento Processual",
          description: "Monitoramento de todos os andamentos e eventual sustentação oral perante a Turma julgadora."
        },
        {
          step: 5,
          title: "Execução da Decisão",
          description: "Orientação sobre cumprimento da decisão e seus efeitos na instância de origem."
        }
      ]}
      testimonials={[
        {
          name: "Escritório Jurídico",
          quote: "O recurso especial no STJ reverteu decisão desfavorável, estabelecendo interpretação correta da lei federal."
        },
        {
          name: "Empresa do Setor Financeiro",
          quote: "A atuação no STJ garantiu interpretação uniforme da legislação que beneficiou todo o setor empresarial."
        }
      ]}
      faq={[
        {
          question: "Quando cabe recurso especial?",
          answer: "Quando há violação à lei federal ou divergência entre tribunais na interpretação de lei federal, conforme art. 105, III da CF."
        },
        {
          question: "Qual a diferença entre STF e STJ?",
          answer: "STF julga questões constitucionais, enquanto STJ uniformiza interpretação da lei federal infraconstitucional."
        },
        {
          question: "O que é o sistema de precedentes?",
          answer: "Decisões do STJ em recursos repetitivos criam teses que devem ser seguidas pelos tribunais inferiores, garantindo uniformidade."
        }
      ]}
      relatedServices={[
        {
          name: "Supremo Tribunal Federal",
          path: "/servicos/atuacao-stf"
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

export default AtuacaoSTJService;
