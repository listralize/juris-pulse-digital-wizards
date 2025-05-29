
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const TribunaisContasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Defesa perante Tribunais de Contas"
      serviceDescription="O escrutínio dos Tribunais de Contas (Federal, Estaduais e Municipais) exige representação especializada. Fornecemos defesa especializada em processos de prestação de contas, auditorias e processos sancionatórios, preparando meticulosamente argumentos e realizando sustentações orais para proteger agentes públicos e entidades privadas."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Especializada em TCU/TCE/TCM",
          description: "Representação técnica especializada em processos perante Tribunais de Contas Federal, Estaduais e Municipais."
        },
        {
          title: "Gestão de Auditorias e Fiscalizações",
          description: "Assessoria durante auditorias e fiscalizações, garantindo colaboração adequada e defesa de irregularidades apontadas."
        },
        {
          title: "Sustentação Oral Especializada",
          description: "Sustentações orais técnicas e persuasivas, apresentando defesas robustas em sessões de julgamento dos Tribunais de Contas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Processo",
          description: "Avaliação detalhada do processo instaurado no Tribunal de Contas, identificando irregularidades apontadas e estratégias de defesa."
        },
        {
          step: 2,
          title: "Coleta de Elementos de Defesa",
          description: "Reunião de documentação comprobatória, pareceres técnicos e elementos necessários para fundamentar a defesa."
        },
        {
          step: 3,
          title: "Elaboração de Defesa Técnica",
          description: "Redação de defesa fundamentada, contestando achados de auditoria e demonstrando regularidade dos atos praticados."
        },
        {
          step: 4,
          title: "Sustentação Oral",
          description: "Preparação e realização de sustentação oral perante o colegiado do Tribunal de Contas, reforçando argumentos de defesa."
        },
        {
          step: 5,
          title: "Recursos e Cumprimento",
          description: "Interposição de recursos quando necessário e assessoria para cumprimento de acórdãos e determinações do Tribunal."
        }
      ]}
      testimonials={[
        {
          name: "Ex-Secretário Municipal",
          quote: "A defesa no TCM resultou em absolvição completa em processo que questionava gestão de R$ 200 milhões, preservando minha idoneidade."
        },
        {
          name: "Empresa de Obras Públicas",
          quote: "A sustentação oral no TCE foi decisiva para demonstrar regularidade do contrato e evitar sanções que inviabilizariam nossos negócios."
        },
        {
          name: "Dirigente de Autarquia",
          quote: "A defesa técnica conseguiu reduzir multa de R$ 500 mil para advertência, demonstrando boa-fé e regularidade dos procedimentos adotados."
        }
      ]}
      faq={[
        {
          question: "Quais são as competências dos Tribunais de Contas?",
          answer: "Fiscalização contábil, financeira, orçamentária, operacional e patrimonial dos órgãos públicos, julgamento de contas dos administradores e responsáveis por bens públicos."
        },
        {
          question: "Como funciona um processo no Tribunal de Contas?",
          answer: "Inicia com auditoria ou denúncia, instrução técnica, citação/audiência do responsável, defesa, parecer do Ministério Público de Contas e julgamento pelo colegiado."
        },
        {
          question: "Quais sanções podem ser aplicadas pelos Tribunais de Contas?",
          answer: "Multa, determinação de ressarcimento ao erário, inabilitação para função pública, declaração de inidoneidade para contratar com o poder público e outras medidas."
        },
        {
          question: "É possível recurso de decisões dos Tribunais de Contas?",
          answer: "Sim, cabem recursos de reconsideração e embargos de declaração internamente, e ações judiciais para questionar aspectos de legalidade, mas não o mérito administrativo."
        }
      ]}
      relatedServices={[
        {
          name: "Improbidade Administrativa",
          path: "/servicos/improbidade-administrativa"
        },
        {
          name: "Consultoria em Direito Administrativo",
          path: "/servicos/consultoria-administrativo"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default TribunaisContasService;
