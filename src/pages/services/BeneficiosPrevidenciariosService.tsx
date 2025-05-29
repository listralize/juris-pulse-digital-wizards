
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const BeneficiosPrevidenciariosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Benefícios Previdenciários"
      serviceDescription="Assessoria completa para obtenção de aposentadorias, pensões, auxílios e demais benefícios previdenciários. Atuação especializada em todas as modalidades de benefícios do INSS e regimes próprios de previdência social, com planejamento estratégico e acompanhamento processual completo."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Aposentadorias Completas",
          description: "Assessoria para todas as modalidades: por idade, tempo de contribuição, especial, por invalidez, rural e da pessoa com deficiência."
        },
        {
          title: "Benefícios por Incapacidade",
          description: "Auxílio-doença, auxílio-acidente e aposentadoria por invalidez com acompanhamento em perícias médicas do INSS."
        },
        {
          title: "Pensões e Auxílios",
          description: "Pensão por morte, auxílio-reclusão, salário-maternidade e BPC/LOAS com suporte completo aos dependentes."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Previdenciária",
          description: "Avaliação completa do histórico contributivo, identificação de direitos e análise de elegibilidade para benefícios."
        },
        {
          step: 2,
          title: "Planejamento Estratégico",
          description: "Desenvolvimento de estratégia personalizada para otimização do benefício e definição do melhor momento para requerimento."
        },
        {
          step: 3,
          title: "Documentação e Requerimento",
          description: "Organização de documentos, elaboração de requerimentos e protocolo junto ao INSS ou regime próprio."
        },
        {
          step: 4,
          title: "Acompanhamento Processual",
          description: "Monitoramento do andamento, acompanhamento em perícias médicas quando necessário e interposição de recursos."
        },
        {
          step: 5,
          title: "Ação Judicial se Necessário",
          description: "Ajuizamento de ação judicial em caso de indeferimento ou concessão com valor incorreto."
        }
      ]}
      testimonials={[
        {
          name: "Maria Silva",
          quote: "Consegui minha aposentadoria especial após 15 anos de tentativas. O planejamento foi perfeito e recebi todos os atrasados."
        },
        {
          name: "João Santos",
          quote: "Meu auxílio-doença foi concedido rapidamente com o acompanhamento jurídico. Senti segurança em todo o processo."
        },
        {
          name: "Ana Costa",
          quote: "A pensão por morte foi concedida sem complicações. O suporte da equipe foi fundamental em um momento tão difícil."
        }
      ]}
      faq={[
        {
          question: "Quais documentos preciso para solicitar aposentadoria?",
          answer: "Documentos pessoais, carteira de trabalho, carnês de contribuição, certidões de tempo de serviço e, se aplicável, laudos médicos ou de atividade especial."
        },
        {
          question: "Quanto tempo demora para sair um benefício?",
          answer: "O prazo legal é de até 45 dias, mas pode variar conforme a complexidade do caso e necessidade de perícia médica."
        },
        {
          question: "Posso trabalhar recebendo auxílio-doença?",
          answer: "Não, o auxílio-doença é incompatível com o exercício de atividade remunerada, salvo exceções específicas previstas em lei."
        },
        {
          question: "Como funciona a aposentadoria especial?",
          answer: "É concedida a trabalhadores expostos a agentes nocivos à saúde, com tempo de contribuição reduzido (15, 20 ou 25 anos conforme o grau de exposição)."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Previdenciário",
          path: "/servicos/consultoria-previdenciaria"
        },
        {
          name: "Revisões de Aposentadoria",
          path: "/servicos/revisoes-previdenciarias"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default BeneficiosPrevidenciariosService;
