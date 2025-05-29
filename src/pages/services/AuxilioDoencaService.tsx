
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AuxilioDoencaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Auxílio-Doença"
      serviceDescription="Representação especializada para obtenção e manutenção do auxílio-doença, garantindo suporte financeiro durante períodos de incapacidade temporária para o trabalho."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Perícia Médica Assistida",
          description: "Acompanhamento em perícias médicas do INSS para garantir avaliação justa da incapacidade."
        },
        {
          title: "Documentação Médica Completa",
          description: "Organização de laudos, exames e relatórios médicos para fundamentar o pedido."
        },
        {
          title: "Recursos e Contestações",
          description: "Interposição de recursos em caso de negativa indevida do benefício pelo INSS."
        },
        {
          title: "Prorrogação do Benefício",
          description: "Acompanhamento para renovação do auxílio-doença quando necessário."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Avaliação Médica",
          description: "Análise da documentação médica para verificar a caracterização da incapacidade temporária."
        },
        {
          step: 2,
          title: "Verificação de Carência",
          description: "Confirmação do cumprimento da carência de 12 contribuições mensais para o auxílio-doença."
        },
        {
          step: 3,
          title: "Agendamento da Perícia",
          description: "Agendamento e preparação para a perícia médica do INSS com orientações estratégicas."
        },
        {
          step: 4,
          title: "Acompanhamento Pericial",
          description: "Assistência durante a perícia médica para garantir avaliação adequada da incapacidade."
        },
        {
          step: 5,
          title: "Recursos se Necessário",
          description: "Interposição de recursos administrativos ou judiciais em caso de indeferimento indevido."
        }
      ]}
      testimonials={[
        {
          name: "Roberto L., Beneficiário",
          quote: "Após negativa inicial, consegui o auxílio-doença com o acompanhamento jurídico. A orientação para a perícia foi fundamental."
        },
        {
          name: "Fernanda P., Segurada",
          quote: "O auxílio-doença foi concedido rapidamente com a documentação médica bem organizada pela equipe."
        }
      ]}
      faq={[
        {
          question: "Qual é a carência necessária para o auxílio-doença?",
          answer: "Para doenças em geral, é necessária carência de 12 contribuições mensais. Para acidentes de trabalho ou doenças profissionais/ocupacionais, não há carência. Algumas doenças graves também são isentas de carência."
        },
        {
          question: "Como funciona a perícia médica do INSS?",
          answer: "A perícia médica avalia a incapacidade para o trabalho através de exame clínico e análise da documentação médica. É importante apresentar todos os exames, laudos e relatórios médicos atualizados que comprovem a incapacidade."
        },
        {
          question: "Por quanto tempo posso receber auxílio-doença?",
          answer: "O auxílio-doença pode ser concedido por até 120 dias inicialmente, podendo ser prorrogado mediante nova perícia médica. O benefício se mantém enquanto persistir a incapacidade para o trabalho."
        }
      ]}
      relatedServices={[
        {
          name: "Aposentadoria por Invalidez",
          path: "/servicos/aposentadoria-invalidez"
        },
        {
          name: "Auxílio-Acidente",
          path: "/servicos/auxilio-acidente"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default AuxilioDoencaService;
