
import { ServicePage } from '../types/adminTypes';

export const defaultServicePages: ServicePage[] = [
  // DIREITO DE FAMÍLIA (familia)
  {
    id: 'divorcio',
    title: 'Divórcio e Separação',
    description: 'Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes.',
    category: 'familia',
    href: '/services/divorcio',
    benefits: [
      { title: 'Orientação Especializada', description: 'Assessoria jurídica completa durante todo o processo.', icon: '⚖️' },
      { title: 'Proteção Patrimonial', description: 'Auxílio na divisão justa dos bens.', icon: '🏠' }
    ],
    process: [
      { step: 1, title: 'Consulta Inicial', description: 'Análise detalhada da situação conjugal.' },
      { step: 2, title: 'Documentação', description: 'Preparação de toda documentação necessária.' }
    ],
    faq: [
      { question: 'Quanto tempo demora um divórcio?', answer: 'Varia entre consensual (mais rápido) ou litigioso.' }
    ],
    testimonials: [
      { name: 'Maria Silva', quote: 'Processo conduzido com profissionalismo.', image: '' }
    ]
  },
  {
    id: 'guarda-filhos',
    title: 'Guarda de Filhos',
    description: 'Defesa dos melhores interesses das crianças em disputas de guarda e visitação.',
    category: 'familia',
    href: '/services/guarda-filhos',
    benefits: [{ title: 'Prioridade ao Bem-Estar', description: 'Focamos no melhor interesse da criança.', icon: '👶' }],
    process: [{ step: 1, title: 'Avaliação do Caso', description: 'Análise da situação familiar.' }],
    faq: [{ question: 'Diferença entre guarda compartilhada e unilateral?', answer: 'Compartilhada: ambos decidem. Unilateral: apenas um.' }],
    testimonials: [{ name: 'Ana Paula', quote: 'Consegui a guarda compartilhada dos meus filhos.', image: '' }]
  },
  {
    id: 'pensao-alimenticia',
    title: 'Pensão Alimentícia',
    description: 'Ações de cobrança, revisão e exoneração de pensão alimentícia.',
    category: 'familia',
    href: '/services/pensao-alimenticia',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'adocao',
    title: 'Adoção',
    description: 'Assessoria completa em processos de adoção nacional e internacional.',
    category: 'familia',
    href: '/services/adocao',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'inventario-partilha',
    title: 'Inventário e Partilha',
    description: 'Processos de inventário e partilha de bens em caso de falecimento.',
    category: 'familia',
    href: '/services/inventario-partilha',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'casamento-uniao',
    title: 'Casamento e União Estável',
    description: 'Regularização e reconhecimento de união estável e casamento.',
    category: 'familia',
    href: '/services/casamento-uniao',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'testamentos-sucessoes',
    title: 'Testamentos e Sucessões',
    description: 'Elaboração de testamentos e planejamento sucessório.',
    category: 'familia',
    href: '/services/testamentos-sucessoes',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'protecao-menores',
    title: 'Proteção de Menores',
    description: 'Defesa dos direitos de crianças e adolescentes.',
    category: 'familia',
    href: '/services/protecao-menores',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO TRIBUTÁRIO (tributario)
  {
    id: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    description: 'Estratégias legais para otimização da carga tributária empresarial e pessoal.',
    category: 'tributario',
    href: '/services/planejamento-tributario',
    benefits: [{ title: 'Redução Legal de Impostos', description: 'Estratégias para reduzir carga tributária.', icon: '💰' }],
    process: [{ step: 1, title: 'Diagnóstico Tributário', description: 'Análise da situação tributária atual.' }],
    faq: [{ question: 'O que é elisão fiscal?', answer: 'Planejamento tributário lícito antes do fato gerador.' }],
    testimonials: [{ name: 'Empresa ABC', quote: 'Reduzimos 30% da carga tributária.', image: '' }]
  },
  {
    id: 'contencioso-tributario',
    title: 'Contencioso Tributário',
    description: 'Defesa em processos administrativos e judiciais tributários.',
    category: 'tributario',
    href: '/services/contencioso-tributario',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos',
    description: 'Recuperação de créditos tributários pagos indevidamente.',
    category: 'tributario',
    href: '/services/recuperacao-creditos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'elisao-fiscal',
    title: 'Elisão Fiscal',
    description: 'Estratégias lícitas de economia tributária.',
    category: 'tributario',
    href: '/services/elisao-fiscal',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'auditoria-tributaria',
    title: 'Auditoria Tributária',
    description: 'Auditoria preventiva e corretiva de obrigações tributárias.',
    category: 'tributario',
    href: '/services/auditoria-tributaria',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'parcelamento-debitos',
    title: 'Parcelamento de Débitos',
    description: 'Negociação e parcelamento de débitos tributários.',
    category: 'tributario',
    href: '/services/parcelamento-debitos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'consultoria-impostos',
    title: 'Consultoria em Impostos',
    description: 'Consultoria especializada em todos os tipos de impostos.',
    category: 'tributario',
    href: '/services/consultoria-impostos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'compliance-tributario',
    title: 'Compliance Tributário',
    description: 'Implementação de programas de compliance tributário.',
    category: 'tributario',
    href: '/services/compliance-tributario',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO EMPRESARIAL (empresarial)
  {
    id: 'constituicao-empresas',
    title: 'Constituição de Empresas',
    description: 'Assessoria completa na abertura e estruturação de empresas.',
    category: 'empresarial',
    href: '/services/constituicao-empresas',
    benefits: [{ title: 'Estrutura Adequada', description: 'Escolha do tipo societário ideal.', icon: '🏢' }],
    process: [{ step: 1, title: 'Consulta Estratégica', description: 'Definição do modelo de negócio.' }],
    faq: [{ question: 'Quanto tempo para abrir empresa?', answer: 'Entre 15 a 30 dias.' }],
    testimonials: [{ name: 'João Empresário', quote: 'Em 20 dias minha empresa estava funcionando.', image: '' }]
  },
  {
    id: 'contratos-empresariais',
    title: 'Contratos Empresariais',
    description: 'Elaboração e revisão de contratos empresariais.',
    category: 'empresarial',
    href: '/services/contratos-empresariais',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'reestruturacao-societaria',
    title: 'Reestruturação Societária',
    description: 'Reorganização e reestruturação de sociedades empresárias.',
    category: 'empresarial',
    href: '/services/reestruturacao-societaria',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'fusoes-aquisicoes',
    title: 'Fusões e Aquisições',
    description: 'Assessoria em operações de M&A.',
    category: 'empresarial',
    href: '/services/fusoes-aquisicoes',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'compliance-empresarial',
    title: 'Compliance Empresarial',
    description: 'Implementação de programas de compliance.',
    category: 'empresarial',
    href: '/services/compliance-empresarial',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual',
    description: 'Proteção de marcas, patentes e direitos autorais.',
    category: 'empresarial',
    href: '/services/propriedade-intelectual',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'contencioso-empresarial',
    title: 'Contencioso Empresarial',
    description: 'Litígios empresariais e societários.',
    category: 'empresarial',
    href: '/services/contencioso-empresarial',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'governanca-corporativa',
    title: 'Governança Corporativa',
    description: 'Estruturação de governança corporativa.',
    category: 'empresarial',
    href: '/services/governanca-corporativa',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO DO TRABALHO (trabalho)
  {
    id: 'assessoria-trabalhista',
    title: 'Assessoria Trabalhista',
    description: 'Consultoria preventiva e estratégica em relações trabalhistas.',
    category: 'trabalho',
    href: '/services/assessoria-trabalhista',
    benefits: [{ title: 'Prevenção de Conflitos', description: 'Orientação preventiva.', icon: '🛡️' }],
    process: [{ step: 1, title: 'Diagnóstico', description: 'Análise da situação trabalhista.' }],
    faq: [{ question: 'Principais obrigações trabalhistas?', answer: 'Registro, salários, férias, 13º, FGTS.' }],
    testimonials: [{ name: 'Empresa XYZ', quote: 'Não tivemos mais problemas trabalhistas.', image: '' }]
  },
  {
    id: 'contencioso-trabalhista',
    title: 'Contencioso Trabalhista',
    description: 'Defesa em ações trabalhistas.',
    category: 'trabalho',
    href: '/services/contencioso-trabalhista',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'defesa-trabalhador',
    title: 'Defesa do Trabalhador',
    description: 'Defesa dos direitos dos trabalhadores.',
    category: 'trabalho',
    href: '/services/defesa-trabalhador',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'horas-extras',
    title: 'Horas Extras',
    description: 'Ações de cobrança de horas extras.',
    category: 'trabalho',
    href: '/services/horas-extras',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'adicional-insalubridade',
    title: 'Adicional de Insalubridade',
    description: 'Cobrança de adicional de insalubridade e periculosidade.',
    category: 'trabalho',
    href: '/services/adicional-insalubridade',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'assedio-moral-sexual',
    title: 'Assédio Moral e Sexual',
    description: 'Defesa contra assédio moral e sexual no trabalho.',
    category: 'trabalho',
    href: '/services/assedio-moral-sexual',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'acidentes-doencas',
    title: 'Acidentes e Doenças Ocupacionais',
    description: 'Ações por acidentes de trabalho e doenças ocupacionais.',
    category: 'trabalho',
    href: '/services/acidentes-doencas',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'verbas-rescissorias',
    title: 'Verbas Rescisórias',
    description: 'Cobrança de verbas rescisórias.',
    category: 'trabalho',
    href: '/services/verbas-rescissorias',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'reconhecimento-vinculo',
    title: 'Reconhecimento de Vínculo',
    description: 'Ações de reconhecimento de vínculo empregatício.',
    category: 'trabalho',
    href: '/services/reconhecimento-vinculo',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'compliance-trabalhista',
    title: 'Compliance Trabalhista',
    description: 'Implementação de compliance trabalhista.',
    category: 'trabalho',
    href: '/services/compliance-trabalhista',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO CONSTITUCIONAL (constitucional)
  {
    id: 'direitos-fundamentais',
    title: 'Direitos Fundamentais',
    description: 'Defesa de direitos fundamentais constitucionais.',
    category: 'constitucional',
    href: '/services/direitos-fundamentais',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'habeas-corpus',
    title: 'Habeas Corpus',
    description: 'Impetração de habeas corpus.',
    category: 'constitucional',
    href: '/services/habeas-corpus',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'mandado-seguranca',
    title: 'Mandado de Segurança',
    description: 'Impetração de mandados de segurança.',
    category: 'constitucional',
    href: '/services/mandado-seguranca',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'habeas-data',
    title: 'Habeas Data',
    description: 'Ações de habeas data para acesso a informações.',
    category: 'constitucional',
    href: '/services/habeas-data',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'mandado-injuncao',
    title: 'Mandado de Injunção',
    description: 'Mandado de injunção e ação popular.',
    category: 'constitucional',
    href: '/services/mandado-injuncao',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'adi-adc-adpf',
    title: 'ADI, ADC e ADPF',
    description: 'Ações de controle concentrado de constitucionalidade.',
    category: 'constitucional',
    href: '/services/adi-adc-adpf',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'liberdades-constitucionais',
    title: 'Liberdades Constitucionais',
    description: 'Defesa das liberdades constitucionais.',
    category: 'constitucional',
    href: '/services/liberdades-constitucionais',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'direitos-sociais',
    title: 'Direitos Sociais',
    description: 'Defesa de direitos sociais constitucionais.',
    category: 'constitucional',
    href: '/services/direitos-sociais',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO ADMINISTRATIVO (administrativo)
  {
    id: 'licitacoes-contratos',
    title: 'Licitações e Contratos',
    description: 'Assessoria em licitações e contratos administrativos.',
    category: 'administrativo',
    href: '/services/licitacoes-contratos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'processos-administrativos',
    title: 'Processos Administrativos',
    description: 'Defesa em processos administrativos.',
    category: 'administrativo',
    href: '/services/processos-administrativos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'servidores-publicos',
    title: 'Direitos de Servidores Públicos',
    description: 'Defesa dos direitos de servidores públicos.',
    category: 'administrativo',
    href: '/services/servidores-publicos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'concursos-publicos',
    title: 'Concursos Públicos',
    description: 'Assessoria em concursos públicos.',
    category: 'administrativo',
    href: '/services/concursos-publicos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'responsabilidade-estado',
    title: 'Responsabilidade do Estado',
    description: 'Ações de responsabilidade civil do Estado.',
    category: 'administrativo',
    href: '/services/responsabilidade-estado',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'desapropriacao',
    title: 'Desapropriação',
    description: 'Ações de desapropriação e indenização.',
    category: 'administrativo',
    href: '/services/desapropriacao',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'improbidade-administrativa',
    title: 'Improbidade Administrativa',
    description: 'Defesa em ações de improbidade administrativa.',
    category: 'administrativo',
    href: '/services/improbidade-administrativa',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'regulacao-fiscalizacao',
    title: 'Regulação e Fiscalização',
    description: 'Assessoria em regulação e fiscalização.',
    category: 'administrativo',
    href: '/services/regulacao-fiscalizacao',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO PREVIDENCIÁRIO (previdenciario)
  {
    id: 'aposentadoria-idade',
    title: 'Aposentadoria por Idade',
    description: 'Concessão e revisão de aposentadoria por idade.',
    category: 'previdenciario',
    href: '/services/aposentadoria-idade',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'aposentadoria-tempo-contribuicao',
    title: 'Aposentadoria por Tempo de Contribuição',
    description: 'Aposentadoria por tempo de contribuição.',
    category: 'previdenciario',
    href: '/services/aposentadoria-tempo-contribuicao',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'aposentadoria-especial',
    title: 'Aposentadoria Especial',
    description: 'Aposentadoria especial para atividades insalubres.',
    category: 'previdenciario',
    href: '/services/aposentadoria-especial',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'aposentadoria-invalidez',
    title: 'Aposentadoria por Invalidez',
    description: 'Aposentadoria por invalidez permanente.',
    category: 'previdenciario',
    href: '/services/aposentadoria-invalidez',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'auxilio-doenca',
    title: 'Auxílio-Doença',
    description: 'Concessão e manutenção de auxílio-doença.',
    category: 'previdenciario',
    href: '/services/auxilio-doenca',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'auxilio-acidente',
    title: 'Auxílio-Acidente',
    description: 'Concessão de auxílio-acidente.',
    category: 'previdenciario',
    href: '/services/auxilio-acidente',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'pensao-morte',
    title: 'Pensão por Morte',
    description: 'Concessão de pensão por morte.',
    category: 'previdenciario',
    href: '/services/pensao-morte',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'salario-maternidade',
    title: 'Salário-Maternidade',
    description: 'Concessão de salário-maternidade.',
    category: 'previdenciario',
    href: '/services/salario-maternidade',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'bpc',
    title: 'BPC (Benefício de Prestação Continuada)',
    description: 'Concessão do Benefício de Prestação Continuada.',
    category: 'previdenciario',
    href: '/services/bpc',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'revisao-vida-toda',
    title: 'Revisão da Vida Toda',
    description: 'Revisão de benefícios previdenciários.',
    category: 'previdenciario',
    href: '/services/revisao-vida-toda',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'planejamento-previdenciario',
    title: 'Planejamento Previdenciário',
    description: 'Planejamento para aposentadoria e benefícios.',
    category: 'previdenciario',
    href: '/services/planejamento-previdenciario',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO DO CONSUMIDOR (consumidor)
  {
    id: 'direitos-consumidor',
    title: 'Direitos do Consumidor',
    description: 'Defesa dos direitos básicos do consumidor.',
    category: 'consumidor',
    href: '/services/direitos-consumidor',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'praticas-abusivas',
    title: 'Práticas Abusivas',
    description: 'Combate a práticas abusivas contra consumidores.',
    category: 'consumidor',
    href: '/services/praticas-abusivas',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'publicidade-enganosa',
    title: 'Publicidade Enganosa',
    description: 'Ações contra publicidade enganosa e abusiva.',
    category: 'consumidor',
    href: '/services/publicidade-enganosa',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'responsabilidade-produtos',
    title: 'Responsabilidade por Produtos',
    description: 'Responsabilidade por defeitos em produtos e serviços.',
    category: 'consumidor',
    href: '/services/responsabilidade-produtos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'contratos-consumo',
    title: 'Contratos de Consumo',
    description: 'Revisão e defesa em contratos de consumo.',
    category: 'consumidor',
    href: '/services/contratos-consumo',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'recalls-seguranca',
    title: 'Recalls e Segurança',
    description: 'Ações relacionadas a recalls e segurança de produtos.',
    category: 'consumidor',
    href: '/services/recalls-seguranca',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'defesa-coletiva',
    title: 'Defesa Coletiva',
    description: 'Ações coletivas de defesa do consumidor.',
    category: 'consumidor',
    href: '/services/defesa-coletiva',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },

  // DIREITO CIVIL (civil)
  {
    id: 'indenizacao-danos',
    title: 'Indenização por Danos',
    description: 'Ações de indenização por danos materiais e morais.',
    category: 'civil',
    href: '/services/indenizacao-danos',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'rescisao-contratual',
    title: 'Rescisão Contratual',
    description: 'Ações de rescisão e revisão de contratos.',
    category: 'civil',
    href: '/services/rescisao-contratual',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  },
  {
    id: 'responsabilidade-civil',
    title: 'Responsabilidade Civil',
    description: 'Ações de responsabilidade civil em geral.',
    category: 'civil',
    href: '/services/responsabilidade-civil',
    benefits: [],
    process: [],
    faq: [],
    testimonials: []
  }
];
