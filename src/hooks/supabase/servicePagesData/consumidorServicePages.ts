
import { ServicePage } from '../../../types/adminTypes';

export const createConsumidorServicePages = (): ServicePage[] => {
  return [
    {
      id: 'consumidor-defesa',
      title: 'Defesa do Consumidor',
      description: 'Proteção dos direitos dos consumidores em relações de consumo.',
      category: 'consumidor',
      href: '/servicos/defesa-consumidor',
      benefits: [
        {
          title: 'Proteção de Direitos',
          description: 'Defesa efetiva dos direitos garantidos pelo CDC.',
          icon: '🛡️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Relação',
          description: 'Verificação se há relação de consumo e direitos violados.'
        }
      ],
      faq: [
        {
          question: 'O que é vício do produto?',
          answer: 'Defeito que torna o produto inadequado ou diminui seu valor.'
        }
      ],
      testimonials: [
        {
          name: 'Marina Costa',
          text: 'Consegui resolver um problema complexo com meu banco.'
        }
      ]
    },
    {
      id: 'consumidor-produtos-defeituosos',
      title: 'Produtos Defeituosos',
      description: 'Ações contra produtos com defeitos e vícios.',
      category: 'consumidor',
      href: '/servicos/produtos-defeituosos',
      benefits: [
        {
          title: 'Reparação de Vícios',
          description: 'Troca, reparo ou devolução de produtos defeituosos.',
          icon: '🔧'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação do Vício',
          description: 'Análise do defeito apresentado pelo produto.'
        }
      ],
      faq: [
        {
          question: 'Prazo para reclamar de vício?',
          answer: '30 dias para produtos não duráveis, 90 dias para duráveis.'
        }
      ],
      testimonials: [
        {
          name: 'Comprador Lesado',
          text: 'Produto trocado após comprovação do defeito.'
        }
      ]
    },
    {
      id: 'consumidor-servicos-defeituosos',
      title: 'Serviços Defeituosos',
      description: 'Reparação por serviços mal prestados.',
      category: 'consumidor',
      href: '/servicos/servicos-defeituosos',
      benefits: [
        {
          title: 'Qualidade Garantida',
          description: 'Direito a serviços adequados e eficientes.',
          icon: '⚙️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Prestação',
          description: 'Avaliação da qualidade do serviço prestado.'
        }
      ],
      faq: [
        {
          question: 'O que fazer se o serviço foi mal prestado?',
          answer: 'Exigir reexecução, abatimento do preço ou rescisão.'
        }
      ],
      testimonials: [
        {
          name: 'Cliente Insatisfeito',
          text: 'Serviço refeito sem custo adicional.'
        }
      ]
    },
    {
      id: 'consumidor-cobranca-indevida',
      title: 'Cobrança Indevida',
      description: 'Contestação de cobranças abusivas e indevidas.',
      category: 'consumidor',
      href: '/servicos/cobranca-indevida',
      benefits: [
        {
          title: 'Proteção Financeira',
          description: 'Cessação de cobranças abusivas.',
          icon: '💳'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Cobrança',
          description: 'Verificação da legitimidade da cobrança.'
        }
      ],
      faq: [
        {
          question: 'Posso ser negativado indevidamente?',
          answer: 'Não, e se isso ocorrer, há direito à indenização.'
        }
      ],
      testimonials: [
        {
          name: 'Consumidor Protegido',
          text: 'Cobrança indevida cessada e indenização recebida.'
        }
      ]
    },
    {
      id: 'consumidor-publicidade-enganosa',
      title: 'Publicidade Enganosa',
      description: 'Ações contra propaganda enganosa e abusiva.',
      category: 'consumidor',
      href: '/servicos/publicidade-enganosa',
      benefits: [
        {
          title: 'Informação Verdadeira',
          description: 'Direito à informação adequada e clara.',
          icon: '📺'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise da Publicidade',
          description: 'Verificação da veracidade das informações.'
        }
      ],
      faq: [
        {
          question: 'O que caracteriza publicidade enganosa?',
          answer: 'Informação falsa ou que induz o consumidor a erro.'
        }
      ],
      testimonials: [
        {
          name: 'Consumidor Enganado',
          text: 'Indenização por propaganda mentirosa.'
        }
      ]
    },
    {
      id: 'consumidor-praticas-abusivas',
      title: 'Práticas Abusivas',
      description: 'Combate a práticas abusivas no mercado de consumo.',
      category: 'consumidor',
      href: '/servicos/praticas-abusivas',
      benefits: [
        {
          title: 'Combate ao Abuso',
          description: 'Proteção contra práticas desleais.',
          icon: '⚠️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação do Abuso',
          description: 'Caracterização da prática abusiva.'
        }
      ],
      faq: [
        {
          question: 'O que são práticas abusivas?',
          answer: 'Ações que se aproveitam da vulnerabilidade do consumidor.'
        }
      ],
      testimonials: [
        {
          name: 'Vítima de Abuso',
          text: 'Prática abusiva cessada e reparação obtida.'
        }
      ]
    },
    {
      id: 'consumidor-contratos-consumo',
      title: 'Contratos de Consumo',
      description: 'Revisão de contratos abusivos e proteção contratual.',
      category: 'consumidor',
      href: '/servicos/contratos-consumo',
      benefits: [
        {
          title: 'Equilíbrio Contratual',
          description: 'Contratos justos e equilibrados.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Contratual',
          description: 'Verificação de cláusulas abusivas.'
        }
      ],
      faq: [
        {
          question: 'Posso revisar um contrato já assinado?',
          answer: 'Sim, se houver cláusulas abusivas ou desproporcionais.'
        }
      ],
      testimonials: [
        {
          name: 'Contratante Protegido',
          text: 'Cláusulas abusivas afastadas judicialmente.'
        }
      ]
    },
    {
      id: 'consumidor-recall-produtos',
      title: 'Recall de Produtos',
      description: 'Orientação sobre recalls e segurança de produtos.',
      category: 'consumidor',
      href: '/servicos/recall-produtos',
      benefits: [
        {
          title: 'Segurança Garantida',
          description: 'Proteção contra produtos perigosos.',
          icon: '🚨'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Verificação do Recall',
          description: 'Consulta sobre produtos com recall ativo.'
        }
      ],
      faq: [
        {
          question: 'O que fazer se meu produto foi chamado para recall?',
          answer: 'Procurar imediatamente o fabricante para reparo ou troca.'
        }
      ],
      testimonials: [
        {
          name: 'Usuário Protegido',
          text: 'Produto perigoso trocado através de recall.'
        }
      ]
    },
    {
      id: 'consumidor-responsabilidade-produto',
      title: 'Responsabilidade pelo Produto',
      description: 'Ações de responsabilidade civil por produtos defeituosos.',
      category: 'consumidor',
      href: '/servicos/responsabilidade-produto',
      benefits: [
        {
          title: 'Reparação Integral',
          description: 'Indenização por danos causados por produtos.',
          icon: '🏭'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Nexo Causal',
          description: 'Comprovação do dano causado pelo produto.'
        }
      ],
      faq: [
        {
          question: 'Quem responde por produto defeituoso?',
          answer: 'Fabricante, fornecedor e comerciante solidariamente.'
        }
      ],
      testimonials: [
        {
          name: 'Vítima Reparada',
          text: 'Indenização justa por produto que causou acidente.'
        }
      ]
    },
    {
      id: 'consumidor-saude-seguranca',
      title: 'Saúde e Segurança',
      description: 'Proteção da saúde e segurança dos consumidores.',
      category: 'consumidor',
      href: '/servicos/saude-seguranca',
      benefits: [
        {
          title: 'Proteção Integral',
          description: 'Garantia de produtos e serviços seguros.',
          icon: '🏥'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Avaliação de Riscos',
          description: 'Análise dos riscos à saúde e segurança.'
        }
      ],
      faq: [
        {
          question: 'Tenho direito a produtos seguros?',
          answer: 'Sim, é direito básico do consumidor.'
        }
      ],
      testimonials: [
        {
          name: 'Consumidor Seguro',
          text: 'Produto perigoso retirado do mercado.'
        }
      ]
    },
    {
      id: 'consumidor-defesa-coletiva',
      title: 'Defesa Coletiva',
      description: 'Ações coletivas para proteção de grupos de consumidores.',
      category: 'consumidor',
      href: '/servicos/defesa-coletiva',
      benefits: [
        {
          title: 'Força Coletiva',
          description: 'União de consumidores para maior efetividade.',
          icon: '👥'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Identificação do Grupo',
          description: 'Definição dos consumidores afetados.'
        }
      ],
      faq: [
        {
          question: 'Quando cabe ação coletiva?',
          answer: 'Quando vários consumidores sofrem o mesmo problema.'
        }
      ],
      testimonials: [
        {
          name: 'Grupo de Consumidores',
          text: 'Ação coletiva bem-sucedida beneficiou centenas.'
        }
      ]
    },
    {
      id: 'consumidor-direitos-basicos',
      title: 'Direitos Básicos do Consumidor',
      description: 'Orientação sobre direitos fundamentais do consumidor.',
      category: 'consumidor',
      href: '/servicos/direitos-basicos',
      benefits: [
        {
          title: 'Conhecimento de Direitos',
          description: 'Informação sobre direitos básicos.',
          icon: '📚'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Educação do Consumidor',
          description: 'Orientação sobre direitos e deveres.'
        }
      ],
      faq: [
        {
          question: 'Quais são meus direitos básicos?',
          answer: 'Segurança, informação, escolha, proteção, entre outros.'
        }
      ],
      testimonials: [
        {
          name: 'Consumidor Consciente',
          text: 'Aprendi a exercer meus direitos corretamente.'
        }
      ]
    }
  ];
};
