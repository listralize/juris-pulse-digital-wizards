
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PlanejamentoPrevidenciarioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Planejamento Previdenciário"
      serviceDescription="Planejamento estratégico personalizado para otimizar sua futura aposentadoria, analisando diferentes cenários e estratégias para maximizar o valor do benefício e reduzir o tempo de contribuição."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Estratégia Personalizada",
          description: "Análise individualizada para definir a melhor estratégia de aposentadoria conforme seu perfil."
        },
        {
          title: "Simulações Detalhadas",
          description: "Cálculos e projeções de diferentes cenários de aposentadoria com valores estimados."
        },
        {
          title: "Otimização de Tempo",
          description: "Identificação de estratégias para reduzir o tempo necessário para aposentadoria."
        },
        {
          title: "Maximização de Benefício",
          description: "Orientações para obter o maior valor possível de aposentadoria."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Diagnóstico Previdenciário",
          description: "Análise completa do histórico contributivo e situação previdenciária atual."
        },
        {
          step: 2,
          title: "Mapeamento de Opções",
          description: "Identificação de todas as modalidades de aposentadoria aplicáveis ao caso."
        },
        {
          step: 3,
          title: "Simulações e Projeções",
          description: "Cálculos detalhados de cenários com diferentes estratégias e tempos de contribuição."
        },
        {
          step: 4,
          title: "Elaboração do Plano",
          description: "Criação de plano estratégico personalizado com cronograma e metas."
        },
        {
          step: 5,
          title: "Acompanhamento Contínuo",
          description: "Monitoramento periódico e ajustes no planejamento conforme mudanças na legislação."
        }
      ]}
      testimonials={[
        {
          name: "Fernando L., 55 anos",
          quote: "O planejamento mostrou que posso me aposentar 3 anos antes do que pensava, usando tempo especial convertido."
        },
        {
          name: "Claudia S., 48 anos",
          quote: "Descobri que minha estratégia de contribuição estava errada. Agora sei exatamente o que fazer."
        }
      ]}
      faq={[
        {
          question: "Quando devo fazer o planejamento previdenciário?",
          answer: "O ideal é fazer o planejamento o quanto antes, preferencialmente a partir dos 45-50 anos, mas pode ser útil em qualquer idade. Quanto mais cedo, mais opções estratégicas estão disponíveis."
        },
        {
          question: "O planejamento garante o valor calculado?",
          answer: "O planejamento fornece projeções baseadas na legislação atual e histórico contributivo. Mudanças na lei ou na situação individual podem afetar os resultados, por isso o acompanhamento é importante."
        },
        {
          question: "Posso mudar a estratégia depois do planejamento?",
          answer: "Sim, o planejamento é flexível e deve ser revisado periodicamente. Mudanças na legislação, situação pessoal ou laboral podem exigir ajustes na estratégia definida."
        }
      ]}
      relatedServices={[
        {
          name: "Cálculos Previdenciários",
          path: "/servicos/calculos-previdenciarios"
        },
        {
          name: "Simulação de Renda",
          path: "/servicos/simulacao-renda"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default PlanejamentoPrevidenciarioService;
