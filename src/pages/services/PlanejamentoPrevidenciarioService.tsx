
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PlanejamentoPrevidenciarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Planejamento Previdenciário"
      serviceDescription="Estratégias personalizadas para otimizar suas contribuições previdenciárias e garantir a melhor aposentadoria possível, considerando todas as regras de transição e modalidades disponíveis."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Aposentadoria Otimizada",
          description: "Cálculos precisos para determinar a melhor estratégia de aposentadoria com maior valor de benefício."
        },
        {
          title: "Economia de Contribuições",
          description: "Identificação de oportunidades para reduzir contribuições desnecessárias sem prejudicar direitos."
        },
        {
          title: "Análise de Regras de Transição",
          description: "Avaliação detalhada das regras de transição da reforma da previdência para sua situação específica."
        },
        {
          title: "Tempo de Contribuição Eficiente",
          description: "Estratégias para aproveitamento máximo do tempo de contribuição e serviço especial."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Levantamento Histórico",
          description: "Análise completa do histórico contributivo através do CNIS e documentação previdenciária."
        },
        {
          step: 2,
          title: "Simulações Personalizadas",
          description: "Cálculos de diferentes cenários de aposentadoria considerando todas as modalidades aplicáveis."
        },
        {
          step: 3,
          title: "Estratégia Personalizada",
          description: "Elaboração de plano estratégico com cronograma e orientações específicas para sua situação."
        },
        {
          step: 4,
          title: "Acompanhamento Contínuo",
          description: "Monitoramento periódico e ajustes na estratégia conforme mudanças na legislação."
        }
      ]}
      testimonials={[
        {
          name: "Roberto M., Engenheiro",
          quote: "O planejamento me mostrou que poderia me aposentar 3 anos antes do que imaginava, com valor 40% maior."
        },
        {
          name: "Carmen L., Professora",
          quote: "Descobri que tinha direito à aposentadoria especial e consegui otimizar minhas contribuições futuras."
        },
        {
          name: "Paulo R., Contador",
          quote: "A análise das regras de transição foi fundamental para escolher a melhor estratégia de aposentadoria."
        }
      ]}
      faq={[
        {
          question: "Quando devo começar meu planejamento previdenciário?",
          answer: "O ideal é começar o planejamento o quanto antes, preferencialmente aos 40-45 anos. Porém, mesmo próximo da aposentadoria, o planejamento pode identificar oportunidades importantes de otimização do benefício e estratégias para aumentar o valor da aposentadoria."
        },
        {
          question: "O planejamento pode aumentar o valor da minha aposentadoria?",
          answer: "Sim, através de estratégias como: escolha da melhor regra de cálculo, otimização do período de contribuição, aproveitamento de atividades especiais, adequação da base de cálculo, e identificação de contribuições que podem ser desconsideradas do cálculo por reduzirem a média."
        },
        {
          question: "Como funcionam as regras de transição da reforma?",
          answer: "A reforma criou várias regras de transição para quem já contribuía antes de 2019. As principais são: regra dos pontos, idade progressiva, pedágio de 50%, pedágio de 100%, e aposentadoria por idade. Cada pessoa pode se enquadrar em uma ou mais regras, sendo importante calcular qual oferece melhor benefício."
        }
      ]}
      relatedServices={[
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
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

export default PlanejamentoPrevidenciarioService;
