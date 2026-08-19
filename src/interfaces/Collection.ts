export interface CustomCollection {
  body_html: string;
  handle: string;
  id: number;
  published: boolean;
  published_at: string;
  published_scope: string;
  image?: Image | null;
  title: string;
  updated_at: string;
  products_count: number;
}

interface Image {
  src: string;
}
