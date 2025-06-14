
import { ServicePage } from '../../../types/adminTypes';

export const createConstitucionalServicePages = (): ServicePage[] => {
  return [
    {
      id: 'constitucional-direitos-fundamentais',
      title: 'Direitos Fundamentais',
      description: 'Defesa dos direitos fundamentais garantidos pela Constituição.',
      category: 'constitucional',
      href: '/servicos/direitos-fundamentais',
      benefits: [
        {
          title: 'Proteção Constitucional',
          description: 'Defesa dos direitos básicos da pessoa humana.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação da Violação',
          description: 'Análise da ofensa aos direitos constitucionais.'
        }
      ],
      faq: [
        {
          question: 'O que são direitos fundamentais?',
          answer: 'Direitos básicos inerentes à pessoa humana, garantidos pela Constituição.'
        }
      ],
      testimonials: [
        {
          name: 'Cidadão Protegido',
          text: 'Direitos constitucionais reconhecidos e protegidos.'
        }
      ]
    },
    {
      id: 'constitucional-habeas-corpus',
      title: 'Habeas Corpus',
      description: 'Proteção da liberdade de locomoção através de habeas corpus.',
      category: 'constitucional',
      href: '/servicos/habeas-corpus',
      benefits: [
        {
          title: 'Liberdade Protegida',
          description: 'Defesa contra prisão ilegal ou abuso de autoridade.',
          icon: '🔓'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Prisão',
          description: 'Verificação da legalidade da privação de liberdade.'
        }
      ],
      faq: [
        {
          question: 'Quando cabe habeas corpus?',
          answer: 'Quando há ameaça ou violação à liberdade de locomoção.'
        }
      ],
      testimonials: [
        {
          name: 'Pessoa Libertada',
          text: 'Liberdade restabelecida através de habeas corpus.'
        }
      ]
    },
    {
      id: 'constitucional-mandado-seguranca',
      title: 'Mandado de Segurança',
      description: 'Proteção de direitos líquidos e certos contra autoridades.',
      category: 'constitucional',
      href: '/servicos/mandado-seguranca',
      benefits: [
        {
          title: 'Proteção Imediata',
          description: 'Tutela rápida de direitos violados por autoridades.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comprovação do Direito',
          description: 'Demonstração do direito líquido e certo violado.'
        }
      ],
      faq: [
        {
          question: 'O que é direito líquido e certo?',
          answer: 'Direito claro, sem necessidade de prova complexa.'
        }
      ],
      testimonials: [
        {
          name: 'Funcionário Público',
          text: 'Direito reconhecido através de mandado de segurança.'
        }
      ]
    },
    {
      id: 'constitucional-habeas-data',
      title: 'Habeas Data',
      description: 'Acesso e retificação de informações pessoais em bancos de dados.',
      category: 'constitucional',
      href: '/servicos/habeas-data',
      benefits: [
        {
          title: 'Transparência de Dados',
          description: 'Controle sobre informações pessoais.',
          icon: '📊'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação dos Dados',
          description: 'Localização das informações a serem acessadas.'
        }
      ],
      faq: [
        {
          question: 'Posso corrigir dados incorretos sobre mim?',
          answer: 'Sim, através do habeas data.'
        }
      ],
      testimonials: [
        {
          name: 'Cidadão Informado',
          text: 'Dados pessoais corrigidos em órgão público.'
        }
      ]
    },
    {
      id: 'constitucional-mandado-injuncao',
      title: 'Mandado de Injunção',
      description: 'Suprimento de ausência de norma regulamentadora.',
      category: 'constitucional',
      href: '/servicos/mandado-injuncao',
      benefits: [
        {
          title: 'Efetividade Constitucional',
          description: 'Concretização de direitos constitucionais.',
          icon: '📜'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação da Lacuna',
          description: 'Verificação da ausência de norma regulamentadora.'
        }
      ],
      faq: [
        {
          question: 'Quando cabe mandado de injunção?',
          answer: 'Quando falta norma para exercer direito constitucional.'
        }
      ],
      testimonials: [
        {
          name: 'Servidor Beneficiado',
          text: 'Direito constitucional viabilizado por injunção.'
        }
      ]
    },
    {
      id: 'constitucional-acao-popular',
      title: 'Ação Popular',
      description: 'Defesa do patrimônio público e moralidade administrativa.',
      category: 'constitucional',
      href: '/servicos/acao-popular',
      benefits: [
        {
          title: 'Cidadania Ativa',
          description: 'Participação na defesa do interesse público.',
          icon: '🏛️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação do Ato',
          description: 'Verificação de ato lesivo ao patrimônio público.'
        }
      ],
      faq: [
        {
          question: 'Quem pode propor ação popular?',
          answer: 'Qualquer cidadão no pleno gozo dos direitos políticos.'
        }
      ],
      testimonials: [
        {
          name: 'Cidadão Ativo',
          text: 'Ato lesivo anulado através de ação popular.'
        }
      ]
    },
    {
      id: 'constitucional-liberdade-expressao',
      title: 'Liberdade de Expressão',
      description: 'Defesa da liberdade de manifestação do pensamento.',
      category: 'constitucional',
      href: '/servicos/liberdade-expressao',
      benefits: [
        {
          title: 'Expressão Livre',
          description: 'Proteção do direito de manifestar opiniões.',
          icon: '🗣️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Censura',
          description: 'Verificação de tentativas de censura.'
        }
      ],
      faq: [
        {
          question: 'Posso expressar qualquer opinião?',
          answer: 'Sim, desde que não viole direitos de terceiros.'
        }
      ],
      testimonials: [
        {
          name: 'Jornalista Livre',
          text: 'Liberdade de imprensa protegida judicialmente.'
        }
      ]
    },
    {
      id: 'constitucional-igualdade-discriminacao',
      title: 'Igualdade e Não Discriminação',
      description: 'Combate à discriminação e promoção da igualdade.',
      category: 'constitucional',
      href: '/servicos/igualdade-nao-discriminacao',
      benefits: [
        {
          title: 'Tratamento Igualitário',
          description: 'Proteção contra discriminação injusta.',
          icon: '🤝'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação da Discriminação',
          description: 'Caracterização do tratamento discriminatório.'
        }
      ],
      faq: [
        {
          question: 'O que é discriminação?',
          answer: 'Tratamento diferenciado sem justificativa razoável.'
        }
      ],
      testimonials: [
        {
          name: 'Vítima de Discriminação',
          text: 'Discriminação cessada e dignidade restaurada.'
        }
      ]
    },
    {
      id: 'constitucional-direitos-sociais',
      title: 'Direitos Sociais',
      description: 'Efetivação de direitos sociais como saúde, educação e moradia.',
      category: 'constitucional',
      href: '/servicos/direitos-sociais',
      benefits: [
        {
          title: 'Justiça Social',
          description: 'Concretização de direitos sociais básicos.',
          icon: '🏠'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação da Omissão',
          description: 'Verificação da não prestação de direitos sociais.'
        }
      ],
      faq: [
        {
          question: 'Posso exigir saúde do Estado?',
          answer: 'Sim, é direito fundamental garantido constitucionalmente.'
        }
      ],
      testimonials: [
        {
          name: 'Necessitado Atendido',
          text: 'Direito à saúde garantido judicialmente.'
        }
      ]
    },
    {
      id: 'constitucional-liberdades-constitucionais',
      title: 'Liberdades Constitucionais',
      description: 'Proteção das diversas liberdades previstas na Constituição.',
      category: 'constitucional',
      href: '/servicos/liberdades-constitucionais',
      benefits: [
        {
          title: 'Liberdades Amplas',
          description: 'Proteção integral das liberdades constitucionais.',
          icon: '🕊️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Mapeamento das Liberdades',
          description: 'Identificação das liberdades violadas.'
        }
      ],
      faq: [
        {
          question: 'Quais são as liberdades constitucionais?',
          answer: 'Locomoção, expressão, crença, associação, entre outras.'
        }
      ],
      testimonials: [
        {
          name: 'Cidadão Livre',
          text: 'Liberdades constitucionais plenamente restauradas.'
        }
      ]
    },
    {
      id: 'constitucional-direitos-minorias',
      title: 'Direitos das Minorias',
      description: 'Proteção especial dos direitos de grupos minoritários.',
      category: 'constitucional',
      href: '/servicos/direitos-minorias',
      benefits: [
        {
          title: 'Proteção Especial',
          description: 'Defesa qualificada de grupos vulneráveis.',
          icon: '🌈'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação da Vulnerabilidade',
          description: 'Caracterização da situação de vulnerabilidade.'
        }
      ],
      faq: [
        {
          question: 'Quem são as minorias protegidas?',
          answer: 'Grupos em situação de vulnerabilidade social.'
        }
      ],
      testimonials: [
        {
          name: 'Grupo Protegido',
          text: 'Direitos de minoria reconhecidos e protegidos.'
        }
      ]
    },
    {
      id: 'constitucional-controle-constitucionalidade',
      title: 'Controle de Constitucionalidade',
      description: 'Verificação da conformidade de leis com a Constituição.',
      category: 'constitucional',
      href: '/servicos/controle-constitucionalidade',
      benefits: [
        {
          title: 'Supremacia Constitucional',
          description: 'Garantia da superioridade da Constituição.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Norma',
          description: 'Verificação da compatibilidade com a Constituição.'
        }
      ],
      faq: [
        {
          question: 'Posso questionar a constitucionalidade de uma lei?',
          answer: 'Sim, através de ações específicas ou incidentalmente.'
        }
      ],
      testimonials: [
        {
          name: 'Jurista Constitucional',
          text: 'Inconstitucionalidade reconhecida e norma afastada.'
        }
      ]
    }
  ];
};
