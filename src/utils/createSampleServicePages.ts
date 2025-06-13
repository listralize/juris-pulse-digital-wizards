
import { ServicePage } from '../types/adminTypes';

export const createSampleServicePages = (): ServicePage[] => {
  return [
    {
      id: 'empresarial-compliance',
      title: 'Compliance Empresarial',
      description: 'Desenvolvimento e implementação de programas de integridade e conformidade com as legislações aplicáveis.',
      category: 'empresarial',
      href: '/servicos/compliance-empresarial',
      benefits: [
        {
          title: 'Prevenção de Riscos',
          description: 'Identificação e mitigação de riscos legais, regulatórios e reputacionais.'
        },
        {
          title: 'Conformidade Regulatória',
          description: 'Garantia de cumprimento de leis anticorrupção, LGPD e normas setoriais.'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Assessment de Riscos',
          description: 'Mapeamento completo dos riscos de compliance específicos do negócio.'
        },
        {
          step: 2,
          title: 'Desenvolvimento do Programa',
          description: 'Criação de programa de compliance customizado com políticas e procedimentos.'
        }
      ],
      faq: [
        {
          question: 'O que é um programa de compliance?',
          answer: 'É um conjunto estruturado de políticas, procedimentos e controles para garantir conformidade legal e ética.'
        }
      ],
      testimonials: [
        {
          name: 'Empresa Multinacional',
          text: 'O programa de compliance nos protegeu em uma investigação regulatória.'
        }
      ]
    },
    {
      id: 'empresarial-contratos',
      title: 'Contratos Empresariais',
      description: 'Elaboração, revisão e negociação de contratos empresariais de todos os tipos.',
      category: 'empresarial',
      href: '/servicos/contratos-empresariais',
      benefits: [
        {
          title: 'Segurança Jurídica',
          description: 'Contratos elaborados com total segurança jurídica e proteção aos seus interesses.'
        },
        {
          title: 'Redução de Riscos',
          description: 'Identificação e mitigação de riscos contratuais antes da assinatura.'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise de Necessidades',
          description: 'Entendimento detalhado das necessidades e objetivos contratuais.'
        },
        {
          step: 2,
          title: 'Elaboração do Contrato',
          description: 'Redação personalizada do contrato com cláusulas específicas.'
        }
      ],
      faq: [
        {
          question: 'Que tipos de contratos vocês elaboram?',
          answer: 'Elaboramos todos os tipos de contratos empresariais, desde fornecimento até parcerias estratégicas.'
        }
      ],
      testimonials: [
        {
          name: 'CEO Startup Tech',
          text: 'Contratos impecáveis que nos deram total segurança na expansão.'
        }
      ]
    },
    {
      id: 'familia-divorcio',
      title: 'Divórcio e Separação',
      description: 'Assessoria completa em processos de divórcio consensual e litigioso.',
      category: 'familia',
      href: '/servicos/divorcio-separacao',
      benefits: [
        {
          title: 'Processo Ágil',
          description: 'Agilidade na tramitação com foco na resolução rápida e eficiente.'
        },
        {
          title: 'Proteção dos Direitos',
          description: 'Garantia de proteção de todos os seus direitos e interesses.'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Consulta Inicial',
          description: 'Análise da situação e orientação sobre os procedimentos.'
        },
        {
          step: 2,
          title: 'Documentação',
          description: 'Preparação de toda documentação necessária para o processo.'
        }
      ],
      faq: [
        {
          question: 'Quanto tempo demora um divórcio?',
          answer: 'O tempo varia dependendo se é consensual ou litigioso, mas trabalhamos para máxima agilidade.'
        }
      ],
      testimonials: [
        {
          name: 'Cliente Satisfeita',
          text: 'Processo rápido e respeitoso, com total proteção dos meus direitos.'
        }
      ]
    },
    {
      id: 'tributario-planejamento',
      title: 'Planejamento Tributário',
      description: 'Estratégias de otimização tributária para pessoas físicas e jurídicas.',
      category: 'tributario',
      href: '/servicos/planejamento-tributario',
      benefits: [
        {
          title: 'Redução de Impostos',
          description: 'Estratégias legais para redução da carga tributária.'
        },
        {
          title: 'Conformidade Fiscal',
          description: 'Garantia de cumprimento das obrigações fiscais.'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Diagnóstico Tributário',
          description: 'Análise completa da situação tributária atual.'
        },
        {
          step: 2,
          title: 'Elaboração da Estratégia',
          description: 'Desenvolvimento de estratégia personalizada de otimização.'
        }
      ],
      faq: [
        {
          question: 'O planejamento tributário é legal?',
          answer: 'Sim, utilizamos apenas estratégias legais e reconhecidas pela legislação.'
        }
      ],
      testimonials: [
        {
          name: 'Empresário Local',
          text: 'Conseguimos reduzir significativamente nossa carga tributária de forma legal.'
        }
      ]
    }
  ];
};
