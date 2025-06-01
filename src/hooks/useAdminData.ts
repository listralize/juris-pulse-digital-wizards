
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
  {
    id: 'divorcio',
    title: 'Divórcio e Separação',
    description: 'Assessoria completa em processos de divórcio consensual e litigioso, com foco na proteção dos direitos dos clientes.',
    category: 'familia',
    href: '/services/divorcio'
  },
  {
    id: 'guarda-filhos',
    title: 'Guarda de Filhos',
    description: 'Defesa dos melhores interesses das crianças em disputas de guarda, visitação e regulamentação de convivência.',
    category: 'familia',
    href: '/services/guarda-filhos'
  },
  {
    id: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    description: 'Estratégias legais para otimização da carga tributária empresarial e pessoal.',
    category: 'tributario',
    href: '/services/planejamento-tributario'
  },
  {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos Tributários',
    description: 'Recuperação de valores pagos indevidamente ao fisco através de ações específicas.',
    category: 'tributario',
    href: '/services/recuperacao-creditos'
  },
  {
    id: 'constituicao-empresas',
    title: 'Constituição de Empresas',
    description: 'Assessoria completa na abertura e estruturação de empresas de todos os portes.',
    category: 'empresarial',
    href: '/services/constituicao-empresas'
  },
  {
    id: 'contratos-empresariais',
    title: 'Contratos Empresariais',
    description: 'Elaboração e revisão de contratos comerciais, societários e de prestação de serviços.',
    category: 'empresarial',
    href: '/services/contratos-empresariais'
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
