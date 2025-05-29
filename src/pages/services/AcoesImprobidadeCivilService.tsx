
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AcoesImprobidadeCivilService = () => {
  const benefits = [
    {
      title: "Defesa Especializada",
      description: "Atuação técnica em ações de improbidade administrativa com foco na proteção dos direitos do réu.",
      icon: "🛡️"
    },
    {
      title: "Busca por Responsabilização",
      description: "Representação de interessados na responsabilização de agentes por atos de improbidade.",
      icon: "⚖️"
    },
    {
      title: "Conhecimento Técnico",
      description: "Domínio da Lei de Improbidade Administrativa e jurisprudência dos tribunais superiores.",
      icon: "📖"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Análise dos Fatos",
      description: "Estudo detalhado dos atos supostamente ímprobos e análise da tipificação legal."
    },
    {
      step: 2,
      title: "Estratégia Processual",
      description: "Definição da linha de atuação conforme a posição processual e objetivos do cliente."
    },
    {
      step: 3,
      title: "Instrução Processual",
      description: "Produção de provas e acompanhamento da instrução probatória."
    },
    {
      step: 4,
      title: "Sentença e Recursos",
      description: "Acompanhamento até decisão final e interposição de recursos quando necessário."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Carlos Mendes",
      quote: "A defesa na ação de improbidade foi excepcional. Conseguimos demonstrar a ausência de dolo e má-fé."
    },
    {
      name: "Maria Silva",
      quote: "Excelente trabalho na representação que resultou na responsabilização do agente público."
    },
    {
      name: "Roberto Santos",
      quote: "Conhecimento técnico impressionante da Lei de Improbidade. Resultado muito satisfatório."
    }
  ];

  const faq = [
    {
      question: "O que caracteriza improbidade administrativa?",
      answer: "Atos que importem enriquecimento ilícito, causem prejuízo ao erário ou atentem contra princípios da administração pública."
    },
    {
      question: "Quais as sanções aplicáveis?",
      answer: "Perda da função pública, suspensão dos direitos políticos, multa civil e proibição de contratar com o poder público."
    },
    {
      question: "Há prazo para propor a ação?",
      answer: "Sim, há prazo prescricional que varia conforme a natureza do cargo e a situação do agente."
    },
    {
      question: "É possível acordo na ação de improbidade?",
      answer: "A Lei 14.230/21 permitiu acordos de não persecução cível em determinadas hipóteses."
    }
  ];

  return (
    <ServiceLandingLayout
      serviceArea="Direito Civil"
      serviceName="Ações de Improbidade Administrativa"
      serviceDescription="Combate à Corrupção e Defesa dos Direitos. Atuação especializada tanto na defesa quanto na busca por responsabilização em ações de improbidade."
      mainImage="/placeholder.svg"
      benefits={benefits}
      process={process}
      testimonials={testimonials}
      faq={faq}
      mainAreaPath="/civil"
    />
  );
};

export default AcoesImprobidadeCivilService;
