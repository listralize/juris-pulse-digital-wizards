
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const InventarioPartilhaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito da Família"
      serviceName="Inventário e Partilha de Bens"
      serviceDescription="Assessoria jurídica especializada em processos de inventário após falecimento e partilha de bens em casos de divórcio, garantindo uma distribuição justa e eficiente do patrimônio."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Agilidade Processual",
          description: "Estratégias para concluir o inventário e a partilha no menor tempo possível, evitando atrasos desnecessários."
        },
        {
          title: "Economia Tributária",
          description: "Planejamento para minimizar a carga tributária incidente sobre a transmissão dos bens, respeitando a legislação."
        },
        {
          title: "Solução de Conflitos",
          description: "Mediação eficaz para resolver disputas entre herdeiros ou ex-cônjuges, buscando acordos que satisfaçam todas as partes."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Gratuita",
          description: "Realizamos uma análise preliminar do seu caso, entendemos as características do patrimônio envolvido e explicamos as opções disponíveis."
        },
        {
          step: 2,
          title: "Levantamento Patrimonial",
          description: "Fazemos um levantamento detalhado de todos os bens, direitos e dívidas que compõem o patrimônio a ser partilhado."
        },
        {
          step: 3,
          title: "Documentação e Preparação",
          description: "Preparamos toda a documentação necessária para dar entrada no processo, incluindo certidões, avaliações e documentos de propriedade."
        },
        {
          step: 4,
          title: "Procedimento Judicial ou Extrajudicial",
          description: "Dependendo do caso, podemos optar pelo inventário judicial ou extrajudicial (em cartório), sempre buscando a opção mais eficiente."
        },
        {
          step: 5,
          title: "Finalização e Registros",
          description: "Cuidamos de todos os detalhes para a conclusão do processo, incluindo o pagamento de impostos e os registros de transferência dos bens."
        }
      ]}
      testimonials={[
        {
          name: "Roberto C.",
          quote: "O inventário do meu pai foi concluído em tempo recorde, com uma economia tributária que não imaginávamos ser possível."
        },
        {
          name: "Ana Paula M.",
          quote: "A mediação durante a partilha de bens no divórcio foi fundamental para chegarmos a um acordo justo e sem maiores desgastes emocionais."
        },
        {
          name: "Família Santos",
          quote: "Conseguimos resolver um inventário complexo, com bens em diferentes estados, de forma organizada e eficiente, preservando a harmonia familiar."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre inventário judicial e extrajudicial?",
          answer: "O inventário judicial é processado perante um juiz e é obrigatório quando há herdeiros menores ou incapazes, ou quando não há consenso entre os herdeiros. O extrajudicial é realizado em cartório, é mais rápido e menos custoso, mas só é possível quando todos os herdeiros são capazes e concordam com a partilha."
        },
        {
          question: "Qual o prazo para abertura do inventário?",
          answer: "O prazo legal é de até 60 dias após o falecimento, mas na prática, esse prazo é frequentemente estendido. No entanto, atrasos podem resultar em multas no pagamento do ITCMD (Imposto de Transmissão Causa Mortis e Doação)."
        },
        {
          question: "Posso vender um bem que faz parte de um inventário ainda não concluído?",
          answer: "Em regra, não é possível vender bens do espólio antes da conclusão do inventário. Excepcionalmente, com autorização judicial, pode-se alienar bens para pagamento de dívidas urgentes do espólio ou para evitar deterioração."
        }
      ]}
      relatedServices={[
        {
          name: "Testamentos e Sucessões",
          path: "/servicos/testamentos-sucessoes"
        },
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio-separacao"
        }
      ]}
      mainAreaPath="/familia"
    />
  );
};

export default InventarioPartilhaService;
