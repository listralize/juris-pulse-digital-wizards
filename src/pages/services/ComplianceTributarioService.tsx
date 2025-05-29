
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ComplianceTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Consultas, Pareceres e Compliance Tributário"
      serviceDescription="Oferecemos assessoria preventiva e estratégica para suas operações, garantindo conformidade e segurança jurídica através de pareceres especializados, consultas formais e programas de compliance tributário estruturados."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Pareceres Jurídicos Especializados",
          description: "Documentos técnicos aprofundados com análise de fatos, normas, jurisprudência e doutrina, fornecendo segurança para tomadas de decisão estratégicas."
        },
        {
          title: "Consultas Formais à Legislação",
          description: "Formalização de consultas junto aos órgãos competentes (Receita Federal, SEFAZ) para obter interpretação oficial da legislação aplicável."
        },
        {
          title: "Compliance Tributário Estruturado",
          description: "Implementação de programas de conformidade fiscal baseados na Lei Anticorrupção (Lei nº 12.846/2013) e princípios de governança corporativa."
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
          title: "Monitoramento Contínuo",
          description: "Acompanhamento das mudanças legislativas, atualização de procedimentos e revisão periódica dos controles implementados."
        }
      ]}
      testimonials={[
        {
          name: "Multinacional de Tecnologia",
          quote: "O programa de compliance tributário estruturado eliminou 100% das penalidades por atraso e nos deu total controle sobre obrigações em 12 estados."
        },
        {
          name: "Grupo Financeiro Nacional",
          quote: "Os pareceres especializados nos deram segurança jurídica para implementar estratégias inovadoras de captação e investimento."
        },
        {
          name: "Indústria Automobilística",
          quote: "As consultas formais esclareceram questões complexas de tributação sobre importação, evitando contingências de R$ 15 milhões."
        }
      ]}
      faq={[
        {
          question: "Qual a importância de um parecer jurídico tributário?",
          answer: "O parecer fornece análise técnica aprofundada sobre questões complexas, oferecendo segurança jurídica para tomadas de decisão. Ele documenta a fundamentação legal das estratégias adotadas, protegendo a empresa contra questionamentos futuros e demonstrando boa-fé na interpretação da legislação."
        },
        {
          question: "Como funcionam as consultas formais à legislação?",
          answer: "São petições dirigidas aos órgãos fiscais (RFB, SEFAZ) para obter interpretação oficial sobre casos concretos, regulamentadas por Instruções Normativas específicas. A resposta vincula o órgão consultado e suspende a aplicação de multas sobre a matéria consultada, proporcionando segurança jurídica máxima."
        },
        {
          question: "O que abrange um programa de compliance tributário?",
          answer: "Inclui mapeamento de obrigações fiscais (SPED, DCTF, ECF, DEFIS), implementação de controles internos, treinamento de equipes, monitoramento de mudanças legislativas, gestão de riscos fiscais e criação de políticas de governança. O objetivo é prevenir irregularidades e otimizar processos fiscais."
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
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default ComplianceTributarioService;
