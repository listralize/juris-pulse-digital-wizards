
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ContratosEmpresariaisService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Contratos Empresariais"
      serviceDescription="Elaboração, análise e negociação de contratos comerciais, de fornecimento, distribuição e parcerias estratégicas, protegendo seus interesses e minimizando riscos jurídicos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Jurídica Completa",
          description: "Contratos estruturados para proteger seus interesses e minimizar riscos em todas as relações comerciais."
        },
        {
          title: "Negociação Estratégica",
          description: "Suporte na negociação de termos contratuais favoráveis, equilibrando interesses e viabilidade do negócio."
        },
        {
          title: "Conformidade Regulatória",
          description: "Garantia de que todos os contratos estejam em conformidade com a legislação aplicável e normas setoriais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Necessidade",
          description: "Entendimento detalhado da operação comercial e identificação dos pontos críticos a serem abordados no contrato."
        },
        {
          step: 2,
          title: "Estruturação Jurídica",
          description: "Elaboração da minuta contratual com cláusulas apropriadas para proteger os interesses e regular a relação."
        },
        {
          step: 3,
          title: "Negociação e Ajustes",
          description: "Suporte durante as negociações com a contraparte, propondo alternativas e ajustes que preservem seus interesses."
        },
        {
          step: 4,
          title: "Revisão Final",
          description: "Análise criteriosa da versão final do contrato antes da assinatura, verificando todos os aspectos legais."
        },
        {
          step: 5,
          title: "Acompanhamento da Execução",
          description: "Suporte durante a execução contratual, incluindo interpretação de cláusulas e resolução de divergências."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Nacional",
          quote: "Os contratos de fornecimento elaborados protegeram nossa empresa em uma disputa comercial complexa, garantindo o cumprimento dos termos acordados."
        },
        {
          name: "TechStart Solutions",
          quote: "A estruturação dos contratos de parceria foi fundamental para o crescimento da nossa startup, criando relações sólidas e protegidas."
        },
        {
          name: "Comércio Regional LTDA",
          quote: "A negociação assistida resultou em contratos muito mais favoráveis, melhorando nossa margem e reduzindo nossos riscos operacionais."
        }
      ]}
      faq={[
        {
          question: "Quais são os tipos de contratos empresariais mais comuns?",
          answer: "Os principais tipos incluem: contratos de compra e venda, fornecimento, prestação de serviços, distribuição, franquia, parceria, joint venture, locação comercial, contratos de trabalho especializados, licenciamento, e contratos de tecnologia. Cada tipo tem peculiaridades específicas que devem ser consideradas na elaboração."
        },
        {
          question: "É possível incluir cláusula de resolução alternativa de conflitos?",
          answer: "Sim, e é altamente recomendável. Podem ser incluídas cláusulas de mediação, arbitragem ou outros métodos alternativos de resolução de disputas. Essas cláusulas podem economizar tempo e custos em caso de conflitos, além de preservar o relacionamento comercial entre as partes."
        },
        {
          question: "Como garantir o cumprimento das obrigações contratuais?",
          answer: "Algumas estratégias incluem: definição clara de obrigações e prazos, estabelecimento de garantias (fiança, seguro-garantia, etc.), cláusulas de penalidade pelo descumprimento, direito de retenção, cláusula resolutória, e mecanismos de acompanhamento da execução. A escolha depende do tipo de contrato e risco envolvido."
        }
      ]}
      relatedServices={[
        {
          name: "Constituição de Empresas",
          path: "/servicos/constituicao-empresas"
        },
        {
          name: "Fusões e Aquisições",
          path: "/servicos/fusoes-aquisicoes"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default ContratosEmpresariaisService;
