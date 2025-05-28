
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AcordosColetivosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Acordos Coletivos"
      serviceDescription="Negociação e elaboração de acordos e convenções coletivas com sindicatos, garantindo equilibrio entre os interesses das empresas e dos trabalhadores."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Negociação Estratégica",
          description: "Representação especializada nas negociações coletivas para alcançar acordos equilibrados e sustentáveis."
        },
        {
          title: "Prevenção de Conflitos",
          description: "Estruturação de acordos que minimizam riscos trabalhistas e previnem disputas futuras."
        },
        {
          title: "Conformidade Legal",
          description: "Garantia de que todos os acordos estejam em conformidade com a legislação trabalhista vigente."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Situação",
          description: "Avaliação das demandas sindicais, posição da empresa e contexto do setor para definir estratégia de negociação."
        },
        {
          step: 2,
          title: "Preparação da Proposta",
          description: "Elaboração de propostas fundamentadas que considerem viabilidade econômica e impactos operacionais."
        },
        {
          step: 3,
          title: "Negociação",
          description: "Condução das negociações com representantes sindicais, buscando soluções que atendam ambas as partes."
        },
        {
          step: 4,
          title: "Formalização do Acordo",
          description: "Redação final do acordo coletivo com todas as cláusulas negociadas e registro nos órgãos competentes."
        },
        {
          step: 5,
          title: "Implementação",
          description: "Orientação para implementação do acordo na empresa e acompanhamento do cumprimento das cláusulas."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Metalúrgica XYZ",
          quote: "A negociação do acordo coletivo resultou em condições equilibradas que garantiram nossa competitividade sem prejudicar os direitos dos trabalhadores."
        },
        {
          name: "Setor Comercial ABC",
          quote: "O apoio jurídico foi fundamental para chegarmos a um acordo que atendeu as expectativas do sindicato dentro das nossas possibilidades financeiras."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre acordo coletivo e convenção coletiva?",
          answer: "O acordo coletivo é firmado entre uma empresa específica e o sindicato dos trabalhadores, aplicando-se apenas àquela empresa. A convenção coletiva é firmada entre sindicatos patronais e de trabalhadores, aplicando-se a toda uma categoria profissional em determinada região."
        },
        {
          question: "Qual o prazo de validade dos acordos coletivos?",
          answer: "Os acordos coletivos têm prazo máximo de validade de 2 anos, conforme estabelecido pela legislação trabalhista brasileira."
        }
      ]}
      relatedServices={[
        {
          name: "Assessoria Trabalhista",
          path: "/servicos/assessoria-trabalhista"
        },
        {
          name: "Contencioso Trabalhista",
          path: "/servicos/contencioso-trabalhista"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default AcordosColetivosService;
