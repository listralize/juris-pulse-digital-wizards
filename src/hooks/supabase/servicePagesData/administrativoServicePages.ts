
import { ServicePage } from '../../../types/adminTypes';

export const createAdministrativoServicePages = (): ServicePage[] => {
  return [
    {
      id: 'administrativo-licitacoes',
      title: 'Licitações e Contratos',
      description: 'Assessoria em processos licitatórios e contratos administrativos.',
      category: 'administrativo',
      href: '/servicos/licitacoes-contratos',
      benefits: [
        {
          title: 'Assessoria Especializada',
          description: 'Orientação técnica em todas as modalidades licitatórias.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Edital',
          description: 'Revisão detalhada dos requisitos e condições.'
        }
      ],
      faq: [
        {
          question: 'Quais são as modalidades de licitação?',
          answer: 'Concorrência, tomada de preços, convite, pregão, leilão e concurso.'
        }
      ],
      testimonials: [
        {
          name: 'Empresa XYZ',
          text: 'Conseguimos vencer várias licitações com o suporte jurídico.'
        }
      ]
    },
    {
      id: 'administrativo-concursos-publicos',
      title: 'Concursos Públicos',
      description: 'Defesa de direitos em concursos públicos e processos seletivos.',
      category: 'administrativo',
      href: '/servicos/concursos-publicos',
      benefits: [
        {
          title: 'Direitos Garantidos',
          description: 'Proteção dos direitos dos candidatos.',
          icon: '📚'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Edital',
          description: 'Verificação da legalidade do edital.'
        }
      ],
      faq: [
        {
          question: 'Posso questionar o resultado do concurso?',
          answer: 'Sim, se houver ilegalidades no processo.'
        }
      ],
      testimonials: [
        {
          name: 'Candidato Aprovado',
          text: 'Consegui a nomeação através de ação judicial.'
        }
      ]
    },
    {
      id: 'administrativo-servidores-publicos',
      title: 'Direitos de Servidores Públicos',
      description: 'Defesa dos direitos funcionais de servidores públicos.',
      category: 'administrativo',
      href: '/servicos/direitos-servidores',
      benefits: [
        {
          title: 'Proteção Funcional',
          description: 'Garantia dos direitos na carreira pública.',
          icon: '👨‍💼'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Situação',
          description: 'Verificação dos direitos funcionais.'
        }
      ],
      faq: [
        {
          question: 'Tenho estabilidade como servidor?',
          answer: 'Sim, após 3 anos de efetivo exercício.'
        }
      ],
      testimonials: [
        {
          name: 'Servidor Público',
          text: 'Direitos funcionais reconhecidos e pagos.'
        }
      ]
    },
    {
      id: 'administrativo-improbidade',
      title: 'Improbidade Administrativa',
      description: 'Ações contra atos de improbidade na administração pública.',
      category: 'administrativo',
      href: '/servicos/improbidade-administrativa',
      benefits: [
        {
          title: 'Moralidade Pública',
          description: 'Combate à corrupção e má gestão.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação do Ato',
          description: 'Caracterização do ato ímprobo.'
        }
      ],
      faq: [
        {
          question: 'O que é improbidade administrativa?',
          answer: 'Ato desonesto que viola princípios da administração.'
        }
      ],
      testimonials: [
        {
          name: 'Cidadão Vigilante',
          text: 'Ato ímprobo punido e ressarcimento obtido.'
        }
      ]
    },
    {
      id: 'administrativo-atos-administrativos',
      title: 'Atos Administrativos',
      description: 'Contestação e anulação de atos administrativos ilegais.',
      category: 'administrativo',
      href: '/servicos/atos-administrativos',
      benefits: [
        {
          title: 'Legalidade Administrativa',
          description: 'Garantia de atos conforme a lei.',
          icon: '📄'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Legalidade',
          description: 'Verificação da conformidade legal do ato.'
        }
      ],
      faq: [
        {
          question: 'Posso contestar qualquer ato administrativo?',
          answer: 'Sim, se for ilegal ou abusivo.'
        }
      ],
      testimonials: [
        {
          name: 'Administrado Protegido',
          text: 'Ato ilegal anulado judicialmente.'
        }
      ]
    },
    {
      id: 'administrativo-responsabilidade-estado',
      title: 'Responsabilidade do Estado',
      description: 'Ações de indenização contra o poder público.',
      category: 'administrativo',
      href: '/servicos/responsabilidade-estado',
      benefits: [
        {
          title: 'Reparação de Danos',
          description: 'Indenização por danos causados pelo Estado.',
          icon: '💰'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comprovação do Dano',
          description: 'Demonstração dos prejuízos sofridos.'
        }
      ],
      faq: [
        {
          question: 'O Estado sempre responde por danos?',
          answer: 'Sim, quando há nexo causal com sua atividade.'
        }
      ],
      testimonials: [
        {
          name: 'Vítima Indenizada',
          text: 'Indenização justa por dano causado pelo Estado.'
        }
      ]
    },
    {
      id: 'administrativo-desapropriacao',
      title: 'Desapropriação',
      description: 'Defesa em processos de desapropriação e justa indenização.',
      category: 'administrativo',
      href: '/servicos/desapropriacao',
      benefits: [
        {
          title: 'Indenização Justa',
          description: 'Valor adequado pela propriedade desapropriada.',
          icon: '🏠'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Avaliação do Bem',
          description: 'Determinação do valor justo da propriedade.'
        }
      ],
      faq: [
        {
          question: 'Posso contestar o valor da desapropriação?',
          answer: 'Sim, através de perícia e contraditório.'
        }
      ],
      testimonials: [
        {
          name: 'Proprietário Indenizado',
          text: 'Valor da desapropriação aumentado significativamente.'
        }
      ]
    },
    {
      id: 'administrativo-pad-sindicancia',
      title: 'PAD e Sindicância',
      description: 'Defesa em processos administrativos disciplinares.',
      category: 'administrativo',
      href: '/servicos/pad-sindicancia',
      benefits: [
        {
          title: 'Defesa Técnica',
          description: 'Proteção dos direitos no processo disciplinar.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise das Acusações',
          description: 'Verificação da consistência das imputações.'
        }
      ],
      faq: [
        {
          question: 'Tenho direito a defesa no PAD?',
          answer: 'Sim, é garantia constitucional ampla defesa.'
        }
      ],
      testimonials: [
        {
          name: 'Servidor Absolvido',
          text: 'PAD arquivado por inconsistência das acusações.'
        }
      ]
    },
    {
      id: 'administrativo-processos-administrativos',
      title: 'Processos Administrativos',
      description: 'Acompanhamento de processos na administração pública.',
      category: 'administrativo',
      href: '/servicos/processos-administrativos',
      benefits: [
        {
          title: 'Acompanhamento Técnico',
          description: 'Orientação especializada em processos administrativos.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Processo',
          description: 'Verificação da tramitação e legalidade.'
        }
      ],
      faq: [
        {
          question: 'Como funciona um processo administrativo?',
          answer: 'Segue rito próprio com garantias de defesa.'
        }
      ],
      testimonials: [
        {
          name: 'Interessado Atendido',
          text: 'Processo resolvido favoravelmente na administração.'
        }
      ]
    },
    {
      id: 'administrativo-politicas-publicas',
      title: 'Políticas Públicas',
      description: 'Controle judicial de políticas públicas.',
      category: 'administrativo',
      href: '/servicos/politicas-publicas',
      benefits: [
        {
          title: 'Efetividade de Direitos',
          description: 'Implementação de políticas públicas necessárias.',
          icon: '🏛️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação da Omissão',
          description: 'Verificação da falta de política pública.'
        }
      ],
      faq: [
        {
          question: 'Posso exigir política pública do governo?',
          answer: 'Sim, quando há direito fundamental violado.'
        }
      ],
      testimonials: [
        {
          name: 'Comunidade Beneficiada',
          text: 'Política pública implementada por determinação judicial.'
        }
      ]
    },
    {
      id: 'administrativo-regulacao-fiscalizacao',
      title: 'Regulação e Fiscalização',
      description: 'Questões relacionadas a agências reguladoras.',
      category: 'administrativo',
      href: '/servicos/regulacao-fiscalizacao',
      benefits: [
        {
          title: 'Conformidade Regulatória',
          description: 'Adequação às normas regulamentares.',
          icon: '🔍'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Regulatória',
          description: 'Verificação das exigências regulamentares.'
        }
      ],
      faq: [
        {
          question: 'Como contestar decisão de agência?',
          answer: 'Através de recurso administrativo ou judicial.'
        }
      ],
      testimonials: [
        {
          name: 'Empresa Regulada',
          text: 'Decisão regulatória revertida em nosso favor.'
        }
      ]
    },
    {
      id: 'administrativo-tribunais-contas',
      title: 'Tribunais de Contas',
      description: 'Defesa em processos perante tribunais de contas.',
      category: 'administrativo',
      href: '/servicos/tribunais-contas',
      benefits: [
        {
          title: 'Defesa Especializada',
          description: 'Proteção em processos de controle externo.',
          icon: '📊'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Auditoria',
          description: 'Verificação dos achados de auditoria.'
        }
      ],
      faq: [
        {
          question: 'Posso contestar decisão do TCU?',
          answer: 'Sim, através de recursos próprios.'
        }
      ],
      testimonials: [
        {
          name: 'Gestor Público',
          text: 'Contas aprovadas após defesa técnica consistente.'
        }
      ]
    }
  ];
};
