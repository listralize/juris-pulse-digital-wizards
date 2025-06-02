
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PensaoAlimenticiaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Pensão Alimentícia"
      serviceDescription="Assessoria completa em ações de alimentos, desde a fixação até execução e revisão, garantindo sustento adequado para filhos e cônjuges necessitados."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Cálculo Adequado",
          description: "Determinação de valor justo baseado na capacidade do alimentante e necessidade do alimentado."
        },
        {
          title: "Procedimento Rápido",
          description: "Utilização de procedimentos especiais que garantem tramitação mais ágil dos processos de alimentos."
        },
        {
          title: "Execução Eficiente",
          description: "Cobrança judicial de pensões em atraso com uso de todos os meios executivos disponíveis."
        },
        {
          title: "Revisão e Exoneração",
          description: "Acompanhamento de pedidos de aumento, diminuição ou extinção conforme mudanças na situação."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Situação",
          description: "Avaliação da capacidade financeira do alimentante e necessidades do alimentado."
        },
        {
          step: 2,
          title: "Documentação Probatória",
          description: "Coleta de documentos que comprovem renda, gastos e necessidades das partes envolvidas."
        },
        {
          step: 3,
          title: "Ação de Alimentos",
          description: "Ajuizamento da ação com pedido de fixação de pensão alimentícia e antecipação de tutela."
        },
        {
          step: 4,
          title: "Audiência de Conciliação",
          description: "Tentativa de acordo judicial para fixação consensual do valor da pensão."
        },
        {
          step: 5,
          title: "Execução e Acompanhamento",
          description: "Cobrança judicial em caso de inadimplemento e acompanhamento do cumprimento."
        }
      ]}
      testimonials={[
        {
          name: "Sandra M., Mãe",
          quote: "Consegui garantir pensão adequada para meus filhos de forma rápida e sem complicações."
        },
        {
          name: "Carlos P., Pai",
          quote: "A revisão da pensão foi justa, considerando minha nova situação financeira após desemprego."
        },
        {
          name: "Ana L., Responsável",
          quote: "Execução eficiente que garantiu o pagamento das pensões em atraso para sustento dos netos."
        }
      ]}
      faq={[
        {
          question: "Qual o valor mínimo da pensão alimentícia?",
          answer: "Não há valor mínimo legal, mas a jurisprudência considera como parâmetro inicial 30% do salário mínimo para um filho."
        },
        {
          question: "Até quando deve ser paga pensão alimentícia?",
          answer: "Para filhos, até os 18 anos ou 24 anos se cursando ensino superior. Para ex-cônjuge, conforme situação específica avaliada pelo juiz."
        },
        {
          question: "Posso ser preso por não pagar pensão?",
          answer: "Sim, o inadimplemento de pensão alimentícia pode resultar em prisão civil por até 3 meses, renovável."
        },
        {
          question: "Como funciona a pensão para filho de união estável?",
          answer: "Filhos de união estável têm os mesmos direitos dos filhos de casamento, incluindo direito à pensão alimentícia."
        }
      ]}
      relatedServices={[
        {
          name: "Divórcio",
          path: "/servicos/divorcio"
        },
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Investigação de Paternidade",
          path: "/servicos/investigacao-paternidade"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default PensaoAlimenticiaService;
