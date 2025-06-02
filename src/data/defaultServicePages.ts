
import { ServicePage } from '../types/adminTypes';

export const defaultServicePages: ServicePage[] = [
  {
    id: 'familia-divorcio',
    title: 'Divórcio e Separação',
    description: 'Assessoria jurídica completa em processos de divórcio consensual e litigioso.',
    category: 'familia',
    href: '/servicos/divorcio-separacao',
    benefits: [
      {
        title: 'Assessoria Especializada',
        description: 'Orientação jurídica completa em todas as etapas do processo',
        icon: '⚖️'
      },
      {
        title: 'Proteção de Direitos',
        description: 'Defesa dos seus direitos patrimoniais e familiares',
        icon: '🛡️'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Consulta Inicial',
        description: 'Análise do caso e orientação sobre procedimentos'
      },
      {
        step: 2,
        title: 'Documentação',
        description: 'Preparação e organização de toda documentação necessária'
      }
    ],
    faq: [
      {
        question: 'Quanto tempo demora um processo de divórcio?',
        answer: 'O prazo varia conforme a complexidade do caso, podendo ser de 30 dias a alguns meses.'
      }
    ],
    testimonials: [
      {
        name: 'Maria Silva',
        text: 'Excelente atendimento durante todo o processo de divórcio.'
      }
    ]
  },
  {
    id: 'tributario-planejamento',
    title: 'Planejamento Tributário',
    description: 'Estratégias para otimização fiscal e redução da carga tributária.',
    category: 'tributario',
    href: '/servicos/planejamento-tributario',
    benefits: [
      {
        title: 'Redução de Impostos',
        description: 'Estratégias legais para diminuir a carga tributária',
        icon: '💰'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Análise Fiscal',
        description: 'Levantamento completo da situação tributária atual'
      }
    ],
    faq: [
      {
        question: 'Como funciona o planejamento tributário?',
        answer: 'É uma análise estratégica para encontrar alternativas legais de reduzir impostos.'
      }
    ],
    testimonials: [
      {
        name: 'João Santos',
        text: 'Consegui reduzir significativamente meus impostos com o planejamento.'
      }
    ]
  },
  {
    id: 'empresarial-constituicao',
    title: 'Constituição de Empresas',
    description: 'Assessoria completa na abertura e estruturação de empresas.',
    category: 'empresarial',
    href: '/servicos/constituicao-empresas',
    benefits: [
      {
        title: 'Processo Simplificado',
        description: 'Cuidamos de toda burocracia para você',
        icon: '📋'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Escolha do Tipo Societário',
        description: 'Definição da melhor estrutura para sua empresa'
      }
    ],
    faq: [
      {
        question: 'Qual o melhor tipo de empresa para abrir?',
        answer: 'Depende da atividade, faturamento e número de sócios. Fazemos essa análise.'
      }
    ],
    testimonials: [
      {
        name: 'Carlos Oliveira',
        text: 'Processo rápido e sem complicações para abrir minha empresa.'
      }
    ]
  },
  {
    id: 'trabalho-assessoria',
    title: 'Assessoria Trabalhista',
    description: 'Consultoria preventiva em relações trabalhistas.',
    category: 'trabalho',
    href: '/servicos/assessoria-trabalhista',
    benefits: [
      {
        title: 'Prevenção de Riscos',
        description: 'Evite problemas trabalhistas com consultoria preventiva',
        icon: '⚠️'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Diagnóstico',
        description: 'Análise das práticas trabalhistas da empresa'
      }
    ],
    faq: [
      {
        question: 'Como evitar processos trabalhistas?',
        answer: 'Com consultoria preventiva e adequação às normas trabalhistas.'
      }
    ],
    testimonials: [
      {
        name: 'Ana Costa',
        text: 'Consultoria excelente que evitou vários problemas trabalhistas.'
      }
    ]
  }
];
