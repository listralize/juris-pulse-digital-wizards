
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AtosAdministrativosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Atos Administrativos"
      serviceDescription="Cada ato administrativo, de licenças a sanções, deve aderir a parâmetros legais rigorosos. Fornecemos escrutínio legal rigoroso, contestando atos ilegais ou abusivos e validando aqueles que servem aos seus interesses, garantindo que as ações governamentais estejam sempre dentro dos limites da lei."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Análise de Legalidade",
          description: "Avaliação rigorosa da legalidade, legitimidade e moralidade dos atos administrativos, identificando vícios e irregularidades."
        },
        {
          title: "Contestação Estratégica",
          description: "Estratégias eficazes para anulação ou revogação de atos administrativos ilegais, abusivos ou prejudiciais aos interesses."
        },
        {
          title: "Validação e Defesa",
          description: "Defesa da validade de atos administrativos favoráveis, garantindo sua manutenção e eficácia jurídica."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Técnica do Ato",
          description: "Exame detalhado do ato administrativo, verificando pressupostos de validade: competência, forma, motivo, objeto e finalidade."
        },
        {
          step: 2,
          title: "Identificação de Vícios",
          description: "Identificação de vícios de legalidade, legitimidade ou moralidade que possam comprometer a validade do ato administrativo."
        },
        {
          step: 3,
          title: "Estratégia de Impugnação",
          description: "Desenvolvimento de estratégia para contestação via administrativa ou judicial, escolhendo as medidas mais adequadas ao caso."
        },
        {
          step: 4,
          title: "Medidas Cabíveis",
          description: "Ajuizamento de ações anulatórias, mandados de segurança ou recursos administrativos conforme a natureza do vício identificado."
        },
        {
          step: 5,
          title: "Acompanhamento até Decisão Final",
          description: "Monitoramento completo do processo até decisão definitiva, incluindo recursos e execução das decisões favoráveis."
        }
      ]}
      testimonials={[
        {
          name: "Empresa Industrial Ltda",
          quote: "Conseguimos anular multa administrativa de R$ 2 milhões por vício de competência da autoridade que aplicou a penalidade."
        },
        {
          name: "Comerciante Local",
          quote: "A cassação indevida do meu alvará de funcionamento foi revertida através de mandado de segurança com fundamentação técnica impecável."
        },
        {
          name: "Construtora Regional",
          quote: "A defesa da validade da nossa licença ambiental contra tentativa de revogação garantiu a continuidade do projeto de R$ 50 milhões."
        }
      ]}
      faq={[
        {
          question: "Quais são os requisitos de validade dos atos administrativos?",
          answer: "Os atos administrativos devem observar: competência da autoridade, forma prescrita em lei, motivo legítimo, objeto lícito e finalidade pública, conforme princípios da legalidade e moralidade."
        },
        {
          question: "Como contestar um ato administrativo ilegal?",
          answer: "Atos ilegais podem ser contestados via recurso administrativo, ação anulatória, mandado de segurança ou outras medidas judiciais, dependendo da natureza do vício e da urgência."
        },
        {
          question: "Qual a diferença entre anulação e revogação?",
          answer: "Anulação é para atos ilegais (efeitos ex tunc), enquanto revogação é para atos legais que se tornaram inconvenientes (efeitos ex nunc). A anulação pode ser feita pelo Judiciário, a revogação apenas pela Administração."
        },
        {
          question: "Há prazo para contestar atos administrativos?",
          answer: "Sim, há prazos específicos: recursos administrativos têm prazos determinados em lei (geralmente 10-30 dias); ações judiciais seguem prazos prescricionais (5 anos para Fazenda Pública); mandado de segurança tem prazo de 120 dias."
        }
      ]}
      relatedServices={[
        {
          name: "Improbidade Administrativa",
          path: "/servicos/improbidade-administrativa"
        },
        {
          name: "Regulação e Fiscalização",
          path: "/servicos/regulacao-fiscalizacao"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default AtosAdministrativosService;
