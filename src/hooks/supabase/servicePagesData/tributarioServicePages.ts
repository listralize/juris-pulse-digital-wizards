
import { ServicePage } from '../../../types/adminTypes';

export const createTributarioServicePages = (): ServicePage[] => {
  return [
    {
      id: 'tributario-planejamento',
      title: 'Planejamento Tributário',
      description: 'Otimização da carga tributária através de estratégias legais de elisão fiscal.',
      category: 'tributario',
      href: '/servicos/planejamento-tributario',
      benefits: [
        {
          title: 'Redução Legal de Impostos',
          description: 'Estratégias para diminuir a carga tributária dentro da legalidade.',
          icon: '💰'
        },
        {
          title: 'Compliance Tributário',
          description: 'Adequação às obrigações fiscais evitando multas e penalidades.',
          icon: '📊'
        },
        {
          title: 'Consultoria Especializada',
          description: 'Orientação técnica sobre a melhor estruturação tributária.',
          icon: '👨‍💼'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Diagnóstico Tributário',
          description: 'Análise completa da situação fiscal atual da empresa.'
        },
        {
          step: 2,
          title: 'Identificação de Oportunidades',
          description: 'Mapeamento de possibilidades de otimização tributária.'
        },
        {
          step: 3,
          title: 'Implementação',
          description: 'Execução das estratégias planejadas com acompanhamento.'
        },
        {
          step: 4,
          title: 'Monitoramento',
          description: 'Acompanhamento contínuo dos resultados e ajustes necessários.'
        }
      ],
      faq: [
        {
          question: 'O que é elisão fiscal?',
          answer: 'É a redução legal da carga tributária através do planejamento antes da ocorrência do fato gerador.'
        },
        {
          question: 'Qual a diferença entre elisão e evasão?',
          answer: 'Elisão é legal e feita antes do fato gerador. Evasão é ilegal e ocorre após o fato gerador.'
        }
      ],
      testimonials: [
        {
          name: 'Empresa ABC Ltda',
          text: 'Conseguimos reduzir 30% da nossa carga tributária com o planejamento realizado.'
        }
      ]
    }
  ];
};
