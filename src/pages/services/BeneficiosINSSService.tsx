
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const BeneficiosINSSService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Auxílios e Benefícios do INSS"
      serviceDescription="Obtenção de auxílio-doença, auxílio-acidente, pensão por morte, salário-maternidade e outros benefícios assistenciais oferecidos pelo INSS."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Auxílio-Doença",
          description: "Assistência para obtenção do benefício por incapacidade temporária para o trabalho."
        },
        {
          title: "Pensão por Morte",
          description: "Orientação completa para familiares na obtenção da pensão por morte do segurado."
        },
        {
          title: "Salário-Maternidade",
          description: "Assessoria para trabalhadoras e seguradas especiais na obtenção do salário-maternidade."
        },
        {
          title: "Auxílio-Acidente",
          description: "Suporte para obtenção do auxílio em casos de acidente de trabalho com sequelas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Tipo de Benefício",
          description: "Identificação do benefício adequado conforme a situação específica do segurado."
        },
        {
          step: 2,
          title: "Verificação de Carência",
          description: "Análise do período de carência necessário para cada tipo de benefício."
        },
        {
          step: 3,
          title: "Coleta de Documentação",
          description: "Reunião de todos os documentos médicos, laborais e pessoais necessários."
        },
        {
          step: 4,
          title: "Agendamento e Requerimento",
          description: "Protocolo do pedido no INSS com acompanhamento de toda tramitação."
        },
        {
          step: 5,
          title: "Perícias e Recursos",
          description: "Acompanhamento em perícias médicas e recursos em caso de indeferimento."
        }
      ]}
      testimonials={[
        {
          name: "Sandra L., Beneficiária",
          quote: "Consegui meu auxílio-doença que havia sido negado 3 vezes. A assessoria jurídica foi fundamental."
        },
        {
          name: "Fernando M., Pensionista",
          quote: "A orientação para obter a pensão por morte foi essencial. Recebi todos os esclarecimentos necessários."
        },
        {
          name: "Lucia R., Segurada",
          quote: "Com a ajuda especializada, obtive meu salário-maternidade sem complicações burocráticas."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre auxílio-doença e aposentadoria por invalidez?",
          answer: "O auxílio-doença é temporário, concedido quando há incapacidade temporária para o trabalho, com possibilidade de retorno. A aposentadoria por invalidez é definitiva, concedida quando a incapacidade é total e permanente, sem possibilidade de reabilitação para qualquer atividade laboral."
        },
        {
          question: "Quem tem direito à pensão por morte?",
          answer: "Dependentes do segurado falecido: cônjuge/companheiro(a), filhos menores de 21 anos ou inválidos, pais (se dependentes economicamente). O valor varia conforme o número de dependentes e pode ser de 50% a 100% da aposentadoria que o segurado recebia ou teria direito."
        },
        {
          question: "Como funciona o período de carência para auxílios?",
          answer: "Auxílio-doença: 12 meses de carência (exceto em casos de acidente ou doenças graves listadas em lei). Salário-maternidade: 10 meses para contribuinte individual e doméstica. Pensão por morte: sem carência. Auxílio-acidente: sem carência quando decorrente de acidente de trabalho."
        }
      ]}
      relatedServices={[
        {
          name: "Aposentadoria Especial",
          path: "/servicos/aposentadoria-especial"
        },
        {
          name: "Revisão de Benefícios",
          path: "/servicos/revisao-beneficios"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default BeneficiosINSSService;
