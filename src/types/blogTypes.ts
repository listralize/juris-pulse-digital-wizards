
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  banner: string;
  author: string;
  authorImage?: string;
  publishedAt: string;
  createdAt: string;
  slug: string;
  tags: string[];
  featured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}
