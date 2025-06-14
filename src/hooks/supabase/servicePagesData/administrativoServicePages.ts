
import { ServicePage } from '../../../types/adminTypes';

export const createAdministrativoServicePages = (): ServicePage[] => {
  return [
    {
      id: 'administrativo-licitacoes',
      title: 'Licitações e Contratos',
      description: 'Assessoria em processos licitatórios e contratos administrativos.',
      category: 'administrativo',
      href: '/servicos/licitacoes-contratos',
      benefits: [
        {
          title: 'Assessoria Especializada',
          description: 'Orientação técnica em todas as modalidades licitatórias.',
          icon: '📋'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Análise do Edital',
          description: 'Revisão detalhada dos requisitos e condições.'
        }
      ],
      faq: [
        {
          question: 'Quais são as modalidades de licitação?',
          answer: 'Concorrência, tomada de preços, convite, pregão, leilão e concurso.'
        }
      ],
      testimonials: [
        {
          name: 'Empresa XYZ',
          text: 'Conseguimos vencer várias licitações com o suporte jurídico.'
        }
      ]
    }
  ];
};
