
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DivorceService = () => {
  return (
    <ServiceLandingLayout
      serviceId="divorcio"
      serviceArea="Direito de Família"
      serviceName="Divórcio e Separação"
      serviceDescription="Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes e na melhor solução para todas as partes envolvidas."
      mainImage="/placeholder.svg"
      benefits={[
        {
          title: "Orientação Especializada",
          description: "Assessoria jurídica completa durante todo o processo de divórcio, garantindo seus direitos."
        },
        {
          title: "Processo Ágil",
          description: "Trabalhamos para tornar o processo mais rápido e menos desgastante para todas as partes."
        },
        {
          title: "Proteção Patrimonial",
          description: "Garantimos a proteção dos seus bens e direitos patrimoniais durante o processo."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial",
          description: "Avaliamos sua situação e definimos a melhor estratégia para seu caso."
        },
        {
          step: 2,
          title: "Documentação",
          description: "Organizamos toda a documentação necessária para dar entrada no processo."
        },
        {
          step: 3,
          title: "Negociação",
          description: "Buscamos sempre o consenso, evitando desgastes desnecessários."
        },
        {
          step: 4,
          title: "Finalização",
          description: "Acompanhamos todo o processo até a homologação final do divórcio."
        }
      ]}
      testimonials={[
        {
          name: "Ana Silva",
          quote: "O processo foi muito mais tranquilo do que eu imaginava. A equipe me orientou em cada etapa."
        },
        {
          name: "Carlos Santos",
          quote: "Profissionais competentes que resolveram minha situação de forma eficiente e respeitosa."
        }
      ]}
      faq={[
        {
          question: "Quanto tempo demora um processo de divórcio?",
          answer: "O prazo varia conforme o tipo de divórcio e a complexidade do caso, mas trabalhamos para acelerar o processo."
        },
        {
          question: "É possível fazer divórcio sem brigas?",
          answer: "Sim, sempre buscamos o consenso e a mediação para resolver as questões de forma amigável."
        },
        {
          question: "Como fica a guarda dos filhos?",
          answer: "A guarda é definida sempre pensando no melhor interesse das crianças, podendo ser compartilhada ou unilateral."
        }
      ]}
      relatedServices={[
        { name: "Inventário e Partilha", path: "/servicos/inventario-partilha" },
        { name: "Guarda de Filhos", path: "/servicos/guarda-filhos" },
        { name: "Pensão Alimentícia", path: "/servicos/pensao-alimenticia" }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default DivorceService;
