
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const DivorcioService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Divórcio e Separação"
      serviceDescription="Assessoria jurídica completa em processos de divórcio consensual e litigioso, dissolução de união estável e partilha de bens, priorizando soluções ágeis e menos desgastantes."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Divórcio Consensual Extrajudicial",
          description: "Realização de divórcio em cartório quando há acordo total entre as partes, sem filhos menores ou incapazes, com procedimento mais rápido e econômico.",
          icon: "📋"
        },
        {
          title: "Mediação e Negociação Especializada",
          description: "Condução de processos de mediação familiar para resolução amigável de conflitos sobre bens, guarda e pensão, evitando desgaste emocional desnecessário.",
          icon: "🤝"
        },
        {
          title: "Proteção Patrimonial Estratégica",
          description: "Estratégias para proteção do patrimônio individual, análise detalhada de bens adquiridos antes e durante o casamento conforme regime escolhido.",
          icon: "🛡️"
        },
        {
          title: "Partilha de Bens Especializada",
          description: "Avaliação e partilha criteriosa de todos os bens do casal, incluindo imóveis, empresas, investimentos, previdência privada e bens de difícil divisão.",
          icon: "⚖️"
        },
        {
          title: "Proteção dos Filhos Menores",
          description: "Estabelecimento de acordos sobre guarda, visitação e pensão alimentícia que priorizem o bem-estar e interesse superior das crianças envolvidas.",
          icon: "👶"
        },
        {
          title: "Dissolução de União Estável",
          description: "Assessoria especializada na dissolução de união estável, com reconhecimento de direitos patrimoniais e estabelecimento de acordos sobre bens comuns.",
          icon: "💔"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial e Análise da Situação",
          description: "Avaliação detalhada da situação matrimonial, regime de bens, existência de filhos, patrimônio do casal e identificação da melhor estratégia legal."
        },
        {
          step: 2,
          title: "Levantamento Patrimonial Completo",
          description: "Mapeamento detalhado de todos os bens, direitos, dívidas e obrigações do casal, incluindo bens ocultos e participações societárias."
        },
        {
          step: 3,
          title: "Tentativa de Acordo Amigável",
          description: "Condução de negociações diretas ou mediação para buscar acordo consensual sobre todos os aspectos do divórcio, priorizando soluções equilibradas."
        },
        {
          step: 4,
          title: "Elaboração de Acordo ou Petição",
          description: "Redação detalhada do acordo de divórcio consensual ou petição inicial fundamentada para divórcio litigioso, com todos os pedidos necessários."
        },
        {
          step: 5,
          title: "Procedimento Cartorial ou Judicial",
          description: "Acompanhamento do processo em cartório (consensual) ou condução do processo judicial (litigioso) até decisão final transitada em julgado."
        },
        {
          step: 6,
          title: "Execução da Partilha de Bens",
          description: "Implementação prática da partilha acordada ou determinada judicialmente, com transferência de propriedades e regularização documentária."
        },
        {
          step: 7,
          title: "Acompanhamento Pós-Divórcio",
          description: "Orientação sobre cumprimento de obrigações estabelecidas, alteração de documentos pessoais e apoio em questões supervenientes."
        }
      ]}
      testimonials={[
        {
          name: "Sandra e Paulo, Ex-Casal",
          quote: "O divórcio consensual foi resolvido em apenas 30 dias no cartório. A orientação jurídica nos ajudou a chegar a um acordo justo para ambos."
        },
        {
          name: "Mariana R., Empresária",
          quote: "A proteção da minha empresa familiar durante o divórcio foi fundamental. A estratégia jurídica preservou meu patrimônio empresarial."
        },
        {
          name: "Roberto C., Médico",
          quote: "Mesmo em um divórcio litigioso complexo, conseguimos resolver a partilha de forma equilibrada, protegendo os interesses dos nossos filhos."
        },
        {
          name: "Ana Paula M., Professora",
          quote: "A dissolução da união estável foi tratada com o mesmo cuidado de um casamento formal. Meus direitos patrimoniais foram totalmente preservados."
        },
        {
          name: "Carlos L., Engenheiro",
          quote: "A mediação familiar evitou um processo judicial desgastante. Conseguimos manter uma boa relação para cuidar dos nossos filhos."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre divórcio consensual e litigioso?",
          answer: "O divórcio consensual ocorre quando há acordo total entre as partes sobre bens, guarda e pensão, podendo ser feito em cartório se não houver filhos menores. O litigioso é judicial, quando há discordâncias que precisam ser decididas pelo juiz."
        },
        {
          question: "É possível fazer divórcio sem advogado?",
          answer: "Apenas no divórcio consensual em cartório, quando não há filhos menores ou incapazes e há acordo total. Mesmo nesses casos, a orientação jurídica é recomendável para proteger direitos."
        },
        {
          question: "Como funciona a partilha no regime de comunhão parcial?",
          answer: "No regime de comunhão parcial, são partilhados apenas os bens adquiridos durante o casamento. Bens anteriores ao casamento, heranças e doações exclusivas permanecem com o proprietário original."
        },
        {
          question: "Quanto tempo demora um processo de divórcio?",
          answer: "Divórcio consensual em cartório: 15 a 30 dias. Divórcio consensual judicial: 2 a 6 meses. Divórcio litigioso: 1 a 3 anos, dependendo da complexidade patrimonial e existência de filhos."
        },
        {
          question: "É possível pedir pensão alimentícia para ex-cônjuge?",
          answer: "Sim, quando comprovada necessidade de um cônjuge e capacidade contributiva do outro. Geralmente é temporária, visando permitir a recolocação profissional e independência financeira."
        },
        {
          question: "Como ficam os filhos no processo de divórcio?",
          answer: "Os pais devem estabelecer acordo sobre guarda (preferencialmente compartilhada), visitação e pensão alimentícia. Na falta de acordo, o juiz decide com base no melhor interesse das crianças."
        },
        {
          question: "Posso modificar o acordo de divórcio depois?",
          answer: "Questões sobre filhos (guarda, visitação, pensão) podem ser modificadas conforme mudanças na situação. A partilha de bens, uma vez homologada, só pode ser alterada em casos excepcionais."
        },
        {
          question: "Como proceder se o ex-cônjuge não cumpre o acordo?",
          answer: "O descumprimento pode ser executado judicialmente, resultando em penhora de bens, bloqueio de contas, protesto de nome e outras medidas coercitivas conforme a obrigação descumprida."
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
          name: "Casamento e União Estável",
          path: "/servicos/casamento-uniao"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default DivorcioService;
