
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AposentadoriaEspecialService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Aposentadoria Especial"
      serviceDescription="Assessoria especializada para obtenção da aposentadoria especial por exposição a agentes nocivos à saúde, com tempo reduzido de contribuição e sem fator previdenciário."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Tempo Reduzido de Contribuição",
          description: "Aposentadoria com 15, 20 ou 25 anos de contribuição, dependendo do grau de exposição aos agentes nocivos."
        },
        {
          title: "Sem Fator Previdenciário",
          description: "Cálculo integral do benefício, sem redução por fator previdenciário até a reforma de 2019."
        },
        {
          title: "Maior Valor de Benefício",
          description: "Geralmente resulta em valor superior às demais modalidades de aposentadoria."
        },
        {
          title: "Comprovação Técnica Especializada",
          description: "Suporte técnico para comprovação da exposição através de laudos e documentação apropriada."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Atividade Profissional",
          description: "Levantamento detalhado de todas as atividades exercidas e possível exposição a agentes nocivos."
        },
        {
          step: 2,
          title: "Levantamento Documental",
          description: "Coleta de PPP, LTCAT, laudos técnicos e demais documentos que comprovem a exposição."
        },
        {
          step: 3,
          title: "Avaliação Técnica",
          description: "Análise da documentação por profissionais especializados em segurança do trabalho."
        },
        {
          step: 4,
          title: "Requerimento Fundamentado",
          description: "Protocolo do pedido junto ao INSS com fundamentação técnica e jurídica robusta."
        },
        {
          step: 5,
          title: "Acompanhamento e Recursos",
          description: "Acompanhamento da análise pericial e interposição de recursos quando necessário."
        }
      ]}
      testimonials={[
        {
          name: "Carlos M., Ex-metalúrgico",
          quote: "Consegui minha aposentadoria especial aos 53 anos com 25 anos de contribuição. O valor foi muito superior à aposentadoria comum."
        },
        {
          name: "Regina S., Enfermeira",
          quote: "Após negativa do INSS, a assessoria jurídica provou minha exposição a agentes biológicos e obtive a aposentadoria especial."
        },
        {
          name: "Manuel R., Soldador",
          quote: "A comprovação técnica foi fundamental para demonstrar a exposição ao calor e ruído em minha atividade."
        }
      ]}
      faq={[
        {
          question: "Quais atividades dão direito à aposentadoria especial?",
          answer: "Atividades com exposição a agentes nocivos como: ruído acima de 80dB, calor ou frio extremos, produtos químicos, radiações, agentes biológicos, eletricidade em alta tensão, trabalho em altura, mineração subterrânea, entre outros. Cada agente tem tempo específico de exposição exigido (15, 20 ou 25 anos)."
        },
        {
          question: "Como comprovar a exposição a agentes nocivos?",
          answer: "A comprovação é feita através de: PPP (Perfil Profissiográfico Previdenciário), LTCAT (Laudo Técnico das Condições do Ambiente de Trabalho), laudos periciais, PPRA, PCMSO, e outros documentos técnicos que demonstrem efetiva exposição habitual e permanente aos agentes nocivos durante o exercício da atividade."
        },
        {
          question: "Posso converter tempo especial em comum?",
          answer: "Sim, o tempo especial pode ser convertido em tempo comum com acréscimo: para homens, multiplica-se por 1,4 (atividades de 25 anos) ou 1,75 (atividades de 20 anos) ou 2,33 (atividades de 15 anos). Para mulheres, os multiplicadores são 1,2, 1,5 e 2,0 respectivamente. Isso pode ser vantajoso quando não se tem tempo especial suficiente."
        }
      ]}
      relatedServices={[
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Planejamento Previdenciário",
          path: "/servicos/planejamento-previdenciario"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default AposentadoriaEspecialService;
