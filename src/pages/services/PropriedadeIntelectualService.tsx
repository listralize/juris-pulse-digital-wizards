
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PropriedadeIntelectualService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Empresarial"
      serviceName="Propriedade Intelectual"
      serviceDescription="Seu gênio criativo é seu maior ativo e ouro puro. Atuamos como guardiões do seu império intelectual, protegendo marcas, patentes e segredos comerciais com a mesma ferocidade com que foram criados. Transformamos inovação em monopólio legítimo e fonte de receita inexplorada."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Blindagem de Ativos Intelectuais",
          description: "Registro que transforma sua inovação em monopólio legítimo, criando proteção legal mais robusta que blinda ideias contra cópias e usurpações com força implacável."
        },
        {
          title: "Monetização Estratégica de IP",
          description: "Estruturação de acordos de licenciamento que maximizam ganhos e garantem controle total do jogo, mesmo quando outros estão jogando com suas cartas. Propriedade intelectual como máquina de receita."
        },
        {
          title: "Defesa Implacável Contra Infrações",
          description: "Quando invadem seu território, resposta é rápida e devastadora. Direitos defendidos com agressividade necessária para esmagar concorrência e reafirmar sua soberania intelectual."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Auditoria de Dominação Intelectual",
          description: "Identificação e catalogação de todos os ativos que podem ser transformados em armas competitivas, avaliando potencial de monetização e necessidades de blindagem."
        },
        {
          step: 2,
          title: "Estratégia de Proteção Ofensiva",
          description: "Desenvolvimento de estratégia que não apenas protege, mas cria vantagem competitiva sustentável, priorizando ativos conforme potencial de dominação de mercado."
        },
        {
          step: 3,
          title: "Registro e Fortificação Legal",
          description: "Execução implacável de procedimentos no INPI e órgãos internacionais, incluindo pesquisas que garantem originalidade absoluta e proteção mundial."
        },
        {
          step: 4,
          title: "Vigilância de Mercado Constante",
          description: "Monitoramento contínuo como sentinelas digitais, identificando ameaças de violação e uso indevido antes que causem danos ao seu império."
        },
        {
          step: 5,
          title: "Enforcement Devastador",
          description: "Ações legais fulminantes contra violações, negociação de acordos vantajosos e defesa que demonstra que atacar sua propriedade intelectual é suicídio comercial."
        }
      ]}
      testimonials={[
        {
          name: "TechUnicorn Innovations",
          quote: "A blindagem de nossas 47 patentes criou um fosso competitivo intransponível. Competidores não conseguem mais inovar sem licenciar nossa tecnologia. Dominação completa."
        },
        {
          name: "Fashion Empire Global",
          quote: "A proteção da marca e os acordos de licenciamento geram R$ 12 milhões anuais em royalties. Transformaram nossa criatividade em máquina de dinheiro perpétua."
        },
        {
          name: "BioTech Revolutionary",
          quote: "A defesa contra infração não apenas eliminou a ameaça, mas resultou em acordo de R$ 80 milhões. Atacar nossa PI virou lição cara para o mercado."
        }
      ]}
      faq={[
        {
          question: "Como propriedade intelectual vira vantagem competitiva dominante?",
          answer: "PI não é apenas proteção - é criação de monopólios legais. Estruturamos portfólios que: criam barreiras de entrada intransponíveis, forçam competidores a licenciar suas tecnologias, geram receitas passivas através de royalties e permitem cobrança premium por exclusividade. Resultado: dominação de mercado sustentável e lucrativa."
        },
        {
          question: "Qual o diferencial na monetização de ativos intelectuais?",
          answer: "Não apenas registramos - transformamos IP em máquinas de receita. Identificamos oportunidades de licenciamento em mercados adjacentes, estruturamos acordos que geram fluxo perpétuo, criamos joint ventures baseadas em IP e desenvolvemos estratégias de franchising intelectual. Cada ativo vira fonte de renda múltipla."
        },
        {
          question: "Como garantem proteção 'implacável' contra violações?",
          answer: "Implementamos sistema de vigilância 360°: monitoramento automatizado de registros concorrentes, alertas de violações em tempo real, inteligência competitiva ativa e resposta legal fulminante. Quando detectamos infração, ação é imediata e devastadora. O mercado aprende que violar sua PI é erro fatal."
        }
      ]}
      relatedServices={[
        {
          name: "Contratos Empresariais",
          path: "/servicos/contratos-empresariais"
        },
        {
          name: "Contencioso Empresarial",
          path: "/servicos/contencioso-empresarial"
        }
      ]}
      mainAreaPath="/empresarial"
    />
  );
};

export default PropriedadeIntelectualService;
