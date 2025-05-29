
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DireitosSociaisService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Direitos Sociais"
      serviceDescription="Defesa do acesso a direitos essenciais como saúde, educação, moradia, trabalho digno e previdência social, garantindo a efetivação das garantias constitucionais. Lutamos pela concretização dos direitos sociais fundamentais previstos no art. 6º da Constituição Federal."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Efetivação do Direito à Saúde",
          description: "Garantia de acesso universal e igualitário aos serviços de saúde, combatendo negativas de tratamento e medicamentos."
        },
        {
          title: "Direito à Educação de Qualidade",
          description: "Asseguramento do acesso à educação básica e superior, incluindo educação especial e políticas de inclusão."
        },
        {
          title: "Moradia Digna e Trabalho",
          description: "Proteção do direito à moradia adequada e trabalho em condições dignas, combatendo violações sociais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação da Violação Social",
          description: "Análise da negativa ou inadequação do serviço público essencial que viola direito social fundamental."
        },
        {
          step: 2,
          title: "Fundamentação Constitucional",
          description: "Demonstração da obrigação constitucional do Estado em garantir o direito social específico violado."
        },
        {
          step: 3,
          title: "Estratégia Judicial Adequada",
          description: "Escolha da ação mais eficaz: mandado de segurança, ação civil pública ou ação individual conforme a situação."
        },
        {
          step: 4,
          title: "Tutela de Urgência",
          description: "Pedido de liminar para garantia imediata do direito social quando há risco à vida, saúde ou dignidade."
        },
        {
          step: 5,
          title: "Execução e Monitoramento",
          description: "Acompanhamento da execução da decisão até a efetiva prestação do serviço ou direito social."
        }
      ]}
      testimonials={[
        {
          name: "Paciente Oncológico",
          quote: "Consegui o fornecimento de medicamento de alto custo que o Estado negava, salvando minha vida através da ação judicial."
        },
        {
          name: "Família de Estudante Especial",
          quote: "Garantimos o direito à educação inclusiva com profissional de apoio, efetivando a educação especial constitucional."
        }
      ]}
      faq={[
        {
          question: "Os direitos sociais são exigíveis judicialmente?",
          answer: "Sim. O STF reconhece que direitos sociais fundamentais são exigíveis, especialmente quando há omissão estatal que comprometa o mínimo existencial."
        },
        {
          question: "O que é o mínimo existencial?",
          answer: "É o conjunto de prestações materiais mínimas indispensáveis para uma vida digna, incluindo saúde básica, educação fundamental, moradia e alimentação."
        },
        {
          question: "Como superar a alegação de reserva do possível?",
          answer: "Demonstrando que o direito pleiteado integra o mínimo existencial ou que há recursos disponíveis mal aplicados, prevalecendo a dignidade humana."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        },
        {
          name: "Mandado de Segurança",
          path: "/servicos/mandado-seguranca"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default DireitosSociaisService;
