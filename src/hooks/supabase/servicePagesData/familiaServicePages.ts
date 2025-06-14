
import { ServicePage } from '../../../types/adminTypes';

export const createFamiliaServicePages = (): ServicePage[] => {
  return [
    {
      id: 'familia-divorcio',
      title: 'Divórcio e Separação',
      description: 'Orientação completa em processos de divórcio consensual e litigioso.',
      category: 'familia',
      href: '/servicos/divorcio-separacao',
      benefits: [
        {
          title: 'Processo Ágil',
          description: 'Divórcio rápido e sem complicações.',
          icon: '⚡'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Situação',
          description: 'Avaliação do caso e documentos necessários.'
        }
      ],
      faq: [
        {
          question: 'Quanto tempo demora um divórcio?',
          answer: 'Varia de 30 dias (consensual) a 6 meses (litigioso).'
        }
      ],
      testimonials: [
        {
          name: 'Ana Silva',
          text: 'Processo tranquilo e rápido.'
        }
      ]
    },
    {
      id: 'familia-guarda',
      title: 'Guarda de Filhos',
      description: 'Defesa dos direitos dos pais e proteção do melhor interesse da criança.',
      category: 'familia',
      href: '/servicos/guarda-filhos',
      benefits: [
        {
          title: 'Proteção dos Filhos',
          description: 'Garantia do melhor interesse da criança.',
          icon: '👶'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Avaliação do Caso',
          description: 'Análise da situação familiar e documentação.'
        }
      ],
      faq: [
        {
          question: 'Que tipo de guarda existe?',
          answer: 'Unilateral, compartilhada e alternada.'
        }
      ],
      testimonials: [
        {
          name: 'Carlos Santos',
          text: 'Consegui a guarda compartilhada dos meus filhos.'
        }
      ]
    },
    {
      id: 'familia-pensao',
      title: 'Pensão Alimentícia',
      description: 'Cálculo, revisão e execução de pensão alimentícia.',
      category: 'familia',
      href: '/servicos/pensao-alimenticia',
      benefits: [
        {
          title: 'Cálculo Justo',
          description: 'Valor adequado às necessidades e possibilidades.',
          icon: '💰'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Financeira',
          description: 'Levantamento da capacidade financeira das partes.'
        }
      ],
      faq: [
        {
          question: 'Como é calculada a pensão?',
          answer: 'Baseada nas necessidades do filho e capacidade do genitor.'
        }
      ],
      testimonials: [
        {
          name: 'Maria Oliveira',
          text: 'Valor justo estabelecido para meu filho.'
        }
      ]
    },
    {
      id: 'familia-adocao',
      title: 'Adoção',
      description: 'Assessoria completa em processos de adoção nacional e internacional.',
      category: 'familia',
      href: '/servicos/adocao',
      benefits: [
        {
          title: 'Suporte Completo',
          description: 'Acompanhamento em todas as etapas do processo.',
          icon: '❤️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Preparação dos Documentos',
          description: 'Organização da documentação necessária.'
        }
      ],
      faq: [
        {
          question: 'Quanto tempo demora uma adoção?',
          answer: 'Varia de 1 a 3 anos dependendo do perfil desejado.'
        }
      ],
      testimonials: [
        {
          name: 'João e Maria',
          text: 'Realizamos o sonho de ser pais.'
        }
      ]
    },
    {
      id: 'familia-reconhecimento-paternidade',
      title: 'Reconhecimento de Paternidade',
      description: 'Ações de investigação e reconhecimento de paternidade.',
      category: 'familia',
      href: '/servicos/reconhecimento-paternidade',
      benefits: [
        {
          title: 'Direitos Garantidos',
          description: 'Asseguração dos direitos da criança.',
          icon: '👨‍👧‍👦'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Coleta de Provas',
          description: 'Reunião de evidências para o processo.'
        }
      ],
      faq: [
        {
          question: 'É necessário exame de DNA?',
          answer: 'Sim, na maioria dos casos é solicitado pelo juiz.'
        }
      ],
      testimonials: [
        {
          name: 'Patricia Lima',
          text: 'Meu filho conseguiu o reconhecimento paterno.'
        }
      ]
    },
    {
      id: 'familia-uniao-estavel',
      title: 'União Estável',
      description: 'Reconhecimento e dissolução de união estável.',
      category: 'familia',
      href: '/servicos/uniao-estavel',
      benefits: [
        {
          title: 'Proteção Jurídica',
          description: 'Garantia de direitos patrimoniais e sucessórios.',
          icon: '💍'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Comprovação da União',
          description: 'Reunião de provas da convivência.'
        }
      ],
      faq: [
        {
          question: 'Qual o prazo mínimo para união estável?',
          answer: 'Não há prazo mínimo legal estabelecido.'
        }
      ],
      testimonials: [
        {
          name: 'Roberto Silva',
          text: 'União formalizada sem complicações.'
        }
      ]
    },
    {
      id: 'familia-inventario',
      title: 'Inventário e Partilha',
      description: 'Assessoria em inventários e partilha de bens.',
      category: 'familia',
      href: '/servicos/inventario-partilha',
      benefits: [
        {
          title: 'Partilha Justa',
          description: 'Distribuição equitativa dos bens.',
          icon: '🏠'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Levantamento Patrimonial',
          description: 'Identificação e avaliação dos bens.'
        }
      ],
      faq: [
        {
          question: 'Prazo para fazer inventário?',
          answer: 'Até 60 dias após o óbito, prorrogável.'
        }
      ],
      testimonials: [
        {
          name: 'Família Santos',
          text: 'Inventário concluído rapidamente.'
        }
      ]
    },
    {
      id: 'familia-violencia-domestica',
      title: 'Violência Doméstica',
      description: 'Proteção contra violência doméstica e familiar.',
      category: 'familia',
      href: '/servicos/violencia-domestica',
      benefits: [
        {
          title: 'Proteção Urgente',
          description: 'Medidas protetivas de urgência.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Atendimento Imediato',
          description: 'Acolhimento e orientação urgente.'
        }
      ],
      faq: [
        {
          question: 'Como solicitar medida protetiva?',
          answer: 'Através da Delegacia da Mulher ou Ministério Público.'
        }
      ],
      testimonials: [
        {
          name: 'Cliente Protegida',
          text: 'Consegui proteção e segurança.'
        }
      ]
    },
    {
      id: 'familia-alteracao-regime',
      title: 'Alteração de Regime de Bens',
      description: 'Mudança do regime de bens no casamento.',
      category: 'familia',
      href: '/servicos/alteracao-regime-bens',
      benefits: [
        {
          title: 'Adequação Patrimonial',
          description: 'Regime adequado à nova realidade do casal.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Situação',
          description: 'Avaliação do patrimônio atual do casal.'
        }
      ],
      faq: [
        {
          question: 'É possível alterar a qualquer tempo?',
          answer: 'Sim, desde que justificado o interesse legítimo.'
        }
      ],
      testimonials: [
        {
          name: 'Casal Silva',
          text: 'Regime alterado conforme nossa necessidade.'
        }
      ]
    },
    {
      id: 'familia-emancipacao',
      title: 'Emancipação',
      description: 'Processo de emancipação de menores.',
      category: 'familia',
      href: '/servicos/emancipacao',
      benefits: [
        {
          title: 'Autonomia Legal',
          description: 'Capacidade civil plena antes dos 18 anos.',
          icon: '🎓'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Verificação dos Requisitos',
          description: 'Análise das condições para emancipação.'
        }
      ],
      faq: [
        {
          question: 'Quais os requisitos para emancipação?',
          answer: 'Idade mínima de 16 anos e capacidade para atos da vida civil.'
        }
      ],
      testimonials: [
        {
          name: 'Família Costa',
          text: 'Processo de emancipação bem sucedido.'
        }
      ]
    },
    {
      id: 'familia-interdição',
      title: 'Interdição e Curatela',
      description: 'Processos de interdição e nomeação de curador.',
      category: 'familia',
      href: '/servicos/interdicao-curatela',
      benefits: [
        {
          title: 'Proteção Legal',
          description: 'Proteção de pessoas incapazes.',
          icon: '🤝'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Avaliação Médica',
          description: 'Perícia para verificação da incapacidade.'
        }
      ],
      faq: [
        {
          question: 'Quem pode ser curador?',
          answer: 'Familiares próximos ou pessoa indicada pelo juiz.'
        }
      ],
      testimonials: [
        {
          name: 'Família Oliveira',
          text: 'Curatela estabelecida para proteção da família.'
        }
      ]
    },
    {
      id: 'familia-casamento-civil',
      title: 'Casamento Civil',
      description: 'Assessoria em habilitação e cerimônia de casamento civil.',
      category: 'familia',
      href: '/servicos/casamento-civil',
      benefits: [
        {
          title: 'Processo Simplificado',
          description: 'Orientação completa para habilitação.',
          icon: '💒'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Documentação',
          description: 'Preparação dos documentos necessários.'
        }
      ],
      faq: [
        {
          question: 'Quais documentos são necessários?',
          answer: 'Certidão de nascimento, RG, CPF e comprovante de residência.'
        }
      ],
      testimonials: [
        {
          name: 'Casal Noivos',
          text: 'Casamento realizado sem problemas.'
        }
      ]
    },
    {
      id: 'familia-alienacao-parental',
      title: 'Alienação Parental',
      description: 'Combate à alienação parental e proteção dos vínculos familiares.',
      category: 'familia',
      href: '/servicos/alienacao-parental',
      benefits: [
        {
          title: 'Proteção dos Vínculos',
          description: 'Preservação da relação entre pais e filhos.',
          icon: '👨‍👩‍👧‍👦'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação dos Sinais',
          description: 'Análise dos indícios de alienação parental.'
        }
      ],
      faq: [
        {
          question: 'O que caracteriza alienação parental?',
          answer: 'Interferência na formação psicológica da criança contra o outro genitor.'
        }
      ],
      testimonials: [
        {
          name: 'Pai Preocupado',
          text: 'Consegui restabelecer o contato com meu filho.'
        }
      ]
    },
    {
      id: 'familia-regulamentacao-visitas',
      title: 'Regulamentação de Visitas',
      description: 'Estabelecimento de regime de visitas entre pais e filhos.',
      category: 'familia',
      href: '/servicos/regulamentacao-visitas',
      benefits: [
        {
          title: 'Convivência Saudável',
          description: 'Garantia do direito de convivência familiar.',
          icon: '🎪'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Rotina',
          description: 'Estudo da rotina da criança e disponibilidade dos pais.'
        }
      ],
      faq: [
        {
          question: 'Como funciona o regime de visitas?',
          answer: 'Definido conforme o melhor interesse da criança.'
        }
      ],
      testimonials: [
        {
          name: 'Mãe Dedicada',
          text: 'Visitas organizadas de forma harmoniosa.'
        }
      ]
    }
  ];
};
