
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitosServidoresService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Administrativo"
      serviceName="Direito dos Servidores Públicos"
      serviceDescription="Desde a admissão e progressão na carreira até a aposentadoria e questões disciplinares, os servidores públicos enfrentam desafios legais únicos. Fornecemos suporte jurídico especializado, defendendo seus direitos, benefícios e estabilidade na carreira dentro do intrincado arcabouço do direito do trabalho público."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção da Estabilidade",
          description: "Defesa da estabilidade no serviço público e proteção contra exonerações e demissões arbitrárias ou ilegais."
        },
        {
          title: "Progressão e Promoção",
          description: "Orientação e defesa de direitos relacionados à progressão funcional, promoções e desenvolvimento de carreira no serviço público."
        },
        {
          title: "Direitos Previdenciários",
          description: "Assessoria especializada em aposentadorias, pensões e demais benefícios previdenciários dos servidores públicos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Situação Funcional",
          description: "Avaliação completa da situação jurídica do servidor, identificando direitos, pendências e oportunidades de regularização."
        },
        {
          step: 2,
          title: "Estratégia de Regularização",
          description: "Desenvolvimento de estratégia para correção de irregularidades, reconhecimento de direitos e otimização da situação funcional."
        },
        {
          step: 3,
          title: "Requerimentos Administrativos",
          description: "Elaboração e protocolo de requerimentos administrativos para reconhecimento de direitos e correção de situações irregulares."
        },
        {
          step: 4,
          title: "Acompanhamento Processual",
          description: "Monitoramento de processos administrativos e, quando necessário, interposição de recursos hierárquicos."
        },
        {
          step: 5,
          title: "Medidas Judiciais",
          description: "Ajuizamento de ações judiciais quando a via administrativa se mostrar insuficiente para reconhecimento de direitos."
        }
      ]}
      testimonials={[
        {
          name: "Professor Estadual Roberto",
          quote: "Consegui o reconhecimento de 15 anos de tempo de serviço anterior que não havia sido computado, aumentando significativamente minha aposentadoria."
        },
        {
          name: "Servidora Federal Ana",
          quote: "A orientação jurídica me ajudou a conquistar a progressão funcional que estava sendo negada há anos, com direito aos atrasados."
        },
        {
          name: "Servidor Municipal José",
          quote: "Minha estabilidade foi preservada após defesa técnica contra tentativa de exoneração sem fundamento legal adequado."
        }
      ]}
      faq={[
        {
          question: "Como funciona a estabilidade do servidor público?",
          answer: "A estabilidade é adquirida após 3 anos de efetivo exercício, mediante aprovação em avaliação especial de desempenho. Garante que o servidor só pode perder o cargo nas hipóteses constitucionais específicas."
        },
        {
          question: "Quais são os direitos à progressão funcional?",
          answer: "Servidores têm direito à progressão por tempo de serviço e por mérito/titulação, conforme critérios estabelecidos em lei específica de cada ente federativo e plano de carreira."
        },
        {
          question: "Como é calculada a aposentadoria do servidor público?",
          answer: "Depende do regime: servidores ingressos até 2003 podem ter integralidade e paridade; após 2003, seguem regras previdenciárias com possíveis transições conforme EC 103/2019."
        },
        {
          question: "O servidor pode acumular cargos públicos?",
          answer: "A acumulação é excepcional, permitida apenas nos casos constitucionais: dois cargos de professor, cargo de professor com técnico/científico, dois cargos privativos de profissionais de saúde, sempre compatíveis com horários."
        }
      ]}
      relatedServices={[
        {
          name: "PAD e Sindicâncias",
          path: "/servicos/pad-sindicancia"
        },
        {
          name: "Responsabilidade Civil do Estado",
          path: "/servicos/responsabilidade-estado"
        }
      ]}
      mainAreaPath="/administrativo"
    />
  );
};

export default DireitosServidoresService;
