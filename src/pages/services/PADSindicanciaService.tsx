
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PADSindicanciaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Processos Administrativos Disciplinares (PAD) e Sindicâncias"
      serviceDescription="Para servidores públicos que enfrentam processos administrativos disciplinares (PAD) ou sindicâncias, sua carreira e reputação estão em jogo. Fornecemos uma defesa inabalável em todas as fases, desde a investigação inicial até o recurso final, garantindo o devido processo legal e protegendo seus direitos contra ações arbitrárias."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Defesa Técnica Especializada",
          description: "Atuação especializada em defesa de servidores públicos em PAD e sindicâncias, com conhecimento aprofundado do regime disciplinar."
        },
        {
          title: "Acompanhamento Integral do Processo",
          description: "Assessoria completa desde a instauração até o julgamento final, garantindo observância do devido processo legal."
        },
        {
          title: "Proteção de Carreira e Reputação",
          description: "Estratégias focadas na preservação da carreira, estabilidade e reputação profissional do servidor público."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Instauração",
          description: "Avaliação da legalidade da instauração do processo, verificando pressupostos legais e vícios procedimentais."
        },
        {
          step: 2,
          title: "Acompanhamento da Instrução",
          description: "Participação ativa na fase instrutória, requerendo provas, oitiva de testemunhas e produção de documentos de defesa."
        },
        {
          step: 3,
          title: "Elaboração de Defesa",
          description: "Preparação de defesa técnica robusta, contestando acusações e demonstrando inexistência de infração disciplinar."
        },
        {
          step: 4,
          title: "Recursos Administrativos",
          description: "Interposição de recursos hierárquicos e revisão, buscando reforma ou anulação de decisões desfavoráveis."
        },
        {
          step: 5,
          title: "Medidas Judiciais",
          description: "Quando necessário, ajuizamento de ações judiciais para anulação de processos viciados ou proteção de direitos."
        }
      ]}
      testimonials={[
        {
          name: "Servidor Federal João",
          quote: "Meu PAD foi arquivado após defesa técnica que demonstrou a inconsistência das acusações. Minha carreira e reputação foram preservadas."
        },
        {
          name: "Servidora Municipal Maria",
          quote: "A defesa especializada conseguiu reduzir a penalidade de demissão para advertência, salvando minha estabilidade no serviço público."
        },
        {
          name: "Servidor Estadual Carlos",
          quote: "O acompanhamento profissional durante toda a sindicância garantiu que meus direitos fossem respeitados e o processo foi arquivado por falta de provas."
        }
      ]}
      faq={[
        {
          question: "Quais são os direitos do servidor em processo disciplinar?",
          answer: "O servidor tem direito à ampla defesa, contraditório, assistência técnica, produção de provas, ciência de todos os atos processuais e prazo adequado para defesa, conforme garantias constitucionais."
        },
        {
          question: "É possível anular um processo administrativo disciplinar?",
          answer: "Sim, processos podem ser anulados quando apresentam vícios como incompetência da autoridade, cerceamento de defesa, ausência de fundamentação ou inobservância do devido processo legal."
        },
        {
          question: "Qual a diferença entre sindicância e PAD?",
          answer: "Sindicância é procedimento investigativo que pode resultar em arquivamento ou instauração de PAD. O PAD é processo formal que pode resultar em penalidades como advertência, suspensão ou demissão."
        },
        {
          question: "Como funciona o prazo prescricional em infrações disciplinares?",
          answer: "A prescrição varia conforme a penalidade: 5 anos para demissão, cassação de aposentadoria e indisponibilidade de bens; 2 anos para suspensão; 180 dias para advertência, contados da data do fato ou conhecimento."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos dos Servidores Públicos",
          path: "/servicos/direitos-servidores"
        },
        {
          name: "Improbidade Administrativa",
          path: "/servicos/improbidade-administrativa"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default PADSindicanciaService;
