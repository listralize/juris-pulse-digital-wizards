
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AposentadoriaInvalidezService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Aposentadoria por Invalidez"
      serviceDescription="Representação especializada para obtenção da aposentadoria por invalidez, garantindo suporte financeiro para trabalhadores permanentemente incapacitados para o trabalho."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Avaliação Médica Especializada",
          description: "Análise detalhada da documentação médica para comprovar incapacidade total e permanente."
        },
        {
          title: "Acompanhamento Pericial",
          description: "Assistência durante perícias médicas do INSS para garantir avaliação adequada."
        },
        {
          title: "Recursos Médicos",
          description: "Contestação de laudos periciais inadequados com pareceres médicos especializados."
        },
        {
          title: "Benefício Integral",
          description: "Busca pelo valor integral do benefício quando há direito ao acréscimo de 25%."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Médica Inicial",
          description: "Avaliação da documentação médica para verificar caracterização da incapacidade permanente."
        },
        {
          step: 2,
          title: "Verificação de Requisitos",
          description: "Confirmação da carência (12 meses) e qualidade de segurado no momento da incapacidade."
        },
        {
          step: 3,
          title: "Preparação Pericial",
          description: "Organização de documentação médica completa e orientação para a perícia do INSS."
        },
        {
          step: 4,
          title: "Acompanhamento da Perícia",
          description: "Assistência durante o exame pericial para garantir avaliação correta da incapacidade."
        },
        {
          step: 5,
          title: "Recursos e Ações",
          description: "Interposição de recursos ou ações judiciais em caso de negativa indevida."
        }
      ]}
      testimonials={[
        {
          name: "José C., Aposentado por Invalidez",
          quote: "Após duas negativas, consegui a aposentadoria por invalidez com acompanhamento médico especializado."
        },
        {
          name: "Maria F., Beneficiária",
          quote: "O suporte durante a perícia foi fundamental. A equipe orientou sobre todos os aspectos importantes."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre auxílio-doença e aposentadoria por invalidez?",
          answer: "O auxílio-doença é para incapacidade temporária, enquanto a aposentadoria por invalidez é para incapacidade total e permanente para qualquer atividade laborativa. A invalidez pressupõe que não há possibilidade de reabilitação."
        },
        {
          question: "É possível trabalhar recebendo aposentadoria por invalidez?",
          answer: "Não. A aposentadoria por invalidez pressupõe incapacidade total para o trabalho. Caso o beneficiário volte a trabalhar, o benefício será cessado. Há possibilidade de reabilitação profissional em alguns casos."
        },
        {
          question: "Quando há direito ao acréscimo de 25% no benefício?",
          answer: "O acréscimo de 25% é devido quando o aposentado por invalidez necessitar de assistência permanente de outra pessoa para atividades básicas da vida diária, conforme avaliação médica específica."
        }
      ]}
      relatedServices={[
        {
          name: "Auxílio-Doença",
          path: "/servicos/auxilio-doenca"
        },
        {
          name: "Benefícios por Incapacidade",
          path: "/servicos/beneficios-incapacidade"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default AposentadoriaInvalidezService;
