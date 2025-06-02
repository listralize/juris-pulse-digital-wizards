
import { SpecializedService } from '../types/adminTypes';

export const defaultSpecializedServices: SpecializedService[] = [
  // Direito de Família
  {
    id: 'divorcio',
    title: 'Divórcio e Separação',
    description: 'Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes.',
    category: 'familia',
    href: '/services/divorcio',
    icon: 'Heart'
  },
  {
    id: 'guarda-filhos',
    title: 'Guarda de Filhos',
    description: 'Defesa dos melhores interesses das crianças em disputas de guarda, visitação e regulamentação de convivência.',
    category: 'familia',
    href: '/services/guarda-filhos',
    icon: 'Users'
  },
  {
    id: 'pensao-alimenticia',
    title: 'Pensão Alimentícia',
    description: 'Ações de fixação, revisão e execução de pensão alimentícia para garantir o sustento adequado.',
    category: 'familia',
    href: '/services/pensao-alimenticia',
    icon: 'DollarSign'
  },
  {
    id: 'adocao',
    title: 'Adoção',
    description: 'Acompanhamento jurídico completo em processos de adoção nacional e internacional.',
    category: 'familia',
    href: '/services/adocao',
    icon: 'Home'
  },
  {
    id: 'uniao-estavel',
    title: 'União Estável',
    description: 'Reconhecimento, dissolução e regulamentação de direitos em união estável.',
    category: 'familia',
    href: '/services/uniao-estavel',
    icon: 'Heart'
  },

  // Direito Tributário
  {
    id: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    description: 'Estratégias legais para otimização da carga tributária empresarial e pessoal.',
    category: 'tributario',
    href: '/services/planejamento-tributario',
    icon: 'Calculator'
  },
  {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos Tributários',
    description: 'Recuperação de valores pagos indevidamente ao fisco através de ações específicas.',
    category: 'tributario',
    href: '/services/recuperacao-creditos',
    icon: 'RefreshCw'
  },
  {
    id: 'contencioso-tributario',
    title: 'Contencioso Tributário',
    description: 'Defesa em processos administrativos e judiciais tributários.',
    category: 'tributario',
    href: '/services/contencioso-tributario',
    icon: 'Scale'
  },
  {
    id: 'parcelamento-debitos',
    title: 'Parcelamento de Débitos',
    description: 'Negociação e formalização de parcelamentos fiscais favoráveis.',
    category: 'tributario',
    href: '/services/parcelamento-debitos',
    icon: 'Calendar'
  },
  {
    id: 'elisao-fiscal',
    title: 'Elisão Fiscal',
    description: 'Estratégias legais para redução lícita da carga tributária.',
    category: 'tributario',
    href: '/services/elisao-fiscal',
    icon: 'Shield'
  },

  // Direito Empresarial
  {
    id: 'constituicao-empresas',
    title: 'Constituição de Empresas',
    description: 'Assessoria completa na abertura e estruturação de empresas de todos os portes.',
    category: 'empresarial',
    href: '/services/constituicao-empresas',
    icon: 'Building2'
  },
  {
    id: 'contratos-empresariais',
    title: 'Contratos Empresariais',
    description: 'Elaboração e revisão de contratos comerciais, societários e de prestação de serviços.',
    category: 'empresarial',
    href: '/services/contratos-empresariais',
    icon: 'FileText'
  },
  {
    id: 'reestruturacao-societaria',
    title: 'Reestruturação Societária',
    description: 'Reorganização societária, fusões, aquisições e alterações contratuais.',
    category: 'empresarial',
    href: '/services/reestruturacao-societaria',
    icon: 'Shuffle'
  },
  {
    id: 'compliance-empresarial',
    title: 'Compliance Empresarial',
    description: 'Implementação de programas de conformidade e boas práticas corporativas.',
    category: 'empresarial',
    href: '/services/compliance-empresarial',
    icon: 'CheckCircle'
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual',
    description: 'Proteção de marcas, patentes e direitos autorais.',
    category: 'empresarial',
    href: '/services/propriedade-intelectual',
    icon: 'Copyright'
  },

  // Direito do Trabalho
  {
    id: 'assessoria-trabalhista',
    title: 'Assessoria Trabalhista',
    description: 'Consultoria preventiva e estratégica em relações trabalhistas.',
    category: 'trabalho',
    href: '/services/assessoria-trabalhista',
    icon: 'Users'
  },
  {
    id: 'contencioso-trabalhista',
    title: 'Contencioso Trabalhista',
    description: 'Defesa em ações trabalhistas e processos perante a Justiça do Trabalho.',
    category: 'trabalho',
    href: '/services/contencioso-trabalhista',
    icon: 'Gavel'
  },
  {
    id: 'compliance-trabalhista',
    title: 'Compliance Trabalhista',
    description: 'Adequação às normas trabalhistas e implementação de boas práticas.',
    category: 'trabalho',
    href: '/services/compliance-trabalhista',
    icon: 'CheckSquare'
  }
];
