
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PlanejamentoTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Planejamento Tributário Estratégico"
      serviceDescription="Reduza legalmente sua carga tributária com estratégias personalizadas. Analisamos detalhadamente suas operações para identificar oportunidades de economia fiscal, garantindo maior competitividade e conformidade."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Redução Legal da Carga Tributária",
          description: "Implementação de estratégias lícitas para redução significativa da carga tributária, utilizando benefícios fiscais, incentivos e regimes especiais disponíveis.",
          icon: "💰"
        },
        {
          title: "Escolha do Regime Tributário Ideal",
          description: "Avaliamos qual o melhor enquadramento para sua empresa (Simples Nacional, Lucro Presumido ou Lucro Real), considerando faturamento, margens e atividade econômica.",
          icon: "📊"
        },
        {
          title: "Reorganização Societária Tributária",
          description: "Estruturamos fusões, cisões, incorporações com base na Lei das S.A., visando otimizar tributação, segregar riscos e aproveitar benefícios fiscais.",
          icon: "🏢"
        },
        {
          title: "Simulação de Cenários Fiscais",
          description: "Projetamos o impacto tributário de diferentes decisões de negócios, permitindo escolhas mais assertivas e seguras para sua empresa.",
          icon: "🎯"
        },
        {
          title: "Utilização de Incentivos Fiscais",
          description: "Identificamos e aplicamos legalmente os incentivos e regimes especiais disponíveis para sua atividade e região de atuação.",
          icon: "🎁"
        },
        {
          title: "Segurança Jurídica Completa",
          description: "Todas as estratégias são fundamentadas em lei, jurisprudência e doutrina, garantindo proteção contra questionamentos fiscais futuros.",
          icon: "🛡️"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Tributário Completo",
          description: "Análise detalhada da situação tributária atual, identificação de oportunidades de economia fiscal e mapeamento de riscos existentes na operação."
        },
        {
          step: 2,
          title: "Análise de Viabilidade Legal",
          description: "Estudo aprofundado da legislação aplicável, jurisprudência dos tribunais superiores e posicionamento dos órgãos fiscalizadores sobre as estratégias propostas."
        },
        {
          step: 3,
          title: "Elaboração de Estratégias Customizadas",
          description: "Desenvolvimento de estratégias específicas para cada cliente, considerando atividade, porte, objetivos e perfil de risco tributário da empresa."
        },
        {
          step: 4,
          title: "Implementação Estruturada",
          description: "Execução gradual das estratégias aprovadas, com cronograma definido e acompanhamento de cada etapa de implementação do planejamento."
        },
        {
          step: 5,
          title: "Monitoramento e Ajustes",
          description: "Acompanhamento contínuo dos resultados, monitoramento de mudanças legislativas e ajustes necessários nas estratégias implementadas."
        },
        {
          step: 6,
          title: "Relatórios de Performance",
          description: "Elaboração de relatórios periódicos demonstrando economia fiscal obtida, riscos mitigados e oportunidades futuras identificadas."
        }
      ]}
      testimonials={[
        {
          name: "João Paulo Silva, CEO Grupo Empresarial Delta",
          quote: "O planejamento tributário implementado pelo escritório reduziu nossa carga fiscal em 35% no primeiro ano, mantendo total conformidade legal. O ROI do investimento em consultoria foi excepcional."
        },
        {
          name: "Marina Santos, Médica e Empresária",
          quote: "A reestruturação da minha clínica através de holding reduziu significativamente meus impostos pessoais e empresariais. A economia anual de R$ 180 mil me permitiu investir em novos equipamentos."
        },
        {
          name: "Carlos Roberto Oliveira, Diretor Comercial",
          quote: "A migração para o Simples Nacional foi estratégica e trouxe economia de R$ 240 mil anuais em tributos para nossa empresa. O acompanhamento contínuo garante que estamos sempre no regime mais vantajoso."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre elisão e evasão fiscal?",
          answer: "Elisão fiscal é a redução lícita de tributos através de planejamento legal antes da ocorrência do fato gerador, utilizando lacunas e benefícios previstos em lei. Evasão fiscal é a sonegação ilegal de tributos após o fato gerador, constituindo crime contra a ordem tributária."
        },
        {
          question: "O planejamento tributário é legal e seguro?",
          answer: "Sim, o planejamento tributário é totalmente legal quando utiliza meios lícitos previstos na legislação. É direito fundamental do contribuinte organizar seus negócios da forma menos onerosa possível, desde que haja propósito negocial válido."
        },
        {
          question: "Quanto posso economizar com planejamento tributário?",
          answer: "A economia varia conforme o caso, mas tipicamente fica entre 15% a 40% da carga tributária atual. Empresas podem economizar ainda mais através de reorganizações societárias e mudanças de regime tributário."
        },
        {
          question: "Como escolher o melhor regime tributário para minha empresa?",
          answer: "A escolha depende do faturamento, atividade, margem de lucro e composição de custos. É necessária análise detalhada comparando Simples Nacional, Lucro Presumido e Lucro Real."
        },
        {
          question: "Quando é indicado criar uma holding familiar?",
          answer: "Holdings familiares são indicadas para patrimônios superiores a R$ 2 milhões, visando proteção patrimonial, planejamento sucessório, otimização fiscal e gestão profissional de investimentos."
        }
      ]}
      relatedServices={[
        {
          name: "Recuperação de Tributos",
          path: "/servicos/recuperacao-tributos"
        },
        {
          name: "Incentivos Fiscais",
          path: "/servicos/incentivos-fiscais"
        },
        {
          name: "Compliance Tributário",
          path: "/servicos/compliance-tributario"
        }
      ]}
      mainAreaPath="/areas/tributario"
    />
  );
};

export default PlanejamentoTributarioService;
