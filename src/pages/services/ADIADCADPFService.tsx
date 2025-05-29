
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const ADIADCADPFService = () => {
  const benefits = [
    {
      title: "Expertise Reconhecida",
      description: "Histórico comprovado de êxito em ações de controle concentrado, com precedentes favoráveis que moldaram a interpretação constitucional.",
      icon: "⚖️"
    },
    {
      title: "Equipe Especializada", 
      description: "Advogados com formação específica em Direito Constitucional e experiência prática no STF.",
      icon: "👥"
    },
    {
      title: "Visão Estratégica",
      description: "Compreensão profunda dos impactos das decisões constitucionais, considerando aspectos jurídicos e consequências práticas.",
      icon: "🎯"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise Constitucional Profunda",
      description: "Realizamos estudo minucioso da norma questionada, identificando vícios de constitucionalidade e construindo fundamentação jurídica sólida."
    },
    {
      step: 2,
      title: "Estratégia Processual Customizada", 
      description: "Desenvolvemos abordagem específica considerando a composição da Corte, precedentes relevantes e impactos das decisões."
    },
    {
      step: 3,
      title: "Sustentação Oral de Excelência",
      description: "Preparação meticulosa para sustentação perante os Ministros do STF, com argumentos persuasivos e tecnicamente impecáveis."
    },
    {
      step: 4,
      title: "Acompanhamento Integral",
      description: "Monitoramento completo desde a petição inicial até o trânsito em julgado, aproveitando todas as oportunidades processuais."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Carlos Eduardo Mendes",
      quote: "A expertise da equipe em ações de controle concentrado foi fundamental para proteger nossos interesses setoriais. A ADI resultou em precedente favorável para toda a indústria."
    },
    {
      name: "Maria Fernanda Silva", 
      quote: "O escritório conduziu nossa ADC com maestria técnica incomparável. A defesa da constitucionalidade garantiu segurança jurídica para todo o sistema fiscal."
    },
    {
      name: "Prof. Dr. Roberto Andrade",
      quote: "A ADPF apresentada foi um marco jurídico. A fundamentação doutrinária demonstrou excelência técnica que poucos conseguem alcançar no STF."
    }
  ];

  const faq = [
    {
      question: "O que são ações de controle concentrado de constitucionalidade?",
      answer: "São ações de competência do STF que permitem questionar a constitucionalidade de leis e atos normativos de forma direta, com efeitos vinculantes para todo o país."
    },
    {
      question: "Qual a diferença entre ADI, ADC e ADPF?",
      answer: "ADI questiona a inconstitucionalidade de normas, ADC confirma a constitucionalidade, e ADPF protege preceitos fundamentais violados por atos do poder público."
    },
    {
      question: "Quem pode propor essas ações?",
      answer: "Apenas os legitimados constitucionais podem propor, incluindo Presidente da República, Governadores, PGR, partidos políticos, entre outros."
    },
    {
      question: "Qual o prazo para decisão do STF?",
      answer: "Não há prazo legal específico, mas a Corte prioriza casos com repercussão geral e impacto nacional, podendo variar conforme a complexidade."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Ações Diretas de Inconstitucionalidade (ADI/ADC/ADPF)"
      serviceDescription="Representação de Elite no Controle Concentrado de Constitucionalidade. Atuação estratégica no Supremo Tribunal Federal para moldar o futuro da legislação brasileira."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default ADIADCADPFService;
