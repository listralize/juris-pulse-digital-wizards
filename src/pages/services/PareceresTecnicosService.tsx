
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PareceresTecnicosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Pareceres Técnicos"
      serviceDescription="Opiniões jurídicas fundamentadas sobre questões constitucionais específicas, oferecendo clareza e direcionamento estratégico para suas decisões. Elaboramos pareceres técnicos especializados que orientam estratégias jurídicas e empresariais com base em sólida fundamentação constitucional."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Opinião Jurídica Especializada",
          description: "Análise técnica aprofundada de questões constitucionais complexas por especialistas renomados na área."
        },
        {
          title: "Fundamentação Sólida",
          description: "Pareceres baseados em doutrina, jurisprudência e precedentes dos tribunais superiores, garantindo qualidade técnica."
        },
        {
          title: "Orientação Estratégica",
          description: "Direcionamento claro para tomada de decisões jurídicas e empresariais com base em análise constitucional."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Definição do Objeto",
          description: "Delimitação precisa da questão constitucional a ser analisada e dos aspectos específicos a serem abordados."
        },
        {
          step: 2,
          title: "Pesquisa Jurídica Aprofundada",
          description: "Levantamento de doutrina, jurisprudência, precedentes e legislação aplicável ao tema específico."
        },
        {
          step: 3,
          title: "Análise Constitucional",
          description: "Exame detalhado da questão sob a ótica dos princípios e normas constitucionais aplicáveis."
        },
        {
          step: 4,
          title: "Redação do Parecer",
          description: "Elaboração de documento técnico estruturado com fundamentação, análise e conclusões claras."
        },
        {
          step: 5,
          title: "Revisão e Entrega",
          description: "Revisão técnica final e entrega do parecer com recomendações estratégicas para o caso."
        }
      ]}
      testimonials={[
        {
          name: "Consultoria Jurídica",
          quote: "O parecer técnico forneceu a fundamentação perfeita para nossa estratégia em ação de grande repercussão no STF."
        },
        {
          name: "Departamento Jurídico",
          quote: "A análise constitucional orientou nossa empresa a adotar medidas preventivas que evitaram litígios custosos."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre parecer e consultoria?",
          answer: "O parecer é um documento formal e fundamentado sobre questão específica, enquanto consultoria envolve orientação contínua e estratégica."
        },
        {
          question: "O parecer pode ser usado em juízo?",
          answer: "Sim. Pareceres técnicos são importantes peças de fundamentação em ações judiciais, especialmente em questões constitucionais complexas."
        },
        {
          question: "Quem pode solicitar parecer técnico?",
          answer: "Qualquer pessoa física ou jurídica que necessite de orientação jurídica especializada sobre questões constitucionais específicas."
        }
      ]}
      relatedServices={[
        {
          name: "Análise de Constitucionalidade",
          path: "/servicos/analise-constitucionalidade"
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

export default PareceresTecnicosService;
