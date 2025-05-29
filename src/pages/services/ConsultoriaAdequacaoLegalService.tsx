
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ConsultoriaAdequacaoLegalService = () => {
  const benefits = [
    {
      title: "Prevenção de Litígios",
      description: "Consultoria preventiva que evita problemas futuros com adequação às normas vigentes.",
      icon: "🔍"
    },
    {
      title: "Conformidade Total",
      description: "Garantia de adequação completa às normas urbanísticas e ambientais aplicáveis.",
      icon: "✅"
    },
    {
      title: "Eficiência Operacional",
      description: "Processos otimizados que evitam atrasos e custos desnecessários nos projetos.",
      icon: "⚡"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Diagnóstico Legal",
      description: "Análise detalhada da situação atual e identificação de pendências ou inadequações."
    },
    {
      step: 2,
      title: "Plano de Adequação",
      description: "Elaboração de plano detalhado para regularização e conformidade legal."
    },
    {
      step: 3,
      title: "Implementação Assistida",
      description: "Acompanhamento da implementação das medidas de adequação."
    },
    {
      step: 4,
      title: "Monitoramento Contínuo",
      description: "Acompanhamento para manutenção da conformidade e adaptação a mudanças normativas."
    }
  ];

  const testimonials = [
    {
      name: "Grupo Empresarial",
      quote: "Consultoria preventiva que nos poupou de problemas significativos. Investimento que valeu a pena."
    },
    {
      name: "Empresa de Logística",
      quote: "Adequação completa às normas urbanísticas realizada com eficiência e competência."
    },
    {
      name: "Indústria Alimentícia",
      quote: "Excelente trabalho preventivo que garantiu conformidade total com a legislação ambiental."
    }
  ];

  const faq = [
    {
      question: "Quando é recomendável a consultoria preventiva?",
      answer: "Sempre antes de iniciar novos projetos ou quando há mudanças na legislação aplicável."
    },
    {
      question: "Quais normas são analisadas?",
      answer: "Legislação urbanística, ambiental, sanitária, trabalhista e demais normas aplicáveis à atividade."
    },
    {
      question: "A consultoria evita multas futuras?",
      answer: "Sim, a adequação preventiva reduz significativamente os riscos de infrações e sanções."
    },
    {
      question: "Como é feito o acompanhamento?",
      answer: "Através de revisões periódicas e monitoramento de mudanças na legislação aplicável."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Consultoria em Adequação Legal"
      serviceDescription="Prevenção Estratégica de Riscos. Consultoria preventiva para conformidade com normas urbanísticas e ambientais."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default ConsultoriaAdequacaoLegalService;
