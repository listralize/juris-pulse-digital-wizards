
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PlanejamentoTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Planejamento Tributário"
      serviceDescription="Consultoria especializada em otimização fiscal lícita para pessoas físicas e jurídicas, reduzindo a carga tributária através de estratégias legais e estruturação adequada."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Redução Legal da Carga Tributária",
          description: "Implementação de estratégias lícitas para redução significativa da carga tributária, utilizando benefícios fiscais, incentivos e regimes especiais disponíveis.",
          icon: "💰"
        },
        {
          title: "Elisão Fiscal Especializada",
          description: "Aplicação de técnicas avançadas de elisão fiscal, estruturando operações de forma a minimizar tributos sem violar a legislação vigente.",
          icon: "⚖️"
        },
        {
          title: "Reorganização Societária Tributária",
          description: "Reestruturação de holdings, grupos empresariais e operações societárias com foco na otimização fiscal e proteção patrimonial.",
          icon: "🏢"
        },
        {
          title: "Regime Tributário Adequado",
          description: "Análise e escolha do regime tributário mais vantajoso (Simples Nacional, Lucro Presumido, Lucro Real) conforme o perfil de cada empresa.",
          icon: "📊"
        },
        {
          title: "Planejamento Sucessório Tributário",
          description: "Estruturação de holdings familiares e planejamento sucessório com minimização de impactos tributários na transmissão patrimonial.",
          icon: "👨‍👩‍👧‍👦"
        },
        {
          title: "Compliance Tributário Preventivo",
          description: "Implementação de rotinas de compliance para evitar autuações fiscais, com revisão periódica de obrigações acessórias e principais.",
          icon: "🛡️"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Tributário Completo",
          description: "Análise detalhada da situação tributária atual, identificação de oportunidades de economia fiscal e mapeamento de riscos existentes."
        },
        {
          step: 2,
          title: "Análise de Viabilidade Legal",
          description: "Estudo aprofundado da legislação aplicável, jurisprudência dos tribunais superiores e posicionamento dos órgãos fiscalizadores."
        },
        {
          step: 3,
          title: "Elaboração de Estratégias Customizadas",
          description: "Desenvolvimento de estratégias específicas para cada cliente, considerando atividade, porte, objetivos e perfil de risco tributário."
        },
        {
          step: 4,
          title: "Implementação Estruturada",
          description: "Execução gradual das estratégias aprovadas, com cronograma definido e acompanhamento de cada etapa de implementação."
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
          name: "João P., CEO Grupo Empresarial",
          quote: "O planejamento tributário reduziu nossa carga fiscal em 35% no primeiro ano, mantendo total conformidade legal. O ROI foi excepcional."
        },
        {
          name: "Marina S., Médica",
          quote: "A reestruturação da minha clínica através de holding reduziu significativamente meus impostos pessoais e empresariais."
        },
        {
          name: "Família Oliveira, Empresários",
          quote: "O planejamento sucessório tributário protegeu nosso patrimônio familiar e garantiu uma transição eficiente para a próxima geração."
        },
        {
          name: "Carlos R., Diretor Comercial",
          quote: "A migração para o Simples Nacional foi estratégica e trouxe economia de R$ 200 mil anuais em tributos para nossa empresa."
        },
        {
          name: "Ana L., Sócia de Startup",
          quote: "O planejamento fiscal desde o início da empresa evitou problemas futuros e otimizou nossa estrutura de investimentos."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre elisão e evasão fiscal?",
          answer: "Elisão fiscal é a redução lícita de tributos através de planejamento legal antes da ocorrência do fato gerador. Evasão fiscal é a sonegação ilegal de tributos após o fato gerador, constituindo crime contra a ordem tributária."
        },
        {
          question: "O planejamento tributário é legal?",
          answer: "Sim, o planejamento tributário é totalmente legal quando utiliza meios lícitos previstos na legislação. É direito fundamental do contribuinte organizar seus negócios da forma menos onerosa possível."
        },
        {
          question: "Quanto posso economizar com planejamento tributário?",
          answer: "A economia varia conforme o caso, mas tipicamente fica entre 15% a 40% da carga tributária atual. Empresas podem economizar ainda mais através de reorganizações societárias e mudanças de regime."
        },
        {
          question: "Quando é indicado criar uma holding familiar?",
          answer: "Holdings familiares são indicadas para patrimônios superiores a R$ 2 milhões, visando proteção patrimonial, planejamento sucessório, otimização fiscal e gestão profissional de investimentos."
        },
        {
          question: "Como escolher o melhor regime tributário?",
          answer: "A escolha depende do faturamento, atividade, margem de lucro e composição de custos. Requer análise detalhada comparando Simples Nacional, Lucro Presumido e Lucro Real."
        },
        {
          question: "O que é a norma antielisiva?",
          answer: "É o parágrafo único do art. 116 do CTN, que permite à Receita desconsiderar atos sem propósito negocial que visem apenas economia fiscal. Por isso o planejamento deve ter substância econômica."
        },
        {
          question: "Posso mudar o regime tributário a qualquer momento?",
          answer: "Não, as mudanças de regime tributário seguem regras específicas. Geralmente só podem ser feitas no início do ano-calendário ou em situações especiais previstas em lei."
        },
        {
          question: "O planejamento tributário funciona para profissionais liberais?",
          answer: "Sim, profissionais liberais podem se beneficiar através de estruturação empresarial adequada, escolha de regime tributário otimizado e planejamento de distribuição de lucros."
        }
      ]}
      relatedServices={[
        {
          name: "Contencioso Tributário",
          path: "/servicos/contencioso-tributario"
        },
        {
          name: "Auditoria Tributária",
          path: "/servicos/auditoria-tributaria"
        },
        {
          name: "Compliance Tributário",
          path: "/servicos/compliance-tributario"
        },
        {
          name: "Consultoria em Impostos",
          path: "/servicos/consultoria-impostos"
        }
      ]}
      mainAreaPath="/areas/tributario"
    />
  );
};

export default PlanejamentoTributarioService;
