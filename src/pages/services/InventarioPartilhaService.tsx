
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const InventarioPartilhaService = () => {
  return (
    <ServiceLandingLayout
      serviceId="inventario-partilha"
      serviceArea="Direito Civil"
      serviceName="Inventário e Partilha"
      serviceDescription="Assessoria completa para inventário e partilha de bens, garantindo que o processo seja conduzido de forma eficiente e respeitando os direitos de todos os herdeiros."
      mainImage="/placeholder.svg"
      benefits={[
        {
          title: "Processo Simplificado",
          description: "Tornamos o inventário mais ágil e menos burocrático para sua família.",
          icon: "⚖️"
        },
        {
          title: "Proteção dos Direitos",
          description: "Garantimos que todos os herdeiros tenham seus direitos respeitados.",
          icon: "🛡️"
        },
        {
          title: "Assessoria Completa",
          description: "Acompanhamos todo o processo do início ao fim.",
          icon: "📋"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Documentação",
          description: "Revisamos todos os documentos necessários para dar início ao inventário."
        },
        {
          step: 2,
          title: "Abertura do Inventário",
          description: "Protocolamos a ação de inventário no cartório competente."
        },
        {
          step: 3,
          title: "Avaliação dos Bens",
          description: "Realizamos a avaliação de todos os bens que compõem o espólio."
        },
        {
          step: 4,
          title: "Partilha dos Bens",
          description: "Conduzimos a partilha respeitando a vontade do falecido e os direitos dos herdeiros."
        }
      ]}
      testimonials={[
        {
          name: "Maria Silva",
          quote: "O processo foi muito mais tranquilo do que eu imaginava. A equipe me orientou em cada etapa."
        },
        {
          name: "João Santos",
          quote: "Profissionais competentes que resolveram uma situação complexa de forma eficiente."
        }
      ]}
      faq={[
        {
          question: "Quanto tempo demora um inventário?",
          answer: "O prazo varia conforme a complexidade dos bens e documentação, mas trabalhamos para acelerar o processo ao máximo."
        },
        {
          question: "É obrigatório fazer inventário?",
          answer: "Sim, é obrigatório abrir inventário quando há bens a serem partilhados entre herdeiros."
        },
        {
          question: "Posso fazer inventário extrajudicial?",
          answer: "Sim, quando todos os herdeiros são maiores e capazes e há consenso sobre a partilha."
        }
      ]}
      relatedServices={[
        { name: "Divórcio", path: "/servicos/divorcio" },
        { name: "Testamentos", path: "/servicos/testamentos-sucessoes" },
        { name: "Adoção", path: "/servicos/adocao" }
      ]}
      mainAreaPath="/areas/civil"
    />
  );
};

export default InventarioPartilhaService;
