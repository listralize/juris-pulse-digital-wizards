
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const InventarioPartilhaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Inventário e Partilha"
      serviceDescription="Assessoria completa em processos de inventário judicial e extrajudicial, partilha de bens, arrolamento e todas as questões sucessórias pós-morte."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Inventário Extrajudicial Ágil",
          description: "Procedimento em cartório quando há consenso entre herdeiros, ausência de menores e testamento válido, reduzindo tempo e custos significativamente.",
          icon: "⚡"
        },
        {
          title: "Inventário Judicial Estratégico",
          description: "Condução técnica de inventários complexos com conflitos entre herdeiros, bens no exterior, empresa do falecido ou questões controvertidas.",
          icon: "⚖️"
        },
        {
          title: "Avaliação Patrimonial Precisa",
          description: "Levantamento completo e avaliação técnica de todos os bens: imóveis, veículos, investimentos, empresas, direitos autorais e patrimônio oculto.",
          icon: "📊"
        },
        {
          title: "Resolução de Conflitos Familiares",
          description: "Mediação especializada em disputas sucessórias, sobrepartilha, anulação de doações, sonegação de bens e defesa de direitos hereditários.",
          icon: "🤝"
        },
        {
          title: "Otimização Tributária Legal",
          description: "Estratégias para redução legal de tributos incidentes sobre a transmissão: ITCMD, imposto de renda e contribuições, preservando patrimônio familiar.",
          icon: "💰"
        },
        {
          title: "Regularização Documental Completa",
          description: "Providências para transferência de propriedades, regularização de registros, baixa de cadastros e atualização de todos os documentos necessários.",
          icon: "📋"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Abertura e Análise Inicial do Inventário",
          description: "Protocolo da abertura, análise de testamento (se houver), identificação de herdeiros legítimos, levantamento preliminar de bens e definição da estratégia processual."
        },
        {
          step: 2,
          title: "Levantamento Patrimonial Completo",
          description: "Mapeamento integral do patrimônio: bens imóveis, móveis, investimentos, participações societárias, direitos autorais, seguros de vida e eventuais dívidas."
        },
        {
          step: 3,
          title: "Citação e Manifestação dos Herdeiros",
          description: "Citação de todos os herdeiros, cônjuge, companheiro e interessados, colhimento de manifestações sobre inventário e eventuais impugnações ou habilitações."
        },
        {
          step: 4,
          title: "Avaliação Judicial dos Bens",
          description: "Nomeação de avaliador judicial, acompanhamento das avaliações, impugnação de valores inadequados e aprovação judicial das avaliações definitivas."
        },
        {
          step: 5,
          title: "Cálculo e Pagamento de Tributos",
          description: "Apuração do imposto de transmissão (ITCMD), imposto de renda sobre ganhos de capital, cálculo de custas processuais e recolhimento de tributos devidos."
        },
        {
          step: 6,
          title: "Elaboração do Plano de Partilha",
          description: "Divisão dos bens conforme lei ou testamento, formação de quinhões equilibrados, resolução de questões específicas e aprovação do plano pelos herdeiros."
        },
        {
          step: 7,
          title: "Homologação e Transferências Finais",
          description: "Homologação judicial da partilha, expedição de formal de partilha, transferência de propriedades, baixas em órgãos públicos e encerramento definitivo."
        }
      ]}
      testimonials={[
        {
          name: "Família Santos, Inventário Extrajudicial",
          quote: "O inventário da nossa mãe foi resolvido em apenas 3 meses no cartório. A agilidade e economia foram fundamentais para nossa família em momento tão difícil."
        },
        {
          name: "Carlos M., Herdeiro",
          quote: "Havia conflito entre irmãos sobre a partilha da empresa familiar. A mediação jurídica conseguiu um acordo que preservou tanto a empresa quanto os relacionamentos."
        },
        {
          name: "Ana Paula, Viúva",
          quote: "Como viúva com filhos menores, o inventário judicial foi necessário. A orientação jurídica me protegeu de decisões prejudiciais e garantiu os direitos das crianças."
        },
        {
          name: "Roberto L., Empresário",
          quote: "A complexidade do patrimônio do meu pai (imóveis, empresas, investimentos) exigiu trabalho técnico especializado. O resultado da partilha foi justo para todos."
        },
        {
          name: "Família Oliveira, Sobrepartilha",
          quote: "Descobrimos bens não incluídos no primeiro inventário. A sobrepartilha corrigiu a omissão e todos os herdeiros receberam suas cotas adequadamente."
        }
      ]}
      faq={[
        {
          question: "Qual a diferença entre inventário judicial e extrajudicial?",
          answer: "Extrajudicial é feito em cartório quando há consenso entre herdeiros maiores e capazes, sem testamento ou com testamento válido. Judicial é obrigatório quando há menores, incapazes, conflitos ou testamento contestado. O extrajudicial é mais rápido e econômico."
        },
        {
          question: "Quanto tempo demora um processo de inventário?",
          answer: "Inventário extrajudicial: 30 a 90 dias. Judicial consensual: 1 a 2 anos. Judicial litigioso: 3 a 5 anos ou mais. O prazo varia conforme complexidade patrimonial, número de herdeiros e existência de conflitos."
        },
        {
          question: "Quais documentos são necessários para abrir inventário?",
          answer: "Certidão de óbito, CPF e RG do falecido, certidão de casamento/união estável, certidões de nascimento dos filhos, documentos dos bens (escrituras, IPVA, extratos), última declaração de IR e eventual testamento."
        },
        {
          question: "É obrigatório fazer inventário mesmo para poucos bens?",
          answer: "Sim, qualquer patrimônio deixado pelo falecido exige inventário para transferência legal aos herdeiros. Mesmo bens de pequeno valor necessitam do procedimento, podendo ser por arrolamento quando o valor é inferior a 1000 salários mínimos."
        },
        {
          question: "Como funciona a partilha quando há testamento?",
          answer: "O testamento só pode dispor da metade dos bens (parte disponível). A outra metade (legítima) deve obrigatoriamente ir para herdeiros necessários. A partilha segue as disposições testamentárias válidas respeitando a legítima."
        },
        {
          question: "Posso renunciar à herança se há mais dívidas que bens?",
          answer: "Sim, a renúncia à herança deve ser feita através de escritura pública e é irrevogável. Importante analisar cuidadosamente antes de decidir, pois pode haver bens não conhecidos inicialmente."
        },
        {
          question: "Como são divididos os bens entre cônjuge e filhos?",
          answer: "Depende do regime de bens do casamento. Na comunhão parcial (mais comum), cônjuge tem direito à meação dos bens adquiridos na constância do casamento e concorre com filhos na herança dos bens particulares do falecido."
        },
        {
          question: "O que é sobrepartilha e quando é necessária?",
          answer: "Sobrepartilha ocorre quando são descobertos bens não incluídos no inventário original ou quando há erro na partilha anterior. É um procedimento complementar para incluir o patrimônio omitido ou corrigir equívocos."
        }
      ]}
      relatedServices={[
        {
          name: "Testamentos e Sucessões",
          path: "/servicos/testamentos-sucessoes"
        },
        {
          name: "Divórcio e Separação",
          path: "/servicos/divorcio"
        },
        {
          name: "Planejamento Tributário",
          path: "/servicos/planejamento-tributario"
        },
        {
          name: "Avaliação de Bens",
          path: "/servicos/avaliacao-bens"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default InventarioPartilhaService;
