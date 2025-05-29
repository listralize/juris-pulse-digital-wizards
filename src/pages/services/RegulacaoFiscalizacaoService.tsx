
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RegulacaoFiscalizacaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Regulação e Fiscalização"
      serviceDescription="Operar em setores regulados exige adesão precisa a um labirinto de regras. Fornecemos orientação especializada em conformidade regulatória, assistência na obtenção de autorizações necessárias e representação de seus interesses perante agências reguladoras federais, estaduais e municipais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Conformidade Regulatória",
          description: "Orientação especializada para garantir aderência a todas as normas regulatórias aplicáveis ao seu setor de atuação."
        },
        {
          title: "Obtenção de Autorizações",
          description: "Assistência na obtenção de licenças, autorizações e registros necessários junto a agências reguladoras."
        },
        {
          title: "Representação Perante Agências",
          description: "Representação técnica e estratégica perante agências reguladoras federais, estaduais e municipais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Mapeamento Regulatório",
          description: "Identificação de todas as normas e agências reguladoras aplicáveis ao negócio ou atividade do cliente."
        },
        {
          step: 2,
          title: "Análise de Conformidade",
          description: "Avaliação do nível de conformidade atual e identificação de gaps regulatórios que precisam ser sanados."
        },
        {
          step: 3,
          title: "Estratégia de Adequação",
          description: "Desenvolvimento de plano de adequação regulatória, priorizando ações por criticidade e prazo."
        },
        {
          step: 4,
          title: "Implementação e Monitoramento",
          description: "Acompanhamento da implementação das medidas de conformidade e monitoramento contínuo de mudanças regulatórias."
        },
        {
          step: 5,
          title: "Defesa em Fiscalizações",
          description: "Assessoria em processos de fiscalização, elaboração de defesas e recursos administrativos quando necessário."
        }
      ]}
      testimonials={[
        {
          name: "Empresa de Telecomunicações",
          quote: "A orientação regulatória foi essencial para nossa conformidade com as normas da ANATEL, evitando multas e garantindo renovação de outorgas."
        },
        {
          name: "Instituição Financeira",
          quote: "O compliance regulatório implementado nos protegeu de sanções do Banco Central e otimizou nossos processos internos."
        },
        {
          name: "Empresa do Setor Elétrico",
          quote: "A representação perante a ANEEL foi fundamental para aprovação de nossos projetos de expansão, garantindo viabilidade dos investimentos."
        }
      ]}
      faq={[
        {
          question: "Quais setores mais necessitam de assessoria regulatória?",
          answer: "Setores altamente regulados como financeiro, telecomunicações, energia elétrica, saúde, aviação civil, petróleo e gás requerem assessoria especializada constante."
        },
        {
          question: "Como funciona o processo de obtenção de autorizações regulatórias?",
          answer: "Envolve análise de requisitos, preparação de documentação técnica, protocolo junto à agência competente, acompanhamento da análise e atendimento a eventuais exigências."
        },
        {
          question: "O que fazer em caso de autuação por agência reguladora?",
          answer: "É essencial apresentar defesa técnica fundamentada dentro do prazo legal, contestando irregularidades procedimentais ou materiais, e buscando redução ou anulação de penalidades."
        },
        {
          question: "Como se manter atualizado com mudanças regulatórias?",
          answer: "Através de monitoramento constante de publicações oficiais, participação em consultas públicas, relacionamento com agências reguladoras e assessoria jurídica especializada."
        }
      ]}
      relatedServices={[
        {
          name: "Atos Administrativos",
          path: "/servicos/atos-administrativos"
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

export default RegulacaoFiscalizacaoService;
