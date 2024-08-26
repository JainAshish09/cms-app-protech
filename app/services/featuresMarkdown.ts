import fs from 'fs';
import path from 'path';

export async function getFeatureBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, '');
    const { attributes, react: Content } = await import(`../content/${realSlug}.md`);
    return { slug: realSlug, frontmatter: attributes, Content };
}

export function getAllFeatures() {
    const slugs = ["features"];
    const features = slugs.map((slug) => getFeatureBySlug(slug));
    return Promise.all(features);
}