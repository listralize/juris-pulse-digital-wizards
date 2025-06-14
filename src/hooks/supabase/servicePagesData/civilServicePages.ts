
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
    }
  ];
};
