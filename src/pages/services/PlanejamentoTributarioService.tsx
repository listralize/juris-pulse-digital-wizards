
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PlanejamentoTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Planejamento Tributário"
      serviceDescription="Estruturação de estratégias legais para otimizar a carga tributária de pessoas físicas e jurídicas, identificando oportunidades de economia fiscal dentro dos limites legais."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Economia Fiscal",
          description: "Redução legal e segura da carga tributária, aumentando a rentabilidade e competitividade do seu negócio."
        },
        {
          title: "Segurança Jurídica",
          description: "Estratégias fundamentadas e documentadas, protegendo você e sua empresa de questionamentos futuros pelo fisco."
        },
        {
          title: "Previsibilidade Financeira",
          description: "Maior controle sobre os custos tributários, permitindo um planejamento financeiro mais eficiente e preciso."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Tributário",
          description: "Análise completa da situação fiscal atual, identificando oportunidades e pontos de atenção específicos para seu caso."
        },
        {
          step: 2,
          title: "Elaboração da Estratégia",
          description: "Desenvolvimento de um plano personalizado com alternativas legais para otimização tributária, considerando riscos e benefícios."
        },
        {
          step: 3,
          title: "Implementação",
          description: "Execução das medidas planejadas, incluindo possíveis reorganizações societárias, mudanças de regime tributário ou processos operacionais."
        },
        {
          step: 4,
          title: "Documentação e Compliance",
          description: "Elaboração de toda documentação necessária para suportar as estratégias adotadas, garantindo conformidade com a legislação."
        },
        {
          step: 5,
          title: "Monitoramento e Ajustes",
          description: "Acompanhamento contínuo dos resultados e adaptação das estratégias conforme mudanças legislativas ou nas operações da empresa."
        }
      ]}
      testimonials={[
        {
          name: "Indústrias Romano",
          quote: "O planejamento tributário implementado reduziu nossa carga fiscal em 22%, mantendo total conformidade com a legislação e trazendo segurança jurídica."
        },
        {
          name: "Carlos M., Empresário",
          quote: "A reestruturação societária sugerida não apenas diminuiu nossos impostos como simplificou nossos processos administrativos."
        },
        {
          name: "Grupo Serrana",
          quote: "Após anos pagando impostos excessivamente, descobrimos através da consultoria várias oportunidades legais de economia que transformaram nossa lucratividade."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre planejamento tributário, elisão e evasão fiscal?",
          answer: "O planejamento tributário é a organização legal dos negócios para reduzir a carga tributária, atuando antes da ocorrência do fato gerador. A elisão fiscal é o planejamento feito dentro dos limites legais. Já a evasão fiscal é a redução tributária por meios ilegais, como sonegação ou fraude, o que não faz parte de nossa atuação profissional."
        },
        {
          question: "Em quanto tempo posso ver resultados de um planejamento tributário?",
          answer: "Os primeiros resultados geralmente podem ser observados entre 3 e 6 meses após a implementação, dependendo da complexidade das medidas adotadas. Algumas estratégias, como mudança de regime tributário, podem trazer benefícios imediatos, enquanto outras, como reestruturações societárias, podem levar mais tempo para gerar economia."
        },
        {
          question: "O planejamento tributário pode ser considerado ilegal pela Receita Federal?",
          answer: "Um planejamento tributário bem elaborado opera dentro dos limites legais e não deve ser considerado ilegal. No entanto, é importante que ele tenha propósito negocial, substância econômica e não seja baseado apenas na economia fiscal. Nossa abordagem inclui a documentação adequada e fundamentação legal de todas as estratégias adotadas."
        }
      ]}
      relatedServices={[
        {
          name: "Contencioso Tributário",
          path: "/servicos/contencioso-tributario"
        },
        {
          name: "Recuperação de Créditos Tributários",
          path: "/servicos/recuperacao-creditos"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default PlanejamentoTributarioService;
