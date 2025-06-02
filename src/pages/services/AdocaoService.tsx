
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AdocaoService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito de Família"
      serviceName="Adoção"
      serviceDescription="Transforme o sonho de ter uma família em realidade. Oferecemos acompanhamento jurídico completo em todos os tipos de adoção, com experiência, sensibilidade e dedicação para guiá-lo em cada etapa desta jornada única."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Especialização em Todos os Tipos de Adoção",
          description: "Desde adoção nacional e internacional até casos especiais como adoção por casais homoafetivos, pessoas solteiras, adoção tardia e grupos de irmãos. Conhecemos todas as nuances legais.",
          icon: "🏡"
        },
        {
          title: "Preparação Completa para o Processo",
          description: "Orientamos você desde a documentação inicial até a preparação psicológica. Ajudamos a definir o perfil adequado e preparamos para todas as avaliações obrigatórias.",
          icon: "📋"
        },
        {
          title: "Acompanhamento Personalizado",
          description: "Cada família é única. Oferecemos suporte individualizado, considerando suas necessidades específicas, ansiedades e expectativas durante todo o processo.",
          icon: "❤️"
        },
        {
          title: "Experiência em Casos Complexos",
          description: "Lidamos com situações especiais: adoção internacional, crianças com necessidades especiais, adolescentes, casos de destituição do poder familiar e adoção intuitu personae.",
          icon: "⚖️"
        },
        {
          title: "Redução de Prazos e Burocracia",
          description: "Nossa experiência permite agilizar processos, evitar retrabalhos e orientar sobre documentações corretas, reduzindo significativamente o tempo de espera.",
          icon: "⏰"
        },
        {
          title: "Suporte Emocional e Jurídico",
          description: "Entendemos que adoção é um processo emocional intenso. Oferecemos não apenas expertise jurídica, mas também apoio e orientação para as questões emocionais envolvidas.",
          icon: "🤝"
        }
      ]}
      process={[
        {
          step: 1,
          title: "Consulta Inicial Detalhada",
          description: "Conversamos sobre suas motivações, expectativas e situação pessoal. Analisamos se você atende aos requisitos legais e orientamos sobre o melhor caminho para seu perfil específico."
        },
        {
          step: 2,
          title: "Definição de Estratégia Personalizada",
          description: "Juntos definimos o perfil da criança desejada, modalidade de adoção mais adequada e cronograma realista. Preparamos um plano de ação customizado para seu caso."
        },
        {
          step: 3,
          title: "Preparação e Organização Documental",
          description: "Orientamos sobre todos os documentos necessários, ajudamos na obtenção de certidões específicas e organizamos o dossiê completo para apresentação ao Judiciário."
        },
        {
          step: 4,
          title: "Acompanhamento no Curso Preparatório",
          description: "Preparamos você para o curso obrigatório, orientando sobre as principais questões abordadas e como se posicionar adequadamente durante as avaliações."
        },
        {
          step: 5,
          title: "Suporte Durante Avaliações Psicossociais",
          description: "Acompanhamos todo o processo de avaliação psicológica e social, preparando você para entrevistas e visitas domiciliares, garantindo apresentação adequada."
        },
        {
          step: 6,
          title: "Habilitação e Cadastro Nacional",
          description: "Conduzimos o processo de habilitação no Cadastro Nacional de Adoção (CNA), acompanhamos prazos e recursos se necessário, até obter sua habilitação definitiva."
        },
        {
          step: 7,
          title: "Período de Espera e Vinculação",
          description: "Durante a espera, mantemos contato constante, orientamos sobre possíveis vinculações e preparamos você emocionalmente para o momento do primeiro encontro com a criança."
        },
        {
          step: 8,
          title: "Estágio de Convivência Legal",
          description: "Acompanhamos todo o período de aproximação e convivência, orientando sobre aspectos legais e práticos, garantindo que tudo transcorra adequadamente."
        },
        {
          step: 9,
          title: "Finalização Judicial da Adoção",
          description: "Conduzimos a ação judicial final, participamos da audiência de adoção e providenciamos toda documentação para obtenção da nova certidão de nascimento da criança."
        }
      ]}
      testimonials={[
        {
          name: "Família Oliveira - Adoção Nacional",
          quote: "Após 3 anos tentando ter filhos, decidimos pela adoção. O acompanhamento jurídico foi fundamental para não desistirmos durante a espera. Hoje nossa filha de 6 anos é nossa alegria. Valeu cada dia de espera."
        },
        {
          name: "Marina Santos - Mãe Solo por Adoção",
          quote: "Como mulher solteira, tinha receio de enfrentar preconceitos no processo. A orientação jurídica me deu segurança e confiança. Consegui adotar meu filho de 4 anos e hoje somos uma família completa e feliz."
        },
        {
          name: "Roberto e Carlos - Casal Homoafetivo",
          quote: "Enfrentamos alguns obstáculos por sermos um casal gay, mas fomos orientados sobre nossos direitos. Hoje temos dois irmãos de 7 e 9 anos. O amor não tem formato, e a justiça reconheceu isso."
        },
        {
          name: "Família Pereira - Adoção Internacional",
          quote: "Adotamos nossa filha no Haiti através de processo internacional. A complexidade burocrática era assustadora, mas o acompanhamento especializado tornou tudo possível. Ela chegou há 2 anos e transformou nossas vidas."
        },
        {
          name: "Ana e José - Adoção Tardia",
          quote: "Decidimos abrir nossos corações para uma criança maior e adotamos um menino de 10 anos. O suporte jurídico nos preparou para os desafios únicos da adoção tardia. Hoje ele tem 15 anos e é nosso orgulho."
        }
      ]}
      faq={[
        {
          question: "Quanto tempo demora o processo completo de adoção?",
          answer: "O processo tem duas fases: habilitação (6 a 12 meses) e espera por vinculação (variável). Para bebês, a espera pode ser de 2 a 5 anos. Para crianças maiores, grupos de irmãos ou com necessidades especiais, a espera é significativamente menor, podendo ser de alguns meses."
        },
        {
          question: "Posso escolher características específicas da criança?",
          answer: "Sim, durante a habilitação você define o perfil desejado: idade, sexo, cor, estado de saúde, se aceita irmãos, etc. Quanto mais flexível o perfil, menor o tempo de espera. É importante ser realista sobre suas possibilidades e limites."
        },
        {
          question: "Pessoas solteiras podem adotar no Brasil?",
          answer: "Absolutamente sim. A lei brasileira não faz qualquer distinção entre pessoas solteiras e casadas. O que se avalia é a capacidade de oferecer um lar seguro, estável e amoroso para a criança."
        },
        {
          question: "Casais homoafetivos têm direito à adoção?",
          answer: "Sim, têm exatamente os mesmos direitos que casais heterossexuais. O STF já pacificou esse entendimento. O que importa é o bem-estar da criança e a capacidade dos adotantes de oferecer um ambiente familiar adequado."
        },
        {
          question: "É possível adotar uma criança específica que já conheço?",
          answer: "Sim, em casos especiais como adoção por parentes, padrinhos ou quando já existe vínculo afetivo comprovado. É chamada 'adoção intuitu personae' e requer avaliação judicial específica para verificar se atende ao melhor interesse da criança."
        },
        {
          question: "Qual a diferença entre guarda, tutela e adoção?",
          answer: "Guarda é temporária e não gera vínculo de filiação. Tutela é para órfãos ou quando os pais foram destituídos do poder familiar, mas não cria parentesco. Adoção é definitiva, gera vínculo de filiação completo e irrevogável."
        },
        {
          question: "Preciso contratar advogado para adotar?",
          answer: "Não é obrigatório, mas é altamente recomendável. Um advogado especializado agiliza o processo, evita erros que causam atrasos, orienta sobre documentação correta e oferece suporte durante as avaliações psicossociais."
        },
        {
          question: "Como funciona a adoção internacional?",
          answer: "Só é possível quando não há pretendentes brasileiros para aquela criança específica. Envolve organismos credenciados, procedimentos consulares complexos, tradução juramentada e acompanhamento pós-adoção por período determinado."
        }
      ]}
      relatedServices={[
        {
          name: "Guarda de Filhos",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Investigação de Paternidade",
          path: "/servicos/investigacao-paternidade"
        },
        {
          name: "Tutela e Curatela",
          path: "/servicos/tutela-curatela"
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
