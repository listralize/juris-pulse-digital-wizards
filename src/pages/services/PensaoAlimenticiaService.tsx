
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PensaoAlimenticiaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito da Família"
      serviceName="Pensão Alimentícia"
      serviceDescription="Assessoria jurídica especializada em ações de fixação, revisão e execução de pensão alimentícia para filhos e ex-cônjuges, garantindo que as necessidades básicas sejam atendidas e os direitos respeitados."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Cálculos Justos",
          description: "Determinação de valores que consideram tanto as necessidades de quem recebe quanto as possibilidades de quem paga."
        },
        {
          title: "Execução Eficiente",
          description: "Estratégias eficazes para garantir o pagamento em casos de inadimplência, utilizando todos os mecanismos legais disponíveis."
        },
        {
          title: "Revisões Fundamentadas",
          description: "Acompanhamento para revisão de valores em caso de mudanças significativas na situação financeira de qualquer das partes."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Gratuita",
          description: "Realizamos uma análise preliminar do seu caso, entendemos suas necessidades e explicamos as opções disponíveis. Esta primeira consulta é sem compromisso e gratuita."
        },
        {
          step: 2,
          title: "Planejamento Estratégico",
          description: "Desenvolvemos uma estratégia personalizada para seu caso, considerando aspectos como renda, necessidades do alimentando e capacidade do alimentante."
        },
        {
          step: 3,
          title: "Documentação e Preparação",
          description: "Preparamos toda a documentação necessária para dar entrada no processo, reunindo provas e elementos que fortaleçam sua posição."
        },
        {
          step: 4,
          title: "Negociação ou Litígio",
          description: "Dependendo do seu caso, podemos optar pela via consensual (mais rápida e menos desgastante) ou litigiosa (quando não há acordo possível)."
        },
        {
          step: 5,
          title: "Finalização e Homologação",
          description: "Cuidamos de todos os detalhes para a conclusão do processo, incluindo a homologação judicial e registros necessários."
        }
      ]}
      testimonials={[
        {
          name: "Mariana S.",
          quote: "A revisão da pensão alimentícia garantiu que meus filhos continuassem tendo suas necessidades atendidas mesmo após mudanças na situação financeira do pai."
        },
        {
          name: "Paulo R.",
          quote: "O acordo de pensão foi estabelecido de forma justa, considerando minha real capacidade financeira e as necessidades dos meus filhos."
        },
        {
          name: "Lucia T.",
          quote: "Após meses de inadimplência, a execução da pensão alimentícia foi conduzida com eficiência e finalmente garantiu o pagamento em dia."
        }
      ]}
      faq={[
        {
          question: "Como é calculado o valor da pensão alimentícia?",
          answer: "O cálculo considera três fatores principais: as necessidades de quem recebe, as possibilidades de quem paga e a proporcionalidade. Não existe um percentual fixo por lei, embora frequentemente se mencione entre 15% a 30% dos rendimentos, isso varia caso a caso."
        },
        {
          question: "Posso ser preso por não pagar pensão alimentícia?",
          answer: "Sim. A prisão civil por dívida alimentar é prevista na Constituição Federal e pode ser decretada em caso de inadimplência voluntária e inescusável das três últimas parcelas devidas."
        },
        {
          question: "A pensão alimentícia termina quando o filho completa 18 anos?",
          answer: "Não necessariamente. Embora a maioridade civil ocorra aos 18 anos, a jurisprudência reconhece que a pensão pode se estender enquanto o filho estiver cursando ensino superior ou técnico, normalmente até os 24 anos, desde que comprovada a necessidade."
        }
      ]}
      relatedServices={[
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio-separacao"
        }
      ]}
      mainAreaPath="/familia"
    />
  );
};

export default PensaoAlimenticiaService;
