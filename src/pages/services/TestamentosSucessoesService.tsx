
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const TestamentosSucessoesService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito da Família"
      serviceName="Testamentos e Sucessões"
      serviceDescription="Planejamento sucessório completo, elaboração de testamentos e resolução de questões sucessórias, garantindo que sua vontade seja respeitada e seu patrimônio seja transmitido conforme seus desejos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Planejamento Personalizado",
          description: "Estratégias sucessórias adaptadas à sua realidade patrimonial e familiar, respeitando seus desejos e valores."
        },
        {
          title: "Segurança Jurídica",
          description: "Documentos elaborados com rigor técnico para minimizar contestações e garantir que sua vontade seja cumprida."
        },
        {
          title: "Otimização Tributária",
          description: "Planejamento que visa reduzir a carga tributária sobre a transmissão patrimonial, preservando ao máximo o patrimônio familiar."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Gratuita",
          description: "Realizamos uma análise preliminar da sua situação patrimonial e familiar, entendendo seus objetivos para a sucessão."
        },
        {
          step: 2,
          title: "Diagnóstico Sucessório",
          description: "Elaboramos um diagnóstico detalhado da sua situação sucessória, identificando possíveis riscos e oportunidades."
        },
        {
          step: 3,
          title: "Elaboração da Estratégia",
          description: "Desenvolvemos uma estratégia personalizada de planejamento sucessório, incluindo a preparação de testamentos e outros instrumentos jurídicos."
        },
        {
          step: 4,
          title: "Formalização dos Instrumentos",
          description: "Redigimos e formalizamos todos os documentos necessários, como testamentos, doações, holdings familiares e outros."
        },
        {
          step: 5,
          title: "Revisão e Acompanhamento",
          description: "Realizamos revisões periódicas do planejamento sucessório para adaptá-lo a mudanças na legislação ou na sua situação familiar e patrimonial."
        }
      ]}
      testimonials={[
        {
          name: "Carlos E.",
          quote: "O planejamento sucessório me deu a tranquilidade de saber que meu patrimônio, construído ao longo de décadas, será transmitido exatamente como desejo, protegendo meus filhos e netos."
        },
        {
          name: "Juliana M.",
          quote: "Como empresária, estava preocupada com a continuidade dos negócios após meu falecimento. O planejamento sucessório resolveu essa questão de forma brilhante."
        },
        {
          name: "Ricardo e Laura",
          quote: "A elaboração do testamento conjunto nos permitiu prever situações que não havíamos considerado e garantir que nossos filhos estariam protegidos em qualquer circunstância."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre testamento público e particular?",
          answer: "O testamento público é lavrado em cartório, na presença de um tabelião e testemunhas. O particular é escrito e assinado pelo próprio testador. Embora o testamento público tenha custos mais elevados, oferece maior segurança jurídica e menor risco de contestação futura."
        },
        {
          question: "Posso deserdar um herdeiro necessário?",
          answer: "A deserdação de herdeiros necessários (descendentes, ascendentes e cônjuge) só é possível em casos específicos previstos em lei, como indignidade, abandono ou agressão. É um processo complexo que exige fundamentação sólida e deve ser cuidadosamente planejado."
        },
        {
          question: "Como proteger o patrimônio empresarial na sucessão?",
          answer: "Existem diversos mecanismos, como a criação de holdings familiares, acordos de acionistas com cláusulas sucessórias, doações com reserva de usufruto e protocolos familiares. A estratégia ideal depende do tamanho e complexidade do negócio e da estrutura familiar."
        }
      ]}
      relatedServices={[
        {
          name: "Inventário e Partilha",
          path: "/servicos/inventario-partilha"
        },
        {
          name: "Casamento e União Estável",
          path: "/servicos/casamento-uniao-estavel"
        }
      ]}
      mainAreaPath="/familia"
    />
  );
};

export default TestamentosSucessoesService;
