
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ProcessosAdministrativosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Processos Administrativos"
      serviceDescription="Representação especializada em processos e procedimentos junto à Administração Pública, defendendo seus direitos e interesses com fundamentação técnica e estratégia jurídica adequada."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Técnica Qualificada",
          description: "Representação por advogados especialistas em direito administrativo, com profundo conhecimento das normas e procedimentos."
        },
        {
          title: "Estratégia Processual Eficiente",
          description: "Desenvolvimento de estratégias personalizadas para cada tipo de processo administrativo, maximizando chances de êxito."
        },
        {
          title: "Redução de Riscos",
          description: "Minimização dos riscos de sanções administrativas, multas e outras penalidades através de defesa técnica adequada."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Inicial do Caso",
          description: "Avaliação detalhada da notificação, auto de infração ou processo administrativo, incluindo prazos e possíveis penalidades."
        },
        {
          step: 2,
          title: "Levantamento de Fundamentos",
          description: "Pesquisa da legislação aplicável, precedentes administrativos e jurisprudenciais relacionados ao caso específico."
        },
        {
          step: 3,
          title: "Elaboração da Defesa",
          description: "Preparação de defesas, recursos ou petições com argumentação técnica sólida e provas documentais pertinentes."
        },
        {
          step: 4,
          title: "Representação em Audiências",
          description: "Acompanhamento em oitivas, perícias, inspeções e audiências administrativas, protegendo seus interesses em todas as etapas."
        },
        {
          step: 5,
          title: "Recursos Administrativos",
          description: "Interposição de recursos às instâncias superiores quando necessário, esgotando todas as possibilidades na esfera administrativa."
        }
      ]}
      testimonials={[
        {
          name: "Empresa XYZ Engenharia",
          quote: "Conseguimos reverter completamente uma multa ambiental milionária graças à defesa técnica que demonstrou o cumprimento de todas as normas aplicáveis."
        },
        {
          name: "José S., Comerciante",
          quote: "Após receber uma notificação de fechamento do estabelecimento, a intervenção jurídica adequada não só manteve meu negócio aberto como regularizou a situação definitivamente."
        },
        {
          name: "Construtora Horizonte",
          quote: "O suporte nos processos junto à Prefeitura desbloqueou licenças que estavam pendentes há meses, permitindo o início imediato de nossas obras."
        }
      ]}
      faq={[
        {
          question: "Quais são os prazos para defesa em processos administrativos?",
          answer: "Os prazos variam conforme o tipo de processo e o órgão público envolvido. Na esfera federal, a Lei 9.784/99 estabelece prazo de 10 dias para manifestação em geral, podendo ser prorrogado por igual período. Em processos específicos, como tributários, ambientais ou sanitários, os prazos podem ser diferentes, normalmente variando entre 15 e 30 dias. É crucial verificar o prazo específico em cada notificação recebida."
        },
        {
          question: "É possível recorrer de uma decisão administrativa desfavorável?",
          answer: "Sim. O princípio do duplo grau de jurisdição também se aplica à esfera administrativa. Geralmente, pode-se recorrer à autoridade superior àquela que proferiu a decisão, seguindo a hierarquia do órgão público. Esgotados os recursos administrativos, também é possível questionar a decisão na via judicial, especialmente se houve ilegalidade no processo ou na decisão."
        },
        {
          question: "O que é um Processo Administrativo Disciplinar (PAD) e como funciona?",
          answer: "O PAD é um procedimento formal destinado a apurar responsabilidades de servidores públicos por infrações cometidas no exercício de suas funções. Ele segue fases específicas: instauração (portaria inicial), instrução (coleta de provas e oitivas), defesa, relatório final da comissão processante e julgamento pela autoridade competente. É assegurado ao servidor o direito à ampla defesa e ao contraditório durante todo o processo."
        }
      ]}
      relatedServices={[
        {
          name: "Licitações e Contratos Públicos",
          path: "/servicos/licitacoes-contratos"
        },
        {
          name: "Atos Administrativos",
          path: "/servicos/atos-administrativos"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default ProcessosAdministrativosService;
