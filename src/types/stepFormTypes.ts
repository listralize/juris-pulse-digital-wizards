export interface StepFormData {
  id: string;
  name: string;
  slug: string;
  title: string;
  subtitle?: string;
  logo_url?: string;
  webhook_url: string;
  redirect_url?: string;
  steps: StepFormStep[];
  styles: {
    primary_color?: string;
    background_color?: string;
    text_color?: string;
    button_style?: string;
  };
  seo: {
    meta_title?: string;
    meta_description?: string;
  };
  footer_config?: {
    enabled?: boolean;
    text?: string;
    background_color?: string;
    text_color?: string;
    font_size?: string;
  };
  seo_config?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    social_proof?: {
      enabled?: boolean;
    };
  };
  is_active: boolean;
  flow_config?: {
    edges?: Array<{
      id: string;
      source: string;
      target: string;
      sourceHandle?: string;
      targetHandle?: string;
    }>;
  };
}

export interface StepFormStep {
  id: string;
  title: string;
  description?: string;
  type: 'question' | 'form' | 'content' | 'offer' | 'timer' | 'socialProof';
  options?: Array<{
    text: string;
    value: string;
    nextStep?: string;
    actionType?: 'next_step' | 'external_url';
  }>;
  formFields?: Array<{
    name: string;
    type: string;
    label?: string;
    placeholder: string;
    required: boolean;
  }>;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  imageUrl?: string;
  videoUrl?: string;
  mediaCaption?: string;
  buttonText?: string;
  buttonAction?: string;
  buttonActionType?: 'next_step' | 'external_url';
  backStep?: string;
  carouselImages?: string[];
  carouselAutoplay?: boolean;
  carouselShowDots?: boolean;
  carouselInterval?: number;
  imageWidth?: string;
  imageHeight?: string;
  videoWidth?: string;
  videoHeight?: string;
  videoAutoplay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  offerConfig?: {
    title?: string;
    originalPrice?: string;
    salePrice?: string;
    discount?: string;
    features?: string[];
    ctaText?: string;
    ctaUrl?: string;
    urgencyText?: string;
  };
  timerConfig?: {
    duration?: number;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
    onExpireAction?: string;
    onExpireUrl?: string;
  };
  socialProofConfig?: {
    enabled?: boolean;
    testimonials?: Array<{
      name: string;
      text: string;
      rating?: number;
      image?: string;
    }>;
    stats?: Array<{
      number: string;
      label: string;
    }>;
  };
}
