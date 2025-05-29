
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AposentadoriaIdadeService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Aposentadoria por Idade"
      serviceDescription="Assessoria completa para obtenção da aposentadoria por idade, garantindo que você atinja os requisitos mínimos e obtenha o melhor valor de benefício possível."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Requisitos Cumpridos",
          description: "Verificação detalhada do cumprimento da idade mínima (65 anos homens/62 anos mulheres) e carência de 15 anos."
        },
        {
          title: "Maximização do Benefício",
          description: "Análise para garantir o cálculo mais favorável considerando todo histórico contributivo."
        },
        {
          title: "Regras de Transição",
          description: "Orientação sobre as melhores opções entre as regras antigas e as pós-reforma da previdência."
        },
        {
          title: "Comprovação de Tempo",
          description: "Auxílio na reunião de documentos para comprovar períodos de contribuição não registrados."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Elegibilidade",
          description: "Verificação da idade e tempo de contribuição para confirmar o direito à aposentadoria por idade."
        },
        {
          step: 2,
          title: "Levantamento do CNIS",
          description: "Extração e análise detalhada do Cadastro Nacional de Informações Sociais para identificar períodos."
        },
        {
          step: 3,
          title: "Cálculo do Benefício",
          description: "Simulação do valor da aposentadoria considerando todas as contribuições e regras aplicáveis."
        },
        {
          step: 4,
          title: "Documentação Completa",
          description: "Organização de toda documentação necessária para o requerimento administrativo."
        },
        {
          step: 5,
          title: "Acompanhamento do Processo",
          description: "Monitoramento do processo no INSS até a concessão do benefício."
        }
      ]}
      testimonials={[
        {
          name: "Carlos M., 65 anos",
          quote: "Consegui minha aposentadoria por idade com valor muito melhor do que esperava. A análise detalhada encontrou contribuições que eu nem lembrava."
        },
        {
          name: "Helena S., 63 anos",
          quote: "O planejamento foi essencial. Descobri que podia me aposentar com regra de transição mais vantajosa."
        }
      ]}
      faq={[
        {
          question: "Qual é a idade mínima para aposentadoria por idade?",
          answer: "Atualmente, a idade mínima é de 65 anos para homens e 62 anos para mulheres, com carência mínima de 15 anos de contribuição. Para quem começou a contribuir antes da reforma (13/11/2019), podem aplicar regras de transição mais vantajosas."
        },
        {
          question: "Como é calculado o valor da aposentadoria por idade?",
          answer: "O valor é calculado com base na média de todas as contribuições desde julho de 1994, aplicando-se 60% + 2% para cada ano que exceder 15 anos de contribuição para mulheres, e 60% + 2% para cada ano que exceder 20 anos para homens."
        },
        {
          question: "Posso trabalhar depois de me aposentar por idade?",
          answer: "Sim, é possível continuar trabalhando após se aposentar por idade. Não há impedimento legal, mas é importante avaliar os aspectos tributários e previdenciários da continuidade da atividade laboral."
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

export default AposentadoriaIdadeService;
