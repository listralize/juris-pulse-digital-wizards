
import React, { useEffect } from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DivorceService = () => {
  // Add auto-scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for the divorce service landing page
  const serviceData = {
    serviceArea: "Direito da Família",
    serviceName: "Divórcio e Separação",
    serviceDescription: "Assessoria jurídica especializada para processos de divórcio e separação, buscando sempre a melhor solução para todas as partes envolvidas. Nossa abordagem combina profundo conhecimento jurídico com sensibilidade para questões familiares.",
    mainImage: "/lovable-uploads/12e19203-a8e7-4940-9116-c281d94b1602.png",
    benefits: [
      {
        title: "Especialistas em Direito de Família",
        description: "Nossa equipe é especializada exclusivamente em questões familiares, garantindo atendimento personalizado e focado.",
        icon: "⚖️"
      },
      {
        title: "Processos Ágeis",
        description: "Buscamos sempre as vias mais rápidas e eficientes para resolver seu caso, respeitando seus interesses.",
        icon: "⏱️"
      },
      {
        title: "Abordagem Humanizada",
        description: "Entendemos o momento delicado e oferecemos suporte emocional durante todo o processo.",
        icon: "💙"
      },
      {
        title: "Proteção dos Seus Direitos",
        description: "Garantimos que seus direitos e interesses sejam protegidos em todas as etapas do processo.",
        icon: "🛡️"
      },
      {
        title: "Transparência Total",
        description: "Você terá acesso a todas as informações do seu caso e entenderá cada passo do processo.",
        icon: "🔍"
      },
      {
        title: "Custo-Benefício",
        description: "Oferecemos opções de honorários adequadas à complexidade do seu caso e à sua realidade financeira.",
        icon: "💰"
      }
    ],
    process: [
      {
        step: 1,
        title: "Consulta Inicial Gratuita",
        description: "Realizamos uma análise preliminar do seu caso, entendemos suas necessidades e explicamos as opções disponíveis. Esta primeira consulta é sem compromisso e gratuita."
      },
      {
        step: 2,
        title: "Planejamento Estratégico",
        description: "Desenvolvemos uma estratégia personalizada para seu caso, considerando aspectos como filhos, patrimônio, pensão alimentícia e outros elementos relevantes."
      },
      {
        step: 3,
        title: "Documentação e Preparação",
        description: "Preparamos toda a documentação necessária para dar entrada no processo, reunindo provas e elementos que fortaleçam sua posição."
      },
      {
        step: 4,
        title: "Negociação ou Litígio",
        description: "Dependendo do seu caso, podemos optar pela via consensual (mais rápida e menos desgastante) ou litigiosa (quando não há acordo possível)."
      },
      {
        step: 5,
        title: "Finalização e Homologação",
        description: "Cuidamos de todos os detalhes para a conclusão do processo, incluindo a homologação judicial e registros necessários."
      }
    ],
    testimonials: [
      {
        name: "Maria L.",
        quote: "O processo de divórcio parecia assustador, mas com a ajuda dos advogados, consegui resolver tudo de forma tranquila e protegendo meus direitos."
      },
      {
        name: "Carlos R.",
        quote: "Mesmo em um momento difícil, recebi um atendimento humano e profissional. Conseguimos um acordo que foi justo para ambas as partes."
      },
      {
        name: "Juliana M.",
        quote: "A atenção aos detalhes e o cuidado com que trataram meu caso fez toda a diferença. Recomendo a todos que estão passando por um divórcio."
      }
    ],
    faq: [
      {
        question: "Quanto tempo leva um processo de divórcio?",
        answer: "O tempo pode variar significativamente. Um divórcio consensual pode ser concluído em algumas semanas, enquanto um processo litigioso pode levar meses ou até anos, dependendo da complexidade e do volume de processos no tribunal."
      },
      {
        question: "É possível fazer um divórcio sem comparecer ao tribunal?",
        answer: "Sim, em casos de divórcio consensual, é possível realizar o processo extrajudicialmente em cartório, sem necessidade de comparecer ao tribunal, desde que não existam filhos menores ou incapazes."
      },
      {
        question: "Como é feita a divisão de bens no divórcio?",
        answer: "A divisão de bens depende do regime matrimonial escolhido pelos cônjuges. No regime de comunhão parcial (mais comum), os bens adquiridos durante o casamento são divididos igualmente, enquanto bens anteriores ou recebidos por herança permanecem com seu proprietário original."
      },
      {
        question: "É necessário ter um motivo para se divorciar?",
        answer: "Não. Desde a Emenda Constitucional 66/2010, não é mais necessário apresentar qualquer motivo ou cumprir prazos de separação para solicitar o divórcio no Brasil."
      },
      {
        question: "Como fica a guarda dos filhos após o divórcio?",
        answer: "A guarda pode ser compartilhada (ambos os pais participam nas decisões) ou unilateral (concedida a um dos pais). A justiça sempre prioriza o melhor interesse da criança, considerando fatores como vínculo afetivo, condições dos pais e estabilidade."
      }
    ],
    relatedServices: [
      {
        name: "Guarda de Filhos",
        path: "/servicos/guarda-filhos"
      },
      {
        name: "Pensão Alimentícia",
        path: "/servicos/pensao-alimenticia"
      },
      {
        name: "Inventário e Partilha",
        path: "/servicos/inventario-partilha"
      }
    ],
    mainAreaPath: "/familia"
  };

  return (
    <ServiceLandingLayout {...serviceData} />
  );
};

export default DivorceService;
