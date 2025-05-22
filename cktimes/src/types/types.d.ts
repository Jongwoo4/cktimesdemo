export interface Article {
    id: number;
    image: string;
    title: string;
    content: string;
    category: string;
    published_at: string;
    subtitle: string;
    author: string;
  }

export interface Opinion {
    id: number;
    image: string;
    title: string;
    content: string;
    published_at: string;
    group: string;
}