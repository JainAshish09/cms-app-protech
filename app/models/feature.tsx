export interface Feature {
    title: string;
    features: FeatureData[];
}

export interface FeatureData {
    title: string;
    subSections: SubFeature[];
}

export interface SubFeature {
    title: string;
    image?: string;
    details: Detail[];
}

export interface Detail {
    description: string;
}