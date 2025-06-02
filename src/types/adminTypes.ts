
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  oab: string;
  email: string;
  image: string;
  description?: string;
}

export interface SpecializedService {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
  detailedDescription?: string;
  benefits?: string[];
  process?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  testimonials?: Array<{
    name: string;
    text: string;
    role?: string;
  }>;
}

export interface ServicePage {
  id: string;
  title: string;
  description: string;
  category: string;
  content: {
    hero: {
      title: string;
      subtitle: string;
      backgroundImage?: string;
    };
    benefits: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    process: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    faq: Array<{
      question: string;
      answer: string;
    }>;
    testimonials: Array<{
      name: string;
      text: string;
      role?: string;
      image?: string;
    }>;
    cta: {
      title: string;
      subtitle: string;
      buttonText: string;
      whatsappNumber?: string;
    };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface CategoryTexts {
  id: string;
  title: string;
  description: string;
}

export interface ContactTexts {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}

export interface FooterTexts {
  companyName: string;
  description: string;
  copyright: string;
}

export interface PageTexts {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage?: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage?: string;
  contactTitle: string;
  contactSubtitle: string;
  teamTitle: string;
  areasTitle: string;
  clientAreaTitle: string;
  clientAreaDescription: string;
  clientPortalLink?: string;
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
  categoryTexts: CategoryTexts[];
  contactTexts: ContactTexts;
  footerTexts: FooterTexts;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "familia",
    name: "Direito de Família",
    description: "Assessoria completa em questões familiares",
    color: "bg-blue-500",
    icon: "Heart"
  },
  {
    id: "tributario", 
    name: "Direito Tributário",
    description: "Consultoria e defesa em questões fiscais",
    color: "bg-green-500",
    icon: "Calculator"
  },
  {
    id: "empresarial",
    name: "Direito Empresarial", 
    description: "Soluções jurídicas para empresas",
    color: "bg-purple-500",
    icon: "Building"
  },
  {
    id: "trabalho",
    name: "Direito do Trabalho",
    description: "Defesa dos direitos trabalhistas", 
    color: "bg-orange-500",
    icon: "Briefcase"
  },
  {
    id: "constitucional",
    name: "Direito Constitucional",
    description: "Proteção dos direitos fundamentais",
    color: "bg-red-500", 
    icon: "Scale"
  },
  {
    id: "administrativo",
    name: "Direito Administrativo",
    description: "Atuação junto ao poder público",
    color: "bg-indigo-500",
    icon: "FileText"
  },
  {
    id: "previdenciario",
    name: "Direito Previdenciário",
    description: "Benefícios e aposentadorias",
    color: "bg-teal-500",
    icon: "Shield"
  },
  {
    id: "consumidor",
    name: "Direito do Consumidor", 
    description: "Defesa dos direitos do consumidor",
    color: "bg-pink-500",
    icon: "ShoppingCart"
  },
  {
    id: "civil",
    name: "Direito Civil",
    description: "Questões cíveis em geral",
    color: "bg-yellow-500",
    icon: "Users"
  }
];
