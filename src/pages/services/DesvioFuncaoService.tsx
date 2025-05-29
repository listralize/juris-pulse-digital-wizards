
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DesvioFuncaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Desvio de Função"
      serviceDescription="Suas responsabilidades aumentaram, seu salário também deveria. Se você executa tarefas de outro cargo sem a devida remuneração, buscamos reajuste salarial, equiparação ou compensação financeira. Sua dedicação não será subvalorizada."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Equiparação Salarial Justa",
          description: "Buscamos equiparação ao salário do cargo efetivamente exercido, garantindo remuneração compatível com as responsabilidades desempenhadas."
        },
        {
          title: "Diferenças Salariais Retroativas",
          description: "Calculamos e cobramos todas as diferenças salariais desde o início do desvio, com reflexos em 13º salário, férias, FGTS e demais verbas."
        },
        {
          title: "Reconhecimento da Função Superior",
          description: "Quando o desvio é para função superior, buscamos promoção oficial com anotação na carteira de trabalho e adequação salarial definitiva."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Caracterização do Desvio de Função",
          description: "Analisamos as funções contratadas versus as efetivamente exercidas, identificando desvios e acúmulos de responsabilidades não remunerados."
        },
        {
          step: 2,
          title: "Coleta de Provas das Atividades",
          description: "Reunimos evidências das tarefas executadas: e-mails, organogramas, testemunhas, descrições de cargo e documentos que comprovem as responsabilidades."
        },
        {
          step: 3,
          title: "Comparação Salarial e Hierárquica",
          description: "Comparamos salários de colegas que exercem função similar, analisamos plano de cargos da empresa e hierarquia organizacional."
        },
        {
          step: 4,
          title: "Cálculo das Diferenças Devidas",
          description: "Elaboramos planilha detalhada com diferenças salariais, reflexos em verbas proporcionais e eventual indenização por uso indevido de qualificação."
        },
        {
          step: 5,
          title: "Ação de Equiparação ou Indenização",
          description: "Ajuizamos ação trabalhista com pedidos de equiparação, diferenças salariais e, quando aplicável, promoção ou reclassificação funcional."
        }
      ]}
      testimonials={[
        {
          name: "Felipe Rocha - Analista/Coordenador de Fato",
          quote: "Exercia função de coordenador há 2 anos sem promoção. A ação garantiu equiparação salarial e recebi R$ 60.000 em diferenças retroativas."
        },
        {
          name: "Lucia Martins - Assistente/Supervisora de Fato",
          quote: "Supervisionava uma equipe inteira com salário de assistente. Consegui promoção oficial e diferenças de 3 anos, totalizando R$ 45.000."
        },
        {
          name: "Rafael Costa - Técnico/Engenheiro de Fato",
          quote: "Fazia projeto de engenharia sendo técnico. Além das diferenças salariais, consegui o reconhecimento profissional que merecia."
        }
      ]}
      faq={[
        {
          question: "Como provar que estou em desvio de função?",
          answer: "Através de evidências das atividades exercidas: e-mails assinados com cargo superior, organograma onde aparece em posição diferente, testemunhas de colegas, descrições de atividades enviadas ao RH, responsabilidades assumidas que não constam no contrato."
        },
        {
          question: "Qual a diferença entre desvio e acúmulo de função?",
          answer: "Desvio é exercer função diferente da contratada. Acúmulo é exercer a função contratada MAIS outra função adicional. Ambos geram direito à adequação salarial ou compensação financeira proporcional às responsabilidades extras."
        },
        {
          question: "Posso exigir promoção ou apenas diferenças salariais?",
          answer: "Depende do caso. Se há cargo vago e você atende aos requisitos, pode pleitear promoção. Se não há previsão de promoção, busca-se equiparação salarial ou indenização pelas funções exercidas indevidamente."
        },
        {
          question: "Tenho direito mesmo se aceitei exercer a função?",
          answer: "Sim! O fato de aceitar exercer função superior não anula o direito à remuneração adequada. O trabalho prestado deve ser remunerado conforme sua complexidade e responsabilidade, independentemente da aceitação inicial."
        }
      ]}
      relatedServices={[
        {
          name: "Defesa do Trabalhador",
          path: "/servicos/defesa-trabalhador"
        },
        {
          name: "Horas Extras e Intervalos",
          path: "/servicos/horas-extras"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default DesvioFuncaoService;
