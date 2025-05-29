
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const IgualdadeNaoDiscriminacaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Igualdade e Não Discriminação"
      serviceDescription="Ações contra práticas discriminatórias por motivo de raça, gênero, orientação sexual, religião, entre outros, assegurando o princípio da igualdade. Combatemos todas as formas de discriminação e preconceito, garantindo tratamento digno e igualitário conforme determina a Constituição."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Combate ao Preconceito",
          description: "Ação firme contra qualquer forma de discriminação baseada em características pessoais, garantindo dignidade e respeito."
        },
        {
          title: "Igualdade Material",
          description: "Busca da igualdade real e efetiva, não apenas formal, promovendo políticas afirmativas quando necessário."
        },
        {
          title: "Proteção Integral",
          description: "Defesa abrangente contra discriminação em todas as esferas: trabalho, educação, serviços, moradia e relações sociais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação da Discriminação",
          description: "Análise detalhada dos atos discriminatórios e coleta de evidências que comprovem o tratamento desigual."
        },
        {
          step: 2,
          title: "Enquadramento Legal",
          description: "Identificação das normas constitucionais e legais violadas, incluindo o princípio da isonomia do art. 5º da CF."
        },
        {
          step: 3,
          title: "Estratégia Processual",
          description: "Definição da melhor via judicial: ação civil pública, mandado de segurança, ou ação individual conforme o caso."
        },
        {
          step: 4,
          title: "Reparação de Danos",
          description: "Pedido de indenização por danos morais e materiais, além de medidas para cessar a prática discriminatória."
        },
        {
          step: 5,
          title: "Efetivação da Igualdade",
          description: "Acompanhamento até o cumprimento integral da decisão que restabeleça o tratamento igualitário."
        }
      ]}
      testimonials={[
        {
          name: "Vítima de Discriminação Racial",
          quote: "A ação judicial garantiu meu direito à igualdade e resultou em indenização justa pelos danos sofridos."
        },
        {
          name: "Organização de Direitos Humanos",
          quote: "Conseguimos barrar política discriminatória que violava direitos fundamentais de grupos vulneráveis."
        }
      ]}
      faq={[
        {
          question: "O que caracteriza discriminação?",
          answer: "Qualquer distinção, exclusão ou restrição baseada em características pessoais (raça, gênero, religião, orientação sexual, etc.) que prejudique o reconhecimento ou exercício de direitos."
        },
        {
          question: "Como comprovar discriminação?",
          answer: "Através de evidências como documentos, testemunhas, gravações, padrões estatísticos ou qualquer meio que demonstre o tratamento desigual injustificado."
        },
        {
          question: "Qual a diferença entre igualdade formal e material?",
          answer: "Igualdade formal é tratar todos igualmente perante a lei. Igualdade material é considerar as diferenças para garantir oportunidades reais iguais, incluindo ações afirmativas."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        },
        {
          name: "Direitos das Minorias",
          path: "/servicos/direitos-minorias"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default IgualdadeNaoDiscriminacaoService;
