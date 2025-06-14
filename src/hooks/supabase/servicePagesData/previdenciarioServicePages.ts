
import { ServicePage } from '../../../types/adminTypes';

export const createPrevidenciarioServicePages = (): ServicePage[] => {
  return [
    {
      id: 'previdenciario-aposentadoria',
      title: 'Aposentadoria',
      description: 'Assessoria para concessão de aposentadorias e benefícios previdenciários.',
      category: 'previdenciario',
      href: '/servicos/aposentadoria',
      benefits: [
        {
          title: 'Análise Previdenciária',
          description: 'Verificação do tempo de contribuição e melhor momento para aposentar.',
          icon: '👴'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Levantamento Previdenciário',
          description: 'Análise completa do histórico contributivo.'
        }
      ],
      faq: [
        {
          question: 'Quando posso me aposentar?',
          answer: 'Depende da idade, tempo de contribuição e regra aplicável. Fazemos essa análise.'
        }
      ],
      testimonials: [
        {
          name: 'José Carlos',
          text: 'Consegui minha aposentadoria com o valor máximo possível.'
        }
      ]
    },
    {
      id: 'previdenciario-auxilio-doenca',
      title: 'Auxílio-Doença',
      description: 'Concessão e revisão de auxílio-doença e auxílio-acidente.',
      category: 'previdenciario',
      href: '/servicos/auxilio-doenca',
      benefits: [
        {
          title: 'Benefício por Incapacidade',
          description: 'Garantia de renda durante a incapacidade.',
          icon: '🏥'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Médica',
          description: 'Avaliação da incapacidade para o trabalho.'
        }
      ],
      faq: [
        {
          question: 'Quanto tempo posso ficar no auxílio-doença?',
          answer: 'Enquanto persistir a incapacidade, respeitando os prazos legais.'
        }
      ],
      testimonials: [
        {
          name: 'Maria Trabalhadora',
          text: 'Auxílio-doença concedido após recurso bem fundamentado.'
        }
      ]
    },
    {
      id: 'previdenciario-pensao-morte',
      title: 'Pensão por Morte',
      description: 'Concessão de pensão por morte para dependentes.',
      category: 'previdenciario',
      href: '/servicos/pensao-morte',
      benefits: [
        {
          title: 'Amparo à Família',
          description: 'Garantia de renda para os dependentes.',
          icon: '👨‍👩‍👧‍👦'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comprovação da Dependência',
          description: 'Demonstração do vínculo e dependência econômica.'
        }
      ],
      faq: [
        {
          question: 'Quem tem direito à pensão por morte?',
          answer: 'Cônjuge, filhos menores de 21 anos e outros dependentes.'
        }
      ],
      testimonials: [
        {
          name: 'Viúva Amparada',
          text: 'Pensão concedida garantindo o sustento da família.'
        }
      ]
    },
    {
      id: 'previdenciario-bpc',
      title: 'BPC - Benefício de Prestação Continuada',
      description: 'Concessão de BPC para idosos e pessoas com deficiência.',
      category: 'previdenciario',
      href: '/servicos/bpc',
      benefits: [
        {
          title: 'Amparo Social',
          description: 'Benefício assistencial para quem precisa.',
          icon: '🤝'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise dos Requisitos',
          description: 'Verificação da idade, deficiência e renda familiar.'
        }
      ],
      faq: [
        {
          question: 'Qual a renda familiar máxima para o BPC?',
          answer: '1/4 do salário mínimo per capita familiar.'
        }
      ],
      testimonials: [
        {
          name: 'Idoso Beneficiado',
          text: 'BPC concedido após comprovação dos requisitos.'
        }
      ]
    },
    {
      id: 'previdenciario-aposentadoria-especial',
      title: 'Aposentadoria Especial',
      description: 'Aposentadoria para trabalhadores expostos a agentes nocivos.',
      category: 'previdenciario',
      href: '/servicos/aposentadoria-especial',
      benefits: [
        {
          title: 'Tempo Reduzido',
          description: 'Aposentadoria com menor tempo de contribuição.',
          icon: '⚗️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comprovação da Exposição',
          description: 'Demonstração do trabalho em atividade especial.'
        }
      ],
      faq: [
        {
          question: 'Quais atividades dão direito à aposentadoria especial?',
          answer: 'Atividades com exposição a agentes químicos, físicos ou biológicos nocivos.'
        }
      ],
      testimonials: [
        {
          name: 'Químico Industrial',
          text: 'Aposentadoria especial reconhecida aos 25 anos de contribuição.'
        }
      ]
    },
    {
      id: 'previdenciario-revisao-beneficios',
      title: 'Revisão de Benefícios',
      description: 'Revisão de benefícios previdenciários com valor incorreto.',
      category: 'previdenciario',
      href: '/servicos/revisao-beneficios',
      benefits: [
        {
          title: 'Valor Correto',
          description: 'Correção do valor do benefício previdenciário.',
          icon: '📊'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Benefício',
          description: 'Verificação dos cálculos aplicados pelo INSS.'
        }
      ],
      faq: [
        {
          question: 'Posso revisar meu benefício a qualquer tempo?',
          answer: 'Depende do tipo de revisão e do prazo decadencial.'
        }
      ],
      testimonials: [
        {
          name: 'Aposentado Feliz',
          text: 'Benefício revisado com aumento significativo.'
        }
      ]
    },
    {
      id: 'previdenciario-planejamento-previdenciario',
      title: 'Planejamento Previdenciário',
      description: 'Estratégia para maximizar benefícios previdenciários.',
      category: 'previdenciario',
      href: '/servicos/planejamento-previdenciario',
      benefits: [
        {
          title: 'Estratégia Personalizada',
          description: 'Plano sob medida para sua aposentadoria.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Perfil',
          description: 'Estudo do histórico e expectativas do segurado.'
        }
      ],
      faq: [
        {
          question: 'Quando devo fazer o planejamento?',
          answer: 'Quanto antes, para otimizar as contribuições e regras aplicáveis.'
        }
      ],
      testimonials: [
        {
          name: 'Futuro Aposentado',
          text: 'Planejamento me mostrou o melhor caminho para aposentadoria.'
        }
      ]
    },
    {
      id: 'previdenciario-auxilio-acidente',
      title: 'Auxílio-Acidente',
      description: 'Benefício complementar por sequela de acidente.',
      category: 'previdenciario',
      href: '/servicos/auxilio-acidente',
      benefits: [
        {
          title: 'Complemento de Renda',
          description: 'Indenização pela redução da capacidade laborativa.',
          icon: '🚑'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comprovação da Sequela',
          description: 'Demonstração das sequelas permanentes.'
        }
      ],
      faq: [
        {
          question: 'Posso trabalhar recebendo auxílio-acidente?',
          answer: 'Sim, é um benefício complementar à remuneração.'
        }
      ],
      testimonials: [
        {
          name: 'Acidentado Ressarcido',
          text: 'Auxílio-acidente concedido reconhecendo as sequelas.'
        }
      ]
    },
    {
      id: 'previdenciario-salario-maternidade',
      title: 'Salário-Maternidade',
      description: 'Benefício para gestantes e adotantes.',
      category: 'previdenciario',
      href: '/servicos/salario-maternidade',
      benefits: [
        {
          title: 'Proteção à Maternidade',
          description: 'Garantia de renda durante a licença maternidade.',
          icon: '👶'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comprovação da Gravidez',
          description: 'Apresentação dos documentos médicos.'
        }
      ],
      faq: [
        {
          question: 'Por quanto tempo recebo o salário-maternidade?',
          answer: '120 dias, podendo ser prorrogado em casos especiais.'
        }
      ],
      testimonials: [
        {
          name: 'Mãe Protegida',
          text: 'Salário-maternidade garantiu tranquilidade na gestação.'
        }
      ]
    },
    {
      id: 'previdenciario-aposentadoria-idade',
      title: 'Aposentadoria por Idade',
      description: 'Aposentadoria baseada na idade mínima.',
      category: 'previdenciario',
      href: '/servicos/aposentadoria-idade',
      benefits: [
        {
          title: 'Aposentadoria Garantida',
          description: 'Benefício garantido pela idade.',
          icon: '🎂'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Verificação da Idade',
          description: 'Comprovação da idade mínima exigida.'
        }
      ],
      faq: [
        {
          question: 'Qual a idade mínima para aposentadoria?',
          answer: '65 anos para homens e 62 anos para mulheres (regra atual).'
        }
      ],
      testimonials: [
        {
          name: 'Aposentado por Idade',
          text: 'Aposentadoria concedida na idade certa.'
        }
      ]
    },
    {
      id: 'previdenciario-aposentadoria-tempo',
      title: 'Aposentadoria por Tempo de Contribuição',
      description: 'Aposentadoria baseada no tempo de contribuição.',
      category: 'previdenciario',
      href: '/servicos/aposentadoria-tempo-contribuicao',
      benefits: [
        {
          title: 'Tempo de Serviço',
          description: 'Reconhecimento do tempo trabalhado.',
          icon: '⏰'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Contagem do Tempo',
          description: 'Levantamento de todo o período contributivo.'
        }
      ],
      faq: [
        {
          question: 'Ainda existe aposentadoria por tempo de contribuição?',
          answer: 'Para quem tinha direito adquirido antes da EC 103/2019.'
        }
      ],
      testimonials: [
        {
          name: 'Trabalhador Veterano',
          text: 'Aposentadoria por tempo reconhecida integralmente.'
        }
      ]
    },
    {
      id: 'previdenciario-aposentadoria-invalidez',
      title: 'Aposentadoria por Invalidez',
      description: 'Benefício por incapacidade permanente para o trabalho.',
      category: 'previdenciario',
      href: '/servicos/aposentadoria-invalidez',
      benefits: [
        {
          title: 'Proteção Total',
          description: 'Benefício para incapacidade permanente.',
          icon: '♿'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Perícia Médica',
          description: 'Comprovação da incapacidade permanente.'
        }
      ],
      faq: [
        {
          question: 'Posso trabalhar recebendo aposentadoria por invalidez?',
          answer: 'Não, exceto como reabilitado em função compatível.'
        }
      ],
      testimonials: [
        {
          name: 'Segurado Protegido',
          text: 'Aposentadoria por invalidez garantiu minha subsistência.'
        }
      ]
    }
  ];
};
