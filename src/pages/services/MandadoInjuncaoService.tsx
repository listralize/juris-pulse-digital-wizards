
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const MandadoInjuncaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Mandado de Injunção"
      serviceDescription="A Constituição concede direitos, mas por vezes a lei omite a forma de exercê-los. O Mandado de Injunção é a chave para destravar esses direitos. Impetramos Mandado de Injunção para viabilizar o exercício de direitos constitucionais quando a ausência de norma regulamentadora torne inviável seu exercício. Não aceitamos omissões que tolham sua capacidade de agir."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Efetivação de Direitos Constitucionais",
          description: "Transformamos direitos constitucionais 'letra morta' em direitos exercíveis, superando omissões legislativas que impedem seu gozo efetivo."
        },
        {
          title: "Superação de Omissão Inconstitucional",
          description: "Combatemos a inércia do legislador que mantém direitos constitucionais sem regulamentação, forçando a criação de norma para o caso concreto."
        },
        {
          title: "Solução Judicial Direta",
          description: "Obtemos decisão judicial que supre a lacuna normativa, permitindo exercício imediato do direito constitucional, mesmo sem lei específica."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação da Omissão Legislativa",
          description: "Verificamos se existe direito constitucional que não pode ser exercido por falta de norma regulamentadora infraconstitucional."
        },
        {
          step: 2,
          title: "Demonstração do Nexo Causal",
          description: "Provamos que a impossibilidade de exercer o direito decorre especificamente da ausência de regulamentação legislativa ou normativa."
        },
        {
          step: 3,
          title: "Análise da Competência",
          description: "Determinamos o órgão competente para suprir a omissão e definimos a instância judicial adequada para julgamento da injunção."
        },
        {
          step: 4,
          title: "Fundamentação Constitucional Robusta",
          description: "Elaboramos petição com sólida base constitucional, demonstrando a importância do direito e os prejuízos causados pela omissão."
        },
        {
          step: 5,
          title: "Execução da Decisão Supletiva",
          description: "Garantimos o cumprimento da decisão que supre a omissão, viabilizando finalmente o exercício do direito constitucional."
        }
      ]}
      testimonials={[
        {
          name: "Sindicato dos Servidores Públicos",
          quote: "O mandado de injunção garantiu nosso direito constitucional de greve após décadas de omissão legislativa. Finalmente pudemos exercer este direito fundamental."
        },
        {
          name: "Confederação de Aposentados",
          quote: "Através de mandado de injunção coletivo, conseguimos regulamentação para direitos previdenciários que estavam bloqueados há anos por falta de lei específica."
        },
        {
          name: "Maria José - Servidora Pública",
          quote: "Meu direito à aposentadoria especial estava garantido na Constituição mas não regulamentado. O mandado de injunção viabilizou minha aposentadoria imediata."
        }
      ]}
      faq={[
        {
          question: "Quando cabe mandado de injunção?",
          answer: "Cabe mandado de injunção quando falta norma regulamentadora que torne inviável o exercício de direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, soberania e cidadania."
        },
        {
          question: "Qual a diferença entre mandado de injunção e ADI por omissão?",
          answer: "O mandado de injunção protege direito subjetivo individual ou coletivo, enquanto a ADI por omissão tem controle abstrato. A injunção gera efeitos inter partes, enquanto a ADI tem efeitos erga omnes."
        },
        {
          question: "O que acontece após o julgamento procedente?",
          answer: "O tribunal pode adotar diferentes posições: notificar o órgão competente para elaborar a norma, estabelecer prazo para regulamentação, ou suprir diretamente a omissão regulando o caso concreto."
        },
        {
          question: "Posso usar mandado de injunção para qualquer direito?",
          answer: "Não. Deve ser direito ou liberdade constitucional, ou prerrogativa de nacionalidade, soberania e cidadania que esteja inviabilizado especificamente pela falta de norma regulamentadora."
        }
      ]}
      relatedServices={[
        {
          name: "Ações de Inconstitucionalidade",
          path: "/servicos/acoes-inconstitucionalidade"
        },
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default MandadoInjuncaoService;
