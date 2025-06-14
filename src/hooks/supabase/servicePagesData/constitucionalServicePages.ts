
import { ServicePage } from '../../../types/adminTypes';

export const createConstitucionalServicePages = (): ServicePage[] => {
  return [
    {
      id: 'constitucional-direitos',
      title: 'Direitos Fundamentais',
      description: 'Defesa dos direitos e garantias fundamentais previstos na Constituição.',
      category: 'constitucional',
      href: '/servicos/direitos-fundamentais',
      benefits: [
        {
          title: 'Proteção Constitucional',
          description: 'Defesa dos direitos garantidos pela Constituição Federal.',
          icon: '⚖️'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Constitucional',
          description: 'Verificação da violação de direitos constitucionais.'
        }
      ],
      faq: [
        {
          question: 'O que são direitos fundamentais?',
          answer: 'São os direitos básicos garantidos pela Constituição, como vida, liberdade, igualdade.'
        }
      ],
      testimonials: [
        {
          name: 'Roberto Silva',
          text: 'Defesa eficiente dos meus direitos fundamentais.'
        }
      ]
    }
  ];
};
