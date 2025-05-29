
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AposentadoriaTempoContribuicaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Aposentadoria por Tempo de Contribuição"
      serviceDescription="Assessoria especializada para aposentadoria por tempo de contribuição, utilizando regras de transição e estratégias para maximizar o valor do benefício."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Regras de Transição",
          description: "Análise das melhores regras de transição disponíveis para otimizar o benefício."
        },
        {
          title: "Tempo Especial Convertido",
          description: "Conversão de períodos especiais em comum para acelerar a aposentadoria."
        },
        {
          title: "Atividades Concomitantes",
          description: "Identificação e aproveitamento de períodos de trabalho simultâneo."
        },
        {
          title: "Cálculo Otimizado",
          description: "Estratégias para obter o melhor valor de benefício possível."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Levantamento do Tempo",
          description: "Análise completa do CNIS e documentação para identificar todo período contributivo."
        },
        {
          step: 2,
          title: "Identificação de Períodos Especiais",
          description: "Verificação de períodos trabalhados em condições especiais para conversão."
        },
        {
          step: 3,
          title: "Análise das Regras",
          description: "Comparação entre regras antigas e de transição para definir a melhor estratégia."
        },
        {
          step: 4,
          title: "Cálculo de Benefício",
          description: "Simulação detalhada do valor da aposentadoria em diferentes cenários."
        },
        {
          step: 5,
          title: "Requerimento Estratégico",
          description: "Protocolo do pedido com a melhor regra identificada e documentação completa."
        }
      ]}
      testimonials={[
        {
          name: "Marcos A., Aposentado",
          quote: "Consegui me aposentar com 33 anos de contribuição usando a conversão de tempo especial. O valor ficou excelente."
        },
        {
          name: "Sandra R., Beneficiária",
          quote: "A análise das regras de transição me permitiu aposentar 2 anos antes do que imaginava."
        }
      ]}
      faq={[
        {
          question: "Ainda é possível se aposentar por tempo de contribuição?",
          answer: "Para quem tinha direito adquirido até 13/11/2019, sim. Para os demais, existem regras de transição: pedágio de 50%, pedágio de 100%, idade progressiva e pontos progressivos, cada uma com requisitos específicos."
        },
        {
          question: "Como funciona a conversão de tempo especial?",
          answer: "Períodos trabalhados em condições especiais (insalubres/perigosas) podem ser convertidos em tempo comum com acréscimo de 40% (homens) ou 20% (mulheres), acelerando a aposentadoria por tempo de contribuição."
        },
        {
          question: "O que são atividades concomitantes?",
          answer: "São períodos em que o trabalhador exerceu mais de uma atividade simultaneamente, podendo somar os tempos para fins de aposentadoria, desde que devidamente comprovadas e não ultrapassem os limites legais."
        }
      ]}
      relatedServices={[
        {
          name: "Reconhecimento de Tempo Especial",
          path: "/servicos/reconhecimento-tempo-especial"
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

export default AposentadoriaTempoContribuicaoService;
