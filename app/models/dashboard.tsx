export interface Feature {
  title: string;
  icon: string;
}

export interface Features {
  feature: Feature[];
}

export interface Section1 {
  title: string;
  content: string;
  images: Image[]
}

export interface Image {
  image: string;
}