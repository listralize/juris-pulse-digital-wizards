
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AuxilioDoencaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Auxílio-Doença"
      serviceDescription="Assessoria completa para obtenção do auxílio-doença, garantindo que segurados incapacitados temporariamente para o trabalho recebam o benefício devido."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Análise Médica Especializada",
          description: "Avaliação criteriosa da documentação médica para fundamentar o pedido de auxílio-doença."
        },
        {
          title: "Acompanhamento Pericial",
          description: "Orientação e preparação para a perícia médica do INSS, maximizando as chances de deferimento."
        },
        {
          title: "Recursos e Contestações",
          description: "Interposição de recursos em caso de indeferimento, com fundamentação técnica robusta."
        },
        {
          title: "Análise de Carência",
          description: "Verificação dos requisitos de carência e qualidade de segurado para garantir elegibilidade."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Avaliação Inicial",
          description: "Análise da situação médica, documentação disponível e histórico contributivo do segurado."
        },
        {
          step: 2,
          title: "Organização Documental",
          description: "Compilação de laudos médicos, exames e relatórios necessários para fundamentar o pedido."
        },
        {
          step: 3,
          title: "Protocolo do Pedido",
          description: "Requerimento do auxílio-doença junto ao INSS com toda documentação organizada."
        },
        {
          step: 4,
          title: "Preparação para Perícia",
          description: "Orientação detalhada sobre o procedimento pericial e documentos a serem apresentados."
        },
        {
          step: 5,
          title: "Acompanhamento e Recursos",
          description: "Monitoramento do processo e interposição de recursos se necessário."
        }
      ]}
      testimonials={[
        {
          name: "Maria S., Segurada",
          quote: "Após três negativas, consegui o auxílio-doença com a assessoria especializada. A diferença foi fundamental."
        },
        {
          name: "João P., Aposentado",
          quote: "O acompanhamento durante todo o processo me deu segurança e o benefício foi aprovado rapidamente."
        },
        {
          name: "Ana L., Servidora",
          quote: "Excelente orientação para a perícia médica. O profissionalismo fez toda a diferença no resultado."
        }
      ]}
      faq={[
        {
          question: "Quem tem direito ao auxílio-doença?",
          answer: "Segurados da Previdência Social que estejam temporariamente incapacitados para o trabalho por mais de 15 dias, com qualidade de segurado e carência mínima de 12 contribuições (exceto em casos de acidente)."
        },
        {
          question: "Qual o valor do auxílio-doença?",
          answer: "91% do salário-de-benefício, calculado pela média das maiores contribuições do segurado, respeitando o teto previdenciário."
        },
        {
          question: "Como funciona a perícia médica?",
          answer: "É realizada por médico perito do INSS que avalia a incapacidade através de exame clínico e análise da documentação médica apresentada."
        },
        {
          question: "Posso trabalhar recebendo auxílio-doença?",
          answer: "Não. O auxílio-doença é incompatível com o exercício de atividade remunerada, exceto como reabilitado profissional."
        }
      ]}
      relatedServices={[
        {
          name: "Aposentadoria por Invalidez",
          path: "/servicos/aposentadoria-invalidez"
        },
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Revisão de Benefícios",
          path: "/servicos/revisao-beneficios"
        }
      ]}
      mainAreaPath="/areas/previdenciario"
    />
  );
};

export default AuxilioDoencaService;
