
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
  href: string;
  isActive: boolean;
}

export interface ServicePage {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  benefits: string[];
  process: string[];
  faq: { question: string; answer: string; }[];
  testimonials: { name: string; text: string; }[];
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
  clientAreaImage?: string;
  clientAreaMainButtonLink?: string;
  clientAreaMainButtonText?: string;
  clientAreaWhatsAppLink?: string;
  clientAreaWhatsAppText?: string;
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
}

export interface CategoryText {
  id: string;
  title: string;
  description: string;
}

export const categories = [
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
