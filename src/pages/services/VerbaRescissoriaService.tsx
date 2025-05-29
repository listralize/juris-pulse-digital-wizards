
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const VerbaRescissoriaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Cálculo e Cobrança de Verbas Rescisórias"
      serviceDescription="Foi demitido? Não perca um centavo do que é seu. Analisamos cada detalhe da sua rescisão e agimos com a força necessária para que cada valor seja quitado. Não deixamos dinheiro na mesa."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Análise Completa da Rescisão",
          description: "Examinamos minuciosamente saldo de salário, aviso prévio, 13º salário, férias proporcionais e vencidas, FGTS com multa de 40% e todas as indenizações devidas."
        },
        {
          title: "Identificação de Irregularidades",
          description: "Nossa expertise revela falhas que passam despercebidas: cálculos incorretos, verbas suprimidas, valores proporcionais errados e direitos sonegados."
        },
        {
          title: "Cobrança Estratégica e Eficaz",
          description: "Utilizamos negociação assertiva e, quando necessário, ação judicial implacável para garantir o recebimento de todos os valores com juros e correção."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Auditoria Completa da Rescisão",
          description: "Análise detalhada de todos os documentos rescisórios: TRCT, guias do FGTS, extratos, cartão de ponto e contratos para identificar inconsistências e valores devidos."
        },
        {
          step: 2,
          title: "Cálculo Técnico Especializado",
          description: "Elaboração de planilha técnica detalhada com todos os valores devidos, incluindo reflexos em 13º salário, férias, FGTS, considerando médias, adicionais e benefícios."
        },
        {
          step: 3,
          title: "Notificação Estratégica",
          description: "Comunicação formal ao empregador com fundamentação jurídica robusta, estabelecendo prazo para pagamento voluntário antes da via judicial."
        },
        {
          step: 4,
          title: "Ação de Cobrança Judicial",
          description: "Quando necessário, ajuizamento de reclamação trabalhista com pedidos claros e fundamentação técnica impecável para garantir procedência integral."
        },
        {
          step: 5,
          title: "Execução e Recebimento",
          description: "Acompanhamento até o recebimento efetivo, utilizando penhora de bens, bloqueio de contas e outros meios executivos para garantir o pagamento."
        }
      ]}
      testimonials={[
        {
          name: "Carlos Mendes - Ex-Gerente Comercial",
          quote: "Pensei que tinha recebido tudo certo na demissão, mas a análise revelou mais de R$ 45.000 em verbas não pagas. Hoje tenho esse dinheiro na conta."
        },
        {
          name: "Patrícia Lima - Ex-Coordenadora de RH",
          quote: "O cálculo da empresa estava completamente errado. Faltavam férias proporcionais, reflexos em 13º e a multa do FGTS estava incorreta. Recuperei tudo com juros."
        },
        {
          name: "Roberto Silva - Ex-Técnico Industrial",
          quote: "Trabalhei 8 anos e na rescisão tentaram me enganar com valores menores. A ação foi certeira e recebi quase o dobro do que ofereceram inicialmente."
        }
      ]}
      faq={[
        {
          question: "Quais verbas tenho direito ao ser demitido sem justa causa?",
          answer: "Você tem direito a: saldo de salário, aviso prévio (30 dias + 3 dias por ano trabalhado), 13º salário proporcional, férias vencidas e proporcionais com 1/3 constitucional, FGTS de todo período com multa de 40%, seguro-desemprego e, se aplicável, outros adicionais e benefícios. Cada caso tem suas particularidades que analisamos detalhadamente."
        },
        {
          question: "E se eu pedi demissão, tenho direito a alguma verba?",
          answer: "Sim, mesmo pedindo demissão você tem direito a: saldo de salário, 13º proporcional, férias vencidas e proporcionais com 1/3, FGTS (sem multa). Se não trabalhar o aviso prévio, o valor pode ser descontado. Também analisamos se houve motivos que caracterizem rescisão indireta."
        },
        {
          question: "Como saber se os cálculos da empresa estão corretos?",
          answer: "A maioria dos empregadores comete erros nos cálculos rescisórios, seja por desconhecimento ou má-fé. Nossa auditoria técnica compara os valores pagos com o que efetivamente é devido, considerando médias de variáveis, reflexos em verbas proporcionais e interpretação correta das normas coletivas."
        },
        {
          question: "Tenho prazo para questionar valores da rescisão?",
          answer: "O prazo para reclamar verbas trabalhistas é de 2 anos após o fim do contrato. Porém, quanto mais rápido agir, melhor para coleta de provas e memória dos fatos. Não deixe prescrever seus direitos - procure orientação assim que suspeitar de irregularidades."
        }
      ]}
      relatedServices={[
        {
          name: "Defesa do Trabalhador",
          path: "/servicos/defesa-trabalhador"
        },
        {
          name: "Horas Extras e Intervalos",
          path: "/servicos/horas-extras"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default VerbaRescissoriaService;
