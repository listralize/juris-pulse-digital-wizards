
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ComplianceTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Compliance Tributário e Consultas Especializadas"
      serviceDescription="Programa completo de conformidade fiscal e consultas estratégicas. Oferecemos assessoria preventiva através de pareceres especializados, consultas formais e programas de compliance tributário estruturados."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Pareceres Jurídicos Especializados",
          description: "Documentos técnicos aprofundados com análise de fatos, normas, jurisprudência e doutrina, fornecendo segurança para tomadas de decisão estratégicas.",
          icon: "📋"
        },
        {
          title: "Consultas Formais à Legislação",
          description: "Formalização de consultas junto aos órgãos competentes (Receita Federal, SEFAZ) para obter interpretação oficial da legislação aplicável.",
          icon: "🏛️"
        },
        {
          title: "Compliance Tributário Estruturado",
          description: "Implementação de programas de conformidade fiscal baseados na Lei Anticorrupção (Lei nº 12.846/2013) e princípios de governança corporativa.",
          icon: "🎯"
        },
        {
          title: "Prevenção de Multas e Sanções",
          description: "Identificação proativa de riscos fiscais e implementação de controles para evitar autuações e penalidades futuras.",
          icon: "🛡️"
        },
        {
          title: "Monitoramento Legislativo",
          description: "Acompanhamento contínuo de mudanças na legislação tributária e seus impactos nas operações da empresa.",
          icon: "📡"
        },
        {
          title: "Otimização de Processos",
          description: "Revisão e melhoria de processos internos relacionados a obrigações fiscais (SPED, DCTF, ECF, DEFIS) para maior eficiência.",
          icon: "⚙️"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico de Conformidade",
          description: "Avaliação completa dos processos fiscais atuais, identificação de gaps de compliance e mapeamento de riscos tributários."
        },
        {
          step: 2,
          title: "Elaboração de Pareceres",
          description: "Desenvolvimento de pareceres técnicos especializados sobre questões complexas, com fundamentação doutrinária e jurisprudencial robusta."
        },
        {
          step: 3,
          title: "Consultas Formais",
          description: "Estruturação e protocolo de consultas junto à Receita Federal e SEFAZ para obter posicionamento oficial sobre interpretações legislativas."
        },
        {
          step: 4,
          title: "Implementação de Controles",
          description: "Desenvolvimento de procedimentos, políticas internas e sistemas de controle para garantir conformidade com obrigações fiscais."
        },
        {
          step: 5,
          title: "Treinamento de Equipes",
          description: "Capacitação das equipes internas sobre obrigações fiscais, novos procedimentos e importância do compliance tributário."
        },
        {
          step: 6,
          title: "Monitoramento Contínuo",
          description: "Acompanhamento das mudanças legislativas, atualização de procedimentos e revisão periódica dos controles implementados."
        }
      ]}
      testimonials={[
        {
          name: "Multinacional de Tecnologia, Head de Tax",
          quote: "O programa de compliance tributário estruturado eliminou 100% das penalidades por atraso e nos deu total controle sobre obrigações em 12 estados. Transformou nossa gestão fiscal."
        },
        {
          name: "Grupo Financeiro Nacional, Diretor de Riscos",
          quote: "Os pareceres especializados nos deram segurança jurídica para implementar estratégias inovadoras de captação e investimento. A fundamentação jurídica é sempre impecável."
        },
        {
          name: "Indústria Automobilística, Gerente Fiscal",
          quote: "As consultas formais esclareceram questões complexas de tributação sobre importação, evitando contingências estimadas em R$ 15 milhões. Estratégia perfeita."
        },
        {
          name: "Holding de Investimentos, CFO",
          quote: "O compliance implementado nos deu tranquilidade total. Reduzimos em 95% as inconsistências em obrigações acessórias e melhoramos nosso relacionamento com o fisco."
        }
      ]}
      faq={[
        {
          question: "Qual a importância de um parecer jurídico tributário?",
          answer: "O parecer fornece análise técnica aprofundada sobre questões complexas, oferecendo segurança jurídica para tomadas de decisão. Ele documenta a fundamentação legal das estratégias adotadas, protegendo a empresa contra questionamentos futuros e demonstrando boa-fé na interpretação da legislação."
        },
        {
          question: "Como funcionam as consultas formais à legislação?",
          answer: "São petições dirigidas aos órgãos fiscais (RFB, SEFAZ) para obter interpretação oficial sobre casos concretos, regulamentadas por Instruções Normativas específicas. A resposta vincula o órgão consultado e suspende a aplicação de multas sobre a matéria consultada."
        },
        {
          question: "O que abrange um programa de compliance tributário?",
          answer: "Inclui mapeamento de obrigações fiscais (SPED, DCTF, ECF, DEFIS), implementação de controles internos, treinamento de equipes, monitoramento de mudanças legislativas, gestão de riscos fiscais e criação de políticas de governança tributária."
        },
        {
          question: "Qual o retorno do investimento em compliance?",
          answer: "O ROI é alto considerando a prevenção de multas, redução de custos com contencioso, otimização de processos e melhoria da reputação corporativa. Empresas compliance-driven atraem mais investimentos e parceiros de negócio."
        },
        {
          question: "Como o compliance ajuda em fiscalizações?",
          answer: "Empresas com compliance estruturado têm fiscalizações mais tranquilas, com documentação organizada, procedimentos claros e menor probabilidade de autuações. Demonstra boa-fé e comprometimento com as obrigações legais."
        }
      ]}
      relatedServices={[
        {
          name: "Auditoria Tributária",
          path: "/servicos/auditoria-tributaria"
        },
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Defesa em Autuações",
          path: "/servicos/defesa-autuacao"
        }
      ]}
      mainAreaPath="/areas/tributario"
    />
  );
};

export default ComplianceTributarioService;
