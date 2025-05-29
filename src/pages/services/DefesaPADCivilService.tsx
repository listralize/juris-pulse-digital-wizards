
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DefesaPADCivilService = () => {
  const benefits = [
    {
      title: "Proteção da Carreira",
      description: "Defesa especializada de servidores públicos e agentes privados em processos administrativos disciplinares.",
      icon: "🛡️"
    },
    {
      title: "Devido Processo Legal",
      description: "Garantia do respeito a todos os direitos processuais durante a tramitação do PAD.",
      icon: "⚖️"
    },
    {
      title: "Expertise Técnica",
      description: "Conhecimento profundo das normas administrativas e jurisprudência específica.",
      icon: "📚"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise do Processo",
      description: "Estudo detalhado dos autos e identificação das estratégias de defesa mais adequadas."
    },
    {
      step: 2,
      title: "Estratégia de Defesa",
      description: "Desenvolvimento de linha defensiva baseada em aspectos técnicos e jurídicos específicos."
    },
    {
      step: 3,
      title: "Acompanhamento Processual",
      description: "Participação em todas as fases do PAD, desde a defesa prévia até os recursos cabíveis."
    },
    {
      step: 4,
      title: "Recursos e Revisão",
      description: "Interposição de recursos administrativos e judiciais quando necessário."
    }
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      quote: "A defesa no PAD foi exemplar. Conseguimos demonstrar a inocência e manter a carreira intacta."
    },
    {
      name: "Dr. João Silva",
      quote: "Excelente trabalho técnico que resultou no arquivamento do processo administrativo."
    },
    {
      name: "Ana Costa",
      quote: "Profissionais competentes que me orientaram durante todo o processo. Resultado muito positivo."
    }
  ];

  const faq = [
    {
      question: "O que é um PAD?",
      answer: "Processo Administrativo Disciplinar é o instrumento para apurar responsabilidade de servidor por infração funcional e aplicar penalidade cabível."
    },
    {
      question: "Quando posso constituir advogado?",
      answer: "O advogado pode ser constituído desde a instauração do PAD, sendo recomendável desde o início do processo."
    },
    {
      question: "Quais são as penalidades possíveis?",
      answer: "As penalidades variam desde advertência, suspensão, demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão."
    },
    {
      question: "É possível reverter uma demissão?",
      answer: "Sim, através de recursos administrativos ou ação judicial, dependendo dos vícios processuais identificados."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Defesa em Processos Administrativos Disciplinares"
      serviceDescription="Proteção Integral da Carreira Pública. Defesa especializada garantindo devido processo legal e proteção dos direitos funcionais."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default DefesaPADCivilService;
