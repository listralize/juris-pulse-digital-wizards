
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const InventarioPartilhaService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Inventário e Partilha"
      serviceDescription="Resolva a sucessão familiar com agilidade e segurança jurídica. Oferecemos assessoria completa em inventários judiciais e extrajudiciais, protegendo seu patrimônio e garantindo partilha justa entre herdeiros."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Inventário Extrajudicial Ultrarrápido",
          description: "Quando há consenso entre herdeiros maiores e capazes, realizamos inventário em cartório em 30 a 90 dias, com economia de até 70% nos custos e sem desgaste de processo judicial prolongado.",
          icon: "⚡"
        },
        {
          title: "Mapeamento Patrimonial Completo",
          description: "Localizamos todos os bens do falecido: imóveis, veículos, contas bancárias, investimentos, participações empresariais, direitos autorais e até patrimônio oculto através de investigação especializada.",
          icon: "🗺️"
        },
        {
          title: "Resolução de Conflitos Familiares",
          description: "Mediamos disputas entre herdeiros com sensibilidade e técnica jurídica, preservando relacionamentos familiares enquanto garantimos partilha justa e equilibrada do patrimônio.",
          icon: "🤝"
        },
        {
          title: "Proteção Contra Sonegação",
          description: "Identificamos e combatemos tentativas de ocultação de bens por herdeiros mal-intencionados, utilizando investigação patrimonial e medidas judiciais para recuperar ativos sonegados.",
          icon: "🛡️"
        },
        {
          title: "Otimização Tributária Inteligente",
          description: "Aplicamos estratégias legais para reduzir impostos sobre transmissão (ITCMD), imposto de renda e contribuições, preservando máximo patrimônio para os herdeiros legítimos.",
          icon: "💰"
        },
        {
          title: "Regularização Documental Completa",
          description: "Providenciamos todas as transferências necessárias: cartórios de imóveis, Detran, bancos, Receita Federal, garantindo que cada herdeiro receba formalmente sua parte.",
          icon: "📋"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Familiar e Patrimonial Inicial",
          description: "Identificamos todos os herdeiros legítimos, analisamos existência de testamento, levantamos preliminarmente o patrimônio e definimos se é possível inventário extrajudicial ou se será necessário judicial."
        },
        {
          step: 2,
          title: "Investigação Patrimonial Detalhada",
          description: "Realizamos busca exaustiva por todos os bens: consultas em cartórios, bancos, Receita Federal, Junta Comercial, CVM, Detran e demais órgãos para mapear integralmente o patrimônio."
        },
        {
          step: 3,
          title: "Documentação e Abertura Formal",
          description: "Organizamos toda documentação necessária: certidões de óbito, nascimento, casamento, documentos dos bens, declarações de IR e protocolamos abertura do inventário no foro competente."
        },
        {
          step: 4,
          title: "Citação e Manifestação dos Interessados",
          description: "Citamos todos os herdeiros, cônjuge sobrevivente e demais interessados, colhemos manifestações sobre o inventário e solucionamos eventuais impugnações ou habilitações tardias."
        },
        {
          step: 5,
          title: "Avaliação Judicial Criteriosa",
          description: "Acompanhamos nomeação de avaliador, fiscalizamos avaliações para garantir valores justos de mercado, impugnamos avaliações inadequadas e obtemos aprovação judicial definitiva."
        },
        {
          step: 6,
          title: "Cálculo e Recolhimento de Tributos",
          description: "Calculamos precisamente ITCMD, imposto de renda sobre ganhos de capital, custas processuais e orientamos sobre formas mais econômicas de recolhimento dos tributos devidos."
        },
        {
          step: 7,
          title: "Elaboração da Partilha Equilibrada",
          description: "Criamos plano de partilha tecnicamente perfeito, respeitando legítima e meação, formando quinhões equilibrados e resolvendo questões específicas como empresa familiar ou imóvel indivisível."
        },
        {
          step: 8,
          title: "Homologação e Transferências Definitivas",
          description: "Obtemos homologação judicial, expedimos formais de partilha, providenciamos transferências em cartórios e órgãos competentes, entregando aos herdeiros patrimônio totalmente regularizado."
        }
      ]}
      testimonials={[
        {
          name: "Família Rodrigues - Inventário Extrajudicial",
          quote: "Meu pai faleceu deixando casa, sítio e investimentos. Como todos os filhos eram maiores e concordávamos, fizemos inventário em cartório em 45 dias. Economia de tempo e dinheiro impressionante."
        },
        {
          name: "Maria José - Descoberta de Patrimônio Oculto",
          quote: "Meu irmão tentou esconder participação em empresa do meu pai. A investigação patrimonial descobriu 40% de uma empresa próspera que não havia sido declarada. Justiça foi feita."
        },
        {
          name: "Carlos Eduardo - Resolução de Conflito",
          quote: "Eram 6 irmãos brigando pela herança há 2 anos. A mediação técnica encontrou solução que satisfez todos: uns ficaram com imóveis, outros com dinheiro. Família reunida novamente."
        },
        {
          name: "Família Santos - Empresa Familiar",
          quote: "A morte do patriarca poderia destruir a empresa familiar. O inventário foi conduzido preservando a atividade empresarial e garantindo participação justa de todos os herdeiros."
        },
        {
          name: "Ana Beatriz - Viúva com Filhos Menores",
          quote: "Como viúva com 3 filhos menores, precisei de inventário judicial. A orientação jurídica me protegeu de decisões prejudiciais e garantiu que as crianças recebessem seus direitos integralmente."
        }
      ]}
      faq={[
        {
          question: "Quando posso fazer inventário extrajudicial?",
          answer: "Quando há consenso entre todos os herdeiros maiores e capazes, ausência de testamento ou testamento sem vícios, não há dívidas significativas do espólio e o falecido não deixou filhos menores ou incapazes."
        },
        {
          question: "Quanto tempo demora um inventário judicial?",
          answer: "Inventário consensual: 1 a 2 anos. Com conflitos: 3 a 5 anos ou mais. Arrolamento (patrimônio até 1000 salários mínimos): 6 meses a 1 ano. O prazo varia conforme complexidade e cooperação dos envolvidos."
        },
        {
          question: "É obrigatório fazer inventário para qualquer valor?",
          answer: "Sim, qualquer patrimônio deixado pelo falecido exige inventário para transferência legal aos herdeiros. Para valores menores, pode ser utilizado o arrolamento, que é mais simples e rápido."
        },
        {
          question: "Como é dividida herança entre cônjuge e filhos?",
          answer: "Depende do regime de bens do casamento. Na comunhão parcial (mais comum), cônjuge recebe meação dos bens comuns e concorre com filhos na herança dos bens particulares do falecido."
        },
        {
          question: "Posso renunciar à herança se há mais dívidas que bens?",
          answer: "Sim, renúncia é feita por escritura pública e é irrevogável. Importante analisar cuidadosamente antes de decidir, pois pode haver bens não conhecidos e dívidas podem ser questionáveis."
        },
        {
          question: "O que acontece se descobrir bens após o inventário?",
          answer: "Faz-se sobrepartilha para incluir bens omitidos. É um procedimento complementar que pode ser judicial ou extrajudicial, dependendo se há consenso entre herdeiros para inclusão dos novos bens."
        },
        {
          question: "Como proteger empresa familiar durante inventário?",
          answer: "Várias estratégias: transformação em holding, usufruto em favor do cônjuge, alienação fiduciária, acordo de quotistas ou acionistas. O importante é preservar atividade empresarial e gerar renda para todos."
        },
        {
          question: "Quais tributos incidem sobre herança?",
          answer: "ITCMD (alíquota varia por estado, geralmente 4% a 8%), eventual imposto de renda sobre ganhos de capital em bens valorizados, custas processuais e emolumentos cartorários. Planejamento pode reduzir significativamente."
        }
      ]}
      relatedServices={[
        {
          name: "Testamentos e Sucessões",
          path: "/servicos/testamentos-sucessoes"
        },
        {
          name: "Planejamento Sucessório",
          path: "/servicos/planejamento-sucessorio"
        },
        {
          name: "Avaliação de Bens",
          path: "/servicos/avaliacao-bens"
        },
        {
          name: "Holding Familiar",
          path: "/servicos/holding-familiar"
        }
      ]}
      mainAreaPath="/areas/familia"
    />
  );
};

export default InventarioPartilhaService;
