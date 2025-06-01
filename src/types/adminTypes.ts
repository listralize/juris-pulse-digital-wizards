
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
  mainDescription?: string;
}

export interface ServicePage {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];
  process: {
    title: string;
    description: string;
    step: number;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  testimonials: {
    name: string;
    quote: string;
    image?: string;
  }[];
}

export interface CategoryText {
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
  categoryTexts: CategoryText[];
  contactTexts: ContactTexts;
  footerTexts: FooterTexts;
}

export interface CategoryInfo {
  value: string;
  label: string;
  color: string;
}

export const categories: CategoryInfo[] = [
  { value: 'familia', label: 'Direito de Família', color: 'bg-pink-500' },
  { value: 'tributario', label: 'Direito Tributário', color: 'bg-green-500' },
  { value: 'empresarial', label: 'Direito Empresarial', color: 'bg-blue-500' },
  { value: 'trabalho', label: 'Direito do Trabalho', color: 'bg-purple-500' },
  { value: 'constitucional', label: 'Direito Constitucional', color: 'bg-red-500' },
  { value: 'administrativo', label: 'Direito Administrativo', color: 'bg-orange-500' },
  { value: 'previdenciario', label: 'Direito Previdenciário', color: 'bg-indigo-500' },
  { value: 'consumidor', label: 'Direito do Consumidor', color: 'bg-yellow-500' },
  { value: 'civil', label: 'Direito Civil', color: 'bg-gray-500' }
];
