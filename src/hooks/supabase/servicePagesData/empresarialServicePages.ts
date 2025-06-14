
import { ServicePage } from '../../../types/adminTypes';

export const createEmpresarialServicePages = (): ServicePage[] => {
  return [
    {
      id: 'empresarial-constituicao',
      title: 'Constituição de Empresas',
      description: 'Assessoria completa para abertura e estruturação legal de empresas.',
      category: 'empresarial',
      href: '/servicos/constituicao-empresas',
      benefits: [
        {
          title: 'Assessoria Completa',
          description: 'Orientação desde a escolha do tipo societário até o registro.',
          icon: '🏢'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Consulta Inicial',
          description: 'Análise do perfil do negócio e escolha da estrutura adequada.'
        }
      ],
      faq: [
        {
          question: 'Qual o melhor tipo de empresa?',
          answer: 'Depende do porte, atividade e número de sócios. Fazemos essa análise personalizada.'
        }
      ],
      testimonials: [
        {
          name: 'Startup Tech',
          text: 'Excelente suporte na constituição da nossa empresa de tecnologia.'
        }
      ]
    }
  ];
};
