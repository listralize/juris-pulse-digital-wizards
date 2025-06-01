
import { ServicePage } from '../types/adminTypes';

export const defaultServicePages: ServicePage[] = [
  // Direito de Família
  {
    id: 'divorcio',
    title: 'Divórcio e Separação',
    description: 'Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes e na melhor solução para todas as partes envolvidas.',
    category: 'familia',
    href: '/services/divorcio',
    benefits: [
      {
        title: 'Orientação Especializada',
        description: 'Assessoria jurídica completa durante todo o processo de divórcio, garantindo seus direitos.',
        icon: '⚖️'
      },
      {
        title: 'Proteção Patrimonial',
        description: 'Auxílio na divisão justa dos bens adquiridos durante o casamento.',
        icon: '🏠'
      },
      {
        title: 'Cuidado com os Filhos',
        description: 'Orientação sobre guarda, visitação e pensão alimentícia priorizando o bem-estar das crianças.',
        icon: '👨‍👩‍👧‍👦'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Consulta Inicial',
        description: 'Análise detalhada da situação conjugal e orientação sobre as opções disponíveis.'
      },
      {
        step: 2,
        title: 'Documentação',
        description: 'Preparação de toda a documentação necessária para o processo.'
      },
      {
        step: 3,
        title: 'Negociação',
        description: 'Mediação entre as partes para acordos amigáveis sempre que possível.'
      },
      {
        step: 4,
        title: 'Processo Judicial',
        description: 'Acompanhamento completo do processo até a sentença final.'
      }
    ],
    faq: [
      {
        question: 'Quanto tempo demora um processo de divórcio?',
        answer: 'O tempo varia dependendo se é consensual (mais rápido) ou litigioso. Divórcios consensuais podem ser resolvidos em alguns meses.'
      },
      {
        question: 'É obrigatório fazer inventário no divórcio?',
        answer: 'Não necessariamente. Se não há bens a partilhar ou se há acordo sobre a divisão, pode não ser necessário.'
      },
      {
        question: 'Posso me divorciar sem advogado?',
        answer: 'Em casos consensuais com filhos menores ou bens a partilhar, é obrigatório ter assistência de advogado.'
      }
    ],
    testimonials: [
      {
        name: 'Maria Silva',
        quote: 'O processo foi conduzido com muito profissionalismo e sensibilidade. Conseguimos chegar a um acordo justo para todos.',
        image: ''
      },
      {
        name: 'Carlos Santos',
        quote: 'Excelente assessoria jurídica. Me senti seguro durante todo o processo de divórcio.',
        image: ''
      }
    ]
  },
  {
    id: 'guarda-filhos',
    title: 'Guarda de Filhos',
    description: 'Defesa dos melhores interesses das crianças em disputas de guarda, visitação e regulamentação de convivência familiar.',
    category: 'familia',
    href: '/services/guarda-filhos',
    benefits: [
      {
        title: 'Prioridade ao Bem-Estar',
        description: 'Sempre focamos no melhor interesse da criança em todas as decisões.',
        icon: '👶'
      },
      {
        title: 'Mediação Familiar',
        description: 'Buscamos soluções amigáveis que preservem os vínculos familiares.',
        icon: '🤝'
      },
      {
        title: 'Proteção Legal',
        description: 'Garantimos que seus direitos parentais sejam respeitados.',
        icon: '🛡️'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Avaliação do Caso',
        description: 'Análise detalhada da situação familiar e dos interesses das crianças.'
      },
      {
        step: 2,
        title: 'Estratégia Legal',
        description: 'Desenvolvimento de estratégia jurídica personalizada para seu caso.'
      },
      {
        step: 3,
        title: 'Documentação',
        description: 'Preparação de laudos e documentos que comprovem a capacidade parental.'
      },
      {
        step: 4,
        title: 'Acompanhamento',
        description: 'Representação em audiências e acompanhamento até a decisão final.'
      }
    ],
    faq: [
      {
        question: 'Qual é a diferença entre guarda compartilhada e unilateral?',
        answer: 'Na guarda compartilhada, ambos os pais tomam decisões importantes sobre os filhos. Na unilateral, apenas um genitor tem essa responsabilidade.'
      },
      {
        question: 'A guarda compartilhada é obrigatória?',
        answer: 'A lei estabelece a guarda compartilhada como regra, mas pode haver exceções quando não atende ao melhor interesse da criança.'
      }
    ],
    testimonials: [
      {
        name: 'Ana Paula',
        quote: 'Consegui a guarda compartilhada dos meus filhos. O escritório foi fundamental nesse processo.',
        image: ''
      }
    ]
  },
  // Direito Tributário
  {
    id: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    description: 'Estratégias legais para otimização da carga tributária empresarial e pessoal, sempre em conformidade com a legislação.',
    category: 'tributario',
    href: '/services/planejamento-tributario',
    benefits: [
      {
        title: 'Redução Legal de Impostos',
        description: 'Estratégias para reduzir a carga tributária de forma lícita e segura.',
        icon: '💰'
      },
      {
        title: 'Conformidade Fiscal',
        description: 'Garantia de que todas as estratégias estão em conformidade com a lei.',
        icon: '📋'
      },
      {
        title: 'Economia Sustentável',
        description: 'Planejamento de longo prazo para otimização tributária contínua.',
        icon: '📈'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Diagnóstico Tributário',
        description: 'Análise completa da situação tributária atual do cliente.'
      },
      {
        step: 2,
        title: 'Identificação de Oportunidades',
        description: 'Mapeamento de possibilidades de otimização fiscal.'
      },
      {
        step: 3,
        title: 'Elaboração da Estratégia',
        description: 'Desenvolvimento de plano tributário personalizado.'
      },
      {
        step: 4,
        title: 'Implementação e Monitoramento',
        description: 'Execução das estratégias e acompanhamento contínuo.'
      }
    ],
    faq: [
      {
        question: 'O que é elisão fiscal?',
        answer: 'É o planejamento tributário realizado de forma lícita, antes da ocorrência do fato gerador, para reduzir a carga de impostos.'
      },
      {
        question: 'Quais são os riscos do planejamento tributário?',
        answer: 'Quando feito de forma adequada e legal, os riscos são mínimos. Por isso é importante contar com assessoria especializada.'
      }
    ],
    testimonials: [
      {
        name: 'Empresa ABC Ltda',
        quote: 'Conseguimos reduzir nossa carga tributária em 30% de forma totalmente legal.',
        image: ''
      }
    ]
  },
  // Direito Empresarial
  {
    id: 'constituicao-empresas',
    title: 'Constituição de Empresas',
    description: 'Assessoria completa na abertura e estruturação de empresas de todos os portes, desde MEI até grandes corporações.',
    category: 'empresarial',
    href: '/services/constituicao-empresas',
    benefits: [
      {
        title: 'Estrutura Adequada',
        description: 'Escolha do tipo societário mais adequado para seu negócio.',
        icon: '🏢'
      },
      {
        title: 'Agilidade no Processo',
        description: 'Abertura rápida e eficiente em todos os órgãos competentes.',
        icon: '⚡'
      },
      {
        title: 'Conformidade Legal',
        description: 'Garantia de que sua empresa nasce em total conformidade legal.',
        icon: '✅'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Consulta Estratégica',
        description: 'Definição do modelo de negócio e estrutura societária ideal.'
      },
      {
        step: 2,
        title: 'Documentação',
        description: 'Preparação de contrato social e demais documentos necessários.'
      },
      {
        step: 3,
        title: 'Registro',
        description: 'Protocolo nos órgãos competentes (Junta Comercial, Receita Federal, etc.).'
      },
      {
        step: 4,
        title: 'Finalização',
        description: 'Entrega de todos os documentos e orientações para funcionamento.'
      }
    ],
    faq: [
      {
        question: 'Quanto tempo demora para abrir uma empresa?',
        answer: 'O prazo varia de acordo com o tipo de empresa, mas geralmente leva de 15 a 30 dias.'
      },
      {
        question: 'Qual a diferença entre MEI, LTDA e SA?',
        answer: 'MEI é para faturamento até R$ 81.000/ano, LTDA para pequenas e médias empresas, e SA para grandes empresas ou abertura de capital.'
      }
    ],
    testimonials: [
      {
        name: 'João Empresário',
        quote: 'Processo muito rápido e eficiente. Em 20 dias minha empresa estava funcionando.',
        image: ''
      }
    ]
  },
  // Direito do Trabalho
  {
    id: 'assessoria-trabalhista',
    title: 'Assessoria Trabalhista',
    description: 'Consultoria preventiva e estratégica em relações trabalhistas para empresas e empregados.',
    category: 'trabalho',
    href: '/services/assessoria-trabalhista',
    benefits: [
      {
        title: 'Prevenção de Conflitos',
        description: 'Orientação preventiva para evitar problemas trabalhistas futuros.',
        icon: '🛡️'
      },
      {
        title: 'Conformidade Legal',
        description: 'Garantia de cumprimento de todas as obrigações trabalhistas.',
        icon: '📜'
      },
      {
        title: 'Redução de Passivos',
        description: 'Estratégias para minimizar riscos e passivos trabalhistas.',
        icon: '📉'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Diagnóstico',
        description: 'Análise da situação trabalhista atual da empresa.'
      },
      {
        step: 2,
        title: 'Identificação de Riscos',
        description: 'Mapeamento de possíveis problemas e irregularidades.'
      },
      {
        step: 3,
        title: 'Plano de Ação',
        description: 'Desenvolvimento de estratégias de correção e prevenção.'
      },
      {
        step: 4,
        title: 'Acompanhamento',
        description: 'Monitoramento contínuo e orientação em questões trabalhistas.'
      }
    ],
    faq: [
      {
        question: 'Quais são as principais obrigações trabalhistas?',
        answer: 'Registro em carteira, pagamento de salários, férias, 13º salário, FGTS, contribuições previdenciárias, entre outras.'
      },
      {
        question: 'Como evitar ações trabalhistas?',
        answer: 'Mantendo total conformidade com a legislação, registros adequados e políticas internas claras.'
      }
    ],
    testimonials: [
      {
        name: 'Empresa XYZ',
        quote: 'Desde que contratamos a assessoria, não tivemos mais problemas trabalhistas.',
        image: ''
      }
    ]
  }
];
