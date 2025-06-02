
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DivorcioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Divórcio e Separação"
      serviceDescription="Assessoria jurídica completa em processos de divórcio consensual e litigioso, separação e dissolução de união estável, com foco na proteção dos direitos de toda a família."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Divórcio Consensual Rápido",
          description: "Procedimento extrajudicial em cartório para casais sem filhos menores ou incapazes, sem necessidade de advogado comum.",
          icon: "⚡"
        },
        {
          title: "Proteção Patrimonial",
          description: "Orientação especializada sobre partilha de bens, proteção de patrimônio e planejamento sucessório pós-divórcio.",
          icon: "🛡️"
        },
        {
          title: "Mediação Familiar",
          description: "Técnicas de mediação para resolução amigável de conflitos, preservando relacionamentos familiares.",
          icon: "🕊️"
        },
        {
          title: "Defesa em Divórcio Litigioso",
          description: "Representação técnica especializada quando não há acordo, protegendo direitos e interesses em todas as instâncias.",
          icon: "⚖️"
        },
        {
          title: "Cuidado com os Filhos",
          description: "Orientação sobre guarda, visitação e pensão alimentícia, sempre priorizando o bem-estar das crianças.",
          icon: "👨‍👩‍👧‍👦"
        },
        {
          title: "Aspectos Previdenciários",
          description: "Orientação sobre divisão de benefícios previdenciários e manutenção de direitos após o divórcio.",
          icon: "📋"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta e Avaliação Inicial",
          description: "Análise completa da situação conjugal, patrimonial e familiar. Identificação da modalidade de divórcio mais adequada e orientação sobre direitos e deveres."
        },
        {
          step: 2,
          title: "Inventário Patrimonial",
          description: "Levantamento detalhado de todos os bens, direitos e obrigações do casal, incluindo imóveis, veículos, investimentos e dívidas."
        },
        {
          step: 3,
          title: "Negociação e Acordo",
          description: "Mediação para construção de acordo abrangendo partilha de bens, guarda de filhos, pensão alimentícia e visitação."
        },
        {
          step: 4,
          title: "Documentação Legal",
          description: "Preparação de toda documentação necessária: escritura de divórcio, acordo de partilha, termo de guarda e visitação."
        },
        {
          step: 5,
          title: "Procedimento Cartorial ou Judicial",
          description: "Execução do divórcio em cartório (quando consensual) ou ajuizamento de ação judicial (quando litigioso)."
        },
        {
          step: 6,
          title: "Transferência de Bens",
          description: "Acompanhamento das transferências imobiliárias, alterações societárias e demais providências decorrentes da partilha."
        },
        {
          step: 7,
          title: "Acompanhamento Pós-Divórcio",
          description: "Orientação sobre cumprimento de obrigações, modificação de acordos e resolução de questões supervenientes."
        }
      ]}
      testimonials={[
        {
          name: "Marina S., Empresária",
          quote: "O divórcio consensual foi concluído em 30 dias. A orientação sobre proteção do patrimônio empresarial foi fundamental para manter meus negócios seguros."
        },
        {
          name: "Carlos R., Professor",
          quote: "Mesmo sendo um divórcio litigioso, conseguimos chegar a um acordo justo que protegeu os direitos dos meus filhos e preservou nosso relacionamento como pais."
        },
        {
          name: "Ana Paula M., Médica",
          quote: "A mediação familiar evitou um desgaste maior. Hoje mantenho uma relação respeitosa com meu ex-marido pelo bem das nossas crianças."
        },
        {
          name: "Roberto L., Engenheiro",
          quote: "A orientação sobre questões previdenciárias me ajudou a manter meus direitos de aposentadoria após 20 anos de casamento."
        },
        {
          name: "Fernanda P., Arquiteta",
          quote: "O acompanhamento durante todo o processo de partilha dos imóveis garantiu que tudo fosse feito dentro da legalidade e sem surpresas."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre divórcio consensual e litigioso?",
          answer: "O divórcio consensual ocorre quando há acordo entre os cônjuges sobre todos os aspectos (partilha, guarda, pensão). Pode ser feito em cartório se não houver filhos menores. O divórcio litigioso é necessário quando não há acordo, exigindo decisão judicial sobre os pontos controvertidos."
        },
        {
          question: "É possível fazer divórcio sem advogado?",
          answer: "Apenas no divórcio consensual em cartório, quando o casal não tem filhos menores ou incapazes e há acordo sobre a partilha. Em todos os outros casos, é obrigatória a assistência de advogado."
        },
        {
          question: "Quanto tempo demora um processo de divórcio?",
          answer: "Divórcio consensual em cartório: 15 a 30 dias. Divórcio consensual judicial: 2 a 6 meses. Divórcio litigioso: 1 a 3 anos, dependendo da complexidade e grau de conflito."
        },
        {
          question: "Como funciona a partilha de bens no divórcio?",
          answer: "Depende do regime de bens do casamento. No regime da comunhão parcial (padrão), divide-se tudo adquirido após o casamento. Na comunhão universal, divide-se tudo. Na separação de bens, cada um fica com o que é seu."
        },
        {
          question: "Posso mudar meu nome após o divórcio?",
          answer: "Sim, a mulher pode escolher voltar ao nome de solteira ou manter o nome de casada. A decisão deve ser manifestada no processo de divórcio ou posteriormente através de procedimento específico."
        },
        {
          question: "O que acontece com as dívidas no divórcio?",
          answer: "Dívidas contraídas em benefício da família são divididas entre os cônjuges. Dívidas pessoais de cada um permanecem de responsabilidade individual. É importante fazer prova da destinação de cada dívida."
        },
        {
          question: "Posso solicitar pensão alimentícia para mim?",
          answer: "Sim, é possível em casos excepcionais quando um dos cônjuges não tem condições de se manter, considerando idade, saúde, qualificação profissional e padrão de vida durante o casamento. Geralmente é temporária."
        },
        {
          question: "Como fica a guarda dos filhos no divórcio?",
          answer: "A lei estabelece a guarda compartilhada como regra, salvo se um dos pais não reunir condições. A decisão sempre considera o melhor interesse da criança, incluindo aspectos emocionais, sociais e materiais."
        }
      ]}
      relatedServices={[
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
