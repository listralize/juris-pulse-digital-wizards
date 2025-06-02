
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
          title: "Acompanhamento Integral do Processo",
          description: "Suporte jurídico em todas as etapas do processo de adoção, desde o cadastro inicial no CNA até a sentença definitiva e novo registro civil da criança.",
          icon: "🤝"
        },
        {
          title: "Conhecimento Especializado em Adoção",
          description: "Experiência com os requisitos específicos e procedimentos legais do sistema de adoção brasileiro, incluindo legislação do ECA e jurisprudência atualizada.",
          icon: "📚"
        },
        {
          title: "Preparação Completa para Avaliações",
          description: "Orientação detalhada para entrevistas psicossociais, visitas domiciliares, cursos preparatórios obrigatórios e demais avaliações necessárias durante o processo.",
          icon: "📝"
        },
        {
          title: "Adoção Internacional Especializada",
          description: "Assessoria em adoção internacional com conhecimento dos tratados internacionais, procedimentos consulares e organismos credenciados.",
          icon: "🌍"
        },
        {
          title: "Apoio Psicossocial e Familiar",
          description: "Orientação sobre aspectos emocionais e sociais da adoção, preparando adequadamente a família para receber e integrar a criança.",
          icon: "❤️"
        },
        {
          title: "Adoção Tardia e Grupos de Irmãos",
          description: "Expertise em processos complexos de adoção de crianças maiores, adolescentes e grupos de irmãos, com estratégias específicas para cada situação.",
          icon: "👨‍👩‍👧‍👦"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial e Orientação Jurídica",
          description: "Análise detalhada do perfil dos pretendentes, orientação sobre todos os requisitos legais, modalidades de adoção disponíveis e expectativas realistas sobre prazos e procedimentos."
        },
        {
          step: 2,
          title: "Preparação e Análise Documental",
          description: "Auxílio na reunião e análise de toda documentação obrigatória: certidões pessoais, comprovantes de renda e residência, atestados médicos e de antecedentes criminais."
        },
        {
          step: 3,
          title: "Curso Preparatório Obrigatório",
          description: "Orientação sobre o curso de preparação psicossocial e jurídica obrigatório para pretendentes à adoção, com apoio na preparação para as avaliações."
        },
        {
          step: 4,
          title: "Processo de Habilitação no CNA",
          description: "Acompanhamento completo do processo de habilitação no Cadastro Nacional de Adoção, incluindo entrevistas técnicas e avaliações psicossociais."
        },
        {
          step: 5,
          title: "Período de Espera e Vinculação",
          description: "Orientação durante o período de espera, acompanhamento de possíveis vinculações através do sistema e preparação emocional para o primeiro encontro."
        },
        {
          step: 6,
          title: "Estágio de Aproximação e Convivência",
          description: "Suporte jurídico durante o período de aproximação gradual e estágio de convivência obrigatório com a criança ou adolescente."
        },
        {
          step: 7,
          title: "Finalização Legal e Registro",
          description: "Acompanhamento da ação judicial de adoção, participação na audiência concentrada e providências para obtenção da nova certidão de nascimento."
        }
      ]}
      testimonials={[
        {
          name: "Família Oliveira",
          quote: "Após cinco anos de espera, nossa filha finalmente chegou. O apoio jurídico durante todo esse período foi fundamental para não desistirmos e entendermos cada etapa do processo."
        },
        {
          name: "Roberta e Marcos",
          quote: "O conhecimento especializado em adoção internacional nos deu total segurança. Conseguimos adotar nosso filho do Haiti seguindo rigorosamente todos os protocolos legais."
        },
        {
          name: "Helena P., Mãe Solo",
          quote: "Como mulher solteira, temia encontrar obstáculos no processo, mas com a orientação jurídica adequada consegui adotar minha filha de 8 anos. Hoje somos uma família completa."
        },
        {
          name: "Carlos e João, Casal Homoafetivo",
          quote: "O preconceito ainda existe em alguns setores, mas fomos orientados sobre nossos direitos constitucionais e conseguimos adotar dois irmãos adolescentes. O amor não tem formato."
        },
        {
          name: "Família Santos",
          quote: "A adoção tardia nos trouxe desafios únicos de adaptação. O acompanhamento especializado foi essencial para adequar nossa família e criar vínculos sólidos."
        }
      ]}
      faq={[
        {
          question: "Quais são os requisitos legais para adotar no Brasil?",
          answer: "Ser maior de 18 anos, ter diferença mínima de 16 anos entre adotante e adotado, comprovar idoneidade moral e capacidade financeira para sustento, participar obrigatoriamente do curso preparatório, ser aprovado em avaliação psicossocial completa e estar devidamente inscrito no Cadastro Nacional de Adoção."
        },
        {
          question: "Quanto tempo dura o processo completo de adoção?",
          answer: "A fase de habilitação dura entre 6 a 12 meses. Após habilitado, o tempo de espera varia drasticamente conforme o perfil desejado da criança. Perfis mais flexíveis (idades maiores, grupos de irmãos, necessidades especiais) têm espera significativamente menor."
        },
        {
          question: "Pessoas solteiras podem adotar normalmente?",
          answer: "Sim, pessoas solteiras têm pleno direito à adoção. A legislação brasileira não faz qualquer distinção entre solteiros e casados. O que se avalia é exclusivamente a capacidade de oferecer um ambiente familiar adequado e estável."
        },
        {
          question: "Casais homoafetivos têm direito à adoção?",
          answer: "Sim, casais homoafetivos possuem exatamente os mesmos direitos de adoção que casais heteroafetivos. O STF já pacificou definitivamente esse entendimento, priorizando sempre o melhor interesse da criança."
        },
        {
          question: "É possível adotar bebês recém-nascidos?",
          answer: "Sim, mas a espera é extremamente longa devido à altíssima demanda. A grande maioria dos pretendentes deseja bebês, enquanto a maior parte das crianças disponíveis para adoção tem idades superiores a 3 anos."
        },
        {
          question: "Como funciona a adoção internacional?",
          answer: "A adoção internacional só é possível quando comprovadamente não há pretendentes habilitados no Brasil para aquela criança específica. Envolve procedimentos consulares complexos, tradução juramentada de documentos e acompanhamento obrigatório por organismos credenciados."
        },
        {
          question: "Posso escolher o perfil específico da criança?",
          answer: "Sim, durante o processo de habilitação você define detalhadamente o perfil desejado: faixa etária, sexo, cor, estado de saúde, etc. Quanto mais restritivo e específico o perfil escolhido, maior será o tempo de espera na fila."
        },
        {
          question: "É possível adotar diretamente uma criança conhecida?",
          answer: "Sim, em casos específicos como adoção por parentes próximos, dependentes já sob guarda legal ou em situações excepcionais devidamente avaliadas pelo juiz. É denominada 'adoção intuitu personae' ou direcionada."
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
