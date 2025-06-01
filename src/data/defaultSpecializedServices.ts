
import { SpecializedService } from '../types/adminTypes';

export const defaultSpecializedServices: SpecializedService[] = [
  // Direito de Família
  {
    id: 'divorcio',
    title: 'Divórcio e Separação',
    description: 'Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes.',
    category: 'familia',
    href: '/services/divorcio',
    mainDescription: 'Oferecemos assessoria jurídica completa em processos de divórcio, seja consensual ou litigioso. Nossa equipe está preparada para conduzir seu caso com discrição, agilidade e sempre buscando a melhor solução para todas as partes envolvidas, especialmente quando há filhos menores.'
  },
  {
    id: 'guarda-filhos',
    title: 'Guarda de Filhos',
    description: 'Defesa dos melhores interesses das crianças em disputas de guarda, visitação e regulamentação de convivência.',
    category: 'familia',
    href: '/services/guarda-filhos',
    mainDescription: 'A guarda dos filhos é uma das questões mais sensíveis do Direito de Família. Trabalhamos sempre priorizando o melhor interesse da criança, buscando soluções que preservem os vínculos familiares e garantam o desenvolvimento saudável dos menores.'
  },
  {
    id: 'pensao-alimenticia',
    title: 'Pensão Alimentícia',
    description: 'Ações de fixação, revisão e execução de pensão alimentícia para garantir o sustento adequado.',
    category: 'familia',
    href: '/services/pensao-alimenticia',
    mainDescription: 'A pensão alimentícia é um direito fundamental que visa garantir o sustento digno. Atuamos em ações de fixação, revisão e execução de alimentos, sempre buscando valores justos e condizentes com a realidade financeira das partes.'
  },
  {
    id: 'adocao',
    title: 'Adoção',
    description: 'Acompanhamento jurídico completo em processos de adoção nacional e internacional.',
    category: 'familia',
    href: '/services/adocao',
    mainDescription: 'O processo de adoção requer cuidado especial e conhecimento técnico. Oferecemos assessoria completa para famílias que desejam adotar, garantindo que todos os requisitos legais sejam cumpridos de forma ágil e segura.'
  },
  {
    id: 'uniao-estavel',
    title: 'União Estável',
    description: 'Reconhecimento, dissolução e regulamentação de direitos em união estável.',
    category: 'familia',
    href: '/services/uniao-estavel',
    mainDescription: 'A união estável possui os mesmos direitos do casamento civil. Auxiliamos no reconhecimento, formalização, dissolução e partilha de bens em união estável, sempre protegendo os direitos de nossos clientes.'
  },

  // Direito Tributário
  {
    id: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    description: 'Estratégias legais para otimização da carga tributária empresarial e pessoal.',
    category: 'tributario',
    href: '/services/planejamento-tributario',
    mainDescription: 'O planejamento tributário é fundamental para a saúde financeira de empresas e pessoas físicas. Desenvolvemos estratégias legais personalizadas para reduzir a carga tributária, sempre em conformidade com a legislação vigente.'
  },
  {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos Tributários',
    description: 'Recuperação de valores pagos indevidamente ao fisco através de ações específicas.',
    category: 'tributario',
    href: '/services/recuperacao-creditos',
    mainDescription: 'Muitas empresas pagam tributos em valor superior ao devido. Analisamos sua situação tributária para identificar créditos a serem recuperados, promovendo a restituição ou compensação dos valores pagos indevidamente.'
  },
  {
    id: 'contencioso-tributario',
    title: 'Contencioso Tributário',
    description: 'Defesa em processos administrativos e judiciais tributários.',
    category: 'tributario',
    href: '/services/contencioso-tributario',
    mainDescription: 'Atuamos na defesa de contribuintes em processos administrativos e judiciais tributários, contestando autuações fiscais, multas e exigências indevidas dos órgãos fazendários em todas as esferas.'
  },
  {
    id: 'parcelamento-debitos',
    title: 'Parcelamento de Débitos',
    description: 'Negociação e formalização de parcelamentos fiscais favoráveis.',
    category: 'tributario',
    href: '/services/parcelamento-debitos',
    mainDescription: 'Auxiliamos empresas e pessoas físicas na negociação de parcelamentos fiscais, buscando sempre as melhores condições disponíveis e orientando sobre os benefícios dos programas de regularização fiscal.'
  },
  {
    id: 'elisao-fiscal',
    title: 'Elisão Fiscal',
    description: 'Estratégias legais para redução lícita da carga tributária.',
    category: 'tributario',
    href: '/services/elisao-fiscal',
    mainDescription: 'A elisão fiscal consiste na utilização de meios legais para reduzir a carga tributária. Desenvolvemos estratégias personalizadas e seguras para otimizar a tributação de nossos clientes.'
  },

  // Direito Empresarial
  {
    id: 'constituicao-empresas',
    title: 'Constituição de Empresas',
    description: 'Assessoria completa na abertura e estruturação de empresas de todos os portes.',
    category: 'empresarial',
    href: '/services/constituicao-empresas',
    mainDescription: 'A constituição de uma empresa requer planejamento estratégico. Oferecemos assessoria completa desde a escolha do tipo societário mais adequado até a formalização junto aos órgãos competentes.'
  },
  {
    id: 'contratos-empresariais',
    title: 'Contratos Empresariais',
    description: 'Elaboração e revisão de contratos comerciais, societários e de prestação de serviços.',
    category: 'empresarial',
    href: '/services/contratos-empresariais',
    mainDescription: 'Contratos bem elaborados são essenciais para o sucesso empresarial. Elaboramos e revisamos contratos comerciais, societários, de prestação de serviços e demais instrumentos contratuais empresariais.'
  },
  {
    id: 'reestruturacao-societaria',
    title: 'Reestruturação Societária',
    description: 'Reorganização societária, fusões, aquisições e alterações contratuais.',
    category: 'empresarial',
    href: '/services/reestruturacao-societaria',
    mainDescription: 'Auxiliamos empresas em processos de reestruturação societária, incluindo alterações contratuais, entrada e saída de sócios, fusões, incorporações e demais reorganizações empresariais.'
  },
  {
    id: 'compliance-empresarial',
    title: 'Compliance Empresarial',
    description: 'Implementação de programas de conformidade e boas práticas corporativas.',
    category: 'empresarial',
    href: '/services/compliance-empresarial',
    mainDescription: 'O compliance empresarial é fundamental para mitigar riscos e garantir a conformidade legal. Desenvolvemos programas de integridade personalizados e implementamos práticas de governança corporativa.'
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual',
    description: 'Proteção de marcas, patentes e direitos autorais.',
    category: 'empresarial',
    href: '/services/propriedade-intelectual',
    mainDescription: 'A proteção da propriedade intelectual é crucial para preservar ativos intangíveis. Atuamos no registro de marcas, patentes, proteção de direitos autorais e defesa contra violações.'
  },

  // Direito do Trabalho
  {
    id: 'assessoria-trabalhista',
    title: 'Assessoria Trabalhista',
    description: 'Consultoria preventiva e estratégica em relações trabalhistas.',
    category: 'trabalho',
    href: '/services/assessoria-trabalhista',
    mainDescription: 'Oferecemos assessoria trabalhista completa para empresas, incluindo consultoria preventiva, elaboração de políticas internas, orientação sobre legislação trabalhista e estratégias para redução de passivos.'
  },
  {
    id: 'contencioso-trabalhista',
    title: 'Contencioso Trabalhista',
    description: 'Defesa em ações trabalhistas e processos perante a Justiça do Trabalho.',
    category: 'trabalho',
    href: '/services/contencioso-trabalhista',
    mainDescription: 'Atuamos na defesa de empresas e empregados em ações trabalhistas, buscando sempre soluções eficientes e estratégicas para resolução de conflitos laborais.'
  },
  {
    id: 'compliance-trabalhista',
    title: 'Compliance Trabalhista',
    description: 'Adequação às normas trabalhistas e implementação de boas práticas.',
    category: 'trabalho',
    href: '/services/compliance-trabalhista',
    mainDescription: 'O compliance trabalhista envolve a adequação às normas trabalhistas vigentes. Auxiliamos empresas na implementação de práticas que garantam conformidade e reduzam riscos trabalhistas.'
  }
];
