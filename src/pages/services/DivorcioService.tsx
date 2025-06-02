
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DivorcioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Divórcio"
      serviceDescription="Assessoria completa e humanizada em processos de divórcio, priorizando acordos amigáveis e protegendo os direitos de todos os envolvidos, especialmente dos filhos."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Divórcio Consensual",
          description: "Condução de divórcios por acordo, mais rápidos e menos desgastantes para a família."
        },
        {
          title: "Proteção dos Filhos",
          description: "Elaboração de acordos que priorizam o bem-estar e interesse superior das crianças."
        },
        {
          title: "Divisão Patrimonial Justa",
          description: "Assessoria na partilha de bens garantindo direitos e evitando conflitos."
        },
        {
          title: "Pensão Alimentícia",
          description: "Cálculo e fixação adequada de pensão alimentícia conforme capacidade e necessidade."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Situação",
          description: "Avaliação completa da situação familiar, patrimonial e dos filhos para definir a melhor estratégia."
        },
        {
          step: 2,
          title: "Tentativa de Acordo",
          description: "Busca por solução consensual através de mediação e negociação entre as partes."
        },
        {
          step: 3,
          title: "Elaboração de Acordos",
          description: "Redação de acordo de divórcio contemplando guarda, visitação, pensão e partilha de bens."
        },
        {
          step: 4,
          title: "Processo Judicial",
          description: "Condução do processo de divórcio no cartório (consensual) ou tribunal (litigioso)."
        },
        {
          step: 5,
          title: "Acompanhamento Pós-Divórcio",
          description: "Orientação sobre cumprimento do acordo e modificações futuras se necessário."
        }
      ]}
      testimonials={[
        {
          name: "Carla M., Divorciada",
          quote: "O processo foi conduzido com muito cuidado e respeito. Conseguimos um acordo que protegeu nossos filhos."
        },
        {
          name: "Roberto S., Pai",
          quote: "A assessoria me ajudou a manter uma relação saudável com meus filhos após o divórcio."
        },
        {
          name: "Fernanda L., Mãe",
          quote: "Profissionais sensíveis que entenderam nossas necessidades e nos ajudaram em um momento difícil."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre separação e divórcio?",
          answer: "Com a nova lei, não existe mais separação judicial. O divórcio pode ser direto, dissolvendo definitivamente o casamento e permitindo novo casamento."
        },
        {
          question: "É obrigatório ter advogado para o divórcio?",
          answer: "Sim, é obrigatória a assistência de advogado em todos os tipos de divórcio, seja consensual ou litigioso."
        },
        {
          question: "Como funciona a guarda compartilhada?",
          answer: "Na guarda compartilhada, ambos os pais exercem o poder familiar e tomam decisões conjuntas sobre os filhos, mesmo que a residência seja alternada."
        },
        {
          question: "Posso fazer divórcio no cartório?",
          answer: "Sim, quando há acordo entre os cônjuges, não há filhos menores ou incapazes, e ambos estão assistidos por advogados."
        }
      ]}
      relatedServices={[
        {
          name: "Pensão Alimentícia",
          path: "/servicos/pensao-alimenticia"
        },
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "União Estável",
          path: "/servicos/uniao-estavel"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default DivorcioService;
