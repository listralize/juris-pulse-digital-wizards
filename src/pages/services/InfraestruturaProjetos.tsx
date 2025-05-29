
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const InfraestruturaProjetos = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Infraestrutura e Projetos Governamentais"
      serviceDescription="Grandes projetos de infraestrutura e parcerias governamentais são a espinha dorsal do desenvolvimento nacional. Oferecemos expertise inigualável na estruturação, modelagem e execução de projetos complexos, incluindo concessões, PPPs e privatizações, garantindo que seus empreendimentos sejam legalmente robustos e estrategicamente sólidos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Estruturação de PPPs e Concessões",
          description: "Expertise na modelagem jurídica de Parcerias Público-Privadas e concessões, garantindo segurança jurídica e viabilidade econômica."
        },
        {
          title: "Due Diligence Especializada",
          description: "Análise jurídica aprofundada de projetos de infraestrutura, identificando riscos e oportunidades para otimização dos investimentos."
        },
        {
          title: "Gestão Contratual Complexa",
          description: "Assessoria na gestão de contratos de longo prazo, modificações, reequilíbrios e resolução de disputas em projetos de grande porte."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Viabilidade Jurídica",
          description: "Avaliação da viabilidade jurídica do projeto, identificando marcos regulatórios aplicáveis e estrutura legal adequada."
        },
        {
          step: 2,
          title: "Modelagem Jurídica",
          description: "Desenvolvimento da modelagem jurídica do projeto, definindo instrumentos contratuais e arranjos societários necessários."
        },
        {
          step: 3,
          title: "Estruturação de Garantias",
          description: "Criação de estrutura de garantias adequada ao projeto, incluindo garantias públicas e privadas para mitigação de riscos."
        },
        {
          step: 4,
          title: "Negociação e Documentação",
          description: "Condução de negociações contratuais e elaboração de documentação jurídica completa do projeto."
        },
        {
          step: 5,
          title: "Gestão e Acompanhamento",
          description: "Assessoria contínua durante execução do projeto, incluindo modificações contratuais e resolução de disputas."
        }
      ]}
      testimonials={[
        {
          name: "Consórcio de Infraestrutura",
          quote: "A estruturação jurídica da PPP de mobilidade urbana foi fundamental para viabilizar investimento de R$ 5 bilhões com segurança jurídica total."
        },
        {
          name: "Investidor Internacional",
          quote: "A due diligence conduzida identificou todos os riscos regulatórios, permitindo decisão de investimento informada em projeto portuário."
        },
        {
          name: "Empresa de Energia",
          quote: "A assessoria na concessão de transmissão garantiu aprovação regulatória e estruturação financeira adequada ao projeto de R$ 2 bilhões."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre concessão e PPP?",
          answer: "Concessão envolve delegação de serviço público com remuneração por tarifa dos usuários. PPP é parceria com compartilhamento de investimentos, riscos e receitas entre público e privado."
        },
        {
          question: "Como funciona a estruturação de garantias em projetos de infraestrutura?",
          answer: "Envolve combinação de garantias públicas (contragarantias, seguros, fundos garantidores) e privadas (garantias corporativas, seguros de performance) adequadas ao perfil de risco do projeto."
        },
        {
          question: "Quais são os principais riscos em projetos de infraestrutura?",
          answer: "Riscos regulatórios, de demanda, de construção, financeiros, ambientais e políticos. A modelagem adequada busca alocar cada risco à parte mais capaz de geri-lo."
        },
        {
          question: "Como resolver disputas em contratos de longo prazo?",
          answer: "Através de mecanismos alternativos como mediação e arbitragem, previstos contratualmente, permitindo resolução mais rápida e especializada que o Judiciário tradicional."
        }
      ]}
      relatedServices={[
        {
          name: "Gestão de Contratos Públicos",
          path: "/servicos/gestao-contratos-publicos"
        },
        {
          name: "Consultoria em Direito Administrativo",
          path: "/servicos/consultoria-administrativo"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default InfraestruturaProjetos;
