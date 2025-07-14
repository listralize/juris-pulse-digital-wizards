export interface LinkTree {
  id: string;
  title: string;
  description?: string;
  background_color: string;
  text_color: string;
  button_style: 'rounded' | 'square' | 'pill' | 'glassmorphism' | 'neon' | 'gradient' | 'grid' | 'list' | 'masonry' | 'carousel' | 'magazine' | 'portfolio' | 'bento';
  avatar_url?: string;
  theme: 'modern' | 'minimal' | 'colorful' | 'dark' | 'corporate' | 'premium' | 'gold' | 'platinum' | 'custom';
  background_type: 'solid' | 'gradient' | 'image' | 'video' | 'neural';
  background_gradient?: string;
  background_image?: string;
  background_video?: string;
  custom_css?: string;
  animation_style: 'none' | 'fade' | 'slide' | 'bounce' | 'pulse' | 'glow';
  show_analytics: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LinkTreeItem {
  id: string;
  link_tree_id: string;
  title: string;
  url?: string;
  icon?: string;
  background_color: string;
  text_color: string;
  button_style?: 'inherit' | 'custom' | 'gradient' | 'glassmorphism' | 'neon';
  hover_effect: 'none' | 'scale' | 'glow' | 'lift' | 'bounce' | 'rotate';
  display_order: number;
  click_count: number;
  is_featured: boolean;
  is_active: boolean;
  item_type: 'link' | 'card' | 'form' | 'social' | 'product' | 'service' | 'contact' | 'video' | 'text';
  card_content?: string;
  card_image?: string;
  card_price?: string;
  card_button_text?: string;
  form_id?: string;
  form_fields?: any;
  created_at?: string;
  updated_at?: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}