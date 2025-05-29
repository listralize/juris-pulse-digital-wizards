
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ADOService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="ADI por Omissão (ADO)"
      serviceDescription="Quando o legislador silencia diante de comando constitucional, a ADO é nossa voz. Impetramos ADI por Omissão no STF para combater a inércia inconstitucional que paralisa direitos e garantias. Não aceitamos que omissões legislativas tornem a Constituição letra morta. Exigimos que o Poder Público cumpra seu dever constitucional."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Combate à Omissão Inconstitucional",
          description: "Instrumento específico para atacar a inércia do Poder Público em regulamentar dispositivos constitucionais, forçando cumprimento da Constituição."
        },
        {
          title: "Efetivação de Direitos Constitucionais",
          description: "Transformação de direitos constitucionais não regulamentados em direitos exercíveis, superando bloqueios legislativos."
        },
        {
          title: "Controle de Constitucionalidade por Omissão",
          description: "Modalidade especial de controle que responsabiliza o Poder Público por sua inação diante de comandos constitucionais expressos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação da Omissão Constitucional",
          description: "Demonstração clara de que existe comando constitucional não regulamentado e que essa omissão compromete eficácia de direitos."
        },
        {
          step: 2,
          title: "Análise da Mora Legislativa",
          description: "Comprovação de que o tempo transcorrido caracteriza mora inconstitucional do órgão competente para legislar."
        },
        {
          step: 3,
          title: "Fundamentação da Necessidade",
          description: "Demonstração de que a ausência da norma efetivamente inviabiliza exercício de direitos constitucionais."
        },
        {
          step: 4,
          title: "Impetração no STF",
          description: "Protocolo da ação com fundamentação técnica demonstrando a omissão e seus efeitos constitucionalmente inaceitáveis."
        },
        {
          step: 5,
          title: "Acompanhamento e Cobrança",
          description: "Monitoramento do cumprimento da decisão e cobrança da efetiva regulamentação pelo órgão competente."
        }
      ]}
      testimonials={[
        {
          name: "Conselho Federal da OAB",
          quote: "A ADO garantiu que direito constitucional há décadas sem regulamentação fosse finalmente efetivado pelo Congresso Nacional."
        },
        {
          name: "Confederação de Servidores",
          quote: "Através da ADO, conseguimos forçar regulamentação de direitos funcionais constitucionais que eram negados por omissão legislativa."
        }
      ]}
      faq={[
        {
          question: "O que caracteriza omissão inconstitucional?",
          answer: "A ausência de regulamentação necessária para tornar efetiva norma constitucional, quando essa omissão compromete direitos ou princípios constitucionais e já decorreu prazo razoável."
        },
        {
          question: "Qual o efeito da procedência da ADO?",
          answer: "O STF declara a mora e notifica o órgão competente para elaborar a norma. Pode fixar prazo e, em casos excepcionais, determinar medidas para garantir efetividade dos direitos."
        },
        {
          question: "ADO difere do Mandado de Injunção?",
          answer: "Sim. ADO tem controle abstrato (efeitos erga omnes), enquanto Mandado de Injunção protege direito subjetivo individual ou coletivo (efeitos inter partes)."
        }
      ]}
      relatedServices={[
        {
          name: "Mandado de Injunção",
          path: "/servicos/mandado-injuncao"
        },
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default ADOService;
