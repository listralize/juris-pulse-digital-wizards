
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AuditoriaTributariaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Auditoria Tributária Especializada"
      serviceDescription="Revisão completa e estratégica da situação fiscal da empresa para identificar riscos, oportunidades de otimização e garantir conformidade com a legislação tributária vigente."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação de Riscos Fiscais",
          description: "Detecção precoce de irregularidades e exposições fiscais que podem gerar autuações futuras, permitindo correção preventiva.",
          icon: "🚨"
        },
        {
          title: "Oportunidades de Economia",
          description: "Descoberta de créditos não aproveitados, benefícios não utilizados e possibilidades de otimização tributária não identificadas anteriormente.",
          icon: "💰"
        },
        {
          title: "Conformidade Legal Completa",
          description: "Verificação do cumprimento de todas as obrigações tributárias e adequação às normas vigentes em todas as esferas.",
          icon: "✅"
        },
        {
          title: "Melhoria de Processos",
          description: "Identificação de falhas nos controles internos e sugestões de melhorias nos processos fiscais da empresa.",
          icon: "⚙️"
        },
        {
          title: "Preparação para Fiscalizações",
          description: "Organização da documentação e processos para enfrentar eventual fiscalização com maior segurança e tranquilidade.",
          icon: "🛡️"
        },
        {
          title: "Relatório Executivo Detalhado",
          description: "Documento completo com achados, recomendações e plano de ação para implementação de melhorias identificadas.",
          icon: "📊"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Planejamento da Auditoria",
          description: "Definição do escopo, período a ser analisado, metodologia a ser aplicada e cronograma de execução da auditoria tributária."
        },
        {
          step: 2,
          title: "Coleta e Análise de Dados",
          description: "Levantamento de documentos fiscais, contratos, demonstrações financeiras, obrigações acessórias e demais informações relevantes."
        },
        {
          step: 3,
          title: "Execução dos Testes",
          description: "Aplicação de procedimentos de auditoria para verificar a correção dos cálculos, cumprimento das obrigações e conformidade legal."
        },
        {
          step: 4,
          title: "Análise de Conformidade",
          description: "Verificação do cumprimento de obrigações principais e acessórias, identificação de inconsistências e avaliação de riscos."
        },
        {
          step: 5,
          title: "Relatório de Achados",
          description: "Elaboração de relatório detalhado com identificação de riscos, oportunidades, não conformidades e recomendações de melhorias."
        },
        {
          step: 6,
          title: "Plano de Ação",
          description: "Desenvolvimento de cronograma para implementação das correções e melhorias identificadas, com priorização dos achados."
        }
      ]}
      testimonials={[
        {
          name: "Grupo Empresarial Delta, Diretor Fiscal",
          quote: "A auditoria tributária identificou riscos de R$ 800 mil em contingências e oportunidades de economia de R$ 400 mil anuais. O retorno do investimento foi imediato e o relatório excepcional."
        },
        {
          name: "Indústria Química Omega, CFO",
          quote: "Descobrimos através da auditoria créditos de ICMS não aproveitados no valor de R$ 1,2 milhão dos últimos 3 anos. Uma descoberta que transformou nosso fluxo de caixa."
        },
        {
          name: "Holding de Investimentos, Controller",
          quote: "A auditoria nos deu a segurança de que estávamos em conformidade e ainda identificou formas de otimizar nossa estrutura tributária. Processo muito profissional e detalhado."
        },
        {
          name: "Rede Varejista Regional, Gerente Fiscal",
          quote: "A auditoria preventiva nos preparou perfeitamente para uma fiscalização posterior. Todos os pontos foram organizados antecipadamente, evitando qualquer autuação."
        }
      ]}
      faq={[
        {
          question: "Com que frequência deve ser realizada uma auditoria tributária?",
          answer: "Recomenda-se auditoria tributária anual para empresas de grande porte, a cada 2-3 anos para médias empresas, e ao menos uma vez durante o prazo decadencial (5 anos) para pequenas empresas. Também deve ser realizada antes de operações especiais como fusões, aquisições ou IPOs."
        },
        {
          question: "Quais documentos são necessários para a auditoria tributária?",
          answer: "São necessários: livros fiscais e contábeis, declarações tributárias (DCTF, ECF, EFD-ICMS/IPI, EFD-Contribuições), guias de recolhimento, contratos relevantes, demonstrações financeiras, documentos societários e correspondências com o fisco."
        },
        {
          question: "A auditoria tributária pode ser feita durante uma fiscalização?",
          answer: "Sim, e é altamente recomendável. Durante uma fiscalização, a auditoria pode identificar pontos de defesa, verificar a correção dos questionamentos do fisco, preparar documentação de apoio e estratégias para minimizar eventuais autuações."
        },
        {
          question: "Qual a diferença entre auditoria interna e externa?",
          answer: "Auditoria interna é feita pela própria empresa, enquanto a externa é realizada por especialistas independentes. A externa oferece visão imparcial, expertise especializada e credibilidade maior, especialmente para investidores e financiadores."
        },
        {
          question: "Como a auditoria pode descobrir créditos tributários?",
          answer: "Através da análise detalhada de operações, identificamos créditos não aproveitados de PIS/COFINS, ICMS, IPI, contribuições previdenciárias, além de benefícios fiscais não utilizados e compensações possíveis."
        }
      ]}
      relatedServices={[
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Compliance Tributário",
          path: "/servicos/compliance-tributario"
        },
        {
          name: "Recuperação de Tributos",
          path: "/servicos/recuperacao-tributos"
        }
      ]}
      mainAreaPath="/areas/tributario"
    />
  );
};

export default AuditoriaTributariaService;
