
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AuxilioAcidenteService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Auxílio-Acidente"
      serviceDescription="Assessoria especializada para obtenção do auxílio-acidente, benefício indenizatório para trabalhadores que sofreram acidente com sequelas que reduzam a capacidade laborativa."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Indenização por Sequela",
          description: "Benefício mensal como indenização por redução da capacidade de trabalho."
        },
        {
          title: "Cumulativo com Trabalho",
          description: "Pode ser recebido juntamente com salário ou outro benefício previdenciário."
        },
        {
          title: "Avaliação Médica Especializada",
          description: "Acompanhamento em perícias para comprovar sequelas e redução de capacidade."
        },
        {
          title: "Recursos e Contestações",
          description: "Interposição de recursos contra negativas indevidas do INSS."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Acidente",
          description: "Verificação da ocorrência do acidente e nexo causal com as sequelas apresentadas."
        },
        {
          step: 2,
          title: "Documentação Médica",
          description: "Organização de laudos, exames e relatórios que comprovem as sequelas permanentes."
        },
        {
          step: 3,
          title: "Avaliação Pericial",
          description: "Preparação para perícia médica que avaliará redução da capacidade laborativa."
        },
        {
          step: 4,
          title: "Requerimento Administrativo",
          description: "Protocolo do pedido no INSS com documentação técnica completa."
        },
        {
          step: 5,
          title: "Acompanhamento e Recursos",
          description: "Monitoramento do processo e contestação de decisões desfavoráveis."
        }
      ]}
      testimonials={[
        {
          name: "Ricardo M., Operário",
          quote: "Consegui o auxílio-acidente após acidente que deixou sequela no braço. Recebo junto com meu salário."
        },
        {
          name: "Lucia P., Auxiliar de Enfermagem",
          quote: "O auxílio-acidente foi concedido após comprovação da lesão na coluna por acidente de trabalho."
        }
      ]}
      faq={[
        {
          question: "O que é necessário para ter direito ao auxílio-acidente?",
          answer: "É necessário ter sofrido acidente de qualquer natureza (trabalho, trânsito, doméstico) que tenha resultado em sequela definitiva que reduza a capacidade para o trabalho habitual. Não há carência exigida."
        },
        {
          question: "Qual o valor do auxílio-acidente?",
          answer: "O valor corresponde a 50% do salário de benefício. É calculado sobre a média das contribuições, não podendo ser inferior ao salário mínimo nem superior ao teto previdenciário."
        },
        {
          question: "Posso trabalhar recebendo auxílio-acidente?",
          answer: "Sim, o auxílio-acidente é um benefício indenizatório que pode ser acumulado com salário de trabalho ou outros benefícios previdenciários, exceto aposentadoria."
        }
      ]}
      relatedServices={[
        {
          name: "Auxílio-Doença",
          path: "/servicos/auxilio-doenca"
        },
        {
          name: "Aposentadoria por Invalidez",
          path: "/servicos/aposentadoria-invalidez"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default AuxilioAcidenteService;
