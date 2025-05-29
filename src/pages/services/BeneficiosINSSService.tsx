
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const BeneficiosINSSService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Benefícios do INSS"
      serviceDescription="Assessoria completa para obtenção de todos os tipos de benefícios oferecidos pelo INSS, incluindo auxílios, pensões e aposentadorias, com acompanhamento desde o requerimento até a concessão."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Assessoria Completa",
          description: "Orientação especializada para todos os tipos de benefícios previdenciários disponíveis."
        },
        {
          title: "Documentação Correta",
          description: "Auxílio na reunião e organização de toda documentação necessária para cada tipo de benefício."
        },
        {
          title: "Acompanhamento Processual",
          description: "Monitoramento de todo o processo administrativo junto ao INSS até a concessão do benefício."
        },
        {
          title: "Recursos e Contestações",
          description: "Interposição de recursos em caso de indeferimento ou valor inferior ao devido."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação do Benefício",
          description: "Análise da situação para determinar qual benefício é aplicável ao caso específico."
        },
        {
          step: 2,
          title: "Verificação de Requisitos",
          description: "Conferência de todos os requisitos legais necessários para concessão do benefício."
        },
        {
          step: 3,
          title: "Preparação da Documentação",
          description: "Organização de toda documentação comprobatória necessária para o requerimento."
        },
        {
          step: 4,
          title: "Protocolo do Requerimento",
          description: "Formalização do pedido junto ao INSS com acompanhamento de todo processo."
        },
        {
          step: 5,
          title: "Defesa de Direitos",
          description: "Recursos administrativos ou judiciais quando necessário para garantir o direito."
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
          name: "Lucia R., Aposentada",
          quote: "Com a ajuda especializada, obtive minha aposentadoria por invalidez com o valor correto desde o início."
        }
      ]}
      faq={[
        {
          question: "Quais são os principais benefícios oferecidos pelo INSS?",
          answer: "O INSS oferece: aposentadorias (por idade, tempo de contribuição, especial, invalidez), auxílios (doença, acidente, reclusão), pensão por morte, salário-família, salário-maternidade, e BPC (Benefício de Prestação Continuada). Cada benefício tem requisitos específicos que devem ser atendidos."
        },
        {
          question: "Qual a diferença entre auxílio-doença e aposentadoria por invalidez?",
          answer: "O auxílio-doença é temporário, concedido quando há incapacidade temporária para o trabalho, com possibilidade de retorno. A aposentadoria por invalidez é definitiva, concedida quando a incapacidade é total e permanente, sem possibilidade de reabilitação para qualquer atividade laboral."
        },
        {
          question: "Como funciona o período de carência para os benefícios?",
          answer: "A carência é o número mínimo de contribuições necessárias. Aposentadoria por idade e tempo: 180 meses. Auxílio-doença: 12 meses. Aposentadoria por invalidez: 12 meses. Alguns benefícios não têm carência (acidente de trabalho, pensão por morte) e outros têm carência reduzida para trabalhadores rurais e segurados especiais."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Previdenciário",
          path: "/servicos/planejamento-previdenciario"
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
