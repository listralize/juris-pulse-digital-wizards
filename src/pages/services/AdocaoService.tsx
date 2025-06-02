
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AdocaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Adoção"
      serviceDescription="Orientação e acompanhamento jurídico completo em processos de adoção nacional e internacional, auxiliando famílias a concretizarem o sonho de formar uma família através da adoção."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Acompanhamento Integral",
          description: "Suporte em todas as etapas do processo de adoção, desde o cadastro inicial até a sentença definitiva e novo registro civil.",
          icon: "🤝"
        },
        {
          title: "Conhecimento Especializado",
          description: "Experiência com os requisitos específicos e procedimentos legais do sistema de adoção brasileiro e internacional.",
          icon: "📚"
        },
        {
          title: "Preparação Completa",
          description: "Orientação para entrevistas, visitas domiciliares, cursos preparatórios e demais avaliações necessárias durante o processo.",
          icon: "📝"
        },
        {
          title: "Adoção Internacional",
          description: "Assessoria especializada em adoção internacional, com conhecimento dos tratados e procedimentos consulares.",
          icon: "🌍"
        },
        {
          title: "Apoio Psicossocial",
          description: "Orientação sobre aspectos emocionais e sociais da adoção, preparando a família para receber a criança.",
          icon: "❤️"
        },
        {
          title: "Adoção Tardia",
          description: "Expertise em processos de adoção de crianças maiores, adolescentes e grupos de irmãos.",
          icon: "👨‍👩‍👧‍👦"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial e Orientação",
          description: "Análise do perfil dos pretendentes, orientação sobre requisitos legais, modalidades de adoção e expectativas realistas sobre o processo."
        },
        {
          step: 2,
          title: "Preparação Documental",
          description: "Auxílio na reunião de toda documentação necessária: certidões, comprovantes, atestados médicos e de antecedentes criminais."
        },
        {
          step: 3,
          title: "Curso Preparatório",
          description: "Orientação sobre o curso de preparação psicossocial e jurídica obrigatório para pretendentes à adoção."
        },
        {
          step: 4,
          title: "Habilitação no CNA",
          description: "Acompanhamento do processo de habilitação no Cadastro Nacional de Adoção, incluindo entrevistas e avaliações."
        },
        {
          step: 5,
          title: "Período de Espera",
          description: "Orientação durante o período de espera, acompanhamento de possíveis vinculações e preparação para o encontro."
        },
        {
          step: 6,
          title: "Aproximação e Convivência",
          description: "Suporte durante o período de aproximação gradual e estágio de convivência com a criança ou adolescente."
        },
        {
          step: 7,
          title: "Finalização Legal",
          description: "Acompanhamento da ação de adoção, audiência concentrada e obtenção da nova certidão de nascimento."
        }
      ]}
      testimonials={[
        {
          name: "Família Oliveira",
          quote: "Após cinco anos de espera, finalmente nossa filha chegou. O apoio jurídico durante todo esse período foi fundamental para não desistirmos e entendermos cada etapa."
        },
        {
          name: "Roberta e Marcos",
          quote: "O conhecimento sobre adoção internacional nos deu segurança. Conseguimos adotar nosso filho do Haiti seguindo todos os protocolos legais."
        },
        {
          name: "Helena P., Mãe Solo",
          quote: "Como mulher solteira, temia encontrar obstáculos, mas com a orientação adequada consegui adotar minha filha de 8 anos. Hoje somos uma família completa."
        },
        {
          name: "Carlos e João, Casal Homoafetivo",
          quote: "O preconceito ainda existe, mas fomos orientados sobre nossos direitos e conseguimos adotar dois irmãos adolescentes. O amor não tem formato."
        },
        {
          name: "Família Santos",
          quote: "A adoção tardia nos trouxe desafios únicos. O acompanhamento especializado foi essencial para adaptar nossa família e criar vínculos sólidos."
        }
      ]}
      faq={[
        {
          question: "Quais são os requisitos para adotar no Brasil?",
          answer: "Ser maior de 18 anos, ter diferença mínima de 16 anos entre adotante e adotado, comprovar idoneidade moral e financeira, participar de curso preparatório, ser aprovado em avaliação psicossocial e estar inscrito no Cadastro Nacional de Adoção."
        },
        {
          question: "Quanto tempo dura o processo de adoção?",
          answer: "A habilitação leva de 6 a 12 meses. Após habilitado, o tempo de espera varia conforme o perfil desejado da criança. Perfis mais flexíveis (idades maiores, grupos de irmãos, necessidades especiais) têm espera menor."
        },
        {
          question: "Pessoas solteiras podem adotar?",
          answer: "Sim, pessoas solteiras podem adotar normalmente. A legislação não faz distinção entre solteiros e casados. O que se avalia é a capacidade de oferecer um ambiente familiar adequado."
        },
        {
          question: "Casais homoafetivos podem adotar?",
          answer: "Sim, casais homoafetivos têm os mesmos direitos de adoção que casais heteroafetivos. O STF já pacificou esse entendimento, priorizando sempre o melhor interesse da criança."
        },
        {
          question: "É possível adotar bebês recém-nascidos?",
          answer: "Sim, mas a espera é muito longa devido à alta demanda. A maioria dos pretendentes deseja bebês, enquanto a maior parte das crianças disponíveis tem idades maiores."
        },
        {
          question: "Como funciona a adoção internacional?",
          answer: "Só é possível quando não há pretendentes habilitados no Brasil para aquela criança. Envolve procedimentos consulares, tradução de documentos e acompanhamento por organismos credenciados."
        },
        {
          question: "Posso escolher o perfil da criança a ser adotada?",
          answer: "Sim, durante a habilitação você define o perfil desejado: idade, sexo, cor, saúde, etc. Quanto mais restritivo o perfil, maior será o tempo de espera."
        },
        {
          question: "É possível adotar diretamente uma criança conhecida?",
          answer: "Sim, em casos específicos como adoção por parentes, dependentes já sob guarda ou em situações excepcionais avaliadas pelo juiz. É chamada 'adoção intuitu personae'."
        }
      ]}
      relatedServices={[
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Tutela e Curatela",
          path: "/servicos/tutela-curatela"
        },
        {
          name: "Investigação de Paternidade",
          path: "/servicos/investigacao-paternidade"
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

export default AdocaoService;
