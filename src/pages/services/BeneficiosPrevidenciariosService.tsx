
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const BeneficiosPrevidenciariosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Aposentadorias"
      serviceDescription="Assessoria especializada para obtenção de todos os tipos de aposentadoria, garantindo o melhor benefício para sua situação específica."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Aposentadoria por Idade",
          description: "Orientação para aposentadoria aos 65 anos (homens) ou 62 anos (mulheres) com 15 anos de contribuição."
        },
        {
          title: "Aposentadoria por Tempo de Contribuição",
          description: "Assessoria para aposentadoria com 35 anos (homens) ou 30 anos (mulheres) de contribuição."
        },
        {
          title: "Aposentadoria por Invalidez",
          description: "Suporte para casos de incapacidade total e permanente para qualquer atividade laboral."
        },
        {
          title: "Aposentadoria Rural",
          description: "Especialização em aposentadoria para trabalhadores rurais com regras diferenciadas."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Perfil",
          description: "Identificação da modalidade de aposentadoria mais vantajosa para seu caso específico."
        },
        {
          step: 2,
          title: "Levantamento Contributivo",
          description: "Verificação completa do histórico de contribuições através do CNIS e documentação."
        },
        {
          step: 3,
          title: "Cálculo de Benefício",
          description: "Simulação do valor da aposentadoria considerando todas as regras aplicáveis."
        },
        {
          step: 4,
          title: "Protocolo do Pedido",
          description: "Requerimento junto ao INSS com toda documentação necessária organizada."
        },
        {
          step: 5,
          title: "Acompanhamento Completo",
          description: "Monitoramento do processo até a concessão e recursos se necessário."
        }
      ]}
      testimonials={[
        {
          name: "José Carlos, Aposentado",
          quote: "Consegui me aposentar por tempo de contribuição antes da reforma. A orientação foi perfeita sobre as regras de transição."
        },
        {
          name: "Maria Aparecida, Rural",
          quote: "Como trabalhadora rural, a assessoria foi fundamental para comprovar minha atividade e obter a aposentadoria."
        },
        {
          name: "Antonio Silva, Invalidez",
          quote: "Após acidente, obtive minha aposentadoria por invalidez com acompanhamento completo em todas as perícias."
        }
      ]}
      faq={[
        {
          question: "Quais são as modalidades de aposentadoria disponíveis?",
          answer: "As principais são: aposentadoria por idade (65/62 anos), por tempo de contribuição (35/30 anos), especial (atividades insalubres), por invalidez (incapacidade permanente), rural (trabalhadores do campo), e da pessoa com deficiência. Cada uma tem requisitos específicos e regras de transição da reforma da previdência."
        },
        {
          question: "Como funcionam as regras de transição?",
          answer: "Para quem já contribuía antes de 13/11/2019, existem regras de transição: regra dos pontos (idade + tempo de contribuição), idade progressiva, pedágio de 50%, pedágio de 100%. Cada regra tem vantagens específicas conforme o perfil do segurado."
        },
        {
          question: "Posso me aposentar por invalidez e depois trabalhar?",
          answer: "A aposentadoria por invalidez pressupõe incapacidade total e permanente. Se houver recuperação da capacidade, o benefício pode ser suspenso após nova perícia. Em casos de recuperação parcial, pode haver conversão para auxílio-acidente. É importante comunicar ao INSS qualquer melhora na condição de saúde."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Previdenciário",
          path: "/servicos/planejamento-previdenciario"
        },
        {
          name: "Aposentadoria Especial",
          path: "/servicos/aposentadoria-especial"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default BeneficiosPrevidenciariosService;
