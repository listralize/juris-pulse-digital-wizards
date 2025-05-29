
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const HabeasCorpusService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Habeas Corpus"
      serviceDescription="A liberdade não é um privilégio; é um direito fundamental. Quando ela é ameaçada, o Habeas Corpus é o martelo. Defendemos a liberdade de locomoção contra prisões ilegais ou ameaças à liberdade individual, seja por abuso de poder ou ilegalidade, em todas as instâncias. A liberdade do cliente é a prioridade máxima, e ela será defendida com a força que for necessária."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Constitucional da Liberdade",
          description: "O habeas corpus é a garantia constitucional mais antiga para proteger a liberdade de locomoção contra prisões ilegais, coação ou ameaça de privação de liberdade."
        },
        {
          title: "Procedimento Urgente e Prioritário",
          description: "Ação de rito especial e urgente que tramita em regime de prioridade absoluta, garantindo análise imediata pelo Poder Judiciário."
        },
        {
          title: "Modalidades Preventiva e Liberatória",
          description: "Atuamos tanto de forma preventiva (habeas corpus preventivo) quanto para libertar pessoa já presa ilegalmente (habeas corpus liberatório)."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Situação de Constrangimento",
          description: "Avaliamos se existe constrangimento ilegal à liberdade de locomoção, seja efetivo (prisão) ou iminente (ameaça), identificando a ilegalidade."
        },
        {
          step: 2,
          title: "Identificação da Autoridade Coatora",
          description: "Determinamos qual autoridade é responsável pelo constrangimento ilegal - delegado, juiz, promotor ou qualquer agente público."
        },
        {
          step: 3,
          title: "Estratégia Processual Adequada",
          description: "Definimos se o caso demanda habeas corpus preventivo ou liberatório, e qual a instância competente para julgamento."
        },
        {
          step: 4,
          title: "Impetração Imediata",
          description: "Elaboramos e protocolamos a petição com urgência máxima, fundamentando juridicamente a ilegalidade e requerendo liminar quando cabível."
        },
        {
          step: 5,
          title: "Acompanhamento Integral",
          description: "Monitoramos o processo em tempo real, comparecemos a audiências e, se necessário, interpomos recursos para garantir a liberdade do paciente."
        }
      ]}
      testimonials={[
        {
          name: "Família Rodriguez",
          quote: "Nosso filho foi preso ilegalmente em flagrante forjado. O habeas corpus foi deferido em 24 horas, garantindo sua liberdade e dignidade. Justiça rápida quando mais precisávamos."
        },
        {
          name: "Empresário Carlos Mendes",
          quote: "O habeas corpus preventivo me protegeu de prisão preventiva desnecessária em investigação criminal. Pude responder ao processo em liberdade, preservando minha empresa e família."
        },
        {
          name: "Advogada Dra. Patricia Lima",
          quote: "Sofri ameaça de prisão por cumprimento do dever profissional. O habeas corpus preventivo garantiu meu direito de exercer a advocacia sem intimidações."
        }
      ]}
      faq={[
        {
          question: "Quando cabe habeas corpus?",
          answer: "Cabe habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder. Inclui prisões ilegais, excesso de prazo, constrangimento ilegal."
        },
        {
          question: "Qual a diferença entre habeas corpus preventivo e liberatório?",
          answer: "O preventivo é impetrado quando há ameaça à liberdade (salvo-conduto), enquanto o liberatório visa libertar pessoa já presa ilegalmente. Ambos protegem o direito fundamental de ir e vir."
        },
        {
          question: "Quem pode impetrar habeas corpus?",
          answer: "Qualquer pessoa pode impetrar habeas corpus em favor próprio ou de terceiro, mesmo sem ser advogado. É uma garantia constitucional acessível a todos, sem formalidades excessivas."
        },
        {
          question: "Há prazo para impetrar habeas corpus?",
          answer: "Não há prazo decadencial para habeas corpus. Enquanto perdurar o constrangimento ilegal ou a ameaça à liberdade, é possível a impetração da ação constitucional."
        }
      ]}
      relatedServices={[
        {
          name: "Mandado de Segurança",
          path: "/servicos/mandado-seguranca"
        },
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default HabeasCorpusService;
