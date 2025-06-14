
import { ServicePage } from '../../../types/adminTypes';

export const createEmpresarialServicePages = (): ServicePage[] => {
  return [
    {
      id: 'empresarial-constituicao',
      title: 'Constituição de Empresas',
      description: 'Abertura de empresas com assessoria completa.',
      category: 'empresarial',
      href: '/servicos/constituicao-empresas',
      benefits: [
        {
          title: 'Processo Ágil',
          description: 'Abertura rápida e sem complicações.',
          icon: '🚀'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Escolha do Tipo Societário',
          description: 'Definição da melhor estrutura empresarial.'
        }
      ],
      faq: [
        {
          question: 'Qual o prazo para abrir uma empresa?',
          answer: 'Entre 5 a 15 dias úteis dependendo do tipo.'
        }
      ],
      testimonials: [
        {
          name: 'Empreendedor João',
          text: 'Empresa aberta em tempo recorde.'
        }
      ]
    },
    {
      id: 'empresarial-contratos',
      title: 'Contratos Empresariais',
      description: 'Elaboração e revisão de contratos empresariais.',
      category: 'empresarial',
      href: '/servicos/contratos-empresariais',
      benefits: [
        {
          title: 'Segurança Jurídica',
          description: 'Contratos bem elaborados protegem seu negócio.',
          icon: '📄'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise das Necessidades',
          description: 'Entendimento do negócio e objetivos.'
        }
      ],
      faq: [
        {
          question: 'Que tipos de contratos vocês elaboram?',
          answer: 'Fornecimento, prestação de serviços, parceria, etc.'
        }
      ],
      testimonials: [
        {
          name: 'Empresa ABC',
          text: 'Contratos elaborados com excelência.'
        }
      ]
    },
    {
      id: 'empresarial-fusoes-aquisicoes',
      title: 'Fusões e Aquisições',
      description: 'Assessoria em operações de M&A.',
      category: 'empresarial',
      href: '/servicos/fusoes-aquisicoes',
      benefits: [
        {
          title: 'Due Diligence Completa',
          description: 'Análise detalhada antes da operação.',
          icon: '🔍'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Estruturação da Operação',
          description: 'Definição da melhor estratégia para M&A.'
        }
      ],
      faq: [
        {
          question: 'O que é due diligence?',
          answer: 'Auditoria jurídica prévia à aquisição.'
        }
      ],
      testimonials: [
        {
          name: 'Grupo XYZ',
          text: 'Aquisição realizada sem surpresas.'
        }
      ]
    },
    {
      id: 'empresarial-recuperacao-judicial',
      title: 'Recuperação Judicial',
      description: 'Assessoria em processos de recuperação judicial.',
      category: 'empresarial',
      href: '/servicos/recuperacao-judicial',
      benefits: [
        {
          title: 'Preservação da Empresa',
          description: 'Manutenção da atividade econômica.',
          icon: '🔄'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise de Viabilidade',
          description: 'Estudo da situação financeira da empresa.'
        }
      ],
      faq: [
        {
          question: 'Quando procurar a recuperação judicial?',
          answer: 'Quando há dificuldades financeiras temporárias.'
        }
      ],
      testimonials: [
        {
          name: 'Indústria DEF',
          text: 'Empresa recuperada e em funcionamento.'
        }
      ]
    },
    {
      id: 'empresarial-compliance',
      title: 'Compliance Empresarial',
      description: 'Implementação de programas de compliance.',
      category: 'empresarial',
      href: '/servicos/compliance-empresarial',
      benefits: [
        {
          title: 'Prevenção de Riscos',
          description: 'Redução de riscos legais e reputacionais.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Diagnóstico Organizacional',
          description: 'Mapeamento dos riscos da empresa.'
        }
      ],
      faq: [
        {
          question: 'O que é compliance?',
          answer: 'Conformidade com leis, regulamentos e políticas.'
        }
      ],
      testimonials: [
        {
          name: 'Corporação GHI',
          text: 'Programa de compliance implementado com sucesso.'
        }
      ]
    },
    {
      id: 'empresarial-propriedade-intelectual',
      title: 'Propriedade Intelectual',
      description: 'Registro e proteção de marcas e patentes.',
      category: 'empresarial',
      href: '/servicos/propriedade-intelectual',
      benefits: [
        {
          title: 'Proteção de Ativos',
          description: 'Proteção do patrimônio intelectual da empresa.',
          icon: '©️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Pesquisa de Anterioridade',
          description: 'Verificação da disponibilidade da marca.'
        }
      ],
      faq: [
        {
          question: 'Quanto tempo demora o registro de marca?',
          answer: 'Entre 12 a 18 meses em média.'
        }
      ],
      testimonials: [
        {
          name: 'Startup JKL',
          text: 'Marca registrada e protegida.'
        }
      ]
    },
    {
      id: 'empresarial-holding',
      title: 'Estruturação de Holdings',
      description: 'Criação de estruturas de holding empresarial.',
      category: 'empresarial',
      href: '/servicos/estruturacao-holdings',
      benefits: [
        {
          title: 'Otimização Fiscal',
          description: 'Benefícios tributários e sucessórios.',
          icon: '🏢'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Patrimonial',
          description: 'Estudo do patrimônio a ser organizado.'
        }
      ],
      faq: [
        {
          question: 'Quais as vantagens de uma holding?',
          answer: 'Proteção patrimonial, otimização fiscal e sucessória.'
        }
      ],
      testimonials: [
        {
          name: 'Família Empresária',
          text: 'Holding estruturada conforme planejado.'
        }
      ]
    },
    {
      id: 'empresarial-falencia',
      title: 'Falência e Liquidação',
      description: 'Assessoria em processos falimentares.',
      category: 'empresarial',
      href: '/servicos/falencia-liquidacao',
      benefits: [
        {
          title: 'Minimização de Perdas',
          description: 'Redução dos prejuízos no encerramento.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Avaliação da Situação',
          description: 'Análise da viabilidade da recuperação.'
        }
      ],
      faq: [
        {
          question: 'Diferença entre falência e recuperação?',
          answer: 'Falência encerra a empresa, recuperação a preserva.'
        }
      ],
      testimonials: [
        {
          name: 'Ex-sócio MNO',
          text: 'Processo conduzido de forma transparente.'
        }
      ]
    },
    {
      id: 'empresarial-joint-ventures',
      title: 'Joint Ventures',
      description: 'Estruturação de parcerias estratégicas.',
      category: 'empresarial',
      href: '/servicos/joint-ventures',
      benefits: [
        {
          title: 'Parcerias Estratégicas',
          description: 'Estruturação de alianças empresariais.',
          icon: '🤝'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Definição dos Objetivos',
          description: 'Alinhamento dos interesses das partes.'
        }
      ],
      faq: [
        {
          question: 'O que é uma joint venture?',
          answer: 'Associação de empresas para projeto específico.'
        }
      ],
      testimonials: [
        {
          name: 'Parceiros PQR',
          text: 'Joint venture estruturada com sucesso.'
        }
      ]
    },
    {
      id: 'empresarial-governanca-corporativa',
      title: 'Governança Corporativa',
      description: 'Implementação de boas práticas de governança.',
      category: 'empresarial',
      href: '/servicos/governanca-corporativa',
      benefits: [
        {
          title: 'Gestão Profissional',
          description: 'Melhores práticas de gestão empresarial.',
          icon: '📊'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Diagnóstico Atual',
          description: 'Avaliação das práticas existentes.'
        }
      ],
      faq: [
        {
          question: 'O que é governança corporativa?',
          answer: 'Sistema de direção e controle das empresas.'
        }
      ],
      testimonials: [
        {
          name: 'Conselho STU',
          text: 'Governança implementada com excelência.'
        }
      ]
    },
    {
      id: 'empresarial-reestruturacao',
      title: 'Reestruturação Societária',
      description: 'Reorganização de estruturas empresariais.',
      category: 'empresarial',
      href: '/servicos/reestruturacao-societaria',
      benefits: [
        {
          title: 'Otimização Estrutural',
          description: 'Estrutura mais eficiente para o negócio.',
          icon: '🔄'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Estrutura Atual',
          description: 'Mapeamento da organização societária.'
        }
      ],
      faq: [
        {
          question: 'Quando reestruturar a empresa?',
          answer: 'Quando a estrutura atual não atende mais os objetivos.'
        }
      ],
      testimonials: [
        {
          name: 'Grupo VWX',
          text: 'Reestruturação trouxe maior eficiência.'
        }
      ]
    },
    {
      id: 'empresarial-planejamento-sucessorio',
      title: 'Planejamento Sucessório',
      description: 'Organização da sucessão empresarial familiar.',
      category: 'empresarial',
      href: '/servicos/planejamento-sucessorio',
      benefits: [
        {
          title: 'Continuidade do Negócio',
          description: 'Garantia da perpetuação empresarial.',
          icon: '👥'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Mapeamento Familiar',
          description: 'Identificação dos sucessores potenciais.'
        }
      ],
      faq: [
        {
          question: 'Quando iniciar o planejamento sucessório?',
          answer: 'O quanto antes, preferencialmente na maturidade da empresa.'
        }
      ],
      testimonials: [
        {
          name: 'Família Empresária YZ',
          text: 'Sucessão organizada para próximas gerações.'
        }
      ]
    }
  ];
};
