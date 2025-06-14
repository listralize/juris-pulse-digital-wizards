
import { ServicePage } from '../../../types/adminTypes';

export const createTrabalhoServicePages = (): ServicePage[] => {
  return [
    {
      id: 'trabalho-rescisao',
      title: 'Rescisão Trabalhista',
      description: 'Orientação sobre direitos e cálculos em rescisões contratuais.',
      category: 'trabalho',
      href: '/servicos/rescisao-trabalhista',
      benefits: [
        {
          title: 'Cálculo Preciso',
          description: 'Verificação correta de todos os valores devidos na rescisão.',
          icon: '🧮'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise Contratual',
          description: 'Revisão do contrato de trabalho e histórico funcional.'
        }
      ],
      faq: [
        {
          question: 'Quando tenho direito ao FGTS?',
          answer: 'Em demissão sem justa causa, término de contrato, aposentadoria, entre outros casos.'
        }
      ],
      testimonials: [
        {
          name: 'Pedro Oliveira',
          text: 'Me ajudaram a entender todos os meus direitos na rescisão.'
        }
      ]
    }
  ];
};
