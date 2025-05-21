
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContenciosoTrabalhistaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Contencioso Trabalhista"
      serviceDescription="Defesa especializada em reclamações trabalhistas individuais e coletivas em todas as instâncias, protegendo os interesses de empregadores com estratégias jurídicas eficientes."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Estratégica",
          description: "Análise minuciosa do caso e elaboração de estratégias de defesa específicas para cada reclamação trabalhista."
        },
        {
          title: "Atuação em Todas as Instâncias",
          description: "Representação em audiências, recursos e sustentações orais em todas as instâncias da Justiça do Trabalho."
        },
        {
          title: "Minimização de Passivos",
          description: "Estratégias para redução de condenações e minimização do impacto financeiro de demandas trabalhistas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Inicial",
          description: "Avaliação completa da reclamação trabalhista, incluindo documentos, provas e potenciais riscos."
        },
        {
          step: 2,
          title: "Estratégia de Defesa",
          description: "Elaboração de contestação robusta e definição da estratégia jurídica mais adequada para o caso específico."
        },
        {
          step: 3,
          title: "Produção de Provas",
          description: "Identificação, organização e apresentação de documentos, testemunhas e outros elementos probatórios essenciais."
        },
        {
          step: 4,
          title: "Audiências e Negociações",
          description: "Representação em audiências e condução de negociações para acordos favoráveis quando apropriado."
        },
        {
          step: 5,
          title: "Recursos e Acompanhamento",
          description: "Interposição de recursos quando necessário e acompanhamento processual até o encerramento definitivo do caso."
        }
      ]}
      testimonials={[
        {
          name: "Empresa ABC Ltda",
          quote: "A assessoria no contencioso trabalhista reduziu significativamente nossas condenações e trouxe previsibilidade aos nossos passivos."
        },
        {
          name: "João M., Gestor de RH",
          quote: "As estratégias de defesa implementadas foram fundamentais para revertermos decisões desfavoráveis em segunda instância."
        },
        {
          name: "Indústrias XYZ",
          quote: "O acompanhamento detalhado de cada processo e a clareza nas explicações sobre riscos nos deu segurança nas tomadas de decisão."
        }
      ]}
      faq={[
        {
          question: "Qual o prazo para apresentar defesa em uma reclamação trabalhista?",
          answer: "A contestação deve ser apresentada na audiência inicial designada pelo juiz, que normalmente ocorre entre 30 e 60 dias após o recebimento da notificação. É fundamental a preparação antecipada para garantir uma defesa robusta."
        },
        {
          question: "É sempre melhor fazer acordo em reclamações trabalhistas?",
          answer: "Nem sempre. Cada caso exige uma análise específica. Em algumas situações, o acordo pode ser vantajoso para evitar custos prolongados e desgaste. Em outros casos, especialmente quando há bons elementos de defesa, contestar até as últimas instâncias pode ser mais benéfico."
        },
        {
          question: "Como são calculadas as verbas trabalhistas em uma reclamação?",
          answer: "O cálculo considera diversos fatores como salário, tempo de serviço, horas extras, adicionais, benefícios e outros direitos previstos em lei ou convenções coletivas. É realizado por peritos contábeis durante a fase de liquidação do processo, após a sentença de mérito."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria em Relações Trabalhistas",
          path: "/servicos/assessoria-trabalhista"
        },
        {
          name: "Compliance Trabalhista",
          path: "/servicos/compliance-trabalhista"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default ContenciosoTrabalhistaService;
