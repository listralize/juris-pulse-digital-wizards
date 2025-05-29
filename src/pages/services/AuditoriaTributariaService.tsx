
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AuditoriaTributariaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Auditoria Tributária"
      serviceDescription="Revisão completa da situação fiscal da empresa para identificar riscos, oportunidades de otimização e garantir conformidade com a legislação tributária vigente."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação de Riscos",
          description: "Detecção precoce de irregularidades e exposições fiscais que podem gerar autuações futuras."
        },
        {
          title: "Oportunidades de Economia",
          description: "Descoberta de créditos não aproveitados, benefícios não utilizados e possibilidades de otimização tributária."
        },
        {
          title: "Conformidade Legal",
          description: "Verificação do cumprimento de todas as obrigações tributárias e adequação às normas vigentes."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Planejamento da Auditoria",
          description: "Definição do escopo, período a ser analisado e metodologia a ser aplicada na auditoria tributária."
        },
        {
          step: 2,
          title: "Coleta e Análise de Dados",
          description: "Levantamento de documentos fiscais, contratos, demonstrações financeiras e demais informações relevantes."
        },
        {
          step: 3,
          title: "Execução dos Testes",
          description: "Aplicação de procedimentos de auditoria para verificar a correção dos cálculos e cumprimento das obrigações."
        },
        {
          step: 4,
          title: "Relatório de Achados",
          description: "Elaboração de relatório detalhado com identificação de riscos, oportunidades e recomendações de melhorias."
        },
        {
          step: 5,
          title: "Plano de Ação",
          description: "Desenvolvimento de cronograma para implementação das correções e melhorias identificadas."
        }
      ]}
      testimonials={[
        {
          name: "Grupo Empresarial Delta",
          quote: "A auditoria tributária identificou riscos de R$ 800 mil em contingências e oportunidades de economia de R$ 400 mil anuais."
        },
        {
          name: "Indústria Química Omega",
          quote: "Descobrimos através da auditoria créditos de ICMS não aproveitados no valor de R$ 1,2 milhão dos últimos 3 anos."
        },
        {
          name: "Holding de Investimentos",
          quote: "A auditoria nos deu a segurança de que estávamos em conformidade e ainda identificou formas de otimizar nossa estrutura tributária."
        }
      ]}
      faq={[
        {
          question: "Com que frequência deve ser realizada uma auditoria tributária?",
          answer: "Recomenda-se auditoria tributária anual para empresas de grande porte, a cada 2-3 anos para médias empresas, e ao menos uma vez durante o prazo decadencial (5 anos) para pequenas empresas. Também deve ser realizada antes de operações especiais como fusões, aquisições ou IPOs, e quando há mudanças significativas na legislação."
        },
        {
          question: "Quais documentos são necessários para a auditoria tributária?",
          answer: "São necessários: livros fiscais e contábeis, declarações tributárias (DCTF, ECF, EFD-ICMS/IPI, EFD-Contribuições), guias de recolhimento, contratos relevantes, demonstrações financeiras, documentos de constituição e alterações societárias, correspondências com o fisco, e procurações. A lista específica pode variar conforme o escopo da auditoria."
        },
        {
          question: "A auditoria tributária pode ser feita durante uma fiscalização?",
          answer: "Sim, e é altamente recomendável. Durante uma fiscalização, a auditoria pode identificar pontos de defesa, verificar a correção dos questionamentos do fisco, preparar documentação de apoio e estratégias para minimizar eventuais autuações. É uma ferramenta importante para reduzir riscos e custos durante o processo fiscalizatório."
        }
      ]}
      relatedServices={[
        {
          name: "Elisão Fiscal",
          path: "/servicos/elisao-fiscal"
        },
        {
          name: "Compliance Tributário",
          path: "/servicos/compliance-tributario"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default AuditoriaTributariaService;
