
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const BPCService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="BPC/LOAS - Benefício de Prestação Continuada"
      serviceDescription="Assessoria especializada para obtenção do Benefício de Prestação Continuada (BPC/LOAS), garantindo assistência social para idosos e pessoas com deficiência em situação de vulnerabilidade."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Avaliação de Elegibilidade",
          description: "Análise detalhada dos critérios de idade, deficiência e renda familiar para verificar direito ao BPC."
        },
        {
          title: "Comprovação de Renda",
          description: "Estratégias legais para demonstração da situação de baixa renda familiar."
        },
        {
          title: "Avaliação Social e Médica",
          description: "Acompanhamento nas avaliações sociais e médicas realizadas pelo INSS."
        },
        {
          title: "Recursos Especializados",
          description: "Interposição de recursos com fundamentação técnica em casos de negativa."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise de Requisitos",
          description: "Verificação dos requisitos de idade (65+ anos) ou deficiência e renda per capita familiar."
        },
        {
          step: 2,
          title: "Documentação Social",
          description: "Organização de documentos para comprovação da situação socioeconômica familiar."
        },
        {
          step: 3,
          title: "Avaliação Médica/Social",
          description: "Preparação e acompanhamento das avaliações médicas e sociais do INSS."
        },
        {
          step: 4,
          title: "Acompanhamento do Processo",
          description: "Monitoramento do processo administrativo até a concessão do benefício."
        },
        {
          step: 5,
          title: "Recursos e Ações",
          description: "Contestação de negativas através de recursos administrativos ou ações judiciais."
        }
      ]}
      testimonials={[
        {
          name: "Ana M., Beneficiária",
          quote: "Consegui o BPC para minha filha com deficiência após orientação sobre a documentação necessária."
        },
        {
          name: "Pedro S., 67 anos",
          quote: "O BPC foi fundamental para minha sobrevivência. A equipe me ajudou em todo o processo."
        }
      ]}
      faq={[
        {
          question: "Quem tem direito ao BPC/LOAS?",
          answer: "Têm direito ao BPC: idosos com 65 anos ou mais e pessoas com deficiência de qualquer idade, ambos com renda per capita familiar inferior a 1/4 do salário mínimo. O benefício é assistencial, não exigindo contribuições prévias."
        },
        {
          question: "Como é calculada a renda familiar para o BPC?",
          answer: "A renda familiar é a soma dos rendimentos mensais dos membros da família que vivem sob o mesmo teto, dividida pelo número de integrantes. Consideram-se apenas rendimentos brutos, excluindo-se outros benefícios assistenciais."
        },
        {
          question: "BPC é aposentadoria? Posso trabalhar recebendo BPC?",
          answer: "BPC não é aposentadoria, é benefício assistencial. Não é possível trabalhar com carteira assinada recebendo BPC, pois isso descaracteriza a situação de miserabilidade. Trabalhos eventuais podem ser permitidos conforme análise do caso."
        }
      ]}
      relatedServices={[
        {
          name: "Aposentadoria por Idade",
          path: "/servicos/aposentadoria-idade"
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

export default BPCService;
