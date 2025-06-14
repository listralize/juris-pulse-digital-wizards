
import { ServicePage } from '../../../types/adminTypes';

export const createCivilServicePages = (): ServicePage[] => {
  return [
    {
      id: 'civil-contratos',
      title: 'Contratos Civis',
      description: 'Elaboração, revisão e assessoria em contratos civis diversos.',
      category: 'civil',
      href: '/servicos/contratos-civis',
      benefits: [
        {
          title: 'Segurança Jurídica',
          description: 'Contratos elaborados para proteger seus interesses.',
          icon: '📄'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise das Necessidades',
          description: 'Entendimento dos objetivos e especificidades do contrato.'
        }
      ],
      faq: [
        {
          question: 'Todo contrato precisa ser registrado?',
          answer: 'Nem todos. Depende do tipo e valor. Orientamos sobre a necessidade.'
        }
      ],
      testimonials: [
        {
          name: 'Lucia Fernandes',
          text: 'Contrato bem elaborado que evitou problemas futuros.'
        }
      ]
    },
    {
      id: 'civil-responsabilidade-civil',
      title: 'Responsabilidade Civil',
      description: 'Ações de indenização por danos materiais e morais.',
      category: 'civil',
      href: '/servicos/responsabilidade-civil',
      benefits: [
        {
          title: 'Reparação de Danos',
          description: 'Busca por indenização justa pelos prejuízos sofridos.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Dano',
          description: 'Avaliação dos prejuízos materiais e morais.'
        }
      ],
      faq: [
        {
          question: 'Posso cobrar danos morais?',
          answer: 'Sim, quando há violação à dignidade, honra ou imagem.'
        }
      ],
      testimonials: [
        {
          name: 'Cliente Satisfeito',
          text: 'Indenização justa pelos danos sofridos.'
        }
      ]
    },
    {
      id: 'civil-direito-propriedade',
      title: 'Direito de Propriedade',
      description: 'Questões relacionadas à propriedade imobiliária.',
      category: 'civil',
      href: '/servicos/direito-propriedade',
      benefits: [
        {
          title: 'Proteção Patrimonial',
          description: 'Defesa dos direitos sobre imóveis.',
          icon: '🏠'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Documental',
          description: 'Verificação da documentação do imóvel.'
        }
      ],
      faq: [
        {
          question: 'Como comprovar a propriedade?',
          answer: 'Através da escritura e registro no cartório de imóveis.'
        }
      ],
      testimonials: [
        {
          name: 'Proprietário João',
          text: 'Direito de propriedade reconhecido e protegido.'
        }
      ]
    },
    {
      id: 'civil-usucapiao',
      title: 'Usucapião',
      description: 'Ações de usucapião para aquisição de propriedade.',
      category: 'civil',
      href: '/servicos/usucapiao',
      benefits: [
        {
          title: 'Aquisição de Propriedade',
          description: 'Reconhecimento legal da posse como propriedade.',
          icon: '📜'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Verificação dos Requisitos',
          description: 'Análise do tempo e natureza da posse.'
        }
      ],
      faq: [
        {
          question: 'Qual o prazo para usucapião?',
          answer: 'Varia de 5 a 15 anos conforme o tipo de usucapião.'
        }
      ],
      testimonials: [
        {
          name: 'Possuidor Antigo',
          text: 'Propriedade adquirida por usucapião.'
        }
      ]
    },
    {
      id: 'civil-locacao-imobiliaria',
      title: 'Locação Imobiliária',
      description: 'Assessoria em contratos de locação e despejo.',
      category: 'civil',
      href: '/servicos/locacao-imobiliaria',
      benefits: [
        {
          title: 'Relação Equilibrada',
          description: 'Proteção dos direitos de locador e locatário.',
          icon: '🔑'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Contratual',
          description: 'Revisão das cláusulas do contrato de locação.'
        }
      ],
      faq: [
        {
          question: 'Posso aumentar o aluguel?',
          answer: 'Sim, conforme índice previsto no contrato ou lei.'
        }
      ],
      testimonials: [
        {
          name: 'Locador Silva',
          text: 'Contrato bem elaborado evitou problemas.'
        }
      ]
    },
    {
      id: 'civil-direito-vizinhanca',
      title: 'Direito de Vizinhança',
      description: 'Resolução de conflitos entre vizinhos.',
      category: 'civil',
      href: '/servicos/direito-vizinhanca',
      benefits: [
        {
          title: 'Convivência Harmoniosa',
          description: 'Solução de conflitos de vizinhança.',
          icon: '🏘️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Mediação do Conflito',
          description: 'Tentativa de solução amigável.'
        }
      ],
      faq: [
        {
          question: 'Posso construir no limite do terreno?',
          answer: 'Deve respeitar o afastamento mínimo previsto na lei.'
        }
      ],
      testimonials: [
        {
          name: 'Vizinho Pacífico',
          text: 'Conflito resolvido amigavelmente.'
        }
      ]
    },
    {
      id: 'civil-direito-sucessoes',
      title: 'Direito das Sucessões',
      description: 'Assessoria em heranças e sucessões.',
      category: 'civil',
      href: '/servicos/direito-sucessoes',
      benefits: [
        {
          title: 'Sucessão Organizada',
          description: 'Transmissão ordenada do patrimônio.',
          icon: '👴'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Levantamento Patrimonial',
          description: 'Identificação dos bens deixados pelo falecido.'
        }
      ],
      faq: [
        {
          question: 'Posso renunciar à herança?',
          answer: 'Sim, mas a renúncia deve ser total e irrevogável.'
        }
      ],
      testimonials: [
        {
          name: 'Herdeiro Legal',
          text: 'Sucessão resolvida sem conflitos familiares.'
        }
      ]
    },
    {
      id: 'civil-direito-obrigacoes',
      title: 'Direito das Obrigações',
      description: 'Cobrança e execução de dívidas e obrigações.',
      category: 'civil',
      href: '/servicos/direito-obrigacoes',
      benefits: [
        {
          title: 'Recuperação de Créditos',
          description: 'Cobrança eficaz de valores devidos.',
          icon: '💰'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Título',
          description: 'Verificação da validade do crédito.'
        }
      ],
      faq: [
        {
          question: 'Qual o prazo para cobrar uma dívida?',
          answer: 'Varia conforme o tipo da obrigação, geralmente 3 a 10 anos.'
        }
      ],
      testimonials: [
        {
          name: 'Credor Satisfeito',
          text: 'Dívida recuperada através de execução judicial.'
        }
      ]
    },
    {
      id: 'civil-danos-morais',
      title: 'Danos Morais',
      description: 'Ações de indenização por danos morais diversos.',
      category: 'civil',
      href: '/servicos/danos-morais',
      benefits: [
        {
          title: 'Reparação Moral',
          description: 'Compensação pelos danos à dignidade.',
          icon: '😔'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Caracterização do Dano',
          description: 'Demonstração da violação aos direitos da personalidade.'
        }
      ],
      faq: [
        {
          question: 'Qual o valor da indenização?',
          answer: 'Varia conforme a gravidade e consequências do dano.'
        }
      ],
      testimonials: [
        {
          name: 'Vítima Reparada',
          text: 'Indenização justa pelo constrangimento sofrido.'
        }
      ]
    },
    {
      id: 'civil-direito-consumidor-civil',
      title: 'Direito do Consumidor (Cível)',
      description: 'Proteção dos direitos do consumidor em âmbito civil.',
      category: 'civil',
      href: '/servicos/direito-consumidor-civil',
      benefits: [
        {
          title: 'Proteção Consumidor',
          description: 'Defesa dos direitos nas relações de consumo.',
          icon: '🛒'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Relação',
          description: 'Verificação da relação de consumo.'
        }
      ],
      faq: [
        {
          question: 'Tenho direito à troca do produto?',
          answer: 'Sim, em caso de vício ou defeito do produto.'
        }
      ],
      testimonials: [
        {
          name: 'Consumidor Protegido',
          text: 'Direitos reconhecidos e indenização recebida.'
        }
      ]
    },
    {
      id: 'civil-revisao-contratual',
      title: 'Revisão Contratual',
      description: 'Revisão de contratos por onerosidade excessiva.',
      category: 'civil',
      href: '/servicos/revisao-contratual',
      benefits: [
        {
          title: 'Equilíbrio Contratual',
          description: 'Reequilíbrio das obrigações contratuais.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Onerosidade',
          description: 'Verificação do desequilíbrio contratual.'
        }
      ],
      faq: [
        {
          question: 'Posso revisar qualquer contrato?',
          answer: 'Sim, quando houver onerosidade excessiva superveniente.'
        }
      ],
      testimonials: [
        {
          name: 'Contratante Aliviado',
          text: 'Contrato revisado com condições mais justas.'
        }
      ]
    },
    {
      id: 'civil-direito-personalidade',
      title: 'Direitos da Personalidade',
      description: 'Proteção dos direitos personalíssimos.',
      category: 'civil',
      href: '/servicos/direitos-personalidade',
      benefits: [
        {
          title: 'Proteção Pessoal',
          description: 'Defesa da honra, imagem e privacidade.',
          icon: '👤'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação da Violação',
          description: 'Análise da ofensa aos direitos pessoais.'
        }
      ],
      faq: [
        {
          question: 'O que são direitos da personalidade?',
          answer: 'Direitos inerentes à pessoa: vida, honra, imagem, privacidade.'
        }
      ],
      testimonials: [
        {
          name: 'Pessoa Protegida',
          text: 'Honra e imagem protegidas judicialmente.'
        }
      ]
    }
  ];
};
