
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const HabeasDataService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Constitucional"
      serviceName="Habeas Data"
      serviceDescription="No mundo de hoje, informação é poder. Quando os dados do cliente estão em jogo, o Habeas Data é a ferramenta para o controle. Impetramos Habeas Data para assegurar o conhecimento de informações pessoais em bancos de dados públicos e garantir a retificação quando necessário. Exigimos transparência e precisão, porque você tem o direito de saber e de corrigir."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Controle Sobre Seus Dados Pessoais",
          description: "Garantimos seu direito constitucional de conhecer informações sobre você em registros públicos e bancos de dados governamentais ou de caráter público."
        },
        {
          title: "Retificação de Informações Incorretas",
          description: "Quando dados estão errados ou desatualizados, exigimos correção imediata para proteger sua reputação e direitos, evitando prejuízos futuros."
        },
        {
          title: "Procedimento Gratuito e Acessível",
          description: "O habeas data é uma ação constitucional gratuita, sem custas processuais, garantindo acesso democrático à proteção de dados pessoais."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Identificação do Banco de Dados",
          description: "Determinamos qual entidade governamental ou de caráter público possui informações sobre você que precisam ser conhecidas ou corrigidas."
        },
        {
          step: 2,
          title: "Tentativa Administrativa Prévia",
          description: "Verificamos se houve tentativa de obter informações pela via administrativa, requisito essencial para a admissibilidade da ação."
        },
        {
          step: 3,
          title: "Análise da Modalidade Adequada",
          description: "Definimos se o caso requer habeas data para conhecimento de dados (a mostrar) ou para retificação (a corrigir) de informações incorretas."
        },
        {
          step: 4,
          title: "Impetração Fundamentada",
          description: "Elaboramos petição inicial demonstrando claramente o direito à informação ou correção, com fundamentação jurídica sólida."
        },
        {
          step: 5,
          title: "Execução da Decisão",
          description: "Garantimos o cumprimento integral da decisão judicial, seja para fornecimento de informações ou efetiva correção dos dados."
        }
      ]}
      testimonials={[
        {
          name: "Roberto Oliveira - Empresário",
          quote: "Descobri através de habeas data que meu CPF constava indevidamente em órgãos de proteção ao crédito por dívida inexistente. A correção foi imediata e meu nome foi limpo."
        },
        {
          name: "Ana Martins - Servidora",
          quote: "O habeas data revelou informações incorretas em meu prontuário funcional que estavam prejudicando minha progressão na carreira. Tudo foi corrigido rapidamente."
        },
        {
          name: "Paulo Santos - Aposentado",
          quote: "Precisava de informações sobre meu histórico previdenciário que o INSS se recusava a fornecer. O habeas data garantiu acesso completo aos dados em 30 dias."
        }
      ]}
      faq={[
        {
          question: "Quando posso usar habeas data?",
          answer: "O habeas data pode ser usado para conhecer informações sobre você em registros públicos ou bancos de dados de entidades governamentais/caráter público, ou para retificar dados incorretos quando a via administrativa foi negada ou omissa."
        },
        {
          question: "É necessário esgotar a via administrativa antes?",
          answer: "Sim, é requisito essencial tentar obter as informações ou correções pela via administrativa. Só após negativa ou silêncio da Administração é possível impetrar habeas data."
        },
        {
          question: "Quais tipos de informações posso solicitar?",
          answer: "Você pode solicitar qualquer informação sobre sua pessoa constante de registros ou bancos de dados de entidades governamentais ou de caráter público, como SERASA, SPC, órgãos de trânsito, Receita Federal, etc."
        },
        {
          question: "O habeas data serve para dados de empresas privadas?",
          answer: "Não diretamente. O habeas data é para entidades governamentais ou de caráter público. Para dados de empresas privadas, usamos outros instrumentos legais como ações ordinárias ou aplicação da LGPD."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos Fundamentais",
          path: "/servicos/direitos-fundamentais"
        },
        {
          name: "Mandado de Segurança",
          path: "/servicos/mandado-seguranca"
        }
      ]}
      mainAreaPath="/constitucional"
    />
  );
};

export default HabeasDataService;
