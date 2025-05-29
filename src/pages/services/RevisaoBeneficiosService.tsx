
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RevisaoBeneficiosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Revisão de Benefícios"
      serviceDescription="Análise técnica e revisão de benefícios previdenciários para correção de erros de cálculo, inclusão de períodos e otimização do valor recebido."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Correção de Cálculos",
          description: "Identificação e correção de erros nos cálculos realizados pelo INSS na concessão do benefício."
        },
        {
          title: "Inclusão de Períodos",
          description: "Adição de tempos de contribuição não computados que podem aumentar o valor do benefício."
        },
        {
          title: "Atrasados Substanciais",
          description: "Recuperação de valores não pagos desde a data correta de início ou correção do benefício."
        },
        {
          title: "Mudança de Espécie",
          description: "Reenquadramento em modalidade mais vantajosa quando os requisitos são atendidos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Concessão",
          description: "Revisão minuciosa da carta de concessão e processo administrativo do benefício."
        },
        {
          step: 2,
          title: "Verificação de Períodos",
          description: "Conferência de todos os períodos contributivos considerados no cálculo original."
        },
        {
          step: 3,
          title: "Cálculo Refeito",
          description: "Elaboração de novos cálculos considerando correções identificadas."
        },
        {
          step: 4,
          title: "Protocolo da Revisão",
          description: "Formalização do pedido de revisão junto ao INSS com fundamentação técnica."
        },
        {
          step: 5,
          title: "Acompanhamento e Execução",
          description: "Monitoramento do processo e execução dos valores quando deferida a revisão."
        }
      ]}
      testimonials={[
        {
          name: "Maria José, Aposentada",
          quote: "A revisão aumentou minha aposentadoria em 35% e recebi R$ 28.000 de diferenças atrasadas."
        },
        {
          name: "Pedro Oliveira, Beneficiário",
          quote: "Descobrimos que meu benefício estava enquadrado incorretamente. A mudança fez toda diferença no valor."
        },
        {
          name: "Ana Cristina, Pensionista",
          quote: "A inclusão de períodos especiais do meu marido aumentou significativamente o valor da pensão."
        }
      ]}
      faq={[
        {
          question: "Quando é possível fazer revisão de benefícios?",
          answer: "A revisão pode ser solicitada quando há: erros de cálculo na concessão, períodos não computados, enquadramento em espécie incorreta, não aplicação de regras mais favoráveis, ou mudanças na legislação que beneficiem o segurado. O prazo geral é de 10 anos da primeira prestação para revisão administrativa."
        },
        {
          question: "Quais são os tipos mais comuns de revisão?",
          answer: "Os principais tipos são: Revisão da Vida Toda (inclusão de salários pré-1994), Revisão do Buraco Negro (benefícios de 1999-2009), revisão por inclusão de atividade especial, revisão por erro de cálculo, revisão da menor faixa de transição, e reenquadramento de espécie de benefício."
        },
        {
          question: "Qual o valor médio de aumento em uma revisão?",
          answer: "O aumento varia muito conforme o caso, podendo ir de 10% a 100% ou mais do valor original. Revisões bem-sucedidas frequentemente resultam em aumentos de 20% a 50%. Além do aumento mensal, há o pagamento retroativo das diferenças, que pode chegar a dezenas de milhares de reais dependendo do tempo decorrido."
        }
      ]}
      relatedServices={[
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
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

export default RevisaoBeneficiosService;
