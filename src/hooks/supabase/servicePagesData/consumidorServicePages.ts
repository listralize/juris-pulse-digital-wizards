
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
    }
  ];
};
