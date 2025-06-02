
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PensaoAlimenticiaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Pensão Alimentícia"
      serviceDescription="Garanta o sustento adequado para seus filhos ou obtenha o que é seu por direito. Atuamos tanto para quem precisa receber quanto para quem busca valores justos, sempre priorizando o bem-estar das crianças envolvidas."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Cálculo Justo e Fundamentado",
          description: "Analisamos minuciosamente a real capacidade financeira do alimentante e as necessidades efetivas do alimentado, considerando padrão de vida anterior, despesas escolares, médicas e de subsistência.",
          icon: "💰"
        },
        {
          title: "Investigação Patrimonial Especializada",
          description: "Utilizamos técnicas avançadas para descobrir renda oculta, bens não declarados e movimentações financeiras suspeitas de pais que tentam se esquivar da responsabilidade.",
          icon: "🔍"
        },
        {
          title: "Execução Implacável de Devedores",
          description: "Empregamos todos os meios legais disponíveis: penhora de bens, bloqueio de contas, desconto em folha, protesto de nome, inclusão no SPC/Serasa e prisão civil quando necessário.",
          icon: "⚡"
        },
        {
          title: "Proteção Contra Valores Abusivos",
          description: "Defendemos pais que enfrentam pedidos desproporcionais ou impossíveis de cumprir, buscando valores compatíveis com a real capacidade financeira e necessidades dos filhos.",
          icon: "🛡️"
        },
        {
          title: "Alimentos Gravídicos Emergenciais",
          description: "Atuamos rapidamente para garantir sustento durante a gravidez, cobrindo despesas médicas, medicamentos, alimentação especial e enxoval do bebê desde a confirmação da gestação.",
          icon: "🤱"
        },
        {
          title: "Revisão Estratégica de Valores",
          description: "Acompanhamos mudanças na vida das partes para ajustar valores: desemprego, mudança de renda, necessidades especiais dos filhos, entrada na universidade ou maioridade.",
          icon: "📈"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Completo da Situação",
          description: "Analisamos sua situação específica: se você precisa receber, aumentar, diminuir ou se defender de valores excessivos. Identificamos a melhor estratégia jurídica para seu caso concreto."
        },
        {
          step: 2,
          title: "Investigação Financeira Detalhada",
          description: "Levantamos a real capacidade financeira do alimentante através de análise de declarações de renda, extratos bancários, patrimônio declarado, estilo de vida e atividade profissional exercida."
        },
        {
          step: 3,
          title: "Cálculo das Necessidades Reais",
          description: "Mapeamos todas as despesas dos filhos: educação (escola, material, uniforme), saúde (plano, medicamentos, tratamentos), alimentação, vestuário, lazer e atividades extracurriculares."
        },
        {
          step: 4,
          title: "Ação Judicial com Urgência",
          description: "Ajuizamos a ação com pedido de tutela de urgência para fixação imediata de alimentos provisórios, garantindo sustento enquanto o processo principal tramita."
        },
        {
          step: 5,
          title: "Negociação Estratégica",
          description: "Na audiência de conciliação, apresentamos propostas fundamentadas tecnicamente, buscando acordo que atenda adequadamente as necessidades sem inviabilizar o pagamento."
        },
        {
          step: 6,
          title: "Produção de Provas Robustas",
          description: "Conduzimos a fase instrutória com oitiva de testemunhas qualificadas, juntada de documentos comprobatórios e eventual perícia contábil para apurar renda real."
        },
        {
          step: 7,
          title: "Execução Eficaz Imediata",
          description: "Em caso de inadimplemento, implementamos imediatamente medidas executivas: desconto em folha de pagamento, penhora de bens, bloqueio judicial e prisão civil se necessário."
        }
      ]}
      testimonials={[
        {
          name: "Carla M. - Mãe de Gêmeos",
          quote: "Meus filhos gêmeos tinham apenas 8% do salário do pai como pensão. Depois da investigação patrimonial, descobrimos empresa em nome dele. A pensão triplicou e hoje conseguem ter educação de qualidade."
        },
        {
          name: "Ricardo P. - Pai Desempregado",
          quote: "Perdi o emprego e a pensão estava comprometendo 80% da minha renda de freelancer. A revisão me permitiu valores compatíveis com minha nova realidade, sem prejudicar meus filhos."
        },
        {
          name: "Ana Beatriz - Grávida",
          quote: "O pai não assumiu a gravidez e se recusou a ajudar. Os alimentos gravídicos cobriram pré-natal particular, vitaminas e preparação para o parto. Foi essencial para minha segurança."
        },
        {
          name: "José Carlos - Empresário",
          quote: "Minha ex-esposa pedia 50% da minha renda para um filho. A defesa técnica mostrou que 30% já era mais que suficiente considerando as necessidades reais da criança. Acordo justo para todos."
        },
        {
          name: "Márcia L. - Execução Bem-sucedida",
          quote: "18 meses sem receber pensão. A execução foi cirúrgica: bloqueio de contas, penhora do carro e ameaça de prisão. Em uma semana ele quitou tudo e voltou a pagar em dia."
        }
      ]}
      faq={[
        {
          question: "Qual o valor ideal da pensão alimentícia?",
          answer: "Não existe valor fixo. Geralmente varia entre 20% a 30% da renda líquida do alimentante para um filho, podendo ser maior ou menor conforme necessidades específicas e capacidade do pagador. O importante é equilibrar necessidades reais com possibilidade de pagamento."
        },
        {
          question: "Como descobrir se o pai esconde renda?",
          answer: "Utilizamos diversas técnicas: análise de movimentação bancária, verificação de patrimônio em nome próprio ou de terceiros, investigação de atividades empresariais, padrão de vida demonstrado e perícia contábil quando necessário."
        },
        {
          question: "Posso ser preso por não pagar pensão?",
          answer: "Sim. O inadimplemento de até 3 parcelas pode resultar em prisão civil por até 90 dias. É medida coercitiva para forçar o pagamento, não punição. A prisão pode ser renovada enquanto persistir o descumprimento."
        },
        {
          question: "Até quando devo pagar pensão para os filhos?",
          answer: "Para menores, até 18 anos. Para filhos entre 18 e 24 anos que cursam ensino superior e se dedicam exclusivamente aos estudos, a pensão continua. Em casos excepcionais (deficiência, doença), pode ser vitalícia."
        },
        {
          question: "Posso diminuir a pensão se minha renda reduziu?",
          answer: "Sim, através de ação revisional comprovando efetiva redução da capacidade financeira. É preciso demonstrar que a redução é real e não temporária, e que mesmo assim as necessidades básicas dos filhos serão atendidas."
        },
        {
          question: "Como funciona pensão para ex-cônjuge?",
          answer: "Pensão para ex-cônjuge é excepcional e temporária, cabível apenas quando comprovada necessidade econômica e impossibilidade momentânea de autossustento. Geralmente tem prazo determinado para recolocação profissional."
        },
        {
          question: "O que são alimentos gravídicos?",
          answer: "São valores devidos pelo suposto pai à gestante para custear despesas da gravidez: consultas médicas, exames, medicamentos, alimentação especial e enxoval. Podem ser pedidos desde a confirmação da gravidez."
        },
        {
          question: "Posso pedir aumento da pensão?",
          answer: "Sim, quando comprovado aumento significativo da renda do alimentante ou das necessidades do alimentado (ingresso em escola particular, tratamento médico, atividades extracurriculares). É preciso demonstrar a mudança de circunstâncias."
        }
      ]}
      relatedServices={[
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio"
        },
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Investigação de Paternidade",
          path: "/servicos/investigacao-paternidade"
        },
        {
          name: "Regulamentação de Visitas",
          path: "/servicos/regulamentacao-visitas"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default PensaoAlimenticiaService;
