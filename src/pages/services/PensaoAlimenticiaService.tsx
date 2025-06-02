
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
          title: "Cálculo Adequado e Justo",
          description: "Determinação de valor proporcional baseado na capacidade financeira do alimentante e necessidades reais do alimentado, considerando padrão de vida familiar anterior.",
          icon: "📊"
        },
        {
          title: "Procedimento Ágil e Especializado",
          description: "Utilização de procedimentos especiais do rito alimentar que garantem tramitação prioritária e mais rápida dos processos judiciais.",
          icon: "⚡"
        },
        {
          title: "Execução Eficiente e Rigorosa",
          description: "Cobrança judicial de pensões em atraso com uso de todos os meios executivos: penhora, desconto em folha, prisão civil e protesto de nome.",
          icon: "🔨"
        },
        {
          title: "Revisão e Modificação Estratégica",
          description: "Acompanhamento de pedidos de aumento, diminuição ou extinção conforme mudanças comprovadas na situação econômica das partes.",
          icon: "📈"
        },
        {
          title: "Alimentos Gravídicos Especializados",
          description: "Assessoria em pedidos de pensão durante a gravidez para custear despesas médicas, alimentação e vestuário adequados da gestante.",
          icon: "🤱"
        },
        {
          title: "Prisão Civil e Medidas Coercitivas",
          description: "Utilização estratégica de prisão civil, protesto, inclusão em órgãos de proteção ao crédito e outras medidas para garantir pagamento.",
          icon: "⚖️"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Completa da Situação Financeira",
          description: "Avaliação detalhada da capacidade financeira do alimentante através de declarações de renda, extratos bancários, patrimônio e estilo de vida demonstrado."
        },
        {
          step: 2,
          title: "Levantamento das Necessidades do Alimentado",
          description: "Mapeamento criterioso de todas as necessidades: educação, saúde, moradia, alimentação, vestuário, lazer e atividades extracurriculares."
        },
        {
          step: 3,
          title: "Documentação Probatória Estratégica",
          description: "Coleta e organização de comprovantes de renda, gastos, padrão de vida anterior, despesas médicas e escolares, incluindo prova testemunhal quando necessário."
        },
        {
          step: 4,
          title: "Ação de Alimentos com Tutela de Urgência",
          description: "Ajuizamento fundamentado com pedido de antecipação de tutela para fixação imediata de alimentos provisórios enquanto tramita o processo principal."
        },
        {
          step: 5,
          title: "Audiência de Conciliação Preparada",
          description: "Preparação estratégica para audiência com propostas fundamentadas, tentativa de acordo que atenda adequadamente as necessidades do alimentado."
        },
        {
          step: 6,
          title: "Instrução Processual Técnica",
          description: "Condução da fase probatória com oitiva de testemunhas, juntada de documentos complementares e eventual perícia para apuração de renda oculta."
        },
        {
          step: 7,
          title: "Execução Imediata e Acompanhamento",
          description: "Implementação de medidas executivas em caso de inadimplemento: desconto em folha, penhora de bens, prisão civil e monitoramento contínuo."
        }
      ]}
      testimonials={[
        {
          name: "Sandra M., Mãe de Dois Filhos",
          quote: "Consegui garantir pensão justa para meus filhos após o pai tentar esconder parte da renda. A investigação patrimonial foi fundamental para comprovar a real capacidade dele."
        },
        {
          name: "Carlos P., Pai Desempregado",
          quote: "Quando perdi o emprego, a revisão da pensão foi essencial. O valor foi adequado à minha nova realidade sem prejudicar o sustento dos meus filhos."
        },
        {
          name: "Ana L., Avó Responsável",
          quote: "A execução foi eficiente e garantiu o pagamento das pensões em atraso para o sustento dos meus netos. A prisão civil foi aplicada e resolveu o problema."
        },
        {
          name: "Roberto S., Empresário",
          quote: "O cálculo da pensão considerou adequadamente minha renda variável como empresário, chegando a um valor justo para todas as partes envolvidas."
        },
        {
          name: "Juliana T., Mãe Solo",
          quote: "Os alimentos gravídicos me permitiram arcar com as despesas da gravidez quando o pai se recusou a assumir responsabilidades. Foi fundamental para minha segurança."
        }
      ]}
      faq={[
        {
          question: "Qual o valor mínimo da pensão alimentícia para filhos?",
          answer: "Não há valor mínimo legal estabelecido, mas a jurisprudência considera como parâmetro inicial 30% do salário mínimo para um filho, podendo variar conforme o número de filhos e a capacidade do alimentante. O valor deve ser suficiente para suprir as necessidades básicas."
        },
        {
          question: "Até quando deve ser paga pensão alimentícia para os filhos?",
          answer: "Para filhos menores, até completarem 18 anos. Para filhos maiores, até os 24 anos se estiverem cursando ensino superior e comprovarem dedicação aos estudos. Em casos excepcionais, pode se estender por mais tempo se o filho tiver necessidades especiais."
        },
        {
          question: "Posso ser preso por não pagar pensão alimentícia?",
          answer: "Sim, o inadimplemento de pensão alimentícia pode resultar em prisão civil por até 90 dias, renovável enquanto persistir o descumprimento. A prisão tem caráter coercitivo para forçar o pagamento, não punitivo."
        },
        {
          question: "Como funciona a pensão para ex-cônjuge ou companheiro?",
          answer: "Pensão para ex-cônjuge é excepcional, cabível quando comprovada necessidade econômica e impossibilidade temporária de autossustento. Geralmente tem prazo determinado para permitir recolocação profissional e independência financeira."
        },
        {
          question: "É possível aumentar o valor da pensão alimentícia?",
          answer: "Sim, através de ação revisional quando comprovado aumento da capacidade do alimentante ou das necessidades do alimentado. Mudanças significativas na situação econômica justificam a revisão do valor estabelecido."
        },
        {
          question: "O que são alimentos gravídicos e como solicitar?",
          answer: "São alimentos devidos pelo suposto pai à gestante para custear despesas da gravidez e parto. Podem ser pedidos desde a confirmação da gravidez até o nascimento, quando se convertem automaticamente em pensão alimentícia para a criança."
        },
        {
          question: "Posso diminuir o valor da pensão se minha renda reduziu?",
          answer: "Sim, através de ação revisional comprovando efetiva diminuição da capacidade financeira: desemprego, redução salarial, problemas de saúde. A redução deve ser proporcional e não pode comprometer as necessidades básicas do alimentado."
        },
        {
          question: "Como comprovar renda de pai autônomo ou empresário?",
          answer: "Através de declaração de imposto de renda, extratos bancários, movimentação financeira, patrimônio declarado, padrão de vida demonstrado e, se necessário, perícia contábil para apurar renda real quando há suspeita de ocultação."
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
          name: "Execução de Alimentos",
          path: "/servicos/execucao-alimentos"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default PensaoAlimenticiaService;
