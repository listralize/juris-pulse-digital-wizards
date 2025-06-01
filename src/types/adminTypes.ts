
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
