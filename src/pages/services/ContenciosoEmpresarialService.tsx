
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContenciosoEmpresarialService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Contencioso Empresarial"
      serviceDescription="Representação especializada em litígios societários, disputas contratuais, conflitos entre sócios e outras controvérsias empresariais, buscando soluções eficientes e proteção dos interesses comerciais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Especializada",
          description: "Representação técnica em litígios complexos com profundo conhecimento em direito societário e empresarial."
        },
        {
          title: "Soluções Estratégicas",
          description: "Abordagem focada em resultados práticos que preservem relacionamentos comerciais quando possível."
        },
        {
          title: "Prevenção de Perdas",
          description: "Proteção dos ativos empresariais e minimização de riscos financeiros através de defesa eficiente."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Conflito",
          description: "Avaliação detalhada da situação jurídica, análise de documentos e identificação de estratégias processuais."
        },
        {
          step: 2,
          title: "Estratégia Processual",
          description: "Desenvolvimento de estratégia jurídica personalizada, considerando alternativas extrajudiciais e judiciais."
        },
        {
          step: 3,
          title: "Tentativa de Acordo",
          description: "Busca de soluções negociadas através de mediação ou arbitragem quando vantajoso para o cliente."
        },
        {
          step: 4,
          title: "Litígio Judicial",
          description: "Representação em todas as instâncias judiciais com acompanhamento processual completo e proativo."
        },
        {
          step: 5,
          title: "Execução e Cumprimento",
          description: "Acompanhamento da execução de decisões e acordos, garantindo o efetivo cumprimento das obrigações."
        }
      ]}
      testimonials={[
        {
          name: "Sociedade Empresária Regional",
          quote: "A representação no conflito societário foi excepcional, conseguindo preservar a empresa e resolver a disputa entre sócios de forma justa."
        },
        {
          name: "Empresa de Tecnologia",
          quote: "O litígio por violação de propriedade intelectual foi conduzido com maestria, resultando em acordo vantajoso e proteção da nossa inovação."
        },
        {
          name: "Grupo Familiar",
          quote: "A mediação empresarial resolveu nosso conflito sucessório de forma civilizada, preservando a unidade familiar e a continuidade dos negócios."
        }
      ]}
      faq={[
        {
          question: "Quais são os tipos mais comuns de conflitos empresariais?",
          answer: "Os principais incluem: disputas entre sócios (quebra de affectio societatis, abuso de poder), conflitos contratuais (inadimplemento, interpretação de cláusulas), disputas societárias (exclusão de sócio, dissolução), litígios com fornecedores/clientes, conflitos trabalhistas de alta complexidade, e disputas de propriedade intelectual."
        },
        {
          question: "É melhor resolver conflitos por arbitragem ou justiça comum?",
          answer: "Depende do caso. Arbitragem oferece celeridade, especialização dos árbitros, confidencialidade e flexibilidade processual, sendo ideal para disputas complexas entre empresas. Justiça comum é necessária quando há urgência para medidas cautelares, indisponibilidade de direitos, ou quando não há cláusula arbitral válida."
        },
        {
          question: "Como prevenir conflitos empresariais?",
          answer: "Prevenção inclui: contratos bem elaborados com cláusulas claras, acordo de sócios detalhado, políticas internas definidas, comunicação transparente, auditoria jurídica periódica, compliance efetivo, e cláusulas de resolução alternativa de conflitos. Investir em prevenção é sempre mais econômico que litigar."
        }
      ]}
      relatedServices={[
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        },
        {
          name: "Governança Corporativa",
          path: "/servicos/governanca-corporativa"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ContenciosoEmpresarialService;
