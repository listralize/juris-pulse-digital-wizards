
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

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  text: string;
  quote: string;
  image?: string;
}

export interface ServicePage {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  benefits: Benefit[];
  process: ProcessStep[];
  faq: { question: string; answer: string; }[];
  testimonials: Testimonial[];
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  sections: LandingPageSection[];
  hasForm: boolean;
  formSteps: FormStep[];
  webhookUrl?: string;
  redirectUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LandingPageSection {
  id: string;
  type: 'text' | 'image' | 'cta' | 'testimonial' | 'form';
  title: string;
  content: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface CategoryText {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface FooterTexts {
  companyDescription: string;
  address: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  whatsappText: string;
  schedule: string;
  copyrightText: string;
  privacyPolicyUrl?: string;
  termsOfUseUrl?: string;
}

export interface ContactTexts {
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl?: string;
  whatsappUrl: string;
  scheduleText: string;
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
  familiaImage?: string;
  tributarioTitle: string;
  tributarioDescription: string;
  tributarioImage?: string;
  empresarialTitle: string;
  empresarialDescription: string;
  empresarialImage?: string;
  trabalhoTitle: string;
  trabalhoDescription: string;
  trabalhoImage?: string;
  constitucionalTitle: string;
  constitucionalDescription: string;
  constitucionalImage?: string;
  administrativoTitle: string;
  administrativoDescription: string;
  administrativoImage?: string;
  previdenciarioTitle: string;
  previdenciarioDescription: string;
  previdenciarioImage?: string;
  consumidorTitle: string;
  consumidorDescription: string;
  consumidorImage?: string;
  civilTitle: string;
  civilDescription: string;
  civilImage?: string;
  categoryTexts: CategoryText[];
  footerTexts: FooterTexts;
  contactTexts: ContactTexts;
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
