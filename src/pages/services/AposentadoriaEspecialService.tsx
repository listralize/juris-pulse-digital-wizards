
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AposentadoriaEspecialService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Aposentadoria Especial"
      serviceDescription="Assessoria especializada para obtenção da aposentadoria especial para trabalhadores expostos a agentes nocivos à saúde, com tempo reduzido de contribuição."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Tempo Reduzido",
          description: "Aposentadoria em 15, 20 ou 25 anos conforme o grau de exposição aos agentes nocivos."
        },
        {
          title: "Comprovação Técnica",
          description: "Análise de PPP, LTCAT e laudos técnicos para comprovar exposição a agentes nocivos."
        },
        {
          title: "Reconhecimento Judicial",
          description: "Ações judiciais para reconhecimento de tempo especial não averbado pelo INSS."
        },
        {
          title: "Conversão de Tempo",
          description: "Conversão de tempo especial em comum para outras modalidades de aposentadoria."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Exposição",
          description: "Verificação da exposição a agentes nocivos através de documentação técnica e histórico laboral."
        },
        {
          step: 2,
          title: "Levantamento Documental",
          description: "Coleta de PPP, LTCAT, laudos técnicos e outros documentos comprobatórios da atividade especial."
        },
        {
          step: 3,
          title: "Cálculo do Tempo Especial",
          description: "Contagem precisa do tempo especial e verificação dos requisitos para aposentadoria."
        },
        {
          step: 4,
          title: "Requerimento Administrativo",
          description: "Protocolo do pedido no INSS com toda documentação técnica necessária."
        },
        {
          step: 5,
          title: "Acompanhamento e Recursos",
          description: "Monitoramento do processo e interposição de recursos em caso de negativa."
        }
      ]}
      testimonials={[
        {
          name: "Antônio R., Soldador",
          quote: "Consegui minha aposentadoria especial aos 50 anos com 25 anos de trabalho em condições insalubres."
        },
        {
          name: "Vera L., Enfermeira",
          quote: "O reconhecimento do tempo especial hospitalar foi fundamental para minha aposentadoria."
        }
      ]}
      faq={[
        {
          question: "Quais atividades dão direito à aposentadoria especial?",
          answer: "Atividades expostas a agentes físicos (ruído, calor, frio, radiação), químicos (amianto, benzeno, chumbo) ou biológicos (hospitais, laboratórios). Cada agente tem tempo específico: 15, 20 ou 25 anos."
        },
        {
          question: "O que é PPP e por que é importante?",
          answer: "O Perfil Profissiográfico Previdenciário (PPP) é documento que comprova a exposição do trabalhador a agentes nocivos. É fundamental para comprovar o direito à aposentadoria especial."
        },
        {
          question: "Posso converter tempo especial em comum?",
          answer: "Sim, tempo especial pode ser convertido em comum com acréscimo de 40% (homens) ou 20% (mulheres), útil para outras modalidades de aposentadoria quando não há tempo suficiente para a especial."
        }
      ]}
      relatedServices={[
        {
          name: "Reconhecimento de Tempo Especial",
          path: "/servicos/reconhecimento-tempo-especial"
        },
        {
          name: "Aposentadoria por Tempo de Contribuição",
          path: "/servicos/aposentadoria-tempo-contribuicao"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default AposentadoriaEspecialService;
