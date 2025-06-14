
import { ServicePage } from '../../../types/adminTypes';

export const createTrabalhoServicePages = (): ServicePage[] => {
  return [
    {
      id: 'trabalho-rescisao',
      title: 'Rescisão Trabalhista',
      description: 'Orientação sobre direitos e cálculos em rescisões contratuais.',
      category: 'trabalho',
      href: '/servicos/rescisao-trabalhista',
      benefits: [
        {
          title: 'Cálculo Preciso',
          description: 'Verificação correta de todos os valores devidos na rescisão.',
          icon: '🧮'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Contratual',
          description: 'Revisão do contrato de trabalho e histórico funcional.'
        }
      ],
      faq: [
        {
          question: 'Quando tenho direito ao FGTS?',
          answer: 'Em demissão sem justa causa, término de contrato, aposentadoria, entre outros casos.'
        }
      ],
      testimonials: [
        {
          name: 'Pedro Oliveira',
          text: 'Me ajudaram a entender todos os meus direitos na rescisão.'
        }
      ]
    },
    {
      id: 'trabalho-horas-extras',
      title: 'Horas Extras',
      description: 'Cobrança de horas extras não pagas e adicional noturno.',
      category: 'trabalho',
      href: '/servicos/horas-extras',
      benefits: [
        {
          title: 'Recuperação de Valores',
          description: 'Cobrança das horas trabalhadas além da jornada.',
          icon: '⏰'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Levantamento da Jornada',
          description: 'Análise dos registros de ponto e jornada trabalhada.'
        }
      ],
      faq: [
        {
          question: 'Como comprovar as horas extras?',
          answer: 'Através de cartão ponto, testemunhas, mensagens, etc.'
        }
      ],
      testimonials: [
        {
          name: 'Maria Santos',
          text: 'Consegui receber 2 anos de horas extras atrasadas.'
        }
      ]
    },
    {
      id: 'trabalho-assedio-moral',
      title: 'Assédio Moral e Sexual',
      description: 'Defesa contra assédio moral e sexual no ambiente de trabalho.',
      category: 'trabalho',
      href: '/servicos/assedio-moral-sexual',
      benefits: [
        {
          title: 'Proteção no Trabalho',
          description: 'Defesa da dignidade do trabalhador.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Coleta de Provas',
          description: 'Reunião de evidências do assédio sofrido.'
        }
      ],
      faq: [
        {
          question: 'O que caracteriza assédio moral?',
          answer: 'Condutas repetitivas que humilham ou constrangem o trabalhador.'
        }
      ],
      testimonials: [
        {
          name: 'Funcionária Anônima',
          text: 'Consegui justiça e indenização pelo sofrimento.'
        }
      ]
    },
    {
      id: 'trabalho-acidente-trabalho',
      title: 'Acidente de Trabalho',
      description: 'Assessoria em casos de acidentes e doenças ocupacionais.',
      category: 'trabalho',
      href: '/servicos/acidente-trabalho',
      benefits: [
        {
          title: 'Indenização Justa',
          description: 'Reparação pelos danos causados.',
          icon: '🏥'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Acidente',
          description: 'Investigação das causas e responsabilidades.'
        }
      ],
      faq: [
        {
          question: 'Tenho direito a indenização?',
          answer: 'Sim, se comprovada a culpa ou negligência do empregador.'
        }
      ],
      testimonials: [
        {
          name: 'Operário João',
          text: 'Recebi indenização justa pelo acidente sofrido.'
        }
      ]
    },
    {
      id: 'trabalho-equiparacao-salarial',
      title: 'Equiparação Salarial',
      description: 'Busca por salário igual para função igual.',
      category: 'trabalho',
      href: '/servicos/equiparacao-salarial',
      benefits: [
        {
          title: 'Isonomia Salarial',
          description: 'Salário justo conforme a função exercida.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comparação de Funções',
          description: 'Análise das atividades e responsabilidades.'
        }
      ],
      faq: [
        {
          question: 'Quando tenho direito à equiparação?',
          answer: 'Quando exerço a mesma função que colega com salário maior.'
        }
      ],
      testimonials: [
        {
          name: 'Ana Funcionária',
          text: 'Consegui equiparação e diferenças salariais.'
        }
      ]
    },
    {
      id: 'trabalho-verbas-indenizatorias',
      title: 'Verbas Indenizatórias',
      description: 'Cobrança de verbas rescisórias e indenizações.',
      category: 'trabalho',
      href: '/servicos/verbas-indenizatorias',
      benefits: [
        {
          title: 'Direitos Garantidos',
          description: 'Recebimento de todas as verbas devidas.',
          icon: '💰'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Cálculo das Verbas',
          description: 'Apuração de todos os valores devidos.'
        }
      ],
      faq: [
        {
          question: 'Quais verbas tenho direito na demissão?',
          answer: 'Aviso prévio, 13º, férias, FGTS e multa de 40%.'
        }
      ],
      testimonials: [
        {
          name: 'Carlos Trabalhador',
          text: 'Recebi todas as verbas que tinha direito.'
        }
      ]
    },
    {
      id: 'trabalho-intervalo-descanso',
      title: 'Intervalo para Descanso',
      description: 'Cobrança de intervalos não concedidos ou reduzidos.',
      category: 'trabalho',
      href: '/servicos/intervalo-descanso',
      benefits: [
        {
          title: 'Descanso Garantido',
          description: 'Direito ao intervalo intrajornada.',
          icon: '🍽️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise dos Intervalos',
          description: 'Verificação do cumprimento dos intervalos legais.'
        }
      ],
      faq: [
        {
          question: 'Qual o tempo mínimo de intervalo?',
          answer: '1 hora para jornadas acima de 6 horas.'
        }
      ],
      testimonials: [
        {
          name: 'Trabalhador Silva',
          text: 'Recebi pagamento pelos intervalos suprimidos.'
        }
      ]
    },
    {
      id: 'trabalho-adicional-insalubridade',
      title: 'Adicional de Insalubridade',
      description: 'Cobrança de adicional por trabalho em ambiente insalubre.',
      category: 'trabalho',
      href: '/servicos/adicional-insalubridade',
      benefits: [
        {
          title: 'Compensação por Riscos',
          description: 'Pagamento pelo trabalho em condições nocivas.',
          icon: '☣️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Perícia do Ambiente',
          description: 'Avaliação das condições de trabalho.'
        }
      ],
      faq: [
        {
          question: 'Que percentual é o adicional?',
          answer: '10%, 20% ou 40% conforme o grau de insalubridade.'
        }
      ],
      testimonials: [
        {
          name: 'Operário Industrial',
          text: 'Adicional reconhecido e pago retroativamente.'
        }
      ]
    },
    {
      id: 'trabalho-adicional-periculosidade',
      title: 'Adicional de Periculosidade',
      description: 'Cobrança de adicional por trabalho com risco de vida.',
      category: 'trabalho',
      href: '/servicos/adicional-periculosidade',
      benefits: [
        {
          title: 'Compensação por Perigo',
          description: 'Pagamento pelo risco à integridade física.',
          icon: '⚡'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Atividade',
          description: 'Verificação do enquadramento da atividade perigosa.'
        }
      ],
      faq: [
        {
          question: 'Qual o valor do adicional?',
          answer: '30% sobre o salário base.'
        }
      ],
      testimonials: [
        {
          name: 'Eletricista José',
          text: 'Periculosidade reconhecida e valores pagos.'
        }
      ]
    },
    {
      id: 'trabalho-estabilidade-provisoria',
      title: 'Estabilidade Provisória',
      description: 'Defesa da estabilidade no emprego em casos especiais.',
      category: 'trabalho',
      href: '/servicos/estabilidade-provisoria',
      benefits: [
        {
          title: 'Proteção no Emprego',
          description: 'Garantia contra demissão em períodos especiais.',
          icon: '🔒'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Verificação dos Requisitos',
          description: 'Análise das condições para estabilidade.'
        }
      ],
      faq: [
        {
          question: 'Quando tenho estabilidade?',
          answer: 'Gestação, acidente de trabalho, CIPA, pré-aposentadoria.'
        }
      ],
      testimonials: [
        {
          name: 'Gestante Maria',
          text: 'Estabilidade garantida durante a gestação.'
        }
      ]
    },
    {
      id: 'trabalho-desvio-funcao',
      title: 'Desvio de Função',
      description: 'Cobrança por exercer função diferente da contratada.',
      category: 'trabalho',
      href: '/servicos/desvio-funcao',
      benefits: [
        {
          title: 'Função Adequada',
          description: 'Exercício da função contratada ou remuneração correta.',
          icon: '🎯'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comparação de Funções',
          description: 'Análise entre função contratada e exercida.'
        }
      ],
      faq: [
        {
          question: 'O que é desvio de função?',
          answer: 'Exercer atividades diferentes das contratadas.'
        }
      ],
      testimonials: [
        {
          name: 'Auxiliar Promovido',
          text: 'Reconhecimento da função exercida e promoção.'
        }
      ]
    },
    {
      id: 'trabalho-programa-participacao',
      title: 'Programa de Participação',
      description: 'Cobrança de participação nos lucros e resultados.',
      category: 'trabalho',
      href: '/servicos/programa-participacao',
      benefits: [
        {
          title: 'Participação nos Resultados',
          description: 'Direito à participação nos lucros da empresa.',
          icon: '📈'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Programa',
          description: 'Verificação das regras e cumprimento.'
        }
      ],
      faq: [
        {
          question: 'Tenho direito à participação nos lucros?',
          answer: 'Depende da existência de programa ou acordo coletivo.'
        }
      ],
      testimonials: [
        {
          name: 'Equipe de Vendas',
          text: 'Participação nos lucros recebida corretamente.'
        }
      ]
    }
  ];
};
