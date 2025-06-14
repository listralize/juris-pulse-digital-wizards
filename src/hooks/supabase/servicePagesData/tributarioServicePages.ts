
import { ServicePage } from '../../../types/adminTypes';

export const createTributarioServicePages = (): ServicePage[] => {
  return [
    {
      id: 'tributario-planejamento',
      title: 'Planejamento Tributário',
      description: 'Estratégias para redução legal da carga tributária.',
      category: 'tributario',
      href: '/servicos/planejamento-tributario',
      benefits: [
        {
          title: 'Economia Fiscal',
          description: 'Redução significativa dos tributos pagos.',
          icon: '💰'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Diagnóstico Tributário',
          description: 'Análise completa da situação fiscal atual.'
        }
      ],
      faq: [
        {
          question: 'Planejamento tributário é legal?',
          answer: 'Sim, é o uso de meios legais para reduzir tributos.'
        }
      ],
      testimonials: [
        {
          name: 'Empresa ABC',
          text: 'Reduzimos 30% dos impostos legalmente.'
        }
      ]
    },
    {
      id: 'tributario-restituicao',
      title: 'Restituição de Tributos',
      description: 'Recuperação de tributos pagos indevidamente.',
      category: 'tributario',
      href: '/servicos/restituicao-tributos',
      benefits: [
        {
          title: 'Recuperação de Valores',
          description: 'Ressarcimento de tributos pagos a maior.',
          icon: '🔄'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Auditoria Fiscal',
          description: 'Identificação de pagamentos indevidos.'
        }
      ],
      faq: [
        {
          question: 'Qual o prazo para pedir restituição?',
          answer: 'Geralmente 5 anos contados do pagamento indevido.'
        }
      ],
      testimonials: [
        {
          name: 'Comercial XYZ',
          text: 'Recuperamos R$ 50 mil em tributos.'
        }
      ]
    },
    {
      id: 'tributario-defesa-autuacao',
      title: 'Defesa em Autuações',
      description: 'Contestação de autos de infração e multas fiscais.',
      category: 'tributario',
      href: '/servicos/defesa-autuacao',
      benefits: [
        {
          title: 'Redução de Multas',
          description: 'Contestação eficaz de penalidades fiscais.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Autuação',
          description: 'Estudo detalhado do auto de infração.'
        }
      ],
      faq: [
        {
          question: 'Posso contestar qualquer multa?',
          answer: 'Sim, sempre há possibilidade de defesa administrativa.'
        }
      ],
      testimonials: [
        {
          name: 'Indústria 123',
          text: 'Multa reduzida em 80% após defesa.'
        }
      ]
    },
    {
      id: 'tributario-parcelamento',
      title: 'Parcelamento de Débitos',
      description: 'Negociação de parcelamentos e refinanciamentos tributários.',
      category: 'tributario',
      href: '/servicos/parcelamento-debitos',
      benefits: [
        {
          title: 'Facilitação de Pagamento',
          description: 'Condições favoráveis para quitação.',
          icon: '📊'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Dívida',
          description: 'Levantamento completo dos débitos tributários.'
        }
      ],
      faq: [
        {
          question: 'Quais tributos podem ser parcelados?',
          answer: 'Praticamente todos os tributos federais, estaduais e municipais.'
        }
      ],
      testimonials: [
        {
          name: 'Loja DEF',
          text: 'Conseguimos parcelar em 60 vezes.'
        }
      ]
    },
    {
      id: 'tributario-elisao-fiscal',
      title: 'Elisão Fiscal',
      description: 'Estratégias legais para evitar a incidência tributária.',
      category: 'tributario',
      href: '/servicos/elisao-fiscal',
      benefits: [
        {
          title: 'Prevenção Tributária',
          description: 'Evitar tributos através de planejamento.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Estudo Preventivo',
          description: 'Análise antes da realização do negócio.'
        }
      ],
      faq: [
        {
          question: 'Diferença entre elisão e evasão?',
          answer: 'Elisão é legal, evasão é sonegação (ilegal).'
        }
      ],
      testimonials: [
        {
          name: 'Holding GHI',
          text: 'Estrutura criada com economia fiscal significativa.'
        }
      ]
    },
    {
      id: 'tributario-icms',
      title: 'ICMS - Consultoria',
      description: 'Assessoria especializada em ICMS e substituição tributária.',
      category: 'tributario',
      href: '/servicos/icms-consultoria',
      benefits: [
        {
          title: 'Expertise em ICMS',
          description: 'Conhecimento profundo da legislação estadual.',
          icon: '🏛️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Mapeamento de Operações',
          description: 'Análise das operações sujeitas ao ICMS.'
        }
      ],
      faq: [
        {
          question: 'O que é substituição tributária?',
          answer: 'Sistema onde um contribuinte recolhe o imposto por toda a cadeia.'
        }
      ],
      testimonials: [
        {
          name: 'Distribuidora JKL',
          text: 'Reduzimos significativamente o ICMS devido.'
        }
      ]
    },
    {
      id: 'tributario-simples-nacional',
      title: 'Simples Nacional',
      description: 'Consultoria para enquadramento e permanência no Simples.',
      category: 'tributario',
      href: '/servicos/simples-nacional',
      benefits: [
        {
          title: 'Regime Simplificado',
          description: 'Redução da carga tributária e burocracia.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Verificação de Requisitos',
          description: 'Análise dos critérios para enquadramento.'
        }
      ],
      faq: [
        {
          question: 'Qualquer empresa pode optar pelo Simples?',
          answer: 'Não, há requisitos de faturamento e atividade.'
        }
      ],
      testimonials: [
        {
          name: 'Startup MNO',
          text: 'Enquadramento no Simples trouxe grande economia.'
        }
      ]
    },
    {
      id: 'tributario-imposto-renda',
      title: 'Imposto de Renda',
      description: 'Consultoria em IR pessoa física e jurídica.',
      category: 'tributario',
      href: '/servicos/imposto-renda',
      benefits: [
        {
          title: 'Otimização do IR',
          description: 'Estratégias para reduzir o imposto devido.',
          icon: '💼'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Declaração',
          description: 'Revisão completa das informações fiscais.'
        }
      ],
      faq: [
        {
          question: 'Posso retificar minha declaração?',
          answer: 'Sim, através da declaração retificadora.'
        }
      ],
      testimonials: [
        {
          name: 'Executivo PQR',
          text: 'Otimização resultou em economia de milhares.'
        }
      ]
    },
    {
      id: 'tributario-pis-cofins',
      title: 'PIS/COFINS',
      description: 'Consultoria especializada em PIS e COFINS.',
      category: 'tributario',
      href: '/servicos/pis-cofins',
      benefits: [
        {
          title: 'Recuperação de Créditos',
          description: 'Identificação e aproveitamento de créditos.',
          icon: '💳'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Auditoria de Créditos',
          description: 'Levantamento dos créditos não aproveitados.'
        }
      ],
      faq: [
        {
          question: 'O que são créditos de PIS/COFINS?',
          answer: 'Valores que podem ser descontados do imposto devido.'
        }
      ],
      testimonials: [
        {
          name: 'Indústria STU',
          text: 'Recuperamos milhões em créditos de PIS/COFINS.'
        }
      ]
    },
    {
      id: 'tributario-iss',
      title: 'ISS - Imposto sobre Serviços',
      description: 'Consultoria em ISS e questões municipais.',
      category: 'tributario',
      href: '/servicos/iss-consultoria',
      benefits: [
        {
          title: 'Compliance Municipal',
          description: 'Adequação às exigências municipais.',
          icon: '🏢'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise dos Serviços',
          description: 'Classificação dos serviços prestados.'
        }
      ],
      faq: [
        {
          question: 'Onde devo recolher o ISS?',
          answer: 'No município onde o serviço é prestado.'
        }
      ],
      testimonials: [
        {
          name: 'Consultoria VWX',
          text: 'Regularização do ISS sem multas.'
        }
      ]
    }
  ];
};
