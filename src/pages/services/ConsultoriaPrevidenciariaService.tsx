
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConsultoriaPrevidenciariaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Consultoria e Planejamento Previdenciário"
      serviceDescription="Planejamento estratégico personalizado para otimização de benefícios previdenciários. Análise detalhada do histórico contributivo, simulação de cenários e desenvolvimento de estratégias para maximizar a renda de aposentadoria, com foco no planejamento inteligente do futuro previdenciário."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Planejamento Estratégico",
          description: "Análise completa do histórico contributivo e projeção de cenários para otimização do benefício futuro."
        },
        {
          title: "Simulação de Renda",
          description: "Cálculos precisos e simulações detalhadas para projeção do valor da aposentadoria em diferentes cenários."
        },
        {
          title: "Otimização de Contribuições",
          description: "Estratégias para maximizar o valor do benefício através de planejamento contributivo inteligente."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Auditoria Previdenciária",
          description: "Análise forense completa do histórico contributivo, identificando lacunas, inconsistências e oportunidades."
        },
        {
          step: 2,
          title: "Projeção de Cenários",
          description: "Modelagem de múltiplos cenários de aposentadoria com diferentes estratégias e tempos de contribuição."
        },
        {
          step: 3,
          title: "Planejamento Personalizado",
          description: "Desenvolvimento de estratégia sob medida para maximizar o benefício e minimizar riscos previdenciários."
        },
        {
          step: 4,
          title: "Simulações Atuariais",
          description: "Cálculos precisos utilizando ferramentas atuariais avançadas para projeção da renda futura."
        },
        {
          step: 5,
          title: "Monitoramento Contínuo",
          description: "Acompanhamento periódico e ajustes na estratégia conforme mudanças na legislação e situação do cliente."
        }
      ]}
      testimonials={[
        {
          name: "Roberto Almeida",
          quote: "O planejamento previdenciário aumentou minha aposentadoria em 40%. Investimento que se pagou muito antes do que imaginei."
        },
        {
          name: "Carla Mendes",
          quote: "Com a consultoria, descobri que poderia me aposentar 3 anos antes mantendo o mesmo valor. Mudou completamente meus planos."
        },
        {
          name: "Eduardo Lima",
          quote: "As simulações me mostraram o caminho exato para maximizar meu benefício. Planejamento impecável e resultados excepcionais."
        }
      ]}
      faq={[
        {
          question: "Quando devo começar o planejamento previdenciário?",
          answer: "O ideal é iniciar o mais cedo possível, preferencialmente com pelo menos 10-15 anos antes da aposentadoria desejada."
        },
        {
          question: "Como funciona a simulação de renda?",
          answer: "Utilizamos ferramentas atuariais para calcular diferentes cenários baseados no seu histórico contributivo e projeções futuras."
        },
        {
          question: "O planejamento garante aumento no valor da aposentadoria?",
          answer: "O planejamento identifica oportunidades de otimização, mas o resultado depende da situação específica de cada cliente."
        },
        {
          question: "Posso alterar minha estratégia durante o planejamento?",
          answer: "Sim, oferecemos monitoramento contínuo e ajustes na estratégia conforme mudanças na legislação ou na sua situação."
        }
      ]}
      relatedServices={[
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Reconhecimento de Tempo Especial",
          path: "/servicos/tempo-especial"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default ConsultoriaPrevidenciariaService;
