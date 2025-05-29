
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AnaliseConstitucionalidadeService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Análise de Constitucionalidade"
      serviceDescription="Avaliação de leis, projetos de lei ou atos normativos quanto à sua conformidade com a Constituição, antecipando riscos e garantindo segurança jurídica. Oferecemos análise preventiva para evitar conflitos constitucionais e orientar decisões estratégicas."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Prevenção de Riscos Jurídicos",
          description: "Identificação antecipada de possíveis incompatibilidades constitucionais, evitando custos e problemas futuros."
        },
        {
          title: "Segurança Jurídica",
          description: "Garantia de que atos e normas estejam em conformidade com a Constituição Federal, proporcionando estabilidade legal."
        },
        {
          title: "Orientação Estratégica",
          description: "Direcionamento técnico para adequação constitucional de propostas legislativas e atos administrativos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Normativa Detalhada",
          description: "Exame minucioso do texto legal ou projeto quanto aos aspectos formais e materiais de constitucionalidade."
        },
        {
          step: 2,
          title: "Confronto com Princípios Constitucionais",
          description: "Verificação da compatibilidade com princípios fundamentais, direitos e garantias constitucionais."
        },
        {
          step: 3,
          title: "Pesquisa Jurisprudencial",
          description: "Levantamento de precedentes do STF e demais tribunais superiores sobre temas correlatos."
        },
        {
          step: 4,
          title: "Elaboração de Parecer Técnico",
          description: "Produção de documento fundamentado com conclusões sobre a constitucionalidade analisada."
        },
        {
          step: 5,
          title: "Recomendações Estratégicas",
          description: "Sugestões de adequações ou estratégias alternativas para garantir conformidade constitucional."
        }
      ]}
      testimonials={[
        {
          name: "Empresa Multinacional",
          quote: "A análise prévia de constitucionalidade evitou que nossa empresa enfrentasse questionamentos judiciais custosos."
        },
        {
          name: "Órgão Público",
          quote: "O parecer técnico orientou a adequação de nossos atos administrativos, garantindo segurança jurídica total."
        }
      ]}
      faq={[
        {
          question: "Quando solicitar análise de constitucionalidade?",
          answer: "Sempre que houver dúvidas sobre a compatibilidade de leis, projetos ou atos com a Constituição, especialmente antes de sua implementação."
        },
        {
          question: "O parecer tem valor judicial?",
          answer: "Embora não seja vinculante, o parecer técnico é peça fundamental para defesa judicial e pode influenciar decisões dos tribunais."
        },
        {
          question: "Quanto tempo leva a análise?",
          answer: "Depende da complexidade da matéria, variando de poucos dias para temas simples até algumas semanas para análises mais complexas."
        }
      ]}
      relatedServices={[
        {
          name: "Pareceres Técnicos",
          path: "/servicos/pareceres-tecnicos"
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

export default AnaliseConstitucionalidadeService;
