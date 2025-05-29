
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const SalarioMaternidadeService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Salário-Maternidade"
      serviceDescription="Assessoria para obtenção do salário-maternidade, garantindo renda durante o período de licença maternidade para seguradas da Previdência Social."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Licença Remunerada",
          description: "Garantia de renda durante 120 dias de afastamento por maternidade."
        },
        {
          title: "Diferentes Modalidades",
          description: "Cobertura para parto, adoção, guarda judicial e aborto não criminoso."
        },
        {
          title: "Análise de Carência",
          description: "Verificação dos requisitos de carência conforme cada situação específica."
        },
        {
          title: "Cálculo Correto",
          description: "Garantia do valor adequado conforme tipo de segurada e histórico contributivo."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Verificação de Elegibilidade",
          description: "Análise da qualidade de segurada e cumprimento da carência necessária."
        },
        {
          step: 2,
          title: "Documentação Médica",
          description: "Organização de atestados médicos, certidões e documentos comprobatórios."
        },
        {
          step: 3,
          title: "Cálculo do Benefício",
          description: "Determinação do valor correto conforme modalidade e tipo de segurada."
        },
        {
          step: 4,
          title: "Requerimento no INSS",
          description: "Protocolo do pedido com toda documentação necessária."
        },
        {
          step: 5,
          title: "Acompanhamento",
          description: "Monitoramento do processo até liberação do benefício."
        }
      ]}
      testimonials={[
        {
          name: "Ana L., Segurada",
          quote: "O salário-maternidade foi liberado rapidamente após orientação sobre a documentação correta."
        },
        {
          name: "Carla M., Adotante",
          quote: "Consegui o benefício por adoção com todo suporte necessário durante o processo."
        }
      ]}
      faq={[
        {
          question: "Qual a carência para o salário-maternidade?",
          answer: "Para seguradas empregadas, domésticas e avulsas não há carência. Para contribuintes individuais e facultativas, são necessárias 10 contribuições mensais. Para segurada especial, 10 meses de atividade rural."
        },
        {
          question: "Qual o valor do salário-maternidade?",
          answer: "Para empregadas: último salário. Para avulsas: média dos últimos 6 salários. Para contribuintes individuais/facultativas: média das 12 últimas contribuições. Para segurada especial: salário mínimo."
        },
        {
          question: "O salário-maternidade vale para adoção?",
          answer: "Sim, independente da idade da criança adotada. O período é de 120 dias contados da adoção/guarda judicial para fins de adoção, com mesmas regras de carência e valor."
        }
      ]}
      relatedServices={[
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Auxílio-Doença",
          path: "/servicos/auxilio-doenca"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default SalarioMaternidadeService;
