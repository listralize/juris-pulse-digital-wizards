
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const RecursosExtraordinarioEspecialService = () => {
  const benefits = [
    {
      title: "Expertise Reconhecida",
      description: "Domínio das complexidades processuais dos tribunais superiores e conhecimento aprofundado das tendências jurisprudenciais.",
      icon: "📈"
    },
    {
      title: "Equipe Especializada",
      description: "Advogados com formação específica em recursos especiais e extraordinários, combinando experiência prática com conhecimento acadêmico.",
      icon: "👥"
    },
    {
      title: "Resultados Superiores",
      description: "Taxa de êxito acima da média nacional em recursos interpostos, demonstrando qualidade técnica excepcional.",
      icon: "🏆"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise de Admissibilidade",
      description: "Avaliação criteriosa dos requisitos, incluindo repercussão geral para recursos extraordinários e relevância para recursos especiais."
    },
    {
      step: 2,
      title: "Fundamentação Técnica Robusta",
      description: "Construção de fundamentação jurídica sólida baseada em precedentes consolidados e doutrina especializada."
    },
    {
      step: 3,
      title: "Estratégia de Precedentes",
      description: "Desenvolvimento de argumentação que considera o potencial de criação de precedentes favoráveis para casos futuros similares."
    },
    {
      step: 4,
      title: "Acompanhamento Processual",
      description: "Monitoramento integral do processamento, incluindo eventual sustentação oral e aproveitamento de oportunidades processuais."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Roberto Silva",
      quote: "O recurso extraordinário reverteu decisão desfavorável e estabeleceu tese jurídica que beneficiou todo o setor industrial. Expertise determinante."
    },
    {
      name: "Dra. Mariana Costa",
      quote: "O recurso especial garantiu interpretação favorável que impactava as finanças municipais. Fundamentação técnica e estratégia impecáveis."
    },
    {
      name: "Prof. Dr. Eduardo Mendes",
      quote: "A atuação nos tribunais superiores demonstrou domínio excepcional. O recurso resultou em precedente que protegeu investimentos bilionários."
    }
  ];

  const faq = [
    {
      question: "Qual a diferença entre recurso extraordinário e especial?",
      answer: "Recurso extraordinário vai ao STF para questões constitucionais com repercussão geral. Recurso especial vai ao STJ para questões de lei federal."
    },
    {
      question: "O que é repercussão geral?",
      answer: "É um requisito para recursos extraordinários que exige demonstrar relevância econômica, política, social ou jurídica que transcenda o caso específico."
    },
    {
      question: "Qual o prazo para interpor esses recursos?",
      answer: "Ambos têm prazo de 15 dias úteis contados da intimação do acórdão recorrido, podendo ser prorrogado por igual período mediante fundamentação."
    },
    {
      question: "É possível recurso se não houver repercussão geral?",
      answer: "Não. A repercussão geral é requisito de admissibilidade para recursos extraordinários. Sem ela, o recurso não será conhecido pelo STF."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Recursos Extraordinários e Especiais"
      serviceDescription="Expertise nos Tribunais Superiores para Estabelecer Precedentes. Atuação estratégica no STF e STJ moldando interpretações jurídicas."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default RecursosExtraordinarioEspecialService;
