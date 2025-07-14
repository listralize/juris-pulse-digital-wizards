export interface LinkTree {
  id: string;
  title: string;
  description?: string;
  background_color: string;
  text_color: string;
  button_style: 'rounded' | 'square' | 'pill';
  avatar_url?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LinkTreeItem {
  id: string;
  link_tree_id: string;
  title: string;
  url: string;
  icon?: string;
  background_color: string;
  text_color: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}