export interface Image {
  image: string;
}

export interface BlogEntry {
  title: string;
  date: string;
  content: string;
  image: Image[];
}

export interface Blog {
  blog: BlogEntry[];
}