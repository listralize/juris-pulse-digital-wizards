
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const FusoesAquisicoesService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Fusões e Aquisições"
      serviceDescription="No jogo de alto risco das Fusões e Aquisições, a vitória é para quem pensa mais rápido e executa com mais precisão. Cada movimento é orquestrado para garantir que a expansão seja tão audaciosa quanto lucrativa. Uma fusão ou aquisição não é um acordo; é uma conquista."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Estratégia de Conquista de Mercado",
          description: "Cada operação é orquestrada como um golpe de mestre para consolidação de mercado, vantagem competitiva e crescimento estratégico que altera fundamentalmente sua posição de domínio."
        },
        {
          title: "Due Diligence Implacável",
          description: "Investigação que vai além da superfície, revelando riscos ocultos e oportunidades inexploradas. Cada aspecto é examinado com precisão cirúrgica para garantir domínio total da transação."
        },
        {
          title: "Negociação de Elite",
          description: "Suporte técnico que transcende o jurídico, atuando como estrategista de M&A para conduzir negociações que maximizam valor e minimizam riscos em cada etapa decisiva."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Planejamento de Conquista",
          description: "Definição de estratégia de M&A que visa domínio de mercado, incluindo estrutura jurídica otimizada, cronograma de ataque e neutralização de aspectos regulatórios."
        },
        {
          step: 2,
          title: "Due Diligence de Dominação",
          description: "Investigação implacável que revela todos os segredos: documentação societária, contratos críticos, litígios ocultos, compliance real e potencial para criação de valor."
        },
        {
          step: 3,
          title: "Guerra Psicológica de Negociação",
          description: "Participação ativa controlando narrativa, elaborando LOI dominante, term sheet vantajoso e documentos definitivos que cristalizam sua vitória."
        },
        {
          step: 4,
          title: "Blindagem Documental Completa",
          description: "Elaboração de contratos que são fortalezas jurídicas: acordos de compra e venda blindados, garantias assimétricas e documentos que antecipam todos os cenários."
        },
        {
          step: 5,
          title: "Integração Para Domínio Total",
          description: "Acompanhamento implacável do cumprimento de condições precedentes e suporte estratégico na integração que maximiza sinergias e elimina resistências."
        }
      ]}
      testimonials={[
        {
          name: "Fundo de Private Equity Alpha",
          quote: "Conduziram nossa aquisição de R$ 500 milhões como uma operação militar. Due diligence revelou oportunidades que aumentaram o valor em 40%. Execução impecável."
        },
        {
          name: "Conglomerado Industrial Apex",
          quote: "A fusão foi um golpe de mestre estratégico. Não apenas consolidamos mercado, mas eliminamos três concorrentes principais. Domínio total do setor."
        },
        {
          name: "TechCorp Ventures",
          quote: "A estruturação da joint venture criou sinergias que superaram projeções em 200%. Transformaram uma parceria em uma máquina de dominação de mercado."
        }
      ]}
      faq={[
        {
          question: "Como M&A pode ser arma de dominação de mercado?",
          answer: "M&A estratégico não é crescimento - é conquista. Estruturamos operações para: eliminar competição, consolidar supply chain, adquirir propriedade intelectual crítica, capturar market share dominante e criar barreiras de entrada intransponíveis. O resultado é transformar sua empresa de player em dominador absoluto do setor."
        },
        {
          question: "Qual o diferencial do due diligence 'implacável'?",
          answer: "Nosso due diligence vai além de compliance básico. Investigamos: potencial real de sinergias, riscos de integração cultural, oportunidades de otimização ocultas, vulnerabilidades competitivas do target e cenários de criação de valor não óbvios. Revelamos o que outros due diligences não conseguem ver."
        },
        {
          question: "Como garantem que cada M&A seja uma 'conquista'?",
          answer: "Aplicamos estratégia militar aos negócios. Isso significa: inteligência competitiva prévia, análise psicológica da contraparte, múltiplas estratégias de saída, negociação com pressure points identificados e estruturas que garantem que você tenha controle total pós-transação. Não fazemos acordos - orquestramos vitórias."
        }
      ]}
      relatedServices={[
        {
          name: "Reestruturação Societária",
          path: "/servicos/reestruturacao-societaria"
        },
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default FusoesAquisicoesService;
