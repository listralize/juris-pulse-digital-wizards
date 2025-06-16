
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
