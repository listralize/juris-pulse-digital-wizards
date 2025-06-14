
import { ServicePage } from '../../../types/adminTypes';

export const createCivilServicePages = (): ServicePage[] => [
  {
    id: 'civil-contratos-geral',
    title: 'Contratos em Geral',
    description: 'Elaboração, revisão e assessoria em contratos de toda natureza, desde contratos de compra e venda até locação e prestação de serviços.',
    category: 'civil',
    href: '/servicos/contratos-geral',
    benefits: [
      { title: 'Segurança Jurídica', description: 'Contratos elaborados com rigor técnico para evitar conflitos futuros', icon: '🔒' },
      { title: 'Cláusulas Personalizadas', description: 'Redação específica para cada situação e necessidade do cliente', icon: '📝' },
      { title: 'Revisão Completa', description: 'Análise detalhada de contratos existentes com sugestões de melhorias', icon: '🔍' }
    ],
    process: [
      { step: 1, title: 'Análise das Necessidades', description: 'Levantamento detalhado dos objetivos e particularidades do negócio jurídico' },
      { step: 2, title: 'Elaboração ou Revisão', description: 'Redação personalizada ou análise criteriosa do contrato existente' },
      { step: 3, title: 'Assessoria na Negociação', description: 'Suporte jurídico durante as tratativas entre as partes' },
      { step: 4, title: 'Finalização e Orientações', description: 'Entrega do documento final com orientações sobre execução' }
    ],
    faq: [
      { question: 'Que tipos de contratos vocês elaboram?', answer: 'Elaboramos contratos de toda natureza: compra e venda, locação, prestação de serviços, sociedade, distribuição, franquia, entre outros.' },
      { question: 'É possível revisar um contrato já assinado?', answer: 'Sim, podemos analisar contratos vigentes e orientar sobre direitos, obrigações e possíveis problemas identificados.' },
      { question: 'Quanto tempo leva para elaborar um contrato?', answer: 'Depende da complexidade, mas contratos simples ficam prontos em 2-3 dias úteis, enquanto contratos mais complexos podem levar até 10 dias.' }
    ],
    testimonials: [
      { name: 'Empresa ABC Ltda.', text: 'Contratos elaborados com excelência técnica. Evitamos vários problemas graças à assessoria preventiva.' },
      { name: 'Maria Santos', text: 'Revisão do meu contrato de locação foi fundamental para entender meus direitos como locatária.' }
    ]
  },
  {
    id: 'civil-responsabilidade-civil',
    title: 'Responsabilidade Civil',
    description: 'Ações de indenização por danos morais e materiais, análise de responsabilidade civil e busca de reparações.',
    category: 'civil',
    href: '/servicos/responsabilidade-civil',
    benefits: [
      { title: 'Reparação Integral', description: 'Busca da compensação adequada pelos danos sofridos', icon: '⚖️' },
      { title: 'Expertise em Danos', description: 'Conhecimento especializado em quantificação de danos morais e materiais', icon: '💡' },
      { title: 'Defesa Estratégica', description: 'Proteção eficaz contra alegações infundadas de responsabilidade', icon: '🛡️' }
    ],
    process: [
      { step: 1, title: 'Análise do Caso', description: 'Avaliação detalhada dos fatos e identificação da responsabilidade civil' },
      { step: 2, title: 'Coleta de Provas', description: 'Reunião de documentos, laudos e testemunhas necessárias' },
      { step: 3, title: 'Tentativa de Acordo', description: 'Negociação extrajudicial quando vantajosa para o cliente' },
      { step: 4, title: 'Ação Judicial', description: 'Ajuizamento da ação com fundamentação sólida e pedido adequado' }
    ],
    faq: [
      { question: 'Quando existe responsabilidade civil?', answer: 'Quando há ação ou omissão, dano e nexo causal entre a conduta e o prejuízo sofrido pela vítima.' },
      { question: 'Como é calculado o valor dos danos morais?', answer: 'Considera-se a gravidade do dano, condições pessoais das partes, repercussão do fato e jurisprudência local.' },
      { question: 'Há prazo para pedir indenização?', answer: 'Sim, o prazo é de 3 anos a partir do conhecimento do dano e de quem o causou.' }
    ],
    testimonials: [
      { name: 'João Silva', text: 'Consegui indenização justa por acidente que me causou prejuízos. Atendimento exemplar.' },
      { name: 'Ana Costa', text: 'Defesa eficiente contra ação infundada. Processo foi julgado totalmente improcedente.' }
    ]
  },
  {
    id: 'civil-acidentes-transito',
    title: 'Acidentes de Trânsito',
    description: 'Indenizações por acidentes de trânsito, danos materiais e morais, seguro DPVAT e responsabilidade civil.',
    category: 'civil',
    href: '/servicos/acidentes-transito',
    benefits: [
      { title: 'Indenização Completa', description: 'Reparação de todos os danos decorrentes do acidente', icon: '🚗' },
      { title: 'Seguro DPVAT', description: 'Cobrança de seguro obrigatório quando negado', icon: '🛡️' },
      { title: 'Perícia Especializada', description: 'Análise técnica para comprovar danos e responsabilidade', icon: '🔍' }
    ],
    process: [
      { step: 1, title: 'Coleta de Informações', description: 'Análise do boletim de ocorrência e demais documentos' },
      { step: 2, title: 'Avaliação dos Danos', description: 'Quantificação de danos materiais, morais e lucros cessantes' },
      { step: 3, title: 'Identificação do Responsável', description: 'Verificação da responsabilidade civil pelo acidente' },
      { step: 4, title: 'Cobrança e Ação', description: 'Tentativa amigável seguida de ação judicial se necessário' }
    ],
    faq: [
      { question: 'Tenho direito ao seguro DPVAT mesmo sem culpa do outro?', answer: 'Sim, o DPVAT independe de culpa e é devido em qualquer acidente com veículo.' },
      { question: 'Posso pedir indenização mesmo com seguro?', answer: 'Sim, se os danos excederem a cobertura do seguro ou houver danos morais.' },
      { question: 'Há prazo para pedir indenização?', answer: 'Sim, 3 anos para ação contra o causador e 3 anos para DPVAT.' }
    ],
    testimonials: [
      { name: 'Paulo Henrique', text: 'Indenização por acidente cobriu todos os prejuízos. Atendimento excelente.' },
      { name: 'Família Oliveira', text: 'DPVAT foi liberado após nossa intervenção. Muito obrigado.' }
    ]
  }
];
