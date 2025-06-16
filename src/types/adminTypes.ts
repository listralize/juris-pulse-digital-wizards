
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  oab: string;
  email: string;
  image?: string;
  description?: string;
}

export interface ServicePage {
  id: string;
  title: string;
  description?: string;
  href?: string;
  categoryId?: string;
  displayOrder?: number;
  isActive?: boolean;
  benefits?: Benefit[];
  process?: ProcessStep[];
  testimonials?: Testimonial[];
  faq?: FAQ[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  categoryKey: string;
  description?: string;
  icon?: string;
  color?: string;
  displayOrder?: number;
  isActive?: boolean;
  titleOverride?: string;
  descriptionOverride?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  fullContent?: string;
  label?: string;
  value?: string;
}

export interface CategoryTexts {
  [key: string]: {
    title: string;
    description: string;
  };
}

export interface PageTexts {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage?: string;
  heroPrimaryButtonText?: string;
  heroSecondaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonLink?: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage?: string;
  aboutMediaType?: 'image' | 'video';
  areasTitle: string;
  teamTitle: string;
  clientAreaTitle: string;
  clientAreaDescription: string;
  clientPortalLink?: string;
  contactTitle: string;
  contactSubtitle: string;
  contactTexts?: {
    whatsapp: string;
  };
  categoryTexts?: CategoryTexts;
  familiaTitle?: string;
  familiaDescription?: string;
  tributarioTitle?: string;
  tributarioDescription?: string;
  empresarialTitle?: string;
  empresarialDescription?: string;
  trabalhoTitle?: string;
  trabalhoDescription?: string;
  constitucionalTitle?: string;
  constitucionalDescription?: string;
  administrativoTitle?: string;
  administrativoDescription?: string;
  previdenciarioTitle?: string;
  previdenciarioDescription?: string;
  consumidorTitle?: string;
  consumidorDescription?: string;
  civilTitle?: string;
  civilDescription?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title?: string;
  content: string;
  image?: string;
  role?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface SpecializedService {
  id: string;
  title: string;
  description: string;
  icon?: string;
  href?: string;
}

// Default categories export
export const categories: CategoryInfo[] = [
  { 
    id: 'familia',
    name: 'Direito de Família',
    categoryKey: 'familia',
    label: 'Direito de Família', 
    value: 'familia',
    description: 'Proteção e orientação em questões familiares',
    icon: '👨‍👩‍👧‍👦',
    color: '#E11D48'
  },
  { 
    id: 'tributario',
    name: 'Direito Tributário',
    categoryKey: 'tributario',
    label: 'Direito Tributário', 
    value: 'tributario',
    description: 'Planejamento e consultoria tributária',
    icon: '💰',
    color: '#059669'
  },
  { 
    id: 'empresarial',
    name: 'Direito Empresarial',
    categoryKey: 'empresarial',
    label: 'Direito Empresarial', 
    value: 'empresarial',
    description: 'Assessoria para empresas',
    icon: '🏢',
    color: '#0EA5E9'
  },
  { 
    id: 'trabalho',
    name: 'Direito do Trabalho',
    categoryKey: 'trabalho',
    label: 'Direito do Trabalho', 
    value: 'trabalho',
    description: 'Relações trabalhistas',
    icon: '👷',
    color: '#DC2626'
  },
  { 
    id: 'civil',
    name: 'Direito Civil',
    categoryKey: 'civil',
    label: 'Direito Civil', 
    value: 'civil',
    description: 'Questões civis diversas',
    icon: '📄',
    color: '#7C3AED'
  },
  { 
    id: 'previdenciario',
    name: 'Direito Previdenciário',
    categoryKey: 'previdenciario',
    label: 'Direito Previdenciário', 
    value: 'previdenciario',
    description: 'Benefícios previdenciários',
    icon: '👴',
    color: '#EA580C'
  },
  { 
    id: 'consumidor',
    name: 'Direito do Consumidor',
    categoryKey: 'consumidor',
    label: 'Direito do Consumidor', 
    value: 'consumidor',
    description: 'Proteção do consumidor',
    icon: '🛡️',
    color: '#10B981'
  },
  { 
    id: 'constitucional',
    name: 'Direito Constitucional',
    categoryKey: 'constitucional',
    label: 'Direito Constitucional', 
    value: 'constitucional',
    description: 'Direitos fundamentais',
    icon: '⚖️',
    color: '#F59E0B'
  },
  { 
    id: 'administrativo',
    name: 'Direito Administrativo',
    categoryKey: 'administrativo',
    label: 'Direito Administrativo', 
    value: 'administrativo',
    description: 'Questões administrativas',
    icon: '🏛️',
    color: '#8B5CF6'
  }
];
