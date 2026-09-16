export type ContentType = "curso" | "pdf" | "livro" | "mentoria";

export type Level = "Iniciante" | "Intermediário" | "Avançado";

export type Module = {
  title: string;
  lessons: { title: string; duration: string }[];
};

export type ContentItem = {
  slug: string;
  type: ContentType;
  category: string;
  title: string;
  description: string;
  long?: string;
  teacher?: string;
  level?: Level;
  lessons?: number;
  modules?: number;
  pages?: number;
  duration?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sold?: string;
  owned?: boolean;
  progress?: number;
  curriculum?: Module[];
  cover: { from: string; to: string };
  imageUrl?: string;
  accent: string;
  featured?: boolean;
  tag?: string;
};

export type Row = {
  id: string;
  title: string;
  subtitle?: string;
  items: ContentItem[];
};