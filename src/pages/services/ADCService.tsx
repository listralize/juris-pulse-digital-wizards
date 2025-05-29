
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ADCService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Ação Declaratória de Constitucionalidade (ADC)"
      serviceDescription="Quando a constitucionalidade de uma norma federal é questionada, a ADC é nossa resposta definitiva. Impetramos ADC no STF para confirmar e blindar a constitucionalidade de lei federal contra controvérsias judiciais. Garantimos segurança jurídica e eficácia normativa através da declaração expressa de constitucionalidade."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Segurança Jurídica Definitiva",
          description: "Confirmação da constitucionalidade elimina controvérsias judiciais, garantindo aplicação uniforme da norma em todo território nacional."
        },
        {
          title: "Efeito Vinculante",
          description: "Decisão vincula todos os órgãos do Poder Judiciário e da Administração Pública, impedindo questionamentos futuros da constitucionalidade."
        },
        {
          title: "Proteção contra Insegurança Jurídica",
          description: "Elimina divergências interpretativas que geram instabilidade na aplicação da norma, conferindo certeza jurídica."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação de Controvérsia Judicial",
          description: "Verificação da existência de controvérsia judicial relevante sobre a constitucionalidade da norma federal."
        },
        {
          step: 2,
          title: "Demonstração de Constitucionalidade",
          description: "Fundamentação robusta demonstrando que a norma está em perfeita harmonia com a Constituição Federal."
        },
        {
          step: 3,
          title: "Comprovação de Legitimidade",
          description: "Verificação de que o requerente possui legitimidade ativa para propor a ação conforme art. 103 da CF."
        },
        {
          step: 4,
          title: "Peticionamento no STF",
          description: "Elaboração e protocolo de petição inicial tecnicamente perfeita no Supremo Tribunal Federal."
        },
        {
          step: 5,
          title: "Sustentação da Constitucionalidade",
          description: "Acompanhamento processual com sustentação oral defendendo a constitucionalidade da norma."
        }
      ]}
      testimonials={[
        {
          name: "União Federal",
          quote: "A ADC confirmou a constitucionalidade de lei federal estratégica, eliminando insegurança jurídica que prejudicava sua aplicação nacional."
        },
        {
          name: "Ministério Público",
          quote: "Através da ADC, conseguimos blindar norma fundamental contra questionamentos que paralisavam políticas públicas essenciais."
        }
      ]}
      faq={[
        {
          question: "Quando é cabível a ADC?",
          answer: "Cabe ADC quando há controvérsia judicial relevante sobre constitucionalidade de lei federal que comprometa sua eficácia ou gere insegurança jurídica significativa."
        },
        {
          question: "Qual a diferença entre ADI e ADC?",
          answer: "ADI questiona inconstitucionalidade, enquanto ADC confirma constitucionalidade. Ambas têm efeito erga omnes e vinculante, mas com objetivos opostos."
        },
        {
          question: "A ADC pode ser convertida em ADI?",
          answer: "Não há conversão. Se o STF entender pela inconstitucionalidade na ADC, simplesmente julga improcedente a ação, não declarando inconstitucionalidade."
        }
      ]}
      relatedServices={[
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        },
        {
          name: "Consultoria Constitucional",
          path: "/servicos/consultoria-constitucional"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default ADCService;
