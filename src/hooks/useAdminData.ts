
import { useState, useEffect } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  oab: string;
  email: string;
  image: string;
  description: string;
}

export interface SpecializedService {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  mainDescription?: string; // Descrição principal da página do serviço
}

export interface PageTexts {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  contactTitle: string;
  contactSubtitle: string;
  teamTitle: string;
  areasTitle: string;
  clientAreaTitle: string;
  clientAreaDescription: string;
  familiaTitle: string;
  familiaDescription: string;
  tributarioTitle: string;
  tributarioDescription: string;
  empresarialTitle: string;
  empresarialDescription: string;
  trabalhoTitle: string;
  trabalhoDescription: string;
  constitucionalTitle: string;
  constitucionalDescription: string;
  administrativoTitle: string;
  administrativoDescription: string;
  previdenciarioTitle: string;
  previdenciarioDescription: string;
  consumidorTitle: string;
  consumidorDescription: string;
  civilTitle: string;
  civilDescription: string;
}

const defaultTeamMembers: TeamMember[] = [
  {
    id: 'trombela',
    name: 'Dr. Enzo Trombela',
    title: 'Advogado Sócio',
    oab: 'OAB/GO: 67.754 | OAB/SP: 521.263',
    email: 'trombela@stadv.com',
    image: '/lovable-uploads/dbdc43db-9dcc-4838-8f80-8298be65169a.png',
    description: 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Pós-graduado em Direito Civil e Processo Civil pelo Instituto Goiano de Direito. Vice-Presidente Jovem da Comissão Especial de Direito Processual Civil (CEDPC) – Triênio 2025/2027 – OAB/GO. Presidente Científico da Força da Advocacia. Ex-Coordenador da Comissão da Advocacia Jovem (CAJ) da OAB/GO. Sócio fundador do escritório Serafim & Trombela Advogados. Atuação em direito privado, especialmente em demandas cíveis, empresariais e contratuais.'
  },
  {
    id: 'serafim',
    name: 'Dr. Vinicius Serafim',
    title: 'Advogado Sócio',
    oab: 'OAB/GO: 67.790',
    email: 'serafim@stadv.com',
    image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png',
    description: 'Especializado em Direito Empresarial e Tributário, com vasta experiência em consultorias e contencioso estratégico.'
  },
  {
    id: 'lanzana',
    name: 'Dr. João Victor Lanzana',
    title: 'Advogado Associado',
    oab: 'OAB/GO: 71.163',
    email: 'lanzana@stadv.com',
    image: '/lovable-uploads/d11e57cf-ddb3-4377-9caf-91e75503165b.png',
    description: 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Pós-graduado em Direito Penal e Processo Penal pelo Gran Centro Universitário. Atuação em direito privado, especialmente em demandas cíveis, imobiliárias e do consumidor.'
  },
  {
    id: 'rafaella',
    name: 'Dra. Rafaella Alves Da Silva',
    title: 'Advogada Associada',
    oab: 'OAB/GO: 72.342',
    email: 'rafaella@stadv.com',
    image: '/lovable-uploads/7dbb1fd3-c3ce-4f91-a88d-95a969448804.png',
    description: 'Graduada pelo Centro Universitário de Goiás (UniGoiás). Advogada Associada do escritório Serafim & Trombela Advogados. Departamento Comercial.'
  }
];

const defaultSpecializedServices: SpecializedService[] = [
  // Direito de Família
  {
    id: 'divorcio',
    title: 'Divórcio e Separação',
    description: 'Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes.',
    category: 'familia',
    href: '/services/divorcio',
    mainDescription: 'Oferecemos assessoria jurídica completa em processos de divórcio, seja consensual ou litigioso. Nossa equipe está preparada para conduzir seu caso com discrição, agilidade e sempre buscando a melhor solução para todas as partes envolvidas, especialmente quando há filhos menores.'
  },
  {
    id: 'guarda-filhos',
    title: 'Guarda de Filhos',
    description: 'Defesa dos melhores interesses das crianças em disputas de guarda, visitação e regulamentação de convivência.',
    category: 'familia',
    href: '/services/guarda-filhos',
    mainDescription: 'A guarda dos filhos é uma das questões mais sensíveis do Direito de Família. Trabalhamos sempre priorizando o melhor interesse da criança, buscando soluções que preservem os vínculos familiares e garantam o desenvolvimento saudável dos menores.'
  },
  {
    id: 'pensao-alimenticia',
    title: 'Pensão Alimentícia',
    description: 'Ações de fixação, revisão e execução de pensão alimentícia para garantir o sustento adequado.',
    category: 'familia',
    href: '/services/pensao-alimenticia',
    mainDescription: 'A pensão alimentícia é um direito fundamental que visa garantir o sustento digno. Atuamos em ações de fixação, revisão e execução de alimentos, sempre buscando valores justos e condizentes com a realidade financeira das partes.'
  },
  {
    id: 'adocao',
    title: 'Adoção',
    description: 'Acompanhamento jurídico completo em processos de adoção nacional e internacional.',
    category: 'familia',
    href: '/services/adocao',
    mainDescription: 'O processo de adoção requer cuidado especial e conhecimento técnico. Oferecemos assessoria completa para famílias que desejam adotar, garantindo que todos os requisitos legais sejam cumpridos de forma ágil e segura.'
  },
  {
    id: 'uniao-estavel',
    title: 'União Estável',
    description: 'Reconhecimento, dissolução e regulamentação de direitos em união estável.',
    category: 'familia',
    href: '/services/uniao-estavel',
    mainDescription: 'A união estável possui os mesmos direitos do casamento civil. Auxiliamos no reconhecimento, formalização, dissolução e partilha de bens em união estável, sempre protegendo os direitos de nossos clientes.'
  },

  // Direito Tributário
  {
    id: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    description: 'Estratégias legais para otimização da carga tributária empresarial e pessoal.',
    category: 'tributario',
    href: '/services/planejamento-tributario',
    mainDescription: 'O planejamento tributário é fundamental para a saúde financeira de empresas e pessoas físicas. Desenvolvemos estratégias legais personalizadas para reduzir a carga tributária, sempre em conformidade com a legislação vigente.'
  },
  {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos Tributários',
    description: 'Recuperação de valores pagos indevidamente ao fisco através de ações específicas.',
    category: 'tributario',
    href: '/services/recuperacao-creditos',
    mainDescription: 'Muitas empresas pagam tributos em valor superior ao devido. Analisamos sua situação tributária para identificar créditos a serem recuperados, promovendo a restituição ou compensação dos valores pagos indevidamente.'
  },
  {
    id: 'contencioso-tributario',
    title: 'Contencioso Tributário',
    description: 'Defesa em processos administrativos e judiciais tributários.',
    category: 'tributario',
    href: '/services/contencioso-tributario',
    mainDescription: 'Atuamos na defesa de contribuintes em processos administrativos e judiciais tributários, contestando autuações fiscais, multas e exigências indevidas dos órgãos fazendários em todas as esferas.'
  },
  {
    id: 'parcelamento-debitos',
    title: 'Parcelamento de Débitos',
    description: 'Negociação e formalização de parcelamentos fiscais favoráveis.',
    category: 'tributario',
    href: '/services/parcelamento-debitos',
    mainDescription: 'Auxíliamos empresas e pessoas físicas na negociação de parcelamentos fiscais, buscando sempre as melhores condições disponíveis e orientando sobre os benefícios dos programas de regularização fiscal.'
  },
  {
    id: 'elisao-fiscal',
    title: 'Elisão Fiscal',
    description: 'Estratégias legais para redução lícita da carga tributária.',
    category: 'tributario',
    href: '/services/elisao-fiscal',
    mainDescription: 'A elisão fiscal consiste na utilização de meios legais para reduzir a carga tributária. Desenvolvemos estratégias personalizadas e seguras para otimizar a tributação de nossos clientes.'
  },

  // Direito Empresarial
  {
    id: 'constituicao-empresas',
    title: 'Constituição de Empresas',
    description: 'Assessoria completa na abertura e estruturação de empresas de todos os portes.',
    category: 'empresarial',
    href: '/services/constituicao-empresas',
    mainDescription: 'A constituição de uma empresa requer planejamento estratégico. Oferecemos assessoria completa desde a escolha do tipo societário mais adequado até a formalização junto aos órgãos competentes.'
  },
  {
    id: 'contratos-empresariais',
    title: 'Contratos Empresariais',
    description: 'Elaboração e revisão de contratos comerciais, societários e de prestação de serviços.',
    category: 'empresarial',
    href: '/services/contratos-empresariais',
    mainDescription: 'Contratos bem elaborados são essenciais para o sucesso empresarial. Elaboramos e revisamos contratos comerciais, societários, de prestação de serviços e demais instrumentos contratuais empresariais.'
  },
  {
    id: 'reestruturacao-societaria',
    title: 'Reestruturação Societária',
    description: 'Reorganização societária, fusões, aquisições e alterações contratuais.',
    category: 'empresarial',
    href: '/services/reestruturacao-societaria',
    mainDescription: 'Auxiliamos empresas em processos de reestruturação societária, incluindo alterações contratuais, entrada e saída de sócios, fusões, incorporações e demais reorganizações empresariais.'
  },
  {
    id: 'compliance-empresarial',
    title: 'Compliance Empresarial',
    description: 'Implementação de programas de conformidade e boas práticas corporativas.',
    category: 'empresarial',
    href: '/services/compliance-empresarial',
    mainDescription: 'O compliance empresarial é fundamental para mitigar riscos e garantir a conformidade legal. Desenvolvemos programas de integridade personalizados e implementamos práticas de governança corporativa.'
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual',
    description: 'Proteção de marcas, patentes e direitos autorais.',
    category: 'empresarial',
    href: '/services/propriedade-intelectual',
    mainDescription: 'A proteção da propriedade intelectual é crucial para preservar ativos intangíveis. Atuamos no registro de marcas, patentes, proteção de direitos autorais e defesa contra violações.'
  },

  // Direito do Trabalho
  {
    id: 'assessoria-trabalhista',
    title: 'Assessoria Trabalhista',
    description: 'Consultoria preventiva e estratégica em relações trabalhistas.',
    category: 'trabalho',
    href: '/services/assessoria-trabalhista',
    mainDescription: 'Oferecemos assessoria trabalhista completa para empresas, incluindo consultoria preventiva, elaboração de políticas internas, orientação sobre legislação trabalhista e estratégias para redução de passivos.'
  },
  {
    id: 'contencioso-trabalhista',
    title: 'Contencioso Trabalhista',
    description: 'Defesa em ações trabalhistas e processos perante a Justiça do Trabalho.',
    category: 'trabalho',
    href: '/services/contencioso-trabalhista',
    mainDescription: 'Atuamos na defesa de empresas e empregados em ações trabalhistas, buscando sempre soluções eficientes e estratégicas para resolução de conflitos laborais.'
  },
  {
    id: 'compliance-trabalhista',
    title: 'Compliance Trabalhista',
    description: 'Adequação às normas trabalhistas e implementação de boas práticas.',
    category: 'trabalho',
    href: '/services/compliance-trabalhista',
    mainDescription: 'O compliance trabalhista envolve a adequação às normas trabalhistas vigentes. Auxiliamos empresas na implementação de práticas que garantam conformidade e reduzam riscos trabalhistas.'
  }
];

const defaultPageTexts: PageTexts = {
  heroTitle: 'Excelência jurídica que transforma desafios em vitórias',
  heroSubtitle: 'Soluções jurídicas estratégicas com foco em resultados excepcionais',
  aboutTitle: 'Sobre Nós',
  aboutDescription: 'A história do Serafim & Trombela Advocacia é moldada pelo compromisso com a excelência jurídica e o sucesso de nossos clientes. Nossa equipe é formada por advogados experientes e apaixonados, que compreendem a fundo os desafios enfrentados por cada cliente. Buscamos soluções inovadoras, eficazes e com foco em resultados reais.',
  contactTitle: 'Precisa de ajuda jurídica?',
  contactSubtitle: 'Entre em contato para uma consulta personalizada',
  teamTitle: 'Nossa Equipe',
  areasTitle: 'Áreas de Atuação',
  clientAreaTitle: 'Área Exclusiva do Cliente',
  clientAreaDescription: 'Acompanhe seus processos com total segurança e transparência. Acesse documentos, atualizações e comunicações com seu advogado em um só lugar.',
  familiaTitle: 'Direito de Família',
  familiaDescription: 'Soluções em divórcios, união estável, guarda de filhos e pensão alimentícia.',
  tributarioTitle: 'Direito Tributário',
  tributarioDescription: 'Planejamento tributário, contencioso fiscal e recuperação de créditos.',
  empresarialTitle: 'Direito Empresarial',
  empresarialDescription: 'Constituição de empresas, contratos e reestruturação societária.',
  trabalhoTitle: 'Direito do Trabalho',
  trabalhoDescription: 'Defesa dos direitos trabalhistas e assessoria empresarial.',
  constitucionalTitle: 'Direito Constitucional',
  constitucionalDescription: 'Defesa de direitos fundamentais e ações constitucionais.',
  administrativoTitle: 'Direito Administrativo',
  administrativoDescription: 'Licitações, contratos públicos e processos administrativos.',
  previdenciarioTitle: 'Direito Previdenciário',
  previdenciarioDescription: 'Aposentadorias, benefícios e planejamento previdenciário.',
  consumidorTitle: 'Direito do Consumidor',
  consumidorDescription: 'Defesa dos direitos dos consumidores e práticas abusivas.',
  civilTitle: 'Direito Civil',
  civilDescription: 'Contratos, responsabilidade civil e direitos patrimoniais.'
};

export const useAdminData = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [specializedServices, setSpecializedServices] = useState<SpecializedService[]>([]);
  const [pageTexts, setPageTexts] = useState<PageTexts>(defaultPageTexts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Carregar dados da equipe
      const savedTeam = localStorage.getItem('adminTeamMembers');
      if (savedTeam) {
        const parsedTeam = JSON.parse(savedTeam);
        if (Array.isArray(parsedTeam) && parsedTeam.length > 0) {
          setTeamMembers(parsedTeam);
        } else {
          setTeamMembers(defaultTeamMembers);
          localStorage.setItem('adminTeamMembers', JSON.stringify(defaultTeamMembers));
        }
      } else {
        setTeamMembers(defaultTeamMembers);
        localStorage.setItem('adminTeamMembers', JSON.stringify(defaultTeamMembers));
      }

      // Carregar serviços especializados
      const savedServices = localStorage.getItem('adminSpecializedServices');
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices);
        if (Array.isArray(parsedServices) && parsedServices.length > 0) {
          setSpecializedServices(parsedServices);
        } else {
          setSpecializedServices(defaultSpecializedServices);
          localStorage.setItem('adminSpecializedServices', JSON.stringify(defaultSpecializedServices));
        }
      } else {
        setSpecializedServices(defaultSpecializedServices);
        localStorage.setItem('adminSpecializedServices', JSON.stringify(defaultSpecializedServices));
      }

      // Carregar textos das páginas
      const savedTexts = localStorage.getItem('adminPageTexts');
      if (savedTexts) {
        const parsedTexts = JSON.parse(savedTexts);
        setPageTexts({ ...defaultPageTexts, ...parsedTexts });
      } else {
        setPageTexts(defaultPageTexts);
        localStorage.setItem('adminPageTexts', JSON.stringify(defaultPageTexts));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do admin:', error);
      setTeamMembers(defaultTeamMembers);
      setSpecializedServices(defaultSpecializedServices);
      setPageTexts(defaultPageTexts);
    }
    
    setIsLoading(false);
  }, []);

  const saveTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members);
    localStorage.setItem('adminTeamMembers', JSON.stringify(members));
  };

  const saveSpecializedServices = (services: SpecializedService[]) => {
    setSpecializedServices(services);
    localStorage.setItem('adminSpecializedServices', JSON.stringify(services));
  };

  const savePageTexts = (texts: PageTexts) => {
    setPageTexts(texts);
    localStorage.setItem('adminPageTexts', JSON.stringify(texts));
  };

  return { 
    teamMembers, 
    specializedServices, 
    pageTexts, 
    isLoading, 
    saveTeamMembers, 
    saveSpecializedServices, 
    savePageTexts 
  };
};
