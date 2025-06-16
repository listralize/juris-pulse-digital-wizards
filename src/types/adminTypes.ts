
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  oab: string;
  email: string;
  image: string;
  description?: string;
}

export interface CategoryTexts {
  id: string;
  title: string;
  description: string;
}

export interface CategoryInfo {
  id: string;
  value: string;
  label: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  fullContent?: string;
}

export interface ContactTexts {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  mapEmbedUrl?: string;
}

export interface FooterTexts {
  companyName: string;
  description: string;
  copyright?: string;
}

export interface PageTexts {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage?: string;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage?: string;
  aboutMediaType?: 'image' | 'video';
  areasTitle: string;
  familiaTitle: string;
  familiaDescription: string;
  tributarioTitle: string;
  tributarioDescription: string;
  empresarialTitle: string;
  empresarialDescription: string;
  trabalhoTitle: string;
  trabalhoDescription: string;
  civilTitle?: string;
  civilDescription?: string;
  previdenciarioTitle?: string;
  previdenciarioDescription?: string;
  consumidorTitle?: string;
  consumidorDescription?: string;
  constitucionalTitle?: string;
  constitucionalDescription?: string;
  administrativoTitle?: string;
  administrativoDescription?: string;
  teamTitle: string;
  clientAreaTitle: string;
  clientAreaDescription: string;
  clientPortalLink?: string;
  contactTitle: string;
  contactSubtitle: string;
  categoryTexts: CategoryTexts[];
  contactTexts: ContactTexts;
  footerTexts: FooterTexts;
}

export interface Testimonial {
  name: string;
  text: string;
  role?: string;
  image?: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServicePage {
  id: string;
  title: string;
  description: string;
  category: string;
  href?: string;
  benefits?: Benefit[];
  process?: ProcessStep[];
  testimonials?: Testimonial[];
  faq?: FAQ[];
}

export interface SpecializedService {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  href: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'familia',
    value: 'familia',
    label: 'Direito de Família',
    name: 'Direito de Família',
    description: 'Proteção e orientação em questões familiares',
    icon: 'Heart',
    color: 'bg-rose-500'
  },
  {
    id: 'tributario',
    value: 'tributario',
    label: 'Direito Tributário',
    name: 'Direito Tributário',
    description: 'Consultoria e planejamento tributário',
    icon: 'Calculator',
    color: 'bg-blue-500'
  },
  {
    id: 'empresarial',
    value: 'empresarial',
    label: 'Direito Empresarial',
    name: 'Direito Empresarial',
    description: 'Suporte jurídico para empresas',
    icon: 'Building2',
    color: 'bg-green-500'
  },
  {
    id: 'trabalho',
    value: 'trabalho',
    label: 'Direito do Trabalho',
    name: 'Direito do Trabalho',
    description: 'Defesa dos direitos trabalhistas',
    icon: 'Users',
    color: 'bg-orange-500'
  },
  {
    id: 'civil',
    value: 'civil',
    label: 'Direito Civil',
    name: 'Direito Civil',
    description: 'Proteção de direitos e interesses individuais',
    icon: 'Scale',
    color: 'bg-purple-500'
  },
  {
    id: 'previdenciario',
    value: 'previdenciario',
    label: 'Direito Previdenciário',
    name: 'Direito Previdenciário',
    description: 'Benefícios e aposentadorias',
    icon: 'Shield',
    color: 'bg-indigo-500'
  },
  {
    id: 'consumidor',
    value: 'consumidor',
    label: 'Direito do Consumidor',
    name: 'Direito do Consumidor',
    description: 'Proteção e defesa do consumidor',
    icon: 'ShoppingCart',
    color: 'bg-yellow-500'
  },
  {
    id: 'constitucional',
    value: 'constitucional',
    label: 'Direito Constitucional',
    name: 'Direito Constitucional',
    description: 'Direitos fundamentais e constitucionalidade',
    icon: 'BookOpen',
    color: 'bg-red-500'
  },
  {
    id: 'administrativo',
    value: 'administrativo',
    label: 'Direito Administrativo',
    name: 'Direito Administrativo',
    description: 'Relações com a administração pública',
    icon: 'FileText',
    color: 'bg-gray-500'
  }
];
