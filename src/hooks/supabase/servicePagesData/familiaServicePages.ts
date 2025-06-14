
import { ServicePage } from '../../../types/adminTypes';

export const createFamiliaServicePages = (): ServicePage[] => {
  return [
    {
      id: 'familia-divorcio',
      title: 'Divórcio e Separação',
      description: 'Assessoria completa em processos de divórcio consensual e litigioso, garantindo seus direitos e dos seus filhos.',
      category: 'familia',
      href: '/servicos/divorcio-separacao',
      benefits: [
        {
          title: 'Acompanhamento Completo',
          description: 'Orientação em todas as etapas do processo de divórcio, desde a documentação até a homologação.',
          icon: '📋'
        },
        {
          title: 'Proteção dos Filhos',
          description: 'Defesa dos interesses das crianças em questões de guarda, visitação e pensão alimentícia.',
          icon: '👨‍👩‍👧‍👦'
        },
        {
          title: 'Divisão Patrimonial',
          description: 'Assessoria na partilha justa dos bens adquiridos durante o casamento.',
          icon: '🏠'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Consulta Inicial',
          description: 'Análise da situação familiar e orientação sobre os procedimentos legais.'
        },
        {
          step: 2,
          title: 'Documentação',
          description: 'Preparação de todos os documentos necessários para o processo.'
        },
        {
          step: 3,
          title: 'Acordo ou Litígio',
          description: 'Tentativa de acordo amigável ou representação em processo judicial.'
        },
        {
          step: 4,
          title: 'Homologação',
          description: 'Acompanhamento até a homologação judicial do divórcio.'
        }
      ],
      faq: [
        {
          question: 'Quanto tempo demora um processo de divórcio?',
          answer: 'O divórcio consensual pode ser concluído em 30 a 60 dias. O litigioso pode levar de 6 meses a 2 anos.'
        },
        {
          question: 'É obrigatório fazer inventário?',
          answer: 'Sim, se há bens a partilhar. Pode ser feito junto com o divórcio ou separadamente.'
        },
        {
          question: 'Como fica a guarda dos filhos?',
          answer: 'Preferencialmente compartilhada, sempre priorizando o melhor interesse das crianças.'
        }
      ],
      testimonials: [
        {
          name: 'Maria Silva',
          text: 'Processo de divórcio conduzido com muito profissionalismo e sensibilidade. Recomendo!'
        },
        {
          name: 'João Santos',
          text: 'Conseguimos um acordo justo para ambas as partes. Excelente atendimento.'
        }
      ]
    },
    {
      id: 'familia-guarda',
      title: 'Guarda de Filhos',
      description: 'Defesa dos direitos dos pais e proteção do melhor interesse das crianças em questões de guarda.',
      category: 'familia',
      href: '/servicos/guarda-filhos',
      benefits: [
        {
          title: 'Melhor Interesse da Criança',
          description: 'Atuação sempre focada no bem-estar e desenvolvimento saudável dos filhos.',
          icon: '👶'
        },
        {
          title: 'Mediação Familiar',
          description: 'Busca por soluções consensuais que preservem os vínculos familiares.',
          icon: '🤝'
        },
        {
          title: 'Acompanhamento Psicossocial',
          description: 'Orientação sobre aspectos emocionais e sociais envolvidos na guarda.',
          icon: '💙'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Avaliação do Caso',
          description: 'Análise da situação familiar e das necessidades das crianças.'
        },
        {
          step: 2,
          title: 'Documentação',
          description: 'Reunião de documentos e evidências para fundamentar o pedido.'
        },
        {
          step: 3,
          title: 'Estudo Social',
          description: 'Acompanhamento do estudo psicossocial quando determinado pelo juiz.'
        },
        {
          step: 4,
          title: 'Decisão Judicial',
          description: 'Acompanhamento até a decisão final sobre a guarda.'
        }
      ],
      faq: [
        {
          question: 'O que é guarda compartilhada?',
          answer: 'Modalidade onde ambos os pais exercem o poder familiar, tomando decisões conjuntas sobre os filhos.'
        },
        {
          question: 'Avós podem pedir guarda?',
          answer: 'Sim, em situações excepcionais onde os pais não podem exercer a guarda adequadamente.'
        },
        {
          question: 'Como é definida a guarda?',
          answer: 'O juiz considera fatores como vínculo afetivo, condições de moradia, estabilidade emocional e financeira.'
        }
      ],
      testimonials: [
        {
          name: 'Ana Paula',
          text: 'Consegui a guarda do meu filho com todo o suporte necessário. Muito obrigada!'
        },
        {
          name: 'Carlos Eduardo',
          text: 'Profissionais competentes que me ajudaram a manter a convivência com minha filha.'
        }
      ]
    }
  ];
};
