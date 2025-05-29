
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PlanejamentoTributarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Tributário"
      serviceName="Planejamento Tributário Estratégico"
      serviceDescription="Analisamos detalhadamente as operações e o regime fiscal de sua empresa para identificar oportunidades legais de redução da carga tributária. Nosso objetivo é prevenir autuações fiscais, otimizar resultados e garantir maior competitividade."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Escolha do Regime Tributário Ideal",
          description: "Avaliamos qual o melhor enquadramento para sua empresa (Simples Nacional, Lucro Presumido ou Lucro Real), considerando faturamento, margens de lucro, custos operacionais e atividade econômica."
        },
        {
          title: "Reorganização Societária Tributária",
          description: "Estruturamos fusões, cisões, incorporações com base na Lei das S.A. (Lei nº 6.404/76), visando otimizar a tributação e aproveitar benefícios fiscais."
        },
        {
          title: "Simulação de Cenários",
          description: "Projetamos o impacto tributário de diferentes decisões de negócios, permitindo escolhas mais assertivas e seguras."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Tributário Completo",
          description: "Análise detalhada da situação fiscal atual, identificando oportunidades de otimização e pontos de atenção específicos para seu negócio."
        },
        {
          step: 2,
          title: "Análise de Regime Tributário",
          description: "Avaliação comparativa entre Simples Nacional, Lucro Presumido e Lucro Real para identificar o enquadramento mais vantajoso."
        },
        {
          step: 3,
          title: "Estruturação de Reorganizações",
          description: "Planejamento de fusões, cisões e incorporações para otimizar a tributação e segregar riscos empresariais."
        },
        {
          step: 4,
          title: "Simulação e Modelagem",
          description: "Projeção do impacto tributário de diferentes cenários e decisões estratégicas do negócio."
        },
        {
          step: 5,
          title: "Implementação e Monitoramento",
          description: "Execução das estratégias planejadas e acompanhamento contínuo dos resultados e mudanças legislativas."
        }
      ]}
      testimonials={[
        {
          name: "Indústria Metalúrgica Nacional",
          quote: "O planejamento tributário estratégico reduziu nossa carga fiscal em 28% através da reorganização societária e mudança de regime tributário."
        },
        {
          name: "Grupo Empresarial Tecnologia",
          quote: "A simulação de cenários nos permitiu tomar decisões estratégicas com segurança, evitando armadilhas fiscais em uma aquisição."
        },
        {
          name: "Holding Familiar Santos",
          quote: "A reestruturação societária proposta otimizou nossa tributação sobre dividendos e protegeu nosso patrimônio familiar."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre os regimes tributários disponíveis?",
          answer: "O Simples Nacional é voltado para empresas com faturamento até R$ 4,8 milhões, oferecendo tributação simplificada. O Lucro Presumido presume uma margem de lucro fixa e é adequado para empresas com alta lucratividade. O Lucro Real tributa sobre o lucro efetivo e é obrigatório para empresas com faturamento acima de R$ 78 milhões ou determinadas atividades."
        },
        {
          question: "Como a reorganização societária pode reduzir impostos?",
          answer: "Através de fusões, cisões e incorporações estruturadas conforme a Lei das S.A., é possível aproveitar prejuízos fiscais, otimizar a tributação sobre dividendos, segregar atividades com tributações diferentes e criar estruturas mais eficientes. Cada operação deve ter propósito negocial legítimo além da economia fiscal."
        },
        {
          question: "Qual o prazo para ver resultados do planejamento tributário?",
          answer: "Os resultados podem variar conforme a estratégia adotada. Mudanças de regime tributário podem gerar economia imediata no próximo exercício fiscal. Reorganizações societárias podem levar de 3 a 12 meses para implementação completa, mas os benefícios são duradouros e estruturais."
        }
      ]}
      relatedServices={[
        {
          name: "Elisão Fiscal",
          path: "/servicos/elisao-fiscal"
        },
        {
          name: "Compliance Tributário",
          path: "/servicos/compliance-tributario"
        }
      ]}
      mainAreaPath="/tributario"
    />
  );
};

export default PlanejamentoTributarioService;
