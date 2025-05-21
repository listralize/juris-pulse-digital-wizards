
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ProtecaoMenoresService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito da Família"
      serviceName="Proteção de Menores"
      serviceDescription="Atuação jurídica especializada na proteção dos direitos de crianças e adolescentes em situações de vulnerabilidade, garantindo que seus interesses sejam preservados em qualquer circunstância."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Intervenção Imediata",
          description: "Ações rápidas e eficazes para proteger menores em situações de risco ou vulnerabilidade."
        },
        {
          title: "Abordagem Multidisciplinar",
          description: "Trabalho conjunto com psicólogos e assistentes sociais para garantir uma proteção integral."
        },
        {
          title: "Representação Especializada",
          description: "Representação dos interesses do menor perante órgãos públicos e tribunais, assegurando que sua voz seja ouvida."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Gratuita",
          description: "Realizamos uma análise preliminar da situação, identificando os riscos e as medidas de proteção necessárias."
        },
        {
          step: 2,
          title: "Planejamento de Intervenção",
          description: "Desenvolvemos uma estratégia personalizada para o caso, considerando aspectos jurídicos, psicológicos e sociais."
        },
        {
          step: 3,
          title: "Documentação e Evidências",
          description: "Reunimos toda a documentação e evidências necessárias para fundamentar as ações de proteção."
        },
        {
          step: 4,
          title: "Ações Judiciais e Administrativas",
          description: "Implementamos as medidas necessárias junto ao Judiciário, Conselho Tutelar e demais órgãos de proteção."
        },
        {
          step: 5,
          title: "Acompanhamento Contínuo",
          description: "Monitoramos a situação até que a segurança e o bem-estar do menor estejam plenamente garantidos."
        }
      ]}
      testimonials={[
        {
          name: "Clara L.",
          quote: "A intervenção rápida dos advogados garantiu que meu sobrinho fosse retirado de uma situação de risco e colocado sob a guarda de familiares que podem cuidar dele."
        },
        {
          name: "Miguel S.",
          quote: "Como professor, denunciei uma situação preocupante e fiquei impressionado com a seriedade e eficiência com que o caso foi conduzido, sempre priorizando o bem-estar da criança."
        },
        {
          name: "Família Pereira",
          quote: "O suporte jurídico foi fundamental para que pudéssemos assumir a guarda do nosso neto após uma situação familiar complexa."
        }
      ]}
      faq={[
        {
          question: "O que fazer ao identificar uma situação de risco para uma criança ou adolescente?",
          answer: "O primeiro passo é acionar o Conselho Tutelar da região. Em casos de emergência, também é importante contatar a polícia. Nossa equipe jurídica pode orientar sobre os próximos passos e representar os interesses do menor ou de familiares que desejam protegê-lo."
        },
        {
          question: "Como é obtida a guarda provisória de uma criança em situação de risco?",
          answer: "A guarda provisória pode ser concedida pelo juiz em caráter de urgência, mediante pedido fundamentado que demonstre a situação de risco e a capacidade do requerente de cuidar do menor. Nossa equipe prepara toda a documentação necessária e apresenta o pedido de forma célere."
        },
        {
          question: "Quais medidas podem ser tomadas em casos de alienação parental?",
          answer: "A alienação parental é considerada uma forma de abuso emocional. As medidas judiciais podem incluir desde advertências e acompanhamento psicológico até a alteração da guarda e a suspensão da convivência com o genitor alienador nos casos mais graves."
        }
      ]}
      relatedServices={[
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Adoção",
          path: "/servicos/adocao"
        }
      ]}
      mainAreaPath="/familia"
    />
  );
};

export default ProtecaoMenoresService;
