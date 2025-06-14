
import { ServicePage } from '../../../types/adminTypes';

export const createPrevidenciarioServicePages = (): ServicePage[] => {
  return [
    {
      id: 'previdenciario-aposentadoria',
      title: 'Aposentadoria',
      description: 'Assessoria para concessão de aposentadorias e benefícios previdenciários.',
      category: 'previdenciario',
      href: '/servicos/aposentadoria',
      benefits: [
        {
          title: 'Análise Previdenciária',
          description: 'Verificação do tempo de contribuição e melhor momento para aposentar.',
          icon: '👴'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Levantamento Previdenciário',
          description: 'Análise completa do histórico contributivo.'
        }
      ],
      faq: [
        {
          question: 'Quando posso me aposentar?',
          answer: 'Depende da idade, tempo de contribuição e regra aplicável. Fazemos essa análise.'
        }
      ],
      testimonials: [
        {
          name: 'José Carlos',
          text: 'Consegui minha aposentadoria com o valor máximo possível.'
        }
      ]
    }
  ];
};
