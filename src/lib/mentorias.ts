export type Mentoria = {
  slug: string;
  title: string;
  category: string;
  description: string;
  long: string;
  topics: string[];
  encontros: string;
  duracao: string;
  formato: string;
  paraQuem: string;
  level: string;
  imageUrl?: string;
  accent: string;
  cover: { from: string; to: string };
};
