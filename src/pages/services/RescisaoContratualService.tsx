
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RescisaoContratualService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Rescisões Contratuais"
      serviceDescription="Assessoria especializada em demissões individuais e coletivas, minimizando riscos trabalhistas e garantindo conformidade legal em todos os procedimentos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Minimização de Riscos",
          description: "Estruturação de rescisões que reduzem significativamente os riscos de processos trabalhistas futuros."
        },
        {
          title: "Conformidade Legal",
          description: "Garantia de que todos os procedimentos estejam em conformidade com a legislação trabalhista vigente."
        },
        {
          title: "Cálculos Precisos",
          description: "Elaboração de cálculos rescisórios precisos, evitando pagamentos indevidos ou insuficientes."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise do Caso",
          description: "Avaliação da situação do empregado, motivo da rescisão e documentação necessária."
        },
        {
          step: 2,
          title: "Estratégia de Rescisão",
          description: "Definição da melhor modalidade de rescisão considerando aspectos legais e econômicos."
        },
        {
          step: 3,
          title: "Cálculos Rescisórios",
          description: "Elaboração detalhada dos cálculos incluindo todas as verbas devidas ao empregado."
        },
        {
          step: 4,
          title: "Formalização",
          description: "Preparação de toda documentação necessária e condução do procedimento de rescisão."
        },
        {
          step: 5,
          title: "Homologação",
          description: "Acompanhamento da homologação quando necessária e orientação pós-rescisão."
        }
      ]}
      testimonials={[
        {
          name: "Empresa de Tecnologia",
          quote: "A assessoria em uma reestruturação empresarial evitou diversos processos trabalhistas que poderiam ter custado muito mais do que o investimento na consultoria."
        },
        {
          name: "Rede de Varejo",
          quote: "Os procedimentos de rescisão foram conduzidos com total transparência e segurança jurídica, protegendo nossa empresa de passivos trabalhistas."
        }
      ]}
      faq={[
        {
          question: "Quando é necessária a homologação da rescisão?",
          answer: "A homologação no sindicato ou Ministério do Trabalho é obrigatória para empregados com mais de 1 ano de empresa, exceto nos casos de pedido de demissão ou término de contrato por experiência."
        },
        {
          question: "Quais verbas são devidas na rescisão sem justa causa?",
          answer: "Na rescisão sem justa causa são devidas: saldo de salário, férias vencidas e proporcionais com 1/3, 13º salário proporcional, aviso prévio, multa de 40% do FGTS, entre outras verbas conforme o caso específico."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Trabalhista",
          path: "/servicos/assessoria-trabalhista"
        },
        {
          name: "Compliance Trabalhista",
          path: "/servicos/compliance-trabalhista"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default RescisaoContratualService;
