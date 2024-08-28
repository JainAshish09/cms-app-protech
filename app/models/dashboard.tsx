export interface Feature {
  title: string;
  icon: string;
}

export interface Features {
  feature: Feature[];
}

export interface Section {
  title: string;
  content: string;
  images: Image[]
}

export interface Image {
  image: string;
}

export interface Section4Item {
  image: string;
  title: string;
  content: string;
  link: string;
  linkText: string;
}

export interface Section4Data {
  section: Section4Item[];
}