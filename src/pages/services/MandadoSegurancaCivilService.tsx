
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const MandadoSegurancaCivilService = () => {
  const benefits = [
    {
      title: "Rapidez Processual",
      description: "Procedimento especial que garante decisão rápida em casos de direito líquido e certo violado por autoridade pública.",
      icon: "⚡"
    },
    {
      title: "Proteção Efetiva",
      description: "Instrumento constitucional robusto para proteção contra abusos e ilegalidades do poder público.",
      icon: "🛡️"
    },
    {
      title: "Expertise Comprovada",
      description: "Experiência consolidada em mandados de segurança individuais e coletivos com alta taxa de êxito.",
      icon: "⭐"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise do Direito Violado",
      description: "Verificação minuciosa da existência de direito líquido e certo violado ou ameaçado por autoridade pública."
    },
    {
      step: 2,
      title: "Estratégia Processual",
      description: "Desenvolvimento de fundamentação jurídica sólida e estratégia processual adequada ao caso específico."
    },
    {
      step: 3,
      title: "Petição Inicial Técnica",
      description: "Elaboração de petição inicial com argumentação robusta e documentação que comprove o direito líquido e certo."
    },
    {
      step: 4,
      title: "Acompanhamento Integral",
      description: "Monitoramento completo do processo até decisão final, incluindo recursos se necessário."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Carlos Mendes",
      quote: "O mandado de segurança foi impetrado com precisão técnica exemplar. Conseguimos reverter decisão administrativa que prejudicava nossos direitos."
    },
    {
      name: "Maria Silva",
      quote: "A equipe demonstrou domínio completo dos aspectos constitucionais. O writ foi concedido em tempo recorde."
    },
    {
      name: "João Santos",
      quote: "Excelente trabalho na fundamentação jurídica. O mandado de segurança coletivo protegeu toda nossa categoria."
    }
  ];

  const faq = [
    {
      question: "O que é mandado de segurança?",
      answer: "É um remédio constitucional para proteger direito líquido e certo não amparado por habeas corpus quando violado por autoridade pública."
    },
    {
      question: "Qual a diferença entre individual e coletivo?",
      answer: "O individual protege direito de uma pessoa, enquanto o coletivo protege direitos de grupos ou categorias específicas."
    },
    {
      question: "Qual o prazo para impetrar?",
      answer: "120 dias a contar da ciência do ato impugnado, conforme estabelece a lei específica do mandado de segurança."
    },
    {
      question: "O que é direito líquido e certo?",
      answer: "É o direito comprovado de plano, através de documentos, sem necessidade de dilação probatória complexa."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Mandado de Segurança Individual e Coletivo"
      serviceDescription="Proteção Constitucional Contra Abusos do Poder Público. Defesa efetiva de direitos líquidos e certos através do mais tradicional remédio constitucional."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default MandadoSegurancaCivilService;
