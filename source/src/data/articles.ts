import data from './articles.json';

export type ArticleSection = { h: string; p?: string[]; list?: string[] };
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
  product: string;
  intro: string;
  sections: ArticleSection[];
};

export const articles = data as Article[];
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
