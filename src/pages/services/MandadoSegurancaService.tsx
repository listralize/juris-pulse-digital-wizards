
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const MandadoSegurancaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Mandado de Segurança"
      serviceDescription="Quando o direito é cristalino e a burocracia tenta obscurecê-lo, o Mandado de Segurança é a resposta imediata. Impetramos mandados de segurança para proteger direito líquido e certo ameaçado ou violado por autoridade pública. Não esperamos; agimos. Garantimos que a justiça seja rápida e que o direito, inegável, seja respeitado sem delongas."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção Imediata de Direitos",
          description: "O mandado de segurança oferece tutela rápida e eficaz para direitos líquidos e certos, garantindo proteção imediata contra abusos de autoridade."
        },
        {
          title: "Procedimento Especial Célere",
          description: "Utilizamos o rito especial do mandado de segurança para obter decisões em prazo muito menor que ações ordinárias, protegendo seus interesses com urgência."
        },
        {
          title: "Ampla Aplicabilidade",
          description: "Cabível contra atos de qualquer autoridade pública - federal, estadual ou municipal - que violem direitos líquidos e certos do impetrante."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação do Direito Líquido e Certo",
          description: "Analisamos se existe direito líquido e certo violado ou ameaçado, verificando se está comprovado documentalmente de forma inequívoca."
        },
        {
          step: 2,
          title: "Verificação da Autoridade Coatora",
          description: "Identificamos corretamente a autoridade responsável pelo ato impugnado, elemento essencial para o sucesso da impetração."
        },
        {
          step: 3,
          title: "Coleta de Documentação Comprobatória",
          description: "Reunimos toda documentação necessária que comprove o direito alegado e a ilegalidade ou abuso de poder praticado."
        },
        {
          step: 4,
          title: "Impetração Estratégica",
          description: "Elaboramos petição inicial técnica e objetiva, com fundamentação jurídica sólida e pedido de liminar quando cabível."
        },
        {
          step: 5,
          title: "Acompanhamento até Decisão Final",
          description: "Monitoramos todo o processo, contestamos informações da autoridade e, se necessário, recorremos para garantir o cumprimento da decisão."
        }
      ]}
      testimonials={[
        {
          name: "João Silva - Servidor Público",
          quote: "O mandado de segurança garantiu minha posse no cargo público após aprovação em concurso. A liminar foi deferida em 48 horas, evitando prejuízos irreparáveis."
        },
        {
          name: "Empresa ABC Ltda.",
          quote: "Através de mandado de segurança, conseguimos suspender multa fiscal indevida de R$ 500.000, preservando nosso fluxo de caixa enquanto provávamos nossa razão."
        },
        {
          name: "Maria Santos - Aposentada",
          quote: "O mandado de segurança garantiu o reconhecimento do meu direito à aposentadoria especial negada pelo INSS. Justiça rápida e eficaz."
        }
      ]}
      faq={[
        {
          question: "O que é considerado direito líquido e certo?",
          answer: "Direito líquido e certo é aquele que está comprovado documentalmente de forma inequívoca, não dependendo de dilação probatória. Deve ser um direito subjetivo individual, concreto e determinado, demonstrado por documentos indiscutíveis."
        },
        {
          question: "Contra quais autoridades posso impetrar mandado de segurança?",
          answer: "O mandado de segurança pode ser impetrado contra qualquer autoridade pública (federal, estadual, municipal) ou agente de pessoa jurídica no exercício de atribuições públicas que pratique ato ilegal ou com abuso de poder."
        },
        {
          question: "Qual o prazo para impetrar mandado de segurança?",
          answer: "O prazo decadencial é de 120 dias contados da ciência do ato impugnado. Após esse prazo, não é mais possível utilizar esta modalidade de ação constitucional."
        },
        {
          question: "É possível obter liminar em mandado de segurança?",
          answer: "Sim, é possível obter liminar quando presentes os requisitos: relevância da fundamentação (fumus boni juris) e possibilidade de dano de difícil reparação (periculum in mora). A liminar pode suspender imediatamente os efeitos do ato impugnado."
        }
      ]}
      relatedServices={[
        {
          name: "Habeas Corpus",
          path: "/servicos/habeas-corpus"
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

export default MandadoSegurancaService;
