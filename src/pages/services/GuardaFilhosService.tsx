
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GuardaFilhosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Guarda de Filhos"
      serviceDescription="Assessoria jurídica especializada em questões de guarda compartilhada, unilateral, direito de visitas e convivência parental, priorizando sempre o melhor interesse da criança e adolescente."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Priorização do Bem-Estar",
          description: "Estratégias que priorizam o bem-estar psicológico e emocional das crianças durante todo o processo, seguindo o princípio do melhor interesse.",
          icon: "❤️"
        },
        {
          title: "Acordos Equilibrados",
          description: "Mediação para estabelecer acordos equilibrados de guarda e convivência que respeitem os direitos de ambos os pais e das crianças.",
          icon: "⚖️"
        },
        {
          title: "Resolução de Conflitos",
          description: "Abordagem focada na resolução de conflitos e na construção de um ambiente saudável de coparentalidade.",
          icon: "🤝"
        },
        {
          title: "Expertise Jurídica",
          description: "Conhecimento aprofundado da legislação atual e jurisprudência dos tribunais superiores em matéria de guarda.",
          icon: "📚"
        },
        {
          title: "Acompanhamento Psicossocial",
          description: "Trabalho conjunto com equipe multidisciplinar para garantir avaliações técnicas qualificadas.",
          icon: "👥"
        },
        {
          title: "Urgência e Agilidade",
          description: "Atuação em medidas urgentes e liminares quando há risco ao bem-estar da criança ou adolescente.",
          icon: "⚡"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Detalhada",
          description: "Análise completa da situação familiar, histórico de convivência, rotina das crianças e identificação de questões urgentes. Orientação sobre direitos e deveres parentais."
        },
        {
          step: 2,
          title: "Avaliação Estratégica",
          description: "Desenvolvimento de estratégia personalizada considerando aspectos psicológicos, sociais e jurídicos. Definição da modalidade de guarda mais adequada ao caso."
        },
        {
          step: 3,
          title: "Preparação Documental",
          description: "Reunião de documentos probatórios, laudos técnicos, comprovantes de residência, renda e condições de moradia. Organização de prontuário completo."
        },
        {
          step: 4,
          title: "Tentativa de Acordo",
          description: "Mediação familiar para busca de solução consensual, com definição de guarda, visitação e pensão alimentícia de forma harmoniosa."
        },
        {
          step: 5,
          title: "Ação Judicial",
          description: "Quando necessário, ajuizamento de ação de guarda com pedidos de liminar, produção de provas e acompanhamento de audiências."
        },
        {
          step: 6,
          title: "Estudo Psicossocial",
          description: "Acompanhamento durante estudo social e avaliação psicológica realizados pela equipe técnica do Judiciário."
        },
        {
          step: 7,
          title: "Execução e Monitoramento",
          description: "Acompanhamento do cumprimento da decisão judicial e orientação para eventuais modificações futuras conforme mudança de circunstâncias."
        }
      ]}
      testimonials={[
        {
          name: "Ricardo M., Pai",
          quote: "A guarda compartilhada parecia impossível devido aos conflitos, mas com a mediação especializada conseguimos um acordo que realmente funciona para nossa filha."
        },
        {
          name: "Patrícia L., Mãe",
          quote: "Em um momento tão delicado, ter profissionais que realmente se importam com o aspecto emocional das crianças fez toda a diferença no resultado."
        },
        {
          name: "Fernando S., Pai Solo",
          quote: "Consegui a guarda unilateral do meu filho após comprovar a melhor condição de cuidado. O suporte jurídico foi essencial em cada etapa."
        },
        {
          name: "Carla e João, Pais",
          quote: "A orientação sobre visitação nos ajudou a estabelecer uma rotina saudável que respeita os direitos de todos e mantém a estabilidade das crianças."
        },
        {
          name: "Ana Paula, Avó",
          quote: "Como avó que buscava a guarda dos netos, recebi todo o suporte necessário para comprovar que oferecia o melhor ambiente familiar."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre guarda compartilhada e guarda alternada?",
          answer: "Na guarda compartilhada, ambos os pais compartilham as decisões importantes sobre a vida dos filhos (educação, saúde, lazer), independentemente de com quem a criança resida. A criança tem residência fixa com um dos pais e visitação com o outro. Já na guarda alternada, a criança passa períodos iguais com cada genitor, alternando residências. A legislação brasileira privilegia a guarda compartilhada como regra geral."
        },
        {
          question: "Como é definido o tempo de convivência de cada genitor com os filhos?",
          answer: "O tempo de convivência é definido considerando: rotina escolar e atividades da criança, proximidade das residências, disponibilidade dos pais, idade e preferência da criança (quando tem discernimento), e principalmente o melhor interesse do menor. Normalmente inclui finais de semana alternados, feriados divididos e período de férias escolares."
        },
        {
          question: "É possível alterar um acordo de guarda já homologado?",
          answer: "Sim, é possível modificar acordos de guarda quando houver mudança significativa nas circunstâncias que justifique a alteração, sempre observando o melhor interesse da criança. Exemplos: mudança de cidade, alteração na condição financeira, novos relacionamentos, problemas de saúde ou comportamentais."
        },
        {
          question: "Avós podem obter a guarda dos netos?",
          answer: "Sim, avós e outros parentes podem obter a guarda quando comprovarem que oferecem melhores condições que os pais ou quando os pais estão impossibilitados de exercer o poder familiar (por morte, incapacidade, abandono ou situações de risco)."
        },
        {
          question: "Como funciona a guarda compartilhada na prática?",
          answer: "Na guarda compartilhada, ambos os pais mantêm o poder familiar e tomam decisões conjuntas sobre questões importantes. A criança tem residência principal com um dos pais e convivência regular com o outro. Decisões sobre escola, médico, viagens precisam ser consensuais ou, em caso de impasse, definidas judicialmente."
        },
        {
          question: "Qual o papel do Ministério Público em ações de guarda?",
          answer: "O Ministério Público atua como fiscal da lei e defensor dos direitos da criança e adolescente. Emite parecer em todas as ações, pode requisitar estudos técnicos e tem legitimidade para propor ações quando há violação de direitos fundamentais dos menores."
        },
        {
          question: "Posso viajar com meu filho sem autorização do outro genitor?",
          answer: "Para viagens nacionais, geralmente não é necessária autorização quando se tem a guarda. Para viagens internacionais, é obrigatória autorização expressa do outro genitor ou autorização judicial. Em caso de guarda compartilhada, recomenda-se sempre comunicar e, se possível, obter anuência prévia."
        },
        {
          question: "Como é feito o estudo psicossocial?",
          answer: "O estudo psicossocial é realizado por assistente social e psicólogo do Judiciário, incluindo: entrevistas com pais e filhos, visita domiciliar, análise das condições socioeconômicas e psicológicas, avaliação do vínculo afetivo e relatório técnico fundamentado que subsidia a decisão judicial."
        }
      ]}
      relatedServices={[
        {
          name: "Pensão Alimentícia",
          path: "/servicos/pensao-alimenticia"
        },
        {
          name: "Divórcio",
          path: "/servicos/divorcio"
        },
        {
          name: "Adoção",
          path: "/servicos/adocao"
        },
        {
          name: "Investigação de Paternidade",
          path: "/servicos/investigacao-paternidade"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default GuardaFilhosService;
