
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const GuardaFilhosService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Guarda de Filhos"
      serviceDescription="Assessoria jurídica especializada em ações de guarda, regulamentação de visitas e proteção dos interesses das crianças e adolescentes em processos familiares."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Proteção do Melhor Interesse da Criança",
          description: "Estratégia jurídica focada na proteção dos direitos fundamentais e bem-estar físico, emocional e psicológico das crianças e adolescentes envolvidos.",
          icon: "🛡️"
        },
        {
          title: "Modalidades de Guarda Especializadas",
          description: "Conhecimento técnico em todas as modalidades: guarda unilateral, compartilhada, alternada e de terceiros, com escolha da mais adequada para cada caso.",
          icon: "⚖️"
        },
        {
          title: "Regulamentação de Visitas Detalhada",
          description: "Estabelecimento de cronogramas de visitação equilibrados, incluindo feriados, férias escolares, datas comemorativas e situações especiais.",
          icon: "📅"
        },
        {
          title: "Mediação Familiar Especializada",
          description: "Condução de processos de mediação para resolução amigável de conflitos, priorizando acordos que preservem as relações familiares.",
          icon: "🤝"
        },
        {
          title: "Acompanhamento Psicossocial",
          description: "Coordenação com equipe multidisciplinar incluindo psicólogos e assistentes sociais para avaliação técnica completa da dinâmica familiar.",
          icon: "👥"
        },
        {
          title: "Modificação e Revisão de Guardas",
          description: "Assessoria em pedidos de alteração de guarda e visitação quando há mudanças significativas nas circunstâncias familiares ou interesse dos menores.",
          icon: "🔄"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Detalhada da Situação Familiar",
          description: "Avaliação completa da dinâmica familiar, rotina das crianças, capacidade dos genitores e identificação dos pontos de conflito principais."
        },
        {
          step: 2,
          title: "Coleta de Documentação Probatória",
          description: "Reunião de documentos que comprovem a capacidade de cuidado: comprovantes de residência, renda, saúde, rede de apoio familiar e registros escolares."
        },
        {
          step: 3,
          title: "Tentativa de Acordo Extrajudicial",
          description: "Condução de negociações diretas entre as partes buscando acordo consensual sobre guarda e visitação, evitando desgaste judicial desnecessário."
        },
        {
          step: 4,
          title: "Ajuizamento da Ação de Guarda",
          description: "Elaboração e protocolo da petição inicial fundamentada, com pedidos claros sobre modalidade de guarda, visitação e outras questões pertinentes."
        },
        {
          step: 5,
          title: "Acompanhamento do Estudo Psicossocial",
          description: "Orientação para participação no estudo psicossocial obrigatório, preparação para entrevistas e visitas domiciliares da equipe técnica."
        },
        {
          step: 6,
          title: "Audiência de Conciliação e Instrução",
          description: "Representação nas audiências judiciais, apresentação de argumentos técnicos e busca por acordos que atendam o interesse superior dos menores."
        },
        {
          step: 7,
          title: "Execução e Acompanhamento da Decisão",
          description: "Implementação prática da decisão judicial, orientação sobre cumprimento das determinações e acompanhamento da adaptação familiar."
        }
      ]}
      testimonials={[
        {
          name: "Marina S., Mãe",
          quote: "Consegui a guarda compartilhada de forma amigável. A mediação foi fundamental para preservarmos uma boa relação em prol dos nossos filhos."
        },
        {
          name: "Roberto M., Pai",
          quote: "Estava há dois anos sem ver meus filhos. A ação de regulamentação de visitas me devolveu o direito de ser pai presente na vida deles."
        },
        {
          name: "Ana Paula L., Avó",
          quote: "Como avó, consegui a guarda dos meus netos após comprovar que oferecia o melhor ambiente para eles. A orientação jurídica foi essencial."
        },
        {
          name: "Carlos e Júlia, Ex-Casal",
          quote: "Mesmo com conflitos iniciais, chegamos a um acordo de guarda compartilhada que funciona perfeitamente para toda a família."
        },
        {
          name: "Fernanda T., Mãe Solo",
          quote: "A regulamentação das visitas trouxe segurança e previsibilidade para mim e minha filha. Agora temos uma rotina estabelecida e respeitada."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre guarda unilateral e compartilhada?",
          answer: "Na guarda unilateral, apenas um dos pais detém a guarda, com o outro exercendo direito de visitação. Na compartilhada, ambos os pais exercem a guarda conjuntamente, tomando decisões importantes em conjunto, mesmo que a criança resida principalmente com um deles."
        },
        {
          question: "A guarda compartilhada é obrigatória por lei?",
          answer: "Sim, desde 2014 a guarda compartilhada é a regra legal quando ambos os pais estão aptos. Só se aplica a guarda unilateral quando um dos pais não reúne condições de exercer o poder familiar ou quando há incompatibilidade absoluta entre os genitores."
        },
        {
          question: "Como é definido o valor da pensão alimentícia na guarda compartilhada?",
          answer: "Na guarda compartilhada, a pensão é calculada proporcionalmente à renda de cada genitor e ao tempo que a criança permanece com cada um. Pode haver compensação de valores conforme os gastos diretos de cada pai."
        },
        {
          question: "Avós podem pedir guarda dos netos?",
          answer: "Sim, avós e outros parentes podem requerer a guarda quando os pais não têm condições de exercer adequadamente o poder familiar. É necessário comprovar que a guarda com os avós atende melhor o interesse da criança."
        },
        {
          question: "É possível modificar a guarda já estabelecida?",
          answer: "Sim, a guarda pode ser modificada sempre que houver mudança significativa nas circunstâncias que justifique a alteração no interesse da criança. É necessário ação judicial específica com nova avaliação psicossocial."
        },
        {
          question: "Como funciona a visitação nos finais de semana e feriados?",
          answer: "Geralmente se estabelece visitação em finais de semana alternados, com pernoite, e divisão equilibrada de feriados e férias escolares. O regime pode ser adaptado conforme a rotina e necessidades específicas de cada família."
        },
        {
          question: "O que acontece se um dos pais não cumprir a visitação?",
          answer: "O descumprimento da visitação pode ser executado judicialmente, podendo resultar em multa, modificação da guarda e até mesmo crime de desobediência. É importante documentar todas as violações."
        },
        {
          question: "Crianças podem escolher com qual pai querem ficar?",
          answer: "A opinião da criança é considerada conforme sua idade e maturidade, mas não é determinante. O juiz sempre decide com base no melhor interesse do menor, considerando aspectos técnicos e psicossociais."
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
          name: "Proteção de Menores",
          path: "/servicos/protecao-menores"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default GuardaFilhosService;
