
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const TestamentosSucessoesService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Testamentos e Sucessões"
      serviceDescription="Planejamento sucessório completo, elaboração de testamentos e resolução de questões sucessórias, garantindo que sua vontade seja respeitada e seu patrimônio seja transmitido conforme seus desejos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Planejamento Sucessório Estratégico",
          description: "Estratégias sucessórias personalizadas considerando composição patrimonial, estrutura familiar, questões tributárias e objetivos específicos para transmissão do patrimônio.",
          icon: "🎯"
        },
        {
          title: "Testamentos Técnicos e Seguros",
          description: "Elaboração de testamentos públicos, particulares e cerrados com rigor técnico para evitar nulidades e garantir cumprimento integral da vontade do testador.",
          icon: "📋"
        },
        {
          title: "Otimização Tributária Sucessória",
          description: "Planejamento visando redução legal da carga tributária sobre transmissão patrimonial através de doações em vida, holdings familiares e outras estratégias lícitas.",
          icon: "💰"
        },
        {
          title: "Proteção de Herdeiros Vulneráveis",
          description: "Estruturas jurídicas específicas para proteção de herdeiros menores, incapazes ou com necessidades especiais através de fideicomissos, fundações e outras modalidades.",
          icon: "🛡️"
        },
        {
          title: "Sucessão Empresarial Especializada",
          description: "Planejamento da sucessão de empresas familiares, acordos de sócios com cláusulas sucessórias, protocolos familiares e governança corporativa para continuidade dos negócios.",
          icon: "🏢"
        },
        {
          title: "Resolução de Conflitos Sucessórios",
          description: "Mediação e litígio em questões sucessórias complexas, sobrepartilha, anulação de testamentos, investigação de bens e defesa de direitos hereditários.",
          icon: "⚖️"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Patrimonial e Familiar Completo",
          description: "Mapeamento detalhado do patrimônio, análise da composição familiar, identificação de herdeiros necessários e levantamento de questões específicas da família."
        },
        {
          step: 2,
          title: "Análise Tributária e Estratégica",
          description: "Avaliação das implicações tributárias da sucessão, cálculo de custos, identificação de oportunidades de economia fiscal lícita e escolha das melhores estratégias."
        },
        {
          step: 3,
          title: "Elaboração de Estratégia Personalizada",
          description: "Desenvolvimento de plano sucessório sob medida incluindo testamentos, doações estratégicas, constituição de pessoas jurídicas e outras ferramentas jurídicas."
        },
        {
          step: 4,
          title: "Implementação de Instrumentos Jurídicos",
          description: "Elaboração e formalização de testamentos, contratos de doação, estatutos de holdings familiares, protocolos familiares e demais documentos necessários."
        },
        {
          step: 5,
          title: "Constituição de Estruturas Societárias",
          description: "Criação de holdings familiares, fundações, fideicomissos e outras pessoas jurídicas quando necessárias para otimização sucessória e proteção patrimonial."
        },
        {
          step: 6,
          title: "Execução de Doações Estratégicas",
          description: "Implementação de programa de doações em vida com reserva de usufruto, doações com encargo e outras modalidades para antecipação sucessória eficiente."
        },
        {
          step: 7,
          title: "Monitoramento e Atualizações Periódicas",
          description: "Revisões regulares do planejamento conforme mudanças na legislação, situação familiar ou patrimonial, garantindo atualidade e eficácia das estratégias adotadas."
        }
      ]}
      testimonials={[
        {
          name: "Carlos Eduardo, Empresário Rural",
          quote: "O planejamento sucessório preservou a unidade da nossa fazenda de café centenária. Conseguimos transmitir o patrimônio para os filhos mantendo a atividade produtiva e sem conflitos familiares."
        },
        {
          name: "Dra. Juliana Martins, Médica",
          quote: "Como mãe solo com filho especial, o planejamento sucessório me deu segurança de que ele estará protegido mesmo após minha morte. O fideicomisso foi a solução perfeita."
        },
        {
          name: "Família Oliveira, Grupo Industrial",
          quote: "A sucessão da nossa indústria foi planejada com 10 anos de antecedência. O protocolo familiar e a holding permitiram transição suave entre gerações sem perda de controle."
        },
        {
          name: "Ricardo e Laura, Casal de Aposentados",
          quote: "O testamento conjunto nos permitiu prever situações que não havíamos considerado e garantir que nossos filhos e netos estarão amparados em qualquer circunstância."
        },
        {
          name: "Maria Helena, Viúva",
          quote: "Após perder meu marido, o planejamento sucessório me orientou sobre como reorganizar meu patrimônio para beneficiar igualmente todos os filhos, inclusive os enteados."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre testamento público, particular e cerrado?",
          answer: "Testamento público é lavrado em cartório com duas testemunhas, oferece maior segurança mas é mais caro. Particular é escrito de próprio punho pelo testador com três testemunhas. Cerrado é escrito em secreto e entregue lacrado ao tabelião. Cada modalidade tem vantagens específicas."
        },
        {
          question: "Posso deserdar completamente um filho?",
          answer: "Não é possível no sistema brasileiro. Filhos, pais e cônjuge são herdeiros necessários com direito à legítima (50% da herança). Só é possível deserdação em casos excepcionalíssimos previstos em lei, como tentativa de homicídio ou abandono."
        },
        {
          question: "Como funciona a sucessão de empresas familiares?",
          answer: "Requer planejamento específico incluindo acordo de sócios com cláusulas sucessórias, holding familiar, protocolo familiar definindo regras de governança, preparação da nova geração e estruturas que preservem unidade e controle empresarial."
        },
        {
          question: "Vale a pena fazer doação em vida aos filhos?",
          answer: "Pode ser vantajoso tributariamente e para evitar conflitos futuros. Doações com reserva de usufruto permitem manter o controle dos bens em vida. É importante avaliar cada caso considerando idade do doador, relacionamento familiar e questões específicas."
        },
        {
          question: "O que é holding familiar e quando é recomendada?",
          answer: "É empresa constituída para administrar patrimônio familiar. Recomendada para grandes patrimônios, facilitando gestão centralizada, planejamento sucessório, economia tributária e preservação de controle empresarial entre gerações."
        },
        {
          question: "Como proteger herdeiro com deficiência ou incapacidade?",
          answer: "Através de fideicomisso, que permite nomear administrador para gerir a herança em benefício do incapaz. Também é possível constituir fundação ou utilizar curatela específica para gestão patrimonial adequada."
        },
        {
          question: "Testamento pode ser alterado ou revogado?",
          answer: "Sim, testamento é sempre revogável até a morte do testador. Pode ser alterado parcial ou totalmente através de novo testamento ou codicilo. O testamento mais recente prevalece sobre os anteriores quanto às disposições conflitantes."
        },
        {
          question: "Como funciona a sucessão em união estável?",
          answer: "Companheiro tem direitos sucessórios limitados, concorrendo com filhos do falecido conforme o regime de bens. Em muitos casos, é recomendável testamento específico para ampliar a proteção do companheiro sobrevivente."
        }
      ]}
      relatedServices={[
        {
          name: "Inventário e Partilha",
          path: "/servicos/inventario-partilha"
        },
        {
          name: "Casamento e União Estável",
          path: "/servicos/casamento-uniao"
        },
        {
          name: "Holding Familiar",
          path: "/servicos/holding-familiar"
        },
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default TestamentosSucessoesService;
